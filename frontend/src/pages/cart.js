import React from "react";
import Cookies from "js-cookie";
import Link from "next/link";

const Cart = ({ cookies }) => {
  try {
    delete cookies["csrftoken"];
  } catch (e) {
    // pass;
    console.log(e);
  }
  var JSONarray = [];

  Object.keys(cookies).map((cookie) => {
    console.log(cookie);
    JSONarray.push(JSON.parse(cookies[cookie]));
  });

  return (
    <div>
      {JSONarray.map((obj) => (
        <div>
          <h2>NUME: {obj.name}</h2>
          <p>PRET: {obj.price} RON</p>
          <p>MARIME: {obj.size}</p>
          <p>CANTITATE: {obj.quantity}</p>
        </div>
      ))}
      <br></br>
      <Link href="/">
        <button>BACK</button>
      </Link>
      <br></br>
      <Link href="/checkout">
        <button>CHECKOUT</button>
      </Link>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:5000/api/products/get-all/cookies`);
  // console.log(res);
  const data = await res.json();
  // console.log(data);

  const { req } = context;

  const { cookies } = req;

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { cookies },
  };
};

export default Cart;
