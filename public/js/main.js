function sign() {
    var name = document.signUP.name.value;
    var email  = document.signUP.email.value;
    var phno = document.signUP.phno.value;
    var username = document.signUP.username.value;
    var password = document.signUP.password.value;
    var er= document.querySelector("#errormsg")
    if((name==""||name==null)||(email==""||email==null)||(phno==""||phno==null)||(username==""||username==null)||(password==""||password==null))
    {
        er.classList.remove("error")
        er.classList.add("errorshow")
        return false;
    }
    else{
        er.classList.remove("errorshow")
        er.classList.add("error")
        return true;
    }
}