function stickyMenu() {
    var sticy = document.getElementById('sticky');
    if (window.pageYoffset > 220) {
        sticky.classList.add('sticky');
    }
    else {
        sticky.classList.remove('sticky');
    }
}
window.onscroll = function () {
    stickyMenu();
}

var cart=[];
var fruits=[];
var vagitables=[];
function addFruitToCart(item) {
    console.log(item)
   let fruit = fruits.filter(fruit => fruit.name==item.id);
   console.log(fruit);
   let alreadyAddedFruit = cart.filter(fruit => fruit.name==item.id);
   console.log(alreadyAddedFruit);
   if(alreadyAddedFruit[0] != null ){
       cart.pop(alreadyAddedFruit)
        alreadyAddedFruit[0].price = alreadyAddedFruit[0].price+fruit[0].price;
        cart.push(alreadyAddedFruit[0]);
        console.log(cart);
        loadCartData()
        return 0;
   }
   console.log(cart);
   cart.push(fruit[0])
   loadCartData()


}

function addVagitableToCart(item){
    let vagitable = vagitables.filter(vagitable => vagitable.name==item.id);
    console.log(vagitable);
    let alreadyAddedVegitable = cart.filter(vag => vag.name==item.id);
    console.log(alreadyAddedVegitable);
    if(alreadyAddedVegitable[0] != null ){
        cart.pop(alreadyAddedVegitable)
        alreadyAddedVegitable[0].price = alreadyAddedVegitable[0].price+vagitable[0].price;
         cart.push(alreadyAddedVegitable[0]);
         console.log(cart);
         loadCartData()
         return 0;
    }
   
    cart.push(vagitable[0])
    loadCartData()
    console.log(cart);
}

function removeItemFrmCart(item){
    let toRemove = vagitables.filter(vagitable => vagitable.name==item.id);
    cart.pop(toRemove)
    loadCartData()
}

function loadCartData(){
    let cards = "";

for(const item of cart){
    cards = `${cards} <div class="items" style="position:relative">
    <button id="${item.name}" class="remove-btn" style="position:absolute;right:3px" onclick="removeItemFrmCart(this)">Remove item</button>
    <div class="images" >
      
        <img src="${item.image}" class="item-image-size" width = "225" height = "225">
        <div class="desription"></div>
        <b>${item.name}</b>
        <div class="item-select">
        M.R.P: ₹ ${item.price}/250 grams
        </div>
        
    </div>
</div>`
}
document.getElementById("cart-item").innerHTML = cards;
document.getElementById("cart-count").innerHTML = "Cart " + "(" + cart.length + ")";
}

loadData();

async function loadData(){
    document.getElementById("cart-count").innerHTML = "Cart "  + "(" + cart.length + ")";
    if(localStorage.getItem("ValidUser") == undefined){
        window.location.replace("pages/index.html");
    }
  fruits= JSON.parse(await makeAJAXCall('GET', 'http://localhost:3000/fruit'));
console.log(fruits);
// makeAJAXCall('GET', 'http://localhost:3000/fruit')
// .then(fruit=> {this.fruits=JSON.parse(fruit); console.log(fruits);})
let cards = document.getElementById("fruits").innerHTML;

for(const fruit of fruits){
    cards = `${cards} <div class="items">
    <div class="images">
        <img src="${fruit.image}" class="item-image-size" width = "225" height = "225">
        <div class="desription"></div>
        <b>${fruit.name}</b>
        <div class="item-select">
        M.R.P: ₹ ${fruit.price}/250 grams
        </div>
        <button id="${fruit.name}" class="buynow-btn" onclick=addFruitToCart(this)>Buy Now</button>
    </div>
</div>`
}
document.getElementById("fruits").innerHTML = cards;
cards = "";
cards = document.getElementById("vegetables").innerHTML;
vagitables= JSON.parse(await makeAJAXCall('GET', 'http://localhost:3000/vegetable'));
for(const vagitable of vagitables){
   cards = `${cards} <div class="items">
                <div class="images">
                    <img src="${vagitable.image}" class="item-image-size" width = "225" height = "225">
                    <div class="desription"></div>
                    <b>${vagitable.name}</b>
                    <div class="item-select">
                    M.R.P: ₹ ${vagitable.price} / 250 grams
                    </div>
                    
                    <button id="${vagitable.name}" class="buynow-btn" onclick=addVagitableToCart(this)>Buy Now</button>
                </div>
            </div>`
}
document.getElementById("vegetables").innerHTML = cards;
}

function placeOrder(){
    alert("your order has been placed. it will be deliver on " + localStorage.getItem("userAddress") +",Thank you for shopping" )
    cart=[];
    loadCartData();
}
function logOut(){
    localStorage.removeItem("ValidUser");
    localStorage.removeItem("userAddress");
    window.location.replace("pages/index.html");
}