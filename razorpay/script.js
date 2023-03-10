// Link for the documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration

// Add button code documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration#code-to-add-pay-button

console.log(window.location.origin+"/cart");
document.getElementById("rzp-button1").onclick = function (e) {
  let total = localStorage.getItem('total');
  document.getElementById("rzp-button1").style.display = "none";
  document.getElementById('goback').style.display = "block";
  document.getElementById('content').innerHTML = "Go back";

  var options = {
    key: "rzp_test_wzFXFHKU56LGex", // Enter the Key ID generated from the Dashboard
    amount: parseInt(total) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "MyShop Checkout",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#skyblue",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  // clear mycart - localStorage

  let user = JSON.parse(localStorage.getItem('user'));
  user.cart = [];
  localStorage.setItem('user', JSON.stringify(user));

  let userData = JSON.parse(localStorage.getItem('data'));

  userData.map((u)=>{
    if(user.email == u.email){
      u.cart = [];

      localStorage.setItem("data", JSON.stringify(userData));
      
    }
  })
  
  e.preventDefault();


  // window.location.href = window.location.origin+'/cart';
};

document.getElementById("goback").addEventListener('click', ()=>{
  window.location.href = window.location.origin + '/cart';
})