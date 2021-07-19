contbeinghovered = false;
listingbeinghovered = false;
function displayAllPost(name, details, imageaddr, cost, datecreated, sellerid, reference, sellername) {
    var holder = document.getElementById("itemsholders");

    if(window.innerWidth>600){
        holder.style.width = "660px";
    }else{
        holder.style.width = "100%";
    }
    holder.style.zIndex = "1";
    var listing = document.createElement("div");
    listing.style.transition = "all 1s";
    listing.style.opacity = "0%";
    listing.id = reference;
    listing.classList.add("listing");
    if (window.innerWidth > 600) {
        listing.style.display = "inline-block";
    }
    holder.appendChild(listing);
    if (window.innerWidth < 600) { listing.style.width = "100%" } else { listing.style.width = "100%"; }
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
    listing.style.backgroundColor = "#2E2E2E";
    listing.style.marginTop = "5px";
    listing.style.paddingTop = "10px";
    listing.style.borderRadius = "10px";
    var imagewrapper = document.createElement("div");
    listing.appendChild(imagewrapper);
    imagewrapper.style.backgroundColor = "darkslategrey";
    imagewrapper.style.width = "96%";
    if (window.innerWidth > 600) { imagewrapper.style.height = "400px"; } else {
        imagewrapper.style.height = "500px";
    }
    imagewrapper.style.left = "2%";
    imagewrapper.style.position = "relative";
    imagewrapper.style.borderRadius = "10px";
    imagewrapper.style.zIndex = "2";
    imagewrapper.id = "imagewrapper" + reference;
    var image = document.createElement("img");
    imagewrapper.appendChild(image);
    image.src = imageaddr;
    image.style.width = "100%";
    image.style.height = "100%";
    image.style.borderRadius = "10px";
    image.id = "image" + reference;
    image.style.zIndex = "3";

    var textwrapper = document.createElement("div");
    listing.appendChild(textwrapper);
    textwrapper.style.width = "80%";
    textwrapper.style.backgroundColor = "#2E2E2E";
    textwrapper.style.height = "auto";
    textwrapper.style.marginTop = "10px";
    textwrapper.style.left = "10%";
    textwrapper.style.position = "relative";
    textwrapper.style.borderRadius = "10px";
    textwrapper.id = "textwrapper" + reference;

    var text = document.createElement("p");
    textwrapper.appendChild(text);
    text.innerHTML = name;
    text.style.textAlign = "center";
    text.id = "name" + reference;
    text.style.color = "white";
    text.style.fontSize = "130%";

    var detailswrapper = document.createElement("div");
    detailswrapper.style.width = "90%";
    detailswrapper.style.height = "auto";
    detailswrapper.style.backgroundColor = "#2E2E2E";
    detailswrapper.style.position = "relative";
    detailswrapper.style.left = "5%";
    detailswrapper.id = "detailswrapper" + reference;
    detailswrapper.style.paddingBottom = "20px";
    listing.appendChild(detailswrapper);

    var detailstext = document.createElement("p");
    detailswrapper.appendChild(detailstext);
    detailstext.innerHTML = details;
    detailstext.id = "detailstext" + reference;
    detailstext.style.textAlign = "center";
    detailstext.style.fontSize = "120%";
    detailstext.style.backgroundColor = "#2E2E2E";
    detailstext.style.color = "white";
    detailstext.style.paddingLeft = "20px";
    detailstext.style.paddingRight = "20px";

    var informationwrapper = document.createElement("div");
    listing.appendChild(informationwrapper);
    informationwrapper.style.width = "auto";
    informationwrapper.style.height = "auto";
    informationwrapper.style.background = "#2E2E2E";
    //informationwrapper.style.border = "1px dotted white";
    informationwrapper.style.borderRadius = "10px";

    var owner = document.createElement("label");
    informationwrapper.appendChild(owner);
    owner.innerHTML = sellername;
    owner.style.display = "inline-block";
    owner.style.color = "white";
    owner.style.marginLeft = "5px";
    owner.style.fontSize = "120%";

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
    commentstext.style.color = "white";
    commentstext.style.cursor = "pointer";
    commentstext.onclick = function(){
        showComments(reference,sellername);
    }

    listing.onmouseover = function(){
        var cont = document.getElementById("context");
        if(cont.offsetWidth==listing.offsetWidth){
            cont.style.transition = "all 1s";
            cont.style.opacity = "0%";
        }
        cont.style.display = "none";
        cont.style.backgroundColor = "black";
        cont.style.width = listing.offsetWidth+"px";
        cont.style.height = listing.offsetHeight+"px";
        cont.style.left = listing.offsetLeft+"px";
        cont.style.top = listing.offsetTop+"px";
        cont.style.transition = "all 1s";
        cont.style.opacity = "80%";
        
    }
}
