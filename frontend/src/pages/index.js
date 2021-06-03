import Head from "next/head";
import styles from "../styles/Home.module.css";

import ProductsList from "../components/ProductsList";

export default function Home({ products, cookies }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>STEFAN</title>
        <meta
          name="keywords"
          content="T-Shirt, Hoodie, Tricouri, tricouri, tshirt, hoodies, streetwear, fashion, outfits, chlothes, Graphic Tees"
        />
      </Head>
      <ProductsList products={products} cookies={cookies} />
    </div>
  );
}
export const getServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:5000/api/products/all/all`);
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
