function logged() {
    var ouser = document.getElementById("ousername");
    var apassw = document.getElementById("apasse");
    if (ouser = "" || apassw = "") {
        alert("Please enter your User and Password");
    }
    else {
        if (ouser = "" && apassw = "") {
            var bef = document.getElementById("topodir");
            var aft = document.getElementById("topodir2");
            bef.style.display = "none";
            aft.style.display = "block";
            aft.innerHTML = 'welcome,' + ouser;
            return false;
        }
    }


}

function regist() {
    var username = prompt("Please write your Username:");
    var email = prompt("Type your e-mail:");
    var passeword = prompt("Choose a password between 4 and 8 characters:");

}

function strat() {
    bef.style.display == "block";
    aft.style.display == "none";