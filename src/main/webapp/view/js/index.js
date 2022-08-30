let students = [{
    id: "12103020228", name: "米一", college: "计算机科学与工程学院", gender: "男", grade: 21, classNo: "121030202", age: 20
}, {
    id: "12123020214", name: "米二", college: "两江人工智能学院", gender: "男", grade: 21, classNo: "121230202", age: 21
}, {
    id: "12110020135", name: "米三", college: "药学与生物工程学院", gender: "男", grade: 21, classNo: "121100201", age: 22
}, {
    id: "12123020222", name: "米四", college: "两江人工智能学院", gender: "男", grade: 21, classNo: "121230202", age: 23
}, {
    id: "12110020116", name: "小五", college: "药学与生物工程学院", gender: "男", grade: 21, classNo: "121100201", age: 24
}, {
    id: "12103020208", name: "米六", college: "计算机科学与工程学院", gender: "男", grade: 21, classNo: "121030202", age: 25
}, {
    id: "12123020225", name: "米七", college: "两江人工智能学院", gender: "男", grade: 21, classNo: "121230202", age: 26
}, {
    id: "12123020213", name: "米八", college: "两江人工智能学院", gender: "男", grade: 21, classNo: "121230202", age: 27
}, {
    id: "12123020219", name: "米九", college: "两江人工智能学院", gender: "男", grade: 21, classNo: "121230202", age: 28
}, {
    id: "12108020215", name: "米十", college: "管理学院", gender: "男", grade: 21, classNo: "121080202", age: 29
}, {
    id: "12123020212", name: "米加", college: "两江人工智能学院", gender: "男", grade: 21, classNo: "121230202", age: 30
}, {
    id: "12110020105", name: "小减", college: "药学与生物工程学院", gender: "男", grade: 21, classNo: "121100201", age: 31
}, {
    id: "12103020206", name: "米乘", college: "计算机科学与工程学院", gender: "男", grade: 21, classNo: "121030202", age: 32
}, {
    id: "12108020214", name: "米除", college: "管理学院", gender: "男", grade: 21, classNo: "121080202", age: 33
}]
let thisPage = 1;

let stuTable = document.getElementById("studentsTable");

let allCheck = document.getElementById("allCheck");
let stuTBody = document.getElementById("showStu");
let pageNow = document.getElementById("pageNow");
let pages = document.getElementById("pages");
let stuTNum = document.getElementById("stuNum");
let allLength; // 数据库中数据总长度
let totalLength; // fetch传回数据库中(查询)数组的长度
let thisTarget = undefined; // 查找时的标签
let thisTargetValue = undefined; // 查找的内容
let checkList;
let showList = [];
//页面加载时展示前10个数据
window.onload = () => {
    // await intercept();
    check();
    getData().then(result => {

        fromStorage();
        students = result;
        showList = students;
        show(0, 10, result);
    });
}

// 存到本地 local
function toStorage() {
    window.localStorage.setItem("students", JSON.stringify(students));
}

// 读取数据（需改
function fromStorage() {
    let storage = JSON.parse(window.localStorage.getItem("students"));
    if (storage === null) return;
    // students = students.length > storage.length ? students : storage;
    students = storage;
}

// 展示表格
function show(from, to, list) {
    // 若无输入 list 默认为showList
    if (list === undefined) {
        list = showList;
    }
    if (from === undefined) {
        from = 0;
        to = 10;
    }
    for (let i = from; i < to && i < list.length; i++) {
        let index = i + 1;
        let lis = list[i];
        let tr = createTr((thisPage - 1) * 10 + index, lis);
        stuTBody.appendChild(tr);
    }
    // pages.innerHTML = "" + (1 + Math.floor((list.length - 1) / 10));
    // stuTNum.innerHTML = "" + list.length;
    pages.innerHTML = "" + (1 + Math.floor((totalLength - 1) / 10));
    stuTNum.innerHTML = "" + totalLength;
    checkList = getCheckList();
}

// 移除表格体并更新一个
function removeAll() {
    stuTable.removeChild(stuTBody);
    let newStuBody = document.createElement("tbody");
    newStuBody.id = "showStu";
    stuTBody = newStuBody;
    stuTable.appendChild(stuTBody);
    allCheck.checked = false;
}

// 返回 tr 标签包含内部 td
function createTr(index, lis) {
    let tr = document.createElement("tr");
    let tdList = createTdList();
    let checkBox = document.createElement("input");
    checkBox.type = "checkBox";
    checkBox.value = index % 10 + "";
    checkBox.setAttribute("onmouseup", "autoAllChecked(this)");
    let btU = document.createElement("button");
    let btD = document.createElement("button");
    btU.type = "button";
    btU.value = index % 10 + "";
    btU.setAttribute("onclick", "updateMenu(this)");
    btU.appendChild(document.createTextNode("修改"));
    btD.type = "button";
    btD.value = index % 10 + "";
    if (index % 10 === 0) {
        checkBox.value = "10";
        btU.value = "10";
        btD.value = "10";
    }
    btD.setAttribute("onclick", "del(this)");
    btD.appendChild(document.createTextNode("删除"));
    tdList[0].appendChild(checkBox);
    tdList[1].appendChild(document.createTextNode(index + ""));
    tdList[2].appendChild(document.createTextNode(lis.id));
    tdList[3].appendChild(document.createTextNode(lis.name));
    tdList[4].appendChild(document.createTextNode(lis.college));
    tdList[5].appendChild(document.createTextNode(lis.gender));
    tdList[6].appendChild(document.createTextNode(lis.grade));
    tdList[7].appendChild(document.createTextNode(lis.classNo));
    tdList[8].appendChild(document.createTextNode(lis.age));
    tdList[9].appendChild(btU);
    tdList[9].appendChild(btD);
    for (let tdListElement of tdList) {
        tr.appendChild(tdListElement);
    }
    return tr;
}

// 创建10个td标签用数组返回
function createTdList() {
    let td = [];
    for (let i = 0; i < 10; i++) {
        td.push(document.createElement("td"));
    }
    return td;
}

// 全选框
function checkAll(first) {
    for (let check of checkList) {
        check.checked = first.checked;
    }
}

// “上一页”按钮点击事件
async function pre() {
    if (thisPage === 1) {
        alert("已到达最前页");
        return;
    }
    let thisTarget = undefined;
    let thisTargetValue = undefined;
    if (searchInput.value !== "") {
        thisTargetValue = searchInput.value;
        thisTarget = select.value;
    }
    showList = await queryFetch(thisTarget, thisTargetValue, --thisPage);
    // removeAll();
    // show();
    pageNow.innerHTML = thisPage + "";
    refresh();
}

// “下一页”按钮点击事件
async function next() {
    if (thisPage === parseInt(pages.innerHTML)) {
        alert("已到达尾页");
        return;
    }
    let thisTarget = undefined;
    let thisTargetValue = undefined;
    if (searchInput.value !== "") {
        thisTargetValue = searchInput.value;
        thisTarget = select.value;
    }
    showList = await queryFetch(thisTarget, thisTargetValue, ++thisPage);
    // showList = await queryFetch(undefined, undefined, ++thisPage);

    // removeAll();
    // show(thisPage * 10, (thisPage + 1) * 10);
    pageNow.innerHTML = thisPage + "";
    refresh();
}

// 单独删除
async function del(button, valueList, list, single) {
    if (list === undefined) {
        list = showList;
    }
    if (valueList === undefined) {
        valueList = [];
        valueList.push(parseInt(button.value));
    }
    if (single || single === undefined || valueList.length === 1) {
        if (!confirm("确定要删除 " + list[valueList[0] - 1].name + " 吗？")) {
            return;
        }
    }
    let deleteId = [];
    for (let value of valueList) {
        deleteId.push(showList[value - 1].id);
        // if (list === students) {
        //     if (value === students.length) {
        //         students.pop();
        //     } else if (value === 1) {
        //         students.shift();
        //     } else {
        //         let delNum = value - 1;
        //         list.splice(delNum, 1);
        //     }
        // } else {
        //     for (let i = 0; i < showList.length; i++) {
        //         if (showList[i] === list[value - 1]) {
        //             students.splice(i, 1);
        //             list.splice(value - 1, 1);
        //             value--;
        // console.log(students)
        // }
        // }
        // }
    }
    let result = await deleteFetch(deleteId);
    showList = await queryFetch(thisTarget, thisTargetValue, thisPage);
    refresh();
    // toStorage();
    if (thisPage > parseInt(pages.innerHTML) && pages.innerHTML !== "0") {
        await pre();
    }
}

// 刷新表格
function refresh() {
    removeAll();
    show();
}

// 自动换页*****
// async function autoChangePage() {
//     if (students.length <= (parseInt(pages.innerHTML) - 1) * 10 && students.length !== 0) {
//         pages.innerHTML = parseInt(pages.innerHTML) - 1 + "";
//         await pre();
//     } else if (students.length > parseInt(pages.innerHTML) * 10) {
//         pages.innerHTML = parseInt(pages.innerHTML) + 1 + "";
//         await next();
//     }
//     if (students.length === 0) {
//         pages.innerHTML = "1";
//     }
// }

// onmouseup 鼠标松键时触发判断 使全选框自动选中或不选
function autoAllChecked(button) {
    if (!(button === undefined)) {

        button.checked = !button.checked;
        let allChecked = true;
        for (let input of checkList) {
            if (!input.checked) {
                allChecked = false;
            }
        }
        button.checked = !button.checked;
        // 全选按钮自动选中或自动不选
        stuTable.getElementsByTagName("thead")[0].getElementsByTagName("th")[0].getElementsByTagName("input")[0].checked = allChecked;
    }
}

async function delAll() {
    if (!confirm("确认删除所选学生信息吗？")) return;
    let indexList = [];
    for (let i = checkList.length - 1; i >= 0; i--) {
        if (checkList[i].checked) {
            indexList.push(i + 1);
        }
    }
    let single = false;
    if (indexList.length === 0) return; else if (indexList.length === 1) single = true;

    await del(undefined, indexList, undefined, single);
    if (pageNow.innerHTML > pages.innerHTML && pages.innerHTML !== "0") await pre();
}

// 返回多选框标签集
function getCheckList() {
    let inputTr = stuTBody.getElementsByTagName("tr");
    let list = [];
    let allChecked = true;
    for (let inputTrElement of inputTr) {
        let input = inputTrElement.getElementsByTagName("td")[0].getElementsByTagName("input")[0];
        list.push(input);
    }
    return list;
}

// 被修改的行在数组中的索引值-1
let checkedValue = -1;

// 保存查找后数组的索引值
let buttonValue = -1;

// 显示修改界面
function updateMenu(button) {
    checkedValue = button.value - 1;
    let obj = showList[checkedValue];
    // if (showList !== students) {
    //     for (let i = 0; i < students.length; i++) {
    //         if (objectEqual(students[i], obj)) {
    //             buttonValue = button.value - 1;
    //             checkedValue = i + 1;
    //         }
    //     }
    // }
    document.getElementById("update").style.display = "block";
    document.getElementById("stuIdU").value = obj.id;
    document.getElementById("stuNameU").value = obj.name;
    document.getElementById("stuCollegeU").value = obj.college;
    document.getElementById("stuGradeU").value = obj.grade;
    document.getElementById("stuClassNoU").value = obj.classNo;
    document.getElementById("stuAgeU").value = obj.age;
    let radioElements = document.getElementsByName("uGender");
    obj.gender === "男" ? radioElements[0].click() : radioElements[1].click();
    for (let p of updateForm.getElementsByTagName("p")) {
        p.style.display = "none";
    }
}

// 保存修改
async function update() {
    if (!allFinish(updateForm.getElementsByTagName("input"))) return;

    let oId = document.getElementById("stuIdU").value;
    let oName = document.getElementById("stuNameU").value;
    let oCollege = document.getElementById("stuCollegeU").value;
    let oGender = document.getElementsByName("uGender")[0].checked ? "男" : "女";
    let oGrade = parseInt(document.getElementById("stuGradeU").value);
    let oClassNo = document.getElementById("stuClassNoU").value;
    let oAge = parseInt(document.getElementById("stuAgeU").value);
    let obj = {
        id: oId, name: oName, college: oCollege, gender: oGender, grade: oGrade, classNo: oClassNo, age: oAge
    }

    if (objectEqual(showList[checkedValue], obj)) {
        sCancel();
        return;
    }
    // if (buttonValue !== -1) {
    //     showList.splice(buttonValue, 1, obj);
    // }
    // students.splice(checkedValue, 1, obj);
    let success = await updateFetch(showList[checkedValue].id, obj)
    if (success) {
        showList = await queryFetch(thisTarget, thisTargetValue, thisPage);
        sCancel();
        refresh();
        // toStorage();
        checkedValue = -1;
    }
}

// 判断两个 object 对象内部是否相等
function objectEqual(obj1, obj2) {
    return obj1.id === obj2.id && obj1.name === obj2.name && obj1.college === obj2.college && obj1.gender === obj2.gender && obj1.grade === obj2.grade && obj1.classNo === obj2.classNo && obj1.age === obj2.age;
}

// 新增和修改中的取消功能
function sCancel() {
    document.getElementById("update").style.display = "none";
    document.getElementById("addStu").style.display = "none";
    for (let resetEle of document.getElementsByClassName("reSet")) {
        resetEle.click();
    }
}

// 显示新增学生的菜单
function addMenu() {
    document.getElementById("addStu").style.display = "block";
    for (let i = 0; i < addForm.getElementsByTagName("p").length - 1; i++) {
        addForm.getElementsByTagName("p")[i].style.display = "block";
    }
}

// 确认添加学生
async function sSubmit() {
    if (!allFinish(addForm.getElementsByTagName("input"))) return;

    let oId = document.getElementById("stuIdA").value;
    let oName = document.getElementById("stuNameA").value;
    let oCollege = document.getElementById("stuCollegeA").value;
    let oGender = document.getElementsByName("aGender")[1].checked ? "女" : "男";
    let oGrade = parseInt(document.getElementById("stuGradeA").value);
    let oClassNo = document.getElementById("stuClassNoA").value;
    let oAge = parseInt(document.getElementById("stuAgeA").value);
    let obj = {
        id: oId, name: oName, college: oCollege, gender: oGender, grade: oGrade, classNo: oClassNo, age: oAge
    }

    if (await addFetch(obj)) {
        searchInput.value = "";
        // students.push(obj);
        thisPage = 1 + Math.floor((allLength - 1) / 10);
        showList = await queryFetch(undefined, undefined, thisPage);
        pageNow.innerHTML = thisPage;
        sCancel();
        refresh();
    }
    // toStorage();
}

let select = document.getElementById("searchSelect");
let searchInput = document.getElementById("searchInput");
let searchList = [];
let searchTimer = null;
// 监听输入框内容
searchInput.oninput = async () => {
    let value = searchInput.value;
    if (value.includes("'") || showList.length === 0) {
        return;
    }
    pageNow.innerHTML = "1";
    if (value === "") {
        thisTarget = undefined;
        thisTargetValue = undefined;
        showList = await queryFetch(undefined, undefined, undefined);
        refresh();
        return;
    }

    let tag = select.value;
    searchList = [];
    let obj = showList[0];
    for (let key in obj) {
        if (key === tag) {
            thisTarget = tag;
            thisTargetValue = value;
            // searchList = students.filter(item => {
            //     return (item[key] + "").includes(value);
            // })
            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => {
                    // showList = await queryFetch(thisTarget, thisTargetValue, undefined)
                    // removeAll();
                    // thisPage = 1;
                    // show();
                    // break;
                    queryFetch(thisTarget, thisTargetValue, undefined)
                        .then(result => showList = result)
                        .then(removeAll)
                        .then(thisPage = 1)
                        .then(show);
                }
                , 500);
            break;

            // for (let student of students) {
            //     let stuValue = student[key];
            //     stuValue += "";
            //     if (stuValue.includes(value)) {
            //         searchList.push(student);
            //     }
            // }
        }
    }
    // showList = searchList;
    // removeAll();
    // thisPage = 1;
    // show();
}

let clearTimer = null;

// 清空搜索框内容
function clearText() {
    if (searchList.value === "") return;
    searchInput.value = "";
    thisTarget = undefined;
    thisTargetValue = undefined;
    thisPage = 1;
    pageNow.innerHTML = "1";
    clearTimeout(clearTimer);
    clearTimer = setTimeout(() => {
        queryFetch(undefined, undefined, 1).then(res => {
            showList = res;
        }).then(refresh);
    }, 100);
    // showList = students;
    // refresh();
}

// 表单验证
function isId(value) {
    if (!/^1\d{10}$/.test(value))
        return false;
    return !repetitionId(value);
}

function repetitionId(id, index) {
    if (index === undefined && checkedValue !== -1) {
        index = checkedValue;
    }
    for (let i = 0; i < showList.length; i++) {
        if (i === index) continue;
        if (showList[i].id === id) {
            return true;
        }
    }
    return false;
}

function isName(value) {
    return /^[^\x00-\xff]{2,8}$|^[a-zA-Z]+\s?[a-zA-Z]+$/.test(value);
}

function isClassNo(value) {
    return /^1\d{8}$/.test(value);
}

function isAge(value) {
    return value > 0 && value < 100;
}

// 新增和修改界面监听验证表单
let addForm = document.getElementById("addForm");
let updateForm = document.getElementById("updateForm");
let allFinished = false;
for (let input of addForm.getElementsByTagName("input")) {
    if (input.id.includes("College") || input.id.includes("Gender") || input.id.includes("Grade")) continue;
    input.oninput = () => {
        allFinished = reflect(input);
    }
}

for (let input of updateForm.getElementsByTagName("input")) {
    if (input.id.includes("College") || input.id.includes("Gender") || input.id.includes("Grade")) continue;
    input.oninput = () => {
        allFinished = reflect(input);
    }
}

function reflect(target) {
    let value = target.value;
    let inputId = target.id;
    if (value === "") {
        document.getElementById(inputId + "p").style.display = "none";
        return false;
    }
    let method = "is" + inputId.substring(3, inputId.length - 1);

    if (eval(method + '("' + value + '")')) {
        document.getElementById(inputId + "p").style.display = "none";
        return true;
    } else {
        document.getElementById(inputId + "p").style.display = "block";
        if (method === "isId") {
            if (repetitionId(value, checkedValue)) {
                document.getElementById(inputId + "p").innerHTML = "学号重复";
            } else {
                document.getElementById(inputId + "p").innerHTML = "学号为11位数字";
            }
        }
        return false;
    }
}

// 判断数据是否全部无误
function allFinish(inputs) {
    // if (allFinished === false) return false;
    allFinished = isId(inputs[0].value) && isName(inputs[1].value) && isClassNo(inputs[6].value) && isAge(inputs[7].value);
    return allFinished;
}

let pageSelect = document.getElementById("pageSelect");

pageNow.onclick = () => {
    pageNow.style.display = "none";
    pageSelect.style.display = "inline";
    updateOption(parseInt(pageNow.innerHTML), parseInt(pages.innerHTML));
    pageSelect.focus();

    pageSelect.onblur = () => {
        pageSelect.style.display = "none";
        pageNow.style.display = "inline";
    }
}

pageSelect.onchange = async function () {
    if (searchInput.value !== "") {
        thisTargetValue = searchInput.value;
        thisTarget = select.value;
    } else {
        thisTarget = undefined;
        thisTargetValue = undefined;
    }

    let index = pageSelect.selectedIndex;
    let value = pageSelect.options[index].value;
    thisPage = value;
    showList = await queryFetch(thisTarget, thisTargetValue, thisPage);
    pageNow.innerHTML = value;
    refresh();
}

// 更新下拉框
function updateOption(now, max) {
    let len = pageSelect.children.length;
    for (let i = 0; i < len; i++) {
        pageSelect.children[0].remove();
    }
    addOption(max);
    for (let i = 0; i < max; i++) {
        pageSelect.options[i].defaultSelected = pageNow.innerHTML === pageSelect.children[i].value;
    }
}

function addOption(max) {
    let min = max > 0 ? 1 : 0;

    for (let i = min; i < max + 1; i++) {
        let option = document.createElement("option");
        option.setAttribute("value", i + "");
        option.innerHTML = i + "";
        pageSelect.appendChild(option);
    }
}

/*----------------
    登录检查及导航栏
  ----------------**/
// 加载时检查是否有登录状态
const on = JSON.parse(localStorage.getItem("on"));

function check() {
    if (on != null && on.isOn) {
        const account = JSON.parse(localStorage.getItem(on.account));
        if (account != null) {
            if (account.myId === on.account && on.pwd === account.myPassword) {
                // 修改导航栏的 userName 显示值
                document.getElementById("userName").innerHTML = account.myName;
                // 在 url 后加上用户ID
                if (location.href.indexOf('?') === -1) {
                    location.href = location.href.split("?")[0] + "?user=" + account.myId;
                }
                return;
            }
        }
    }
    window.location.href = "../html/login.html";

}

// 注销
function cancel() {
    if (confirmCancel()) {
        on.isOn = false;
        // localStorage.removeItem("on");
        localStorage.setItem("on", JSON.stringify(on));
        alert("注销成功，请重新登录");
        location.reload(); // 重载刷新页面
    }
}

// 提示确认继续注销
function confirmCancel() {
    return confirm("您真的要注销吗？") === true;
}

function displayName() {
    let account = JSON.parse(localStorage.getItem(on.account));
    alert("昵称: " + account.myName + "\nID: " + account.myId + "\nEmail: " + account.myEmail);
}

function toChange() {
    window.location.href = '../html/change_password.html?user=' + JSON.parse(localStorage.getItem(on.account)).myId;
}


/*----------------
       fetch
  ----------------**/

const baseURL = new URL("http://localhost:8080");
const loginURL = new URL('/loginServlet', baseURL);
const addURL = new URL('/addServlet', baseURL);
const queryURL = new URL('/queryServlet', baseURL);
const updateURL = new URL('/updateServlet', baseURL);
const deleteURL = new URL('/deleteServlet', baseURL);

async function getData() {
    // debugger
    // let result = await fetch(queryURL.toString(), {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json;charset=utf-8'
    //     },
    //     body: JSON.stringify({
    //         single: false,
    //     })
    // });
//     console.log(result);
    return queryFetch(undefined, undefined, undefined);
}

async function addFetch(addStudent) {
    let response = await fetch(addURL.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(addStudent)
    });
    let result = await response.json();
    if (result.success) {
        return result.success;
    } else {
        alert(result.msg);
    }
    return false;
}

async function queryFetch(target, value, page) {
    let bodyMsg;
    if (page === undefined) page = 1;
    if (target === undefined && value === undefined) {
        bodyMsg = {
            single: false,
            page: page,
            listEachPage: 10
        }
    } else {
        bodyMsg = {
            single: true,
            target: target,
            value: value,
            page: page,
            listEachPage: 10
        }
    }
    let response = await fetch(queryURL.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(bodyMsg),
    });

    let result = await response.json();
    let listMsg = await result[result.length - 1];
    result.pop(); // 将最后一项保存为 listMsg 对象，并移除
    totalLength = listMsg.length;
    if (bodyMsg.single === false) allLength = listMsg.length;
    return result; // 返回查询到的数据
}

async function updateFetch(updateId, student) {
    if (updateId === undefined || student === undefined) return;
    let response = await fetch(updateURL.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify([student, updateId])
    });
    let result = await response.json();
    if (result.success) {
        return result.success;
    } else {
        alert(result.msg);
    }
    return false;
}

async function deleteFetch(deleteIdList) {
    let response = await fetch(deleteURL.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(deleteIdList)
    });
    let result = await response.json();
    if (result.success) {
        return result.success;
    } else {
        alert(result.msg);
    }
    return false;
}

async function intercept() {
    let response = await fetch(baseURL.toString()+"/base", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify({url:"index"})
    });
}