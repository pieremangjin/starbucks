 //유튜브 ifram api를 통해서 영상의 소리, 반복재생 등을 컨트롤 할 수 있음
 // 2. This code loads the IFrame Player API code asynchronously.
 const tag = document.createElement('script');

 tag.src = "https://www.youtube.com/iframe_api";
 const firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 function onYouTubeIframeAPIReady() { //******절대 바꾸면 안되는 함수 이름***********
     // <div id="player"></div> --> #player라고 하면 안됨 알아서 아이디값을 찾음
     new YT.Player('player', {
         videoId: 'An6LvWQuj_8',
         playerVars: { //영상을 재생하기 위한 변수들
             autoplay: true, //자동 재생 유무
             loop: true, //반복 재생 유무
             playlist: 'An6LvWQuj_8' //반복 재생할 유튜브 영상 ID 목록
         },
         events: {
             onReady: function (event) {
                 event.target.mute() //음소거
             }
         }

     });
 }