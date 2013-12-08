# passvigor

passvigor is a password strength validator for web applications.
Rating of passwords is done according to length and variation of
characters. It detects the 10k most commonly used passwords and doesn't
allow their usage.

## usage

passvigor is in very early development, but can already be used for
front-end validating of passwords. To see an example, look at the
source-code of ``example.html``.

## license

All code and files of passvigor (except for the passwordlist) is
licensed as follows:

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

The passwordlist of 10k most used passes is licensed under an
"Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)" license and is
created by Mark Burnett (xato.net).
