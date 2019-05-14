var gamebase = $(".gameBase");
var gamepageW = $(window).width();
var gamepageH = $(window).height();

var object = {
    fallH1: 85.6,
    fallW1: 100,
    fallH2: 76.54,
    fallW2: 100,
    catcherH1: 81.02,
    catcherW1: 200,
};
var gamestart = false;
var gameover = false;
var startFall1 = null;
var startFall2 = null;
var touchtest = null;
var countdown = null;
var timeupCheck = null;
var score = 0;
var time = 10;
var fallDir = new Array;
var playerDir = new Array;

function reset() {
    /*$(window).resize(function () {
         gamepageW = $(window).width();
         gamepageH = $(window).height();        
    });*/
    /*$(".gamepage").css({
        "width": gamepageW,
        "height": gamepageH
    })

    var gamebaseW = $(".gamepage").width() * 0.81;
    var gamebaseH = $(".gamepage").height();
    var marginW = $(".gamepage").width() * 0.1;
    var marginH = $(".gamepage").height();*/
    /*$(".leftmargin").css({
        "width": "10%",
        "height": marginH,
        "position": "absolute",
        "top": 0,
        "left": 0
    })*/
    $(".gameBase").css({
        "width": "80%",
        "height": "100%",
        "position": "absolute",
        "top": 0,
        "left": "10%"
    })
    /*$(".rightmargin").css({
        "width": "10%",
        "height": marginH,
        "position": "absolute",
        "top": 0,
        "left": $(".leftmargin").width()+gamebase.width()
    })*/
    
    /*$(".marginBtn").css({
        "width": "5%",
        "height": "5%",
        "position": "absolute",
        "top":0,
        "left":0
    })*/

    $(".score > span").html(score);
    $(".time > span").html(time);
}

function setFall1() {
    var fall1 = $("<div>");
    fall1.append("<img class=\"fallPic1\" src=\"fall1.png\" />")
    fall1.addClass("fallObj");
    fall1.css({
        "position": "absolute",
        "left": Math.floor(Math.random() * (gamebase.width() - object.fallW1)),
        "top": -object.fallH1,
        "height": object.fallH1,
        "width": object.fallW1
    })
    $(".gameBase").append(fall1)
    fall1.stop().animate({ top: gamebase.height() + object.fallH1 }, 2500, function () { fall1.remove(); });
    $(".pause").on("click", function () {
        fall1.stop(true);
    })
    $(".start").on("click", function () {
        fall1.animate({ top: gamebase.height() + object.fallH1 }, 2500, function () { fall1.remove(); });
    })
}

function setFall2() {
    var fall2 = $("<div>");
    fall2.append("<img class=\"fallPic2\" src=\"fall2.png\" />")
    fall2.addClass("fallObj");
    fall2.css({
        "position": "absolute",
        "left": Math.floor(Math.random() * (gamebase.width() - object.fallW2)),
        "top": -object.fallH2,
        "height": object.fallH2,
        "width": object.fallW2
    })
    $(".gameBase").append(fall2)
    fall2.stop().animate({ top: gamebase.height() + object.fallH2 }, 2500, function () { fall2.remove(); });
    $(".pause").on("click", function () {
        fall2.stop(true);
    })
    $(".start").on("click", function () {
        fall2.animate({ top: gamebase.height() + object.fallH2 }, 2500, function () { fall2.remove(); });
    })
}

function setCatcher() {
    var player = $("<div>");
    player.append("<img class=\"catcherPic1\" src=\"catcher.png\" />")
    player.addClass("playerObj");
    player.css({
        "position": "absolute",
        "left": gamebase.width() / 2 - object.catcherW1 / 2,
        "top": gamebase.height() - object.catcherH1,
        "height": object.catcherH1,
        "width": object.catcherW1,
        "z-index": 10
    })
    $(".gameBase").append(player)
}

var caught = 0;
function touch() {
    $.each($(".fallObj"), function () {
        fallDir[0] = $(this).offset().top;
        fallDir[1] = $(this).offset().left;
        fallDir[2] = $(this).offset().top + $(this).height();
        fallDir[3] = $(this).offset().left + $(this).width();

        playerDir[0] = $(".playerObj").offset().top;
        playerDir[1] = $(".playerObj").position().left;
        playerDir[2] = $(".playerObj").offset().top + $(".playerObj").height();
        playerDir[3] = $(".playerObj").offset().left + $(".playerObj").width();


        if (playerDir[3] > fallDir[1] && playerDir[1] < fallDir[1] || playerDir[1] > fallDir[1] && playerDir[3] < fallDir[3] || playerDir[1] < fallDir[3] && playerDir[3] > fallDir[3]) {
            if (playerDir[0] < fallDir[2] && playerDir[2] > fallDir[2] || playerDir[0] < fallDir[0] && playerDir[2] > fallDir[0] || playerDir[0] < fallDir[2] && playerDir[2] > fallDir[0]) {
                if (caught == 0) {
                    caught = 1;
                    $(this).stop().animate({ top: playerDir[0], left: playerDir[1], width:0, height:0/* - gamebase.offset().left*/ }, 100, function () { $(this).remove(); caught = 0; });
                    //$(this).stop().slideUp(1000, function () { $(this).remove(); caught = 0; });
                    //$(this).slideUp(1000, function () { $(this).remove(); caught = 0; });
                    //.slideUp(1000, function () { $(this).remove(); });
                    score = score + 1;
                    $(".score > span").html(score);
                    //$(".score").html("score: " + score);
                    //caught = 0;
                }
            }
        }
        /*if (playerDir[3] > fallDir[1] && playerDir[1] < fallDir[1] || playerDir[1] > fallDir[1] && playerDir[3] < fallDir[3] || playerDir[1] < fallDir[3] && playerDir[3] > fallDir[3]) {
            if (playerDir[0] < fallDir[0]) {
                $(this).remove();
                score = score + 1;
                $(".score > span").html(score);
            }
        }*/
    });
}

function setTime() {
    time = time - 1;
    //$("time").append("<span></span>");
    $(".time > span").html(time);
}

function timeup() {
    if (time == 0) {
        gamestart = false;
        gameover = true;
        stopgaming();
    }
}

function gaming() {
    startFall1 = setInterval(setFall1, 1000);
    startFall2 = setInterval(setFall2, 2000);
    countdown = setInterval(setTime, 1000);
    touchtest = setInterval(touch, 0);
    timeupCheck = setInterval(timeup, 0);
}

function stopgaming() {
    clearInterval(startFall1);
    clearInterval(startFall2);
    clearInterval(touchtest);
    clearInterval(countdown);
    clearInterval(timeupCheck);
    if (time == 0) {
        $(".controlboard").dialog("open");
    }
}

$(document).ready(function () {
    reset();
    setCatcher();
    $(".start").on("click", function () {
        if (gamestart == false) {
            gamestart = true;
            gaming();
            //$(this).attr("src", "pause.png");
            //$(this).removeClass("start").addClass("pause");
            $(".pause").css({
                "z-index": 2
            })
        }
    })
    $(".pause").on("click", function () {
        gamestart = false;
        stopgaming();
        $(".pause").css({
            "z-index": -1
        })
    })
    gamebase.mousemove(function (e) {
        if (gamestart == true) {
            sx = e.pageX - gamebase.offset().left;
            $(".playerObj").css({
                "left": sx - ($(".playerObj").width() / 2)
            })
        }
    })
})