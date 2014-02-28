(function() {
    "use strict";

    var mode = document.getElementById("mode");
    var things = document.getElementById("things");
    var result = document.getElementById("result");

    addListener(mode, "change", symbolize);
    addListener(things, "change", symbolize);
    addListener(things, "keyup", symbolize);

    function symbolize () {
        function makeVariable(n) {
            // this might be marginally faster than .split("")?
            // from http://www.codingforums.com/javascript-programming/172746-iterate-through-alphabet-javascript.html#post843843
            var vars = "abcdefghijklmnopqrstuvwxyz";
            return n < 26 ? vars.charAt(n) : vars.charAt(n % 26) + "<sub>" + Math.floor(n / 26) + "</sub>";
        }

        // build the string in a variable so we don't have to keep
        // messing around in the DOM
        var symbolization = "";

        var number = parseInt(things.value);

        // message if a non-number is entered
        if ( !number ) {
            symbolization += "CHOOSE AN INTEGER, FUCKER";
        }
        else if ( mode.value !== "" && number !== "" ) {
            // as long as there's a number, then go ahead and generate existential quantifiers binding that many variables
            for ( var i = 0; i < number; i++ ) {
                symbolization += "<span class=\"logic exists\">∃</span>" + makeVariable(i) + " ";
            }
            // now if there's a minimum number of things...
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
            // if there's a maximum number of things...
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
