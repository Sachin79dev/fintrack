const registerForm = document.querySelector('#register_form');
const username = document.querySelector('#register_username');
const password = document.querySelector('#register_password');



registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userInfo = {
        name: username.value,
        pass: password.value
    }


    localStorage.setItem('registeredUsers', JSON.stringify(userInfo));
    // localStorage.setItem('registeredUsers', JSON.stringify(userInfo));


    alert("Registration successful! Please login.");
    window.location.href = "login.html";
})