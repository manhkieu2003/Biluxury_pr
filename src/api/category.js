import instance from "./config";
export const getAll=()=>{
    const url=`/Cateposts`
    return instance.get(url)
}
// lấy 1
export const getCategory=(id)=>{
    const url=`/Cateposts/${id}`
    return instance.get(url)
}
// lấy bài viết(posts) sản phẩm theo danh mục
export const get=(id)=>{
 const url=`Cateposts/${id}?_embed=posts`;
 return instance.get(url)
}
// lấy sản phẩm(products) theo danh mục
export const getProducts=(id)=>{
    const url=`Cateposts/${id}?_embed=Products`;
    return instance.get(url)
}
// Add a new category
export const addCategory = (categoryData) => {
    const url = `/Cateposts`;
    return instance.post(url, categoryData);
};

// Update a category by ID
export const updateCategory = (id, updatedData) => {
    const url = `/Cateposts/${id}`;
    return instance.put(url, updatedData);
};

// Delete a category by ID
export const deleteCategory = (id) => {
    const url = `/Cateposts/${id}`;
    return instance.delete(url);
};