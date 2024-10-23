

import { getAll } from "../api/category";
import { AddProduct, EditProduct, getProduct, OneProduct } from "../api/product"
import Banner from "../components/banner"
import axios from "axios"

const EditProducts={
   async render(id)
    {
        const {data}= await getProduct(id);  // lấy giá trị 1 products
        const {data :categories}= await getAll();
        console.log(data)
        console.log(categories)
       return/*html*/`
       <div class="bg-gray-100 min-h-screen">
       ${Banner.render()}
       <div class="container mx-auto py-16 px-4">
           <div class="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
               <h2 class="text-2xl font-bold text-gray-800 mb-6">Tạo bài viết mới</h2>
               <form id="EditProduct" class="space-y-4">
                   <!-- Title -->
                   <div>
                       <label for="name-product" class="block text-gray-700 font-medium">Tên</label>
                       <textarea id="name-product" class="w-full h-10 border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500" cols="30" rows="6" placeholder="Nhập mô tả bài viết" required>${data.name}</textarea>
                      
                   </div>
                   
                   <!-- Image -->
                   <div>
                       <label for="img-product" class="block text-gray-700 font-medium">Hình ảnh</label>
                       <input type="file" id="img-product" class="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500" src=${data.img}/>
                       <img src="https://tse2.mm.bing.net/th?id=OIP.O3Bc-GSysMNEYogvD09BjwHaHO&pid=Api&P=0&h=180"/>
                   </div>
                   
                   <!-- Description -->
                   <div>
                       <label for="desc-product" class="block text-gray-700 font-medium">Mô tả</label>
                       <textarea id="desc-product" class="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500" cols="30" rows="6" placeholder="Nhập mô tả bài viết" required>${data.desc}</textarea>
                   </div>
                   <!-- Color -->
                   <div>
                   <label for="color-product" class="block text-gray-700 font-medium">Màu sắc</label>
                   <input type="text" id="color-product" class="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Nhập màu sắc" value=${data.color}/>
                   </div>

               <!-- Price -->
               <div>
                   <label for="price-product" class="block text-gray-700 font-medium">Giá</label>
                   <input type="number" id="price-product" class="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Nhập giá sản phẩm" value=${data.price} required/>
               </div>
                    <!-- Category Selection -->
                    <div>
                    <label for="category-product" class="block text-gray-700 font-medium">Danh mục</label>
                    <select id="category-product" class="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500" required>
                       
                             
                             ${categories.map((item,index)=>{
                                return `<option value="${item.id}">${item.name}</option>`
                            }).join('')}
                        
                    </select>
                </div>
                   
                   <!-- Submit Button -->
                   <div>
                       <button type="submit" class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Cập nhật sản phẩm</button>
                   </div>
               </form>
           </div>
       </div>
   </div>
       `
    },
    Afterender(id)
    {
        const formaddPost = document.querySelector("#EditProduct")
        const Cloudinay_preset_key="manhkieu";
         const CLOUDINARY_API_URL ="https://api.cloudinary.com/v1_1/drnzyiahq/image/upload"  // link upload clou
        formaddPost.addEventListener('submit',async (e)=>{
            e.preventDefault() // loại bỏ load trang của submit
            const file=document.querySelector('#img-product').files[0] // lấy input của ảnh
            console.log(file)
             // đối tưởng khi làm vc với file
              // lấy giá trị của từng file gán vào form data
              const formData = new FormData(); 
              formData.append('file',file)
              formData.append('upload_preset',Cloudinay_preset_key)
              console.log(formData)
              // call api cloudinary để đẩy ảnh lên
            // lần 1 đẩy lên lấy api
        const {data} = await  axios.post(CLOUDINARY_API_URL,formData,{
            headers:{
                "Content-Type":"application/form-data"
            }
          })
          console.log(data.url)    // link ảnh mà cloudinary trả về
          //call api lần nữa để thêm dữ liệu vào json
          EditProduct({
            id:id,
            name:document.querySelector('#name-product').value,
            img:data.url,
            desc:document.querySelector('#desc-product').value,
            color:document.querySelector('#color-product').value,
            price:Number.parseFloat(document.querySelector('#price-product').value),
            CatepostId:document.querySelector('#category-product').value

          }).then(()=>{
            setTimeout(function(){
                window.location.href = 'http://localhost:5173/admin/dasboardProduct';
            }, 2000); 
          })
        })
    }
}
export default EditProducts