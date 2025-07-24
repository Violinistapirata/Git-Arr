import { useState } from "react";
import supabase from "../supabase/config";

function ProductImageUpload({ imageName, form, setForm }) {
	const [file, setFile] = useState(null);
	const [status, setStatus] = useState(""); // si no usamos el status, lo podemos borrar
	
	
	

	const uploadImage = async (file) => {
		try {
			const storageUrl =
				"https://whpbdrinqtvellfpwtgs.supabase.co/storage/v1/object/public/";
			const randNumber = Math.ceil(Math.random() * 31417561234);
			const trimName = imageName.replaceAll(" ", "");

			const fileName = trimName + "_" + randNumber + "_" + file.name;

			const { data, error } = await supabase.storage
				.from("images")
				.upload(fileName, file, {
					cacheControl: "3600",
					upsert: false,
				});
			const fullImageUrl = storageUrl + data.fullPath;
			setForm({ ...form, image: fullImageUrl });
			if (error) {
				throw error;
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		
		

		uploadImage(file);
	};

	return (
		<div>
			<input type="file" onChange={(e) => setFile(e.target.files[0])} />

			<button onClick={handleSubmit} disabled={!file}>
				Save new image
			</button>
		</div>
	);
}

export default ProductImageUpload;
