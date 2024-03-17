const dotenv = require("dotenv").congfig();

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
  };
};
