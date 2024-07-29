const myChecker = {
    strings: [],
    patterns: [],

    check: function (str) {
        this.strings.push(str)
        return this
    },
    match: function (pattern, description) {
        this.patterns.push({ pattern: new RegExp(pattern), description });
        return this;
    },
    phone: function (number) {
        this.strings.push(number)
        this.patterns.push({ pattern: new RegExp(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/), description: "this is a valid local phone number" })
        return this

    },
    email: function (email) {
        this.strings.push(email)
        this.patterns.push({ pattern: new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]{1,3}$/), description: "this is a valid email" })
        return this
    },
    url: function (url) {
        this.strings.push(url)
        this.patterns.push({ pattern: new RegExp(/^http:\/\/(www\.)?[a-zA-Z0-9]{1,30}\.(net|org|com)$/), description: "this is a valid url" })
        return this
    },
    run: function () {
        const result = {}
        this.strings.forEach(string => {
            let a = []
            for (let pat of this.patterns) {
                if (string.match(pat.pattern)) {
                    a.push(pat.description)
                }
            }
            result[string] = a

        });
        return result
    }
}


let result = myChecker.check("abcd")
    .check("Ab")
    .email("elico11249@gmail.com")
    .phone("718-644-6666")
    .url("http://www.elyaCo.com")
    .match(/^[\w]{1,2}$/i, " 2 letter word")
    .match(/[a-z0-9]{1,10}/, "include 1-10 char or numbers")
    .run()
console.log(result)
