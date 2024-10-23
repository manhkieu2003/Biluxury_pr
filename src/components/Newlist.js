 import { getAll } from "../api/post"
import data from "../data"


const NewList={
    
   async render(){
        const {data} = await getAll()
    

        return /*html*/`
        <div class="bg-gray-100 py-10">
            <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <!-- Title -->
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">Tâm điểm mùa hè</h2>
                
                <!-- Product Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${data.map(post => {
                        return /*html*/`
                        <div class="group bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                                <a href="/news/${post.id}">
                                    <img src="${post.img}" alt="${post.title}" class="w-full h-64 object-cover group-hover:opacity-80 transition duration-300 ease-in-out">
                                </a>
                            </div>
                            <div class="mt-4">
                                <h3 class="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition duration-300">
                                    <a href="/news/${post.id}">${post.title}</a>
                                </h3>
                            </div>
                        </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
        <div>
        <img class="w-100" src="//theme.hstatic.net/200000053174/1001115888/14/home_about_1_image.jpg?v=5303" alt="" loading="lazy">
         </div>
        

        
    </div>
        `
    }
}
export default NewList