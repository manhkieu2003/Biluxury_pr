import { reRender } from "../utils/reRender";
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { getAll } from "../api/category";


const Header = {
    async render() {
      const {data}=await getAll();
      
      
        return /*html*/`
        <nav class="bg-gray-100 shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        
        <!-- Logo Section -->
        <div class="flex-shrink-0">
        <img itemprop="logo" src="https://file.hstatic.net/200000053174/file/logo_2024_new_den_44d720a5522f430b8f06d5a8d6709f6a.svg" alt="BILUXURY" class="img-responsive logoimg  logo_1" loading="lazy">
        </div>
        
        <!-- Middle Links -->
        <div class="hidden md:flex space-x-8 items-center">
          <button class="bg-gray-800 text-white px-4 py-1 rounded-md"><a href="/">Trang chủ</a></button>
          ${data.map((item,index)=>{
            return `
              <a href="/sanpham/${item.id}" class="text-gray-500 hover:text-gray-900">${item.name}</a>
            
            `
          }).join('')}
         
          <a href="/products" class="text-gray-500 hover:text-gray-900">Tất cả</a>
        </div>

        <!-- Profile Section -->
        <div class="flex items-center space-x-2">
         ${localStorage.getItem("user")? `
          <span class=" text-user text-gray-700"></span>
          `:'<span class=" text-gray-700"><a href="/signup">Đăng Kí</a></span> <span class=" text-gray-700"><a href="/signin">Đăng nhập</a></span>'
   
         }
          
          <button type="button" class="relative flex items-center rounded-full bg-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
            <img class="h-8 w-8 rounded-full logoclick" src="https://via.placeholder.com/150" alt="User Profile">
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Dropdown menu -->
  <div class="hidden absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" id="user-menu">
    <a  href="" class="block px-4 py-2 text-sm text-gray-700" role="menuitem">Your Profile</a>
    <a  class="block px-4 py-2 text-sm text-gray-700 cursor-pointer  logout" role="menuitem">Sign out</a>
  </div>

        `

    },
    Afterender()
    {
      
      
      
      const username = document.querySelector(".text-user")
      if(username)
      {
        username.innerHTML=(JSON.parse(localStorage.getItem("user")).username)
      }
      const logoClick= document.querySelector(".logoclick")
      logoClick.addEventListener('click',()=>{
        var dropdownMenu = document.getElementById('user-menu');
        dropdownMenu.classList.toggle('hidden');
      })
      document.addEventListener('click', function(event) {
        var isClickInside = document.getElementById('user-menu-button').contains(event.target);
        var dropdownMenu = document.getElementById('user-menu');
  
        // If the click was outside the profile image, close the dropdown
        if (!isClickInside && !dropdownMenu.classList.contains('hidden')) {
          dropdownMenu.classList.add('hidden');
        }
        var logout= document.querySelector(".logout") // đăng xuất
      if(logout)
      {
          logout.addEventListener('click',()=>{
             localStorage.removeItem("user")
             toastr.success("Đăng xuất thành công")
           //  reRender(Header,"#header") // dùng cái này phải bỏ id header và id footer bên html
            location.reload(); // k dùng đến reRender
           
            

          })
      }
      });
      
      

    }
}
export default Header;