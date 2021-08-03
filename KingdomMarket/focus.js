var comments;
var comupdating = false;
var spectating;
function showComments(id,owner) {
    if (comments == null) {
        comments = document.createElement("div");
        darkenBackground(comments);
        document.body.appendChild(comments);
        comments.style.borderRadius = "10px";
        comments.style.overflow = "scroll";
        comments.style.zIndex = "100";
        if (window.innerWidth > 600) {
            comments.style.transition = "all 1s";
            comments.style.width = "600px";
            comments.style.position = "fixed";
            //comments.style.backgroundColor = "#191919";
            comments.style.left = (window.innerWidth - 600) / 2 + "px";
            comments.style.top = "0px";
            comments.style.height = "0px";
            comments.style.transition = "all 1s";
            comments.style.height = window.innerHeight+"px"; 

        } else {
            comments.style.width = "100%";
            comments.style.position = "absolute";
            comments.style.backgroundColor = "#191919";
            comments.style.left = "0";
            comments.style.height = "600px";
            comments.style.top = $(window).height()+window.scrollY+"px";
            comments.style.transition = "all 500ms";
            comments.style.top = comments.offsetTop-comments.offsetHeight+"px";
        }
        var commentssections = document.createElement("div");
        comments.appendChild(commentssections);
        commentssections.style.height = comments.offsetHeight - 40 + "px";
        commentssections.style.backgroundColor = "#191919";
        commentssections.style.width = "100%";
        commentssections.style.overflowY = "scroll";
        commentssections.id = "csection";

        var controlsHolder = document.createElement("div");
        comments.appendChild(controlsHolder);
        controlsHolder.style.width = "100%";
        controlsHolder.style.height = "40px";
        controlsHolder.style.position = "absolute";
        controlsHolder.style.bottom = "0px";
        controlsHolder.style.backgroundColor = "#2E2E2E";

        var msg = document.createElement("input");
        msg.type = "text";
        msg.style.backgroundColor = "white";
        msg.style.fontSize = "130%";
        msg.style.borderRadius = "10px";
        msg.style.width = "85%";
        msg.placeholder = "Say something.";
        controlsHolder.appendChild(msg);
        msg.style.marginLeft = "5px";

        var sender = document.createElement("button");
        controlsHolder.appendChild(sender);
        sender.style.borderRadius = "10px";
        sender.textContent = "Send";
        sender.style.fontSize = "120%";
        sender.style.backgroundColor = "white";
        sender.style.marginLeft = "5px";
        sender.style.width = "10%";
        sender.id = "sen";
        commentssections.style.width = "100%";
        sender.onclick = function(){
            if(!HasLetters(msg.value)&&!HasNumbers(msg.value)){return;}
            if(_user_[0]==null){ closeComments(); getLogin();return;}
            var comment = new Object();
            comment.msg = msg.value;
            comment.owner = _user_[0];
            comment.dateadded = new Date().toLocaleString().replace(',', '');
            comment.id = _user_[0] + Date.now();
            pushComment(comment,id);
            appendComment(commentssections,comment["msg"],comment["owner"],comment["dateadded"]);
            msg.value = "";
            if(owner!=_user_[0]){newNotification(owner,_user_[0]+
            " commented "+comment["msg"]+" on your",comment["dateadded"]);}
        }
        loadComments(commentssections, id);
        if (window.innerWidth > 600) {
        }
    } else {
        comments.style.display = "block";
        document.body.style.overflowY = "hidden";
        if(window.innerWidth<=600){
            comments.style.top = $(window).height()+window.scrollY+"px";
            comments.style.transition = "all 500ms";
            setTimeout(() => {
                comments.style.top = comments.offsetTop-comments.offsetHeight+"px";
            }, 500);
            
        }
        loadComments(document.getElementById("csection"), id);
    }
    function loadComments(commentsection, id) {
        if(comupdating){
            setInterval(() => {
                loadComments(commentsection,id);
            }, 1000);
        }
        $.ajax({
            url: "postcomments/"+id + ".json",
            type: 'POST',
            dataType: 'json',
            async: true,
            caches: false,
            success: function (data) {
                x = 0;
                for (var i in data) { if (i == 0) { continue; } x++ }
                for (var p in data) {
                    appendComment(commentsection, data[x]["msg"], data[x]["owner"], data[x]["dateadded"]);
                    x--;
                }
            },
            statusCode: {
                404: function () {
                    return;
                }
            }
        });
    }

    function pushComment(comment,_path) {
        $.ajax
        ({
            type: "GET",
            dataType: 'json',
            async: true,
            caches: false,
            url: 'comment.php',
            data: { data: JSON.stringify(comment), path: _path+".json"},
            success: function () { comupdating = true; },
            failure: function () { },
            complete: function () { comupdating = false; }
        });

    }
    function appendComment(commentsection, _msg, _owner, _dateadded) {
        var holderparent = document.createElement("div");
        commentsection.appendChild(holderparent);
        var holder = document.createElement("div");
        holderparent.appendChild(holder);
        holderparent.style.height = "auto";
        holderparent.style.width = "100%";
        holderparent.style.marginTop = "50px";
        holderparent.style.display = "block";
        holder.classList.add("acomment");
        holder.style.marginLeft = "10px";
        holder.style.borderRadius = "10px";
        holder.style.backgroundColor = "#D3D3D3";
        var msg = document.createElement("p");
        msg.style.color = "black";
        msg.style.fontSize = "130%";
        msg.style.display = "inline";
        holder.appendChild(msg);
        msg.innerHTML = _msg;

        var info = document.createElement("div");
        var det = document.createElement("p");
        det.innerHTML = _owner + " at " + _dateadded;
        det.style.color = "white";
        det.style.fontSize = "100%";
        info.appendChild(det);
        info.color = "black";
        holder.appendChild(info);
    }
}