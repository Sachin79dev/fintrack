const loginForm = document.querySelector('#login_form');
const username = document.querySelector('#login_username');
const password = document.querySelector('#login_password');


let login = localStorage.getItem('loggedIn');



loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let userInfo = [];


    const name = username.value;
    const pass = password.value;

    userInfo.push({ name, pass });


    if (name.trim() === "" || pass.trim() === "") {
        return
    }

    console.log(userInfo);

    loginForm.reset();


    const registeredUser = JSON.parse(
        localStorage.getItem("registeredUsers")
    );

    if (!registeredUser) {
        alert("No registered users found. Please register first.");
        window.location.href = "register.html";
        return;
    }



    if (name === registeredUser[0].name && pass === registeredUser[0].pass) {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password.");
    }
})