/**
 * Created by ahf on 1/115/16.
 */
$(function () {
    $("#myStat1").circliful();
    $("#myStat2").circliful();
    $("#myStat3").circliful();
    $("#myStat4").circliful();
    /* tab«–ªª*/
    var tab=$(".tab").find("li");
    var info=$(".info");
    tab.click(function () {
        var index=$(this).index();
        tab.siblings().removeClass("active");
        $(this).addClass("active");
        info.removeClass("active");
        info.eq(index).addClass("active");
    });
})