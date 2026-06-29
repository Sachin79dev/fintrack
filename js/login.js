const loginForm = document.querySelector('#login_form');
const username = document.querySelector('#login_username');
const password = document.querySelector('#login_password');


let login = localStorage.getItem('loggedIn');



loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let userInfo = [];


    const user = username.value;
    const pass = password.value;

    userInfo.push({ user, pass });


    if (user.trim() === "" || pass.trim() === "") {
        return
    }

    console.log(userInfo);

    loginForm.reset();


    let users = localStorage.setItem('registeredUsers', JSON.stringify(userInfo));

    if (!users) {
        alert("No registered users found. Please register first.");
        window.location.href = "register.html";
        return;
    }



    if (user === userInfo[0].user && pass === userInfo[0].pass) {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password.");
    }
})