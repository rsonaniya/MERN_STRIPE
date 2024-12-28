const mongooose = require("mongoose");

const orderSchema = new mongooose.Schema({
  email: {
    type: String,
    required: true,
  },
  items: [
    {
      image: { type: String, default: "" },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  paymentIntentId: String,
  sessionId: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
});

const Order = mongooose.model("Order", orderSchema);

module.exports = Order;
