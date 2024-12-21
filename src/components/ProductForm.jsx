//HOOKS
import { useEffect, useState } from "react";

//SUPABASE
import supabase from "../supabase/config";

function ProductForm({ productForm, setProductForm }) {
	console.log("productForm show", productForm.show);
	console.log("productForm id", productForm.id);
    
    
	const productColumns = {
		title: "",
		image: "",
		description: "",
		price: undefined,
		stock: 0,
		featured: false,
	};

	const [form, setForm] = useState(productColumns);
    console.log(form);

	const getProduct = async (id) => {
		try {
			const { data, error } = await supabase
				.from("products")
				.select("*, products_categories(category_name)")
				.eq("id", `${id}`);

			setProductForm({
				title: data.title,
				image: data.image,
				description: data.description,
				price: data.price,
				stock: data.stock,
				featured: data.featured,
			});

			if (error) {
				throw error;
			}
		} catch (error) {
			console.error(error);
		}
        console.log(setProductForm);
        
	};

	const handleInput = (event) => {
		const value = event.target.value;
		setForm({
			...form,
			[event.target.name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const editProduct = {
			title: form.title,
			image: form.image,
			description: form.description,
			price: form.price,
			stock: form.stock,
			featured: form.featured,
		};
		//props.handleAddStudent(newStudent);
	};

	useEffect(() => {
		if (productForm === "edit") {
			getProduct(productForm.id);
		}
	}, [productForm]);

	return (
		<form onSubmit={handleSubmit}>
			<span>Edit</span>
			<div>
				<label>
					Title
					<input
						value={form.title}
						onChange={handleInput}
						name="title"
						type="text"
						placeholder="Product name"
					/>
				</label>
				<label>
					Image
					<input
						value={form.image}
						onChange={handleInput}
						name="image"
						type="text"
						placeholder="Product image url"
					/>
				</label>
				<label>
					Description
					<textarea
						value={form.description}
						onChange={handleInput}
						name="description"
						type="text"
						placeholder="Product description"
						rows="5"
					/>
				</label>
				<label>
					Price €
					<input
						value={form.price}
						onChange={handleInput}
						name="price"
						type="number"
						placeholder="Product price"
					/>
				</label>
				<label>
					Stock
					<input
						value={form.stock}
						onChange={handleInput}
						name="stock"
						type="number"
						placeholder="Products in stock"
					/>
				</label>

				{/* 
                

			price: form.price,
			stock: form.stock,
			featured: form.featured,

                 */}

				<button type="submit">Save</button>
			</div>
		</form>
	);
}
export default ProductForm;
