let count = 0;
let alltime = 0;
let notific;
let showingnot = false;
function getNotifications(user){
    $.ajax({
        url: "notifications/"+user+".json",
        dataType: 'json',
        async: true,
        caches: false,
        success: function (data) {
            x = 0;
            for (var i in data) { if (i == 0) { continue; } x++ }
            for (var p in data) {
                if(data[x]["seen"]==false){
                    showNotifications(data[x]["datemade"],data[x]["msg"],x);
                }
                count = 0;
            }
        },
        statusCode: {
            404: function () {
                alert('Could not fetch user notifications.');
            }
        }
    });
}
function sendNotification(reciever,not){
    $.ajax
    ({
        type: "GET",
        dataType: 'json',
        async: true,
        caches: false,
        url: 'notify.php',
        data: { data: JSON.stringify(not), path: reciever+".json"},
        success: function () { comupdating = true; },
        failure: function () { },
        complete: function () { comupdating = false; }
    });
}
function newNotification(reciever, msg, datemade){
    let not = new Object();
    not.msg = msg;
    not.datemade = datemade;
    not.seen = false;
    sendNotification(reciever,not);
}
function showNotifications(date,msg){
    count++;
    if(count>alltime){
        document.getElementById("notifysound").play();
        alltime = count;
    }
    document.getElementById("profile").textContent = _user_[0]+" "+count;
}
function expandNotifications(){
    if(showingnot){notific.style.display = "none"; showingnot=false; clearnotifications();return;}
    if(notific==null){
        notific = document.createElement("div");
        document.body.appendChild(notific);
        notific.style.position = "absolute";
        notific.style.backgroundColor = "#191919";
        notific.style.top = (window.innerHeight+window.scrollY) - (window.innerHeight-document.getElementById("navbar").offsetHeight) +"px";
        notific.style.left = "0";
        notific.style.zIndex = "100";
        notific.style.height = "0px";
        notific.style.borderRadius = "10px";
        if(window.innerWidth<=600){
            notific.style.width = "100%";
            notific.style.transition = "all 1s";
            notific.style.height = window.innerHeight+window.scrollY+"px";
        }else{
            notific.style.width = "600px";
            notific.style.position = "absolute";
            notific.style.left = (window.innerWidth - 600) / 2 + "px";
            notific.style.top = "0px";
            notific.style.transition = "all 500ms";
            notific.style.height = "100%";

        }
        showingnot = true;
    }else{
        if(window.innerWidth<600){
            notific.style.display = "block";
            notific.style.width = "100%";
            notific.style.transition = "all 1s";
            notific.style.top = (window.innerHeight+window.scrollY) - (window.innerHeight-document.getElementById("navbar").offsetHeight) +"px";
            setTimeout(() => {
                notific.style.height = window.innerHeight+window.scrollY+"px";
            }, 1000);   
        }else{
            notific.style.display = "block";
        }
        showingnot = true;
    }
    fetchNotfications();
}
function fetchNotfications(){
    $.ajax({
        url: "notifications/"+_user_[0]+".json",
        dataType: 'json',
        async: true,
        caches: false,
        success: function (data) {
            x = 0;
            for (var i in data) { if (i == 0) { continue; } x++ }
            for (var p in data) {
                if(data[x]["seen"]==false){
                    appendNotification(data[x]["msg"],data[x]["datemade"]);
                    x++;
                }
                count = 0;
            }
        },
        statusCode: {
            404: function () {
                alert('There was a problem with the server.  Try again soon!');
            }
        }
    });
}
function appendNotification(message,date){
    let noti = document.createElement("div");
    notific.appendChild(noti);
    noti.classList.add("notific");
    noti.style.width = "auto";
    noti.style.height = "auto";
    noti.style.backgroundColor = lightblack;
    noti.style.margin = "10px";
    noti.style.display = "inline-flex";
    let text = document.createElement("p");
    text.innerHTML = message+" at "+date;
    noti.appendChild(text);
    text.style.fontSize = "130%";
    text.style.color = "white";
}
function clearnotifications(){
    if (document.getElementsByClassName("notific").length != 0) {
        var comments = document.getElementsByClassName("notific");
        comments[0].remove();
        clearnotifications();
    }
}