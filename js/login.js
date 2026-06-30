const loginForm = document.querySelector('#login_form');
const username = document.querySelector('#login_username');
const password = document.querySelector('#login_password');


let login = localStorage.getItem('loggedIn');



loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = username.value;
    const pass = password.value;


    if (name.trim() === "" || pass.trim() === "") {
        return
    }

    loginForm.reset();


    const registeredUser = JSON.parse(
        localStorage.getItem("registeredUsers")
    );

    if (!registeredUser) {
        alert("No registered users found. Please register first.");
        window.location.href = "register.html";
        return;
    }



    if (name === registeredUser.name && pass === registeredUser.pass) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem("userName", registeredUser.name);
        window.location.href = "index.html";

    } else {
        alert("Invalid email or password.");
    }
})