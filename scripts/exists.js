(function() {
    "use strict";

    var mode = document.getElementById("mode");
    var things = document.getElementById("things");
    var result = document.getElementById("result");

    var vars = "abcdefghijklmnopqrstuvwxyz".split("");

    addListener(mode, "change", symbolize);
    addListener(things, "change", symbolize);
    addListener(things, "keyup", symbolize);

    function symbolize () {
        var symbolization = "";
        var number = things.value;

        if ( !parseInt(number) ) {
            symbolization += "CHOOSE A REAL NUMBER, FUCKER";
        }

        else if ( mode.value !== "" && number !== "" ) {
            number = parseInt(number);
            // http://www.codingforums.com/javascript-programming/172746-iterate-through-alphabet-javascript.html#post843843

            for ( var i = 0; i < number; i++ ) {
                symbolization += "<span class=\"logic exists\">∃</span>" + makeVariable(i) + " ";
            }
            if ( mode.value === "at-least" || mode.value === "exactly" ) {
                symbolization += "<span class=\"parens\">(</span> ";
                // https://medium.com/html5-css3/7c80a4b731f8
                // it's actually essential that you do `k==number` NOT `k===number`!
                for ( var j=0,k=0; j < number && k < number; k++,j=(k==number)?j+1:j,k=(k==number)?k=0:k ) {
                    // prevents a≠a and prevents b≠a after a≠b
                    if ( j < k ) {
                        symbolization += makeVariable(j) + "≠" + makeVariable(k) + " ∧ ";
                    }
                }
                // remove the trailing "∧ "
                symbolization = (number > 1 ? symbolization.slice(0,symbolization.length - 2) : symbolization);
            }

            if ( mode.value === "exactly" || mode.value === "at-most" ) {
                var forAllVar = makeVariable(number);
                symbolization += (mode.value === "exactly" && number > 1 ? " ∧" : "") + " <span class=\"logic forall\">∀</span>" + forAllVar + " <span class=\"parens\">(</span> ";
                for ( var l = 0; l < number; l++ ) {
                    symbolization += forAllVar + "=" + makeVariable(l) + " ∨ ";
                }
                symbolization = symbolization.slice(0,symbolization.length - 2);
                symbolization += (mode.value === "exactly" ? "<span class=\"parens\">)</span>" : "");
            }
            symbolization += ( !(mode.value === "at-least" && number < 2) ? "<span class=\"parens\">)</span>" : "");
        }
        // only mess with the DOM like this once or else it's slow as hell
        result.innerHTML = symbolization;
    }

    /// generate variables
    function makeVariable(n) {
        return n < 26 ? vars[n] : vars[n % 26] + "<sub>" + Math.floor(n / 26) + "</sub>";
    }

    /// add event listener:
    // https://developer.mozilla.org/en-US/docs/DOM/element.addEventListener
    // http://stackoverflow.com/a/1841941/1431858
    /// only `type` argument is quoted (i.e.: window, "load", function())
    function addListener(element, type, response) {
        if (element.addEventListener) {
            element.addEventListener(type, response, false);
        }
        else if (element.attachEvent) {
            element.attachEvent("on" + type, response);
        }
    }


})();
