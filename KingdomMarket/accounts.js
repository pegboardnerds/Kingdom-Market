_user = [];
function returnUser(username,idS){
    if(username==null){return null;}
    _user.push(username);
    _user.push(idS);
}
function addToDatabase(username,password,userid){
    if(username==null){return;}
    user = new Object();
    user.username = SHA256(username);
    user.id = userid;
    user.password = SHA256(password);
    console.log(user);
    $.ajax
            ({
                type: "GET",
                dataType: 'json',
                async: true,
                caches: false,
                url: 'save_json.php',
                data: { data: JSON.stringify(user), path:"notifications/"+username+".json"},
                success: function () { },
                failure: function () { }
            });
            returnUser(username,userid);
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
function getUser(username, password) {
    $.ajax({
        url: 'accounts.json',
        dataType: 'json',
        async: true,
        caches: false,
        success: function (data) {
            for(accounts in data){
                if(data[accounts]["username"]!=SHA256(username)){continue;}
                if(data[accounts]["password"]!=SHA256(password)){continue;}
                returnUser(username,data[accounts]["id"]);
                return;
            }
            returnUser(null,null);
        },
        statusCode: {
            404: function () {
                alert('There was a problem with the server.  Try again soon!');
            }
        }
    });
    return _user;
}
function createNewUser(username,password){
    var userid = getRandomInt(100000);
    var userexist = false;
    $.ajax({
        url: 'accounts.json',
        dataType: 'json',
        async: true,
        caches: false,
        success: function (data) {
            for(users in data){
                if(data[users]["username"]==username){ userexist=true; return;}
            }
            if(userexist){return;}
            for(users in data){if(data[users]["id"]==userid){userid = getRandomInt(100000);}}
            return addToDatabase(username,password,userid);
        },
        complete: function(){return _user;},
        statusCode: {
            404: function () {
                alert('There was a problem with the server.  Try again soon!');
            }
        }
    });
    return _user;
}