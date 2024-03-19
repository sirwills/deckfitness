const dotenv = require("dotenv").config();

const paystack = (request) => {
  const MySecret = process.env.PAYSECRET;

  const initalizePayment = (form, myCallback) => {
    const options = {
      url: "http://api.paystack.co/transaction/initialize",
      headers: {
        authorization: MySecret,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
      form,
    };
    const callback = (error, response, body) => {
      return myCallback(error, body);
    };
    request.post(options, callback);
  };

  const verifyPayment = (ref, mycallback) => {
    const options = {
      url:
        "https://api.paystack.co/transation/verify/" + encodeURIComponent(ref),
      headers: {
        authorization: MySecret,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request(options, callback);
  };
  return { initalizePayment, verifyPayment };
};

module.exports = paystack;
