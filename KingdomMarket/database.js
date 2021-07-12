_localdata = [];
function displayAllPost(name, details, image, cost, datecreated, sellerid, reference, sellerusername) {

}
_awaitpost = 0;
function AwaitPost() {
  if (getCount() == 0) {
    if (_awaitpost >= 5) { return; }
    _awaitpost++;
    setTimeout(function () { AwaitPost() }, 1000);
  }
  x = 0;
  for (var i in _localdata) { if (i == 0) { continue; } x++ }
  for (listing in _localdata) {
    displayAllPost(_localdata[x]["name"], _localdata[x]["details"],
      _localdata[x]["image"], _localdata[x]["cost"],
      _localdata[x]["datecreated"], _localdata[x]["sellerid"], _localdata[x]["reference"],
      _localdata[x]["sellerusername"]); _awaitpost = 0;
      x--;
  }
}
function getCount() {
  x = 0;
  for (listing in _localdata) {
    x++;
  }
  return x;
}
function sendLis(listing) {
  console.log(listing);
  $.ajax
    ({
      type: "GET",
      dataType: 'json',
      async: true,
      caches: false,
      url: 'overrite_json.php',
      data: { data: JSON.stringify(listing) },
      success: function () { updating = true; },
      failure: function () { },
      complete: function () { updating = false; }
    });
}


function getData() {
  _localdata = [];
  $.ajax({
    url: 'database.json',
    dataType: 'json',
    async: true,
    caches: false,
    success: function (data) {
      for (var transaction in data) {
        tryAppend(data[transaction]);
      }
      AwaitPost();
    },
    statusCode: {
      404: function () {
        alert('There was a problem with the server.  Try again soon!');
      }
    }
  });
}

function showMatching(searchinfo) {
  for (listing in _localdata) {
    found = false;
    var infotoarray = searchinfo.split(" ");
    for (property in _localdata[listing]) {
      if (found) { break; }
      for (word in infotoarray) {
        if (_localdata[listing][property].toString().toLowerCase().includes(infotoarray[word].toLowerCase())) {
          displayAllPost(_localdata[listing]["name"], _localdata[listing]["details"],
            _localdata[listing]["image"], _localdata[listing]["cost"],
            _localdata[listing]["datecreated"], _localdata[listing]["sellerid"], _localdata[listing]["reference"],
            _localdata[listing]["sellerusername"]);
          found = true;
          break;
        }
      }
    }
  }
}

function tryAppend(transaction) {
  var x = 0;
  for (transactions in _localdata) { x++; }
  if (x == 0) { _localdata.push(transaction); return; }
  for (var _transaction in _localdata) {
    if (!isSame(_localdata[_transaction], transaction)) { _localdata.push(transaction); return; } else {
      transactionReplace(_localdata, transaction);
      return;
    }
  }
  _localdata.push(transaction);
}
function transactionReplace(toreplace, replacewith) {
  var __localdata = [];

  for (var transaction in toreplace) {
    for (property in toreplace[transaction]) {
      if (property != "reference") { continue; }
      for (property2 in replacewith) {
        if (property2 != "reference") { continue; }
        if (toreplace[transaction][property] != replacewith[property2]) {
          __localdata.push(toreplace[transaction]);
          sendData(); return;
        }
      }
    }
  }
  __localdata.push(replacewith);
  _localdata = __localdata;
}

function isSame(trans1, trans2) {
  for (var property in trans1) {
    if (property != "reference") { continue; }
    for (var property2 in trans2) {
      if (property2 != "reference") { continue; }
      if (trans1[property] == trans2[property2]) { return true; }
      return false;
    }
  }
}

function showAll() {
  y = 0;
  for (var list in _localdata) { y++; }
  y--;
  for (var num in y) {
    displayAllPost(_localdata[y]["name"], _localdata[y]["details"],
      _localdata[y]["image"], _localdata[y]["cost"],
      _localdata[y]["datecreated"], _localdata[y]["sellerid"], _localdata[y]["reference"],
      _localdata[y]["sellerusername"]);
    y--;
  }
}

function newProduct(image, name, cost, details, sellerid, sellerusername) {
  var item = new Object;
  item.image = image;
  item.name = name;
  item.cost = cost;
  item.details = details;
  item.reference = getReferenceNumber();
  item.sellerid = sellerid;
  item.datecreated = new Date().toLocaleString().replace(',', '');
  item.sellerusername = sellerusername;
  console.log(1+" "+item);
  sendLis(item);
}

function getReferenceNumber() {
  ref = getRandomInt(100000000);
  same = false;

  $.ajax({
    url: 'database.json',
    dataType: 'json',
    caches: false,
    success: function (data) {
      for (var transaction in data) {
        for (var properties in data[transaction]) {
          if (data[transaction]["reference"] == ref) { same = true; }
        }
      }
      if (same) { return getReferenceNumber(); }
      return ref;
    },
    statusCode: {
      404: function () {
        alert('There was a problem with the server.  Try again soon!');
      }
    }
  });
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}