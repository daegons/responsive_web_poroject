
// 개발자도구창의 토글디바이스툴바 사용하지 않았을때
// 테스트 상황(윈도우 넓이 조절)에서 생기는 오류를 해결하기 위한 코드
var deviceSize = 1050
function scrollOX(status){
    $('html').css({
        overflowY:status
    })
    return $('html').width()
}
// 토글디바이스툴바가 켜져 있으면 scX와 scO는 같은 값이 되므로
// 아래 if 문을 들어가지 않아서 deviceSize는 원래 값임
var scX = scrollOX('hidden')
var scO = scrollOX('scroll')
var scD = scX - scO
// 토글디바이스툴바가 꺼져 있으면 스크롤바가 생성되므로
// 스크롤바 넓이 17px을 deviceSize에서 빼야 함
if (scD>0) {
    deviceSize = deviceSize - scD
}
var ww = $(window).width()
if (ww>deviceSize ) {
    $('html').addClass('pc')
} else {
    $('html').addClass('mobile')
}


//헤더 이벤트
var scrollValue = 0;
scrollValue = $(document).scrollTop();
fixHeader();

$(window).on('scroll resize', function(){
    scrollValue = $(document).scrollTop();
    fixHeader();
})

function fixHeader(){
    if(scrollValue > 500) {
        $('#header .row').addClass('on');
    }else {
        $('#header .row').removeClass('on');
    }
}
//스크롤 값이 위에 고정 값보다 커지지거나 작으면 on붙이거나 삭제로 
//css에서 헤더 부분 스타일함


//----------------------------------------------------

$('header .open').on('click', function(){
    $('body').css({'overflow' : 'hidden'});
    $('.bg').css({'display' : 'block'});
    $('#nav, #header').addClass('on');
})

$('.close, .bg').on('click', function(){
    $('body').css({'overflow':'auto'});
    $('.bg').css({'display' : 'none'});
    $('#nav, #header').removeClass('on');
})
//nav바 오픈 언오픈
//1100px 메뉴버튼 클릭시 bg nav바 나타나고 x나 bg클릭시 사라짐
//-----------------------------------------------------





//------------------------depth2 아래  슬라이드--------------------
$('#header #nav .depth1 > li').on('click', function(){
    
        $(this).find('.depth2').stop().slideDown();

});
$('#header #nav .depth1 > li').on('mouseleave', function(){

        $(this).find('.depth2').stop().slideUp();

});


//---------------------------------------------------------------------



//메인 img 슬라이드(slick) 작업
$(function(){
    $(".visual .slide").slick({
        arrows: false, //화살표
        dots: true,
        autoplay: true,
        fade: true, //fade in  효과 주기위해서 true로
        autoplaySpeed: 3000,
        pauseOnHover: false, //마우스오버 되었을 때 멈춤 해제
        pauseOnFocus: false
    });
});



//---------------------------구간별로 img 움직임--------------------------------------------

$(window).on('scroll', function(){
    let ar2scl = $('section.about img').offset().top - $(window).height()/2;

    let sct = $(this).scrollTop()

    if (sct >= ar2scl) {
        $('.inner ul li, .inner h2').addClass('on');
    } else {
        $('.inner ul li, .inner h2').removeClass('on');
    }

})



$(window).on('scroll', function(){
    let prescr = $('.premium').offset().top - $(window).height()/3;
    let sct = $(this).scrollTop()

    if (sct >= prescr) {
        $('section.premium .banner, section.premium .title').addClass('on');
    } else {
        $('section.premium .banner, section.premium .title').removeClass('on');
    }
})

$(window).on('scroll', function(){
    let prescr = $('.box').offset().top - $(window).height()/1;
    


    let sct = $(this).scrollTop()

    if (sct >= prescr) {
        $('footer .box h2').addClass('on');
    } else {
        $('footer .box h2').removeClass('on');
    }
})
$(window).on('scroll', function(){
    let prescr = $('section.global .title p').offset().top - $(window).height()/1;
    let sct = $(this).scrollTop()

    if (sct >= prescr) {
        $('section.global ul').addClass('on');
    } else {
        $('section.global ul').removeClass('on');
    }
})
$(window).on('scroll', function(){
    let prescr = $('section.global').offset().top - $(window).height()/1;
    let sct = $(this).scrollTop()

    if (sct >= prescr) {
        $('section.global .title h2').addClass('animate__animated animate__bounce');
    } else {
        $('section.global .title h2').removeClass('animate__animated animate__bounce');
    }
})


//----------------페이지 상단으로 가는 화살표 버튼-----------------------
//클릭시 부드럽게

$(window).scroll(function(){
    let sct = $(this).scrollTop()
    if (sct > 920) {
        $('#gotop').fadeIn(300);
    } else {
        $('#gotop').fadeOut(300);
    }
})
$('#gotop a').on('click', function(){
    $('html').animate({scrollTop:'0'}, 500);
    return false;
})
//------------------------------


$(window).on('load', function(){
    let count = 0;
    let timer = setInterval(add, 25)
    function add() {
        count++
        if (count>=40) { 
            clearInterval(timer) 
            $('.introAni').animate({
                left:'-100%',
            }, 500, function(){
                $(this).hide()
            })
        }
        $('.introAni div').eq(1).text(count+'%')
    }
/* 인트로 배경 애니메이션 jQeury */

    $('html').animate({
        scrollTop:0
    }, 100)

    let imgh = ($('.slide .img').height() / 2) - 35
    $('.article1 .slick-arrow').css({
        top:'0%',
        transform:`translateY(${imgh}px)`,
    })
//리로드시 상단 탑으로 자동 이동 기능(common)


//popup
let objString = localStorage.getItem('objkey') 
if ( objString ) {
    const obj = JSON.parse(objString)
    if ( Date.now()>obj.expire ) {
        $('.popup').removeClass('on')
        localStorage.removeItem('objkey')
    } else {
        $('.popup').addClass('on')
    }
} else {
    $('.popup').removeClass('on')
}

});

$('.close button').on('click', function(){
    if ( $(this).prev().prop('checked') ) {
        let tts = Date.now()+(10000)   // 하루는 (24*60*60*1000)ms
        const obj = {
            check : 'yes',
            expire : tts
        }
        localStorage.setItem('objkey', JSON.stringify(obj))
    } 
    $('.popup').addClass('on')
})






