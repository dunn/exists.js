(function(){function g(){var a="",b=h.value;if(!parseInt(b))a+="CHOOSE A REAL NUMBER, FUCKER";else if(""!==e.value&&""!==b){for(var b=parseInt(b),c=0;c<b;c++)a+='<span class="logic exists">∃</span>'+f(c)+" ";if("at-least"===e.value||"exactly"===e.value){for(var a=a+'<span class="parens">(</span> ',d=c=0;c<b&&d<b;d++,c=d==b?c+1:c,d=d==b?d=0:d)c<d&&(a+=f(c)+"≠"+f(d)+" ∧ ");a=1<b?a.slice(0,a.length-2):a}if("exactly"===e.value||"at-most"===e.value){c=f(b);a+=("exactly"===e.value&&1<b?" ∧":"")+' <span class="logic forall">∀</span>'+
c+' <span class="parens">(</span> ';for(d=0;d<b;d++)a+=c+"="+f(d)+" ∨ ";a=a.slice(0,a.length-2);a+="exactly"===e.value?'<span class="parens">)</span>':""}a+="at-least"===e.value&&2>b?"":'<span class="parens">)</span>'}m.innerHTML=a}function f(a){return 26>a?l[a]:l[a%26]+"<sub>"+Math.floor(a/26)+"</sub>"}function k(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,c)}var e=document.getElementById("mode"),h=document.getElementById("things"),m=document.getElementById("result"),
l="abcdefghijklmnopqrstuvwxyz".split("");k(e,"change",g);k(h,"change",g);k(h,"keyup",g)})();
