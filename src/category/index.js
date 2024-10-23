import { deleteCategory, getAll } from "../api/category"
import { reRender } from "../utils/reRender";

const Category={
    async render()
    {
        const {data}=await getAll();
        console.log(data)
       return /*html*/`
       <div class="container mx-auto p-6">
        <!-- Page Title -->
        <h1 class="text-4xl font-bold text-center text-gray-800 mb-10">Category Management</h1>

        <!-- Category Form (Add/Update) -->
        <div class="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 class="text-2xl font-semibold text-gray-800 mb-6">Add or Update Category</h2>
            <form id="category-form" class="space-y-6">
                <div>
                    <label for="category-name" class="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                    <input type="text" id="category-name" class="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="Enter category name">
                </div>
                <div class="flex justify-end">
                    <button type="submit" class="add-cate bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">Save Category</button>
                </div>
            </form>
        </div>

        <!-- Categories List -->
        <div class="bg-white p-8 rounded-lg shadow-lg">
            <h2 class="text-2xl font-semibold text-gray-800 mb-6">Category List</h2>
            <table class="min-w-full table-auto border-collapse border border-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-gray-200">ID</th>
                        <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Name</th>
                        <th class="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Actions</th>
                    </tr>
                </thead>
                <tbody id="category-list" class="divide-y divide-gray-200">
                    <!-- Categories will be dynamically inserted here -->
                    ${data.map((cate,index)=>{
                       return `
                       <tr>
                        <td class="px-6 py-4 text-sm text-gray-700 border border-gray-200">${cate.id}</td>
                        <td class="px-6 py-4 text-sm text-gray-700 border border-gray-200">${cate.name}</td>
                        <td class="px-6 py-4 text-center">
                            <button class="text-blue-600 hover:text-blue-800 mr-4">Edit</button>
                            <button data-id="${cate.id}" class="text-red-600 hover:text-red-800 cate-delete ">Delete</button>
                        </td>
                    </tr>
                       `
                    }).join('')}
                    
                </tbody>
            </table>
        </div>
    </div>
       `
    },
    Afterender()
    {
        const category_name = document.querySelector("#category-name").value
        const add_cate = document.querySelector(".add-cate")
        add_cate.addEventListener('submit',(e)=>{
            e.preventDefault()
          
        });
          
         const cateDelete = document.querySelectorAll(".cate-delete");
         cateDelete.forEach((btn) => {

         btn.addEventListener('click',()=>{
              const {id} = btn.dataset
              // callapi 
        if (confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
            deleteCategory(id).then(() => {
                reRender(Category, "#content");
            });
        }
         })
        })
    }
}
export default Category