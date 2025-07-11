//전체 수직 스크롤
const wrap = new Swiper('#wrap',{
    direction:'vertical',
    mousewheel:true,
})

//프로젝트 슬라이드
const project1 = new Swiper('#project_swiper',{
    scrollbar:{el:'#project_swiper ~ .swiper-scrollbar'}, //형제나 부모를 같이 적어주자. 지금은 형제 쓴 것이다. 인접한 형제면 +, 멀리있는 형제면 ~
    navigation:{
        nextEl:'#project_swiper ~ .swiper-button-next',
        prevEl:'#project_swiper ~ .swiper-button-prev',
    }
})

//SNS 프로젝트
const sns = new Swiper('#sns_swiper',{ //css에서 wrapper에 linear줘서 일정하게 흘러가게 할 수 있다.
    slidesPerView:3,
    spaceBetween:10,
    autoplay:{delay:0,},
    speed:4000,
    loop:true,
})

//SNS 프로젝트 클릭 시 팝업 실행(클릭한 이미지가 팝업 이미지로 교체)
const snsProject = document.querySelectorAll('#sns_swiper .swiper-slide');
const popup = document.querySelector('.popup_bg');
console.log(snsProject,popup); //4개뜨는지확인

//팝업 열 때
for(let sns of snsProject){ //만든 변수4개를 sns에 반복으로 담겠다.
    sns.addEventListener('click',()=>{
        popup.style.display = 'block'; //none->block
        //클릭한 이미지 경로 - 스와이프슬라이드 안에 있는 img의 src를 나오게 하고싶음
        popup.children[0].children[0].src = sns.children[0].src; //.popup_bg의 변수 popup, for문으로 했으니 몇개를 추가하든 다 이걸로 동작함.
        //팝업 실행 시 전체 수직 Swiper 스크롤 기능 막기
        wrap.mousewheel.disable(); //비활성화=disable //스크롤 풀기 enable() //wrap은 맨 위에서 만든 것
    })
}

//이제 popup_bg 닫히는 거 할 차례
popup.addEventListener('click',()=>{
    popup.style.display='none'
    wrap.mousewheel.enable();
})

//내비게이션 클릭 시 해당 위치 수직 스와이프(wrap변수)로 이동
const nav = document.querySelectorAll('nav a');
//수직 스와이프 이동 함수
//수직스와이프변수명.slideTop(이동인덱스값, 지속시간) ->인덱스0부터 시작
//요소는 다른데, 인덱스 일치할때 for문 어떻게 쓸까? forEach
nav.forEach((obj, idx)=>{
    console.log(obj,idx); //a,인덱스
    obj.addEventListener('click',(e)=>{ //e는 왜 썻을까? a링크 눌렀을때 위로 올라가지말라고 써둔거
        e.preventDefault();//a의 href기본기능막기
        wrap.slideTo(idx, 1000);
    })
})