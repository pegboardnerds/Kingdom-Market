var form;
var blackout;
function getLoginForm(){
    if(document.getElementById("lgsu")==null){form = document.createElement("div");blackout = document.createElement("div");
    document.body.appendChild(form);
    document.body.appendChild(blackout);
}else{
        document.getElementById("lgsu").style.display = "block";
        document.getElementById("blackout").style.display = "block";
    }
    form.style.position = "absolute";
    form.style.height = "300px";
    form.style.width = "400px";
    form.style.backgroundColor = "#191919";
    form.style.borderRadius = "20px";
    form.style.zIndex = "100";
    form.id="lgsu";

    blackout.style.position = "absolute";
    blackout.style.top = "0";
    blackout.style.left = "0";
    blackout.style.width = "100%";
    blackout.style.height = $(window).height()+window.scrollY+"px";
    blackout.style.backgroundColor = "black";
    blackout.style.opacity = "80%";
    blackout.style.zIndex = "50";
    blackout.id = "blackout";
    blackout.onclick = function(){
        form.style.display = "none";
        blackout.style.display = "none";
    }
    
    return form;
}