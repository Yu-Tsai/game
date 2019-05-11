//$(document).ready(function () {
var gamebase = $(".gameBase");
var object = {
    fallH1: 100,
    fallW1: 100,
    fallH2: 50,
    fallW2: 50,
    catcherH1: 50,
    catcherW1: 150,
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
    $(".score").html("score: " + score);
    $(".time").html("time: " + time);
}

function setFall1() {
    var fall1 = $("<div>");
    fall1.append("<img class=\"fallPic1\" src=\"burger.png\" />")
    fall1.addClass("fallObj");
    fall1.css({
        "position": "absolute",
        "left": Math.floor(Math.random() * (gamebase.width()-object.fallW1)),
        "top": -object.fallH1,
        "height": object.fallH1,
        "width": object.fallW1
    })
    $(".gameBase").append(fall1)
    fall1.stop().animate({ top: gamebase.height() + object.fallH1 }, 3000, function () { fall1.remove(); });
    $(".pause").on("click", function () {
        fall1.stop(true);
    })
    $(".start").on("click", function () {
        //if (gamestart == false) {
            fall1.animate({ top: gamebase.height() + object.fallH1 }, 3000, function () { fall1.remove(); });
        //}
    })
}

function setFall2() {
    var fall2 = $("<div>");
    fall2.append("<img class=\"fallPic2\" src=\"bird.png\" />")
    fall2.addClass("fallObj");
    fall2.css({
        "position": "absolute",
        "left": Math.floor(Math.random() * (gamebase.width() - object.fallW2)),
        "top": -object.fallH2,
        "height": object.fallH2,
        "width": object.fallW2
    })
    $(".gameBase").append(fall2)
    fall2.stop().animate({ top: gamebase.height() + object.fallH2 }, 3000, function () { fall2.remove(); });
    $(".pause").on("click", function () {
        fall2.stop(true);
    })
    $(".start").on("click", function () {
        //if (gamestart == false) {
        fall2.animate({ top: gamebase.height() + object.fallH2 }, 3000, function () { fall2.remove(); });
        //}
    })
}

function setCatcher() {
    var player = $("<div>");
    player.append("<img class=\"catcherPic1\" src=\"catcher.png\" />")
    player.addClass("playerObj");
    player.css({
        "position": "absolute",
        "left": gamebase.width()/2 - object.catcherW1/2,
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
        playerDir[1] = $(".playerObj").offset().left;
        playerDir[2] = $(".playerObj").offset().top + $(".playerObj").height();
        playerDir[3] = $(".playerObj").offset().left + $(".playerObj").width();

        
        if (playerDir[3] > fallDir[1] && playerDir[1] < fallDir[1] || playerDir[1] > fallDir[1] && playerDir[3] < fallDir[3] || playerDir[1] < fallDir[3] && playerDir[3] > fallDir[3]) {
            if (playerDir[0] < fallDir[2] && playerDir[2] > fallDir[2] || playerDir[0] < fallDir[0] && playerDir[2] > fallDir[0] || playerDir[0] < fallDir[2] && playerDir[2] > fallDir[0]) {
                if (caught == 0) {
                    caught = 1;
                    $(this).stop().animate({ top: playerDir[0],left:  playerDir[1]}, 100, function () { $(this).remove(); caught = 0; });
                    //$(this).stop().slideUp(1000, function () { $(this).remove(); caught = 0; });
                    //$(this).slideUp(1000, function () { $(this).remove(); caught = 0; });
                    /*.slideUp(1000, function () { $(this).remove(); });*/
                    score = score + 1;
                    $(".score").html("score: " + score);
                    //caught = 0;
                }
            }
        }
            /*if (playerDir[3] > fallDir[1] && playerDir[1] < fallDir[1] || playerDir[1] > fallDir[1] && playerDir[3] < fallDir[3] || playerDir[1] < fallDir[3] && playerDir[3] > fallDir[3]) {
                if (playerDir[0] < fallDir[0]) {
                    $(this).remove();
                    score = score + 1;
                    $(".score").html("score: " + score);
                }
            }*/
    });
}

function setTime() {
    time = time - 1;
    $(".time").html("time: " + time);
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
    clearInterval(countdown);
    clearInterval(touchtest);
    clearInterval(timeupCheck);
    if (time == 0) {
        $(".controlboard").dialog("open");
    }
}

$(document).ready(function () {
    $(".controlboard").dialog({
        autoOpen: true,
        height: 50,
        width: 200,
        modal: true,
        position: {
            my: "center center",
            at: "center center",
            of: ".gameBase"
        },
        buttons:[{
            text: "start",
            "class": "start",
            click: function () {
                $(this).dialog("close");
            }
        }, {
            text: "Back to main",
            "class": "back",
            click: function(){

            }
        }],
        open: function (event, ui) {
            //$(this).parent().find('.ui-dialog-titlebar-close').remove();
            $(this).parent().find('.ui-dialog-titlebar').remove();
            $(".ui-widget-overlay").position({
                my: "left top",
                at: "left top",
                of: ".gameBase"
            });
            $(".ui-widget-overlay").css({
                "height": gamebase.height(),
                "width": gamebase.width()
            })
            if (gameover == false) {
                /*$(".back").css({
                    "display": "none"
                })*/
                $(".back").hide();
            }
            if (gameover == true) {
                /*$(".start").css({
                    "display": "none"
                })
                $(".back").css({
                    "display": ""
                })*/
                $(".start").hide();
                $(".back").show();
            }
        }
    });

    reset();
    setCatcher();
    $(".start").on("click", function () {
        if (gamestart == false) {
            gamestart = true;
            gaming();
        }
    })
    $(".pause").on("click", function () {
        gamestart = false;
        stopgaming();
        $(".controlboard").dialog("open");
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