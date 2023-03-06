
function itemHtml(item){
    return `
            <div class="item">
                <div class="img-Container">
                    <img src=${item.image} alt="Item" />
                </div>
                <div class="info">
                    <div class="title">
                        Title : ${shrinkTitle(item.title)}
                    </div><br>
                    <div class="price">
                        Price : $${item.price}
                    </div>
                </div>
                <button class="removeBtn" id= ${item.id} >Remove from Cart</button>
            </div>           
          `
  }

function billingHtml(item, i){
    return `
            <div class="checkout-items">
                <div class="item-title">
                    ${i+1}. ${shrinkTitle(item.title)}
                </div>
                <div class="item-price">
                    $${item.price}
                </div>
            </div> 
            `
}

function shrinkTitle(title){
    let i = 0;

    let titleArr = title.split(" ");

    let ans = "";
    let count = 0;
    while(count < 2 && i++ < titleArr.length){
        if(titleArr[i] == '-' || titleArr[i] == '.'){
            continue;
        }
        count++;
        ans += titleArr[i] +" ";
    }

    return ans;
}

function cartItems(){
    

    let cartItems = cartData();

    let message = document.getElementById('message');

    if(cartItems.length == 0){
        message.style.display = "block";
    }else{
        message.style.display ="none";
    }

    let items = document.getElementById('items');
    cartItems.map((item) =>{
        items.innerHTML += itemHtml(item);

    })
}

let total = 0;
function billItem(){
    let list = document.getElementById('list');

    let cartItems = cartData();

    total = 0;
    cartItems.map((item, i)=>{
        list.innerHTML += billingHtml(item, i);
        total += (Number)(item.price);
    })

    let t = document.getElementById('tPrice');
   
    t.innerHTML = "$"+total.toFixed(2);
    console.log(total.toFixed(2));
    total = total.toFixed(2);
    
}

function checkout(){
    if(total != 0){
        localStorage.setItem('total', total);
        window.location.href = window.location.origin + "/razorpay";
    }
}

function cartData(){
    let user = JSON.parse(localStorage.getItem('user'));
    let cartItems = user.cart;

    let menItem = JSON.parse(localStorage.getItem("men"));
    let womenItem = JSON.parse(localStorage.getItem("women"));
    let jew = JSON.parse(localStorage.getItem("jewellery"));
    let ele = JSON.parse(localStorage.getItem("electronics"));

    let cartData = [];

    console.log(cartItems)
    for(let i=0; i<menItem.length; i++){
        let id = menItem[i].id.toString();
        if(cartItems.includes(id)){
            cartData.push(menItem[i]);
        }
    }

    for(let i=0; i<womenItem.length; i++){
        let id = womenItem[i].id.toString();
        if(cartItems.includes(id)){
            cartData.push(womenItem[i]);
        }
    }

    for(let i=0; i<jew.length; i++){
        let id = jew[i].id.toString();
        if(cartItems.includes(id)){
            cartData.push(jew[i]);
        }
    }

    for(let i=0; i<ele.length; i++){
        let id = ele[i].id.toString();
        if(cartItems.includes(id)){
            cartData.push(ele[i]);
        }
    }

    return cartData;

}

function removeFromCart(e){
    e = e || window.event;
    e = e.target || e.srcElement;

    let user = JSON.parse(localStorage.getItem('user'));
    let cartItems = user.cart;

    for(let i=0; i<cartItems.length; i++){
        if(cartItems[i] == e.id){
            cartItems.splice(i, 1);
            user.cart = cartItems;
            localStorage.setItem('user', JSON.stringify(user));
            console.log(JSON.parse(localStorage.getItem('user')));

            window.location.href = window.location.href;
            return;
        }
    }
}

function main(){

    cartItems();
    billItem();

    let removeBtns = document.getElementsByClassName('removeBtn');

    for(let i in removeBtns){
        try{
            removeBtns[i].addEventListener('click', removeFromCart);
        }catch(e){
            console.log("Error", e);
        }
    }
    
}



main();

