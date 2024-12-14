// DATABASE
import supabase from "../supabase/config";

// HOOKS
import { useEffect, useState } from "react";

// COMPONENTS
import ProductCard from "./ProductCard";

/* ----------------------------------------------- */

function FeaturedProducts() {
  const defaultState = [{
    image: "",
    title: "",
    category: "",
    price: "",
    id: "",
  }];
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    async function featureProducts() {
      try {
        const {error} = await supabase
        .from()
  /*         .from("products")
          .update({ featured: "true" })
          .lte("price", 500); */
      } catch (error) {
        console.error(error);
      }
    }

    async function getFeaturedProducts() {
      try {
        await featureProducts();
        const response = await supabase
          .from("products_fetured")
          .select("products (image, title, category, price, id)");
        setFeatured(response.data);
        console.log(featured);
      } catch (error) {
        console.error(error);
      }
    }
    getFeaturedProducts();
  }, []);

  return (
    <div>
      <h1>Featured</h1>
      {featured.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}

export default FeaturedProducts;
