function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires +"; path=/";
}

$("#summit-login").click(function () {
    var data = {};
    data.username = $('#username').val().trim();
    data.password = $('#password').val().trim();
    $.ajax({
        type: 'POST',
        data: data,
        dataType: 'json',
        url: '/login-post',
        success: function (data) {
            $('#email-errors').text(data.message)
            if (data.role == 'admin') {
                setCookie('token', data.token, 30);
                setCookie('username', data.username, 30);
                window.location.href = '/admin'
            } else if (data.role == 'customer') {
                setCookie('token', data.token, 30);
                setCookie('username', data.username, 30);
                window.location.href = '/'
            }
        },
        error: function (error) {
            $('#email-errors').text('Something is wrong')
        }
    })
    return false;
});

$("#summit-register").click(function () {
    var data = {};
    data.fullName = $('#fullName').val().trim();
    data.username = $('#username-register').val().trim();
    data.password = $('#password-register').val().trim();
    data.email = $('#email').val().trim();
    $.ajax({
        type: 'POST',
        data: data,
        dataType: 'json',
        url: '/register-post',
        success: function (data) {
            console.log(data);
        }
    })
    return false;
});