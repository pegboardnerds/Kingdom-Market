function getLogin() {
    existed = false;
    if(document.getElementById("lgsu")!=null){existed = true;}
    var form = getLoginForm();
    if (window.innerWidth <= 600) {
        form.style.width = "100%";
    }else{
        t = window.innerWidth; f = form.offsetWidth; r = t - f; form.style.left = r / 2 + "px";
    }

        form.style.top = $(window).height()+window.scrollY+"px";
        form.style.transition = "all 500ms";
        form.style.top = form.offsetTop-form.offsetHeight+"px";

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
    errortext.innerHTML = "Login/Signup. Your details are sha256 hashed.";
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
   var p = document.createElement("p");
    p.innerHTML = "see what your password looks like to us.";
    form.appendChild(p);
    p.style.color = "white";
    p.style.fontStyle = "italic";
    p.style.textDecoration = "underline";
    p.style.marginTop = "30px";
    p.style.cursor = "pointer";
    p.onclick = function(){
        if(!HasLetters(password.value)&&(!HasNumbers(password.value))){
            alert("Enter text into password field then retry.");
            return;
        }
        alert("This is what your password will look like in our database: "+SHA256(password.value))
    }
}