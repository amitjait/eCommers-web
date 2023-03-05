function home(){
    window.location.href = "http://127.0.0.1:5501/";
}

function loginPage(){
    window.location.href = "http://127.0.0.1:5501/login/";
}

function signUpPage(){
    window.location.href = "http://127.0.0.1:5501/signUp/";
}

function myCart(){
    window.location.href = "http://127.0.0.1:5501/cart/";
}


function signUp(){
    
    // let inputs = document.getElementsByTagName('input');
    let fName = document.getElementById('first-name').value;
    let sName = document.getElementById('second-name').value;
    let email = document.getElementById('email').value;
    let pwd = document.getElementById('pass').value;
    let cpwd = document.getElementById('confirm-pass').value;

    // console.log(name.value, email.value, pwd.value, cpwd.value);

    
    let alert = document.getElementById('alert');

    if(fName == "" || sName == ""){
        alert.innerHTML = "Please enter both First and Last name!";
        alert.style.display = "block";
        return;
    }else{
        alert.innerHTML = "";
    }

    if(!ValidateEmail(email)){
        alert.innerHTML = "Invalid Email address! Please enter valid Email!";
        alert.style.display = "block";
        return;
    }

    let validPwd = ValidPassword(pwd);

    if(pwd == fName || pwd == email){
        if(pwd == fName){
            alert.innerHTML = "Password can't be same as name!";
        }else{
            alert.innerHTML = "Password can't be same as Email!";
        }
        alert.style.display = "block";
        return;
    }else if(!validPwd){
        alert.innerHTML = "Please consists 1 capital, 1 small, 1 number and 1 special character at least";
        alert.style.display = "block";
        return;
    }
    
    if(pwd != cpwd){
        alert.innerHTML = "Password & Confirm Password is not same!";
        alert.style.display = "block";
        return;
    }


    if(hasMethod(email)){
        alert.innerHTML = "This Email is already registered! try sign In";
        alert.style.display = "block";
        return;
    }else{
        let u = {
            "fName":fName,
            "sName":sName,
            "email":email,
            "pass":pwd,
        }

        let data = localStorage.getItem("data");
        let users = JSON.parse(data);

        if(data == null){
            let user = [];
            
            user.push(u);
            localStorage.setItem("data", JSON.stringify(user));
        }else{
            
            users.push(u);
            console.log(users);

            localStorage.setItem("data", JSON.stringify(users));
        }

        
    }

    
    console.log(localStorage);

    alert.innerHTML = "";

    window.location.href = window.location.origin + "/login";
}

function hasMethod(value){
    let data = localStorage.getItem("data");
    let users = JSON.parse(data);

    // console.log(users, localStorage);

    if(data == null){ 
        return false;
    }

    for(let i=0; i<users.length; i++){

        let email = users[i].email;
        // console.log(users[i].email, value);
        if(email == value){
            // console.log("in");
            return true;
        }
    }

    return false;
}


function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    // alert("You have entered an invalid email address!")
    return (false)
}

function ValidPassword(Password){
    var capital = /[A-Z]/;
    var small = /[a-z]/;
    let number = /[0-9]/;
    let special = /[^a-zA-Z0-9]/;

    if(capital.test(Password) && small.test(Password) && number.test(Password) && special.test(Password)){
        return true;
    }else{
        return false;
    }
   
}

if(window.location.href != window.location.origin+"/shop" && localStorage.getItem('isLogin') == "true"){
    console.log("IN");
    window.location.href = window.location.origin+"/shop";
}