//HOOKS
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//SUPABASE
import supabase from "../supabase/config";

//COMPONENTS
import ProductCard from "../components/ProductCard";

//STYLES
import "./CategoryPage.css";

/* ------------------------------------------------------- */

function CategoryPage() {
	const [category,setCategory] = useState(0)
	const [products, setProducts] = useState([]);
    const [order,setOrder] = useState({orderBy: "title", ascending: true})

	const { categoryId } = useParams();


	const getProducts = async () => {
		try {
			const response = await supabase
				.from("products")
				.select("*")
				.eq("category", `${categoryId}`)
                .order(order.orderBy, { ascending: order.ascending });
                setProducts(response.data);
			// console.log("this is the products response", response);
		} catch (error) {
			console.error(error);
		}
	};
	const getCategory = async () => {
		try {
			const response = await supabase
				.from("products_categories")
				.select("*")
				.eq("id", `${categoryId}`);
                setCategory(response.data[0]);
			// console.log("this is the category response", response);
		} catch (error) {
			console.error(error);
		}
	};

    useEffect(() => {
        getProducts();
        getCategory();
    },[])

    console.log("state products", products);
    console.log("state category", category);
    
    
	return (
		<>
			<h1>{category.category_name}</h1>
            <div className="order-bar">
                <div className="order-by">
                    <label htmlFor="orderBy">Order by</label>
                    <select>
                        <option value=""></option>
                    </select>
                </div>
                <div className="order">
                    <label htmlFor="order">Order</label>
                    <input type="radio" name="order" id="" value={true} checked="checked"/>
                    <input type="radio" name="order" id="" value={false}/>
                </div>
            </div>
			<section className="product-list">
				{products.map((product) => {
					return <ProductCard key={product.id} product={product} />;
				})}
			</section>
		</>
	);
}

export default CategoryPage;