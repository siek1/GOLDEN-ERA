import React, { useState, useEffect } from "react";
// import Cookies from "js-cookie";
import { cookieParser } from "cookie-parser";
import axios from "axios";
import cookie from "react-cookie";
import Cookies from "universal-cookie";
import Link from "next/link";

const ProductsList = ({ products, cookies }) => {
  // console.log(cookies);
  let array = [];
  for (var i = 0; i < Object.keys(cookies).length; i++) {
    if (Object.keys(cookies)[i] === "csrftoken") {
      continue;
    }
    array.push(Object.keys(cookies)[i]);
  }

  const [optionValue, setOptionValue] = useState("");
  const handleSelect = (e) => {
    // console.log(e.target.value);
    setOptionValue(e.target.value);
  };

  return (
    <div>
      <h1>All products!</h1>
      {products.map((product) => (
        <div key={product._id}>
          <h1>{product.name}</h1>
          <select id="sizes" onChange={handleSelect}>
            <option value="" disabled selected hidden>
              Choose a size
            </option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
          <p>You Selected {optionValue}</p>
          <input
            type="button"
            value="Submit"
            onClick={() => {
              const cookies = new Cookies();
              axios({
                method: "GET",
                url: `http://localhost:5000/api/products/to-cart/${product._id}/${optionValue}`,
              })
                .then((response) => {
                  if (
                    cookies.get(product.name + " " + response.data.size) !==
                    undefined
                  ) {
                    var lala = cookies.get(
                      product.name + " " + response.data.size
                    );
                    lala.quantity += 1;
                    console.log(lala);
                    cookies.set(lala.name + " " + lala.size, lala, {
                      path: "/",
                    });
                  } else {
                    var hihi = { ...response.data };
                    hihi.quantity = 1;
                    console.log(hihi);
                    cookies.set(product.name + " " + hihi.size, hihi, {
                      path: "/",
                    });
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
              // console.log(resp);
              // if (cookies.get(product.name + " " + resp.size) === undefined) {
              //   exists = false;
              //   cookies.set(product.name + " " + resp.size, resp, {
              //     path: "/",
              //   });
              // } else {
              //   exists = true;
              //   var changedElement = { ...resp };
              //   changedElement.quantity += 1;
              //   console.log(changedElement);
              //   cookies.set(product.name + " " + resp.size, changedElement, {
              //     path: "/",
              //   });
              // }
            }}
          />
        </div>
      ))}

      <br></br>
      <Link href="/cart">
        <button>TO CART</button>
      </Link>

      {/* {array.map((obj) => (
        <div>
          <h1>{Cookies.get(obj)}</h1>
        </div>
      ))} */}
      {/* <h1>{Object.keys(cookies).length - 1}</h1> */}
      {/* <h1>lalal</h1> */}
    </div>
  );
};

export default ProductsList;
