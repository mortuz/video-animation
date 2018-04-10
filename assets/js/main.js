

$(document).ready(function ($) {

var twrap = new TimelineMax(),
    tlSetup = new TimelineMax(),
    tl = new TimelineMax({delay:1.7}),
    tl1 = new TimelineMax({delay:27}),
    tl2 = new TimelineMax({delay:38}),
    // part 1
    brand_name = $('#brand_name, #brand_name1'),
    // part 2
    brand_name_2 = $('#brand_name_2, #brand_name_21'),
    name_n = $('#name, #name1'),
    customers_name = $('#customers_name, #customers_name1'),
    // part 3
    points_n = $('#points, #points1'),
    value_n = $('#value, #value1 '),
    date_n = $('#date, #date1'),
    after_val = $('#after-val, #after-val1'),
    //part 4
    discount = $('#discount, #discount_1'),
    prise = $('#prise'),
    discount_1 = $('#discount1, #discount_11'),
    prise_1 = $('#prise1, #prise_11'),
    discount_2 = $('#discount2, #discount_21'),
    prise_2 = $('#prise2, #prise_21'),
    // part 5

    point_n  = $('#point'),
    yellow_line  = $('#yellow-line'),
    orange_line  = $('#orange-line'),
    black_line  = $('#black-line'),
    top_current  = $('#top-current'),
    texts_box  = $('#cu-counter, .text-before-cr, .text--one, .text--two, .text-after-cr');
    //setup
    tlSetup.set('#brand_name', { opacity: 0 })
    // part 1
    tl
    .to(brand_name, 1, {opacity:1} )
    .to(brand_name, .3, {opacity:0},'-=.45')
    // part 2

    .to(brand_name_2, 0, {opacity:1}, '-=.2')
    .fromTo(brand_name_2, .15, {ease: Power0.easeNone, x:100}, {ease: Power0.easeNone, x:0}, '-=.2')
    .to(name_n, .7, {text:"Hi, Manisha"},'-=.3') //texts area
    .to(customers_name, .4, {opacity:1},'-=.2')
    .to([brand_name_2,name_n,customers_name], 0, {opacity:0},'+=7.2')
    // part 3

    .from(points_n, .4, {opacity:0, y:-50}, '+=5.3')
    .to(date_n, .7, {text:"as of May 17th"}) //texts area
    .to(points_n, .3, {left:'20%'}, '+=.8') //texts area
    .to(value_n, .7, {text:"= R200"}) //texts area
    .to(after_val, .3, {opacity:1})
    .to([points_n,value_n,date_n, after_val], 0, {opacity:0},'+=5.3');
    // part 4
    tl1
    .fromTo([discount, discount_1, discount_2], .15, {ease: Power0.easeNone, scale:0}, {ease: Power0.easeNone, scale:1},'+=.4')
    .to(discount, .3, {ease: Power0.easeNone, top:'9%', scale:1.3, rotation:0.01}, '+=.875')
    .to(discount, .32, {ease: Power0.easeNone, top:'27%', scale:1, rotation:0.01}, '+=2.05')
    .fromTo(prise, .3, {ease: Power0.easeNone, y:50}, {ease: Power0.easeNone, y:0  , opacity:1}, '-=2.56')
    .to(prise, 0, {ease: Power0.easeNone, opacity:0}, '-=.3')

    // part 4.2
    .to(discount_1, .3, {ease: Power0.easeNone, top:'9%', scale:1.3, rotation:0.01},'-=.1')
    .to(discount_1, .32, {ease: Power0.easeNone, top:'27%', scale:1, rotation:0.01}, '+=2.05')
    .fromTo(prise_1, .3, {ease: Power0.easeNone, y:50}, {ease: Power0.easeNone, y:0  , opacity:1}, '-=2.56')
    .to(prise_1, 0, {ease: Power0.easeNone, opacity:0}, '-=.3')

    // part 4.3
    .to(discount_2, .3, {ease: Power0.easeNone, top:'9%', scale:1.3, rotation:0.01}, '-=.1')
    .to(discount_2, .32, {ease: Power0.easeNone, top:'27%', scale:1, rotation:0.01}, '+=2.05')
    .fromTo(prise_2, .3, {ease: Power0.easeNone, y:50}, {ease: Power0.easeNone, y:0  , opacity:1}, '-=2.56')
    .to(prise_2, 0, {ease: Power0.easeNone, opacity:0}, '-=.3')
    //hide discount
    .to([discount, discount_1, discount_2], 0, {ease: Power0.easeNone, opacity:0}, '+=.1');
    //part 5
    tl2
    .fromTo(point_n, .3, {ease: Power0.easeNone, scale:0 }, {ease: Power0.easeNone, scale:1}, '+=1.2')

    .to(yellow_line, .43, {ease: Power0.easeNone,transformOrigin:'0 0', width:'46%'})
    .to(black_line, .43, {ease: Power0.easeNone,transformOrigin:'0 0', width:'49.8%', opacity:1}, '-=.43')
    .to(orange_line, 1, {ease: Power0.easeNone,transformOrigin:'0 0', width:'11%'}, '+=1')

    .to(black_line, .5, {ease: Power0.easeNone,transformOrigin:'0 0', width:'54.8%'}, '-=.35')
    .to(top_current, .45, {ease: Power0.easeNone, left:'61.5%'}, '-=.5')
    .to(orange_line, .8, {css:{backgroundColor:"#fec242"}}, '+=.9')

    // text
    .to("#cu-counter", .9, {scrambleText:{text:"2000", chars:"123456789",  ease:Linear.easeNone}}, '-=4.2')
    .to('.text-before-cr', .6, {text:"current points"}, '-=4.2') //texts area
    .to('.text--one', 1.2, {text:"R 2300 ="},'-=4.2') //texts area
    .to('.text--two', .4, {text:"180 points"},'-=3.2') //texts area
    .to("#cu-counter", 1, {scrambleText:{text:"2180", chars:"123456789",  ease:Linear.easeNone}}, '-=2.2')
    .to(".text-after-cr", .2, {opacity:1}, '-=3.4')

    //hide part 5
    .to([texts_box, point_n, yellow_line, black_line, top_current, orange_line], .1, {autoAlpha:0}, '+=1.2');

    twrap.add([tlSetup,tl, tl1, tl2]).pause();
    twrap.kill();

    // control panel
    $(".vjs-big-play-button").click(function() {
        twrap.restart();
        console.log('click-first-start');
    });

    $(".vjs-play-control").click(function() {
        twrap.pause();
        console.log('click-pause');
        if ($(this).is('.vjs-paused')) {
            twrap.resume();
            console.log('click-resume');
        }
    });

    $(".vjs-play-control").click(function() {
       if ($('#js--video-player').is('.vjs-ended')) {
            twrap.restart();
            console.log('click-restart-afterEnd');
           $('#brand_name').css('opacity','0');
        }
    });

    let vid = document.getElementsByClassName('vjs-tech')[0]

    vid.ontimeupdate = function(e) {
        var currentTime = vid.currentTime;

        if (currentTime == 0) {
            console.log('restarting animation')
            $('#brand_name').css('opacity', '0');
            twrap.restart();
        }
    }
    vid.onpause = function() {
        twrap.pause();
    }
    vid.onplay = function() {
        twrap.play();
    }
    console.log($(vid))

    $('.vjs-progress-control').find('div').click(function () {
        twrap.restart();
        console.info('PROGRESS BAR CLICKED');
        $('#brand_name').css('opacity','0');
    });
    

});