const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Order = require("../models/Order");

exports.createSession = async (req, res) => {
  const { email, items } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email id is a required field" });
  }
  if (!items.length) {
    return res.status(400).json({ message: "Items are required" });
  }
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.FRONTEND_URL}/order-success`,
      cancel_url: `${process.env.FRONTEND_URL}/order-failure`,
      customer_email: email,
      payment_method_types: ["card"],
      mode: "payment",

      line_items: items.map((item) => ({
        quantity: item.quantity,

        price_data: {
          currency: "inr",
          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            images: [item.image],
          },
        },
      })),
      mode: "payment",
    });
    const newOrder = new Order({
      email,
      items,
      sessionId: session.id,
    });

    await newOrder.save();

    res.status(200).json(session);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.handleWebHook = async (req, res) => {
  let event;
  const signature = req.headers["stripe-signature"];
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.ENDPOINT_SERET
    );
    if (event.type === "payment_intent.succeeded") {
      const paymentIntentId = event.data.object.id;
      const sessions = await stripe.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });
      const sessionId = sessions.data[0].id;
      await Order.findOneAndUpdate(
        { sessionId },
        { paymentStatus: "success", paymentIntentId }
      );
      res.json({ received: true });
    }
  } catch (error) {
    console.log(error);
    res.json({ received: false });
  }
};
