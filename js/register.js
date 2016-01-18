/**
 * Created by Jasko on 1/15/16.
 */
$(function(){
    var mobileEle = $('#mobile'),
        pwdEle = $('#signPwd'),
        repwdEle = $('#signPwdRepeat'),
        codeInput = $("#mobileValidateCode"),
        registerBtn = $('#registerBtn'),
        isAgree = $('#isagreeReg'),
        isAgreelable = $('#isagreeLable'),
        sendMsgBtn = $("#msgCode"),
        tip = $(".reg-tip");

    var isMobileRight,
        isPwdRight,
        isRePwdRight,
        isVeriCodeRight;


    //正则表达式
    var MOBILE_RULE = new RegExp("^((13[0-9])|(15[^4,\\D])|(17[0-9])|(18[0-9]))\\d{8}$"),
        PWD_RULE = new RegExp("^.*[A-Za-z0-9\\w_-]+.*$");//密码正则表达式

    //bind event
    pwdEle.on('blur', checkPwd);
    mobileEle.on('blur', checkMobile);
    repwdEle.on('blur', checkReinputPwd);
    codeInput.on('blur', checkVerifyCode);

    //verify page
    sendMsgBtn.on('click', sendVerifycode);
    registerBtn.on('click',register);

    /** check mobile 这里是否需要验证同一个手机是否已注册？**/
    function checkMobile() {
         isMobileRight = false;
        var mobile = mobileEle.val();
        if (!mobile) {
            tip.html("*手机号不能为空").show();
            return false;
        } else if (!MOBILE_RULE.test(mobile)) {
            tip.html("*手机号格式不正确").show();
            return false;
        }
        else{
           tip.hide();
            countDown(sendMsgBtn)
        }
        //$.post(USER_VERYFY_MOBILE, { phone: mobile }, function(result){
        //    //alert(result.code);return;
        //    if (result.code != 200) {
        //        //alert(result.errMsg);
        //        tip.html('*'+result.errMsg).show();
        //        return;
        //    }
        //
        //    isMobileRight = true;
        //    tip.html('*手机号可用');
        //}, "json");//async ajax
        //tip.hide();
        //return true;
    }

    /** check password **/
    function checkPwd() {
        isPwdRight = false;
        var pwd = pwdEle.val();
        if (!pwd) {
            tip.html("*密码不能为空").show();
            return false;
        } else if (pwd.length < 6 || pwd.length > 16) {
            tip.html("*密码长度为6~16位").show();
            return false;
        } else if (!PWD_RULE.test(pwd)) {
            tip.html("*密码由字母数字下划线组成").show();
            return false;
        } else {
            isPwdRight = true;
            tip.hide();
            return true;
        }
    }

    /** check re input password**/
    function checkReinputPwd() {
        isRePwdRight = false;
        var repwd = repwdEle.val();
        if (!pwdEle.val()) {
            tip.html("*请先输入密码").show();
            return false;
        } else if (!repwd) {
            tip.html("*请再输入一次密码").show();
            return false;
        } else if (repwd !== pwdEle.val()) {
            tip.html("*两次密码不一致").show();
            return false;
        } else if(repwd.length < 6 || repwd.length > 16){
            tip.html("*密码长度为6~16位").show();
            return false;
        }
        else {
            isRePwdRight = true;
            tip.hide();
            return true;
        }
    }

    /**获取验证短信**/
    function sendVerifycode(){
        if (!isMobileRight) {
            checkMobile();
            return false;
        }
    }

    /** check verify code **/
    function checkVerifyCode() {

        isVeriCodeRight = false;
        var code = codeInput.val();
        if (!code) {
            tip.html("*请输入验证码").show();
            return false;
        } else {
            isVeriCodeRight = true;
            tip.hide();
            return true;
        }

    }

    //验证码倒计时
    /** 倒计时**/
    function countDown(o) {
        var count = 5, clear;
        var time = function() {
            if (count == 0) {
                o.html("获取验证码");
                o.removeClass("verify-btn-count");
                o.addClass("verify-btn-get");
                o.removeClass('codeDisabled');
                o.on('click',sendVerifycode);
                count = 60;
                clearInterval(clear)
            } else {
                o.addClass("verify-btn-count");
                o.addClass('codeDisabled');
                o.removeClass("verify-btn-get");
                o.html(count + '秒重新获取');
                count--;
                clear = setTimeout(function() {
                    time()
                }, 1000)
            }
        };
        if (!o.hasClass('codeDisabled')) {
            sendMsgBtn.off();
            time()
        }
    }

    function register(){

        if (!isMobileRight) {
            checkMobile();
            return false;
        }
        if (!isPwdRight) {
            checkPwd();
            return false;
        }

        if (!isRePwdRight) {
            checkReinputPwd();
            return false;
        }

        if (!isVeriCodeRight) {
            checkVerifyCode();
            return false;
        }
        if (!isAgree.is(":checked")) {
            tip.html("*请先同意《智能投注册协议》").show();
            return false;
        }
    }
});
