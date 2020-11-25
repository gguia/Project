

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
    var ouser = document.getElementById("ousername").value;
    var apassw = document.getElementById("apasse").value;
    
    var usernames = JSON.parse(localStorage.getItem("user"));
    var passwords = JSON.parse(localStorage.getItem("password"));
    var emails = JSON.parse(localStorage.getItem("email"));

    console.log(usernames)
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
    const bef = document.getElementById("topodir");
    const aft = document.getElementById("topodir2");
    bef.style.display = "none";
    aft.style.display = "block";

    aft.innerHTML = "Welcome, " + valor + 

}


/*if (ouser == "" && apassw == "") {
    bef.style.display = "none";
    aft.style.display = "block";
    aft.innerHTML = 'welcome,' + ouser;

}*/
