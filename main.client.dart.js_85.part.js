((a,b)=>{a[b]=a[b]||{}})(self,"$__dart_deferred_initializers__")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,B,F,E,C,G,D,A={
vY(d,e){return new A.cH(e,d,null)},
cH:function cH(d,e,f){this.c=d
this.d=e
this.a=f},
yv(d,e){var x,w,v,u,t=d.getBoundingClientRect(),s=e.getBoundingClientRect(),r=e.closest(".content"),q=r==null?null:r.getBoundingClientRect(),p=t.left+t.width/2
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
hK:function hK(d,e,f){this.c=d
this.d=e
this.a=f},
iB:function iB(d,e,f){var _=this
_.d=d
_.e=e
_.f=f
_.r=!1
_.w=0
_.c=_.a=_.x=null},
ny:function ny(d){this.a=d},
nx:function nx(d,e,f){this.a=d
this.b=e
this.c=f},
nu:function nu(d){this.a=d},
nt:function nt(d){this.a=d},
nv:function nv(d){this.a=d},
ns:function ns(d){this.a=d},
nw:function nw(d){this.a=d},
nr:function nr(d){this.a=d}}
J=c[1]
B=c[0]
F=c[2]
E=c[61]
C=c[60]
G=c[50]
D=c[48]
A=a.updateHolder(c[18],A)
A.cH.prototype={
q(d){return new A.hK(this.c,this.d,null)}}
A.hK.prototype={
T(){var x=y.b
return new A.iB(new D.al(null,x),new D.al(null,x),new D.al(null,x))}}
A.iB.prototype={
Z(){this.a3()
this.fj()},
aJ(){var x=this.x
if(x!=null)x.ae()
this.aX()},
fj(){var x=this
x.c.r.b$.push(x.gij())
x.x=B.m7(b.G.window,"resize",new A.ny(x),!1)},
eL(){var x=this,w=x.e.gaI(),v=x.f.gaI()
if(v==null||w==null)return
x.H(new A.nx(x,w,v))},
q(d){var x,w,v,u,t,s=this,r=null,q=y.g,p=B.z(q,y.a),o=$.u2()
if(o)p.k(0,"click",new A.nu(s))
x=y.p
p=B.b([new C.J(r,"tooltip-target",r,r,p,B.b([s.a.c],x),s.e)],x)
w=s.a.d
v=o?new A.nv(s):r
o=o?new A.nw(s):r
u=B.b(["tooltip"],y.h)
if(s.r)u.push("visible")
u=F.b.Y(u," ")
t=s.w
if(t===0)t="50%"
else t=t>0?"calc(50% + "+B.n(t)+"px)":"calc(50% - "+B.n(Math.abs(t))+"px)"
p.push(new G.d7(new C.J(r,u,new B.ix(r,r,r,r,B.D(["left",t],q,q)),r,r,B.b([w],x),s.f),v,o,r))
return new C.J(r,"tooltip-wrapper",r,r,r,p,s.d)}}
var z=a.updateTypes(["~()"])
A.ny.prototype={
$1(d){this.a.eL()},
$S:1}
A.nx.prototype={
$0(){this.a.w=A.yv(this.b,this.c)},
$S:0}
A.nu.prototype={
$1(d){var x=this.a
if(!x.r){x.H(new A.nt(x))
d.preventDefault()}},
$S:1}
A.nt.prototype={
$0(){return this.a.r=!0},
$S:0}
A.nv.prototype={
$1(d){var x=this.a,w=x.d.gaI()
if(J.u(w==null?null:w.contains(d.target),!0))return
x.H(new A.ns(x))},
$S:1}
A.ns.prototype={
$0(){return this.a.r=!1},
$S:0}
A.nw.prototype={
$1(d){var x=this.a
x.H(new A.nr(x))},
$S:1}
A.nr.prototype={
$0(){return this.a.r=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
x(A.iB.prototype,"gij","eL",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(A.cH,B.k)
x(A.hK,E.a5)
x(A.iB,E.a0)
w(B.F,[A.ny,A.nu,A.nv,A.nw])
w(B.a7,[A.nx,A.nt,A.ns,A.nr])})()
B.w(b.typeUniverse,JSON.parse('{"cH":{"k":[],"e":[]},"hK":{"e":[]}}'))
var y={p:B.d("j<e>"),h:B.d("j<a>"),b:B.d("al<o>"),g:B.d("a"),a:B.d("~(o)")};(function lazyInitializers(){var x=a.lazyFinal
x($,"Ac","u2",()=>{var w=B.b6(B.pW(B.b6(B.bo(),"window"),"matchMedia","(pointer: coarse)"),"matches")
return w})})()};
(a=>{a["Zry+Odlv4JA/q9mg9rr8MHM59oQ="]=a.current})($__dart_deferred_initializers__);