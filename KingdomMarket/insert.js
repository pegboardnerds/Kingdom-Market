function addinsert(hasimage,image,_text,implementpaypal,redirect,redirecto,animate, autosize){
    let holder = document.createElement("div");
    document.getElementById("extra").appendChild(holder);
    holder.style.width = "100%";
    if(autosize){holder.style.height = "auto";}else{holder.style.height = "100px";}
    holder.style.borderRadius = "10px";
    holder.style.marginTop = "10px";
    holder.style.backgroundColor = "#D3D3D3";
    holder.classList.add("insert");
    holder.style.cursor = "pointer";
    holder.style.transition = "all 1s";
    holder.onmouseenter = function(){
        holder.style.transition = "all 1s";
        holder.style.transform = "scale(0.9)";
    }
    holder.onmouseleave = function(){
        holder.style.transition = "all 1s";
        holder.style.transform = "scale(1)";
    }

    let textwrapper = document.createElement("div");
    holder.appendChild(textwrapper);
    textwrapper.style.width = "100%";
    textwrapper.style.height = "auto";
    
    let text = document.createElement("P");
    textwrapper.appendChild(text);
    text.innerHTML = _text;
    text.style.fontSize = "120%";
    text.style.textAlign = "center";

    if(implementpaypal){
        let image = document.createElement("img");
            image.src = "images/payp.png"; 
            holder.appendChild(image);
            image.style.height = "100px";
            image.style.width = "100px";
            image.onmouseenter = function(){
                image.style.transition = "all 1s";
                image.style.transform = "scale(1.2)";
            }
            image.onmouseleave = function(){
                image.style.transition = "all 1s";
                image.style.transform = "scale(1)";
            }
    }
    if(redirect){
        holder.onclick = function(){
            window.location = redirecto;
        }
        //window.location = "";
    }
    if(animate){
    setInterval(() => {
        holder.style.transform = "scale(0.6)";
        setTimeout(() => {
            holder.style.transform = "scale(1)";
        }, 500);
    }, 5000);
}
}
function getInserts(type){
        $.ajax({
            url: 'inserts.json',
            type: 'POST',
            dataType: 'json',
            async: true,
            caches: false,
            success: function (data) {
                x = 0;
                for(p in data){if(x==0){continue;}x++;}
                for(p in data){
                if(data[x]["type"]==type){addinsert(data[x]["hasimage"],data[x]["image"]
                ,data[x]["text"],data[x]["implementpaypal"],data[x]["redirect"],data[x]["redirecto"]
                ,data[x]["animate"],data[x]["autosize"]);} x++;
                }
            },
            statusCode: {
                404: function () {
                    alert('There was a problem with the server.  Try again soon!');
                }
            }
        });
    }
function sendInsert(){}

function clearInserts(){
    if(document.getElementsByClassName("insert").length>0){
        document.getElementsByClassName("insert")[0].remove(); clearInserts();
    }
}

