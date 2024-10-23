import { getAll } from "../api/category"
import { Add } from "../api/post"
import Banner from "../components/banner"
import axios from "axios"

const addPost={
   async render()
    {
        const {data}= await getAll();
        console.log(data)
       return/*html*/`
       <div class="bg-gray-100 min-h-screen">
       ${Banner.render()}
       <div class="container mx-auto py-16 px-4">
           <div class="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
               <h2 class="text-2xl font-bold text-gray-800 mb-6">Tạo bài viết mới</h2>
               <form id="addPost" class="space-y-4">
                   <!-- Title -->
                   <div>
                       <label for="title-post" class="block text-gray-700 font-medium">Tiêu đề</label>
                       <input type="text" id="title-post" class="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Nhập tiêu đề" required/>
                   </div>
                   
                   <!-- Image -->
                   <div>
                       <label for="img-post" class="block text-gray-700 font-medium">Hình ảnh</label>
                       <input type="file" id="img-post" class="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500" required/>
                       <img src="https://tse2.mm.bing.net/th?id=OIP.O3Bc-GSysMNEYogvD09BjwHaHO&pid=Api&P=0&h=180"/>
                   </div>
                   
                   <!-- Description -->
                   <div>
                       <label for="desc-post" class="block text-gray-700 font-medium">Mô tả</label>
                       <textarea id="desc-post" class="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500" cols="30" rows="6" placeholder="Nhập mô tả bài viết" required></textarea>
                   </div>
                   <!-- Color -->
                   <div>
                       <label for="color-post" class="block text-gray-700 font-medium">Color</label>
                       <input type="text" id="color-post" class="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Nhập tiêu đề" required/>
                   </div>
                    <!-- Category Selection -->
                    <div>
                    <label for="category-post" class="block text-gray-700 font-medium">Danh mục</label>
                    <select id="category-post" class="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500" required>
                       
                        ${data.map((item,index)=>{
                            return `<option value="${item.id}">${item.name}</option>`
                        }).join('')}
                    </select>
                </div>
                   
                   <!-- Submit Button -->
                   <div>
                       <button type="submit" class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Tạo bài viết</button>
                   </div>
               </form>
           </div>
       </div>
   </div>
       `
    },
    Afterender()
    {
        const formaddPost = document.querySelector("#addPost")
        const Cloudinay_preset_key="manhkieu";
         const CLOUDINARY_API_URL ="https://api.cloudinary.com/v1_1/drnzyiahq/image/upload"
        formaddPost.addEventListener('submit',async (e)=>{
            e.preventDefault() // loại bỏ load trang của submit
            const file=document.querySelector('#img-post').files[0] // lấy input của ảnh
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
          Add({
            title:document.querySelector('#title-post').value,
            img:data.url,
            desc:document.querySelector('#desc-post').value,
            color:document.querySelector('#color-post').value,
            CatepostId:document.querySelector('#category-post').value

          }).then(()=>{
            setTimeout(function(){
                window.location.href = 'http://localhost:5173/admin/dasboardPost';
            }, 2000); 
          })
        })
    }
}
export default addPost