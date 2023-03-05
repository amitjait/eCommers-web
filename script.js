// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))

function home(){
    window.location.href = "index.html";
}

function loginPage(){
    window.location.href = "login";
}

function signUpPage(){
    window.location.href = "signUp";
}

function myCart(){
    window.location.href = "cart";
}

if(window.location.href != window.location.origin+"/shop" && localStorage.getItem('isLogin') == "true"){
  console.log("IN");
  window.location.href = window.location.origin+"/shop";
}