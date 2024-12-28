const express = require("express");
const {
  createSession,
  handleWebHook,
} = require("../controllers/paymentsController");

const router = express.Router();

router.post("/create-checkout-sesion", createSession);
router.post("/webhook", handleWebHook);

module.exports = router;
