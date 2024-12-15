// DATABASE
import supabase from "../supabase/config";

// HOOKS
import { useEffect, useState } from "react";

// COMPONENTS
import ProductCard from "./ProductCard";

// STYLES
import './ProductsList.css'
/* ----------------------------------------------- */

function FeaturedProducts() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    async function getFeaturedProducts() {
      try {
        const { data } = await supabase
          .from("products")
          .select()
          .eq("featured", true);
        setFeatured(data);

      } catch (error) {
        console.error(error);
      }
    }
    getFeaturedProducts();
  }, []);

  return (
    <div>
      <h1>Featured</h1>
      <section className="product-list">
        {featured &&
          featured.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </section>
    </div>
  );
}

export default FeaturedProducts;
