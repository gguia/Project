var timer;

onerror = handleErr;
var txt = "";
function handleErr(msg, url, l) {
    txt = "There was an error on this page.\n\n";
    txt += "Error: " + msg + "\n";
    txt += "URL: " + url + "\n";
    txt += "Line: " + l + "\n\n";
    txt += "Click OK to continue.\n\n";
    alert(txt);
    return true;
}

var favoriteArray = [];

function regist() {
    const despues = document.getElementById("container");
    despues.style.display = "block";
}

function ValidateEmail(form1) {

    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (form1.match(mailformat)) {
        alert("Valid email address! Thank you for registering");
        document.getElementById("email").focus();
        return true;
    }

    else {
        alert("You have entered an invalid email address!");
        document.getElementById("email").focus();
        return false;
    }
}

function registre() { //regista 
    let userx = document.getElementById("name").value;
    let mailx = document.getElementById("email").value;
    let passx = document.getElementById("passwo").value;
    let passx2 = document.getElementById("passwo2").value;
    var usernames = JSON.parse(localStorage.getItem("user"));
    var passwords = JSON.parse(localStorage.getItem("password"));
    var emails = JSON.parse(localStorage.getItem("email"));

    if (usernames == null) {
        usernames = []
    }

    if (passwords == null) {
        passwords = [];
    }

    if (emails == null) {
        emails = [];
    }

    ValidateEmail(mailx);
    /* while (!ValidateEmail(mailx)) {
         mailx = null;
         regist();
     }*/

    if (passx != passx2) {
        alert("Password\'s don\'t match.")
        return true;
    }
    if (userx.length < 1) {
        alert("Please fill your username.")
        return;
    }
    if (mailx.length < 1) {
        alert("Please write your e-mail.")
        return;
    }
    if (passx.length < 4) {
        alert("Please choose a longer password")
        return;
    }

    usernames.push(userx);
    passwords.push(passx);
    emails.push(mailx);

    localStorage.setItem("user", JSON.stringify(usernames));
    localStorage.setItem("email", JSON.stringify(emails));
    localStorage.setItem("password", JSON.stringify(passwords));

    const despues = document.getElementById("container");
    despues.style.display = "none";
    window.setTimeout(window.location.reload(), 2000);

}

function fechas() {
    const despues = document.getElementById("container");
    despues.style.display = "none";
}

function logged() {
    /*var golog = document.getElementById(golog);
    golog.addEventListener("click", function(){
        document.getElementById("demo").innerHTML = "Hello World";
      });*/
    //preventDefault()

    var ouser = document.getElementById("ousername").value;
    var apassw = document.getElementById("apasse").value;
    var usernames = JSON.parse(localStorage.getItem("user"));
    var passwords = JSON.parse(localStorage.getItem("password"));
    var emails = JSON.parse(localStorage.getItem("email"));

    console.log(usernames);

    if (usernames == null) {
        usernames = [];
    }

    if (passwords == null) {
        passwords = [];
    }

    if (ouser == "" || apassw == "") {
        alert("Please enter your User and Password");
        return;
    }

    const userindex = usernames.findIndex(el => el === ouser);

    console.log(userindex);

    if (userindex !== -1) {
        if (passwords[userindex] == apassw) {

            afterlogin(ouser);

        }
        else {
            alert("Password is wrong!")
        }
    }
    else {
        alert("Please Register first!")
    }
}

function afterlogin(valor) {
    getfavlist();
    const bef = document.getElementById("topodir");
    const aft = document.getElementById("topodir2");
    bef.style.display = "none";
    aft.style.display = "block";
    var d = formatDate(new Date());

    var lastStoredLogin = localStorage.getItem('lastlogin') ? localStorage.getItem('lastlogin') : "never! "

    aft.innerHTML = "Welcome, " + valor + "<br>" + "logged in: " + d + "<br>" + "last login was at: " + lastStoredLogin;

    // setTimeout(() => {  location.reload(); }, 3000);  -  Caso o de baixo não funcione, este faz reload
    timer = setTimeout(function () { location.reload() }, 300000);

    var lastlogin = formatDate(new Date());

    localStorage.setItem("lastlogin", lastlogin);
    corporesearch();

}

function corporesearch() {
    var mpage = document.getElementById("mpage");
    mpage.style.display = "block";

    var favoritesPointer = document.getElementById("favorites");
    //favoritesPointer.innerHTML = 

    var seach = document.getElementById("searchbar");
    seach.addEventListener('keypress', function (e) {
        console.log(e.key);
        if (e.key === 'Enter') {
            e.preventDefault();
            clearTimeout(timer);
            timer = setTimeout(function () { location.reload() }, 300000);
            dosearch();
        }
    });
    //seach.addEventListener('submit', dosearch()); - Inutilizado, o submit dá refresh à página;

}

function hideorshow() {
    var saywhat = document.getElementById("apasse");
    if (saywhat.type === "password") {
        saywhat.type = "text";
    } else {
        saywhat.type = "password";
    }
}

function dosearch() {
    var thesearch = document.getElementById("searchbar").value;
    var resultfeed = document.getElementById("contents");
    if (thesearch == "") {
        alert("Please enter something in the field");
    }
    else {
        var url = "";
        var img = "";
        var title = "";
        var author = "";
        var readmore = "";

        httpGetAsync("https://www.googleapis.com/books/v1/volumes?q=" + thesearch, volumeInfo);

    }

    resultfeed.innerHTML = "";

    /*while (document.getElementById('contents').firstChild) {
        document.getElementById('contents').removeChild(document.getElementById('contents').firstChild);
    } ------ Opção para limpar o contents */
};


function volumeInfo(responseJSON) {
    contents = document.getElementById('contents');
    response = JSON.parse(responseJSON);

    for (i = 0; i < response.items.length; i++) {
        bookdivision = document.createElement('div');
        contents.appendChild(bookdivision);
        bookdivision.setAttribute("id", "book" + i);
        //bookdivision.style.display = "block";  NOT NECESSARYYY
        //bookdivision.style.border = "1px solid black";
        console.log(bookdivision);
        title = document.createElement('h5');
        bookdivision.appendChild(title);
        title.outerHTML = '<h5 class="center-align white-text">' + response.items[i].volumeInfo.title + '</h5>';
        idunico = response.items[i].id;
        console.log(idunico);
        author = document.createElement('h5');
        bookdivision.appendChild(author);
        author.outerHTML = '<h5 class="center-align white-text"> By:' + response.items[i].volumeInfo.authors + '</h5>';
        img = document.createElement('img');
        bookdivision.appendChild(img);
        url = response.items[i].volumeInfo.imageLinks ? response.items[i].volumeInfo.imageLinks.thumbnail : "https://upload.wikimedia.org/wikipedia/commons/b/b8/Indian_Election_Symbol_Book.svg";
        img.setAttribute('src', url);
        breakLn = document.createElement('br');
        bookdivision.appendChild(breakLn);
        breakLn = document.createElement('br');
        bookdivision.appendChild(breakLn);
        readmore = document.createElement('a');
        bookdivision.appendChild(readmore);
        readmore.outerHTML = '<a href=' + response.items[i].volumeInfo.infoLink + '><button id="imagebutton" class="btn red">Read More</button></a>';
        addfav = document.createElement('button');
        bookdivision.appendChild(addfav);
        addfav.outerHTML = '<button id="favbutton' + i + '">Add Favorite</button>';
        addfav = document.getElementById("favbutton" + i);
        bookidd = document.getElementById("book" + i);
        addfav.addEventListener("click", addfavorite.bind(null, response.items[i], i, bookidd, idunico));
        bookdivision.style.border = "1px solid greenyellow";
        bookdivision.style.textAlign = "center";
    }
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous request
    xmlHttp.send(null);
}

function dateComponentPad(value) {
    var format = String(value);

    return format.length < 2 ? '0' + format : format;
}

function formatDate(date) {
    var datePart = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(dateComponentPad);
    var timePart = [date.getHours(), date.getMinutes(), date.getSeconds()].map(dateComponentPad);

    return datePart.join('-') + ' ' + timePart.join(':');
}

function getfavlist() {
    aFavList = JSON.parse(localStorage.getItem("favoritosID"));
    if (aFavList != null) {
        return aFavList;
    }
    else {
        aFavList = [];
        return aFavList;
    }
}

function addfavorite(addfav, i, bookidd, idunico) {
    /*favoriteArray.push(bookidd);
    console.log(i);
    console.log(bookidd);
    console.log(favoriteArray);*/
    aFavList = getfavlist();
    aFavList.push(idunico);
    favoritediv = document.createElement('div');
    favoritediv.setAttribute("id", "favdiv" + i);
    favorites = document.getElementById('favorites');
    favorites.appendChild(favoritediv);
    title = document.createElement('h5');
    favoritediv.appendChild(title);
    title.outerHTML = '<h5 class="center-align white-text">' + addfav.volumeInfo.title + '</h5>';
    author = document.createElement('h5');
    favoritediv.appendChild(author);
    author.outerHTML = '<h5 class="center-align white-text"> By:' + addfav.volumeInfo.authors + '</h5>';
    img = document.createElement('img');
    favoritediv.appendChild(img);
    url = addfav.volumeInfo.imageLinks ? addfav.volumeInfo.imageLinks.thumbnail : "https://upload.wikimedia.org/wikipedia/commons/b/b8/Indian_Election_Symbol_Book.svg";
    img.setAttribute('src', url);
    breakLn = document.createElement('br');
    favoritediv.appendChild(breakLn);
    breakLn = document.createElement('br');
    favoritediv.appendChild(breakLn);
    readmore = document.createElement('a');
    favoritediv.appendChild(readmore);
    readmore.outerHTML = '<a href=' + addfav.volumeInfo.infoLink + '><button id="imagebutton" class="btn red">Read More</button></a>';
    removfav = document.createElement('button');
    favoritediv.appendChild(removfav);
    removfav.outerHTML = '<button id="removbutton' + i + '">Remove Favorite</button>';
    removex = document.getElementById("removbutton" + i);
    removex.addEventListener("click", removefavorite.bind(null, i, removex, idunico, favoritediv));
    favoritediv.style.textAlign = "center";
    

    //listadefavoritos = favorites.getElementsByTagName("div");
    //console.log(listadefavoritos);
    /*favoriteArray = JSON.parse(localStorage.getItem("quefavoritos"));
    if (favoriteArray != null) {
        favoriteArray.push(bookidd);
    }
    else {
        favoriteArray = [bookidd];
    }
    localStorage.setItem("quefavoritos", JSON.stringify(favoriteArray));*/
}

function removefavorite(i, favoritediv, idunico) {
    /*favoriteArray = JSON.parse(localStorage.getItem("quefavoritos"));
    favoriteArray.splice(i, 1);*/

    console.log("favdiv" + i);
    odivparaapagar = document.getElementById("favdiv" + i);
    //odivparaapagar.style.display = "none";
    odivparaapagar.remove();

    


    /*aFavList = getfavlist();
    
    var estaLa = aFavList.indexOf(idunico);       ESTA PARTE ERA PARA GUARDAR OS IDS DOS BOOKS NOS FAVORITOS.
    console.log(estaLa); 
    aFavList.splice(estaLa, 1);*/

    // favorites = document.getElementById('favorites');
    //listadefavoritos = favorites.getElementsByTagName("div");
    //console.log(listadefavoritos);
    //localStorage.setItem("quefavoritos", JSON.stringify(favoriteArray));
}

/*function mostrafavoritos() {
    osfavoritosguardados = JSON.parse(localStorage.getItem("quefavoritos"));
    document.write(osfavoritosguardados);
}*/