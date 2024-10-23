

import { DeleteProduct, getAllProduct } from "../api/product";
import Banner from "../components/banner";
import Footer from "../components/footer";
import Header from "../components/header";
import { reRender } from "../utils/reRender";


const DashboardProduct={

   async render()
    
    {
        const {data}= await getAllProduct ();
        return /*html*/`
        <div class="header">
        ${ await Header.render()}
        </div>
         <div class="bg-white">
         <div class="bg-white">
         <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
             <h2 class="text-3xl font-bold tracking-tight text-gray-900 mb-6">Product Management</h2>

             <!-- Add New Post Button -->
             <div class="mb-8">
                 <a href="/admin/addproduct" class="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700">
                     + Thêm bài viết mới
                 </a>
             </div>

             <!-- Posts Table -->
             <div class="overflow-x-auto">
                 <table class="min-w-full bg-white border border-gray-200">
                     <thead>
                         <tr class="bg-gray-100 border-b border-gray-200">
                             <th class="text-left py-3 px-4 font-medium text-gray-700">STT</th>
                             <th class="text-left py-3 px-4 font-medium text-gray-700">Title</th>
                             <th class="text-left py-3 px-4 font-medium text-gray-700">Image</th>
                             <th class="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                         </tr>
                     </thead>
                     <tbody class="divide-y divide-gray-200">
                         ${data.map((post, index) => `
                             <tr>
                                 <td class="py-4 px-4">${index + 1}</td>
                                 <td class="py-4 px-4">${post.name}</td>
                                 <td class="py-4 px-4">
                                 <img class="w-12 h-12" src="${post.img}"/>
                                 </td>
                                 <td class="py-4 px-4 space-x-4">
                                     <a href="/admin/editProducts/${post.id}" class="text-blue-500 hover:text-blue-700">Sửa</a>
                                     <button data-id="${post.id}" class="btn text-red-500 hover:text-red-700">Xóa</button>
                                 </td>
                             </tr>
                         `).join("")}
                     </tbody>
                 </table>
             </div>
         </div>
     </div>
     <div class="footer">
      ${Footer.render()}
     <div>
        `
    },
    Afterender(){
        Header.Afterender(); // gọi đến header của afterender
      const btns = document.querySelectorAll(".btn")
      console.log(btns)
      btns.forEach(btn=>{
       console.log(btn.dataset) 
       const {id} =btn.dataset
    //    console.log(id)  
       btn.addEventListener('click',()=>{
        console.log(id)
         // callapi 
        if (confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
            DeleteProduct(id).then(() => {
                reRender(DashboardProduct, "#content");
            });
        }
       
       
       })
      })
    }
    
}


export default DashboardProduct