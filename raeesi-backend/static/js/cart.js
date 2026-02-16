// Function to add a product to the cart

function addToCart(productSlug) {
    fetch(`'http://127.0.0.1:8000/api/cart/${productSlug}/`, {
        method: 'POST',
        credentials: 'same-origin',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add product to cart');
        }
        console.log('Product added to cart successfully');
        // Optionally, perform additional actions after adding the product to cart
    })
    .catch(error => {
        console.error('Error adding product to cart:', error);
    });
}

// Function to remove a product from the cart
function removeFromCart(cartItemId) {
    fetch(`'http://127.0.0.1:8000/api/cart/${cartItemId}/`, {
        method: 'DELETE',
        credentials: 'same-origin',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to remove product from cart');
        }
        console.log('Product removed from cart successfully');
        // Optionally, perform additional actions after removing the product from cart
    })
    .catch(error => {
        console.error('Error removing product from cart:', error);
    });
}

function CartList() {
    fetch('http://127.0.0.1:8000/api/cart-list/')
    .then(response => response.json())
    .then(data => {
        if (data && data.length > 0 && data[0].product && data[0].product.thumbnail) {
            const product = data[0].product;
            const quantity = data[0].quantity;
            const totalPrice = data[0].total_price;
    // Process the fetched data and generate HTML with the data
    const htmlTemplate = `
      <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
        <div class="flex w-2/5"> <!-- product -->
          <div class="w-20">
            <img class="h-24" src="${product.thumbnail}" alt="${product.title}">
          </div>
          <div class="flex flex-col justify-between ml-4 flex-grow">
            <span class="font-bold text-sm">${product.title}</span>
            <span class="text-red-500 text-xs">${product.category}</span>
            <a href="#" class="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
          </div>
        </div>
        <div class="flex justify-center w-1/5">
          <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
          <input class="mx-2 border text-center w-8" type="text" value="${quantity}">
          <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
        </div>
        <span class="text-center w-1/5 font-semibold text-sm">${product.price}</span>
        <span class="text-center w-1/5 font-semibold text-sm">${totalPrice}</span>
      </div>
    `;
    
    // Create a wrapper element
    const wrapper = document.createElement('div');
    wrapper.innerHTML = htmlTemplate.trim(); // Remove leading/trailing whitespace
    
    // Append the wrapper element to any other element in the DOM
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.appendChild(wrapper);
} 
else {
    console.error('Invalid data received from the API.');
}
  })
  .catch(error => {
    console.error('Error fetching data:', error);

  });
}
document.addEventListener('DOMContentLoaded', CartList);