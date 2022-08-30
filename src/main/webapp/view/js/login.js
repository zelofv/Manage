window.onload = () => {
    // await intercept();
    check();
}

// 表单验证
function validateForm(account, password) {
    // return isID(account) && isPwd(password);
    if (/@/.test(account)) {
        return isEmail(account) && isPwd(password);
    } else {
        return isID(account) && isPwd(password);
    }
}

function isID(account) {
    if (account == null || account === "") {
        alert("用户名必须填写");
        return false;
    }

    if (!/^[\d a-z A-Z]{3,15}$/.test(account)) {
        alert("用户名应为数字，英文，且长度限制在3-15个字符。");
        return false;
    }
    return true;
}

function isEmail(email) {
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

function isPwd(password) {
    if (password == null || password === "") {
        alert("密码必须填写");
        return false;
    }

    if (!/^[\d a-z A-Z]{6,20}$/.test(password)) {
        alert("密码应为英文或数字，长度为在6-20个字符");
        return false;
    }
    return true;
}

// 点击 Login 时进行验证
async function login() {
    let theAccount = document.forms["lForm"]["lAccount"].value;
    let thePwd = document.forms["lForm"]["lPwd"].value;
    if (!validateForm(theAccount, thePwd)) {
        return;
    }
    const on = {
        account: theAccount,
        pwd: thePwd,
        isOn: false,
    };

    if (await loginFetch(theAccount, thePwd)) {
        on.account = JSON.parse(localStorage.getItem(theAccount)).myId;
        on.isOn = true;
        // 将 on 写入到 localStorage , on.isOn = true 表示已登录
        // if (localStorage.getItem("on") != null) {
        //     localStorage.removeItem("on");
        // }
        localStorage.setItem("on", JSON.stringify(on));
        alert("登录成功");
        document.forms["lForm"]["lAccount"].value = "";
        document.forms["lForm"]["lPwd"].value = "";
        setTimeout(() => {
            window.location.reload();
        }, 500);
        return true;
    }

    // if (validateForm(theAccount, thePwd)) {
    //     if (typeof (Storage) !== "undefined") {
    //         let findAccount = localStorage.getItem(theAccount);
    //         // 判断登录用户是否存在
    //         if (findAccount != null) {
    //             if (thePwd === JSON.parse(findAccount).myPassword) {
    //                 on.account = JSON.parse(findAccount).myId;
    //                 on.isOn = true;
    //                 // 将 on 写入到 localStorage , on.isOn = true 表示已登录
    //                 // if (localStorage.getItem("on") != null) {
    //                 //     localStorage.removeItem("on");
    //                 // }
    //                 localStorage.setItem("on", JSON.stringify(on));
    //                 alert("登录成功");
    //                 document.forms["lForm"]["lAccount"].value = "";
    //                 document.forms["lForm"]["lPwd"].value = "";
    //                 setTimeout(function () {
    //                     window.location.reload();
    //                 }, 500);
    //                 return true;
    //             } else {
    //                 alert("密码输入错误");
    //             }
    //         } else {
    //             alert("用户名或邮箱输入错误");
    //         }
    //
    //     } else {
    //         alert("浏览器不支持，请更换浏览器。");
    //     }
    // }
    return false;
}

async function loginFetch(account, pwd) {
    let response = await fetch('http://localhost:8080/loginServlet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            account: account,
            pwd: md5(pwd),
        })
    });
    let result = await response.json();
    if (result.success === true) {
        return true;
    } else {
        alert(result.msg);
        return false;
    }
}

async function intercept() {
    let response = await fetch("http://localhost:8080/base", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify({url:"login"})
    });
}

// 验证是否存在登录状态 已登录则跳转首页
function check() {
    const on = JSON.parse(localStorage.getItem("on"));
    if (on != null && on.isOn) {
        const account = JSON.parse(localStorage.getItem(on.account));
        if (account != null) {
            if (account.myId === on.account && account.myPassword === on.pwd) {
                window.location.href = "../html/index.html";
            }
        }
    }
}

//切换至 retrieve 界面
function switchMenu() {
    const loginCard = document.getElementById('loginCard');
    const retrieveCard = document.getElementById('retrieveCard');
    const card = document.getElementById("card");
    card.style.animation = "myFirst 1.5s";
    loginCard.style.display = "none";
    loginCard.style.backgroundColor = "rgba(0,0,0,0)";
    retrieveCard.style.backgroundColor = "rgba(0,0,0,0)";
    retrieveCard.style.display = "inline-block";
    retrieveCard.style.margin = "-4.8%";
}

//切换至 login 界面
function switchMenuA() {
    const loginCard = document.getElementById('loginCard');
    const retrieveCard = document.getElementById('retrieveCard');
    const card = document.getElementById("card");
    card.style.animation = "mySecond 1.5s";
    retrieveCard.style.display = "none";
    loginCard.style.display = "block";
}

// 获取验证码
function getVerificationCode() {
    let email = document.forms['reForm']["reEmail"].value;
    if (trueReEmail(email)) {
        let vCode = "";
        for (let i = 0; i < 6; i++) {
            vCode += Math.floor(Math.random() * 10);
        }
        // if (sessionStorage.getItem("code") != null) {
        //     sessionStorage.removeItem("code");
        // }
        sessionStorage.setItem('code', vCode);
        alert("您的验证码是: " + vCode);
    } else if (email !== "") {
        alert('您输入的邮箱有误');
        return false;
    }
}

function trueReEmail(email) {
    return isEmail(email) && localStorage.getItem(document.forms['reForm']['reEmail'].value) != null;
}

// 判断验证码是否正确
function isVerificationCode(code) {
    if (sessionStorage.getItem('code') == null) {
        return false;
    } else {
        if (sessionStorage.getItem('code') === code) {
            return true;
        }
    }
}

// 找回密码
function retrieve() {
    let code = document.forms['reForm']['reCode'].value;
    let email = document.forms['reForm']['reEmail'].value;
    let password = document.forms['reForm']['rePwd'].value;
    if (trueReEmail(email)) {
        if (isPwd(password)) {
            if (isVerificationCode(code)) {
                let account = JSON.parse(localStorage.getItem(document.forms['reForm']['reEmail'].value));
                account.myPassword = password;
                // 重新写入信息
                // localStorage.removeItem(account.myId);
                // localStorage.removeItem(account.myEmail);
                localStorage.setItem(account.myId, JSON.stringify(account));
                localStorage.setItem(account.myEmail, JSON.stringify(account));
                removeCode();
                document.forms['reForm']['reCode'].value = "";
                document.forms['reForm']['reEmail'].value = "";
                document.forms['reForm']['rePwd'].value = "";
                alert('密码找回成功！快去登录吧');
                switchMenuA();
            } else {
                alert('验证码错误');
                return false;
            }
        }
    } else if (email !== "") {
        alert("您输入的邮箱有误");
        return false;
    }
}

// 从 sessionStorage 中移除验证码
function removeCode() {
    if (sessionStorage.getItem('code') != null) {
        sessionStorage.removeItem('code');
    }
}

let showPwd = document.getElementsByClassName("showPwd");
let pwdInputs = document.getElementsByClassName("pwd");
let showBoxes = document.getElementsByClassName("showBox");
// showPwd[0].addEventListener("mouseover", () => {
//     console.log(showPwd)
// })

// showPwd[0].onmouseover = () => {
//     showPwd[0].src = "../img/watch.png";
//     document.getElementById("lPwd").type = "text";
//     console.log(showPwd[0])
// }
// showPwd[0].onmouseleave = () => {
//     showPwd[0].src = "../img/close.png";
//     document.getElementById("lPwd").type = "password";
//
// }
// showPwd[1].onmouseover = () => {
//     showPwd[1].src = "../img/watch.png";
//     document.getElementById("rePwd").type = "text";
// }
// showPwd[1].onmouseleave = () => {
//     showPwd[1].src = "../img/close.png";
//     document.getElementById("rePwd").type = "password";
// }
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