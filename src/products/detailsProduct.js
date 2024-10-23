import { getProduct } from "../api/product"
import { addtoCart } from "../cart/cart"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import Footer from "../components/footer"
import Header from "../components/header"

const DetailProduct={
   async render(id)
     
    {
        const {data} = await getProduct(id)
      return /*html*/`
      <div class="footer">
   ${await Header.render()}
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
              ${data.name}
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
               Giá đặt trước: ${data.price}đ
           </div>

           <!-- Size Selector -->
           <div class="mb-4">
               <label class="block text-sm font-medium text-gray-700 mb-2">Kích thước</label>
               <div class="flex gap-2">
                   <button class="border px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-100">39</button>
                   <button class="border px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-100">40</button>
                   <button class="border px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-100">41</button>
                   <button class="border px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-100">42</button>
                   <button class="border px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-100">43</button>
               </div>
           </div>

           <!-- Color Option -->
           <div class="mb-4">
               <label class="block text-sm font-medium text-gray-700 mb-2">Lựa chọn màu sắc</label>
               <div class="flex items-center">
                   <img src="${data.img}" alt="Product Color" class="w-16 h-16 rounded-lg border">
                   <span class="ml-3 text-gray-800">${data.color}</span>
               </div>
           </div>

           <!-- Pre-Order Button -->
           <div class="mt-6">
               <button id="add-to-cart" data-id=${data.id} class="w-full bg-yellow-500 text-white text-lg font-semibold py-4 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300">
                  Thêm vào giỏ hàng
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
      
        <div class="footer">
   ${Footer.render()}
   </div>
      `
    },
    Afterender()
    {
        Header.Afterender()
         const addCart = document.querySelector("#add-to-cart")
         const id = addCart.dataset.id;
         addCart.addEventListener("click", async()=>{
            const user = localStorage.getItem("user"); // nếu trong local có user thì check

            if (!user) {
                // If no user is found, redirect to login page
                toastr.error("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
                setTimeout(() => {
                    document.location.href = "/signin";
                }, 1500);
            } else {
                // If user is logged in, proceed to add product to cart
                const { data } = await getProduct(id);
                
                addtoCart({ ...data, quantity: 1 }, function() {
                    toastr.success("Thêm giỏ hàng thành công");
                    setTimeout(() => {
                        document.location.href = `/cartPage`;
                    }, 1500);
                });
            }
          
         })
    }
}
export default DetailProduct