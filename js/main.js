// <오른쪽 상단 배지 부분 js> & <to-top 기능>
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');
// _.throttle(함수, 시간(밀리세컨)) --> 함수 실행이 너무 많이 되는 것을 방지하여, 사용자가 정한 시간에 한 번씩 실행되도록 함.
window.addEventListener('scroll', _.throttle(function () {
    if (window.scrollY > 500) {
        // 배지 숨기기
        // gsap.to((애니메이션을 처리 할)요소, 지속시간(초), (어떻게 처리할 건지)옵션)
        gsap.to(badgeEl, .6, {
            opacity: 0,
            display: 'none',
        });
        //top 버튼 보이기
        gsap.to(toTopEl, .2, {
            x: 0
        })
    } else {
        // 배지 보이기
        gsap.to(badgeEl, .6, {
            opacity: 1,
            display: 'block',
        });
        //top 버튼 숨기기
        gsap.to(toTopEl, .2, {
            x: 100
        })
    }
}, 300));

// #to-top 기능
toTopEl.addEventListener('click', function () {
    gsap.to(window, .7, {
        scrollTo: 0, //gsap 스크롤 플러그인
    });
})

// <섹션 이미지 나타나는 애니메이션 js>
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
    gsap.to(fadeEl, 1, {
        delay: (index + 1) * .7,
        opacity: 1,

    })
});

// <swiper 라이브러리 사용 --> 슬라이드 적용>   & // (awards 스와이프 부분)
// new Swiper(선택자 , 옵션)
new Swiper('.notice-line .swiper', {
    direction: 'vertical',
    autoplay: true,
    loop: true,
});

new Swiper('.promotion .swiper', {
    slidesPerView: 3, //한번에 보여줄 슬라이드 개수
    spaceBetween: 10, //슬라이드 사이 여백
    centeredSlides: true, //첫번째 슬라이드가 가운데 보이기
    loop: true,
    autoplay: {
        delay: 5000 // .5초당안 딜레이 (기본값은 3000 -> 3초)
    },
    pagination: { // 페이지 번호 사용 여부
        el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
        clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
    },
    navigation: {
        prevEl: '.promotion .swiper-prev',
        nextEl: '.promotion .swiper-next',
    }
})

new Swiper('.awards .swiper', {
    autoplay: true,
    loop: true,
    spaceBetween: 30,
    slidesPerView: 5,
    navigation: {
        prevEl: '.awards .swiper-prev',
        nextEl: '.awards .swiper-next',
    }
});



// 프로모션 토글 --> 프로모션 부분 여닫기
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHiePromotion = false;
promotionToggleBtn.addEventListener('click', function () {
    isHiePromotion = !isHiePromotion //true -> false , false -> true 로 지속적으로 변경함
    if (isHiePromotion) {
        //숨김처리!
        promotionEl.classList.add('hide');

    } else {
        //보임처리!
        promotionEl.classList.remove('hide');
    }
})

// youtube - floating (둥둥 떠있는 애니메이션)
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
    gsap.to(selector, // 선택자
        random(1.5, 2.5), //지속시간
        { //옵션
            ease: "power1.inOut", //gsap easing 기능
            y: size,
            repeat: -1, //무한반복
            yoyo: true, //한번 재생된 애니메이션을 다시 뒤로 재생을 해서 반복하게 함.
            delay: random(0, delay),
        })
};

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


// scrollmagic
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
    //우리가 제어하려는 섹션이 보이는지 안보이는지 감시하는 메소드 -> .Scene()
    //어떤 클래스를 넣었다 뺐다하며 제어해주는 역할 -> .setClassToggle()
    //컨트롤러라는 개념을 추가 (스크롤매직 라이브러리에서 필요로함) -> .addTo()
    new ScrollMagic
        .Scene({
            triggerElement: spyEl, //보여짐 여부를 감시할 요소를 할당
            triggerHook: .8, //viewport에서 윗부분을 0, 아랫부분을 1이어서 감시하려는 요소가 뷰포트의 어느 지점에서 감시되었는지 판단.
        })
        .setClassToggle(spyEl, 'show') // (토글할 인수 , 토글할 클래스의 이름)
        .addTo(new ScrollMagic.Controller()); //실제로 동작하도록 함. 
});