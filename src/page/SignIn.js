import { signin } from "../api/user"
import Banner from "../components/banner"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import Header from "../components/header"
import Footer from "../components/footer"

const signIn = {
   async render() {
        return /*html*/ `
        <div class="header">
     ${ await Header.render()}
     </div>
     ${Banner.render()}
    <div class="bg-gray-100 flex justify-center items-center h-screen">
       <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
       <h2 class="text-2xl font-bold text-center text-gray-800">Đăng nhập</h2>
       <form id="signIn"  class="space-y-6">
           
           <div>
               <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
               <input id="email" name="email" type="email" required
                   class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
           </div>
           <div>
               <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
               <input id="password" name="password" type="password" 
                   class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
           </div>
           
           
           <div>
               <button
                   class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                   Đăng nhập
               </button>
           </div>
       </form>
       <p class="mt-6 text-center text-sm text-gray-600">
           Already have an account?
           <a href="#" class="text-indigo-600 hover:text-indigo-500 font-medium">Sign in</a>
       </p>
   </div>
   </div>
   <div class="footer">
   ${Footer.render()}
   </div>

       `
    },
    Afterender() {
        Header.Afterender(); // gọi đến header của afterender
         const signinForm = document.querySelector("#signIn")
         signinForm.addEventListener('submit',async(e)=>{
             e.preventDefault()
             try{
                const {data}=await signin({
            
                    email:document.querySelector("#email").value,
                    password:document.querySelector("#password").value
                   
            
                })
                if(data)
                {
                    console.log(data)
                    // lưu thông tin
                    localStorage.setItem("user",JSON.stringify(data.user)) // chuyển đổi object sang chuỗi để lưu vào localstorage
                    toastr.success("Đăng nhập thành công chuyển trang sau 2s")
                    const userId=JSON.parse(localStorage.getItem("user")).id
                    if(userId===2) // vào trang dasboard
                        {
                            setTimeout(function(){
                                window.location.href = '/admin/dasboard';
                            }, 2000); 
                        } else{                   
                    setTimeout(function(){
                        window.location.href = 'http://localhost:5173/';
                    }, 2000); 
                }
                    // chuyển trang hoăcj
                    // document.location.href="/"
                }
             } catch(error)
             {
                toastr.error(error.response.data)
             //  console.log(error.response.data)
             }
           
            
         })
        
    }
}
export default signIn
