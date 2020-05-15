$(document).ready(function(){

    var $form = $('#formJoin');
    var $btn_join = $form.find('.btn_join');

    var $terms = $('.terms_box').find('input[name="terms"][required]');
    var len_required_terms = $terms.length;

    var $inputs = $('.inputs').find('input[required]');
    var len_inputs = $inputs.length;

    var $input_pwd = $('input[type="password"]');

    var isTermsCheck, isRequired, isPwdCheck;

    $btn_join.on('click', function(e){
        e.preventDefault();
        isTermsCheck = false;
        isRequired = false;
        isPwdCheck = false;

        // 필수 약관 체크
        setTermsCheck();
        // 필수 입력 사항
        setRequired();
        // 비밀번호 확인
        setPwdCheck();

        console.log( '필수 체크 :' + isTermsCheck, '필수 항목: ' +  isRequired, '패스워드 동일 체크 : ' + isPwdCheck);

        if( isTermsCheck && isRequired && isPwdCheck ){
            alert('회원 가입이 완료되었습니다.');
            location.href="./login.html";
        }
    });

    // 모두 체크
    CheckingTerms();

    function CheckingTerms(){

        // 모두 동의 체크시, 자동 체크
        $('#check-all').on('change', function(){
            var checked = $(this).is(':checked');
            if(checked){
                $('.terms_box input[id^="terms"]').prop('checked', true);
            }else{
                $('.terms_box input[id^="terms"]').prop('checked', false);
            }
        });
    
        // 하나라도 체크 해지시, 모두 동의 해제 / 모두 체크되면 모두 동의 자동 체크
        $('.terms_box input[id^="terms"]').on('change', function(){
            var checked = $(this).is(':checked');
            var i = 0;
            if(!checked){
                $('#check-all').prop('checked', false);
            }else{
                $('.terms_box input[id^="terms"]').each(function(){
                    if($(this).prop('checked')){
                        i++;
                    }
                });
                if(i === $('.terms_box input[id^="terms"]').length ){
                    $('#check-all').prop('checked', true);
                }
            }
        });
    }

    function setTermsCheck(){
        var i = 0;
        $terms.each(function(){
            if($(this).prop('checked')){
                i++;
            }
        });
        if (i === len_required_terms ){
            isTermsCheck = true;
            console.log('필수체크 통과');
            $('.allcheck').removeClass('error');
        }else{
            $('.allcheck').addClass('error');
        }
    }

    function setRequired(){
        var i = 0;
        $inputs.each(function(){
            var _this = $(this);
            if(_this.val() !== ''){
                i++;
                _this.parent('.item').removeClass('error');
            }else{
                _this.parent('.item').addClass('error');
            }
        });
        if( i === len_inputs ){
            isRequired = true;
        }
    }

    function setPwdCheck(){
        var _password = $($input_pwd[0]).val();
        var _password_re = $($input_pwd[1]).val();
        console.log(_password, _password_re);
        if( _password === _password_re ){
            isPwdCheck = true;
            $($input_pwd[1]).parent('.item').removeClass('error');
        }else{
            $($input_pwd[1]).parent('.item').addClass('error');
        }
        console.log(isPwdCheck);
    }
    
});
