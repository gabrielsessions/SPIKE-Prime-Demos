

let fadeInTitle = () => {
    setTimeout(() => {
        $("#title").fadeIn(600);
        if ($(window).width() > 1050 && $(window).height() > 550) {
            setTimeout(() => {
                $("#titlePic").fadeIn(800);
            }, 300);
            
        } 
        
    }, 200);
    
};

let buttonLink = (buttonId, link) => {
    $(buttonId).click(() => {
        window.location.href = link;
    });
}


jQuery(() => {
    fadeInTitle();
    buttonLink("#DocumentationProj5", "proj5documentation.html");
});

