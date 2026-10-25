((a,b)=>{a[b]=a[b]||{}})(self,"$__dart_deferred_initializers__")
$__dart_deferred_initializers__.current=function(a,b,c,$){var B,E,D,F,G,H,I,A={kQ:function kQ(d,e){this.a=d
this.b=e},iO:function iO(d,e,f,g,h,i,j){var _=this
_.c=d
_.d=e
_.f=f
_.r=g
_.Q=h
_.ch=i
_.a=j},
uW(d,e,f,g){return new A.cb(g,f,d,e,null)},
wh(){return new A.lT(new A.lU().$0())},
cb:function cb(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
lT:function lT(d){var _=this
_.d=d
_.e=""
_.c=_.a=null},
lU:function lU(){},
fX:function fX(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
m5:function m5(d){var _=this
_.d=d
_.e=!1
_.c=_.a=null},
m6:function m6(d,e){this.a=d
this.b=e},
e0:function e0(d,e){this.a=d
this.b=e},
yN(d){var x,w,v=d.CW
if(v==null)x=null
else{v=v.d$
v.toString
x=v}if(x==null)return""
w=x.aM(new A.oU())
if(w==null)return""
v=w.parentNode
if(v!=null)v.removeChild(w)
v=w.textContent
return v==null?"":v},
oU:function oU(){},
uS(d){if(d==null)return null
return new A.jv(d)},
jv:function jv(d){this.a=d}},C
B=c[0]
E=c[2]
D=c[61]
F=c[44]
G=c[41]
H=c[48]
I=c[33]
A=a.updateHolder(c[19],A)
C=c[80]
A.kQ.prototype={
a_(){return"MediaLoading."+this.b}}
A.iO.prototype={
q(d){var x=this,w=null,v=y.g
v=B.z(v,v)
v.k(0,"src",x.c)
v.k(0,"allow",x.d)
v.k(0,"loading","lazy")
v.k(0,"name",x.r)
return new B.E("iframe",x.Q,w,w,v,w,x.ch,w)}}
A.cb.prototype={
T(){return A.wh()}}
A.lT.prototype={
Z(){this.a3()
var x=this.c
x.toString
this.e=A.yN(x)},
q(d){var x,w,v,u=this,t=null,s=y.g,r=B.z(s,s),q=u.a.e
if(q!=null)r.k(0,"height",q)
r.k(0,"title",u.a.c)
q=u.a
x=q.d
A:{if("auto"===x){w=C.O
break A}if("dark"===x){w=C.aP
break A}w=C.aO
break A}q=q.f
v=u.e
s=B.z(s,s)
s.k(0,"embed","true")
if(w!==C.O)s.k(0,"theme",w.j(0))
if(q)s.k(0,"run","true")
return F.rJ(r,new A.fX(u.d,G.rv("dartpad.dev",t,s,"https").gc3(),v,t),t,t)}}
A.fX.prototype={
T(){return new A.m5(new H.al(null,y.b))}}
A.m5.prototype={
Z(){this.a3()
var x=I.rf()
x.sdg(B.aW(new A.m6(this,x)))
b.G.window.addEventListener("message",x.d2())},
ci(d){var x,w=this
w.dR(d)
x=w.a
if(d.c!==x.c)throw B.c(B.b1("The iframeId of an EmbeddedDartPad cannot be changed after creation."))
if(d.d!==x.d)throw B.c(B.b1("The iframeUrl of an EmbeddedDartPad cannot be changed after creation."))
if(d.e!==x.e&&w.e)w.eA()},
eA(){var x,w,v=A.uS(this.d.gaI().contentWindow)
if(v!=null){x={sourceCode:this.a.e,type:"sourceCode"}
w=$.u8()
v.a.postMessage(x,w)}},
q(d){var x=this.a,w=x.c
return new A.iO(x.d,"clipboard-write",C.cw,w,w,E.B,this.d)}}
A.e0.prototype={
a_(){return"DartPadTheme."+this.b}}
A.jv.prototype={
gl(d){return this.a.length}}
var z=a.updateTypes([])
A.lU.prototype={
$0(){var x=$.rg
$.rg=x+1
return"embedded-dartpad-"+x},
$S:85}
A.m6.prototype={
$1(d){var x,w,v,u=d.data,t=null,s=!1
if(y.h.b(u)){x="ready"===u.type
if(x){w=u.sender
s=w
t=s
s=s!=null}}else x=!1
if(s){v=x?t:u.sender
if(v==null)v=B.a1(v)
s=this.a
if(v!==s.a.c)return
b.G.window.removeEventListener("message",this.b.d2())
if(s.e)return
s.e=!0
s.eA()}},
$S:7}
A.oU.prototype={
$1(d){return B.h2(d,"Element")&&d.tagName.toLowerCase()==="pre"},
$S:8};(function inheritance(){var x=a.inheritMany,w=a.inherit
x(B.aU,[A.kQ,A.e0])
w(A.iO,B.k)
x(D.a5,[A.cb,A.fX])
x(D.a0,[A.lT,A.m5])
w(A.lU,B.a7)
x(B.F,[A.m6,A.oU])
w(A.jv,B.h)})()
B.w(b.typeUniverse,JSON.parse('{"iO":{"k":[],"e":[]},"cb":{"e":[]},"fX":{"e":[]}}'))
var y={h:B.d("o"),b:B.d("al<o>"),g:B.d("a")};(function constants(){C.aO=new A.e0(0,"light")
C.aP=new A.e0(1,"dark")
C.O=new A.e0(2,"auto")
C.cw=new A.kQ(1,"lazy")})();(function staticFields(){$.rg=0})();(function lazyInitializers(){var x=a.lazyFinal
x($,"Ai","u8",()=>B.w3("*"))})()};
(a=>{a["Q4Hup2PjxstWsUH8V65DIc6S21g="]=a.current})($__dart_deferred_initializers__);