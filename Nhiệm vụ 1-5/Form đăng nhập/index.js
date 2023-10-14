const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const fistForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");
const signUpUserName = document.querySelector('.input_username_up');
const signUpEmail = document.querySelector('.input_email_up');
const signInEmail = document.querySelector('.input_email_in');
const signUpPassword = document.querySelector('.input_password_up');
const signInPassword = document.querySelector('.input_password_in');
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

function validateEmail(email) {
    return emailRegex.test(email);
}

function validatePassword(password) {
    return passwordRegex.test(password);
}

const data = []

if(localStorage.getItem("DataForm")){
    data = JSON.parse(localStorage.getItem("DataForm"))
}



signInBtn.addEventListener("click", () => {
	container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
	container.classList.add("right-panel-active");
});

fistForm.addEventListener("submit", (e) => {
    console.log(28, data);

    const Name = signUpUserName.value
    const Email = signUpEmail.value
    const Password = signUpPassword.value

    if(!Name || !Email || !Password) {
        alert("Không được để trống thông tin !!")
        return;
    }

    if (!validateEmail(Email)) {
        alert('Email không hợp lệ');
        return;
    }
    
    if (!validatePassword(Password)) {
        alert('Mật khẩu không hợp lệ. Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.');
        return;
    }

    data.push({Name, Email , Password})

    localStorage.setItem("DataForm", JSON.stringify(data))


    alert("Thành công")
});
secondForm.addEventListener("submit", (e) => e.preventDefault());
