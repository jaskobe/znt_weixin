/**
 * Created by Jasko on 1/15/16.
 */
$(function(){
    var userName = $("#username"),
        password = $("#password"),
        verifyCode = $("#verifycode"),
        tip = $(".reg-tip"),
        refCode = $(".verify-code"),
        loginBtn = $("#loginbtn"),
        refreshCodeUrl = "/codeCenter/loginCode",
        url = "/login/dologin";
    //event define
    userName.on("blur",checkUserName);
    password.on("blur",checkPassword);
    verifyCode.on("blur",checkVerifyCode);
    loginBtn.on("click",loginSubmit);
    refCode.on("click",refreshCode);

    function checkUserName() {
        if (!userName || userName.val().length == 0) {
            tip.html("*请输入手机号").show();
            return false;
        }
        tip.hide();
        return true;
    }

    function checkPassword() {
        if ( !password || password.val().length == 0) {
            tip.html("*请输入密码").show();
            return false;
        } else if ( password.val().length < 6) {
            tip.html("*密码过短").show();
            return false;
        }
        tip.hide();
        return true;
    }

    function checkVerifyCode(e) {
        if(e && e.keyCode!=13){
            return;
        }
        if (!verifyCode || verifyCode.val().length ==0) {
            tip.html("*请输入验证码").show();
            return false;
        }
        tip.hide();
        if(e && e.keyCode == 13){//回车后登陆
            loginSubmit();
        }
        return true;
    }

    function refreshCode(){
        $('.authcode').attr('src',refreshCodeUrl);
        return false;
    }

    function loginSubmit(){
        if(!checkUserName() || !checkPassword() || !checkVerifyCode()){
            refreshCode();
            return false;
        }
    }
});