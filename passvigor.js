$(document).ready(function() {
    function passvigor(password, setting='paranoid')
    {
        knownpws = [ //++ 10k most used passwords
            '1',
            '12',
            '123',
            '1234',
            '12345',
            '123456',
            '1234567',
            '12345678',
            '123456789',
        ]; //+-

        switch (setting) {
        case 'paranoid':
            var passlenreq = 15;
            break;
        default:
            var passlenreq = 9;
        };

        if ($.inArray(password, knownpws) != -1)
            return {
                'valid': false,
                'points': 0,
                'message': 'Is a commonly used password'
            };
        else
            var pwlen = password.length;
            if (password.length == 0)
                return {
                    'valid': false,
                    'points': 0,
                    'message': 'Enter a password'
                };
            else if (password.length < passlenreq)
                return {
                    'valid': false,
                    'points': Math.round((password.length / passlenreq) * 100),
                    'message': 'Still need ' + (passlenreq - password.length)
                               + ' chars'
                };
            return {
                'valid': true,
                'points': 100,
                'message': 'Password looks good'
            };

    }
    function passvigorReport()
    {
        var check = passvigor($('#password').val());
        $('#passvigor-msg').html(check["message"]);
        $('#passvigor-points').html(check["points"] + '%');
    }

    $('#password').on('input', passvigorReport);
});

// vim: set fdm=marker fmr=//++,//+-:
