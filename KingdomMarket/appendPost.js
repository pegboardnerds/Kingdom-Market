updating = false
tries = 0;
shown = 0;
lastamount = 0;
var playing;
let menu = null;
function appendPost(details) {
    var post = document.createElement("div");
    document.getElementById("posts").appendChild(post);
    post.style.width = "100%";
    post.style.backgroundColor = theme.card;
    post.style.height = "300px";
    post.style.position = "static";
    post.style.borderRadius = "10px";
    post.classList.add("apost");

    // var captionholder = document.createElement("div");
    // post.appendChild(captionholder);
    // captionholder.style.width = "100%";
    // captionholder.style.height = "30px";
    // var caption = document.createElement("p");
    // caption.style.textAlign = "center";
    // caption.style.fontSize = "140%";
    // caption.style.color = "white";
    // captionholder.appendChild(caption);
    // caption.innerHTML = details;

    var messageHolder = document.createElement("div");
    post.appendChild(messageHolder);
    messageHolder.style.width = "90%";
    messageHolder.style.position = "relative";
    messageHolder.style.left = "5%";
    messageHolder.style.height = "200px";
    messageHolder.style.overflowY = "scroll";
    messageHolder.style.overflowX = "hidden";
    var message = document.createElement("TEXTAREA");
    messageHolder.appendChild(message);
    message.placeholder = "Share something with the community";
    message.style.width = "100%";
    message.style.border = "0";
    message.style.height = "100%";
    message.style.background = "#2E2E2E";
    message.style.borderRadius = "10px";
    message.style.color = "white";
    message.style.fontSize = "150%";
    message.style.outlineWidth = "0";
    //message.style.padding = "10px";


    var controlsHolder = document.createElement("div");
    post.appendChild(controlsHolder);
    var sender = document.createElement("button");
    controlsHolder.appendChild(sender);
    controlsHolder.style.width = "100%";
    controlsHolder.style.height = "auto";

    sender.style.height = "80%";
    sender.style.width = "20%";
    sender.style.marginLeft = "10px";
    sender.textContent = "Send";
    sender.style.backgroundColor = "transparent";
    sender.style.fontSize = "130%";
    sender.style.border = "0";
    sender.style.color = "white";
    sender.style.display = "inline-block";
    sender.style.borderRadius = "10px";
    sender.onmouseover = function () { sender.style.backgroundColor = "#575757"; }
    sender.onmouseleave = function () { sender.style.backgroundColor = "transparent"; }

    var options = document.createElement("div");
    var more = document.createElement("button");
    controlsHolder.appendChild(more);
    more.style.height = "80%";
    more.style.width = "20%";
    more.style.marginLeft = "10px";
    more.textContent = "Insert";
    more.style.backgroundColor = "transparent";
    more.style.fontSize = "130%";
    more.style.border = "0";
    more.style.color = "white";
    more.style.display = "inline-block";
    more.style.borderRadius = "10px";
    more.onclick = function () {
        if (options.offsetHeight > 10) { options.style.height = "0"; } else {
            options.style.height = "auto";
        }
    }

    post.appendChild(options);
    options.style.width = "100%";
    options.style.height = "0";
    options.style.paddingTop = "10px";
    options.style.overflow = "hidden";
    options.style.backgroundColor = "#2E2E2E";

    var inputter = document.createElement("input");
    inputter.style.color = "white";
    inputter.style.backgroundColor = "#2E2E2E";
    inputter.style.borderRadius = "10px";
    inputter.style.width = "auto";
    inputter.style.width = "200px";
    inputter.type = "file";
    inputter.accept = "image/*";
    inputter.id = "fileUpload";
    options.appendChild(inputter);

    var yturl = document.createElement("input");
    options.appendChild(yturl);
    yturl.style.border = "0";
    if(window.innerWidth<=600){yturl.style.marginLeft="0px"; yturl.style.width = "150px";}else{
        yturl.style.marginLeft = "16px";
    } 
    yturl.style.outlineWidth = "0";
    yturl.style.color = "white";
    yturl.style.fontSize = "110%";
    yturl.style.borderRadius = "10px";
    yturl.style.backgroundColor = "#2E2E2E";
    yturl.placeholder = "Embed youtube video?";

    var res = null;;
    let fileUploader = $("#fileUpload").get(0);
    fileUploader.onchange = function () {
        let file = fileUploader.files;
        if (file == undefined || file.length == 0) { return; }
        var fr = new FileReader();
        fr.readAsDataURL(file[0]);
        fr.onload = function () {
            post.style.transition = "all 1s";
            post.style.height = "auto";
            messageHolder.style.height = "auto";
            var imagewrapper = document.createElement("div");
            post.appendChild(imagewrapper);
            imagewrapper.style.width = "100%";
            imagewrapper.style.height = "400px";
            imagewrapper.style.backgroundColor = "darkslategrey";
            imagewrapper.id = "imagewrapper";
            imagewrapper.style.backgroundColor = "grey";
            var image = document.createElement("img");
            image.src = fr.result;
            imagewrapper.appendChild(image);
            image.style.width = "100%";
            image.style.height = "100%";
            image.id = "image";
            res = fr.result;
        }
    }
    sender.onclick = function () {
        if (!HasLetters(message.value) && (!HasNumbers(message.innerHTML))&&(!HasLetters(yturl.value)&&
        fileUploader.files.length ==0)) { return; }
        if (_user_[0] == null || _user_ == undefined) { getLogin(); return; }
        hasphoto = false;
        filename = null;

        if (fileUploader.files != null && fileUploader.files != undefined && fileUploader.files.length != 0) {
            hasphoto = true;
            filename = _user_[0] + Date.now();
            filename += ".jpg";
            const renamedFile = new File([fileUploader.files[0]], filename);
            uploadFile(renamedFile);
        }
        post.style.transition = "all 1s";
        post.style.overflowY = "hidden";
        post.style.height = 0+"px";
        setTimeout(() => {
            post.remove();
        }, 1000);
        if (hasphoto) {
            listPost(hasphoto, filename, message.value, new Date().toLocaleString().replace(',', ''), _user_[0], true,_user_[0]+Date.now());
        } else {
            if (HasLetters(yturl.value)) {

                listPost(hasphoto, null, message.value + "embedyt" + yturl.value, new Date().toLocaleString().replace(',', ''), _user_[0], true,_user_[0]+Date.now());

            } else {
                listPost(hasphoto, null, message.value, new Date().toLocaleString().replace(',', ''), _user_[0], true,_user_[0]+Date.now());

            }
        }

    }
}

function listPost(haspicture, pictureurl, message, dateadded, owner, newpost,id) {

    if (newpost) {
        postt = new Object();
        if (haspicture) {
            postt.haspicture = haspicture;
            postt.url = pictureurl;
        } else {
            postt.haspicture = haspicture;
            postt.url = "none";
        }
        postt.message = message;
        postt.dateadded = dateadded;
        postt.owner = owner;
        postt.id = id;
        sendData(postt);
        return;
    }

    var postings = document.getElementById("posts");
    var post = document.createElement("div");
    post.style.boxShadow = "0 0 2px brown";
    post.onmouseenter = function(){
        post.style.transition = "all 1s";
        post.style.transform = "scale(0.9)";
    }
    post.onmouseleave = function(){
        post.style.transition = "all 1s";
        post.style.transform = "scale(1)";
    }
    post.style.cursor = "default";
    post.id = id;
    post.classList.add("apost");
    postings.appendChild(post);
    document.getElementById("posts").appendChild(post);
    post.style.width = "100%";
    post.style.backgroundColor = "#2E2E2E";
    post.style.height = "auto";
    post.style.borderRadius = "10px";
    post.style.paddingTop = "4px";
    post.style.marginTop = "10px";
    post.classList.add("post");

    let dpholder = document.createElement("div");
    post.appendChild(dpholder);
    dpholder.style.width = "32px";
    dpholder.style.height = "32px";
    dpholder.style.backgroundColor = "white";
    dpholder.style.borderRadius = "50%";
    dpholder.style.display = "inline-block";
    dpholder.style.position = "relative";
    dpholder.style.marginLeft = "4px";

    let dp = document.createElement("img");
    if(owner=="R4Rennie"){dp.src = "images/R4Rennie.jpg";}else{
        dp.src = "images/notknown.jpg";
    }
    dpholder.appendChild(dp);
    dp.style.height = "100%";
    dp.style.width = "100%";
    dp.style.borderRadius = "50%";
    dp.onmouseenter = function(){dp.style.transition = "all 1s"; dp.style.transform = "scale(1.2)";
    post.style.transform = "scale(1)";
    }
    dp.onmouseleave = function(){dp.style.transform = "scale(1)";}
    dp.style.cursor = "pointer";

    var dateandownerHolder = document.createElement("div");
    post.appendChild(dateandownerHolder);
    dateandownerHolder.style.width = "100%";
    dateandownerHolder.style.height = "30px";
    dateandownerHolder.style.paddingTop = "0px";
    dateandownerHolder.style.display = "inline";
    dateandownerHolder.style.paddingBottom = "10px";

    var dateandowner = document.createElement("p");
    dateandownerHolder.appendChild(dateandowner);
    dateandowner.style.textAlign = "left";
    diff =  new Date() - Date.parse(dateadded);
    tosecs = parseInt(diff)/1000;
    final = 0 ;
    if(tosecs>60){
        tomins = tosecs/60;
        if(tomins>60){
            tohours = tomins/60;
            if(tohours>24){
                todays = tohours/24;
                if(todays>365){
                    tomonths = todays/30;
                    if(tomonths>12){
                        final = Math.floor(tomonths/12) +" year/s ago.";
                    }else{final = Math.floor(tomonths)+" month/s ago."}
                }else{final = Math.floor(todays)+" day/s ago.";}
            }else{final = Math.floor(tohours) + " hour/s ago.";}
        }else{final = Math.floor(tomins)+" minute/s ago.";}
    }else{final = Math.floor(tosecs)+" second/s ago.";}
    dateandowner.innerHTML = owner +" "+ final;
    dateandowner.style.color = "white";
    dateandowner.style.display = "inline-block";
    dateandowner.style.position = "relative";
    dateandowner.style.marginTop = "0px";
    dateandowner.style.paddingLeft = "10px";
    dateandowner.style.fontSize = "90%";
    dateandowner.style.fontStyle = "italic";

    var postmenuicon = document.createElement("p");
    dateandownerHolder.appendChild(postmenuicon);
    postmenuicon.innerHTML = "+";
    postmenuicon.style.display = "inline-block";
    postmenuicon.style.color = "white";
    postmenuicon.style.textAlign = "top";
    postmenuicon.style.position = "relative";
    postmenuicon.style.left = "35%";
    postmenuicon.style.cursor = "pointer";
    postmenuicon.onmouseenter = function(){
        post.style.transform = "scale(1)";
    }
    postmenuicon.onclick = function () {
        if(menu==null){menu = document.createElement("div");document.body.appendChild(menu);
        menu.style.top = $(window).height()+window.scrollY+"px";
    }else{
            menu.style.top = $(window).height()+window.scrollY+"px";
            menu.style.display = "block";
        }
        darkenBackground(menu);
        menu.style.position = "fixed";
        menu.style.backgroundColor = theme.card;
        menu.style.zIndex = "100";
        menu.style.width = "300px";
        menu.style.left = (window.innerWidth-300)/2+"px";
        menu.style.transition = "all 500ms";
        menu.style.height = "auto";
        menu.style.borderRadius = "10px";
        menu.style.overflow = "hidden";
        
        if(owner==_user_[0]){
            console.log("is owner");
            let remove = document.createElement("div");
            remove.classList.add("option");
            remove.style.borderRadius = "10px";
            remove.style.textAlign = "center";
            remove.style.display = "block";
            remove.style.fontSize = "120%";
            remove.style.color = "white";
            menu.appendChild(remove);
            remove.innerHTML = "Remove";
            remove.onclick = function(){
                
            }
            remove.style.cursor = "pointer";
            remove.onmouseenter = function(){remove.style.backgroundColor = "grey";}
            remove.onmouseleave = function(){remove.style.backgroundColor = "transparent";}
            let edit = document.createElement("div");
            edit.classList.add("option");
            edit.style.borderRadius = "10px";
            edit.style.textAlign = "center";
            edit.style.display = "block";
            edit.style.fontSize = "120%";
            edit.style.color = "white";
            menu.appendChild(edit);
            edit.innerHTML = "Edit";
            edit.style.cursor = "pointer";
            edit.onmouseenter = function(){edit.style.backgroundColor = "grey";}
            edit.onmouseleave = function(){edit.style.backgroundColor = "transparent";}
        }
        menu.style.top = menu.offsetTop-menu.offsetHeight+"px";
        setTimeout(() => {
            menu.style.height = "0px";
            setTimeout(() => {
                menu.style.display = "none";
                removeOptions();
                document.getElementById("blackground").style.display = "none";
            }, 500);
        }, 5000);
    }

    var messagewrapper = document.createElement("div");
    messagewrapper.style.height = "auto";
    post.appendChild(messagewrapper);
    messagewrapper.style.width = "100%";
    messagewrapper.style.textAlign = "center";

    var messagep = document.createElement("p");
    messagewrapper.appendChild(messagep);
    messagep.style.textAlign = "left";
    messagep.style.color = "white";
    messagep.style.fontSize = "130%";
    messagep.style.width = "100%";
    messagep.style.display = "flex";
    messagep.style.overflowWrap = "break-word";
    messagep.style.marginLeft = "5px";
    if (haspicture) {
        var imagewrapper = document.createElement("div");
        post.appendChild(imagewrapper);
        imagewrapper.style.width = "100%";
        imagewrapper.style.height = "400px";
        imagewrapper.style.backgroundColor = "darkslategrey";
        imagewrapper.id = "imagewrapper";
        imagewrapper.style.backgroundColor = "grey";
        var image = document.createElement("img");
        image.src = "useruploaded/" + pictureurl;
        imagewrapper.appendChild(image);
        image.style.width = "100%";
        image.style.height = "100%";
        image.id = "image";
    } else {
        link = "";
        if (message.includes("embedyt")) {
            link = message.split("embedyt")[1];
            if(link.startsWith("https://www.youtube.com/watch?v=")){
                link = link.split("https://www.youtube.com/watch?v=")[1].split("&")[0];
            }
            if(link.startsWith("https://youtu.be/")){
                link = link.split("https://youtu.be/")[1];
            }
            link = "https://www.youtube.com/embed/" + link;
            message = message.split("embedyt")[0];
            var vid = document.createElement("iframe")
            post.appendChild(vid);
            vid.style.height = "300px";
            vid.style.width = "100%";
            vid.style.border = "0";
            vid.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            vid.allowFullscreen = "true";
            vid.src = link;
        }
    }
    messagep.innerHTML = message;

    var comments = document.createElement("div");
    post.appendChild(comments);
    comments.style.width = "100%";
    comments.style.height = "auto";
    var commentstext = document.createElement("p");
    comments.appendChild(commentstext);
    commentstext.innerHTML = "Comments";
    commentstext.style.textAlign = "center";
    commentstext.style.textDecoration = "underline";
    commentstext.style.fontSize = "110%";
    commentstext.style.color = "white";
    commentstext.style.cursor = "pointer";
    commentstext.onclick = function(){
        showComments(post.id,owner);
    }
}

function sendData(post) {
    var id = post["id"];
    $.ajax
        ({
            type: "GET",
            dataType: 'json',
            async: true,
            caches: false,
            url: 'appendposts.php',
            data: { data: JSON.stringify(post), comid: "postcomments/"+id+".json"},
            success: function () { updating = true; },
            failure: function () { },
            complete: function () { updating = false; }
        });
}

function getPost(incrementing,bias) {
    if (updating) {
        setTimeout(() => {
            getPost();
        }, 1000);
    }
    $.ajax({
        url: 'posts.json',
        type: 'POST',
        dataType: 'json',
        async: true,
        caches: false,
        success: function (data) {
            let x = 0;
            for (var i in data) { if (i == 0) { continue; } x++ }
            if(bias){if(x==lastamount){return true;}}
            lastamount = x;
            if(!incrementing){ResetPosts();appendPost("Have something to say?");}
            let until =5;
            let l = x;
            if(incrementing){x-=shown+1; until = shown+5;}else{shown=0;}
            for (var p in data) {
                    if(shown+1>l){shown = l; return;}
                    if(shown<=until){
                        listPost(data[x]["haspicture"], data[x]["url"], data[x]["message"], data[x]["dateadded"], data[x]["owner"], false,data[x]["id"]);
                        shown++;
                        x--;   
                    }else{return;}
            }
        },
        statusCode: {
            404: function () {
                alert('There was a problem with the server.  Try again soon!');
            }
        }
    });
}
function removeOptions(){
    var listings = document.getElementsByClassName("option");
    if (listings.length > 0) { listings[0].remove(); removeOptions(); }
}
function ResetPosts() {
    var listings = document.getElementsByClassName("apost");
    if (listings.length > 0) { listings[0].remove(); ResetPosts(); }
}