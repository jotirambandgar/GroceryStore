var x = document.getElementById("login")
var y = document.getElementById("register")
var z = document.getElementById("btn")

function registerPage() {
    x.style.left = "-400px"
    y.style.left = "50px";
    z.style.left = "110px";
}
function loginPage() {

    x.style.left = "50px"
    y.style.left = "450px";
    z.style.left = "0px";
}

function storeUserData() {
    let user = {
        userId: document.forms["Register"]["userId"].value,
        emailId: document.forms["Register"]["emailId"].value,
        password: document.forms["Register"]["password"].value,
        address: document.forms["Register"]["address"].value
    }
    makeAJAXCall("POST", " http://localhost:3000/User", true, user);
}
async function loginCheck() {
    let users = JSON.parse(await makeAJAXCall("GET", " http://localhost:3000/User"));
    let requiredUser = users.filter(user => user.emailId == document.forms["Login"]["emailId"].value);
    console.log(requiredUser[0]);
    if (requiredUser[0] != null && requiredUser[0].password == document.forms["Login"]["password"].value) {
        localStorage.setItem("ValidUser", true);
        localStorage.setItem("userAddress", requiredUser[0].address);
        window.location.replace("../dailyneeds.html");
    }
}