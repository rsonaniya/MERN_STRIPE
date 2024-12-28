import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectPage({ status }) {
  const [timeLeft, setTimeLeft] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    let timer;
    let interval;

    interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      {status === "success" ? (
        <Typography color="success">
          Thanks for Placing the order, Redirecting you to homepage in{" "}
          {timeLeft} second(s)
        </Typography>
      ) : (
        <Typography color="error">
          Something went wrong while placing your order, Redirecting you to
          homepage {timeLeft} second(s)
        </Typography>
      )}
    </Box>
  );
}
