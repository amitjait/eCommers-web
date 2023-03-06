// Write your script here

function changePass(){
    let allData = JSON.parse(localStorage.getItem('data'));
    
    
}


function profile(){

    
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    // let token = document.getElementById('token');

    if(name == null || email == null) return;
    
    let userData = JSON.parse(localStorage.getItem('user'));

    // console.log(data);

    // let teacher = JSON.parse(data);

    name.innerHTML = `Name : ${userData.fName} ${userData.sName}`;
    email.innerHTML = `Email ID : ${userData.email}`;
    // token.innerHTML = `Your Token : ${teacher.token}`;

    
}

function logOut(){
    localStorage.setItem("isLogin", false);
    console.log(localStorage.getItem("isLogin"));

    window.location.href = window.location.origin +"/login";
}


function changePass(){
    let userData = JSON.parse(localStorage.getItem('user'));
    let allData = JSON.parse(localStorage.getItem('data'));

    let email = userData.email;

    let message = document.getElementById('message');

    let oldPass = document.getElementById('pass').value;
    let newPass = document.getElementById('new-pass').value;
    let cPass = document.getElementById('confirm-pass').value;

    if(newPass != cPass){
        alert('New password and Change password is not matching!')
    }


    for(let i=0; i<allData.length; i++){

        let e = allData[i].email;
        console.log(allData[i].email, e);
        if(email == e){

            if(oldPass != allData[i].pass){
                message.innerHTML = "Old Password is incorrect!";
                message.style.color = "red";
                return;
            }

            if(!ValidPassword(newPass)){
                message.innerHTML = "Password should contains at least 1 Capital, 1 small, 1 special character and 1 number!";
                message.style.color = "red";
                return;
            }

            allData[i].pass = newPass;
        }
    }

    localStorage.setItem('data', JSON.stringify(allData));
    message.innerHTML = "Password succesfully changed";
    message.style.color = "green";

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


profile();