((a,b)=>{a[b]=a[b]||{}})(self,"$__dart_deferred_initializers__")
$__dart_deferred_initializers__.current=function(a,b,c,$){var B,D,E,F,G,A={
vj(){var x=new A.lf()
return x.b=x},
lf:function lf(){this.b=null},
u0(d,e,f,g){return new A.c7(g,f,d,e,null)},
vk(){return new A.lr(new A.ls().$0())},
c7:function c7(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
lr:function lr(d){var _=this
_.d=d
_.e=""
_.c=_.a=null},
ls:function ls(){},
lt:function lt(){},
fL:function fL(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
lC:function lC(d){var _=this
_.d=d
_.e=!1
_.c=_.a=null},
lD:function lD(d,e){this.a=d
this.b=e},
dI:function dI(d,e){this.a=d
this.b=e},
kr:function kr(d,e){this.a=d
this.b=e},
iv:function iv(d,e,f,g,h,i,j){var _=this
_.c=d
_.d=e
_.f=f
_.r=g
_.Q=h
_.ch=i
_.a=j},
u_(d){if(d==null)return null
return new A.jc(d)},
jc:function jc(d){this.a=d}},C
B=c[0]
D=c[57]
E=c[42]
F=c[32]
G=c[40]
A=a.updateHolder(c[13],A)
C=c[68]
A.lf.prototype={
ec(){var x=this.b
if(x===this)throw B.c(new B.bG("Local '' has not been initialized."))
return x}}
A.c7.prototype={
T(){return A.vk()}}
A.lr.prototype={
Z(){var x,w,v=this
v.a2()
x=v.c
x.toString
w=B.rQ(x,new A.lt())
if(w==null)v.e=""
else{x=w.parentNode
if(x!=null)x.removeChild(w)
x=w.textContent
v.e=x==null?"":x}},
q(d){var x,w,v,u=this,t=null,s=y.g,r=B.B(s,s),q=u.a.e
if(q!=null)r.k(0,"height",q)
r.k(0,"title",u.a.c)
q=u.a
x=q.d
A:{if("auto"===x){w=C.J
break A}if("dark"===x){w=C.av
break A}w=C.au
break A}q=q.f
v=u.e
s=B.B(s,s)
s.k(0,"embed","true")
if(w!==C.J)s.k(0,"theme",w.j(0))
if(q)s.k(0,"run","true")
return G.qZ(r,new A.fL(u.d,F.qL("dartpad.dev",t,s,"https").gbZ(),v,t),t,t)}}
A.fL.prototype={
T(){return new A.lC(new E.ae(null,y.b))}}
A.lC.prototype={
Z(){var x,w
this.a2()
x=A.vj()
w=B.f8(new A.lD(this,x))
if(x.b!==x)B.z(new B.bG("Local '' has already been initialized."))
x.b=w
b.G.window.addEventListener("message",x.ec())},
c9(d){var x,w=this
w.dK(d)
x=w.a
if(d.c!==x.c)throw B.c(B.bL("The iframeId of an EmbeddedDartPad cannot be changed after creation."))
if(d.d!==x.d)throw B.c(B.bL("The iframeUrl of an EmbeddedDartPad cannot be changed after creation."))
if(d.e!==x.e&&w.e)w.ep()},
ep(){var x,w,v=A.u_(this.d.gaD().contentWindow)
if(v!=null){x={sourceCode:this.a.e,type:"sourceCode"}
w=$.ti()
v.a.postMessage(x,w)}},
q(d){var x=this.a,w=x.c
return new A.iv(x.d,"clipboard-write",C.cf,w,w,B.b([],y.p),this.d)}}
A.dI.prototype={
a7(){return"DartPadTheme."+this.b}}
A.kr.prototype={
a7(){return"MediaLoading."+this.b}}
A.iv.prototype={
q(d){var x=this,w=null,v=y.g
v=B.B(v,v)
v.k(0,"src",x.c)
v.k(0,"allow",x.d)
v.k(0,"loading","lazy")
v.k(0,"name",x.r)
return new B.D("iframe",x.Q,w,w,v,w,x.ch,w)}}
A.jc.prototype={
gl(d){return this.a.length}}
var z=a.updateTypes([])
A.ls.prototype={
$0(){var x=$.qv
$.qv=x+1
return"embedded-dartpad-"+x},
$S:75}
A.lt.prototype={
$1(d){return d.tagName.toLowerCase()==="pre"},
$S:7}
A.lD.prototype={
$1(d){var x,w,v,u=d.data,t=null,s=!1
if(y.h.b(u)){x="ready"===u.type
if(x){w=u.sender
s=w
t=s
s=s!=null}}else x=!1
if(s){v=x?t:u.sender
if(v==null)v=B.a2(v)
s=this.a
if(v!==s.a.c)return
b.G.window.removeEventListener("message",this.b.ec())
if(s.e)return
s.e=!0
s.ep()}},
$S:6};(function inheritance(){var x=a.inheritMany,w=a.inherit
x(B.i,[A.lf,A.jc])
x(D.a_,[A.c7,A.fL])
x(D.U,[A.lr,A.lC])
w(A.ls,B.a7)
x(B.P,[A.lt,A.lD])
x(B.b7,[A.dI,A.kr])
w(A.iv,B.m)})()
B.w(b.typeUniverse,JSON.parse('{"c7":{"e":[]},"fL":{"e":[]},"iv":{"m":[],"e":[]}}'))
var y={p:B.d("j<e>"),h:B.d("p"),b:B.d("ae<p>"),g:B.d("a")};(function constants(){C.au=new A.dI(0,"light")
C.av=new A.dI(1,"dark")
C.J=new A.dI(2,"auto")
C.cf=new A.kr(1,"lazy")})();(function staticFields(){$.qv=0})();(function lazyInitializers(){var x=a.lazyFinal
x($,"z9","ti",()=>B.v5("*"))})()};
(a=>{a["UO+eeDF92VdpXkKYLzffeA0Lh38="]=a.current})($__dart_deferred_initializers__);