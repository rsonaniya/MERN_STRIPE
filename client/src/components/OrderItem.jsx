import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../redux/orderSlice";
import { useNavigate } from "react-router-dom";

export default function OrderItem({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.order);
  return (
    <Box display="flex" justifyContent="space-between" px={3}>
      <Box height="300px" width="300px">
        <img
          src={product.images[0]}
          alt={product.title}
          height="100%"
          width="100%"
        />
      </Box>
      <Box
        width="400px"
        display="flex"
        flexDirection="column"
        gap={1}
        justifyContent="center"
      >
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="body1">{product.description}</Typography>
        <Typography variant="h6">₹ {product.price.toFixed(2)}</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        {cartItems.some((item) => item.id === product.id) ? (
          <Button variant="contained" onClick={() => navigate("/cart")}>
            Go To Cart
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => dispatch(addItemsToCart(product))}
          >
            Add To Cart
          </Button>
        )}
      </Box>
    </Box>
  );
}
