var fadeInTitle = function () {
    setTimeout(function () {
        $("#title").fadeIn(600);
        if ($(window).width() > 1050 && $(window).height() > 550) {
            setTimeout(function () {
                $("#titlePic").fadeIn(800);
            }, 300);
        }
    }, 200);
};
var buttonLink = function (buttonId, link) {
    $(buttonId).click(function () {
        window.location.href = link;
    });
};
jQuery(function () {
    fadeInTitle();
    buttonLink("#DocumentationProj5", "proj5documentation.html");
});
