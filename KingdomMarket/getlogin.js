function getLogin() {
    existed = false;
    if(document.getElementById("lgsu")!=null){existed = true;}
    var form = getLoginForm();
    if (window.innerWidth <= 600) {
        form.style.width = "100%";
        form.style.bottom = -form.offsetHeight+"px";
        form.style.transition = "all 500ms";
        form.style.bottom = -(form.offsetHeight-form.offsetHeight)+"px";
    } else {
        t = window.innerWidth; f = form.offsetWidth; r = t - f; form.style.left = r / 2 + "px";
        t = window.innerHeight; f = form.offsetHeight; r = t - f; form.style.top = (r / 2) + "px";
    }
    if(existed){return;}

    var logintext = document.createElement("Label");
    form.appendChild(logintext);
    logintext.innerHTML = "Login or Signup";
    logintext.style.color = "white";
    logintext.style.zIndex = "11";
    logintext.style.fontSize = "130%";
    logintext.style.marginTop = "10px";
    form.style.display = "block";
    form.style.textAlign = "center";
    logintext.style.marginTop = "30px";

    var username = document.createElement("input");
    form.appendChild(username);
    username.style.display = "block";
    username.style.width = "60%";
    username.style.marginTop = "20px";
    username.style.border = "none";
    username.style.backgroundColor = "#2E2E2E";
    username.style.position = "relative";
    username.style.left = "20%";
    username.style.borderRadius = "10px";
    username.style.outlineWidth = "0";
    username.style.paddingLeft = "10px";
    username.style.fontSize = "130%";
    username.placeholder = "Username";
    username.onkeydown = function () { username.style.backgroundColor = "white"; }

    var password = document.createElement("input");
    form.appendChild(password);
    password.style.display = "block";
    password.style.marginTop = "20px";
    password.style.border = "none";
    password.style.width = "60%";
    password.style.fontSize = "130%";
    password.style.position = "relative";
    password.style.left = "20%";
    password.style.backgroundColor = "#2E2E2E";
    password.style.borderRadius = "10px";
    password.style.outlineWidth = "0";
    password.style.paddingLeft = "10px";
    password.placeholder = "Password";
    password.type = "password";
    password.onkeydown = function () { password.style.backgroundColor = "white"; }
    var errortext = document.createElement("p");
    form.appendChild(errortext);
    errortext.style.display = "none";
    errortext.id = "errortext";
    errortext.innerHTML = "Enter your details and log in.";
    errortext.style.display = "block";
    errortext.style.color = "green";

    var send = document.createElement("button");
    form.appendChild(send);
    send.style.display = "block";
    send.style.marginTop = "20px";
    send.style.width = "90%";
    send.style.position = "relative";
    send.style.left = "5%";
    send.style.borderRadius = "5px";
    send.style.height = "30px";
    send.style.border = "none";
    send.style.fontSize = "120%";
    send.textContent = "Login";
    send.style.backgroundColor = "white";
    send.style.color = "black";
    send.onclick = function () {
        if (isEmpty(username.value)) { username.style.backgroundColor = "red"; return; }
        if (isEmpty(password.value)) { password.style.backgroundColor = "red"; return; }
        _user_ = getUser(username.value, password.value);
        checkForLogin();
    }
    send.onmouseover = function () {
        send.style.backgroundColor = "aquamarine";
    }
    send.onmouseleave = function () {
        send.style.backgroundColor = "white";
    }
    var signup = document.createElement("button");
    form.appendChild(signup);
    signup.style.display = "block";
    signup.style.marginTop = "20px";
    signup.style.width = "90%";
    signup.style.position = "relative";
    signup.style.left = "5%";
    signup.style.borderRadius = "5px";
    signup.style.height = "30px";
    signup.style.border = "none";
    signup.style.fontSize = "120%";
    signup.textContent = "Sign Up";
    signup.style.backgroundColor = "white";
    signup.onclick = function () {
        if (isEmpty(username.value)) { username.style.backgroundColor = "red"; return; }
        if (isEmpty(password.value)) { password.style.backgroundColor = "red"; return; }
        createUser(username.value, password.value);
    }
    signup.onmouseover = function () {
        signup.style.backgroundColor = "aquamarine";
    }
    signup.onmouseleave = function () {
        signup.style.backgroundColor = "white";
    }
}