import React from "react";
import { products } from "../../config/staticProducts";
import { Box } from "@mui/material";
import OrderItem from "../components/OrderItem";

export default function Home() {
  return (
    <Box>
      {products.map((product) => (
        <OrderItem key={product.id} product={product} />
      ))}
    </Box>
  );
}
