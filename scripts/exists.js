(function() {
"use strict";
    var mode = document.getElementById("mode");
    var things = document.getElementById("things");
    var result = document.getElementById("result");

    addListener(mode, "change", symbolize);
    addListener(things, "change", symbolize);
    addListener(things, "keyup", symbolize);

    function symbolize () {
        var number = things.value;

        if ( !parseInt(number) ) {
            result.textContent = "CHOOSE A REAL NUMBER FUCKER";
        }

        else if ( mode.value !== "" && number !== "" ) {
            // http://www.codingforums.com/javascript-programming/172746-iterate-through-alphabet-javascript.html#post843843
            var vars = "abcdefghijklmnopqrstuvwxyz".split("");
//            number -= 1;
            result.innerHTML = "";
            for ( var i = 0; i < number; i++ ) {
                result.innerHTML += "∃" + ( i < 26 ? vars[i] : vars[i % 26] + "<sub>" + Math.floor(i / 26) + "</sub>") + " ";
            }
            result.innerHTML += "( ";
            // https://medium.com/html5-css3/7c80a4b731f8
            // it's actually essential that you do `k==number` NOT `k===number`!
            for ( var j=0,k=0; j < number && k < number; k++,j=(k==number)?j+1:j,k=(k==number)?k=0:k ) {
                // prevents a≠a and prevents b≠a after a≠b
                if ( j < k ) {
                    result.innerHTML += ( j < 26 ? vars[j] : vars[j % 26] + "<sub>" + Math.floor(j / 26) + "</sub>") + "≠" + ( k < 26 ? vars[k] : vars[k % 26] + "<sub>" + Math.floor(k / 26) + "</sub>");
                    result.innerHTML += " ";
                    console.log(j + "," + k);
               }
            }
            result.innerHTML += " )";
        }
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
