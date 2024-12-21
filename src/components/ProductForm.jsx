import { useState } from "react";

function ProductForm({ productForm, setProductForm }) {
	const productColumns = {
		title: "",
		image: "",
		description: "",
		price: null,
		stock: 0,
		featured: false,
	};

	const [form, setForm] = useState(productColumns);

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
			description: "",
			price: null,
			stock: 0,
			featured: false,
		};
		//props.handleAddStudent(newStudent);

		
	};

	return (
		<form onSubmit={handleSubmit}>
			<span>Add a Student</span>
			<div>
				<label>
					Title
					<input
						value={state.title}
						onChange={handleInput}
						name="title"
						type="text"
						placeholder="Product name"
					/>
				</label>

				<button type="submit">Add Student</button>
			</div>
		</form>
	);
}
export default ProductForm;
