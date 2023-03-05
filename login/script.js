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



function login(){

    let email = document.getElementById('email').value;
    let password = document.getElementById('pass').value;

    if(hasMethod(email)){
        
        
        let data = localStorage.getItem("data");
        let users = JSON.parse(data);

        let user;
        for(let i=0; i<users.length; i++){

            let e = users[i].email;

            if(e == email){
                user =  users[i];
                
                break;
            }
        }


        if(user["pass"] == password){
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("isLogin", true);
            window.location.href = window.location.origin+"/shop";
        }else{
            alert("Wrong Credentials! please check your password or email id!")
            return;
        }
    }else{
        alert("Wrong Credentials! please check your password or email id! outSide")
        return;
    }
}



function hasMethod(value){
    let data = localStorage.getItem("data");
    let users = JSON.parse(data);

    console.log(users, localStorage);

    if(data == null){ 
        return false;
    }

    for(let i=0; i<users.length; i++){

        let email = users[i].email;
        console.log(users[i].email, value);
        if(email == value){
            console.log("in");
            return true;
        }
    }

    return false;
}


if(window.location.href != window.location.origin+"/shop" && localStorage.getItem('isLogin') == "true"){
    console.log("IN");
    window.location.href = window.location.origin+"/shop";
}