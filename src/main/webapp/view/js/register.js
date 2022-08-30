window.onload = () => {
    check();
}

// 表单验证
function validateForm() {
    let account = document.forms["rForm"]["rAccount"].value;
    let rName = document.forms["rForm"]["rName"].value;
    let email = document.forms["rForm"]["rEmail"].value;
    let password = document.forms["rForm"]["rPwd"].value;
    let pwd = document.forms["rForm"]["rPwdA"].value;

    if (trueAccount(account) && trueName(rName) && trueEmail(email)) {
        if (password == null || password === ""
            && pwd == null || pwd === "") {
            alert("密码必须填写");
            return false;
        }
        if (password !== pwd) {
            alert("密码输入不一致");
            return false;
        }

        if (!(/^[\d a-z A-Z]{6,20}$/.test(password))) {
            alert("密码应为英文或数字，长度为在6-20个字符");
            return false;
        }
    } else {
        return false;
    }

    return true;
}

function trueAccount(account) {
    if (account == null || account === "") {
        alert("用户名必须填写");
        return false;
    }

    if (!(/^[\d a-z A-Z]{3,15}$/.test(account))) {
        alert("用户名应为数字，英文，且长度限制在3-15个字符。");
        return false;
    }
    return true;
}

function trueName(rName) {
    if (rName == null || rName === "") {
        alert("昵称必须填写");
        return false;
    }

    if (!(/^[\d a-z A-Z \u4e00-\u9fa5]{3,20}$/.test(rName))) {
        alert("昵称应为中文，英文，数字，且长度3-20个字符。");
        return false;
    }
    return true;
}

function trueEmail(email) {
    if (email == null || email === "") {
        alert("邮箱必须填写");
        return false;
    }
    let atPos = email.indexOf("@");
    let dotPos = email.lastIndexOf(".");
    if (atPos < 1 || dotPos < atPos + 2 || dotPos + 2 >= email.length) {
        alert("不是一个有效的 e-mail 地址");
        return false;
    }
    return true;
}

// 注册判断
function register() {

    let user = {
        myId: document.forms["rForm"]["rAccount"].value,
        myName: document.forms["rForm"]["rName"].value,
        myEmail: document.forms["rForm"]["rEmail"].value,
        myPassword: document.forms["rForm"]["rPwd"].value,
    };


    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem(user.myId) != null) {
            alert("用户名已被注册");
            return false;
        }
        if (localStorage.getItem(user.myEmail) != null) {
            alert("该邮箱已被注册");
            return false;
        }
        if (validateForm()) {
            localStorage.setItem(user.myId, JSON.stringify(user));
            localStorage.setItem(user.myEmail, JSON.stringify(user));
            alert("注册成功，快去登录吧！");

            document.forms["rForm"]["rAccount"].value = "";
            document.forms["rForm"]["rName"].value = "";
            document.forms["rForm"]["rEmail"].value = "";
            document.forms["rForm"]["rPwd"].value = "";
            document.forms["rForm"]["rPwdA"].value = "";
            //延时跳转登录页
            setTimeout(function () {
                window.location.href = '../html/login.html';
            }, 1000);
        } else {
            return false;
        }
    } else {
        alert("浏览器不支持，请更换浏览器。");
    }

}

// 检查登录状态
const on = JSON.parse(localStorage.getItem("on"));

function check() {
    if (on != null && on.isOn) {
        const account = JSON.parse(localStorage.getItem(on.account));
        if (account != null) {
            if (account.myId === on.account && account.myPassword === on.pwd) {
                window.location.href = "../html/index.html";
            }
        }
    }
}

let showPwd = document.getElementsByClassName("showPwd");
let pwdInputs = document.getElementsByClassName("pwd");
let showBoxes = document.getElementsByClassName("showBox");

for (let i = 0; i < showBoxes.length; i++) {
    pwdInputs[i].onfocus = () => {
        showBoxes[i].children[1].style.display = "block";
        showBoxes[i].children[1].style.transform = "translate(350px, -30px)";
    }

    pwdInputs[i].onblur = () => {
        showBoxes[i].children[1].style.display = "none";
    }
}

for (let i = 0; i < showPwd.length; i++) {
    showPwd[i].onmouseover = () => {
        showPwd[i].src = "../img/watch.png";
        pwdInputs[i].type = "text";
    }
    showPwd[i].onmouseleave = () => {
        showPwd[i].src = "../img/close.png";
        pwdInputs[i].type = "password";
    }
}

