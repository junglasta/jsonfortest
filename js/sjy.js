// 제이쿼리 GET방식으로 ajax 부르기 (자바스크립트는 넘 복잡)
$(function(){
    $.ajax({
        type : "GET",
        url : "/pwa/data/navi.json", // 서버 절대 경로!
        datatType : "json",
        success : function( naviData ){
            /////////비동기통신 데이터 역할은 여기까기  
            // ul naviData[0]
            var gnbli = '';
            $.each(naviData[0], (index, item)=>{
                if( item.isNav ){ // json에서 노출여부 설정
                    gnbli += `<li class="nav-item ${item.navClass}">
                                <a class="nav-link" href="${item.navLink}">${item.navTitle}
                                </a>
                            </li>`;
                }                
            })
            $('#gnb').html(gnbli)

            // 한국어-영어 // HTML select 안에 못 넣겠으면 걍 ul/li 해서 each문으로 DB 연동만 해라 naviData[1]
            var lanKE = '';
            $.each(naviData[1], (index, item)=>{
                if( item.isNav ){ // json에서 노출여부 설정
                    lanKE += `<li class="nav-item ${item.navClass}">
                                <a class="nav-link" href="${item.navLink}">${item.navTitle}
                                </a>
                            </li>`;
                }                
            })
            $('#utilmenu').html(lanKE)
            /////////비동기통신 데이터 역할은 여기까기 마침

            /////////여기서부터는 인터렉티브 작업이 시작됨
            $('#gnb').on('click', '.scrollPage a', function(e){
                e.preventDefault();
                var _this = $(this) // 클릭한 객체의 a를 저장 / $(this)가 어떤 이벤트에 쓰이느냐에 따라 다르니까, 변수 지정
                $('body, html').animate({
                    scrollTop: $($(this).attr('href')).offset().top
                                },400, function(){
                        // 애니메이션 끝나고 처리될 실행문
                        _this.parent().addClass('active').siblings().removeClass('active')
                });
            });
        },
        error: function (xhr, status, e) { // 여기는 그냥 복붙
            console.log("error", e); // 에러메세지가 세번째인자
            console.log("status", status); // 상태가 2번째인자
        }
    });
    // 비동기통신과 상관없는 작업은 여기에 해야 최적화를 고려한 작업이 됩니다
})