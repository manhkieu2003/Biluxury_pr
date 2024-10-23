// const cart = JSON.parse(localStorage.getItem('cart')) || [];
// const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
// const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
const Checkout = {
    render() {
        // console.log(cart)
        return /*html*/`
        <div class="container mx-auto mt-10">
        <div class="flex shadow-md my-10">

            <!-- Checkout Form -->
            <div class="w-3/4 bg-white p-10">
                <h1 class="font-semibold text-2xl border-b pb-8">Checkout</h1>

                <form id="checkoutForm">
                    <!-- Shipping Information -->
                    <div class="mt-10 mb-5">
                        <h3 class="font-semibold text-gray-600 text-lg">Shipping Information</h3>
                        <div class="grid grid-cols-2 gap-6 mt-4">
                            <div class="col-span-2 md:col-span-1">
                                <label for="fullName" class="block text-gray-700 text-sm">Full Name</label>
                                <input type="text" id="fullName" name="fullName" required class="w-full px-3 py-2 border rounded-md text-gray-700">
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <label for="phone" class="block text-gray-700 text-sm">Phone</label>
                                <input type="tel" id="phone" name="phone" required class="w-full px-3 py-2 border rounded-md text-gray-700">
                            </div>
                            <div class="col-span-2">
                                <label for="address" class="block text-gray-700 text-sm">Shipping Address</label>
                                <input type="text" id="address" name="address" required class="w-full px-3 py-2 border rounded-md text-gray-700">
                            </div>
                        </div>
                    </div>

                    <!-- Payment Information -->
                    <div class="mt-10 mb-5">
                        <h3 class="font-semibold text-gray-600 text-lg">Payment Information</h3>
                        <div class="mt-4">
                            <label for="paymentMethod" class="block text-gray-700 text-sm">Select Payment Method</label>
                            <select id="paymentMethod" name="paymentMethod" required class="w-full px-3 py-2 border rounded-md text-gray-700">
                                <option value="">Select</option>
                                <option value="credit-card">Credit Card</option>
                                <option value="paypal">PayPal</option>
                                <option value="bank-transfer">Bank Transfer</option>
                            </select>
                        </div>
                    </div>

                    <!-- Cart Summary -->
                    <div class="mt-10 mb-5">
                        <h3 class="font-semibold text-gray-600 text-lg">Cart Summary</h3>
                        <div class="flex justify-between mt-4">
                            <span class="font-semibold text-sm">Total Items</span>
                            <span class="font-semibold text-sm" id="totalItems">3</span>
                        </div>
                        <div class="flex justify-between mt-2">
                            <span class="font-semibold text-sm">Total Price</span>
                            <span class="font-semibold text-sm" id="totalPrice">$120.00</span>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="mt-10">
                        <button type="submit" class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-md w-full">
                            Complete Checkout
                        </button>
                    </div>
                </form>
            </div>

            <!-- Order Summary Sidebar -->
            <div class="w-1/4 bg-gray-100 p-8">
                <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                <div class="flex justify-between mt-10 mb-5">
                    <span class="font-semibold text-sm uppercase total-item">Items 3</span>
                    <span class="font-semibold text-sm total-price">$120.00</span>
                </div>
                <div>
                    <label class="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                    <select id="shippingSelect" class="block p-2 text-gray-600 w-full text-sm">
                        <option value="5">Standard Shipping - $5.00</option>
                        <option value="15">Express Shipping - $15.00</option>
                    </select>
                </div>
                <div class="border-t mt-8">
                    <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                        <span>Total cost</span>
                        <span id="totalCost">$125.00</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
        `
    },
    Afterender() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Update the cart summary
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        document.getElementById('totalItems').textContent = totalItems;
        document.getElementById('totalPrice').textContent = `$${totalPrice.toFixed(2)}`;
        document.querySelector(".total-item").textContent = ` Items ${cart.length}`
        document.querySelector(".total-price").textContent = `$${totalPrice.toFixed(2)}`;

        //
        const shippingCost = parseFloat(document.getElementById('shippingSelect').value);
        console.log(shippingCost)

        document.getElementById('totalCost').textContent = `$${(totalPrice + shippingCost).toFixed(2)}`;

        const updateTotalCost = () => {
            const shippingCost = parseFloat(document.getElementById('shippingSelect').value);
            console.log(shippingCost)

            document.getElementById('totalCost').textContent = `$${(totalPrice + shippingCost).toFixed(2)}`;
        };
        document.querySelector('#shippingSelect').addEventListener('change', updateTotalCost);

        document.getElementById('checkoutForm').addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = {
                fullName: document.getElementById('fullName').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                paymentMethod: document.getElementById('paymentMethod').value,
                totalPrice: document.getElementById('totalCost').textContent
            };

            console.log("Form Submitted:", formData);

            localStorage.setItem('checkoutData', JSON.stringify({...formData,cart}));

            alert('Checkout Complete!');
            setTimeout(() => {
                localStorage.removeItem('cart');
                window.location.href = "/checkoutsuccess"
            }, 1000);

            // Here you would send the formData to your server or handle it as needed
        });
    }
}
export default Checkout