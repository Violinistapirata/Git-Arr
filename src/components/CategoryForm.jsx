function CategoryForm({categoryForm, setCategoryForm}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        setCategoryForm({...categoryForm, show: true})
    }
    return (
        <>
            <h1>{categoryForm === "add"? "NEW" : "EDIT"} CATEGORY</h1>
            <form onSubmit={handleSubmit}>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
export default CategoryForm