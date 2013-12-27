/*
 * Copyright (c) 2013  Benjamin Althues <benjamin@babab.nl>
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

function passvigor(password)
{
    var passlenreq = 9;
    var maxstrength = 299;
    var ret = {
        'valid': false,
        'points': 0,
        'score': {},
        'message': null
    };

    function score(password)
    {
        /*
         * score calculates a relative score for the strength of the
         * password. It returns a factor somewhere between 0 - 1.
         *
         * Special chars (including space):  !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
         */

        var validsum = 26 + 26 + 10;
        var factor = 0;
        var lowercase = false;
        var numerals = false;
        var specialchars = false;
        var uppercase = false;

        if (/[a-z]/.test(password)) {
            lowercase = true;
            factor += 26 / validsum;
        }
        if (/[A-Z]/.test(password)) {
            uppercase = true;
            factor += 26 / validsum;
        }
        if (/[0-9]/.test(password)) {
            numerals = true;
            factor += 10 / validsum;
        }
        if (/[ !"#$%&'()*+,-./:;<=>?@\[\\\]^_`{|}~]/.test(password)) {
            specialchars = true;
            factor +=  10 / validsum;
        }
        return {
            'factor': factor,
            'lowercase': lowercase,
            'uppercase': uppercase,
            'numerals': numerals,
            'specialchars': specialchars
        };
    }

    if ($.inArray(password, passvigor_wordlist) != -1) {
        ret['message'] = 'Unsecure password: very commonly used.';
        return ret;
    }

    if (password.length == 0) {
        ret['message'] = 'Enter a password.';
        return ret;
    }

    var score = score(password);
    ret['score'] = score;
    var relp = score['factor'];
    var currp = Math.round((password.length / passlenreq) * 100);
    var points = 0;
    if (relp < 1 && currp > (relp * 100))
        points = Math.round(relp * 100);
    else
        points = Math.ceil(currp * relp);

    if (points >= (maxstrength + 1))
        points = maxstrength;

    ret['points'] = points;

    if (points < 100) {
        if (relp >= 1) {
            ret['message'] = 'Still need '
                    + (passlenreq - password.length) + ' chars.';
            return ret;
        }
        else if (passlenreq <= password.length) {
            ret['message'] = 'Make sure to use digits and lower- '
                +'&amp; uppercase characters.';
            return ret;
        }
        else {
            ret['message'] = 'Make sure to use digits and lower- '
                + '&amp; uppercase characters. Still need '
                + (passlenreq - password.length) + ' chars.';
            return ret;
        }
    }
    else
        return {
            'valid': true,
            'points': points,
            'score': score,
            'message': 'Password is secure.'
        };
}
