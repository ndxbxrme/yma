!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.acorn={})}(this,function(t){"use strict";var e={3:"abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",5:"class enum extends super const export import",6:"enum",strict:"implements interface let package private protected public static yield",strictBind:"eval arguments"},i="break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",s={5:i,6:i+" const class extends export import super"},r=/^in(stanceof)?$/,a="ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄮㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿪ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",n="‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࣔ-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఃా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ංඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ູົຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭ᳲ-᳴᳷-᳹᷀-᷹᷻-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱꤀-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿",o=new RegExp("["+a+"]"),h=new RegExp("["+a+n+"]");a=n=null;var p=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,14,29,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,157,310,10,21,11,7,153,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,71,55,7,1,65,0,16,3,2,2,2,26,45,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,785,52,76,44,33,24,27,35,42,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,85,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,159,52,19,3,54,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,86,25,391,63,32,0,257,0,11,39,8,0,22,0,12,39,3,3,55,56,264,8,2,36,18,0,50,29,113,6,2,1,2,37,22,0,698,921,103,110,18,195,2749,1070,4050,582,8634,568,8,30,114,29,19,47,17,3,32,20,6,18,881,68,12,0,67,12,65,1,31,6124,20,754,9486,286,82,395,2309,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,4149,196,60,67,1213,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42710,42,4148,12,221,3,5761,15,7472,3104,541],c=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,1306,2,54,14,32,9,16,3,46,10,54,9,7,2,37,13,2,9,52,0,13,2,49,13,10,2,4,9,83,11,7,0,161,11,6,9,7,3,57,0,2,6,3,1,3,2,10,0,11,1,3,6,4,4,193,17,10,9,87,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,84,14,5,9,423,9,280,9,41,6,2,3,9,0,10,10,47,15,406,7,2,7,17,9,57,21,2,13,123,5,4,0,2,1,2,6,2,0,9,9,19719,9,135,4,60,6,26,9,1016,45,17,3,19723,1,5319,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,2214,6,110,6,6,9,792487,239];function u(t,e){for(var i=65536,s=0;s<e.length;s+=2){if((i+=e[s])>t)return!1;if((i+=e[s+1])>=t)return!0}}function l(t,e){return t<65?36===t:t<91||(t<97?95===t:t<123||(t<=65535?t>=170&&o.test(String.fromCharCode(t)):!1!==e&&u(t,p)))}function d(t,e){return t<48?36===t:t<58||!(t<65)&&(t<91||(t<97?95===t:t<123||(t<=65535?t>=170&&h.test(String.fromCharCode(t)):!1!==e&&(u(t,p)||u(t,c)))))}var f=function(t,e){void 0===e&&(e={}),this.label=t,this.keyword=e.keyword,this.beforeExpr=!!e.beforeExpr,this.startsExpr=!!e.startsExpr,this.isLoop=!!e.isLoop,this.isAssign=!!e.isAssign,this.prefix=!!e.prefix,this.postfix=!!e.postfix,this.binop=e.binop||null,this.updateContext=null};function m(t,e){return new f(t,{beforeExpr:!0,binop:e})}var x={beforeExpr:!0},g={startsExpr:!0},v={};function y(t,e){return void 0===e&&(e={}),e.keyword=t,v[t]=new f(t,e)}var _={num:new f("num",g),regexp:new f("regexp",g),string:new f("string",g),name:new f("name",g),eof:new f("eof"),bracketL:new f("[",{beforeExpr:!0,startsExpr:!0}),bracketR:new f("]"),braceL:new f("{",{beforeExpr:!0,startsExpr:!0}),braceR:new f("}"),parenL:new f("(",{beforeExpr:!0,startsExpr:!0}),parenR:new f(")"),comma:new f(",",x),semi:new f(";",x),colon:new f(":",x),dot:new f("."),question:new f("?",x),arrow:new f("=>",x),template:new f("template"),invalidTemplate:new f("invalidTemplate"),ellipsis:new f("...",x),backQuote:new f("`",g),dollarBraceL:new f("${",{beforeExpr:!0,startsExpr:!0}),eq:new f("=",{beforeExpr:!0,isAssign:!0}),assign:new f("_=",{beforeExpr:!0,isAssign:!0}),incDec:new f("++/--",{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new f("!/~",{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:m("||",1),logicalAND:m("&&",2),bitwiseOR:m("|",3),bitwiseXOR:m("^",4),bitwiseAND:m("&",5),equality:m("==/!=/===/!==",6),relational:m("</>/<=/>=",7),bitShift:m("<</>>/>>>",8),plusMin:new f("+/-",{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),modulo:m("%",10),star:m("*",10),slash:m("/",10),starstar:new f("**",{beforeExpr:!0}),_break:y("break"),_case:y("case",x),_catch:y("catch"),_continue:y("continue"),_debugger:y("debugger"),_default:y("default",x),_do:y("do",{isLoop:!0,beforeExpr:!0}),_else:y("else",x),_finally:y("finally"),_for:y("for",{isLoop:!0}),_function:y("function",g),_if:y("if"),_return:y("return",x),_switch:y("switch"),_throw:y("throw",x),_try:y("try"),_var:y("var"),_const:y("const"),_while:y("while",{isLoop:!0}),_with:y("with"),_new:y("new",{beforeExpr:!0,startsExpr:!0}),_this:y("this",g),_super:y("super",g),_class:y("class",g),_extends:y("extends",x),_export:y("export"),_import:y("import"),_null:y("null",g),_true:y("true",g),_false:y("false",g),_in:y("in",{beforeExpr:!0,binop:7}),_instanceof:y("instanceof",{beforeExpr:!0,binop:7}),_typeof:y("typeof",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_void:y("void",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_delete:y("delete",{beforeExpr:!0,prefix:!0,startsExpr:!0})},b=/\r\n?|\n|\u2028|\u2029/,k=new RegExp(b.source,"g");function C(t){return 10===t||13===t||8232===t||8233===t}var S=/[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/,E=/(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,w=Object.prototype,A=w.hasOwnProperty,I=w.toString;function P(t,e){return A.call(t,e)}var L=Array.isArray||function(t){return"[object Array]"===I.call(t)},N=function(t,e){this.line=t,this.column=e};N.prototype.offset=function(t){return new N(this.line,this.column+t)};var T=function(t,e,i){this.start=e,this.end=i,null!==t.sourceFile&&(this.source=t.sourceFile)};function V(t,e){for(var i=1,s=0;;){k.lastIndex=s;var r=k.exec(t);if(!(r&&r.index<e))return new N(i,e-s);++i,s=r.index+r[0].length}}var R={ecmaVersion:7,sourceType:"script",onInsertedSemicolon:null,onTrailingComma:null,allowReserved:null,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowHashBang:!1,locations:!1,onToken:null,onComment:null,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1,plugins:{}};function D(t){var e,i,s={};for(var r in R)s[r]=t&&P(t,r)?t[r]:R[r];if(s.ecmaVersion>=2015&&(s.ecmaVersion-=2009),null==s.allowReserved&&(s.allowReserved=s.ecmaVersion<5),L(s.onToken)){var a=s.onToken;s.onToken=function(t){return a.push(t)}}return L(s.onComment)&&(s.onComment=(e=s,i=s.onComment,function(t,s,r,a,n,o){var h={type:t?"Block":"Line",value:s,start:r,end:a};e.locations&&(h.loc=new T(this,n,o)),e.ranges&&(h.range=[r,a]),i.push(h)})),s}var B={};function O(t){return new RegExp("^(?:"+t.replace(/ /g,"|")+")$")}var M=function(t,i,r){this.options=t=D(t),this.sourceFile=t.sourceFile,this.keywords=O(s[t.ecmaVersion>=6?6:5]);var a="";if(!t.allowReserved){for(var n=t.ecmaVersion;!(a=e[n]);n--);"module"==t.sourceType&&(a+=" await")}this.reservedWords=O(a);var o=(a?a+" ":"")+e.strict;this.reservedWordsStrict=O(o),this.reservedWordsStrictBind=O(o+" "+e.strictBind),this.input=String(i),this.containsEsc=!1,this.loadPlugins(t.plugins),r?(this.pos=r,this.lineStart=this.input.lastIndexOf("\n",r-1)+1,this.curLine=this.input.slice(0,this.lineStart).split(b).length):(this.pos=this.lineStart=0,this.curLine=1),this.type=_.eof,this.value=null,this.start=this.end=this.pos,this.startLoc=this.endLoc=this.curPosition(),this.lastTokEndLoc=this.lastTokStartLoc=null,this.lastTokStart=this.lastTokEnd=this.pos,this.context=this.initialContext(),this.exprAllowed=!0,this.inModule="module"===t.sourceType,this.strict=this.inModule||this.strictDirective(this.pos),this.potentialArrowAt=-1,this.inFunction=this.inGenerator=this.inAsync=!1,this.yieldPos=this.awaitPos=0,this.labels=[],0===this.pos&&t.allowHashBang&&"#!"===this.input.slice(0,2)&&this.skipLineComment(2),this.scopeStack=[],this.enterFunctionScope(),this.regexpState=null};M.prototype.isKeyword=function(t){return this.keywords.test(t)},M.prototype.isReservedWord=function(t){return this.reservedWords.test(t)},M.prototype.extend=function(t,e){this[t]=e(this[t])},M.prototype.loadPlugins=function(t){for(var e in t){var i=B[e];if(!i)throw new Error("Plugin '"+e+"' not found");i(this,t[e])}},M.prototype.parse=function(){var t=this.options.program||this.startNode();return this.nextToken(),this.parseTopLevel(t)};var F=M.prototype,U=/^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)"|;)/;function G(){this.shorthandAssign=this.trailingComma=this.parenthesizedAssign=this.parenthesizedBind=this.doubleProto=-1}F.strictDirective=function(t){for(;;){E.lastIndex=t,t+=E.exec(this.input)[0].length;var e=U.exec(this.input.slice(t));if(!e)return!1;if("use strict"==(e[1]||e[2]))return!0;t+=e[0].length}},F.eat=function(t){return this.type===t&&(this.next(),!0)},F.isContextual=function(t){return this.type===_.name&&this.value===t&&!this.containsEsc},F.eatContextual=function(t){return!!this.isContextual(t)&&(this.next(),!0)},F.expectContextual=function(t){this.eatContextual(t)||this.unexpected()},F.canInsertSemicolon=function(){return this.type===_.eof||this.type===_.braceR||b.test(this.input.slice(this.lastTokEnd,this.start))},F.insertSemicolon=function(){if(this.canInsertSemicolon())return this.options.onInsertedSemicolon&&this.options.onInsertedSemicolon(this.lastTokEnd,this.lastTokEndLoc),!0},F.semicolon=function(){this.eat(_.semi)||this.insertSemicolon()||this.unexpected()},F.afterTrailingComma=function(t,e){if(this.type==t)return this.options.onTrailingComma&&this.options.onTrailingComma(this.lastTokStart,this.lastTokStartLoc),e||this.next(),!0},F.expect=function(t){this.eat(t)||this.unexpected()},F.unexpected=function(t){this.raise(null!=t?t:this.start,"Unexpected token")},F.checkPatternErrors=function(t,e){if(t){t.trailingComma>-1&&this.raiseRecoverable(t.trailingComma,"Comma is not permitted after the rest element");var i=e?t.parenthesizedAssign:t.parenthesizedBind;i>-1&&this.raiseRecoverable(i,"Parenthesized pattern")}},F.checkExpressionErrors=function(t,e){if(!t)return!1;var i=t.shorthandAssign,s=t.doubleProto;if(!e)return i>=0||s>=0;i>=0&&this.raise(i,"Shorthand property assignments are valid only in destructuring patterns"),s>=0&&this.raiseRecoverable(s,"Redefinition of __proto__ property")},F.checkYieldAwaitInDefaultParams=function(){this.yieldPos&&(!this.awaitPos||this.yieldPos<this.awaitPos)&&this.raise(this.yieldPos,"Yield expression cannot be a default value"),this.awaitPos&&this.raise(this.awaitPos,"Await expression cannot be a default value")},F.isSimpleAssignTarget=function(t){return"ParenthesizedExpression"===t.type?this.isSimpleAssignTarget(t.expression):"Identifier"===t.type||"MemberExpression"===t.type};var q=M.prototype;q.parseTopLevel=function(t){var e={};for(t.body||(t.body=[]);this.type!==_.eof;){var i=this.parseStatement(!0,!0,e);t.body.push(i)}return this.adaptDirectivePrologue(t.body),this.next(),this.options.ecmaVersion>=6&&(t.sourceType=this.options.sourceType),this.finishNode(t,"Program")};var H={kind:"loop"},W={kind:"switch"};q.isLet=function(){if(this.options.ecmaVersion<6||!this.isContextual("let"))return!1;E.lastIndex=this.pos;var t=E.exec(this.input),e=this.pos+t[0].length,i=this.input.charCodeAt(e);if(91===i||123==i)return!0;if(l(i,!0)){for(var s=e+1;d(this.input.charCodeAt(s),!0);)++s;var a=this.input.slice(e,s);if(!r.test(a))return!0}return!1},q.isAsyncFunction=function(){if(this.options.ecmaVersion<8||!this.isContextual("async"))return!1;E.lastIndex=this.pos;var t=E.exec(this.input),e=this.pos+t[0].length;return!(b.test(this.input.slice(this.pos,e))||"function"!==this.input.slice(e,e+8)||e+8!=this.input.length&&d(this.input.charAt(e+8)))},q.parseStatement=function(t,e,i){var s,r=this.type,a=this.startNode();switch(this.isLet()&&(r=_._var,s="let"),r){case _._break:case _._continue:return this.parseBreakContinueStatement(a,r.keyword);case _._debugger:return this.parseDebuggerStatement(a);case _._do:return this.parseDoStatement(a);case _._for:return this.parseForStatement(a);case _._function:return!t&&this.options.ecmaVersion>=6&&this.unexpected(),this.parseFunctionStatement(a,!1);case _._class:return t||this.unexpected(),this.parseClass(a,!0);case _._if:return this.parseIfStatement(a);case _._return:return this.parseReturnStatement(a);case _._switch:return this.parseSwitchStatement(a);case _._throw:return this.parseThrowStatement(a);case _._try:return this.parseTryStatement(a);case _._const:case _._var:return s=s||this.value,t||"var"==s||this.unexpected(),this.parseVarStatement(a,s);case _._while:return this.parseWhileStatement(a);case _._with:return this.parseWithStatement(a);case _.braceL:return this.parseBlock();case _.semi:return this.parseEmptyStatement(a);case _._export:case _._import:return this.options.allowImportExportEverywhere||(e||this.raise(this.start,"'import' and 'export' may only appear at the top level"),this.inModule||this.raise(this.start,"'import' and 'export' may appear only with 'sourceType: module'")),r===_._import?this.parseImport(a):this.parseExport(a,i);default:if(this.isAsyncFunction())return t||this.unexpected(),this.next(),this.parseFunctionStatement(a,!0);var n=this.value,o=this.parseExpression();return r===_.name&&"Identifier"===o.type&&this.eat(_.colon)?this.parseLabeledStatement(a,n,o):this.parseExpressionStatement(a,o)}},q.parseBreakContinueStatement=function(t,e){var i="break"==e;this.next(),this.eat(_.semi)||this.insertSemicolon()?t.label=null:this.type!==_.name?this.unexpected():(t.label=this.parseIdent(),this.semicolon());for(var s=0;s<this.labels.length;++s){var r=this.labels[s];if(null==t.label||r.name===t.label.name){if(null!=r.kind&&(i||"loop"===r.kind))break;if(t.label&&i)break}}return s===this.labels.length&&this.raise(t.start,"Unsyntactic "+e),this.finishNode(t,i?"BreakStatement":"ContinueStatement")},q.parseDebuggerStatement=function(t){return this.next(),this.semicolon(),this.finishNode(t,"DebuggerStatement")},q.parseDoStatement=function(t){return this.next(),this.labels.push(H),t.body=this.parseStatement(!1),this.labels.pop(),this.expect(_._while),t.test=this.parseParenExpression(),this.options.ecmaVersion>=6?this.eat(_.semi):this.semicolon(),this.finishNode(t,"DoWhileStatement")},q.parseForStatement=function(t){this.next();var e=this.options.ecmaVersion>=9&&this.inAsync&&this.eatContextual("await")?this.lastTokStart:-1;if(this.labels.push(H),this.enterLexicalScope(),this.expect(_.parenL),this.type===_.semi)return e>-1&&this.unexpected(e),this.parseFor(t,null);var i=this.isLet();if(this.type===_._var||this.type===_._const||i){var s=this.startNode(),r=i?"let":this.value;return this.next(),this.parseVar(s,!0,r),this.finishNode(s,"VariableDeclaration"),!(this.type===_._in||this.options.ecmaVersion>=6&&this.isContextual("of"))||1!==s.declarations.length||"var"!==r&&s.declarations[0].init?(e>-1&&this.unexpected(e),this.parseFor(t,s)):(this.options.ecmaVersion>=9&&(this.type===_._in?e>-1&&this.unexpected(e):t.await=e>-1),this.parseForIn(t,s))}var a=new G,n=this.parseExpression(!0,a);return this.type===_._in||this.options.ecmaVersion>=6&&this.isContextual("of")?(this.options.ecmaVersion>=9&&(this.type===_._in?e>-1&&this.unexpected(e):t.await=e>-1),this.toAssignable(n,!1,a),this.checkLVal(n),this.parseForIn(t,n)):(this.checkExpressionErrors(a,!0),e>-1&&this.unexpected(e),this.parseFor(t,n))},q.parseFunctionStatement=function(t,e){return this.next(),this.parseFunction(t,!0,!1,e)},q.parseIfStatement=function(t){return this.next(),t.test=this.parseParenExpression(),t.consequent=this.parseStatement(!this.strict&&this.type==_._function),t.alternate=this.eat(_._else)?this.parseStatement(!this.strict&&this.type==_._function):null,this.finishNode(t,"IfStatement")},q.parseReturnStatement=function(t){return this.inFunction||this.options.allowReturnOutsideFunction||this.raise(this.start,"'return' outside of function"),this.next(),this.eat(_.semi)||this.insertSemicolon()?t.argument=null:(t.argument=this.parseExpression(),this.semicolon()),this.finishNode(t,"ReturnStatement")},q.parseSwitchStatement=function(t){var e,i=this;this.next(),t.discriminant=this.parseParenExpression(),t.cases=[],this.expect(_.braceL),this.labels.push(W),this.enterLexicalScope();for(var s=!1;this.type!=_.braceR;)if(i.type===_._case||i.type===_._default){var r=i.type===_._case;e&&i.finishNode(e,"SwitchCase"),t.cases.push(e=i.startNode()),e.consequent=[],i.next(),r?e.test=i.parseExpression():(s&&i.raiseRecoverable(i.lastTokStart,"Multiple default clauses"),s=!0,e.test=null),i.expect(_.colon)}else e||i.unexpected(),e.consequent.push(i.parseStatement(!0));return this.exitLexicalScope(),e&&this.finishNode(e,"SwitchCase"),this.next(),this.labels.pop(),this.finishNode(t,"SwitchStatement")},q.parseThrowStatement=function(t){return this.next(),b.test(this.input.slice(this.lastTokEnd,this.start))&&this.raise(this.lastTokEnd,"Illegal newline after throw"),t.argument=this.parseExpression(),this.semicolon(),this.finishNode(t,"ThrowStatement")};var j=[];q.parseTryStatement=function(t){if(this.next(),t.block=this.parseBlock(),t.handler=null,this.type===_._catch){var e=this.startNode();this.next(),this.expect(_.parenL),e.param=this.parseBindingAtom(),this.enterLexicalScope(),this.checkLVal(e.param,"let"),this.expect(_.parenR),e.body=this.parseBlock(!1),this.exitLexicalScope(),t.handler=this.finishNode(e,"CatchClause")}return t.finalizer=this.eat(_._finally)?this.parseBlock():null,t.handler||t.finalizer||this.raise(t.start,"Missing catch or finally clause"),this.finishNode(t,"TryStatement")},q.parseVarStatement=function(t,e){return this.next(),this.parseVar(t,!1,e),this.semicolon(),this.finishNode(t,"VariableDeclaration")},q.parseWhileStatement=function(t){return this.next(),t.test=this.parseParenExpression(),this.labels.push(H),t.body=this.parseStatement(!1),this.labels.pop(),this.finishNode(t,"WhileStatement")},q.parseWithStatement=function(t){return this.strict&&this.raise(this.start,"'with' in strict mode"),this.next(),t.object=this.parseParenExpression(),t.body=this.parseStatement(!1),this.finishNode(t,"WithStatement")},q.parseEmptyStatement=function(t){return this.next(),this.finishNode(t,"EmptyStatement")},q.parseLabeledStatement=function(t,e,i){for(var s=0,r=this.labels;s<r.length;s+=1){r[s].name===e&&this.raise(i.start,"Label '"+e+"' is already declared")}for(var a=this.type.isLoop?"loop":this.type===_._switch?"switch":null,n=this.labels.length-1;n>=0;n--){var o=this.labels[n];if(o.statementStart!=t.start)break;o.statementStart=this.start,o.kind=a}return this.labels.push({name:e,kind:a,statementStart:this.start}),t.body=this.parseStatement(!0),("ClassDeclaration"==t.body.type||"VariableDeclaration"==t.body.type&&"var"!=t.body.kind||"FunctionDeclaration"==t.body.type&&(this.strict||t.body.generator))&&this.raiseRecoverable(t.body.start,"Invalid labeled declaration"),this.labels.pop(),t.label=i,this.finishNode(t,"LabeledStatement")},q.parseExpressionStatement=function(t,e){return t.expression=e,this.semicolon(),this.finishNode(t,"ExpressionStatement")},q.parseBlock=function(t){void 0===t&&(t=!0);var e=this.startNode();for(e.body=[],this.expect(_.braceL),t&&this.enterLexicalScope();!this.eat(_.braceR);){var i=this.parseStatement(!0);e.body.push(i)}return t&&this.exitLexicalScope(),this.finishNode(e,"BlockStatement")},q.parseFor=function(t,e){return t.init=e,this.expect(_.semi),t.test=this.type===_.semi?null:this.parseExpression(),this.expect(_.semi),t.update=this.type===_.parenR?null:this.parseExpression(),this.expect(_.parenR),this.exitLexicalScope(),t.body=this.parseStatement(!1),this.labels.pop(),this.finishNode(t,"ForStatement")},q.parseForIn=function(t,e){var i=this.type===_._in?"ForInStatement":"ForOfStatement";return this.next(),"ForInStatement"==i&&("AssignmentPattern"===e.type||"VariableDeclaration"===e.type&&null!=e.declarations[0].init&&(this.strict||"Identifier"!==e.declarations[0].id.type))&&this.raise(e.start,"Invalid assignment in for-in loop head"),t.left=e,t.right="ForInStatement"==i?this.parseExpression():this.parseMaybeAssign(),this.expect(_.parenR),this.exitLexicalScope(),t.body=this.parseStatement(!1),this.labels.pop(),this.finishNode(t,i)},q.parseVar=function(t,e,i){var s=this;for(t.declarations=[],t.kind=i;;){var r=s.startNode();if(s.parseVarId(r,i),s.eat(_.eq)?r.init=s.parseMaybeAssign(e):"const"!==i||s.type===_._in||s.options.ecmaVersion>=6&&s.isContextual("of")?"Identifier"==r.id.type||e&&(s.type===_._in||s.isContextual("of"))?r.init=null:s.raise(s.lastTokEnd,"Complex binding patterns require an initialization value"):s.unexpected(),t.declarations.push(s.finishNode(r,"VariableDeclarator")),!s.eat(_.comma))break}return t},q.parseVarId=function(t,e){t.id=this.parseBindingAtom(e),this.checkLVal(t.id,e,!1)},q.parseFunction=function(t,e,i,s){this.initFunction(t),(this.options.ecmaVersion>=9||this.options.ecmaVersion>=6&&!s)&&(t.generator=this.eat(_.star)),this.options.ecmaVersion>=8&&(t.async=!!s),e&&(t.id="nullableID"===e&&this.type!=_.name?null:this.parseIdent(),t.id&&this.checkLVal(t.id,"var"));var r=this.inGenerator,a=this.inAsync,n=this.yieldPos,o=this.awaitPos,h=this.inFunction;return this.inGenerator=t.generator,this.inAsync=t.async,this.yieldPos=0,this.awaitPos=0,this.inFunction=!0,this.enterFunctionScope(),e||(t.id=this.type==_.name?this.parseIdent():null),this.parseFunctionParams(t),this.parseFunctionBody(t,i),this.inGenerator=r,this.inAsync=a,this.yieldPos=n,this.awaitPos=o,this.inFunction=h,this.finishNode(t,e?"FunctionDeclaration":"FunctionExpression")},q.parseFunctionParams=function(t){this.expect(_.parenL),t.params=this.parseBindingList(_.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams()},q.parseClass=function(t,e){this.next(),this.parseClassId(t,e),this.parseClassSuper(t);var i=this.startNode(),s=!1;for(i.body=[],this.expect(_.braceL);!this.eat(_.braceR);){var r=this.parseClassMember(i);r&&"MethodDefinition"===r.type&&"constructor"===r.kind&&(s&&this.raise(r.start,"Duplicate constructor in the same class"),s=!0)}return t.body=this.finishNode(i,"ClassBody"),this.finishNode(t,e?"ClassDeclaration":"ClassExpression")},q.parseClassMember=function(t){var e=this;if(this.eat(_.semi))return null;var i=this.startNode(),s=function(t,s){void 0===s&&(s=!1);var r=e.start,a=e.startLoc;return!!e.eatContextual(t)&&(!(e.type===_.parenL||s&&e.canInsertSemicolon())||(i.key&&e.unexpected(),i.computed=!1,i.key=e.startNodeAt(r,a),i.key.name=t,e.finishNode(i.key,"Identifier"),!1))};i.kind="method",i.static=s("static");var r=this.eat(_.star),a=!1;r||(this.options.ecmaVersion>=8&&s("async",!0)?(a=!0,r=this.options.ecmaVersion>=9&&this.eat(_.star)):s("get")?i.kind="get":s("set")&&(i.kind="set")),i.key||this.parsePropertyName(i);var n=i.key;return i.computed||i.static||!("Identifier"===n.type&&"constructor"===n.name||"Literal"===n.type&&"constructor"===n.value)?i.static&&"Identifier"===n.type&&"prototype"===n.name&&this.raise(n.start,"Classes may not have a static property named prototype"):("method"!==i.kind&&this.raise(n.start,"Constructor can't have get/set modifier"),r&&this.raise(n.start,"Constructor can't be a generator"),a&&this.raise(n.start,"Constructor can't be an async method"),i.kind="constructor"),this.parseClassMethod(t,i,r,a),"get"===i.kind&&0!==i.value.params.length&&this.raiseRecoverable(i.value.start,"getter should have no params"),"set"===i.kind&&1!==i.value.params.length&&this.raiseRecoverable(i.value.start,"setter should have exactly one param"),"set"===i.kind&&"RestElement"===i.value.params[0].type&&this.raiseRecoverable(i.value.params[0].start,"Setter cannot use rest params"),i},q.parseClassMethod=function(t,e,i,s){e.value=this.parseMethod(i,s),t.body.push(this.finishNode(e,"MethodDefinition"))},q.parseClassId=function(t,e){t.id=this.type===_.name?this.parseIdent():!0===e?this.unexpected():null},q.parseClassSuper=function(t){t.superClass=this.eat(_._extends)?this.parseExprSubscripts():null},q.parseExport=function(t,e){if(this.next(),this.eat(_.star))return this.expectContextual("from"),this.type!==_.string&&this.unexpected(),t.source=this.parseExprAtom(),this.semicolon(),this.finishNode(t,"ExportAllDeclaration");if(this.eat(_._default)){var i;if(this.checkExport(e,"default",this.lastTokStart),this.type===_._function||(i=this.isAsyncFunction())){var s=this.startNode();this.next(),i&&this.next(),t.declaration=this.parseFunction(s,"nullableID",!1,i)}else if(this.type===_._class){var r=this.startNode();t.declaration=this.parseClass(r,"nullableID")}else t.declaration=this.parseMaybeAssign(),this.semicolon();return this.finishNode(t,"ExportDefaultDeclaration")}if(this.shouldParseExportStatement())t.declaration=this.parseStatement(!0),"VariableDeclaration"===t.declaration.type?this.checkVariableExport(e,t.declaration.declarations):this.checkExport(e,t.declaration.id.name,t.declaration.id.start),t.specifiers=[],t.source=null;else{if(t.declaration=null,t.specifiers=this.parseExportSpecifiers(e),this.eatContextual("from"))this.type!==_.string&&this.unexpected(),t.source=this.parseExprAtom();else{for(var a=0,n=t.specifiers;a<n.length;a+=1){var o=n[a];this.checkUnreserved(o.local)}t.source=null}this.semicolon()}return this.finishNode(t,"ExportNamedDeclaration")},q.checkExport=function(t,e,i){t&&(P(t,e)&&this.raiseRecoverable(i,"Duplicate export '"+e+"'"),t[e]=!0)},q.checkPatternExport=function(t,e){var i=e.type;if("Identifier"==i)this.checkExport(t,e.name,e.start);else if("ObjectPattern"==i)for(var s=0,r=e.properties;s<r.length;s+=1){var a=r[s];this.checkPatternExport(t,a)}else if("ArrayPattern"==i)for(var n=0,o=e.elements;n<o.length;n+=1){var h=o[n];h&&this.checkPatternExport(t,h)}else"Property"==i?this.checkPatternExport(t,e.value):"AssignmentPattern"==i?this.checkPatternExport(t,e.left):"RestElement"==i?this.checkPatternExport(t,e.argument):"ParenthesizedExpression"==i&&this.checkPatternExport(t,e.expression)},q.checkVariableExport=function(t,e){if(t)for(var i=0,s=e;i<s.length;i+=1){var r=s[i];this.checkPatternExport(t,r.id)}},q.shouldParseExportStatement=function(){return"var"===this.type.keyword||"const"===this.type.keyword||"class"===this.type.keyword||"function"===this.type.keyword||this.isLet()||this.isAsyncFunction()},q.parseExportSpecifiers=function(t){var e=this,i=[],s=!0;for(this.expect(_.braceL);!this.eat(_.braceR);){if(s)s=!1;else if(e.expect(_.comma),e.afterTrailingComma(_.braceR))break;var r=e.startNode();r.local=e.parseIdent(!0),r.exported=e.eatContextual("as")?e.parseIdent(!0):r.local,e.checkExport(t,r.exported.name,r.exported.start),i.push(e.finishNode(r,"ExportSpecifier"))}return i},q.parseImport=function(t){return this.next(),this.type===_.string?(t.specifiers=j,t.source=this.parseExprAtom()):(t.specifiers=this.parseImportSpecifiers(),this.expectContextual("from"),t.source=this.type===_.string?this.parseExprAtom():this.unexpected()),this.semicolon(),this.finishNode(t,"ImportDeclaration")},q.parseImportSpecifiers=function(){var t=this,e=[],i=!0;if(this.type===_.name){var s=this.startNode();if(s.local=this.parseIdent(),this.checkLVal(s.local,"let"),e.push(this.finishNode(s,"ImportDefaultSpecifier")),!this.eat(_.comma))return e}if(this.type===_.star){var r=this.startNode();return this.next(),this.expectContextual("as"),r.local=this.parseIdent(),this.checkLVal(r.local,"let"),e.push(this.finishNode(r,"ImportNamespaceSpecifier")),e}for(this.expect(_.braceL);!this.eat(_.braceR);){if(i)i=!1;else if(t.expect(_.comma),t.afterTrailingComma(_.braceR))break;var a=t.startNode();a.imported=t.parseIdent(!0),t.eatContextual("as")?a.local=t.parseIdent():(t.checkUnreserved(a.imported),a.local=a.imported),t.checkLVal(a.local,"let"),e.push(t.finishNode(a,"ImportSpecifier"))}return e},q.adaptDirectivePrologue=function(t){for(var e=0;e<t.length&&this.isDirectiveCandidate(t[e]);++e)t[e].directive=t[e].expression.raw.slice(1,-1)},q.isDirectiveCandidate=function(t){return"ExpressionStatement"===t.type&&"Literal"===t.expression.type&&"string"==typeof t.expression.value&&('"'===this.input[t.start]||"'"===this.input[t.start])};var z=M.prototype;z.toAssignable=function(t,e,i){if(this.options.ecmaVersion>=6&&t)switch(t.type){case"Identifier":this.inAsync&&"await"===t.name&&this.raise(t.start,"Can not use 'await' as identifier inside an async function");break;case"ObjectPattern":case"ArrayPattern":case"RestElement":break;case"ObjectExpression":t.type="ObjectPattern",i&&this.checkPatternErrors(i,!0);for(var s=0,r=t.properties;s<r.length;s+=1){var a=r[s];this.toAssignable(a,e),"RestElement"!==a.type||"ArrayPattern"!==a.argument.type&&"ObjectPattern"!==a.argument.type||this.raise(a.argument.start,"Unexpected token")}break;case"Property":"init"!==t.kind&&this.raise(t.key.start,"Object pattern can't contain getter or setter"),this.toAssignable(t.value,e);break;case"ArrayExpression":t.type="ArrayPattern",i&&this.checkPatternErrors(i,!0),this.toAssignableList(t.elements,e);break;case"SpreadElement":t.type="RestElement",this.toAssignable(t.argument,e),"AssignmentPattern"===t.argument.type&&this.raise(t.argument.start,"Rest elements cannot have a default value");break;case"AssignmentExpression":"="!==t.operator&&this.raise(t.left.end,"Only '=' operator can be used for specifying default value."),t.type="AssignmentPattern",delete t.operator,this.toAssignable(t.left,e);case"AssignmentPattern":break;case"ParenthesizedExpression":this.toAssignable(t.expression,e);break;case"MemberExpression":if(!e)break;default:this.raise(t.start,"Assigning to rvalue")}else i&&this.checkPatternErrors(i,!0);return t},z.toAssignableList=function(t,e){for(var i=t.length,s=0;s<i;s++){var r=t[s];r&&this.toAssignable(r,e)}if(i){var a=t[i-1];6===this.options.ecmaVersion&&e&&a&&"RestElement"===a.type&&"Identifier"!==a.argument.type&&this.unexpected(a.argument.start)}return t},z.parseSpread=function(t){var e=this.startNode();return this.next(),e.argument=this.parseMaybeAssign(!1,t),this.finishNode(e,"SpreadElement")},z.parseRestBinding=function(){var t=this.startNode();return this.next(),6===this.options.ecmaVersion&&this.type!==_.name&&this.unexpected(),t.argument=this.parseBindingAtom(),this.finishNode(t,"RestElement")},z.parseBindingAtom=function(){if(this.options.ecmaVersion>=6)switch(this.type){case _.bracketL:var t=this.startNode();return this.next(),t.elements=this.parseBindingList(_.bracketR,!0,!0),this.finishNode(t,"ArrayPattern");case _.braceL:return this.parseObj(!0)}return this.parseIdent()},z.parseBindingList=function(t,e,i){for(var s=this,r=[],a=!0;!this.eat(t);)if(a?a=!1:s.expect(_.comma),e&&s.type===_.comma)r.push(null);else{if(i&&s.afterTrailingComma(t))break;if(s.type===_.ellipsis){var n=s.parseRestBinding();s.parseBindingListItem(n),r.push(n),s.type===_.comma&&s.raise(s.start,"Comma is not permitted after the rest element"),s.expect(t);break}var o=s.parseMaybeDefault(s.start,s.startLoc);s.parseBindingListItem(o),r.push(o)}return r},z.parseBindingListItem=function(t){return t},z.parseMaybeDefault=function(t,e,i){if(i=i||this.parseBindingAtom(),this.options.ecmaVersion<6||!this.eat(_.eq))return i;var s=this.startNodeAt(t,e);return s.left=i,s.right=this.parseMaybeAssign(),this.finishNode(s,"AssignmentPattern")},z.checkLVal=function(t,e,i){switch(t.type){case"Identifier":this.strict&&this.reservedWordsStrictBind.test(t.name)&&this.raiseRecoverable(t.start,(e?"Binding ":"Assigning to ")+t.name+" in strict mode"),i&&(P(i,t.name)&&this.raiseRecoverable(t.start,"Argument name clash"),i[t.name]=!0),e&&"none"!==e&&(("var"===e&&!this.canDeclareVarName(t.name)||"var"!==e&&!this.canDeclareLexicalName(t.name))&&this.raiseRecoverable(t.start,"Identifier '"+t.name+"' has already been declared"),"var"===e?this.declareVarName(t.name):this.declareLexicalName(t.name));break;case"MemberExpression":e&&this.raiseRecoverable(t.start,"Binding member expression");break;case"ObjectPattern":for(var s=0,r=t.properties;s<r.length;s+=1){var a=r[s];this.checkLVal(a,e,i)}break;case"Property":this.checkLVal(t.value,e,i);break;case"ArrayPattern":for(var n=0,o=t.elements;n<o.length;n+=1){var h=o[n];h&&this.checkLVal(h,e,i)}break;case"AssignmentPattern":this.checkLVal(t.left,e,i);break;case"RestElement":this.checkLVal(t.argument,e,i);break;case"ParenthesizedExpression":this.checkLVal(t.expression,e,i);break;default:this.raise(t.start,(e?"Binding":"Assigning to")+" rvalue")}};var Q=M.prototype;Q.checkPropClash=function(t,e,i){if(!(this.options.ecmaVersion>=9&&"SpreadElement"===t.type||this.options.ecmaVersion>=6&&(t.computed||t.method||t.shorthand))){var s,r=t.key;switch(r.type){case"Identifier":s=r.name;break;case"Literal":s=String(r.value);break;default:return}var a=t.kind;if(this.options.ecmaVersion>=6)"__proto__"===s&&"init"===a&&(e.proto&&(i&&i.doubleProto<0?i.doubleProto=r.start:this.raiseRecoverable(r.start,"Redefinition of __proto__ property")),e.proto=!0);else{var n=e[s="$"+s];if(n)("init"===a?this.strict&&n.init||n.get||n.set:n.init||n[a])&&this.raiseRecoverable(r.start,"Redefinition of property");else n=e[s]={init:!1,get:!1,set:!1};n[a]=!0}}},Q.parseExpression=function(t,e){var i=this.start,s=this.startLoc,r=this.parseMaybeAssign(t,e);if(this.type===_.comma){var a=this.startNodeAt(i,s);for(a.expressions=[r];this.eat(_.comma);)a.expressions.push(this.parseMaybeAssign(t,e));return this.finishNode(a,"SequenceExpression")}return r},Q.parseMaybeAssign=function(t,e,i){if(this.inGenerator&&this.isContextual("yield"))return this.parseYield();var s=!1,r=-1,a=-1;e?(r=e.parenthesizedAssign,a=e.trailingComma,e.parenthesizedAssign=e.trailingComma=-1):(e=new G,s=!0);var n=this.start,o=this.startLoc;this.type!=_.parenL&&this.type!=_.name||(this.potentialArrowAt=this.start);var h=this.parseMaybeConditional(t,e);if(i&&(h=i.call(this,h,n,o)),this.type.isAssign){var p=this.startNodeAt(n,o);return p.operator=this.value,p.left=this.type===_.eq?this.toAssignable(h,!1,e):h,s||G.call(e),e.shorthandAssign=-1,this.checkLVal(h),this.next(),p.right=this.parseMaybeAssign(t),this.finishNode(p,"AssignmentExpression")}return s&&this.checkExpressionErrors(e,!0),r>-1&&(e.parenthesizedAssign=r),a>-1&&(e.trailingComma=a),h},Q.parseMaybeConditional=function(t,e){var i=this.start,s=this.startLoc,r=this.parseExprOps(t,e);if(this.checkExpressionErrors(e))return r;if(this.eat(_.question)){var a=this.startNodeAt(i,s);return a.test=r,a.consequent=this.parseMaybeAssign(),this.expect(_.colon),a.alternate=this.parseMaybeAssign(t),this.finishNode(a,"ConditionalExpression")}return r},Q.parseExprOps=function(t,e){var i=this.start,s=this.startLoc,r=this.parseMaybeUnary(e,!1);return this.checkExpressionErrors(e)?r:r.start==i&&"ArrowFunctionExpression"===r.type?r:this.parseExprOp(r,i,s,-1,t)},Q.parseExprOp=function(t,e,i,s,r){var a=this.type.binop;if(null!=a&&(!r||this.type!==_._in)&&a>s){var n=this.type===_.logicalOR||this.type===_.logicalAND,o=this.value;this.next();var h=this.start,p=this.startLoc,c=this.parseExprOp(this.parseMaybeUnary(null,!1),h,p,a,r),u=this.buildBinary(e,i,t,c,o,n);return this.parseExprOp(u,e,i,s,r)}return t},Q.buildBinary=function(t,e,i,s,r,a){var n=this.startNodeAt(t,e);return n.left=i,n.operator=r,n.right=s,this.finishNode(n,a?"LogicalExpression":"BinaryExpression")},Q.parseMaybeUnary=function(t,e){var i,s=this,r=this.start,a=this.startLoc;if(this.inAsync&&this.isContextual("await"))i=this.parseAwait(),e=!0;else if(this.type.prefix){var n=this.startNode(),o=this.type===_.incDec;n.operator=this.value,n.prefix=!0,this.next(),n.argument=this.parseMaybeUnary(null,!0),this.checkExpressionErrors(t,!0),o?this.checkLVal(n.argument):this.strict&&"delete"===n.operator&&"Identifier"===n.argument.type?this.raiseRecoverable(n.start,"Deleting local variable in strict mode"):e=!0,i=this.finishNode(n,o?"UpdateExpression":"UnaryExpression")}else{if(i=this.parseExprSubscripts(t),this.checkExpressionErrors(t))return i;for(;this.type.postfix&&!this.canInsertSemicolon();){var h=s.startNodeAt(r,a);h.operator=s.value,h.prefix=!1,h.argument=i,s.checkLVal(i),s.next(),i=s.finishNode(h,"UpdateExpression")}}return!e&&this.eat(_.starstar)?this.buildBinary(r,a,i,this.parseMaybeUnary(null,!1),"**",!1):i},Q.parseExprSubscripts=function(t){var e=this.start,i=this.startLoc,s=this.parseExprAtom(t),r="ArrowFunctionExpression"===s.type&&")"!==this.input.slice(this.lastTokStart,this.lastTokEnd);if(this.checkExpressionErrors(t)||r)return s;var a=this.parseSubscripts(s,e,i);return t&&"MemberExpression"===a.type&&(t.parenthesizedAssign>=a.start&&(t.parenthesizedAssign=-1),t.parenthesizedBind>=a.start&&(t.parenthesizedBind=-1)),a},Q.parseSubscripts=function(t,e,i,s){for(var r=this,a=this.options.ecmaVersion>=8&&"Identifier"===t.type&&"async"===t.name&&this.lastTokEnd==t.end&&!this.canInsertSemicolon()&&"async"===this.input.slice(t.start,t.end),n=void 0;;)if((n=r.eat(_.bracketL))||r.eat(_.dot)){var o=r.startNodeAt(e,i);o.object=t,o.property=n?r.parseExpression():r.parseIdent(!0),o.computed=!!n,n&&r.expect(_.bracketR),t=r.finishNode(o,"MemberExpression")}else if(!s&&r.eat(_.parenL)){var h=new G,p=r.yieldPos,c=r.awaitPos;r.yieldPos=0,r.awaitPos=0;var u=r.parseExprList(_.parenR,r.options.ecmaVersion>=8,!1,h);if(a&&!r.canInsertSemicolon()&&r.eat(_.arrow))return r.checkPatternErrors(h,!1),r.checkYieldAwaitInDefaultParams(),r.yieldPos=p,r.awaitPos=c,r.parseArrowExpression(r.startNodeAt(e,i),u,!0);r.checkExpressionErrors(h,!0),r.yieldPos=p||r.yieldPos,r.awaitPos=c||r.awaitPos;var l=r.startNodeAt(e,i);l.callee=t,l.arguments=u,t=r.finishNode(l,"CallExpression")}else{if(r.type!==_.backQuote)return t;var d=r.startNodeAt(e,i);d.tag=t,d.quasi=r.parseTemplate({isTagged:!0}),t=r.finishNode(d,"TaggedTemplateExpression")}},Q.parseExprAtom=function(t){var e,i=this.potentialArrowAt==this.start;switch(this.type){case _._super:return this.inFunction||this.raise(this.start,"'super' outside of function or class"),e=this.startNode(),this.next(),this.type!==_.dot&&this.type!==_.bracketL&&this.type!==_.parenL&&this.unexpected(),this.finishNode(e,"Super");case _._this:return e=this.startNode(),this.next(),this.finishNode(e,"ThisExpression");case _.name:var s=this.start,r=this.startLoc,a=this.containsEsc,n=this.parseIdent(this.type!==_.name);if(this.options.ecmaVersion>=8&&!a&&"async"===n.name&&!this.canInsertSemicolon()&&this.eat(_._function))return this.parseFunction(this.startNodeAt(s,r),!1,!1,!0);if(i&&!this.canInsertSemicolon()){if(this.eat(_.arrow))return this.parseArrowExpression(this.startNodeAt(s,r),[n],!1);if(this.options.ecmaVersion>=8&&"async"===n.name&&this.type===_.name&&!a)return n=this.parseIdent(),!this.canInsertSemicolon()&&this.eat(_.arrow)||this.unexpected(),this.parseArrowExpression(this.startNodeAt(s,r),[n],!0)}return n;case _.regexp:var o=this.value;return(e=this.parseLiteral(o.value)).regex={pattern:o.pattern,flags:o.flags},e;case _.num:case _.string:return this.parseLiteral(this.value);case _._null:case _._true:case _._false:return(e=this.startNode()).value=this.type===_._null?null:this.type===_._true,e.raw=this.type.keyword,this.next(),this.finishNode(e,"Literal");case _.parenL:var h=this.start,p=this.parseParenAndDistinguishExpression(i);return t&&(t.parenthesizedAssign<0&&!this.isSimpleAssignTarget(p)&&(t.parenthesizedAssign=h),t.parenthesizedBind<0&&(t.parenthesizedBind=h)),p;case _.bracketL:return e=this.startNode(),this.next(),e.elements=this.parseExprList(_.bracketR,!0,!0,t),this.finishNode(e,"ArrayExpression");case _.braceL:return this.parseObj(!1,t);case _._function:return e=this.startNode(),this.next(),this.parseFunction(e,!1);case _._class:return this.parseClass(this.startNode(),!1);case _._new:return this.parseNew();case _.backQuote:return this.parseTemplate();default:this.unexpected()}},Q.parseLiteral=function(t){var e=this.startNode();return e.value=t,e.raw=this.input.slice(this.start,this.end),this.next(),this.finishNode(e,"Literal")},Q.parseParenExpression=function(){this.expect(_.parenL);var t=this.parseExpression();return this.expect(_.parenR),t},Q.parseParenAndDistinguishExpression=function(t){var e,i=this,s=this.start,r=this.startLoc,a=this.options.ecmaVersion>=8;if(this.options.ecmaVersion>=6){this.next();var n,o=this.start,h=this.startLoc,p=[],c=!0,u=!1,l=new G,d=this.yieldPos,f=this.awaitPos;for(this.yieldPos=0,this.awaitPos=0;this.type!==_.parenR;){if(c?c=!1:i.expect(_.comma),a&&i.afterTrailingComma(_.parenR,!0)){u=!0;break}if(i.type===_.ellipsis){n=i.start,p.push(i.parseParenItem(i.parseRestBinding())),i.type===_.comma&&i.raise(i.start,"Comma is not permitted after the rest element");break}p.push(i.parseMaybeAssign(!1,l,i.parseParenItem))}var m=this.start,x=this.startLoc;if(this.expect(_.parenR),t&&!this.canInsertSemicolon()&&this.eat(_.arrow))return this.checkPatternErrors(l,!1),this.checkYieldAwaitInDefaultParams(),this.yieldPos=d,this.awaitPos=f,this.parseParenArrowList(s,r,p);p.length&&!u||this.unexpected(this.lastTokStart),n&&this.unexpected(n),this.checkExpressionErrors(l,!0),this.yieldPos=d||this.yieldPos,this.awaitPos=f||this.awaitPos,p.length>1?((e=this.startNodeAt(o,h)).expressions=p,this.finishNodeAt(e,"SequenceExpression",m,x)):e=p[0]}else e=this.parseParenExpression();if(this.options.preserveParens){var g=this.startNodeAt(s,r);return g.expression=e,this.finishNode(g,"ParenthesizedExpression")}return e},Q.parseParenItem=function(t){return t},Q.parseParenArrowList=function(t,e,i){return this.parseArrowExpression(this.startNodeAt(t,e),i)};var K=[];Q.parseNew=function(){var t=this.startNode(),e=this.parseIdent(!0);if(this.options.ecmaVersion>=6&&this.eat(_.dot)){t.meta=e;var i=this.containsEsc;return t.property=this.parseIdent(!0),("target"!==t.property.name||i)&&this.raiseRecoverable(t.property.start,"The only valid meta property for new is new.target"),this.inFunction||this.raiseRecoverable(t.start,"new.target can only be used in functions"),this.finishNode(t,"MetaProperty")}var s=this.start,r=this.startLoc;return t.callee=this.parseSubscripts(this.parseExprAtom(),s,r,!0),this.eat(_.parenL)?t.arguments=this.parseExprList(_.parenR,this.options.ecmaVersion>=8,!1):t.arguments=K,this.finishNode(t,"NewExpression")},Q.parseTemplateElement=function(t){var e=t.isTagged,i=this.startNode();return this.type===_.invalidTemplate?(e||this.raiseRecoverable(this.start,"Bad escape sequence in untagged template literal"),i.value={raw:this.value,cooked:null}):i.value={raw:this.input.slice(this.start,this.end).replace(/\r\n?/g,"\n"),cooked:this.value},this.next(),i.tail=this.type===_.backQuote,this.finishNode(i,"TemplateElement")},Q.parseTemplate=function(t){void 0===t&&(t={});var e=t.isTagged;void 0===e&&(e=!1);var i=this.startNode();this.next(),i.expressions=[];var s=this.parseTemplateElement({isTagged:e});for(i.quasis=[s];!s.tail;)this.expect(_.dollarBraceL),i.expressions.push(this.parseExpression()),this.expect(_.braceR),i.quasis.push(s=this.parseTemplateElement({isTagged:e}));return this.next(),this.finishNode(i,"TemplateLiteral")},Q.isAsyncProp=function(t){return!t.computed&&"Identifier"===t.key.type&&"async"===t.key.name&&(this.type===_.name||this.type===_.num||this.type===_.string||this.type===_.bracketL||this.type.keyword||this.options.ecmaVersion>=9&&this.type===_.star)&&!b.test(this.input.slice(this.lastTokEnd,this.start))},Q.parseObj=function(t,e){var i=this.startNode(),s=!0,r={};for(i.properties=[],this.next();!this.eat(_.braceR);){if(s)s=!1;else if(this.expect(_.comma),this.afterTrailingComma(_.braceR))break;var a=this.parseProperty(t,e);t||this.checkPropClash(a,r,e),i.properties.push(a)}return this.finishNode(i,t?"ObjectPattern":"ObjectExpression")},Q.parseProperty=function(t,e){var i,s,r,a,n=this.startNode();if(this.options.ecmaVersion>=9&&this.eat(_.ellipsis))return t?(n.argument=this.parseIdent(!1),this.type===_.comma&&this.raise(this.start,"Comma is not permitted after the rest element"),this.finishNode(n,"RestElement")):(this.type===_.parenL&&e&&(e.parenthesizedAssign<0&&(e.parenthesizedAssign=this.start),e.parenthesizedBind<0&&(e.parenthesizedBind=this.start)),n.argument=this.parseMaybeAssign(!1,e),this.type===_.comma&&e&&e.trailingComma<0&&(e.trailingComma=this.start),this.finishNode(n,"SpreadElement"));this.options.ecmaVersion>=6&&(n.method=!1,n.shorthand=!1,(t||e)&&(r=this.start,a=this.startLoc),t||(i=this.eat(_.star)));var o=this.containsEsc;return this.parsePropertyName(n),!t&&!o&&this.options.ecmaVersion>=8&&!i&&this.isAsyncProp(n)?(s=!0,i=this.options.ecmaVersion>=9&&this.eat(_.star),this.parsePropertyName(n,e)):s=!1,this.parsePropertyValue(n,t,i,s,r,a,e,o),this.finishNode(n,"Property")},Q.parsePropertyValue=function(t,e,i,s,r,a,n,o){if((i||s)&&this.type===_.colon&&this.unexpected(),this.eat(_.colon))t.value=e?this.parseMaybeDefault(this.start,this.startLoc):this.parseMaybeAssign(!1,n),t.kind="init";else if(this.options.ecmaVersion>=6&&this.type===_.parenL)e&&this.unexpected(),t.kind="init",t.method=!0,t.value=this.parseMethod(i,s);else if(e||o||!(this.options.ecmaVersion>=5)||t.computed||"Identifier"!==t.key.type||"get"!==t.key.name&&"set"!==t.key.name||this.type==_.comma||this.type==_.braceR)this.options.ecmaVersion>=6&&!t.computed&&"Identifier"===t.key.type?(this.checkUnreserved(t.key),t.kind="init",e?t.value=this.parseMaybeDefault(r,a,t.key):this.type===_.eq&&n?(n.shorthandAssign<0&&(n.shorthandAssign=this.start),t.value=this.parseMaybeDefault(r,a,t.key)):t.value=t.key,t.shorthand=!0):this.unexpected();else{(i||s)&&this.unexpected(),t.kind=t.key.name,this.parsePropertyName(t),t.value=this.parseMethod(!1);var h="get"===t.kind?0:1;if(t.value.params.length!==h){var p=t.value.start;"get"===t.kind?this.raiseRecoverable(p,"getter should have no params"):this.raiseRecoverable(p,"setter should have exactly one param")}else"set"===t.kind&&"RestElement"===t.value.params[0].type&&this.raiseRecoverable(t.value.params[0].start,"Setter cannot use rest params")}},Q.parsePropertyName=function(t){if(this.options.ecmaVersion>=6){if(this.eat(_.bracketL))return t.computed=!0,t.key=this.parseMaybeAssign(),this.expect(_.bracketR),t.key;t.computed=!1}return t.key=this.type===_.num||this.type===_.string?this.parseExprAtom():this.parseIdent(!0)},Q.initFunction=function(t){t.id=null,this.options.ecmaVersion>=6&&(t.generator=!1,t.expression=!1),this.options.ecmaVersion>=8&&(t.async=!1)},Q.parseMethod=function(t,e){var i=this.startNode(),s=this.inGenerator,r=this.inAsync,a=this.yieldPos,n=this.awaitPos,o=this.inFunction;return this.initFunction(i),this.options.ecmaVersion>=6&&(i.generator=t),this.options.ecmaVersion>=8&&(i.async=!!e),this.inGenerator=i.generator,this.inAsync=i.async,this.yieldPos=0,this.awaitPos=0,this.inFunction=!0,this.enterFunctionScope(),this.expect(_.parenL),i.params=this.parseBindingList(_.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams(),this.parseFunctionBody(i,!1),this.inGenerator=s,this.inAsync=r,this.yieldPos=a,this.awaitPos=n,this.inFunction=o,this.finishNode(i,"FunctionExpression")},Q.parseArrowExpression=function(t,e,i){var s=this.inGenerator,r=this.inAsync,a=this.yieldPos,n=this.awaitPos,o=this.inFunction;return this.enterFunctionScope(),this.initFunction(t),this.options.ecmaVersion>=8&&(t.async=!!i),this.inGenerator=!1,this.inAsync=t.async,this.yieldPos=0,this.awaitPos=0,this.inFunction=!0,t.params=this.toAssignableList(e,!0),this.parseFunctionBody(t,!0),this.inGenerator=s,this.inAsync=r,this.yieldPos=a,this.awaitPos=n,this.inFunction=o,this.finishNode(t,"ArrowFunctionExpression")},Q.parseFunctionBody=function(t,e){var i=e&&this.type!==_.braceL,s=this.strict,r=!1;if(i)t.body=this.parseMaybeAssign(),t.expression=!0,this.checkParams(t,!1);else{var a=this.options.ecmaVersion>=7&&!this.isSimpleParamList(t.params);s&&!a||(r=this.strictDirective(this.end))&&a&&this.raiseRecoverable(t.start,"Illegal 'use strict' directive in function with non-simple parameter list");var n=this.labels;this.labels=[],r&&(this.strict=!0),this.checkParams(t,!s&&!r&&!e&&this.isSimpleParamList(t.params)),t.body=this.parseBlock(!1),t.expression=!1,this.adaptDirectivePrologue(t.body.body),this.labels=n}this.exitFunctionScope(),this.strict&&t.id&&this.checkLVal(t.id,"none"),this.strict=s},Q.isSimpleParamList=function(t){for(var e=0,i=t;e<i.length;e+=1){if("Identifier"!==i[e].type)return!1}return!0},Q.checkParams=function(t,e){for(var i={},s=0,r=t.params;s<r.length;s+=1){var a=r[s];this.checkLVal(a,"var",e?null:i)}},Q.parseExprList=function(t,e,i,s){for(var r=this,a=[],n=!0;!this.eat(t);){if(n)n=!1;else if(r.expect(_.comma),e&&r.afterTrailingComma(t))break;var o=void 0;i&&r.type===_.comma?o=null:r.type===_.ellipsis?(o=r.parseSpread(s),s&&r.type===_.comma&&s.trailingComma<0&&(s.trailingComma=r.start)):o=r.parseMaybeAssign(!1,s),a.push(o)}return a},Q.checkUnreserved=function(t){var e=t.start,i=t.end,s=t.name;(this.inGenerator&&"yield"===s&&this.raiseRecoverable(e,"Can not use 'yield' as identifier inside a generator"),this.inAsync&&"await"===s&&this.raiseRecoverable(e,"Can not use 'await' as identifier inside an async function"),this.isKeyword(s)&&this.raise(e,"Unexpected keyword '"+s+"'"),this.options.ecmaVersion<6&&-1!=this.input.slice(e,i).indexOf("\\"))||(this.strict?this.reservedWordsStrict:this.reservedWords).test(s)&&(this.inAsync||"await"!==s||this.raiseRecoverable(e,"Can not use keyword 'await' outside an async function"),this.raiseRecoverable(e,"The keyword '"+s+"' is reserved"))},Q.parseIdent=function(t,e){var i=this.startNode();return t&&"never"==this.options.allowReserved&&(t=!1),this.type===_.name?i.name=this.value:this.type.keyword?(i.name=this.type.keyword,"class"!==i.name&&"function"!==i.name||this.lastTokEnd===this.lastTokStart+1&&46===this.input.charCodeAt(this.lastTokStart)||this.context.pop()):this.unexpected(),this.next(),this.finishNode(i,"Identifier"),t||this.checkUnreserved(i),i},Q.parseYield=function(){this.yieldPos||(this.yieldPos=this.start);var t=this.startNode();return this.next(),this.type==_.semi||this.canInsertSemicolon()||this.type!=_.star&&!this.type.startsExpr?(t.delegate=!1,t.argument=null):(t.delegate=this.eat(_.star),t.argument=this.parseMaybeAssign()),this.finishNode(t,"YieldExpression")},Q.parseAwait=function(){this.awaitPos||(this.awaitPos=this.start);var t=this.startNode();return this.next(),t.argument=this.parseMaybeUnary(null,!0),this.finishNode(t,"AwaitExpression")};var X=M.prototype;X.raise=function(t,e){var i=V(this.input,t);e+=" ("+i.line+":"+i.column+")";var s=new SyntaxError(e);throw s.pos=t,s.loc=i,s.raisedAt=this.pos,s},X.raiseRecoverable=X.raise,X.curPosition=function(){if(this.options.locations)return new N(this.curLine,this.pos-this.lineStart)};var Y=M.prototype,Z=Object.assign||function(t){for(var e=[],i=arguments.length-1;i-- >0;)e[i]=arguments[i+1];for(var s=0,r=e;s<r.length;s+=1){var a=r[s];for(var n in a)P(a,n)&&(t[n]=a[n])}return t};Y.enterFunctionScope=function(){this.scopeStack.push({var:{},lexical:{},childVar:{},parentLexical:{}})},Y.exitFunctionScope=function(){this.scopeStack.pop()},Y.enterLexicalScope=function(){var t=this.scopeStack[this.scopeStack.length-1],e={var:{},lexical:{},childVar:{},parentLexical:{}};this.scopeStack.push(e),Z(e.parentLexical,t.lexical,t.parentLexical)},Y.exitLexicalScope=function(){var t=this.scopeStack.pop(),e=this.scopeStack[this.scopeStack.length-1];Z(e.childVar,t.var,t.childVar)},Y.canDeclareVarName=function(t){var e=this.scopeStack[this.scopeStack.length-1];return!P(e.lexical,t)&&!P(e.parentLexical,t)},Y.canDeclareLexicalName=function(t){var e=this.scopeStack[this.scopeStack.length-1];return!P(e.lexical,t)&&!P(e.var,t)&&!P(e.childVar,t)},Y.declareVarName=function(t){this.scopeStack[this.scopeStack.length-1].var[t]=!0},Y.declareLexicalName=function(t){this.scopeStack[this.scopeStack.length-1].lexical[t]=!0};var $=function(t,e,i){this.type="",this.start=e,this.end=0,t.options.locations&&(this.loc=new T(t,i)),t.options.directSourceFile&&(this.sourceFile=t.options.directSourceFile),t.options.ranges&&(this.range=[e,0])},J=M.prototype;function tt(t,e,i,s){return t.type=e,t.end=i,this.options.locations&&(t.loc.end=s),this.options.ranges&&(t.range[1]=i),t}J.startNode=function(){return new $(this,this.start,this.startLoc)},J.startNodeAt=function(t,e){return new $(this,t,e)},J.finishNode=function(t,e){return tt.call(this,t,e,this.lastTokEnd,this.lastTokEndLoc)},J.finishNodeAt=function(t,e,i,s){return tt.call(this,t,e,i,s)};var et=function(t,e,i,s,r){this.token=t,this.isExpr=!!e,this.preserveSpace=!!i,this.override=s,this.generator=!!r},it={b_stat:new et("{",!1),b_expr:new et("{",!0),b_tmpl:new et("${",!1),p_stat:new et("(",!1),p_expr:new et("(",!0),q_tmpl:new et("`",!0,!0,function(t){return t.tryReadTemplateToken()}),f_stat:new et("function",!1),f_expr:new et("function",!0),f_expr_gen:new et("function",!0,!1,null,!0),f_gen:new et("function",!1,!1,null,!0)},st=M.prototype;st.initialContext=function(){return[it.b_stat]},st.braceIsBlock=function(t){var e=this.curContext();return e===it.f_expr||e===it.f_stat||(t!==_.colon||e!==it.b_stat&&e!==it.b_expr?t===_._return||t==_.name&&this.exprAllowed?b.test(this.input.slice(this.lastTokEnd,this.start)):t===_._else||t===_.semi||t===_.eof||t===_.parenR||t==_.arrow||(t==_.braceL?e===it.b_stat:t!=_._var&&t!=_.name&&!this.exprAllowed):!e.isExpr)},st.inGeneratorContext=function(){for(var t=this.context.length-1;t>=1;t--){var e=this.context[t];if("function"===e.token)return e.generator}return!1},st.updateContext=function(t){var e,i=this.type;i.keyword&&t==_.dot?this.exprAllowed=!1:(e=i.updateContext)?e.call(this,t):this.exprAllowed=i.beforeExpr},_.parenR.updateContext=_.braceR.updateContext=function(){if(1!=this.context.length){var t=this.context.pop();t===it.b_stat&&"function"===this.curContext().token&&(t=this.context.pop()),this.exprAllowed=!t.isExpr}else this.exprAllowed=!0},_.braceL.updateContext=function(t){this.context.push(this.braceIsBlock(t)?it.b_stat:it.b_expr),this.exprAllowed=!0},_.dollarBraceL.updateContext=function(){this.context.push(it.b_tmpl),this.exprAllowed=!0},_.parenL.updateContext=function(t){var e=t===_._if||t===_._for||t===_._with||t===_._while;this.context.push(e?it.p_stat:it.p_expr),this.exprAllowed=!0},_.incDec.updateContext=function(){},_._function.updateContext=_._class.updateContext=function(t){t.beforeExpr&&t!==_.semi&&t!==_._else&&(t!==_.colon&&t!==_.braceL||this.curContext()!==it.b_stat)?this.context.push(it.f_expr):this.context.push(it.f_stat),this.exprAllowed=!1},_.backQuote.updateContext=function(){this.curContext()===it.q_tmpl?this.context.pop():this.context.push(it.q_tmpl),this.exprAllowed=!1},_.star.updateContext=function(t){if(t==_._function){var e=this.context.length-1;this.context[e]===it.f_expr?this.context[e]=it.f_expr_gen:this.context[e]=it.f_gen}this.exprAllowed=!0},_.name.updateContext=function(t){var e=!1;this.options.ecmaVersion>=6&&("of"==this.value&&!this.exprAllowed||"yield"==this.value&&this.inGeneratorContext())&&(e=!0),this.exprAllowed=e};var rt={$LONE:["ASCII","ASCII_Hex_Digit","AHex","Alphabetic","Alpha","Any","Assigned","Bidi_Control","Bidi_C","Bidi_Mirrored","Bidi_M","Case_Ignorable","CI","Cased","Changes_When_Casefolded","CWCF","Changes_When_Casemapped","CWCM","Changes_When_Lowercased","CWL","Changes_When_NFKC_Casefolded","CWKCF","Changes_When_Titlecased","CWT","Changes_When_Uppercased","CWU","Dash","Default_Ignorable_Code_Point","DI","Deprecated","Dep","Diacritic","Dia","Emoji","Emoji_Component","Emoji_Modifier","Emoji_Modifier_Base","Emoji_Presentation","Extender","Ext","Grapheme_Base","Gr_Base","Grapheme_Extend","Gr_Ext","Hex_Digit","Hex","IDS_Binary_Operator","IDSB","IDS_Trinary_Operator","IDST","ID_Continue","IDC","ID_Start","IDS","Ideographic","Ideo","Join_Control","Join_C","Logical_Order_Exception","LOE","Lowercase","Lower","Math","Noncharacter_Code_Point","NChar","Pattern_Syntax","Pat_Syn","Pattern_White_Space","Pat_WS","Quotation_Mark","QMark","Radical","Regional_Indicator","RI","Sentence_Terminal","STerm","Soft_Dotted","SD","Terminal_Punctuation","Term","Unified_Ideograph","UIdeo","Uppercase","Upper","Variation_Selector","VS","White_Space","space","XID_Continue","XIDC","XID_Start","XIDS"],General_Category:["Cased_Letter","LC","Close_Punctuation","Pe","Connector_Punctuation","Pc","Control","Cc","cntrl","Currency_Symbol","Sc","Dash_Punctuation","Pd","Decimal_Number","Nd","digit","Enclosing_Mark","Me","Final_Punctuation","Pf","Format","Cf","Initial_Punctuation","Pi","Letter","L","Letter_Number","Nl","Line_Separator","Zl","Lowercase_Letter","Ll","Mark","M","Combining_Mark","Math_Symbol","Sm","Modifier_Letter","Lm","Modifier_Symbol","Sk","Nonspacing_Mark","Mn","Number","N","Open_Punctuation","Ps","Other","C","Other_Letter","Lo","Other_Number","No","Other_Punctuation","Po","Other_Symbol","So","Paragraph_Separator","Zp","Private_Use","Co","Punctuation","P","punct","Separator","Z","Space_Separator","Zs","Spacing_Mark","Mc","Surrogate","Cs","Symbol","S","Titlecase_Letter","Lt","Unassigned","Cn","Uppercase_Letter","Lu"],Script:["Adlam","Adlm","Ahom","Anatolian_Hieroglyphs","Hluw","Arabic","Arab","Armenian","Armn","Avestan","Avst","Balinese","Bali","Bamum","Bamu","Bassa_Vah","Bass","Batak","Batk","Bengali","Beng","Bhaiksuki","Bhks","Bopomofo","Bopo","Brahmi","Brah","Braille","Brai","Buginese","Bugi","Buhid","Buhd","Canadian_Aboriginal","Cans","Carian","Cari","Caucasian_Albanian","Aghb","Chakma","Cakm","Cham","Cherokee","Cher","Common","Zyyy","Coptic","Copt","Qaac","Cuneiform","Xsux","Cypriot","Cprt","Cyrillic","Cyrl","Deseret","Dsrt","Devanagari","Deva","Duployan","Dupl","Egyptian_Hieroglyphs","Egyp","Elbasan","Elba","Ethiopic","Ethi","Georgian","Geor","Glagolitic","Glag","Gothic","Goth","Grantha","Gran","Greek","Grek","Gujarati","Gujr","Gurmukhi","Guru","Han","Hani","Hangul","Hang","Hanunoo","Hano","Hatran","Hatr","Hebrew","Hebr","Hiragana","Hira","Imperial_Aramaic","Armi","Inherited","Zinh","Qaai","Inscriptional_Pahlavi","Phli","Inscriptional_Parthian","Prti","Javanese","Java","Kaithi","Kthi","Kannada","Knda","Katakana","Kana","Kayah_Li","Kali","Kharoshthi","Khar","Khmer","Khmr","Khojki","Khoj","Khudawadi","Sind","Lao","Laoo","Latin","Latn","Lepcha","Lepc","Limbu","Limb","Linear_A","Lina","Linear_B","Linb","Lisu","Lycian","Lyci","Lydian","Lydi","Mahajani","Mahj","Malayalam","Mlym","Mandaic","Mand","Manichaean","Mani","Marchen","Marc","Masaram_Gondi","Gonm","Meetei_Mayek","Mtei","Mende_Kikakui","Mend","Meroitic_Cursive","Merc","Meroitic_Hieroglyphs","Mero","Miao","Plrd","Modi","Mongolian","Mong","Mro","Mroo","Multani","Mult","Myanmar","Mymr","Nabataean","Nbat","New_Tai_Lue","Talu","Newa","Nko","Nkoo","Nushu","Nshu","Ogham","Ogam","Ol_Chiki","Olck","Old_Hungarian","Hung","Old_Italic","Ital","Old_North_Arabian","Narb","Old_Permic","Perm","Old_Persian","Xpeo","Old_South_Arabian","Sarb","Old_Turkic","Orkh","Oriya","Orya","Osage","Osge","Osmanya","Osma","Pahawh_Hmong","Hmng","Palmyrene","Palm","Pau_Cin_Hau","Pauc","Phags_Pa","Phag","Phoenician","Phnx","Psalter_Pahlavi","Phlp","Rejang","Rjng","Runic","Runr","Samaritan","Samr","Saurashtra","Saur","Sharada","Shrd","Shavian","Shaw","Siddham","Sidd","SignWriting","Sgnw","Sinhala","Sinh","Sora_Sompeng","Sora","Soyombo","Soyo","Sundanese","Sund","Syloti_Nagri","Sylo","Syriac","Syrc","Tagalog","Tglg","Tagbanwa","Tagb","Tai_Le","Tale","Tai_Tham","Lana","Tai_Viet","Tavt","Takri","Takr","Tamil","Taml","Tangut","Tang","Telugu","Telu","Thaana","Thaa","Thai","Tibetan","Tibt","Tifinagh","Tfng","Tirhuta","Tirh","Ugaritic","Ugar","Vai","Vaii","Warang_Citi","Wara","Yi","Yiii","Zanabazar_Square","Zanb"]};Array.prototype.push.apply(rt.$LONE,rt.General_Category),rt.gc=rt.General_Category,rt.sc=rt.Script_Extensions=rt.scx=rt.Script;var at=M.prototype,nt=function(t){this.parser=t,this.validFlags="gim"+(t.options.ecmaVersion>=6?"uy":"")+(t.options.ecmaVersion>=9?"s":""),this.source="",this.flags="",this.start=0,this.switchU=!1,this.switchN=!1,this.pos=0,this.lastIntValue=0,this.lastStringValue="",this.lastAssertionIsQuantifiable=!1,this.numCapturingParens=0,this.maxBackReference=0,this.groupNames=[],this.backReferenceNames=[]};function ot(t){return t<=65535?String.fromCharCode(t):(t-=65536,String.fromCharCode(55296+(t>>10),56320+(1023&t)))}function ht(t){return 36===t||t>=40&&t<=43||46===t||63===t||t>=91&&t<=94||t>=123&&t<=125}function pt(t){return t>=65&&t<=90||t>=97&&t<=122}function ct(t){return pt(t)||95===t}function ut(t){return t>=48&&t<=57}function lt(t){return t>=48&&t<=57||t>=65&&t<=70||t>=97&&t<=102}function dt(t){return t>=65&&t<=70?t-65+10:t>=97&&t<=102?t-97+10:t-48}function ft(t){return t>=48&&t<=55}nt.prototype.reset=function(t,e,i){var s=-1!==i.indexOf("u");this.start=0|t,this.source=e+"",this.flags=i,this.switchU=s&&this.parser.options.ecmaVersion>=6,this.switchN=s&&this.parser.options.ecmaVersion>=9},nt.prototype.raise=function(t){this.parser.raiseRecoverable(this.start,"Invalid regular expression: /"+this.source+"/: "+t)},nt.prototype.at=function(t){var e=this.source,i=e.length;if(t>=i)return-1;var s=e.charCodeAt(t);return!this.switchU||s<=55295||s>=57344||t+1>=i?s:(s<<10)+e.charCodeAt(t+1)-56613888},nt.prototype.nextIndex=function(t){var e=this.source,i=e.length;if(t>=i)return i;var s=e.charCodeAt(t);return!this.switchU||s<=55295||s>=57344||t+1>=i?t+1:t+2},nt.prototype.current=function(){return this.at(this.pos)},nt.prototype.lookahead=function(){return this.at(this.nextIndex(this.pos))},nt.prototype.advance=function(){this.pos=this.nextIndex(this.pos)},nt.prototype.eat=function(t){return this.current()===t&&(this.advance(),!0)},at.validateRegExpFlags=function(t){for(var e=t.validFlags,i=t.flags,s=0;s<i.length;s++){var r=i.charAt(s);-1==e.indexOf(r)&&this.raise(t.start,"Invalid regular expression flag"),i.indexOf(r,s+1)>-1&&this.raise(t.start,"Duplicate regular expression flag")}},at.validateRegExpPattern=function(t){this.regexp_pattern(t),!t.switchN&&this.options.ecmaVersion>=9&&t.groupNames.length>0&&(t.switchN=!0,this.regexp_pattern(t))},at.regexp_pattern=function(t){t.pos=0,t.lastIntValue=0,t.lastStringValue="",t.lastAssertionIsQuantifiable=!1,t.numCapturingParens=0,t.maxBackReference=0,t.groupNames.length=0,t.backReferenceNames.length=0,this.regexp_disjunction(t),t.pos!==t.source.length&&(t.eat(41)&&t.raise("Unmatched ')'"),(t.eat(93)||t.eat(125))&&t.raise("Lone quantifier brackets")),t.maxBackReference>t.numCapturingParens&&t.raise("Invalid escape");for(var e=0,i=t.backReferenceNames;e<i.length;e+=1){var s=i[e];-1===t.groupNames.indexOf(s)&&t.raise("Invalid named capture referenced")}},at.regexp_disjunction=function(t){for(this.regexp_alternative(t);t.eat(124);)this.regexp_alternative(t);this.regexp_eatQuantifier(t,!0)&&t.raise("Nothing to repeat"),t.eat(123)&&t.raise("Lone quantifier brackets")},at.regexp_alternative=function(t){for(;t.pos<t.source.length&&this.regexp_eatTerm(t););},at.regexp_eatTerm=function(t){return this.regexp_eatAssertion(t)?(t.lastAssertionIsQuantifiable&&this.regexp_eatQuantifier(t)&&t.switchU&&t.raise("Invalid quantifier"),!0):!(t.switchU?!this.regexp_eatAtom(t):!this.regexp_eatExtendedAtom(t))&&(this.regexp_eatQuantifier(t),!0)},at.regexp_eatAssertion=function(t){var e=t.pos;if(t.lastAssertionIsQuantifiable=!1,t.eat(94)||t.eat(36))return!0;if(t.eat(92)){if(t.eat(66)||t.eat(98))return!0;t.pos=e}if(t.eat(40)&&t.eat(63)){var i=!1;if(this.options.ecmaVersion>=9&&(i=t.eat(60)),t.eat(61)||t.eat(33))return this.regexp_disjunction(t),t.eat(41)||t.raise("Unterminated group"),t.lastAssertionIsQuantifiable=!i,!0}return t.pos=e,!1},at.regexp_eatQuantifier=function(t,e){return void 0===e&&(e=!1),!!this.regexp_eatQuantifierPrefix(t,e)&&(t.eat(63),!0)},at.regexp_eatQuantifierPrefix=function(t,e){return t.eat(42)||t.eat(43)||t.eat(63)||this.regexp_eatBracedQuantifier(t,e)},at.regexp_eatBracedQuantifier=function(t,e){var i=t.pos;if(t.eat(123)){var s=0,r=-1;if(this.regexp_eatDecimalDigits(t)&&(s=t.lastIntValue,t.eat(44)&&this.regexp_eatDecimalDigits(t)&&(r=t.lastIntValue),t.eat(125)))return-1!==r&&r<s&&!e&&t.raise("numbers out of order in {} quantifier"),!0;t.switchU&&!e&&t.raise("Incomplete quantifier"),t.pos=i}return!1},at.regexp_eatAtom=function(t){return this.regexp_eatPatternCharacters(t)||t.eat(46)||this.regexp_eatReverseSolidusAtomEscape(t)||this.regexp_eatCharacterClass(t)||this.regexp_eatUncapturingGroup(t)||this.regexp_eatCapturingGroup(t)},at.regexp_eatReverseSolidusAtomEscape=function(t){var e=t.pos;if(t.eat(92)){if(this.regexp_eatAtomEscape(t))return!0;t.pos=e}return!1},at.regexp_eatUncapturingGroup=function(t){var e=t.pos;if(t.eat(40)){if(t.eat(63)&&t.eat(58)){if(this.regexp_disjunction(t),t.eat(41))return!0;t.raise("Unterminated group")}t.pos=e}return!1},at.regexp_eatCapturingGroup=function(t){if(t.eat(40)){if(this.options.ecmaVersion>=9?this.regexp_groupSpecifier(t):63===t.current()&&t.raise("Invalid group"),this.regexp_disjunction(t),t.eat(41))return t.numCapturingParens+=1,!0;t.raise("Unterminated group")}return!1},at.regexp_eatExtendedAtom=function(t){return t.eat(46)||this.regexp_eatReverseSolidusAtomEscape(t)||this.regexp_eatCharacterClass(t)||this.regexp_eatUncapturingGroup(t)||this.regexp_eatCapturingGroup(t)||this.regexp_eatInvalidBracedQuantifier(t)||this.regexp_eatExtendedPatternCharacter(t)},at.regexp_eatInvalidBracedQuantifier=function(t){return this.regexp_eatBracedQuantifier(t,!0)&&t.raise("Nothing to repeat"),!1},at.regexp_eatSyntaxCharacter=function(t){var e=t.current();return!!ht(e)&&(t.lastIntValue=e,t.advance(),!0)},at.regexp_eatPatternCharacters=function(t){for(var e=t.pos,i=0;-1!==(i=t.current())&&!ht(i);)t.advance();return t.pos!==e},at.regexp_eatExtendedPatternCharacter=function(t){var e=t.current();return!(-1===e||36===e||e>=40&&e<=43||46===e||63===e||91===e||94===e||124===e)&&(t.advance(),!0)},at.regexp_groupSpecifier=function(t){if(t.eat(63)){if(this.regexp_eatGroupName(t))return-1!==t.groupNames.indexOf(t.lastStringValue)&&t.raise("Duplicate capture group name"),void t.groupNames.push(t.lastStringValue);t.raise("Invalid group")}},at.regexp_eatGroupName=function(t){if(t.lastStringValue="",t.eat(60)){if(this.regexp_eatRegExpIdentifierName(t)&&t.eat(62))return!0;t.raise("Invalid capture group name")}return!1},at.regexp_eatRegExpIdentifierName=function(t){if(t.lastStringValue="",this.regexp_eatRegExpIdentifierStart(t)){for(t.lastStringValue+=ot(t.lastIntValue);this.regexp_eatRegExpIdentifierPart(t);)t.lastStringValue+=ot(t.lastIntValue);return!0}return!1},at.regexp_eatRegExpIdentifierStart=function(t){var e,i=t.pos,s=t.current();return t.advance(),92===s&&this.regexp_eatRegExpUnicodeEscapeSequence(t)&&(s=t.lastIntValue),l(e=s,!0)||36===e||95===e?(t.lastIntValue=s,!0):(t.pos=i,!1)},at.regexp_eatRegExpIdentifierPart=function(t){var e,i=t.pos,s=t.current();return t.advance(),92===s&&this.regexp_eatRegExpUnicodeEscapeSequence(t)&&(s=t.lastIntValue),d(e=s,!0)||36===e||95===e||8204===e||8205===e?(t.lastIntValue=s,!0):(t.pos=i,!1)},at.regexp_eatAtomEscape=function(t){return!!(this.regexp_eatBackReference(t)||this.regexp_eatCharacterClassEscape(t)||this.regexp_eatCharacterEscape(t)||t.switchN&&this.regexp_eatKGroupName(t))||(t.switchU&&(99===t.current()&&t.raise("Invalid unicode escape"),t.raise("Invalid escape")),!1)},at.regexp_eatBackReference=function(t){var e=t.pos;if(this.regexp_eatDecimalEscape(t)){var i=t.lastIntValue;if(t.switchU)return i>t.maxBackReference&&(t.maxBackReference=i),!0;if(i<=t.numCapturingParens)return!0;t.pos=e}return!1},at.regexp_eatKGroupName=function(t){if(t.eat(107)){if(this.regexp_eatGroupName(t))return t.backReferenceNames.push(t.lastStringValue),!0;t.raise("Invalid named reference")}return!1},at.regexp_eatCharacterEscape=function(t){return this.regexp_eatControlEscape(t)||this.regexp_eatCControlLetter(t)||this.regexp_eatZero(t)||this.regexp_eatHexEscapeSequence(t)||this.regexp_eatRegExpUnicodeEscapeSequence(t)||!t.switchU&&this.regexp_eatLegacyOctalEscapeSequence(t)||this.regexp_eatIdentityEscape(t)},at.regexp_eatCControlLetter=function(t){var e=t.pos;if(t.eat(99)){if(this.regexp_eatControlLetter(t))return!0;t.pos=e}return!1},at.regexp_eatZero=function(t){return 48===t.current()&&!ut(t.lookahead())&&(t.lastIntValue=0,t.advance(),!0)},at.regexp_eatControlEscape=function(t){var e=t.current();return 116===e?(t.lastIntValue=9,t.advance(),!0):110===e?(t.lastIntValue=10,t.advance(),!0):118===e?(t.lastIntValue=11,t.advance(),!0):102===e?(t.lastIntValue=12,t.advance(),!0):114===e&&(t.lastIntValue=13,t.advance(),!0)},at.regexp_eatControlLetter=function(t){var e=t.current();return!!pt(e)&&(t.lastIntValue=e%32,t.advance(),!0)},at.regexp_eatRegExpUnicodeEscapeSequence=function(t){var e,i=t.pos;if(t.eat(117)){if(this.regexp_eatFixedHexDigits(t,4)){var s=t.lastIntValue;if(t.switchU&&s>=55296&&s<=56319){var r=t.pos;if(t.eat(92)&&t.eat(117)&&this.regexp_eatFixedHexDigits(t,4)){var a=t.lastIntValue;if(a>=56320&&a<=57343)return t.lastIntValue=1024*(s-55296)+(a-56320)+65536,!0}t.pos=r,t.lastIntValue=s}return!0}if(t.switchU&&t.eat(123)&&this.regexp_eatHexDigits(t)&&t.eat(125)&&((e=t.lastIntValue)>=0&&e<=1114111))return!0;t.switchU&&t.raise("Invalid unicode escape"),t.pos=i}return!1},at.regexp_eatIdentityEscape=function(t){if(t.switchU)return!!this.regexp_eatSyntaxCharacter(t)||!!t.eat(47)&&(t.lastIntValue=47,!0);var e=t.current();return!(99===e||t.switchN&&107===e)&&(t.lastIntValue=e,t.advance(),!0)},at.regexp_eatDecimalEscape=function(t){t.lastIntValue=0;var e=t.current();if(e>=49&&e<=57){do{t.lastIntValue=10*t.lastIntValue+(e-48),t.advance()}while((e=t.current())>=48&&e<=57);return!0}return!1},at.regexp_eatCharacterClassEscape=function(t){var e,i=t.current();if(100===(e=i)||68===e||115===e||83===e||119===e||87===e)return t.lastIntValue=-1,t.advance(),!0;if(t.switchU&&this.options.ecmaVersion>=9&&(80===i||112===i)){if(t.lastIntValue=-1,t.advance(),t.eat(123)&&this.regexp_eatUnicodePropertyValueExpression(t)&&t.eat(125))return!0;t.raise("Invalid property name")}return!1},at.regexp_eatUnicodePropertyValueExpression=function(t){var e=t.pos;if(this.regexp_eatUnicodePropertyName(t)&&t.eat(61)){var i=t.lastStringValue;if(this.regexp_eatUnicodePropertyValue(t)){var s=t.lastStringValue;return this.regexp_validateUnicodePropertyNameAndValue(t,i,s),!0}}if(t.pos=e,this.regexp_eatLoneUnicodePropertyNameOrValue(t)){var r=t.lastStringValue;return this.regexp_validateUnicodePropertyNameOrValue(t,r),!0}return!1},at.regexp_validateUnicodePropertyNameAndValue=function(t,e,i){rt.hasOwnProperty(e)&&-1!==rt[e].indexOf(i)||t.raise("Invalid property name")},at.regexp_validateUnicodePropertyNameOrValue=function(t,e){-1===rt.$LONE.indexOf(e)&&t.raise("Invalid property name")},at.regexp_eatUnicodePropertyName=function(t){var e=0;for(t.lastStringValue="";ct(e=t.current());)t.lastStringValue+=ot(e),t.advance();return""!==t.lastStringValue},at.regexp_eatUnicodePropertyValue=function(t){var e,i=0;for(t.lastStringValue="";ct(e=i=t.current())||ut(e);)t.lastStringValue+=ot(i),t.advance();return""!==t.lastStringValue},at.regexp_eatLoneUnicodePropertyNameOrValue=function(t){return this.regexp_eatUnicodePropertyValue(t)},at.regexp_eatCharacterClass=function(t){if(t.eat(91)){if(t.eat(94),this.regexp_classRanges(t),t.eat(93))return!0;t.raise("Unterminated character class")}return!1},at.regexp_classRanges=function(t){for(;this.regexp_eatClassAtom(t);){var e=t.lastIntValue;if(t.eat(45)&&this.regexp_eatClassAtom(t)){var i=t.lastIntValue;!t.switchU||-1!==e&&-1!==i||t.raise("Invalid character class"),-1!==e&&-1!==i&&e>i&&t.raise("Range out of order in character class")}}},at.regexp_eatClassAtom=function(t){var e=t.pos;if(t.eat(92)){if(this.regexp_eatClassEscape(t))return!0;if(t.switchU){var i=t.current();(99===i||ft(i))&&t.raise("Invalid class escape"),t.raise("Invalid escape")}t.pos=e}var s=t.current();return 93!==s&&(t.lastIntValue=s,t.advance(),!0)},at.regexp_eatClassEscape=function(t){var e=t.pos;if(t.eat(98))return t.lastIntValue=8,!0;if(t.switchU&&t.eat(45))return t.lastIntValue=45,!0;if(!t.switchU&&t.eat(99)){if(this.regexp_eatClassControlLetter(t))return!0;t.pos=e}return this.regexp_eatCharacterClassEscape(t)||this.regexp_eatCharacterEscape(t)},at.regexp_eatClassControlLetter=function(t){var e=t.current();return!(!ut(e)&&95!==e)&&(t.lastIntValue=e%32,t.advance(),!0)},at.regexp_eatHexEscapeSequence=function(t){var e=t.pos;if(t.eat(120)){if(this.regexp_eatFixedHexDigits(t,2))return!0;t.switchU&&t.raise("Invalid escape"),t.pos=e}return!1},at.regexp_eatDecimalDigits=function(t){var e=t.pos,i=0;for(t.lastIntValue=0;ut(i=t.current());)t.lastIntValue=10*t.lastIntValue+(i-48),t.advance();return t.pos!==e},at.regexp_eatHexDigits=function(t){var e=t.pos,i=0;for(t.lastIntValue=0;lt(i=t.current());)t.lastIntValue=16*t.lastIntValue+dt(i),t.advance();return t.pos!==e},at.regexp_eatLegacyOctalEscapeSequence=function(t){if(this.regexp_eatOctalDigit(t)){var e=t.lastIntValue;if(this.regexp_eatOctalDigit(t)){var i=t.lastIntValue;e<=3&&this.regexp_eatOctalDigit(t)?t.lastIntValue=64*e+8*i+t.lastIntValue:t.lastIntValue=8*e+i}else t.lastIntValue=e;return!0}return!1},at.regexp_eatOctalDigit=function(t){var e=t.current();return ft(e)?(t.lastIntValue=e-48,t.advance(),!0):(t.lastIntValue=0,!1)},at.regexp_eatFixedHexDigits=function(t,e){var i=t.pos;t.lastIntValue=0;for(var s=0;s<e;++s){var r=t.current();if(!lt(r))return t.pos=i,!1;t.lastIntValue=16*t.lastIntValue+dt(r),t.advance()}return!0};var mt=function(t){this.type=t.type,this.value=t.value,this.start=t.start,this.end=t.end,t.options.locations&&(this.loc=new T(t,t.startLoc,t.endLoc)),t.options.ranges&&(this.range=[t.start,t.end])},xt=M.prototype;function gt(t){return t<=65535?String.fromCharCode(t):(t-=65536,String.fromCharCode(55296+(t>>10),56320+(1023&t)))}xt.next=function(){this.options.onToken&&this.options.onToken(new mt(this)),this.lastTokEnd=this.end,this.lastTokStart=this.start,this.lastTokEndLoc=this.endLoc,this.lastTokStartLoc=this.startLoc,this.nextToken()},xt.getToken=function(){return this.next(),new mt(this)},"undefined"!=typeof Symbol&&(xt[Symbol.iterator]=function(){var t=this;return{next:function(){var e=t.getToken();return{done:e.type===_.eof,value:e}}}}),xt.curContext=function(){return this.context[this.context.length-1]},xt.nextToken=function(){var t=this.curContext();return t&&t.preserveSpace||this.skipSpace(),this.start=this.pos,this.options.locations&&(this.startLoc=this.curPosition()),this.pos>=this.input.length?this.finishToken(_.eof):t.override?t.override(this):void this.readToken(this.fullCharCodeAtPos())},xt.readToken=function(t){return l(t,this.options.ecmaVersion>=6)||92===t?this.readWord():this.getTokenFromCode(t)},xt.fullCharCodeAtPos=function(){var t=this.input.charCodeAt(this.pos);return t<=55295||t>=57344?t:(t<<10)+this.input.charCodeAt(this.pos+1)-56613888},xt.skipBlockComment=function(){var t,e=this.options.onComment&&this.curPosition(),i=this.pos,s=this.input.indexOf("*/",this.pos+=2);if(-1===s&&this.raise(this.pos-2,"Unterminated comment"),this.pos=s+2,this.options.locations)for(k.lastIndex=i;(t=k.exec(this.input))&&t.index<this.pos;)++this.curLine,this.lineStart=t.index+t[0].length;this.options.onComment&&this.options.onComment(!0,this.input.slice(i+2,s),i,this.pos,e,this.curPosition())},xt.skipLineComment=function(t){for(var e=this.pos,i=this.options.onComment&&this.curPosition(),s=this.input.charCodeAt(this.pos+=t);this.pos<this.input.length&&!C(s);)s=this.input.charCodeAt(++this.pos);this.options.onComment&&this.options.onComment(!1,this.input.slice(e+t,this.pos),e,this.pos,i,this.curPosition())},xt.skipSpace=function(){var t=this;t:for(;this.pos<this.input.length;){var e=t.input.charCodeAt(t.pos);switch(e){case 32:case 160:++t.pos;break;case 13:10===t.input.charCodeAt(t.pos+1)&&++t.pos;case 10:case 8232:case 8233:++t.pos,t.options.locations&&(++t.curLine,t.lineStart=t.pos);break;case 47:switch(t.input.charCodeAt(t.pos+1)){case 42:t.skipBlockComment();break;case 47:t.skipLineComment(2);break;default:break t}break;default:if(!(e>8&&e<14||e>=5760&&S.test(String.fromCharCode(e))))break t;++t.pos}}},xt.finishToken=function(t,e){this.end=this.pos,this.options.locations&&(this.endLoc=this.curPosition());var i=this.type;this.type=t,this.value=e,this.updateContext(i)},xt.readToken_dot=function(){var t=this.input.charCodeAt(this.pos+1);if(t>=48&&t<=57)return this.readNumber(!0);var e=this.input.charCodeAt(this.pos+2);return this.options.ecmaVersion>=6&&46===t&&46===e?(this.pos+=3,this.finishToken(_.ellipsis)):(++this.pos,this.finishToken(_.dot))},xt.readToken_slash=function(){var t=this.input.charCodeAt(this.pos+1);return this.exprAllowed?(++this.pos,this.readRegexp()):61===t?this.finishOp(_.assign,2):this.finishOp(_.slash,1)},xt.readToken_mult_modulo_exp=function(t){var e=this.input.charCodeAt(this.pos+1),i=1,s=42===t?_.star:_.modulo;return this.options.ecmaVersion>=7&&42==t&&42===e&&(++i,s=_.starstar,e=this.input.charCodeAt(this.pos+2)),61===e?this.finishOp(_.assign,i+1):this.finishOp(s,i)},xt.readToken_pipe_amp=function(t){var e=this.input.charCodeAt(this.pos+1);return e===t?this.finishOp(124===t?_.logicalOR:_.logicalAND,2):61===e?this.finishOp(_.assign,2):this.finishOp(124===t?_.bitwiseOR:_.bitwiseAND,1)},xt.readToken_caret=function(){return 61===this.input.charCodeAt(this.pos+1)?this.finishOp(_.assign,2):this.finishOp(_.bitwiseXOR,1)},xt.readToken_plus_min=function(t){var e=this.input.charCodeAt(this.pos+1);return e===t?45!=e||this.inModule||62!=this.input.charCodeAt(this.pos+2)||0!==this.lastTokEnd&&!b.test(this.input.slice(this.lastTokEnd,this.pos))?this.finishOp(_.incDec,2):(this.skipLineComment(3),this.skipSpace(),this.nextToken()):61===e?this.finishOp(_.assign,2):this.finishOp(_.plusMin,1)},xt.readToken_lt_gt=function(t){var e=this.input.charCodeAt(this.pos+1),i=1;return e===t?(i=62===t&&62===this.input.charCodeAt(this.pos+2)?3:2,61===this.input.charCodeAt(this.pos+i)?this.finishOp(_.assign,i+1):this.finishOp(_.bitShift,i)):33!=e||60!=t||this.inModule||45!=this.input.charCodeAt(this.pos+2)||45!=this.input.charCodeAt(this.pos+3)?(61===e&&(i=2),this.finishOp(_.relational,i)):(this.skipLineComment(4),this.skipSpace(),this.nextToken())},xt.readToken_eq_excl=function(t){var e=this.input.charCodeAt(this.pos+1);return 61===e?this.finishOp(_.equality,61===this.input.charCodeAt(this.pos+2)?3:2):61===t&&62===e&&this.options.ecmaVersion>=6?(this.pos+=2,this.finishToken(_.arrow)):this.finishOp(61===t?_.eq:_.prefix,1)},xt.getTokenFromCode=function(t){switch(t){case 46:return this.readToken_dot();case 40:return++this.pos,this.finishToken(_.parenL);case 41:return++this.pos,this.finishToken(_.parenR);case 59:return++this.pos,this.finishToken(_.semi);case 44:return++this.pos,this.finishToken(_.comma);case 91:return++this.pos,this.finishToken(_.bracketL);case 93:return++this.pos,this.finishToken(_.bracketR);case 123:return++this.pos,this.finishToken(_.braceL);case 125:return++this.pos,this.finishToken(_.braceR);case 58:return++this.pos,this.finishToken(_.colon);case 63:return++this.pos,this.finishToken(_.question);case 96:if(this.options.ecmaVersion<6)break;return++this.pos,this.finishToken(_.backQuote);case 48:var e=this.input.charCodeAt(this.pos+1);if(120===e||88===e)return this.readRadixNumber(16);if(this.options.ecmaVersion>=6){if(111===e||79===e)return this.readRadixNumber(8);if(98===e||66===e)return this.readRadixNumber(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1);case 34:case 39:return this.readString(t);case 47:return this.readToken_slash();case 37:case 42:return this.readToken_mult_modulo_exp(t);case 124:case 38:return this.readToken_pipe_amp(t);case 94:return this.readToken_caret();case 43:case 45:return this.readToken_plus_min(t);case 60:case 62:return this.readToken_lt_gt(t);case 61:case 33:return this.readToken_eq_excl(t);case 126:return this.finishOp(_.prefix,1)}this.raise(this.pos,"Unexpected character '"+gt(t)+"'")},xt.finishOp=function(t,e){var i=this.input.slice(this.pos,this.pos+e);return this.pos+=e,this.finishToken(t,i)},xt.readRegexp=function(){for(var t,e,i=this,s=this.pos;;){i.pos>=i.input.length&&i.raise(s,"Unterminated regular expression");var r=i.input.charAt(i.pos);if(b.test(r)&&i.raise(s,"Unterminated regular expression"),t)t=!1;else{if("["===r)e=!0;else if("]"===r&&e)e=!1;else if("/"===r&&!e)break;t="\\"===r}++i.pos}var a=this.input.slice(s,this.pos);++this.pos;var n=this.pos,o=this.readWord1();this.containsEsc&&this.unexpected(n);var h=this.regexpState||(this.regexpState=new nt(this));h.reset(s,a,o),this.validateRegExpFlags(h),this.validateRegExpPattern(h);var p=null;try{p=new RegExp(a,o)}catch(t){}return this.finishToken(_.regexp,{pattern:a,flags:o,value:p})},xt.readInt=function(t,e){for(var i=this.pos,s=0,r=0,a=null==e?1/0:e;r<a;++r){var n=this.input.charCodeAt(this.pos),o=void 0;if((o=n>=97?n-97+10:n>=65?n-65+10:n>=48&&n<=57?n-48:1/0)>=t)break;++this.pos,s=s*t+o}return this.pos===i||null!=e&&this.pos-i!==e?null:s},xt.readRadixNumber=function(t){this.pos+=2;var e=this.readInt(t);return null==e&&this.raise(this.start+2,"Expected number in radix "+t),l(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(_.num,e)},xt.readNumber=function(t){var e=this.pos;t||null!==this.readInt(10)||this.raise(e,"Invalid number");var i=this.pos-e>=2&&48===this.input.charCodeAt(e);i&&this.strict&&this.raise(e,"Invalid number"),i&&/[89]/.test(this.input.slice(e,this.pos))&&(i=!1);var s=this.input.charCodeAt(this.pos);46!==s||i||(++this.pos,this.readInt(10),s=this.input.charCodeAt(this.pos)),69!==s&&101!==s||i||(43!==(s=this.input.charCodeAt(++this.pos))&&45!==s||++this.pos,null===this.readInt(10)&&this.raise(e,"Invalid number")),l(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number");var r=this.input.slice(e,this.pos),a=i?parseInt(r,8):parseFloat(r);return this.finishToken(_.num,a)},xt.readCodePoint=function(){var t;if(123===this.input.charCodeAt(this.pos)){this.options.ecmaVersion<6&&this.unexpected();var e=++this.pos;t=this.readHexChar(this.input.indexOf("}",this.pos)-this.pos),++this.pos,t>1114111&&this.invalidStringToken(e,"Code point out of bounds")}else t=this.readHexChar(4);return t},xt.readString=function(t){for(var e=this,i="",s=++this.pos;;){e.pos>=e.input.length&&e.raise(e.start,"Unterminated string constant");var r=e.input.charCodeAt(e.pos);if(r===t)break;92===r?(i+=e.input.slice(s,e.pos),i+=e.readEscapedChar(!1),s=e.pos):(C(r)&&e.raise(e.start,"Unterminated string constant"),++e.pos)}return i+=this.input.slice(s,this.pos++),this.finishToken(_.string,i)};var vt={};xt.tryReadTemplateToken=function(){this.inTemplateElement=!0;try{this.readTmplToken()}catch(t){if(t!==vt)throw t;this.readInvalidTemplateToken()}this.inTemplateElement=!1},xt.invalidStringToken=function(t,e){if(this.inTemplateElement&&this.options.ecmaVersion>=9)throw vt;this.raise(t,e)},xt.readTmplToken=function(){for(var t=this,e="",i=this.pos;;){t.pos>=t.input.length&&t.raise(t.start,"Unterminated template");var s=t.input.charCodeAt(t.pos);if(96===s||36===s&&123===t.input.charCodeAt(t.pos+1))return t.pos!==t.start||t.type!==_.template&&t.type!==_.invalidTemplate?(e+=t.input.slice(i,t.pos),t.finishToken(_.template,e)):36===s?(t.pos+=2,t.finishToken(_.dollarBraceL)):(++t.pos,t.finishToken(_.backQuote));if(92===s)e+=t.input.slice(i,t.pos),e+=t.readEscapedChar(!0),i=t.pos;else if(C(s)){switch(e+=t.input.slice(i,t.pos),++t.pos,s){case 13:10===t.input.charCodeAt(t.pos)&&++t.pos;case 10:e+="\n";break;default:e+=String.fromCharCode(s)}t.options.locations&&(++t.curLine,t.lineStart=t.pos),i=t.pos}else++t.pos}},xt.readInvalidTemplateToken=function(){for(var t=this;this.pos<this.input.length;this.pos++)switch(t.input[t.pos]){case"\\":++t.pos;break;case"$":if("{"!==t.input[t.pos+1])break;case"`":return t.finishToken(_.invalidTemplate,t.input.slice(t.start,t.pos))}this.raise(this.start,"Unterminated template")},xt.readEscapedChar=function(t){var e=this.input.charCodeAt(++this.pos);switch(++this.pos,e){case 110:return"\n";case 114:return"\r";case 120:return String.fromCharCode(this.readHexChar(2));case 117:return gt(this.readCodePoint());case 116:return"\t";case 98:return"\b";case 118:return"\v";case 102:return"\f";case 13:10===this.input.charCodeAt(this.pos)&&++this.pos;case 10:return this.options.locations&&(this.lineStart=this.pos,++this.curLine),"";default:if(e>=48&&e<=55){var i=this.input.substr(this.pos-1,3).match(/^[0-7]+/)[0],s=parseInt(i,8);return s>255&&(i=i.slice(0,-1),s=parseInt(i,8)),this.pos+=i.length-1,e=this.input.charCodeAt(this.pos),"0"===i&&56!=e&&57!=e||!this.strict&&!t||this.invalidStringToken(this.pos-1-i.length,t?"Octal literal in template string":"Octal literal in strict mode"),String.fromCharCode(s)}return String.fromCharCode(e)}},xt.readHexChar=function(t){var e=this.pos,i=this.readInt(16,t);return null===i&&this.invalidStringToken(e,"Bad character escape sequence"),i},xt.readWord1=function(){var t=this;this.containsEsc=!1;for(var e="",i=!0,s=this.pos,r=this.options.ecmaVersion>=6;this.pos<this.input.length;){var a=t.fullCharCodeAtPos();if(d(a,r))t.pos+=a<=65535?1:2;else{if(92!==a)break;t.containsEsc=!0,e+=t.input.slice(s,t.pos);var n=t.pos;117!=t.input.charCodeAt(++t.pos)&&t.invalidStringToken(t.pos,"Expecting Unicode escape sequence \\uXXXX"),++t.pos;var o=t.readCodePoint();(i?l:d)(o,r)||t.invalidStringToken(n,"Invalid Unicode escape"),e+=gt(o),s=t.pos}i=!1}return e+this.input.slice(s,this.pos)},xt.readWord=function(){var t=this.readWord1(),e=_.name;return this.keywords.test(t)&&(this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword "+t),e=v[t]),this.finishToken(e,t)};t.version="5.5.3",t.parse=function(t,e){return new M(e,t).parse()},t.parseExpressionAt=function(t,e,i){var s=new M(i,t,e);return s.nextToken(),s.parseExpression()},t.tokenizer=function(t,e){return new M(e,t)},t.addLooseExports=function(e,i,s){t.parse_dammit=e,t.LooseParser=i,t.pluginsLoose=s},t.Parser=M,t.plugins=B,t.defaultOptions=R,t.Position=N,t.SourceLocation=T,t.getLineInfo=V,t.Node=$,t.TokenType=f,t.tokTypes=_,t.keywordTypes=v,t.TokContext=et,t.tokContexts=it,t.isIdentifierChar=d,t.isIdentifierStart=l,t.Token=mt,t.isNewLine=C,t.lineBreak=b,t.lineBreakG=k,t.nonASCIIwhitespace=S,Object.defineProperty(t,"__esModule",{value:!0})});
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e.acorn=e.acorn||{},e.acorn.walk={}))}(this,function(e){"use strict";function t(e){return"string"==typeof e?function(t){return t==e}:e||function(){return!0}}var n=function(e,t){this.node=e,this.state=t};var r=Object.create||function(e){function t(){}return t.prototype=e,new t};function o(e,t,n){n(e,t)}function i(e,t,n){}var s={};s.Program=s.BlockStatement=function(e,t,n){for(var r=0,o=e.body;r<o.length;r+=1){n(o[r],t,"Statement")}},s.Statement=o,s.EmptyStatement=i,s.ExpressionStatement=s.ParenthesizedExpression=function(e,t,n){return n(e.expression,t,"Expression")},s.IfStatement=function(e,t,n){n(e.test,t,"Expression"),n(e.consequent,t,"Statement"),e.alternate&&n(e.alternate,t,"Statement")},s.LabeledStatement=function(e,t,n){return n(e.body,t,"Statement")},s.BreakStatement=s.ContinueStatement=i,s.WithStatement=function(e,t,n){n(e.object,t,"Expression"),n(e.body,t,"Statement")},s.SwitchStatement=function(e,t,n){n(e.discriminant,t,"Expression");for(var r=0,o=e.cases;r<o.length;r+=1){var i=o[r];i.test&&n(i.test,t,"Expression");for(var s=0,a=i.consequent;s<a.length;s+=1){n(a[s],t,"Statement")}}},s.SwitchCase=function(e,t,n){e.test&&n(e.test,t,"Expression");for(var r=0,o=e.consequent;r<o.length;r+=1){n(o[r],t,"Statement")}},s.ReturnStatement=s.YieldExpression=s.AwaitExpression=function(e,t,n){e.argument&&n(e.argument,t,"Expression")},s.ThrowStatement=s.SpreadElement=function(e,t,n){return n(e.argument,t,"Expression")},s.TryStatement=function(e,t,n){n(e.block,t,"Statement"),e.handler&&n(e.handler,t),e.finalizer&&n(e.finalizer,t,"Statement")},s.CatchClause=function(e,t,n){n(e.param,t,"Pattern"),n(e.body,t,"ScopeBody")},s.WhileStatement=s.DoWhileStatement=function(e,t,n){n(e.test,t,"Expression"),n(e.body,t,"Statement")},s.ForStatement=function(e,t,n){e.init&&n(e.init,t,"ForInit"),e.test&&n(e.test,t,"Expression"),e.update&&n(e.update,t,"Expression"),n(e.body,t,"Statement")},s.ForInStatement=s.ForOfStatement=function(e,t,n){n(e.left,t,"ForInit"),n(e.right,t,"Expression"),n(e.body,t,"Statement")},s.ForInit=function(e,t,n){"VariableDeclaration"==e.type?n(e,t):n(e,t,"Expression")},s.DebuggerStatement=i,s.FunctionDeclaration=function(e,t,n){return n(e,t,"Function")},s.VariableDeclaration=function(e,t,n){for(var r=0,o=e.declarations;r<o.length;r+=1){n(o[r],t)}},s.VariableDeclarator=function(e,t,n){n(e.id,t,"Pattern"),e.init&&n(e.init,t,"Expression")},s.Function=function(e,t,n){e.id&&n(e.id,t,"Pattern");for(var r=0,o=e.params;r<o.length;r+=1){n(o[r],t,"Pattern")}n(e.body,t,e.expression?"ScopeExpression":"ScopeBody")},s.ScopeBody=function(e,t,n){return n(e,t,"Statement")},s.ScopeExpression=function(e,t,n){return n(e,t,"Expression")},s.Pattern=function(e,t,n){"Identifier"==e.type?n(e,t,"VariablePattern"):"MemberExpression"==e.type?n(e,t,"MemberPattern"):n(e,t)},s.VariablePattern=i,s.MemberPattern=o,s.RestElement=function(e,t,n){return n(e.argument,t,"Pattern")},s.ArrayPattern=function(e,t,n){for(var r=0,o=e.elements;r<o.length;r+=1){var i=o[r];i&&n(i,t,"Pattern")}},s.ObjectPattern=function(e,t,n){for(var r=0,o=e.properties;r<o.length;r+=1){var i=o[r];i.computed&&n(i.key,t,"Expression"),n(i.value,t,"Pattern")}},s.Expression=o,s.ThisExpression=s.Super=s.MetaProperty=i,s.ArrayExpression=function(e,t,n){for(var r=0,o=e.elements;r<o.length;r+=1){var i=o[r];i&&n(i,t,"Expression")}},s.ObjectExpression=function(e,t,n){for(var r=0,o=e.properties;r<o.length;r+=1){n(o[r],t)}},s.FunctionExpression=s.ArrowFunctionExpression=s.FunctionDeclaration,s.SequenceExpression=s.TemplateLiteral=function(e,t,n){for(var r=0,o=e.expressions;r<o.length;r+=1){n(o[r],t,"Expression")}},s.UnaryExpression=s.UpdateExpression=function(e,t,n){n(e.argument,t,"Expression")},s.BinaryExpression=s.LogicalExpression=function(e,t,n){n(e.left,t,"Expression"),n(e.right,t,"Expression")},s.AssignmentExpression=s.AssignmentPattern=function(e,t,n){n(e.left,t,"Pattern"),n(e.right,t,"Expression")},s.ConditionalExpression=function(e,t,n){n(e.test,t,"Expression"),n(e.consequent,t,"Expression"),n(e.alternate,t,"Expression")},s.NewExpression=s.CallExpression=function(e,t,n){if(n(e.callee,t,"Expression"),e.arguments)for(var r=0,o=e.arguments;r<o.length;r+=1){n(o[r],t,"Expression")}},s.MemberExpression=function(e,t,n){n(e.object,t,"Expression"),e.computed&&n(e.property,t,"Expression")},s.ExportNamedDeclaration=s.ExportDefaultDeclaration=function(e,t,n){e.declaration&&n(e.declaration,t,"ExportNamedDeclaration"==e.type||e.declaration.id?"Statement":"Expression"),e.source&&n(e.source,t,"Expression")},s.ExportAllDeclaration=function(e,t,n){n(e.source,t,"Expression")},s.ImportDeclaration=function(e,t,n){for(var r=0,o=e.specifiers;r<o.length;r+=1){n(o[r],t)}n(e.source,t,"Expression")},s.ImportSpecifier=s.ImportDefaultSpecifier=s.ImportNamespaceSpecifier=s.Identifier=s.Literal=i,s.TaggedTemplateExpression=function(e,t,n){n(e.tag,t,"Expression"),n(e.quasi,t,"Expression")},s.ClassDeclaration=s.ClassExpression=function(e,t,n){return n(e,t,"Class")},s.Class=function(e,t,n){e.id&&n(e.id,t,"Pattern"),e.superClass&&n(e.superClass,t,"Expression"),n(e.body,t)},s.ClassBody=function(e,t,n){for(var r=0,o=e.body;r<o.length;r+=1){n(o[r],t)}},s.MethodDefinition=s.Property=function(e,t,n){e.computed&&n(e.key,t,"Expression"),n(e.value,t,"Expression")},e.simple=function(t,n,r,o,i){r||(r=e.base),function e(t,o,i){var s=i||t.type,a=n[s];r[s](t,o,e),a&&a(t,o)}(t,o,i)},e.ancestor=function(t,n,r,o){r||(r=e.base);var i=[];!function e(t,o,s){var a=s||t.type,c=n[a],u=t!=i[i.length-1];u&&i.push(t),r[a](t,o,e),c&&c(t,o||i,i),u&&i.pop()}(t,o)},e.recursive=function(t,n,r,o,i){var s=r?e.make(r,o):o;!function e(t,n,r){s[r||t.type](t,n,e)}(t,n,i)},e.full=function(t,n,r,o,i){r||(r=e.base),function e(t,o,i){var s=i||t.type;r[s](t,o,e),i||n(t,o,s)}(t,o,i)},e.fullAncestor=function(t,n,r,o){r||(r=e.base);var i=[];!function e(t,o,s){var a=s||t.type,c=t!=i[i.length-1];c&&i.push(t),r[a](t,o,e),s||n(t,o||i,i,a),c&&i.pop()}(t,o)},e.findNodeAt=function(r,o,i,s,a,c){s=t(s),a||(a=e.base);try{!function e(t,r,c){var u=c||t.type;if((null==o||t.start<=o)&&(null==i||t.end>=i)&&a[u](t,r,e),(null==o||t.start==o)&&(null==i||t.end==i)&&s(u,t))throw new n(t,r)}(r,c)}catch(e){if(e instanceof n)return e;throw e}},e.findNodeAround=function(r,o,i,s,a){i=t(i),s||(s=e.base);try{!function e(t,r,a){var c=a||t.type;if(!(t.start>o||t.end<o)&&(s[c](t,r,e),i(c,t)))throw new n(t,r)}(r,a)}catch(e){if(e instanceof n)return e;throw e}},e.findNodeAfter=function(r,o,i,s,a){i=t(i),s||(s=e.base);try{!function e(t,r,a){if(!(t.end<o)){var c=a||t.type;if(t.start>=o&&i(c,t))throw new n(t,r);s[c](t,r,e)}}(r,a)}catch(e){if(e instanceof n)return e;throw e}},e.findNodeBefore=function(r,o,i,s,a){var c;return i=t(i),s||(s=e.base),function e(t,r,a){if(!(t.start>o)){var u=a||t.type;t.end<=o&&(!c||c.node.end<t.end)&&i(u,t)&&(c=new n(t,r)),s[u](t,r,e)}}(r,a),c},e.make=function(t,n){n||(n=e.base);var o=r(n);for(var i in t)o[i]=t[i];return o},e.base=s,Object.defineProperty(e,"__esModule",{value:!0})});
(function() {
  'use strict';
  var Yma;

  Yma = function() {
    var ComponentScope, HTTP, Router, Scope, callCallbacks, changeRoute, collectTemplatesFromHTML, data, evalInContext, fetchController, fetchTemplate, fillTemplate, fragId, getScope, getScopeVar, hash, http, index, j, len, makeRouteRegex, nodeId, objTypes, readVars, register, renderComponent, renderTemplate, renderVars, repeaterId, router, scope, scopeId, setIndexVar, setRepeaterIndexVar, start, type, updateFrags, view, viewScope, yma;
    yma = {};
    objTypes = ['config', 'service', 'controller', 'component', 'template', 'route'];
    view = null;
    viewScope = null;
    scopeId = 0;
    fragId = 0;
    repeaterId = 0;
    nodeId = 0;
    index = {
      services: {}
    };
    data = {};
    register = {};
    scope = {};
    Scope = function(myscope, _id) {
      var newScope, ref;
      newScope = {
        id: _id || `s${scopeId++}`,
        $root: scope.root,
        $parent: myscope,
        $children: [],
        $callbacks: {
          destroy: []
        },
        $on: function(name, fn) {
          return this.$callbacks[name].push(fn);
        },
        $updating: false,
        $listen: function(vars, refreshFn) {
          //if typeof vars isnt 'array'
          //  vars = [vars]
          return setIndexVar(this, null, null, null, '', vars, refreshFn);
        },
        $update: function(arg) {
          var frag, fragKey, fragsToUpdate, indexScope, indexVar, j, k, key, len, len1, myhash, myvar, ref, refreshFn, repeater, repeaterKey, repeatersToUpdate;
          if (this.$updating) {
            return setTimeout(this.update(args));
          } else {
            this.$updating = true;
            repeatersToUpdate = [];
            fragsToUpdate = [];
            indexScope = index[this.id];
            if (indexScope) {
              for (key in indexScope.vars) {
                indexVar = indexScope.vars[key];
                myvar = getScopeVar(this, key);
                myhash = hash(JSON.stringify(myvar));
                if (myhash !== indexVar.value) {
                  indexVar.value = myhash;
                  for (fragKey in indexVar.frags) {
                    frag = indexScope.frags[fragKey];
                    if (fragsToUpdate.indexOf(frag) === -1) {
                      fragsToUpdate.push(frag);
                    }
                  }
                  for (repeaterKey in indexVar.repeaters) {
                    repeater = indexScope.repeaters[repeaterKey];
                    if (repeatersToUpdate.indexOf(repeater) === -1) {
                      repeatersToUpdate.push(repeater);
                    }
                  }
                  ref = indexVar.refreshFns;
                  for (j = 0, len = ref.length; j < len; j++) {
                    refreshFn = ref[j];
                    refreshFn();
                  }
                }
              }
            }
            for (k = 0, len1 = repeatersToUpdate.length; k < len1; k++) {
              repeater = repeatersToUpdate[k];
              repeater.refreshFn();
            }
            if (fragsToUpdate.length) {
              updateFrags(fragsToUpdate);
            }
            return this.$updating = false;
          }
        },
        $destroy: function() {
          var child, deleteIndexItems, indexScope, noChildren, ref, service;
          callCallbacks(this, 'destroy');
          noChildren = this.$children.length;
          while (noChildren--) {
            child = this.$children[0];
            child.$destroy();
          }
          this.children = void 0;
          delete scope[this.id];
          //find the fragments to delete and 
          indexScope = index[this.id];
          if (indexScope) {
            deleteIndexItems = function(itemKey) {
              var item, key, myvar, results, scopeKey, testScope;
              results = [];
              for (item in indexScope[itemKey]) {
                results.push((function() {
                  var results1;
                  results1 = [];
                  for (scopeKey in index) {
                    if (indexScope.id !== scopeKey) {
                      testScope = index[scopeKey];
                      if (testScope[itemKey]) {
                        delete testScope[itemKey][item];
                        results1.push((function() {
                          var results2;
                          results2 = [];
                          for (key in testScope.vars) {
                            myvar = testScope.vars[key];
                            delete myvar[itemKey][item];
                            if (Object.keys(myvar[itemKey]).length === 0) {
                              results2.push(delete testScope.vars[key]);
                            } else {
                              results2.push(void 0);
                            }
                          }
                          return results2;
                        })());
                      } else {
                        results1.push(void 0);
                      }
                    } else {
                      results1.push(void 0);
                    }
                  }
                  return results1;
                })());
              }
              return results;
            };
            deleteIndexItems('frags');
            deleteIndexItems('repeaters');
          }
          if ((ref = this.$parent.$children) != null) {
            ref.splice(this.$parent.$children.indexOf(this), 1);
          }
          for (service in index.services) {
            if (index.services[service][this.id]) {
              delete index.services[service][this.id];
            }
            if (Object.keys(index.services[service]).length === 0) {
              delete index.services[service];
            }
          }
          return delete index[this.id];
        },
        $use: function(args) {
          var arg, j, len, results;
          if (typeof args === 'string') {
            args = [args];
          }
          results = [];
          for (j = 0, len = args.length; j < len; j++) {
            arg = args[j];
            if (data.service[arg]) {
              this[`_${arg}`] = data.service[arg];
              index.services[arg] = index.services[arg] || {};
              results.push(index.services[arg][this.id] = true);
            } else {
              results.push(void 0);
            }
          }
          return results;
        },
        $inherit: function() {}
      };
      scope[newScope.id] = newScope;
      if (myscope != null) {
        if ((ref = myscope.$children) != null) {
          ref.push(newScope);
        }
      }
      return newScope;
    };
    ComponentScope = function(name) {
      return {
        $name: name,
        $update: function() {
          var myscope, ref, results;
          if (index.services[name]) {
            results = [];
            for (myscope in index.services[name]) {
              results.push((ref = scope[myscope]) != null ? ref.$update() : void 0);
            }
            return results;
          }
        }
      };
    };
    Router = function() {
      var routes;
      routes = [];
      return {
        push: function(route) {
          return routes.push(route);
        },
        get: function(url) {
          var i, j, len, m, outData, outParams, outUrl, testRoute;
          outData = null;
          outParams = {};
          outUrl = null;
          for (j = 0, len = routes.length; j < len; j++) {
            testRoute = routes[j];
            if (m = url.match(testRoute.regex)) {
              outData = testRoute.controller;
              i = 0;
              while (i++ < m.length - 1) {
                outParams[testRoute.params[i - 1]] = m[i];
              }
              break;
            }
            if (testRoute.controller.default) {
              outUrl = testRoute.name;
              outData = testRoute.controller;
              outParams = [];
            }
          }
          if (!outData) {
            outData = data.route['/'];
            outUrl = '/';
          }
          return {
            data: outData,
            params: outParams,
            url: outUrl
          };
        }
      };
    };
    router = Router();
    HTTP = function() {
      var doRequest;
      doRequest = function(method, url, data) {
        return new Promise(function(resolve, reject) {
          var req;
          req = new XMLHttpRequest();
          req.onreadystatechange = function() {
            if (this.readyState === 4) {
              return resolve(this.responseText);
            }
          };
          req.open(method, url, true);
          if (method === 'POST') {
            req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          }
          return req.send(data);
        });
      };
      return {
        get: function(url) {
          if (data.template[url]) {
            return data.template[url];
          }
          return doRequest('GET', url);
        },
        post: function(url, data) {
          return doRequest('POST', url, data);
        }
      };
    };
    http = HTTP();
    Scope({}, 'root');
    scope.root.thing = 'buddy';
    scope.root.testFn = function() {};
    //--------------------------------------
    // UTILITY
    //--------------------------------------
    makeRouteRegex = function(name, route) {
      var params, reg;
      params = [];
      reg = route.replace(/:(\w+)/g, function(all, param) {
        params.push(param);
        return '([^/]+)';
      });
      return router.push({
        regex: new RegExp(reg + '$'),
        params: params,
        controller: data.route[name]
      });
    };
    for (j = 0, len = objTypes.length; j < len; j++) {
      type = objTypes[j];
      data[type] = {};
      (function(type) {
        return yma[type] = function(name, fn) {
          var cScope, k, len1, results, route;
          cScope = ComponentScope(name);
          data[type][name] = fn.call(cScope);
          if (type === 'route') {
            if (typeof name === 'array') {
              results = [];
              for (k = 0, len1 = name.length; k < len1; k++) {
                route = name[k];
                results.push(makeRouteRegex(name, route));
              }
              return results;
            } else {
              return makeRouteRegex(name, name);
            }
          }
        };
      })(type);
    }
    evalInContext = function(str, context) {
      try {
        return (new Function(`with(this) {return ${str}}`)).call(context);
      } catch (error) {}
    };
    hash = function(str) {
      var h, i;
      if (typeof str === 'undefined') {
        return 0;
      }
      h = 5381;
      i = str.length;
      while (i) {
        h = (h * 33) ^ str.charCodeAt(--i);
      }
      return h;
    };
    callCallbacks = function(obj, name) {
      var cb, k, len1, ref, results;
      ref = obj.$callbacks[name];
      results = [];
      for (k = 0, len1 = ref.length; k < len1; k++) {
        cb = ref[k];
        results.push(typeof cb === "function" ? cb() : void 0);
      }
      return results;
    };
    
    //--------------------------------------
    // FETCH 
    //--------------------------------------
    getScopeVar = function(myscope, name) {
      return evalInContext(name, myscope);
    };
    getScope = function(elem) {
      var myscope;
      while (elem && elem.tagName !== 'HTML') {
        if (myscope = elem.getAttribute('scope')) {
          return scope[myscope];
        }
        elem = elem.parentNode;
      }
      return scope.root;
    };
    collectTemplatesFromHTML = function() {
      var k, len1, results, script, scripts;
      scripts = document.getElementsByTagName('SCRIPT');
      results = [];
      for (k = 0, len1 = scripts.length; k < len1; k++) {
        script = scripts[k];
        if (script.type === 'text/template') {
          results.push(yma.template(script.getAttribute('name'), function() {
            return {
              html: script.innerText
            };
          }));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };
    fetchController = async function(arg, myscope) {
      var ctrl;
      if (arg) {
        type = typeof arg;
        if (type === 'function') {
          return (await arg.call(myscope));
        } else if (type === 'string') {
          ctrl = data.controller[arg];
          if (ctrl) {
            return (await ctrl.call(myscope));
          }
        }
      }
      return null;
    };
    fetchTemplate = async function(arg) {
      var name, ref, template;
      name = '';
      if (arg) {
        if (typeof arg === 'object') {
          if (arg.template) {
            name = arg.template;
          } else if (arg.templateUrl) {
            name = arg.templateUrl;
          }
        } else {
          name = arg;
        }
      }
      if (!name) {
        return '';
      }
      template = ((ref = data.template[name]) != null ? ref.html : void 0) || '';
      if (!template) {
        template = (await http.get(name));
        data.template[name] = template;
      }
      return template;
    };
    //--------------------------------------
    // INDEXING
    //--------------------------------------
    setIndexVar = function(myscope, fragId, fragIndex, fragScopeId, template, vars, refreshFn) {
      var frag, indexScope, myfrags, myvars;
      indexScope = index[myscope.id] = index[myscope.id] || {
        frags: {},
        vars: {},
        repeaters: {}
      };
      myvars = indexScope.vars;
      if (fragId) {
        myfrags = indexScope.frags;
        frag = myfrags[fragId] = myfrags[fragId] || {};
        frag = frag[`i${fragIndex}`] = frag[`i${fragIndex}`] || {};
        if (typeof frag.template === 'undefined') {
          frag.template = template;
        }
        frag.vars = frag.vars || {};
        frag.id = fragId;
        frag.index = fragIndex;
        frag.scope = fragScopeId;
      }
      vars.map(function(myvar) {
        var newScope, newVar;
        if (/\$parent|\$root/.test(myvar.route[0])) {
          newVar = JSON.parse(JSON.stringify(myvar));
          newVar.route.splice(0, 1);
          newVar.name = newVar.name.replace(/^(\$parent|\$root)\./, '');
          newScope = myscope[myvar.route[0]];
          if (newScope) {
            return setIndexVar(newScope, fragId, fragIndex, fragScopeId, template, [newVar], refreshFn); //check this
          }
        }
        if (typeof myvars[myvar.name] === 'undefined') {
          myscope[myvar.name] = myscope[myvar.name] || null;
          myvars[myvar.name] = {
            value: hash(JSON.stringify(evalInContext(myvar.name, myscope))),
            route: myvar.route,
            routeStr: myvar.route.join('.'),
            frags: {},
            repeaters: {},
            refreshFns: []
          };
          if (fragId) {
            myvars[myvar.name].frags[fragId] = true;
          }
          if (refreshFn) {
            myvars[myvar.name].refreshFns.push(refreshFn);
          }
        } else {
          if (fragId) {
            if (!myvars[myvar.name].frags[fragId]) {
              myvars[myvar.name].frags[fragId] = true;
            }
          }
          if (refreshFn) {
            myvars[myvar.name].refreshFns.push(refreshFn);
          }
        }
        if (fragId) {
          frag.vars[myvar.name] = true;
        }
        return null;
      });
      return null;
    };
    setRepeaterIndexVar = function(myscope, repeaterId, repeaterScopeId, template, vars, refreshFn) {
      var indexScope, myrepeaters, myvars, repeater;
      indexScope = index[myscope.id] = index[myscope.id] || {
        frags: {},
        vars: {},
        repeaters: {}
      };
      myrepeaters = indexScope.repeaters;
      myvars = indexScope.vars;
      repeater = myrepeaters[repeaterId] = myrepeaters[repeaterId] || {};
      if (typeof repeater.template === 'undefined') {
        repeater.template = template;
      }
      repeater.vars = repeater.vars || {};
      repeater.id = repeaterId;
      repeater.scope = repeaterScopeId;
      repeater.refreshFn = refreshFn;
      return vars.map(function(myvar) {
        var newScope, newVar;
        if (/\$parent|\$root/.test(myvar.route[0])) {
          newVar = JSON.parse(JSON.stringify(myvar));
          newVar.route.splice(0, 1);
          newVar.name = newVar.name.replace(/^(\$parent|\$root)\./, '');
          newScope = myscope[myvar.route[0]];
          if (newScope) {
            return setRepeaterIndexVar(newScope, repeaterId, repeaterScopeId, template, [newVar], refreshFn); //check this
          }
        }
        if (typeof myvars[myvar.name] === 'undefined') {
          myscope[myvar.name] = myscope[myvar.name] || null;
          myvars[myvar.name] = {
            value: hash(JSON.stringify(evalInContext(myvar.name, myscope))),
            route: myvar.route,
            routeStr: myvar.route.join('.'),
            frags: {},
            repeaters: {},
            refreshFns: []
          };
          myvars[myvar.name].repeaters[repeaterId] = true;
        } else {
          if (!myvars[myvar.name].repeaters[repeaterId]) {
            myvars[myvar.name].repeaters[repeaterId] = true;
          }
        }
        return repeater.vars[myvar.name] = true;
      });
    };
    //--------------------------------------
    // TEMPLATE RENDERING
    //--------------------------------------
    Element.prototype.appendAfter = function(element) {
      return element.parentNode.insertBefore(this, element.nextSibling);
    };
    updateFrags = function(fragsToUpdate) {
      var frag, fragElem, fragKey, fragNode, frags, i, myscope, results;
      i = fragsToUpdate.length;
      if (i) {
        results = [];
        while (i--) {
          frags = fragsToUpdate[i];
          results.push((function() {
            var results1;
            results1 = [];
            for (fragKey in frags) {
              frag = frags[fragKey];
              fragElem = document.querySelector(`[frag=${frag.id}]`);
              myscope = getScope(fragElem);
              if (typeof frag.index === 'string') {
                results1.push(fragElem.setAttribute(frag.index, fillTemplate(frag.template, myscope, frag.id, frag.index)));
              } else {
                fragNode = fragElem.childNodes[frag.index];
                results1.push(fragNode.nodeValue = fillTemplate(frag.template, myscope, frag.id, frag.index));
              }
            }
            return results1;
          })());
        }
        return results;
      }
    };
    renderComponent = async function(node, elem, myscope, append) {
      var attribute, className, elemRoot, frag, i, k, len1, newScope, ref, result, temp, template;
      temp = document.createElement('template');
      frag = document.createElement('div');
      if (node.getAttribute('scope')) {
        newScope = getScope(node);
      } else {
        newScope = elem.scope ? Scope(myscope) : myscope;
      }
      newScope.$node = node;
      template = (await renderTemplate((await fetchTemplate(elem)), newScope));
      if (template) {
        frag.innerHTML = template;
      } else {
        frag.innerHTML = node.outerHTML;
      }
      temp.content.appendChild(frag);
      elemRoot = frag.querySelector('*');
      newScope.$elem = elemRoot;
      result = (await fetchController(elem.controller, newScope));
      if (result && typeof result === 'object') {
        if (result.overwrite) {
          if (result.html.length) {
            i = -1;
            while (i++ < result.html.length - 1) {
              frag.innerHTML = result.html[i];
              elemRoot = frag.querySelector('*');
              node.parentNode.insertBefore(elemRoot, node);
            }
            node.remove();
          } else {
            frag.innerHTML = `<div rid='${result.rid}' style='display:none'></div>`;
            elemRoot = frag.querySelector('*');
            node.replaceWith(elemRoot);
          }
          return;
        }
      }
      className = node.className;
      node[append ? 'appendAfter' : 'replaceWith'](elemRoot);
      elemRoot.className += className;
      newScope.$node = elemRoot;
      ref = node.attributes;
      for (k = 0, len1 = ref.length; k < len1; k++) {
        attribute = ref[k];
        if (attribute.name !== elem.name) {
          elemRoot.setAttribute(attribute.name, attribute.value);
        }
      }
      if (elem.scope || node.getAttribute('scope')) {
        elemRoot.setAttribute('scope', newScope.id);
      }
      if (node.getAttribute('rid')) {
        elemRoot.setAttribute('rid', node.getAttribute('rid'));
      }
      return null;
    };
    renderTemplate = async function(template, myscope) {
      var elem, frag, k, l, len1, len2, node, nodes, temp;
      await template;
      temp = document.createElement('template');
      frag = document.createElement('div');
      frag.innerHTML = template;
      temp.content.appendChild(frag);
      for (elem in data.component) {
        nodes = frag.querySelectorAll(elem);
        if (nodes.length) {
          for (k = 0, len1 = nodes.length; k < len1; k++) {
            node = nodes[k];
            await renderComponent(node, data.component[elem], myscope);
          }
        }
        nodes = frag.querySelectorAll(`[${elem}]`);
        if (nodes.length) {
          for (l = 0, len2 = nodes.length; l < len2; l++) {
            node = nodes[l];
            await renderComponent(node, data.component[elem], myscope);
          }
        }
      }
      return frag.innerHTML;
    };
    //--------------------------------------
    // VARIABLE RENDERING
    //--------------------------------------
    renderVars = function(elem, myscope) {
      var attr, attrScope, child, childNode, fId, i, k, l, len1, len2, len3, n, ref, ref1, ref2, results;
      if (attrScope = elem.getAttribute('scope')) {
        myscope = scope[attrScope];
      }
      fId = elem.getAttribute('frag');
      ref = elem.childNodes;
      for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
        childNode = ref[i];
        if (childNode.nodeValue && childNode.nodeValue.indexOf('{{') !== -1) {
          if (!fId) {
            fId = `f${fragId++}`;
            elem.setAttribute('frag', fId);
          }
          childNode.nodeValue = fillTemplate(childNode.nodeValue, myscope, fId, i);
        }
      }
      ref1 = elem.attributes;
      for (l = 0, len2 = ref1.length; l < len2; l++) {
        attr = ref1[l];
        if (attr.value.indexOf('{{') !== -1) {
          if (!fId) {
            fId = `f${fragId++}`;
            elem.setAttribute('frag', fId);
          }
          attr.value = fillTemplate(attr.value, myscope, fId, attr.name);
        } else if (attr.name === 'model') {
          elem.value = fillTemplate(`{{${attr.value}}}`, myscope);
        }
      }
      ref2 = elem.children;
      results = [];
      for (n = 0, len3 = ref2.length; n < len3; n++) {
        child = ref2[n];
        results.push(renderVars(child, myscope));
      }
      return results;
    };
    readVars = function(expression) {
      var ast, context, doWalk, myvar, vars;
      context = {};
      //console.log expression
      ast = acorn.parse(expression);
      vars = [];
      myvar = null;
      doWalk = function(ast) {
        return acorn.walk.full(ast, function(node) {
          var fnargs, fnstart, k, len1, results, v;
          switch (node.type) {
            case 'Identifier':
              myvar = {
                route: [node.name],
                name: node.name,
                start: node.start
              };
              return vars.push(myvar);
            case 'CallExpression':
              fnstart = expression.indexOf('(', node.start);
              fnargs = expression.substr(fnstart, node.end - fnstart);
              results = [];
              for (k = 0, len1 = vars.length; k < len1; k++) {
                v = vars[k];
                if (v.start === node.start) {
                  results.push(v.name += fnargs);
                } else {
                  results.push(void 0);
                }
              }
              return results;
              break;
            case 'MemberExpression':
              if (myvar) {
                if (node.property.type === 'Identifier') {
                  myvar.route.push(node.property.name);
                  return myvar.name += `.${node.property.name}`;
                } else if (node.property.type === 'Literal') {
                  myvar.route.push(`[${node.property.raw}]`);
                  return myvar.name += `[${node.property.raw}]`;
                }
              }
              break;
            case 'AssignmentExpression':
              doWalk(node.left);
              return doWalk(node.right);
          }
        });
      };
      doWalk(ast);
      return vars;
    };
    fillTemplate = function(template, data, fragId, fragIndex) {
      return template.replace(/\{\{(.+?)\}\}/g, function(all, expression) {
        var vars;
        vars = readVars(expression);
        if (typeof fragId !== 'undefined') {
          setIndexVar(data, fragId, fragIndex, data.id, template, vars);
        }
        return evalInContext(expression, data) || '';
      });
    };
    //--------------------------------------

    //--------------------------------------
    changeRoute = async function(state, pop) {
      var nextRoute, nextRouteData;
      view = document.querySelector('view');
      nextRouteData = router.get(state);
      if (nextRouteData.url) {
        state = nextRouteData.url;
      }
      if (!pop) {
        window.history.pushState(state, '', state);
      }
      //tear down current route
      if (nextRouteData && nextRouteData.data) {
        if (viewScope) {
          viewScope.$destroy();
        }
        nextRoute = nextRouteData.data;
        viewScope = Scope(scope.root);
        viewScope.$params = nextRouteData.params;
        fetchController(nextRoute.controller, viewScope);
        view.setAttribute('scope', viewScope.id);
        view.innerHTML = (await renderTemplate((await fetchTemplate(nextRoute)), viewScope));
        return renderVars(view, viewScope);
      }
    };
    start = function() {
      var body, myscope, styles;
      styles = document.createElement('style');
      styles.innerText = '.ymaHide {display:none}';
      document.querySelector('head').append(styles);
      body = document.querySelector('body');
      myscope = scope.root;
      collectTemplatesFromHTML();
      changeRoute(window.location.pathname);
      //--------------------------------------
      // LISTENERS
      //--------------------------------------
      window.addEventListener('click', function(e) {
        myscope = getScope(e.target);
        if (e.target.getAttribute('click')) {
          evalInContext(e.target.getAttribute('click'), myscope);
        }
        if (e.target.tagName === 'A') {
          e.preventDefault();
          e.stopPropagation();
          return changeRoute(e.target.getAttribute('href'));
        }
      });
      window.addEventListener('keyup', function(e) {
        myscope = getScope(e.target);
        if (e.target.getAttribute('model')) {
          evalInContext(`${e.target.getAttribute('model')} = '${e.target.value}'`, myscope);
          myscope.$update();
        }
        if (e.target.getAttribute('keyup')) {
          return console.log(evalInContext(e.target.getAttribute('keyup'), myscope));
        }
      });
      return window.onpopstate = function(event) {
        return changeRoute(event.state, true);
      };
    };
    //--------------------------------------
    // BUILT IN COMPONENTS
    //--------------------------------------
    yma.component('repeat', function() {
      return {
        controller: async function() {
          var elemRoot, expression, html, itemName, makeHtml, rId, refresh, repeatAttr, temp, template, vars;
          rId = `r${repeaterId++}`;
          repeatAttr = this.$node.getAttribute('repeat');
          [expression, itemName] = repeatAttr.split(/\s+by\s+/);
          vars = readVars(expression);
          itemName = itemName || 'item';
          template = this.$node.outerHTML;
          temp = document.createElement('div');
          temp.innerHTML = template;
          elemRoot = temp.querySelector('*');
          elemRoot.removeAttribute('repeat');
          refresh = async() => {
            var elem, elemScope, elems, frag, html, i, k, l, len1, len2, parent;
            elems = document.querySelectorAll(`[rid=${rId}]`);
            for (i = k = 0, len1 = elems.length; k < len1; i = ++k) {
              elem = elems[i];
              elemScope = scope[elem.getAttribute('scope')];
              if (elemScope) {
                elemScope.$destroy();
              }
              if (i > 0) {
                elem.remove();
              }
            }
            html = (await makeHtml());
            frag = document.createElement('div');
            parent = elems[0].parentNode;
            if (html && html.length) {
              for (l = 0, len2 = html.length; l < len2; l++) {
                elem = html[l];
                frag.innerHTML = elem;
                elemRoot = frag.querySelector('*');
                elems[0].parentNode.insertBefore(elemRoot, elems[0]);
              }
            }
            elems[0].remove();
            setRepeaterIndexVar(this, rId, this.id, template, vars, refresh);
            return renderVars(parent, getScope(parent));
          };
          makeHtml = async() => {
            var html, i, item, items, k, len1, myScope;
            temp.innerHTML = template;
            elemRoot = temp.querySelector('*');
            elemRoot.removeAttribute('repeat');
            items = evalInContext(expression, this);
            html = [];
            if (items) {
              for (i = k = 0, len1 = items.length; k < len1; i = ++k) {
                item = items[i];
                myScope = Scope(this);
                myScope.$index = i;
                myScope.$first = i === 0;
                myScope.$last = i === items.length - 1;
                myScope.$even = i % 2 === 1;
                myScope.$odd = i % 2 === 0;
                myScope[itemName] = item;
                elemRoot.setAttribute('scope', myScope.id);
                elemRoot.setAttribute('rid', rId);
                html.push((await renderTemplate(temp.innerHTML, myScope)));
              }
            }
            return html;
          };
          html = (await makeHtml());
          setRepeaterIndexVar(this, rId, this.id, template, vars, refresh);
          return {
            overwrite: true,
            html: html,
            rid: rId
          };
        }
      };
    });
    yma.component('if', function() {
      return {
        controller: function() {
          var expression, vars;
          expression = this.$node.getAttribute('if');
          return vars = readVars(expression);
        }
      };
    });
    yma.component('hide', function() {
      return {
        controller: function() {
          var expression, nId, refresh, vars;
          console.log('hide controller');
          expression = this.$node.getAttribute('hide');
          nId = `n${nodeId++}`;
          this.$node.setAttribute('nid', nId);
          vars = readVars(expression);
          refresh = () => {
            var isHidden, node, result;
            node = document.querySelector(`[nid=${nId}]`) || this.$node;
            result = evalInContext(expression, this);
            isHidden = /\bymaHide\b/.test(node.className);
            if (result) {
              if (!isHidden) {
                return node.className += ' ymaHide';
              }
            } else {
              if (isHidden) {
                return node.className = node.className.replace(/\s*ymaHide\s*/, ' ');
              }
            }
          };
          refresh();
          return this.$listen(vars, refresh);
        }
      };
    });
    yma.component('show', function() {
      return {
        controller: function() {
          var expression, nId, refresh, vars;
          expression = this.$node.getAttribute('show');
          nId = `n${nodeId++}`;
          this.$node.setAttribute('nid', nId);
          vars = readVars(expression);
          refresh = () => {
            var isHidden, node, result;
            node = document.querySelector(`[nid=${nId}]`) || this.$node;
            result = evalInContext(expression, this);
            isHidden = /\bymaHide\b/.test(node.className);
            if (!result) {
              if (!isHidden) {
                return node.className += ' ymaHide';
              }
            } else {
              if (isHidden) {
                return node.className = node.className.replace(/\s*ymaHide\s*/, ' ');
              }
            }
          };
          refresh();
          return this.$listen(vars, refresh);
        }
      };
    });
    window.setTimeout(start);
    return yma;
  };

  window.yma = Yma();

}).call(this);
