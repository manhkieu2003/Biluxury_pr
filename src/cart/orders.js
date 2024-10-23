const checkoutData = JSON.parse(localStorage.getItem('checkoutData'));

const Order ={
    render()
    {
        console.log(checkoutData.cart)
        const data =checkoutData.cart
        console.log(data)
        return /*html*/`
        <div class="min-h-screen bg-gray-100 p-8">
        <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Your Order Summary</h2>

            <!-- Order Details -->
            <div class="border-b pb-6 mb-6">
                <h3 id="orderId" class="text-lg font-semibold">Order #123456</h3>
                <p id="timeNow" class="text-gray-600 mt-2">Placed on October 21, 2024</p>
                <p class="text-gray-600 mt-2">Shipping to: <span id="shippingAddress">${checkoutData.address}</span></p>
                <p class="text-gray-600 mt-2">Phone: <span id="phoneNumber">${checkoutData.phone}</span></p>
            </div>

            <!-- Cart Items -->
            <div class="mb-6">
                <h4 class="text-lg font-semibold mb-4">Items Ordered</h4>
                ${data.map((item) => {
                    return `
                        <div class="flex justify-between items-center border-b py-4">
                            <div>
                                <p class="text-sm text-gray-800 font-semibold">${item.name}</p>
                                <p class="text-sm text-gray-500">Quantity: <span>${item.quantity}</span></p>
                            </div>
                            <p class="text-sm text-gray-800 font-semibold">$${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    `;
                }).join('')}
            </div>

            <!-- Summary and Payment Info -->
            <div class="border-t pt-6">
                <div class="flex justify-between text-gray-600">
                    <p>Total Items</p>
                    <p><span id="totalItems">${data.length}</span> Items</p>
                </div>
                <div class="flex justify-between text-gray-600 mt-2">
                    <p>Subtotal</p>
                    <p id="subtotal">$${data.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</p>
                </div>
                <div class="flex justify-between text-gray-600 mt-2">
                    <p>Shipping</p>
                    <p>$5.00</p>
                </div>
                <div class="flex justify-between text-lg font-semibold text-gray-800 mt-4">
                    <p>Total</p>
                    <p id="totalCost">$${(data.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 5).toFixed(2)}</p>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="mt-8 text-center">
                <button id="placeNewOrderBtn" class="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-6 rounded-md">
                    Save Order
                </button>
            </div>
        </div>
    </div>
        `
    },
    Afterender()
    {
        function generateOrderId() {
            const prefix = "ORD"; // Tiền tố cho mã đơn hàng
            const randomId = Math.floor(Math.random() * 1000000); // Sinh số ngẫu nhiên
            const orderId = `${prefix}-${randomId}`;
            return orderId;
        } // sinh mã OrderId ngẫu nhiên
        
        function getCurrentTime() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            const currentTime = `${hours}:${minutes}:${seconds}`;
            return currentTime;
        }  // sinh giờ hiện tại và ... đang code giở sinh ngày hn
        
        document.getElementById("orderId").textContent=`Order ID:${generateOrderId()}`
        document.getElementById("timeNow").textContent=`Placed on: ${getCurrentTime()}`;

        // bắt đầu từ đoạn này là save vào file pdf
        document.getElementById("placeNewOrderBtn").addEventListener("click", () => {
            // Get the order details
            const checkoutData = JSON.parse(localStorage.getItem('checkoutData'));
            const data = checkoutData.cart || [];
    
            // Create a new PDF document
            const { jsPDF } = window.jspdf; // Access the jsPDF object
            const pdf = new jsPDF();
    
            // Add content to the PDF
            pdf.setFontSize(16);
            pdf.text('Your Order Summary', 20, 20);
            
            // Order details
            pdf.setFontSize(12);
            pdf.text(`Order ID: ${orderId}`, 20, 40);
            pdf.text(`Placed on: ${getCurrentTime()}`, 20, 50);
            pdf.text(`Shipping Address: ${checkoutData.address}`, 20, 60);
            pdf.text(`Phone: ${checkoutData.phone}`, 20, 70);
            
            // Items ordered
            pdf.text('Items Ordered:', 20, 90);
            let y = 100; // Start position for items
            data.forEach(item => {
                pdf.text(`- ${item.name} (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`, 20, y);
                y += 10; // Move down for the next item
            });
    
            // Summary
            pdf.text(`Subtotal: $${data.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`, 20, y + 10);
            pdf.text(`Shipping: $5.00`, 20, y + 20);
            pdf.text(`Total: $${(data.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 5).toFixed(2)}`, 20, y + 30);
    
            // Save the PDF
            pdf.save(`Order_${orderId}.pdf`);
        });
    
    }

}
export default Order