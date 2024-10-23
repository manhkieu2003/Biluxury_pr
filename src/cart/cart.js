let cart=[];
if(localStorage.getItem('cart'))     // nếu có cart
{
    cart=JSON.parse(localStorage.getItem('cart'));  // lấy cart

}
export const addtoCart=(newCart,next)=>{  // hàm next là fuction
    const ExitCart = cart.find(item=>item.id==newCart.id)
    if(!ExitCart)
    {
        cart.push(newCart); // cart chưa có push mới
    }else{
        ExitCart.quantity++;
    }
    localStorage.setItem('cart',JSON.stringify(cart))
    next()
}
// Function to calculate the total price of the cart
const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};
  const inCrease=(id)=>{
 const items=cart.find(item=>item.id===id)
 items.quantity++
 localStorage.setItem('cart',JSON.stringify(cart))
 document.querySelector(`.input-quantity[data-id="${id}"]`).value = items.quantity;
 document.querySelector(`.item-total[data-id="${id}"]`).textContent = `$${(items.price * items.quantity).toFixed(2)}`;
    updateTotal();
}
 const deCrease=(id)=>{
   const curr= cart.find(item=>item.id===id)
   curr.quantity--;
   if(curr.quantity<1)
   {
        const confirm = window.confirm("bạn có chắc chắn muốn xóa")
        if(confirm)     // nếu confirm bằng true là muốn xóa thì sẽ trả ra cart k chứa phần tử đã xóa
        {

             cart =cart.filter(item=>item.id != id)
        }
        else {
            curr.quantity = 1; // Reset to 1 if user cancels the deletion
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    document.querySelector(`.input-quantity[data-id="${id}"]`).value = curr.quantity;
    document.querySelector(`.item-total[data-id="${id}"]`).textContent = `$${(curr.price * curr.quantity).toFixed(2)}`;
    updateTotal();
   
   }
   // Update total price dynamically
// const updateTotal = () => {
//     const totalPrice = calculateTotalPrice();


    
    

//     // Get the selected shipping cost from the dropdown
//     const shippingCost = parseFloat(document.querySelector('#shipping-select').value);
//     console.log(shippingCost)
//     document.querySelector('.total-price').textContent = `$${totalPrice.toFixed(2)}`;

//     // Update the total cost displayed in the "Total cost" section
//     document.querySelector('.total-cost').textContent = `$${(totalPrice + shippingCost).toFixed(2)}`;
// };


    




const CartPage={
    render()
    {   const totalPrice = calculateTotalPrice(); 
        cart = JSON.parse(localStorage.getItem('cart'))
      
        return /*html*/`
        <nav class="bg-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex justify-between">
            <div class="flex space-x-4">
              <a href="/products" class="text-gray-700 text-2xl font-bold py-5">MyStore</a>
            </div>
            <div class="flex items-center space-x-2">
              <a href="/" class="py-5 px-3 text-gray-700">Home</a>
              <a href="/products" class="py-5 px-3 text-gray-700">Products</a>
              <a href="/cartPage" class="py-5 px-3 text-gray-700">Cart</a>
            </div>
          </div>
        </div>
      </nav>
    
      <!-- Shopping Cart -->
      <div class="container mx-auto mt-10">
        <div class="flex shadow-md my-10">
          
          <!-- Cart Items -->
          <div class="w-3/4 bg-white p-10">
            <div class="flex justify-between border-b pb-8">
              <h1 class="font-semibold text-2xl">Shopping Cart</h1>
              <h2 class="font-semibold text-2xl">${cart.length} Items</h2>
            </div>
            <div class="flex mt-10 mb-5">
              <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
              <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
              <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
              <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
            </div>
            
            <!-- Cart Item 1 -->
            
            ${cart.map((item)=>{
                return `
                <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              <div class="flex w-2/5"> 
                <div class="w-20">
                  <img class="h-24" src="${item.img}" alt="Product">
                </div>
                <div class="flex flex-col justify-between ml-4 flex-grow">
                  <span class="font-bold text-sm">${item.name}</span>
                  
                 
            
                </div>
              </div>
              <div class="flex justify-center w-1/5">
                <button data-id="${item.id}" class=" btn btn-decrease text-gray-600 focus:outline-none">-</button>
                <input class="mx-2 border text-center w-8 input-quantity" type="text" data-id="${item.id}" value="${item.quantity}">
                <button data-id="${item.id}" class=" btn btn-increase text-gray-600 focus:outline-none">+</button>
              </div>
              <span class="text-center w-1/5 font-semibold text-sm">$${item.price}</span>
              <span class="text-center w-1/5 font-semibold text-sm item-total" data-id="${item.id}">$${(item.price * item.quantity).toFixed(2)}</span>
               <button data-id="${item.id}" class="btn font-semibold hover:text-red-500 text-gray-500 text-xs">
                      Remove
                  </button>
            </div>
                `
            }).join('')}
             
            
    
            <!-- Add more cart items as needed -->
            
            <a href="/products" class="flex font-semibold text-indigo-600 text-sm mt-10">
              <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H0v-80h134.059v-88.94L224 0l89.941 127.06H448v80H313.941v88.94L224 448l-89.941-127.06H0v-80h134.059v88.94z"/></svg>
              Continue Shopping
            </a>
          </div>
    
          <!-- Cart Summary -->
          <div class="w-1/4 bg-gray-100 p-8">
            <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            <div class="flex justify-between mt-10 mb-5">
              <span class="font-semibold text-sm uppercase">Items ${cart.length}</span>
              <span class="font-semibold text-sm total-price">$${totalPrice.toFixed(2)}</span>
            </div>
            <div>
              <label class="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
              <select id="shipping-select" class="block p-2 text-gray-600 w-full text-sm">
                <option value="5">Standard shipping - $5.00</option>
                <option value="15">Express shipping - $15.00</option>
              </select>
            </div>
            <div class="border-t mt-8">
              <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span class="total-cost">$${(totalPrice + 5).toFixed(2)}</span>
              </div>
              <button id="btn-checkout" class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
            </div>
          </div>
    
        </div>
      </div>
        `
    },
    Afterender()
    {
        const btns= document.querySelectorAll('.btn')
        btns.forEach((btn)=>{
              btn.addEventListener('click',()=>{
                const {id} = btn.dataset
                if(btn.classList.contains('btn-increase'))
                {
                   inCrease(id)
                }else if(btn.classList.contains('btn-decrease')){
                   deCrease(id)
                }else{
                    cart = cart.filter(item => item.id != id);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    location.reload();
                }
              })
        })
         // Ensure the total cost updates when the shipping option changes
        //  document.querySelector('#shipping-select').addEventListener('change', updateTotal);

        //  updateTotal(); // Initial call to ensure total cost is updated correctly
         document.getElementById('btn-checkout').addEventListener('click', () => {
          // Store cart information in localStorage (already done during cart updates)
          window.location.href = '/checkout'; // Redirect to checkout page
      });

    }
}
export default CartPage