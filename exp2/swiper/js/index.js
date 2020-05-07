let mainSwiper = document.getElementsByClassName("main-img")[0];
let countItem = document.getElementsByClassName("count-item")
//轮播图片个数
let totalImg = document.getElementsByTagName("img");
let imgCount = totalImg.length/2;
let swiperStyle = mainSwiper.style;
let swiperWidth = mainSwiper.clientWidth;
let swiperTransDistance = 0;
let currentIndex = 0

let upBtn = document.getElementsByClassName("up")[0];
let nextBtn = document.getElementsByClassName("next")[0];

console.log(imgCount);

//设置定时器
let timer = setInterval(() => {
  imgTranslate();
  countTrans();
}, 3000);

//开启定时器
function startTimer(){
  timer = setInterval(()=>{
    imgTranslate();
    countTrans();
  }, 3000);
}
//关闭定时器
function stopTimer(){
  clearInterval(timer);
}

//图片轮播动画
function imgTranslate(){
  if(currentIndex == imgCount-1){
    swiperStyle.transform = `translateX(0px)`;
    swiperTransDistance = 0;
  }else{
    swiperTransDistance = swiperWidth * (currentIndex+1);
    swiperStyle.transform = `translateX(-${swiperTransDistance}px)`
  }
}

//图片向前滚动
function imgReTrans(){
  if(currentIndex!=0){
    swiperStyle.transform = `translateX(-${swiperWidth * (currentIndex-1)}px)`;
  }else{
    swiperStyle.transform = `translateX(-${swiperWidth * (imgCount-1)}px)`;
  }
}

//底部指示器的滚动
function countTrans(){
  console.log(currentIndex);
  if(currentIndex == imgCount-1){
    currentIndex = 0;
    countItem[currentIndex].classList.add("count-active");
    countItem[imgCount-1].classList.remove("count-active")
  }else{
    countItem[currentIndex].classList.remove("count-active");
    countItem[currentIndex+1].classList.add("count-active");
    currentIndex++; 
  }
}

//底部指示器向前滚动
function countReTrans(){
  if(currentIndex == 0){
    countItem[imgCount-1].classList.add("count-active");
    countItem[currentIndex].classList.remove("count-active");
    currentIndex = imgCount-1;
  }else{
    countItem[currentIndex].classList.remove("count-active");
    countItem[currentIndex-1].classList.add("count-active");
    currentIndex--; 
  }
}

//上一张图片
upBtn.addEventListener("click", () => {
  stopTimer();
  imgReTrans();
  countReTrans();
  startTimer();
})
//下一张图片
nextBtn.addEventListener("click", () => {
  stopTimer();
  imgTranslate();
  countTrans();
  startTimer();
})

//触摸小图切换图片
for(let i = imgCount;i<totalImg.length;i++){
  totalImg[i].addEventListener("click", () => {
    stopTimer();
    console.log(Math.abs(currentIndex-(i-imgCount)));
    let picInterval = currentIndex-(i-imgCount);
    let picIntervalAbs = Math.abs(picInterval);
    if(picInterval<0){
      for(let a = 0;a<picIntervalAbs;a++){
        console.log(a);
        imgTranslate();
        countTrans();
      }
    }else{
      for(let a = 0;a<picIntervalAbs;a++){
        console.log(a);
        imgReTrans();
        countReTrans();
      }
    }
    startTimer();
  })
}