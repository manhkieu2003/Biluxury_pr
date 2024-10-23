import instance from "./config";
export const getAllProduct=()=>{
     const url=`/Products`
     return instance.get(url)
}
export const getProduct=(id)=>{
    const url=`/Products/${id}`
    return instance.get(url)
}
export const DeleteProduct=(id)=>{    // xóa cần phải có 1 id
    const url=`/Products/${id}`
    return instance.delete(url)
}

export const AddProduct=(Product)=>{
    const url=`/Products`
    return instance.post(url,Product)
}
export const EditProduct=(Product)=>{
    const url=`/Products/${Product.id}`
    return instance.put(url,Product)
}

// fake api bằng expand lấy 1 sản phẩm và 1 category thông qua categoryId http://localhost:3000/Products/1?_expand=Catepost
export const OneProduct=(id)=>{
    const url=`/Products/${id}?_expand=Catepost`
    return instance.get(url)
}

