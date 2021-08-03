contbeinghovered = false;
listingbeinghovered = false;
let largness = 150; 
function displayAllPost(_name, details, imageaddr, cost, datecreated, sellerid, reference, sellername) {
    var holder = document.getElementById("itemsholders");

    if(window.innerWidth>600){
        holder.style.width = "600px";
        holder.style.left = (window.innerWidth - 600) / 2 +"px";
    }else{
        holder.style.width = "100%";
    }
    holder.style.zIndex = "1";
    var listing = document.createElement("div");
    listing.style.transition = "all 1s";
    listing.id = reference;
    listing.classList.add("listing");
    holder.appendChild(listing);
    listing.style.width = "450px";
    listing.onmouseenter = function(){
        listing.style.transition = "all 1s";
        listing.style.transform = "scale(0.9)";
    }
    listing.onmouseleave = function(){
        listing.style.transition = "all 1s";
        listing.style.transform = "scale(1)";
    }
    listing.classList.add("animlist");
    listing.style.cursor = "pointer";
    listing.style.height = "auto";
    listing.style.backgroundColor = theme.card;
    listing.style.marginTop = "5px";
    listing.style.paddingBottom = "10px";
    listing.style.borderRadius = "20px";
    listing.style.position = "relative";
    listing.style.left = (holder.offsetWidth-400)/2+"px";

    let dpholder = document.createElement("div");
    listing.appendChild(dpholder);
    dpholder.style.width = "32px";
    dpholder.style.height = "32px";
    dpholder.style.backgroundColor = "white";
    dpholder.style.borderRadius = "50%";
    dpholder.style.display = "inline-block";
    dpholder.style.position = "relative";
    //dpholder.style.marginLeft = "4px";

    let dp = document.createElement("img");
    if(sellername=="R4Rennie"){dp.src = "images/R4Rennie.jpg";}else{
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

    var namewrapper = document.createElement("div");
    listing.appendChild(namewrapper);
    namewrapper.style.width = "80%";
    namewrapper.style.backgroundColor = theme.transparent;
    namewrapper.style.height = "auto";
    namewrapper.style.marginTop = "10px";
    namewrapper.style.position = "relative";
    namewrapper.style.borderRadius = "5px";
    namewrapper.style.display = "inline";
    namewrapper.id = "namewrapper" + reference;
    namewrapper.onmouseenter = function(){
        namewrapper.style.transition = "all 1s";
        namewrapper.style.transform = "scale(1.2)";
    }
    namewrapper.onmouseleave = function(){
        namewrapper.style.transition = "all 1s";
        namewrapper.style.transform = "scale(1)";
    }

    diff =  new Date() - Date.parse(datecreated);
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
    var name = document.createElement("p");
    namewrapper.appendChild(name);
    name.innerHTML = sellername+" "+final;
    name.style.textAlign = "center";
    name.id = "name" + reference;
    name.style.color = "white";
    name.style.fontSize = "100%";
    name.style.display = "inline";


    var textwrapper = document.createElement("div");
    listing.appendChild(textwrapper);
    textwrapper.style.width = "100%";
    textwrapper.style.backgroundColor = theme.transparent;
    textwrapper.style.height = "auto";
    textwrapper.style.marginTop = "10px";
    textwrapper.style.position = "relative";
    textwrapper.style.borderRadius = "10px";
    textwrapper.id = "textwrapper" + reference;


    var text = document.createElement("p");
    textwrapper.appendChild(text);
    text.innerHTML = _name;
    //text.style.textAlign = "center";
    text.id = "name" + reference;
    text.style.color = "white";
    text.style.fontSize = "130%";
    text.style.paddingLeft = "5px";

    let dimensions = imageaddr.split(",");
    let hasratio = false; let ratio = {};
    if(dimensions.length>1){hasratio = true; ratio = getRatio({"0":parseInt(dimensions[1].split("x")[0]),"1":parseInt(dimensions[1].split("x")[1])});}

    var imagewrapper = document.createElement("div");
    listing.appendChild(imagewrapper);
    imagewrapper.style.backgroundColor = "darkslategrey";
    imagewrapper.style.width = "100%";
    imagewrapper.style.height = (400/ratio.width)*ratio.height+"px"; 
    imagewrapper.style.marginTop = "5px";
    imagewrapper.style.position = "relative";
    imagewrapper.style.borderRadius = "20px";
    imagewrapper.style.zIndex = "2";
    imagewrapper.id = "imagewrapper" + reference;

    var image = document.createElement("img");
    imagewrapper.appendChild(image);
    image.src = imageaddr;
    image.style.width = "100%";
    image.style.height = "100%";
    image.style.borderRadius = "20px";
    image.id = "image" + reference;
    image.style.zIndex = "3";
    image.onmouseenter = function(){
        image.style.transition = "all 1s";
        image.style.transform = "scale(1.1)";
    }
    image.onmouseleave = function(){
        image.style.transition = "all 1s";
        image.style.transform = "scale(1)";
    }

    var detailswrapper = document.createElement("div");
    detailswrapper.style.width = "100%";
    //detailswrapper.style.left = "10%";
    detailswrapper.style.height = "auto";
    detailswrapper.style.backgroundColor = theme.transparent;
    detailswrapper.style.position = "relative";
    detailswrapper.style.borderRadius = "10px";
    detailswrapper.style.paddingBottom = "5px";
    detailswrapper.style.marginTop = "10px";
    detailswrapper.id = "detailswrapper" + reference;
    listing.appendChild(detailswrapper);
    detailswrapper.onmouseenter = function(){
        detailswrapper.style.transition = "all 1s";
        detailswrapper.style.transform = "scale(1.2)";
    }
    detailswrapper.onmouseleave = function(){
        detailswrapper.style.transition = "all 1s";
        detailswrapper.style.transform = "scale(1)";
    }

    var detailstext = document.createElement("p");
    detailswrapper.appendChild(detailstext);
    detailstext.innerHTML = details;
    detailstext.id = "detailstext" + reference;
    detailstext.style.textAlign = "center";
    detailstext.style.fontSize = "120%";
    detailstext.style.backgroundColor = "#D3D3D3";
    detailstext.style.color = "black";
    detailstext.style.paddingLeft = "20px";
    detailstext.style.paddingRight = "20px";
    detailstext.style.borderRadius = "10px";

    var informationwrapper = document.createElement("div");
    listing.appendChild(informationwrapper);
    informationwrapper.style.width = "auto";
    informationwrapper.style.height = "auto";
    informationwrapper.style.background = "transparent";
    informationwrapper.style.marginTop = "10px";
    informationwrapper.style.borderRadius = "10px";

    var price = document.createElement("Label");
    informationwrapper.appendChild(price);
    price.innerHTML = "TTD$ " + cost+".00";
    price.style.position = "relative";
    price.style.marginLeft = "20px";
    price.style.display = "inline-block";
    listing.style.opacity = "100%";
    price.style.color = "white";
    price.style.marginRight = "10px";
    price.style.fontSize = "120%";
    price.style.borderRadius = "5px";
    price.style.backgroundColor = theme.transparent;
    price.style.paddingBottom = "5px";
    price.onmouseenter = function(){
        price.style.transition = "all 1s";
        price.style.transform = "scale(1.1)";
    }
    price.onmouseleave = function(){
        price.style.transition = "all 1s";
        price.style.transform = "scale(1)";
    }

    var comments = document.createElement("div");
    informationwrapper.appendChild(comments);
    comments.style.width = "100%";
    comments.style.height = "auto";
    var commentstext = document.createElement("p");
    comments.appendChild(commentstext);
    commentstext.innerHTML = "Comments";
    commentstext.style.textAlign = "center";
    commentstext.style.textDecoration = "underline";
    commentstext.style.fontSize = "110%";
    commentstext.style.color = "#F6F6F6";
    commentstext.style.cursor = "pointer";
    commentstext.onmouseenter = function(){
        commentstext.style.transition = "all 1s";
        commentstext.style.transform = "scale(1.1)";
    }
    commentstext.onmouseleave = function(){
        commentstext.style.transition = "all 1s";
        commentstext.style.transform = "scale(1)";
    }
    commentstext.onclick = function(){
        showComments(reference,sellername);
    }
    function getRatio(data){
        let width = 0; let height = 0;
        width = data["0"]; height = data["1"];
        let min = 0; let max = 0;
        if(width>height){max=width;min=height}else{max=height;min=width;}
        console.log(min+" "+max);
        let lcm = gcd(min,max);
        ratio = {};
        console.log(lcm);
        ratio.width = data[0]/lcm;
        ratio.height = data[1]/lcm;
        return ratio;
    }
    function gcd (a,b){
    if(b == 0){return a}   
    return gcd (b, a % b)
    }
}