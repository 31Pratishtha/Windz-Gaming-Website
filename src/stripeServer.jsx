import express from "express";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51P9M6fSG75cgTzAoH9wndoVN0XVMmXNXTrzOdyVwpGNiQUX6T1OKuH0kdD0ID3rwBhIk2n2NOZbqBuIDXCucbp6O00JGydyKHV"
);
const app = express();

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    ui_mode: 'embedded',
    return_url: 'https://example.com/checkout/return?session_id={CHECKOUT_SESSION_ID}',
  });

  res.send({clientSecret: session.client_secret});
  console.log("server side created")
});

app.listen(5173, () => console.log(`Listening on port ${5173}!`));
