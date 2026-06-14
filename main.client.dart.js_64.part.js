((a,b)=>{a[b]=a[b]||{}})(self,"$__dart_deferred_initializers__")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,B,F,C,E,D,G,A={
v_(d,e){return new A.cz(e,d,null)},
cz:function cz(d,e,f){this.c=d
this.d=e
this.a=f},
xq(d,e){var x,w,v,u,t=d.getBoundingClientRect(),s=e.getBoundingClientRect(),r=e.closest(".content"),q=r==null?null:r.getBoundingClientRect(),p=t.left+t.width/2
r=s.width/2
x=p-r
w=p+r
r=q==null
v=r?null:q.left
if(v==null)v=0
u=r?null:q.right
if(u==null)u=b.G.window.innerWidth
if(x<v)return v-x
else if(w>u)return u-w
else return 0},
hv:function hv(d,e,f){this.c=d
this.d=e
this.a=f},
ii:function ii(d,e,f){var _=this
_.d=d
_.e=e
_.f=f
_.r=!1
_.w=0
_.c=_.a=null},
n_:function n_(d){this.a=d},
mZ:function mZ(d,e,f){this.a=d
this.b=e
this.c=f},
mW:function mW(d){this.a=d},
mV:function mV(d){this.a=d},
mX:function mX(d){this.a=d},
mU:function mU(d){this.a=d},
mY:function mY(d){this.a=d},
mT:function mT(d){this.a=d}}
J=c[1]
B=c[0]
F=c[2]
C=c[56]
E=c[57]
D=c[42]
G=c[44]
A=a.updateHolder(c[12],A)
A.cz.prototype={
q(d){return new A.hv(this.c.gt(),this.d.gt(),null)}}
A.hv.prototype={
T(){var x=y.b
return new A.ii(new D.ae(null,x),new D.ae(null,x),new D.ae(null,x))}}
A.ii.prototype={
Z(){this.a2()
this.f9()},
f9(){this.c.r.b$.push(this.gi1())
B.lE(b.G.window,"resize",new A.n_(this),!1)},
eB(){var x=this,w=x.e.gaD(),v=x.f.gaD()
if(v==null||w==null)return
x.M(new A.mZ(x,w,v))},
q(d){var x,w,v,u,t,s=this,r=null,q=y.g,p=B.B(q,y.a),o=$.tc()
if(o)p.k(0,"click",new A.mW(s))
x=y.p
p=B.b([new C.J("tooltip-target",r,r,p,B.b([s.a.c],x),s.e)],x)
w=s.a.d
v=o?new A.mX(s):r
o=o?new A.mY(s):r
u=B.b(["tooltip"],y.h)
if(s.r)u.push("visible")
u=F.b.W(u," ")
t=s.w
if(t===0)t="50%"
else t=t>0?"calc(50% + "+B.o(t)+"px)":"calc(50% - "+B.o(Math.abs(t))+"px)"
p.push(new G.cX(new C.J(u,new B.id(r,r,r,r,B.F(["left",t],q,q)),r,r,B.b([w],x),s.f),v,o,r))
return new C.J("tooltip-wrapper",r,r,r,p,s.d)}}
var z=a.updateTypes(["~()"])
A.n_.prototype={
$1(d){this.a.eB()},
$S:1}
A.mZ.prototype={
$0(){this.a.w=A.xq(this.b,this.c)},
$S:0}
A.mW.prototype={
$1(d){var x=this.a
if(!x.r){x.M(new A.mV(x))
d.preventDefault()}},
$S:1}
A.mV.prototype={
$0(){return this.a.r=!0},
$S:0}
A.mX.prototype={
$1(d){var x=this.a,w=x.d.gaD()
if(J.u(w==null?null:w.contains(d.target),!0))return
x.M(new A.mU(x))},
$S:1}
A.mU.prototype={
$0(){return this.a.r=!1},
$S:0}
A.mY.prototype={
$1(d){var x=this.a
x.M(new A.mT(x))},
$S:1}
A.mT.prototype={
$0(){return this.a.r=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
x(A.ii.prototype,"gi1","eB",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(A.cz,B.m)
x(A.hv,E.a_)
x(A.ii,E.U)
w(B.P,[A.n_,A.mW,A.mX,A.mY])
w(B.a7,[A.mZ,A.mV,A.mU,A.mT])})()
B.w(b.typeUniverse,JSON.parse('{"cz":{"m":[],"e":[]},"hv":{"e":[]}}'))
var y={p:B.d("j<e>"),h:B.d("j<a>"),b:B.d("ae<p>"),g:B.d("a"),a:B.d("~(p)")};(function lazyInitializers(){var x=a.lazyFinal
x($,"z3","tc",()=>{var w=B.bW(B.pc(B.bW(B.bx(),"window"),"matchMedia","(pointer: coarse)"),"matches")
return w})})()};
(a=>{a["JSSu4ynCIeJLw+Pclhubgpji2+4="]=a.current})($__dart_deferred_initializers__);