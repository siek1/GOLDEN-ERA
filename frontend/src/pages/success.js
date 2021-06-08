import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "universal-cookie";

const Success = ({ cookies, products }) => {
  const { query } = useRouter();
  // console.log(cookies);
  const [status, setStatus] = useState(false);
  // console.log(query.id);

  // useEffect(() => {
  //   console.log(query.id);
  fetch(`http://localhost:5000/api/checkout/session-existance/${query.id}`, {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log("Success:", data);
      // setStatus(data);
      if (data !== "INVALID") {
        setStatus(true);
      }
      // setState(true);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  // }, []);
  if (status === true) {
    const cookiesss = new Cookies();

    var productsObj = {};
    for (var i = 0; i < Object.keys(cookies).length; i++) {
      if (Object.keys(cookies)[i] === "csrftoken") {
        continue;
      }
      if (Object.keys(cookies)[i] === "Order") {
        continue;
      }
      var x = cookiesss.get(Object.keys(cookies)[i]);

      console.log(x);
      if (x === undefined) {
        break;
      }
      productsObj[Object.keys(cookies)[i]] = x.quantity;
    }

    var orderInfo = cookiesss.get("Order");
    axios({
      method: "post",
      url: `http://localhost:5000/api/orders/create`,
      data: {
        stripe_id: query.id,
        order_info: { ...orderInfo },
        products: { ...productsObj },
      },
    }).catch((error) => {
      console.error("Error:", error);
    });

    Object.keys(cookies).map((cookie) => {
      cookiesss.remove(cookie);
    });

    return (
      <div>
        <h1>THANK YOU !!!!</h1> ORDER ID: {query.id}
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export const getServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:5000/api/products/all/all`);
  // console.log(res);
  const data = await res.json();
  // console.log(data);

  const { req } = context;

  const { cookies } = req;

  // if (!data) {
  //   return {
  //     notFound: true,
  //   };
  // }
  // console.log(data);
  // newCookies = cookies;
  // const index = newCookies.indexOf("csrftoken");
  // if (index > -1) {
  // newCookies.splice(index, 1);
  // }

  return {
    props: { products: data, cookies }, // will be passed to the page component as props
  };
};

export default Success;
