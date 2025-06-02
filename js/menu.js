$('#play').on('click', function(){
    sessionStorage.removeItem("load");
    window.location.assign("./html/phasergame.html");
});