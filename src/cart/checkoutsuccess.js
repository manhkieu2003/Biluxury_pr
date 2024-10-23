
const CheckoutSuccess={
    render()
    {
       
        return /*html*/`
        <div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
    <h2 class="text-3xl font-semibold text-green-500">Checkout Complete!</h2>
    <p class="mt-4 text-gray-600">Thank you for your order. Your transaction has been completed successfully.</p>
    <div class="mt-6">
      <button id="viewOrderBtn" class="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-full">
        View Your Orders
      </button>
    </div>
  </div>
</div>
        `
    },
    Afterender()
    {
        document.getElementById('viewOrderBtn').addEventListener('click', () => {
            window.location.href = '/orders'; // Redirect to the order page
        });
    }
}
export default CheckoutSuccess