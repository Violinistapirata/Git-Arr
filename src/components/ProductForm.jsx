//HOOKS
import { useEffect, useState } from "react";

//SUPABASE
import supabase from "../supabase/config";
import ProductImageUpload from "./ProductImageUpload";

//CSS
import "./ProductForm.css";

function ProductForm({ productForm, setProductForm }) {
	console.log("productForm show:", productForm.show);
	console.log("productForm id:", productForm.id);

	const productColumns = {
		title: "",
		category: "",
		image: "",
		description: "",
		price: 0,
		stock: 0,
		featured: false,
	};

	const [form, setForm] = useState(productColumns);
	const [categories, setCategories] = useState([]);
	console.log("setForm form:", form);
	const getCategories = async () => {
		try {
			const { data, error } = await supabase
				.from("products_categories")
				.select("*");
			if (error) {
				throw error;
			}
			setCategories(data);
		} catch (error) {}
	};
	const getProduct = async (id) => {
		try {
			const { data, error } = await supabase
				.from("products")
				.select("*")
				.eq("id", `${id}`);

			console.log("product from db", data);

			setForm({
				id: data[0].id,
				title: data[0].title,
				category: data[0].category,
				image: data[0].image,
				description: data[0].description,
				price: data[0].price,
				stock: data[0].stock,
				featured: data[0].featured,
			});

			if (error) {
				throw error;
			}
		} catch (error) {
			console.error(error);
		}
	};

	const updateProduct = async (id, object) => {
		try {
			console.log(object);

			const { data, error } = await supabase
				.from("products")
				.update(object)
				.eq("id", id)
				.select();
			setProductForm({ show: "none", id: "" });
			if (error) {
				throw error;
			}
		} catch (error) {
			console.error(error);
		}
	};
	const addProduct = async (object) => {
		try {
			console.log(object);

			const { data, error } = await supabase
				.from("products")
				.insert(object)
				.select();
			setProductForm({ show: "none", id: "" });
			if (error) {
				throw error;
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleInput = (event) => {
		const value = event.target.value;
		setForm({
			...form,
			[event.target.name]: value,
		});
	};

	/* 
const { data, error } = await supabase
  .from('products')
  .update({ other_column: 'otherValue' })
  .eq('some_column', 'someValue')
  .select()
*/

	const handleSubmit = (e) => {
		e.preventDefault();
		const editProduct = {
			title: form.title,
			category: form.category,
			image: form.image,
			description: form.description,
			price: form.price,
			stock: form.stock,
			featured: form.featured,
		};
		console.log("editProduct object", editProduct);
		if (productForm.show === "edit") {
			updateProduct(form.id, editProduct);
		}
		if (productForm.show === "add") {
			addProduct(editProduct);
		}
		//props.handleAddStudent(newStudent);
	};

	useEffect(() => {
		getCategories();
		if (productForm.show === "edit") {
			getProduct(productForm.id);
			console.log("useEffect === edit");
		}
		if (productForm.show === "add") {
		}
	}, [productForm.id]);

	return (
		<>
			<div className="product-form-overlay">
				<div className="product-form">
					<span
						className="product-form-close-button"
						onClick={() => setProductForm({ show: "none", id: "" })}
					>
						&#x2715;
					</span>
					<h3>
						{productForm.show === "add"
							? "Add a new product"
							: "Edit product: " + form.title}
					</h3>
					<form onSubmit={handleSubmit}>
						{form.id && <input value={form.id} name="id" type="hidden" />}
						<section>
							{/* 
				
				<div class="nice-form-group">
            		<label>Basic form group</label>
            		<small>With additional information below the label</small>
            		<input type="text" placeholder="Your name" />
          		</div>
				
				*/}
							<div className="edit-image">
								<div className="product-form-image">
									{form.image ? <img src={form.image} /> : <p>Add an image</p>}
								</div>
								<div className="edit-image-buttons">
									<input
										value={form.image}
										onChange={handleInput}
										name="image"
										id="image"
										type="hidden"
									/>
									<ProductImageUpload
										form={form}
										setForm={setForm}
										imageName={form.title}
									/>
								</div>
							</div>
						</section>
						<section>
							<div className="form-group">
								<label htmlFor="title">Title</label>
								<input
									value={form.title}
									onChange={handleInput}
									name="title"
									id="title"
									type="text"
									placeholder="Product name"
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="category">Category</label>
								<select
									onChange={handleInput}
									name="category"
									id="category"
									value={form.category}
									required
								>
									<option value="">--Choose a category--</option>
									{categories.map((category, index) => {
										return (
											<option key={category.id} value={category.id}>
												{category.category_name}
											</option>
										);
									})}
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="description">Description</label>
								<textarea
									value={form.description}
									onChange={handleInput}
									name="description"
									id="description"
									type="text"
									placeholder="Product description"
									rows="5"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="price">Price €</label>
								<input
									value={form.price}
									onChange={handleInput}
									name="price"
									id="price"
									type="number"
									placeholder="Product price"
									min={1}
									required
									step="0.01"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="stock">Stock</label>
								<input
									value={form.stock}
									onChange={handleInput}
									name="stock"
									id="stock"
									type="number"
									placeholder="Products in stock"
								/>
							</div>
						</section>
						<section>
							<button type="submit">Save</button>
						</section>
					</form>
				</div>
			</div>
		</>
	);
}
export default ProductForm;
