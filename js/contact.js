var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.5817298,127.3192562), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴


/* 마커 옵션 */
var markerOptions = [
    {
        title : '중미산 천문대',
        map : [37.5817298,127.3192562],
        get link(){
            return 'https://map.kakao.com/link/to/'+this.title+','+this.map
        },
        get latlng(){
            return new kakao.maps.LatLng(this.map[0],this.map[1]);
        },
        button : document.getElementById('branch1')
    },
    {
        title : '서서울어린이천문대',
        map : [37.6290901,126.8885293],
        get link(){
            return 'https://map.kakao.com/link/to/'+this.title+','+this.map
        },
        get latlng(){
            return new kakao.maps.LatLng(this.map[0],this.map[1]);
        },
        button : document.getElementById('branch2')
    },
    {
        title : '연세대학교 천문대',
        map : [37.629342,126.7834657],
        get link(){
            return 'https://map.kakao.com/link/to/'+this.title+','+this.map
        },
        get latlng(){
            return new kakao.maps.LatLng(this.map[0],this.map[1]);
        },
        button : document.getElementById('branch3')
    },
]; 

for(var i=0; i < markerOptions.length; i++){

    //마커 만들기
    var marker = new kakao.maps.Marker({
        map: map,
        position : markerOptions[i].latlng,
        title : markerOptions[i].title
    });

    //인포 윈도우
    var infowindow = new kakao.maps.InfoWindow({
        map: map,
        position : markerOptions[0].latlng,
        content : '<button class="open_modal">' + markerOptions[i].title + '</button>'
    });
    infowindow.open(map, marker);

    // 중심점 이동
    markerOptions[i].button.onclick = (function(i){
        map.panTo(markerOptions[i].latlng);
        var button = markerOptions[i].button;
        Array.prototype.forEach.call(button.parentElement.getElementsByTagName('button'), function(item){
            item.classList.remove('on');
        });
        button.classList.add('on');
    }).bind(this,i);
}



// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

/* 길찾기 모달창 */
var modalBox = document.getElementsByClassName('embed_box')[0];
var btn_close = modalBox.getElementsByClassName('close')[0];
modalBox.onclick = function(){
    modalBox.style.display='none';
};
btn_close.onclick = function(){
    modalBox.style.display='none';
}

var btn_open = document.getElementsByClassName('open_modal');
var embed_box  = modalBox.getElementsByClassName('embed')[0];

// 길찾기 embed src속성 바꾸면서 열기
for(var i=0; i < btn_open.length; i++){
    btn_open[i].onclick = (function(i){
        embed_box.src = markerOptions[i].link;
        modalBox.style.display='block';
    }).bind(this,i);

    // 스타일
    btn_open[i].parentElement.style.width = '100%';
    btn_open[i].parentElement.style.height = '100%';
}