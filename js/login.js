$(document).ready(function(){

    var $formLogin = $('#formLogin')
    var $btn_login = $formLogin.find('.btn_login');
    var $inputs = $formLogin.find('input');
    var len_inputs = $inputs.length;
    var isRequired;

    $btn_login.on('click', function(e){
        isRequired = false;
        var userId = $('#userId').val();
        e.preventDefault();
        checkInput();
        if(isRequired){
            alert( userId + '님, 로그인 되었습니다.');
            location.href="./index.html";
        }
    });

    function checkInput(){
        var i = 0;
        $inputs.each(function(){
            var _this = $(this);
            if(_this.val()){
                i++;
                _this.parent('.item').removeClass('error');
            }else{
                _this.parent('.item').addClass('error');
            }
            if( i === len_inputs ){
                isRequired = true;
            }
        })
    }

});