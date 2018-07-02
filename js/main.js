/**
 * Created by Carli on 28/07/2017.
 */
var faceTime = 0; //Time that the face displays before going to main display in seconds
var displayTime = 5; //Time that main display is on

function showMainDisplay() {
    $('.display').hide();
    $('#mainDisplay').show();
    state = 'main';
    fillInValues();
}

function showFace() {
    $('.display').hide();
    $('#faceDisplay').show();
    state = 'face';
}

// Central Show Display Function. Pass in ID of display
function showDisplayById(id) {
    $('.display').hide();
    $('#'+id).show();
    cancelTimer();
}

function showCO2Display() {
    $('.display').hide();
    $('#CO2Display').show();
    cancelTimer();
}

function showHumidityDisplay() {
    $('.display').hide();
    $('#HumidityDisplay').show();
    cancelTimer();
}

function showTempDisplay() {
    $('.display').hide();
    $('#TempDisplay').show();
    cancelTimer();
}

function showDustDisplay() {
    $('.display').hide();
    $('#DustDisplay').show();
    cancelTimer();
}

function cancelTimer() {
    j = displayTime + 1;
    i = faceTime + 1;
}


var i = 1;
var j = 1;
//Change variant of emotion every 3 seconds
(function(){
    if (state == 'face') {
        j = 1;
        i++;
        if (i == faceTime) {
            showMainDisplay();
            state = 'main';
        }
    } else if (state =='main'){
        i = 1;
        j++;
        if (j==displayTime) {
            showFace();
            state='face';
        }
    } else {
        i = 1; j = 1;
    }
    setTimeout(arguments.callee, 1000);
})();


//Change variant of emotion every 3 seconds
var min = 1;
var max = 4;
(function(){
    var random = Math.floor(Math.random() * (max - min + 1)) + min;
    $('#emotionImage').attr('src', 'images/emotions/'+emotion+'/'+random+'.png' );
    setTimeout(arguments.callee, 1500);
})();

var bubble_min = 1;
var bubble_max = 4;
(function(){
    var random = Math.floor(Math.random() * (max - min + 1)) + min;
    $('#speechBubble').attr('src', 'images/emotions/'+emotion+'/bubble'+random+'.png' );
    setTimeout(arguments.callee, 4000);
})();





/******************************************
 * CHANGE BG COLOR AND FACE IMG
 *****************************************/

function changeBgColor(e, bg) {
    emotion = e;
    Bg_Color = bg;

    // Change folder to appropriate emotion
    $('#emotionImage').attr('src', 'images/emotions/'+e+'/1.png' );

    // Change bg color
    $('div.container').removeClass('blue green red orange humid').addClass(bg);
}


/******************************************
 * Set New Values for Co2, Humidity, Temp, Dust
 * and change icon colours
 * and change display values
 *****************************************/

function setValues(C, H, T, D) {

    $('#CO2-value').text(C);
    $('#humidity-value').text(H);
    $('#temp-value').text(T);
    $('#dust-value').text(D);


    $('.display-button').removeClass('blue red green orange');

    var C_dom = $('#CO2-display-button');
    var T_dom = $('#temp-display-button');
    var H_dom = $('#humidity-display-button');
    var D_dom = $('#dust-display-button');

    var message = "Great!";
    var color = "blue";

    // Carbon Dioxide Conditionals
    if(1000 <= C) {
        C_dom.addClass('red');
        message = "Too high! Bad for learning.";
    } else if (700 <= C && C < 1000) {
        C_dom.addClass('orange');
        message = "OK. Try to get under 500ppm!";
    } else if (500 <= C && C < 700){
        C_dom.addClass('green');
        message = "Good! Under 700ppm.";
    } else if (C < 500){
        C_dom.addClass('blue');
        message = "Great! CO2 is very low. Perfect for learning at your best!"
    }
    $('#CO2-value-message').text(message);

    // Temperature
    if(21 <= T && T <= 23) {
        T_dom.addClass('blue');
        message = "Perfect! The temperature is just right.";
    } else if ((19 <= T && T <= 20) || (24 <= T && T <= 25)){
        T_dom.addClass('green');
        message = "Good! Try for 21 to 23&deg;C";
    } else if ((16 <= T && T <= 18) || (26 <= T && T <= 27)){
        T_dom.addClass('orange');
        message = "OK. A bit uncomfortable. ";
    } else if ( T <= 15 ) {
        T_dom.addClass('red');
        message = "It's too cold!";
    } else if ( 28 <= T ) {
        T_dom.addClass('red');
        message = "It's too hot!";
    }
    $('#temp-value-message').html(message);

    // Humidity
    if (45 <= H && H <= 55) {
        H_dom.addClass('blue');
        message = "Perfect! Humidity is between 45% and 55%.";
    } else if ((35 < H && H < 45) || (55 < H && H < 65)) {
        H_dom.addClass('green');
        message = "Good! Try to get it between 45% and 55%.";
    } else if ((25 <= H  && H <= 35) || (65 <= H && H <= 75)) {
        H_dom.addClass('orange');
        message = "OK. Could be better. Try for 45% to 55%.";
    } else if ( H < 25 ) {
        H_dom.addClass('red');
        message = "It's very dry. This can be bad for allergies and respiratory problems.";
    } else if ( 75 < H) {
        H_dom.addClass('red');
        message = "Not good. It's too humid! ";
    }
    $('#humidity-value-message').html(message);


    // Dust
    if(100 < D) {
        D_dom.addClass('red');
        message = "Bad. Too much dust!";
    } else if (51 <= D && D <= 100) {
        D_dom.addClass('orange');
        message = "There's a bit too much dust!";
    } else if (16 <= D && D <= 50){
        D_dom.addClass('green');
        message = "Good. Dust levels are below 50.";
    } else if (D <= 15){
        D_dom.addClass('blue');
        message = "Fantastic! Dust levels are below 15!";
    }
    $('#dust-value-message').html(message);

}

$( document ).ready(function() {
    setValues(co2, humidity, temp, dust);
    changeBgColor(emotion, bg_color);
});

