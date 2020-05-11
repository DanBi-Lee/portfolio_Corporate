$(document).ready(function(){
    function CheckTerms(){
        $('#check-all').on('change', function(){
            var checked = $(this).is(':checked');
            if(checked){
                $('.terms_box input[id^="terms"]').prop('checked', true);
            }else{
                $('.terms_box input[id^="terms"]').prop('checked', false);
            }
        });
    
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

    CheckTerms();
});

/*

모두 동의함 누르면 모두 체크 되도록 확인

1. 이메일, 비밀번호, 비밀번호 확인 확인
2. 필수 동의함 체크 확인

*/