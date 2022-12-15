import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
;
export default function CheckoutForm(price) {
  const router = useRouter()
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [newprice, setnewprice] = React.useState(price.price);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);


  React.useEffect(() => {
    var p=price.price

    setnewprice(String(p))
    console.log(newprice)
  }, []);
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while ((match = regex.exec(router.asPath))) {
      params[match[1]] = match[2];
    }
   // console.log(params.paymentId);
    var pid = params.PayerID;
    var payid = params.paymentId;
    var fname = params.fname;
    var lname = params.lname;
    var address = params.address;
    address = String(address).replace("_"," ")
    var email = params.email;
    var phone = params.phone;
    var pin = params.pin;
    var fname = params.fname;
    var paypalexpress=params.paypalexpress;
    var paypalexp=params.paypalexp;
    var redirect_status=params.redirect_status;
    var add=String(address)
      console.log(add)
      const res =  add.replace(/ /g, '_')
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "https://lieferservice.vedis.berlin/kasse?fname=" + `${fname}` + "&lname=" + `${lname}` + "&address=" + `${res}` + "&email=" + `${email}` + "&phone=" + `${phone}` + "&pin=" + `${pin}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <div className="stripe-wrapper">
<Link href="/">

<a className="">
  
</a>
</Link>
   
    <form id="payment-form" onSubmit={handleSubmit}>
        <div >
      <PaymentElement id="payment-element" />
      <div >
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> :  `Pay now ${newprice} €`}
        </span>
      </button></div>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
      </div>
    </form>
    
    </div>
  );
}