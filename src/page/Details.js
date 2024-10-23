//import data from "../data"

import { get } from "../api/post"
import Footer from "../components/footer"
import Header from "../components/header"

const DetailsPage ={
   async render(id)
    {
         //const post = data.find(element => element.id==id)
         const {data}= await get(id)
        return /*html*/` 
         <div class="header">
         ${ await Header.render()}
         </div>
         </div>
         <div class="container mx-auto py-8 px-4">
         <div class="flex flex-col lg:flex-row gap-6">
             <!-- Left Section: Image and Model -->
             <div class="w-full lg:w-1/2">
                 <div class="flex flex-col gap-4">
                     <!-- Product Image -->
                     <div class="w-full rounded-lg overflow-hidden">
                         <img src="${data.img}" alt="Product Image" class="w-full h-full object-cover">
                     </div>
                     <!-- Model Image -->
                     
                 </div>
             </div>
 
             <!-- Right Section: Product Details -->
             <div class="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
                 <!-- Breadcrumb -->
                 <div class="text-gray-500 text-sm mb-4">
                     <a href="/" class="hover:underline">TRANG CHỦ</a> / <a href="#" class="hover:underline">ÁO SƠ MI DÀI TAY NAM</a>
                 </div>
 
                 <!-- Product Title -->
                 <h1 class="text-2xl lg:text-3xl font-bold mb-2">
                     Áo Sơ Mi Đen Dài Tay Họa Tiết Thêu Chữ Ký Vai Bền Màu, Giữ Phom Tốt 8SMDT750BAW
                 </h1>
 
                 <!-- Sold Units -->
                 <div class="text-gray-500 text-sm mb-2">
                     Số lượng đã đặt: <span class="text-black font-semibold">121 / 300</span>
                 </div>
 
                 <!-- Progress Bar -->
                 <div class="w-full bg-gray-300 h-2 rounded-full overflow-hidden mb-4">
                     <div class="bg-green-500 h-full" style="width: 40%;"></div>
                 </div>
 
                 <!-- Price -->
                 <div class="text-xl lg:text-2xl font-semibold text-red-500 mb-4">
                      Giá đặt trước: 750,000₫
                 </div>
 
                 <!-- Size Selector -->
                 
 
                 <!-- Color Option -->
                 <div class="mb-4">
                     <label class="block text-sm font-medium text-gray-700 mb-2"> Màu sắc</label>
                     <div class="flex items-center">
                         <img src="${data.img}" alt="Product Color" class="w-16 h-16 rounded-lg border">
                         <span class="ml-3 text-gray-800">${data.color}</span>
                     </div>
                 </div>
 
                 <!-- Pre-Order Button -->
                 <div class="mt-6">
                     <button id="previewBtn" class="w-full bg-yellow-500 text-white text-lg font-semibold py-4 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300">
                        Preview
                     </button>
                 </div>
 
                 <!-- Additional Info -->
                 <div class="mt-4 text-center text-blue-500 font-medium">
                     <a href="#" class="hover:underline">Vào nhóm ZALO nhận mã giảm 100K</a>
                 </div>
                 <div class="mt-2 text-center text-gray-600">
                     <a href="/products" class="hover:underline">Xem hệ thống Showroom</a>
                 </div>
             </div>
         </div>
     </div>
     <div id="imageModal" class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center hidden">
            <div class="relative">
                <img id="modalImage" src="${data.img}" class="max-w-full max-h-screen object-cover">
                <button id="closeModal" class="absolute top-0 right-0 bg-white text-black rounded-full p-2 m-4">X</button>
            </div>
        </div>
        <div class="footer">
         ${Footer.render()}
         </div>
        `
    },
    Afterender()
    {
        Header.Afterender(); // gọi đến header của afterender
        const previewBtn = document.getElementById("previewBtn");
       const imageModal = document.getElementById("imageModal");
       const closeModal = document.getElementById("closeModal");

       previewBtn.addEventListener("click", () => {
           imageModal.classList.remove("hidden"); // Show the modal
       });

       closeModal.addEventListener("click", () => {
           imageModal.classList.add("hidden"); // Hide the modal
       });

       // Close modal on click outside of the image
       imageModal.addEventListener("click", (event) => {
           if (event.target === imageModal) {
               imageModal.classList.add("hidden");
           }
       });
   
    }
}
export default DetailsPage