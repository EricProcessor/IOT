$(function(){
    $(".top-nav").load("../../../../WEB-INF/velocity/layout/header.html");
    $(".left-menu").load("../../../../WEB-INF/velocity/layout/leftMenu.html");
});
function tooglePage(msg){
    var url = $(msg).attr("data-target")
    window.location.href="../../../../WEB-INF/velocity/"+url;
}
function toogleInfo(msg){
    var url = $(msg).attr("data-target")
    window.location.href=url;
}
function addPro(msg){
    var url = $(msg).attr("data-target")
    window.location.href="../"+url;
}