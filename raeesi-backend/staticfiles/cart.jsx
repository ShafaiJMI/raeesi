// Function to fetch data from the API
function fetchCart() {
    // Replace 'https://api.example.com/data' with your actual API endpoint
    fetch('http://127.0.0.1:8000/api/cart-list')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            ReactDOM.render(<DataList data={data} />, document.getElementById('cart-items'));
        })
        .catch(error => {
            console.error('There was a problem fetching the data:', error);
        });
}

// Component to render data as a list
function DataList({ data }) {
    return (
        <ul>
            {data.map(item => (
                <li key={item.id} class="flex py-6">
          <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center"/>
          </div>
          
          <div class="ml-4 flex flex-1 flex-col">
            <div>
              <div class="flex justify-between text-base font-medium text-gray-900">
                <h3>
                  <a href="#">fetch from api</a>
                </h3>
                <p class="ml-4">₹90.00</p>
              </div>
              <p class="mt-1 text-sm text-gray-500">Salmon</p>
            </div>
            <div class="flex flex-1 items-end justify-between text-sm">
              <p class="text-gray-500">Qty 1</p>
              
              <div class="flex">
                <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
              </div>
            </div>
          </div>
        </li>
            ))}
        </ul>
    );
}

// Call the fetchData function when the page loads
document.addEventListener('DOMContentLoaded', fetchCart);
