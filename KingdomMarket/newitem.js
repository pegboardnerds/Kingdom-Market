function addNewItem() {
    Reset();
    var creatorwrapper = document.createElement("div");
    if (window.innerWidth < 600) { creatorwrapper.style.width = "96%"; } else {
        creatorwrapper.style
            .width = "400px";
    }
    creatorwrapper.style.height = "auto";
    creatorwrapper.style.backgroundColor = "#2E2E2E";
    document.getElementById("itemsholders").appendChild(creatorwrapper);
    creatorwrapper.style.marginTop = "100px";
    creatorwrapper.style.position = "relative";
    creatorwrapper.style.left = "2%";
    creatorwrapper.id = "creatorwrapper";
    creatorwrapper.style.borderRadius = "10px";

    var imagewrapper = document.createElement("div");
    creatorwrapper.appendChild(imagewrapper);
    imagewrapper.style.width = "180px";
    imagewrapper.style.height = "250px";
    imagewrapper.style.backgroundColor = "#2E2E2E";
    imagewrapper.id = "imagewrapper";

    var image = document.createElement("img");
    image.src = "images/default.jpg";
    imagewrapper.appendChild(image);
    image.style.width = "100%";
    image.style.height = "100%";
    image.id = "image";

    var inputter = document.createElement("input");
    inputter.type = "file";
    inputter.accept = "image/*";
    inputter.id = "fileUpload";
    inputter.style.color = "white";
    creatorwrapper.appendChild(inputter);

    let fileUploader = $("#fileUpload").get(0);
    fileUploader.onchange = function () {
        let file = fileUploader.files;
        if (file == undefined || file.length == 0) { return; }
        var fr = new FileReader();
        fr.readAsDataURL(file[0]);
        fr.onload = function () {
            image.src = fr.result;
        }
    }

    var name = document.createElement("input");
    creatorwrapper.appendChild(name);
    name.style.marginTop = "10px";
    name.style.fontSize = "120%";
    name.style.marginLeft = "10px";
    name.style.border = "none";
    name.placeholder = "What are you selling?";
    name.style.backgroundColor = "#2E2E2E";
    name.type = "text";
    name.id = "name";
    name.onkeypress = function () { name.style.backgroundColor = "white"; }

    var price = document.createElement("input");
    creatorwrapper.appendChild(price);
    price.style.marginTop = "10px";
    price.style.fontSize = "120%";
    price.style.marginLeft = "10px";
    price.style.border = "none";
    price.style.backgroundColor = "#2E2E2E";
    price.placeholder = "Price? numbers only in ttd";
    price.type = "text";
    price.id = "price";
    price.onkeypress = function () { price.style.backgroundColor = "white"; }

    var details = document.createElement("TEXTAREA");
    creatorwrapper.appendChild(details);
    details.style.marginTop = "10px";
    details.style.fontSize = "120%";
    details.style.width = "90%";
    details.style.height = "100px";
    details.style.position = "relative";
    details.style.left = "5%";
    details.style.border = "none";
    details.type = "text";
    details.style.backgroundColor = "#2E2E2E";
    details.placeholder = "Here is where you can elaborate. Add a description. Include your contact here as well.";
    details.id = "details";
    details.onkeypress = function () { details.style.backgroundColor = "white"; }

    var add = document.createElement("button");
    creatorwrapper.appendChild(add);
    add.style.width = "40%";
    add.style.height = "30px";
    add.style.marginTop = "10px";
    add.style.position = "relative";
    add.style.left = "30%";
    add.textContent = "Done";
    add.style.border = "none";
    add.style.backgroundColor = "#2E2E2E";
    add.style.color = "white";
    add.style.marginBottom = "5px";
    add.style.fontSize = "120%";
    add.id = "add";
    add.onclick = function () {

        if (!HasLetters(name.value)) { name.style.background = "red"; return; }
        if (HasLetters(price.value)) { price.style.background = "red"; return; }
        if (!HasNumbers(price.value)) { price.style.background = "red"; return; }
        if (!HasLetters(details.value)) { details.style.background = "red"; return; }

        if (fileUploader.files[0] == undefined || fileUploader.files[0] == null) {
            alert("You did not upload a photo? Please do. inluding pictures will increase your chances of success.");
            return;
        }
        var filename = _user_[0] + Date.now();
        filename += ".jpg";
        const renamedFile = new File([fileUploader.files[0]], filename);
        uploadFile(renamedFile);
         newProduct("useruploaded/" + filename, name.value, price.value, details.value,
            _user_[1], _user_[0]);
        setTimeout(() => {
            getData();
        }, 1000);
        //sendData();
        var listing = document.getElementById("addlisting");
        listing.style.transition = "all 1s";
        listing.style.transform = "rotate(360deg)";
        document.getElementById("creatorwrapper").remove();
    }
}