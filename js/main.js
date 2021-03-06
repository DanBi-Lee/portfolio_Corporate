$(document).ready(function(){
    
    /* tabMenuBox  */
    (function(){
        var $tabMenuBox = $('#tabMenuBox')
        var $btn_tab = $tabMenuBox.find('.box_btns').find('button');
        var $planet_wrap = $tabMenuBox.find('.wrap_pic');
        var $planet_pic = $planet_wrap.find('.pic_planet');
        var $article = $tabMenuBox.find('.box_contents').find('article');

        $btn_tab.on('click', function(e){
            e.preventDefault();

            var _this = $(this);
            var index = _this.parent().index();
            var deg = 135 - (90*index);

            // 1. 행성이 돌아감
            $planet_wrap.css({transform : 'translate(-94%, -50%) rotate(' + deg + 'deg)'});
            $planet_pic.removeClass('on').css({transform : 'rotate(0deg) scale(0.8)'});
            $planet_pic.eq(index).addClass('on').css({transform : 'rotate(' + -deg + 'deg) scale(1)'});

            // 2. 아티클이 바뀜
            $article.removeClass('on');
            $article.eq(index).addClass('on');

            // 3. 버튼 활성화
            _this.parent('li').siblings().removeClass('on');
            _this.parent('li').addClass('on');
        });
    
    })();
});