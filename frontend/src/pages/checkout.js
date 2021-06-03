import React, { useState } from "react";

const Checkout = ({ cookies }) => {
  try {
    delete cookies["csrftoken"];
  } catch (e) {
    console.log(e);
  }
  var JSONarray = [];

  Object.keys(cookies).map((cookie) => {
    // console.log(cookie);
    JSONarray.push(JSON.parse(cookies[cookie]));
  });

  // console.log(JSONarray);

  var totalPrice = 0;

  JSONarray.map((val) => (totalPrice += val.price * val.quantity));
  // console.log(totalPrice);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  const [address, setAddress] = useState("");
  const [aptNumSuite, setAptNumSuite] = useState("");
  const [city, setCity] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [postalCode, setPostalCode] = useState();
  const [country, setCountry] = useState("");

  const order = {};

  var full = 0;

  order["First_Name"] = firstName;
  order["Last_Name"] = lastName;
  order["Email"] = email;
  order["Telephone"] = telephone;
  order["Address"] = address;
  order["AptNumSuite"] = aptNumSuite;
  order["City"] = city;
  order["State/Province"] = stateProvince;
  order["Postal_Code"] = postalCode;
  order["Country"] = country;

  const submit = (empty) => {
    console.log(JSON.stringify(order));
    const list = [
      "First_Name",
      "Last_Name",
      "Email",
      "Telephone",
      "Address",
      "AptNumSuite",
      "City",
      "State/Province",
      "Postal_Code",
      "Country",
    ];

    list.map((element) => {
      if (order[element] === "") {
        full = 0;
      } else {
        full += 1;
      }
    });

    if (
      full === 10 &&
      order["Email"].includes("@") &&
      order["Email"].includes(".")
    ) {
      alert("GOOODDD JOOOB");
    } else {
      alert("TREBUIE SA COMPLETEZI TOATE INPUTURILE");
    }
  };

  return (
    <div>
      <h1>CHECKOUT</h1>
      <form>
        <div>
          <h2>Contact Information</h2>
          <input
            type="text"
            placeholder="First Name"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br></br>
          <br></br>

          <input
            type="text"
            placeholder="Last Name"
            required
            onChange={(e) => setLastName(e.target.value)}
          />
          <br></br>
          <br></br>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <br></br>
          <input
            type="tel"
            required
            placeholder="Telephone"
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>

        <div>
          <h2>Shipping Information</h2>
          <input
            type="text"
            placeholder="Address"
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <br></br>
          <br></br>
          <input
            type="text"
            placeholder="Apt num, Suite"
            required
            onChange={(e) => setAptNumSuite(e.target.value)}
          />
          <br></br>
          <br></br>
          <input
            type="text"
            placeholder="City"
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <br></br>
          <br></br>
          <input
            type="text"
            placeholder="State / Province"
            required
            onChange={(e) => setStateProvince(e.target.value)}
          />
          <br></br>
          <br></br>
          <input
            type="number"
            placeholder="Postal Code"
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />{" "}
          <br></br>
          <br></br>
          <input
            type="text"
            placeholder="Country"
            required
            onChange={(e) => setCountry(e.target.value)}
          />
          <br></br>
          <br></br>
        </div>

        {JSONarray.map((obj) => (
          <div key={obj.name + obj.size + obj.quantity}>
            <h2>
              {obj.quantity}x {obj.name} {obj.size}
            </h2>
            <p>
              {obj.quantity}*{obj.price} RON
            </p>
          </div>
        ))}
        <h1>TOTAL: {totalPrice} RON</h1>
        <button type="submit" onClick={submit}>
          Submit
        </button>
      </form>
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
export default Checkout;
