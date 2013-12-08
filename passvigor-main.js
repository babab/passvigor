$(document).ready(function() {
    function passvigor(password)
    {
        var passlenreq = 9;

        function relscore(password)
        {
            var lowercase = /[a-z]/
            var uppercase = /[A-Z]/
            var digits = /[0-9]/
            var special = /[!@#$%^&*()_\-<>?/\\\[\]]/
            var factor = 0;

            if (lowercase.test(password))
                factor += 26 / (26 + 26 + 10);
            if (uppercase.test(password))
                factor += 26 / (26 + 26 + 10);
            if (digits.test(password))
                factor += 10 / (26 + 26 + 10);
            if (special.test(password))
                factor += 9 / (26 + 26 + 10);
            return factor;

        }

        if ($.inArray(password, passvigor_wordlist) != -1)
            return {
                'valid': false,
                'points': 0,
                'message': 'Unsecure password: very commonly used.'
            };
        else {
            if (password.length == 0)
                return {
                    'valid': false,
                    'points': 0,
                    'message': 'Enter a password.'
                };

            var relp = relscore(password);
            var currp = Math.round((password.length / passlenreq) * 100);
            var points = 0;
            if (currp > (relp * 100))
                points = Math.round(relp * 100);
            else
                points = Math.ceil(currp * relp);

            if (points < 100) {
                if (relp >= 1)
                    return {
                        'valid': false,
                        'points': points,
                        'message': 'Still need '
                            + (passlenreq - password.length) + ' chars.'
                    };
                else if (passlenreq <= password.length) {
                    return {
                        'valid': false,
                        'points': points,
                        'message': 'Make sure to use digits and lower- &amp; '
                            + 'uppercase characters.'
                    };
                }
                else {
                    return {
                        'valid': false,
                        'points': points,
                        'message': 'Make sure to use digits and lower- &amp; '
                            + 'uppercase characters. Still need '
                            + (passlenreq - password.length) + ' chars.'
                    };
                }
            }
            else
                return {
                    'valid': true,
                    'points': points,
                    'message': 'Password is secure.'
                };
        }
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
