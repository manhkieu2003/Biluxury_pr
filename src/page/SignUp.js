import { data } from "autoprefixer"
import { signup } from "../api/user"
import Banner from "../components/banner"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import Header from "../components/header"
import Footer from "../components/footer"

const SignUp = {
   async render() {
        return /*html*/ `
     <div class="header">
     ${ await Header.render()}
     </div>
     ${Banner.render()}
    <div class="bg-gray-100 flex justify-center items-center h-screen">
       <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
       <h2 class="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
       <form id="signUp"  class="space-y-6">
           <div>
               <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
               <input id="username" name="username" type="text" 
                   class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
           </div>
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
               <label for="confirm_password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
               <input id="confirm_password" name="confirm_password" type="password" 
                   class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
           </div>
           <div class="flex items-center justify-between">
               <div class="flex items-center">
                   <input id="remember_me" name="remember_me" type="checkbox"
                       class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                   <label for="remember_me" class="ml-2 block text-sm text-gray-900">Remember me</label>
               </div>
               <div class="text-sm">
                   <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
               </div>
           </div>
           <div>
               <button
                   class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                   Register
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
         const sigupForm = document.querySelector("#signUp")
         sigupForm.addEventListener('submit',async (e)=>{
             e.preventDefault()
            signup({
                username:document.querySelector("#username").value,
                email:document.querySelector("#email").value,
                password:document.querySelector("#password").value,
                confirm_password:document.querySelector("#confirm_password").value

            }).then(()=>{
                toastr.success("Đăng ký thành công")
                setTimeout(() => {
                    document.location.href="/signin"
                },2000);
            })
            
         })
        
    }
}
export default SignUp
