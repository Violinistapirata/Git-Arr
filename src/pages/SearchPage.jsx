//HOOKS
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//SUPABASE
import supabase from "../supabase/config";

//COMPONENTS
import ProductCard from "../components/ProductCard";

//STYLES
import "./CategoryPage.css";

/* ------------------------------------------------------- */

function SearchPage() {
	const [products, setProducts] = useState([]);
	//const [catId, setCatId] = useState(null);
	const [catOrder, setCatOrder] = useState({
		orderBy: "title",
		ascending: true,
	});

	const navigate = useNavigate();

	
    const { categoryId } = useParams();

    // const GetCatId = () => {
    //     //const routeParams = useParams();
    //     const { categoryId } = useParams();
    //     setCatId(categoryId)
    //     console.log(categoryId);
        
    // }
   

	const getProducts = async () => {
		try {
			const { data } = await supabase
				.from("products")
				.select("*")
				.eq("category", `${categoryId}`)
				.order(catOrder.orderBy, { ascending: catOrder.ascending });
			//console.log("this is data: ", data);

			setProducts(data);
		} catch (error) {
			console.error(error);
		}
	};
	

	const saveOrderBy = (orderby) => {
		setCatOrder({ ...catOrder, orderBy: orderby });
	};
	const saveOrder = (order) => {
		setCatOrder({ ...catOrder, ascending: order });
	};


	useEffect(() => {
		getProducts();
	}, [catOrder]);

	// console.log("state products", products);
	// console.log("state category", category);
	// console.log("category id", catId);
    

	if (category !== null) {
		return (
			<>
				<h1>{category.category_name}</h1>
				<div className="order-bar">
					<div className="order-by">
						<label htmlFor="orderBy">Order by</label>
						<select
							onChange={(e) => {
								saveOrderBy(e.target.value);
							}}
							defaultValue={catOrder.orderBy}
						>
							<option value="title">title</option>
							<option value="price">price</option>
						</select>
					</div>
					<div className="order">
						<label htmlFor="asc">Order ascending</label>
						<input
							onClick={() => {
								saveOrder(true);
							}}
							type="radio"
							name="order"
							id="asc"
							defaultChecked={true}
						/>
						<label htmlFor="desc">Order descending</label>
						<input
							onClick={() => {
								saveOrder(false);
							}}
							type="radio"
							name="order"
							id="desc"
						/>
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
}

export default SearchPage;
