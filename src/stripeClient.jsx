import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51P9M6fSG75cgTzAowwJHSac0Eq5fQSPNg11Sb7XGF6qWiLtCjn5MeY705DXbGr2udA1KFEq1iN2aQzy0jzu0Mbsb00ywBojOXI"
);

export function StripeGateway() {
  const fetchClientSecret = async () => {
    return await fetch("/create-checkout-session", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  };

  const options = { fetchClientSecret };

  return (
    <div>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
