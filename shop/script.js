
var colors = ["red", "blue", "green", "black", "white"];
var sizes = ["S", "M", "L", "XL"];


function colorArray(){
  let count = 3;
  let c = [];

  while(count > 0){
    let col = colors[Math.floor(Math.random()*5)];

    if(!c.includes(col)){
      count--;
      c.push(col);
    }
  }
  return c;
}


function sizeArray(){
  let count = 3;

  let s = [];

  while(count > 0){
    let si = sizes[Math.floor(Math.random()*4)];

    if(!s.includes(si)){
      count--;
      s.push(si);
    }
  }
  return s;
}


async function shop(){
  
  let response = await fetch('https://fakestoreapi.com/products');
  let data = await response.json();

  let menItem =[];
  let womenItem = [];
  let jewelleryItem = [];
  let electronicsItem = [];

  data.map((item)=>{


    let color = colorArray();

    let size = sizeArray();

    item["color"] = color;
    item["size"] = size;

    if(item.category == "men's clothing"){            
        
      menItem.push(item);

    }else if(item.category == "women's clothing"){

      womenItem.push(item);
    }else if(item.category == "jewelery"){

      jewelleryItem.push(item);

    }else if(item.category == "electronics"){

      electronicsItem.push(item);
    }
  })

    // console.log(menItem, womenItem, jewelleryItem, electronicsItem);

    localStorage.setItem('men', JSON.stringify(menItem));
    localStorage.setItem('women', JSON.stringify(womenItem));
    localStorage.setItem('jewellery', JSON.stringify(jewelleryItem));
    localStorage.setItem('electronics', JSON.stringify(electronicsItem));
   console.log(data);
}


function itemHtml(item){
  return `
          <div class="item">
          <div class="img-Container">
            <img src=${item.image} alt="Item" />
          </div>
          
          <div class="info">
            <div class="row">
              <div class="price">$ ${item.price}</div>
              <div class="sized">${item.size[0]},${item.size[1]},${item.size[2]}</div>
            </div>
            <div class="colors">
              Colors:
              <div class="row">
                <div class="circle" style="background-color: ${item.color[0]}"></div>
                <div class="circle" style="background-color: ${item.color[1]}"></div>
                <div class="circle" style="background-color: ${item.color[2]}"></div>
              </div>
            </div>
            <div class="row">Rating: ${item.rating.rate}</div>
          </div>
          <button id="${item.id}" >Add to Cart</button>
          <div class="added" id="b${item.id}">Go to Cart</div>
        </div>           
        `
}


function allFilt(){
  let all = document.getElementById('all-Filter');

  removeActive();

  all.classList.add('active');

  document.getElementById('men-section').style.display = "block";
  document.getElementById('women-section').style.display = "block";
  document.getElementById('jewellery-section').style.display = "block";
  document.getElementById('electronics-section').style.display = "block";

}

function men(){
  let men = document.getElementById('mensFilter');
  removeActive();
  men.classList.add('active');

  displayNone();
  document.getElementById('men-section').style.display = "block";
}

function women(){
  let women = document.getElementById('womensFilter');
  removeActive();
  women.classList.add('active');

  displayNone();
  document.getElementById('women-section').style.display = "block";
}

function jewellery(){
  let jewellery = document.getElementById('jewelleryFilter');
  removeActive();
  jewellery.classList.add('active');

  displayNone();
  document.getElementById('jewellery-section').style.display = "block";
}

function electronics(){
  let electronics = document.getElementById('electronicsFilter');
  removeActive();
  electronics.classList.add('active');

  displayNone();
  document.getElementById('electronics-section').style.display = "block";
}

function removeActive(){
  let filters = document.getElementsByClassName('filter');
  for(let i=0; i<5; i++){
    filters[i].classList.remove('active');
  }
}


function displayNone(){
  document.getElementById('men-section').style.display = "none";
  document.getElementById('women-section').style.display = "none";
  document.getElementById('jewellery-section').style.display = "none";
  document.getElementById('electronics-section').style.display = "none";
}



function sideFilters(data){

  let filterDataColor = filterByColor(data);
  let filterDataSize = filterBySize(filterDataColor);
  let filterDataRating = filterByRating(filterDataSize);
  let filteDataPrice = filterByPrice(filterDataRating);
  let filterDataSearch = searchFilter(filteDataPrice);


  return filterDataSearch;

}



function filterByColor(data){
  let colors = document.getElementsByClassName('colors');

  let red = colors[0].checked;
  let blue = colors[1].checked;
  let green = colors[2].checked;
  let black = colors[3].checked;
  let white = colors[4].checked;


  let filteredData = [];

  if(!red && !blue && !green && !black && !white){

    // console.log(data);
    return data;
  }

  data.map((item) =>{
    if(red && item.color.includes('red')){
      filteredData.push(item);
    }else if(blue && item.color.includes('blue')){
      filteredData.push(item);
    }
    else if(green && item.color.includes('green')){
      filteredData.push(item);
    }
    else if(black && item.color.includes('black')){
      filteredData.push(item);
    }else if(white && item.color.includes('white')){
      filteredData.push(item);
    }
  })

  return filteredData;
}

function filterBySize(data){
  let sizes = document.getElementsByClassName('sizes');

  let s = sizes[0].checked;
  let m = sizes[1].checked;
  let l = sizes[2].checked;
  let xl = sizes[3].checked;

  let filteredData = [];

  if(!s && !m && !l && !xl){
    // console.log(data);
    return data;
  }

  data.map((item) =>{
    if(s && item.size.includes('S')){
      filteredData.push(item);
    }
    else if(m && item.size.includes('M')){
      filteredData.push(item);
    }
    else if(l && item.size.includes('L')){
      filteredData.push(item);
    }
    else if(xl && item.size.includes('XL')){
      filteredData.push(item);
    }
  })

  return filteredData;
}

function filterByRating(data){
  let rating = document.getElementById('range').value;
  // console.log(rating);

  let filteredData = data.filter((item) => {
    return (item.rating.rate >= rating);
  })

  return filteredData;
}

function filterByPrice(data){
  let pRange = document.getElementsByClassName('rage');

  let range0 = pRange[0].checked;
  let range25 = pRange[1].checked;
  let range50 = pRange[2].checked;
  let range100 = pRange[3].checked;

  // console.log(range100, pRange[3]);

  let filteredData = [];

  if(!range0 && !range25 && !range50 && !range100){
    data.map((item) =>{
      filteredData.push(item);
    });
    return filteredData;
  }

  data.map((item)=>{
    if(range0 && (item.price >= 0 && item.price <= 25)){
      filteredData.push(item);
    }
    else if(range25 && (item.price >= 25 && item.price <= 50)){
      filteredData.push(item);
    }
    else if(range50 && (item.price >= 25 && item.price <= 100)){
      filteredData.push(item);
    }
    else if(range100 && item.price > 100){
      filteredData.push(item);
    }
  })

  return filteredData;
}

function searchFilter(data){
  let searchBar = document.getElementById('serachFilter').value;

  if(searchBar == ""){
    // console.log(data);
    return data;
  }

  let filteredData = [];

  data.map((item) =>{
    if(item.title.includes(searchBar)){
      filteredData.push(item);
    }
  })

  return filteredData;
}


function menHtml(){

  let men = sideFilters(JSON.parse(localStorage.getItem("men")));

  let items = document.getElementsByClassName('items');
  items[0].innerHTML = "";
  men.map((item) =>{
    items[0].innerHTML += itemHtml(item);
  })
}

function womenHtml(){

  let women = sideFilters(JSON.parse(localStorage.getItem("women")));

  let items = document.getElementsByClassName('items');
  items[1].innerHTML = "";
  women.map((item) =>{
    items[1].innerHTML += itemHtml(item);
  })
}

function jewelleryHtml(){
  let jewelery = sideFilters(JSON.parse(localStorage.getItem("jewellery")));

  let items = document.getElementsByClassName('items');
  items[2].innerHTML = "";
  jewelery.map((item) =>{
    items[2].innerHTML += itemHtml(item);
  })
}


function electronicsHtml(){
  let electronics = sideFilters(JSON.parse(localStorage.getItem("electronics")));

  let items = document.getElementsByClassName('items');
  items[3].innerHTML = "";
  electronics.map((item) =>{
    items[3].innerHTML += itemHtml(item);
  })
}

function main(){
  menHtml();
  womenHtml();
  jewelleryHtml();
  electronicsHtml();

  addedTocart();
  
  addToCart(); 
}


function cart(e){
  e = e || window.event;
  e = e.target || e.srcElement;
    
  let userData = JSON.parse(localStorage.getItem('user'));


  if((typeof userData.cart) == "undefined"){
    let cart = [];
    cart.push(e.id);
    userData.cart = cart;
    
  }else{
    cart = userData.cart;
    cart.push(e.id);

    userData.cart = cart;
  }

  let btn = document.getElementById(e.id);
  btn.remove();
  let bId = "b"+e.id;
  let goToCart = document.getElementById(bId);
  goToCart.style.display = "block";

  // btn.removeEventListener('click', cart);
  goToCart.addEventListener('click', ()=>{
    window.location.href = window.location.origin+"/cart";
  });

  localStorage.setItem('user', JSON.stringify(userData));
  console.log(JSON.parse(localStorage.getItem('user')).cart);

  let users = JSON.parse(localStorage.getItem('data'));

  for(let i=0; i<users.length; i++){
    if(userData.email == users[i].email){
      users[i].cart = userData.cart;
      console.log(users[i].cart);

      localStorage.setItem('data', JSON.stringify(users));
      return;
    }
  }

}

function addToCart(){
  let addToCart = document.getElementsByTagName('button');
  console.log(addToCart, typeof addToCart);

  for(let i in addToCart){
    try{
      addToCart[i].addEventListener('click', cart);
    }catch(e){
      console.log("Error", e);
    }
  } 
}

function addedTocart(){

  let user = JSON.parse(localStorage.getItem("user"));
  let cart = user.cart;

  console.log(cart);


  if((typeof user.cart) == "undefined"){
    return;    
  }

  for(let i=0; i<cart.length; i++){
    
    let btn = document.getElementById(cart[i]);
    btn.remove();
    let bId = "b"+cart[i];
    let goToCart = document.getElementById(bId);
    goToCart.style.display = "block";
  
    goToCart.addEventListener('click', ()=>{
      window.location.href = window.location.origin+"/cart";
    });
  }

  console.log("Inside");
}


main();
