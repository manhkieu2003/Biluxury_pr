import { getAll, getCategory, getProducts } from "../api/category";

import Footer from "../components/footer";
import Header from "../components/header";

const AoNam={
   async render(id)
    { 
        // nếu gọi 2 api thì phải chỉ định giá trị cho nó data:giá trị
      const {data} = await getProducts(id);
      const items=data.Products
     
      const { data: categoryData } = await getCategory(id);
     
        
        return `
           <div class="header">
         ${await Header.render()}
        </div>
        <div class="bg-gray-100 py-10">
            <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <!-- Title -->
                
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">Danh sách ${categoryData.name}</h2>
                
                <!-- Product Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${items.map(item => {
                        return /*html*/`
                        
                        <div class="group bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                                <a href="/products/${item.id}">
                                    <img src="${item.img}" alt="${item.name}" class="w-full h-64 object-cover group-hover:opacity-80 transition duration-300 ease-in-out">
                                </a>
                            </div>
                            <div class="mt-4">
                                <h3 class="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition duration-300">
                                    <a href="/products/${item.id}">${item.name}</a>
                                </h3>
                            </div>
                            <div class="mt-4">
                                <h3 class="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition duration-300">
                                    <a href="/products/${item.id}">Giá:${item.price}đ</a>
                                </h3>
                            </div>
                        </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
        <div class="footer">
        ${Footer.render()}
        </div>
         
        `
    },Afterender()
    {
        Header.Afterender()
         
    }
}
export default AoNam