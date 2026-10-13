let cart = document.querySelector('.cart');
let productGrid = document.getElementById('productGrid');
let nameInp = document.getElementById('productName');
let priceInp = document.getElementById('productPrice');
let categoryInp = document.getElementById('productCategory');
let descriptionInp = document.getElementById('productDescription');
let imagesInp = document.getElementById('productImages');
let cartItems = document.getElementById('cart-items');
let increaseBtn = document.getElementById('increase');
let decreaseBtn = document.getElementById('decrease');
let countPro = document.getElementById('count-pro');
let shopCount = document.getElementById('shopCount');
let cartCount = document.getElementById('cartCount');
let subTotal = document.getElementById('subTotal');
let deleteBtn = document.getElementById('delete');
let searchInput = document.getElementById('search');
let searchBtn = document.getElementById('search-btn');
let categeory = document.getElementById('category');
let orderGrid = document.getElementById('orderGrid');
let total = document.getElementById('total');
let subTotalCheck = document.getElementById('subtotal');
let shipping = document.getElementById('shipping');
let placeOrderBtn = document.getElementById('placeOrderBtn');


//open cart
function openCart(){
    cart.classList.toggle('open');
}

//add product to the shop
let products;
if(localStorage.getItem('products') !== null){
    products = JSON.parse(localStorage.getItem('products'));
}else{
    products = [];
}

function addProduct(){
    const file = imagesInp.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e){
        let product = {
            name : nameInp.value,
            price : Number(priceInp.value),
            category : categoryInp.value,
            description : descriptionInp.value,
            image : e.target.result,
            
        };

        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        clearForm();
        displayProducts();
    };
    
    

    if(file){
        reader.readAsDataURL(file);
    }
    
}


//clear the form after add product
function clearForm(){
    nameInp.value = '';
    priceInp.value = '';
    categoryInp.value = '';
    descriptionInp.value = '';
    imagesInp.value = '';
}

//display products
function displayProducts(){
    let html = '';
    if (productGrid !== null){
    for(let i = 0; i < products.length; i++){
        html += `
        <div class="product-card">
                <div class="product-image-container">
                    <img src="${products[i].image}" class="product-image">
                    <span class="product-badge">New</span>
                </div>
                <div class="product-info">
                    <span class="product-category">${products[i].category}</span>
                    <h3 class="product-title">${products[i].name}</h3>
                    <div class="product-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                        <span>(128)</span>
                    </div>
                    <p class="product-price">$${products[i].price}</p>
                    <button onclick="addToCart(${i})" class="add-to-cart">
                        ADD TO CART <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        
        `;
    }
    productGrid.innerHTML = html;
    
}
}
if (productGrid !== null){
displayProducts();
}

//cart functions

let cartProducts;
if (localStorage.getItem('cartProductslocal') !== null) {
    cartProducts = JSON.parse(localStorage.getItem('cartProductslocal'));
} else {
    cartProducts = [];
}

function addToCart(i){
    
    let cartPro = {
        name : products[i].name,
        price : products[i].price,
        image : products[i].image,
        quantity : Number(1),
        
    }
    
    if (cartProducts !== null){
        cartProducts.push(cartPro)
        localStorage.setItem('cartProductslocal', JSON.stringify(cartProducts)); 
        displayCartItems();
}
    cartCount.innerHTML = cartProducts.length;
    shopCount.innerHTML = cartProducts.length;
    
    

    let total = 0;

    for (let i = 0; i < cartProducts.length; i++) {
    let product = cartProducts[i];
    
    
    let price = parseFloat(product.price);
    let quantity = parseInt(product.quantity);
    
    total += price * quantity;
    }
    
    subTotal.innerHTML = total;
    
    event.currentTarget.innerHTML = "✔ ADDED";
    event.currentTarget.style.backgroundColor = "white";
    event.currentTarget.style.color = "#4a90e2";
    event.currentTarget.style.border = "1px solid rgb(74, 144, 226)";
    event.currentTarget.onclick = null;
}

function displayCartItems(){
    let html = '';
    if (cartProducts !== null){
    for (let i = 0 ; i < cartProducts.length ; i++){
        html += `
        <div class="cart-item" >
                
                    <img class="cart-img" src="${cartProducts[i].image}" alt="">
                <div class="content">
                    <h4>${cartProducts[i].name}</h4>
                    <p class="price">Price: ${cartProducts[i].price}</p>
                    <div class="quantaty-control">
                        <button onclick="increaseQuantity(${i})" id="increase">+</button>
                        <span class="count-pro" id="count-pro">${cartProducts[i].quantity}</span>
                        <button onclick="decreaseQuantity(${i})" id="decrease">-</button>
                </div>
                </div>
                
                <i data-id="${i}" onclick="deleteItem(${i})" id="delete" class="fas fa-trash "></i>
            </div>
        `
        
    }
}

cartItems.innerHTML = html;
}
if (cartItems !== null) {
    displayCartItems();
}

function deleteItem (i){
    let productName = cartProducts[i].name;
    cartProducts.splice(i,1);
    localStorage.setItem('cartProductslocal', JSON.stringify(cartProducts));
    cartCount.innerHTML = cartProducts.length;
    shopCount.innerHTML = cartProducts.length;
    let total = 0;


for (let i = 0; i < cartProducts.length; i++) {
let product = cartProducts[i];



let price = product.price;
let quantity = product.quantity;

total += price * quantity;
}


    

if (productGrid) { 
        let productCards = productGrid.getElementsByClassName('product-card');
        for (let card of productCards) {
            let title = card.querySelector('.product-title').textContent;
            if (title == productName) {
                let addButton = card.querySelector('.add-to-cart');
                addButton.innerHTML = 'ADD TO CART <i class="fas fa-shopping-cart"></i>';
                addButton.style.backgroundColor = '';
                addButton.style.color = '';
                addButton.style.border = '';
                addButton.onclick = function() { addToCart(products.findIndex(p => p.name === productName)); };
                break;
            }
        }
    }
    

subTotal.innerHTML = total;
    displayCartItems();

    
};

function increaseQuantity(i){
    cartProducts[i].quantity++;
    localStorage.setItem('cartProductslocal', JSON.stringify(cartProducts));
    displayCartItems();
    let total = 0;

for (let i = 0; i < cartProducts.length; i++) {
let product = cartProducts[i];


let price = product.price;
let quantity = product.quantity;

total += price * quantity;
}

subTotal.innerHTML = total;
}

function decreaseQuantity(i){
    cartProducts[i].quantity--;
    localStorage.setItem('cartProductslocal', JSON.stringify(cartProducts));
    if (cartProducts[i].quantity < 1){
        deleteItem(i);
    }
    cartCount.innerHTML = cartProducts.length;
    shopCount.innerHTML = cartProducts.length;
    displayCartItems();
    let total = 0;

for (let i = 0; i < cartProducts.length; i++) {
let product = cartProducts[i];


let price = product.price;
let quantity = product.quantity;

total += price * quantity;
}

subTotal.innerHTML = total;
}

onload = function(){
    if (cartCount && shopCount !== null){
    cartCount.innerHTML = cartProducts.length;
    shopCount.innerHTML = cartProducts.length;
    let total = 0;

for (let i = 0; i < cartProducts.length; i++) {
let product = cartProducts[i];


let price = product.price;
let quantity = product.quantity;

total += price * quantity;
}

subTotal.innerHTML = total;
    }
    if (categeory !== null){
    categeory.value = 'All Categories';
    }
    

}

console.log(products);

//search 
if (searchInput !== null){
searchInput.onkeyup = function(){
    let value = searchInput.value;
    let html = '';
    for (let i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(value.toLowerCase())) {
            html += `
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${products[i].image}" class="product-image">
                    <span class="product-badge">New</span>
                </div>
                <div class="product-info">
                    <span class="product-category">${products[i].category}</span>
                    <h3 class="product-title">${products[i].name}</h3>
                    <div class="product-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                        <span>(128)</span>
                    </div>
                    <p class="product-price">$${products[i].price}</p>
                    <button onclick="addToCart(${i})" class="add-to-cart">
                        ADD TO CART <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        `;
        
    }
    productGrid.innerHTML = html;    
}
}
}

//category sort
if (categeory !== null){
categeory.onchange = function sortCategory(){
    let html = '';
    for (let i = 0; i < products.length; i++) {
        if (products[i].category.toLowerCase() == categeory.value.toLowerCase()){
            
            html += `
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${products[i].image}" class="product-image">
                    <span class="product-badge">New</span>
                </div>
                <div class="product-info">
                    <span class="product-category">${products[i].category}</span>
                    <h3 class="product-title">${products[i].name}</h3>
                    <div class="product-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                        <span>(128)</span>
                    </div>
                    <p class="product-price">$${products[i].price}</p>
                    <button onclick="addToCart(${i})" class="add-to-cart">
                        ADD TO CART <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        `;

        }
        productGrid.innerHTML = html;
    }
    
    if (categeory.value == 'All Categories'){
        displayProducts();
    } 
    
}
}


if (orderGrid !== null){
    let html = '';
    if (cartProducts !== null){
    for (let i = 0; i < cartProducts.length; i++) {
        html += `
        <div class="order-item">
            <div class="item-image">
                <img src="${cartProducts[i].image}" alt="${cartProducts[i].name}">
                <span class="item-quantity">${cartProducts[i].quantity}x</span>
            </div>
            <div class="item-details">
                <h4>${cartProducts[i].name}</h4>
                <p class="item-price">${cartProducts[i].price * cartProducts[i].quantity}</p>
            </div>
        </div>
    `;
    }
    
    orderGrid.innerHTML = html;
    };
    
    countTotal ();
}
function shippingPrice(id){
    if (id == 'long'){
        shipping.innerHTML = 5.99;
    }else{
        shipping.innerHTML = 12.99;
    }
    countTotal();
}


function countTotal (){
    let subTotalVar = 0;
    for (let i = 0; i < cartProducts.length; i++) {
        
        subTotalVar += cartProducts[i].price * cartProducts[i].quantity;
        subTotalCheck.innerHTML = subTotalVar;
        
    }

    
    let totalValue = Number(subTotalCheck.innerHTML) + Number(shipping.innerHTML);
    total.innerHTML = totalValue;
}

let orders ;
if (localStorage.getItem('orderslocal') !== null){
    orders = JSON.parse(localStorage.getItem('orderslocal'));
}else{
    orders = [];
}
if (placeOrderBtn){
    placeOrderBtn.onclick = function placeOrder(){
    if (orderGrid !== null){
        event.preventDefault();
        document.getElementById('warning').style.display = 'block';
        
        setTimeout(() => {
            document.getElementById('warning').style.display = 'none';
        }, 3000);
    }else{
    orderGrid.innerHTML = '';
    cartProducts = [];
    localStorage.setItem('cartProductslocal', JSON.stringify(cartProducts));
    }
}

}





