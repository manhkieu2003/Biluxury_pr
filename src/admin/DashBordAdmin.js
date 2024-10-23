import Footer from "../components/footer"
import Header from "../components/header"

const dasboardAdmin={
   async render()
    {
        return /*html*/ `
            <div class="min-h-screen flex flex-col">
        <!-- Header -->
        <div class="header">
        ${await Header.render()}
        </div>
        <div class="bg-blue-600 text-white p-4">
            <h1 class="text-2xl font-bold">Main Dashboard</h1>
        </div>

        <!-- Main Content -->
        <div class="flex-grow container mx-auto py-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Dashboard Post -->
                <a href="/admin/dasboardPost" class="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50">
                    <div class="text-center">
                        <h2 class="text-xl font-semibold mb-2">Dashboard Post</h2>
                        <p class="text-gray-600">Manage posts and articles</p>
                    </div>
                </a>

                <!-- Dashboard Category -->
                <a href="/category" class="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50">
                    <div class="text-center">
                        <h2 class="text-xl font-semibold mb-2">Dashboard Category</h2>
                        <p class="text-gray-600">Manage product categories</p>
                    </div>
                </a>

                <!-- Dashboard Products -->
                <a href="/admin/dasboardProduct" class="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50">
                    <div class="text-center">
                        <h2 class="text-xl font-semibold mb-2">Dashboard Products</h2>
                        <p class="text-gray-600">Manage products</p>
                    </div>
                </a>
            </div>
        </div>

        <!-- Footer -->
     <div class="footer">
     ${Footer.render()}
     </div>
        
    </div>
        `
    },Afterender()
    {
        Header.Afterender()
    }
}
export default dasboardAdmin