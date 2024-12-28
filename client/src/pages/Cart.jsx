import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { addItemsToCart, removeItemsFromCart } from "../redux/orderSlice";
import { useState } from "react";

export default function Cart() {
  const { cartItems } = useSelector((state) => state.order);
  const cartTotal = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const isValidEmail = /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = async () => {
    if (!email || !cartItems.length) {
      return alert("Email and Cart Items are required");
    }
    const items = cartItems.map((item) => ({
      name: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.images[0],
    }));

    const res = await fetch(
      "http://localhost:5000/api/payments/create-checkout-sesion",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, email }),
      }
    );

    if (!res.ok) alert("Something went wrong");
    const session = await res.json();
    if (session.url) {
      window.location = session.url;
    }
  };

  return cartItems.length ? (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img src={item.images[0]} height="100px" width="100px" />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>₹ {item.price.toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => dispatch(removeItemsFromCart(item))}
                  >
                    <RemoveCircleOutlineOutlinedIcon />
                  </IconButton>
                  {item.quantity}
                  <IconButton onClick={() => dispatch(addItemsToCart(item))}>
                    <AddCircleOutlineOutlinedIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  ₹ {(item.quantity * item.price).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        component={Paper}
        display="flex"
        py={3}
        px={6}
        mt={2}
        justifyContent="space-between"
      >
        <TextField
          size="small"
          label="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={!isValidEmail}
        />
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography>Cart Total: ₹ {cartTotal.toFixed(2)}</Typography>
          <Button
            variant="contained"
            disabled={!isValidEmail}
            onClick={handleSubmit}
          >
            Proceed To Checkout
          </Button>
        </Box>
      </Box>
    </>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography>Your Cart Is Empty</Typography>
    </Box>
  );
}
