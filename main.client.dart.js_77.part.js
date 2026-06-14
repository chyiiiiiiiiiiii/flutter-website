((a,b)=>{a[b]=a[b]||{}})(self,"$__dart_deferred_initializers__")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,B,D,G,E,F,H,I,K,C={
tM(d,e){return new C.c_(e,d,null)},
c_:function c_(d,e,f){this.c=d
this.d=e
this.a=f},
l4:function l4(d){var _=this
_.d=!0
_.e=null
_.f=d
_.c=_.a=null},
l5:function l5(d){this.a=d},
l6:function l6(d,e){this.a=d
this.b=e},
l7:function l7(d,e){this.a=d
this.b=e},
fg(d,e){return new C.dv(e,null,d,null)},
iA:function iA(d,e,f,g){var _=this
_.c=d
_.d=e
_.w=f
_.a=g},
iC:function iC(d){this.a=d},
iB:function iB(d,e){this.w=d
this.a=e},
by:function by(d,e,f){this.x=d
this.as=e
this.a=f},
cO:function cO(d,e,f){this.d=d
this.w=e
this.a=f},
dv:function dv(d,e,f,g){var _=this
_.r=d
_.x=e
_.z=f
_.a=g},
kP:function kP(d,e){this.a=d
this.b=e}},A
J=c[1]
B=c[0]
D=c[56]
G=c[50]
E=c[49]
F=c[57]
H=c[52]
I=c[31]
K=c[24]
C=a.updateHolder(c[18],C)
A=c[74]
C.c_.prototype={
T(){return new C.l4(B.b([],y.a))}}
C.l4.prototype={
Z(){this.a2()
this.cf()},
cf(){var x=0,w=B.aZ(y.f),v=1,u=[],t=this,s,r,q,p,o,n,m
var $async$cf=B.b_(function(d,e){if(d===1){u.push(e)
x=v}for(;;)switch(x){case 0:v=3
x=6
return B.as(K.pY(t.a.c),$async$cf)
case 6:s=e
p=J.pK(s,new C.l5(t))
o=B.aq(p,p.$ti.h("h.E"))
r=o
t.M(new C.l6(t,r))
v=1
x=5
break
case 3:v=2
m=u.pop()
q=B.R(m)
t.M(new C.l7(t,q))
x=5
break
case 2:x=1
break
case 5:return B.aX(null,w)
case 1:return B.aW(u.at(-1),w)}})
return B.aY($async$cf,w)},
q(d){var x,w,v,u,t,s,r=this,q=null,p=r.a,o=p.c
p=p.d
x=y.p
w=B.b([],x)
if(r.d)w.push(A.dR)
else if(r.e!=null)w.push(A.dS)
else for(v=r.f,u=v.length,t=0;t<v.length;v.length===u||(0,B.ao)(v),++t){s=v[t]
w.push(new C.cO(q,B.b([C.fg(B.b([new E.fb(s.a,q,q,q,q,q,B.b([new B.r(s.b,q)],x),q)],x),q),C.fg(B.b([new D.J(q,q,q,q,B.b([new B.r(s.e,q)],x),q)],x),q),C.fg(B.b([new D.J("git-hash",q,q,q,B.b([new B.r(s.f,q)],x),q)],x),q),C.fg(B.b([new B.r(s.r.toLocaleDateString(),q)],x),"date"),C.fg(B.b([new D.J(q,q,q,q,B.b([new B.r(s.d,q)],x),q)],x),q),C.fg(B.b([r.hL(s)],x),q)],x),q))}return new G.cf(B.b([A.dx,new H.E(q,"scrollable-table table-wrapper",q,q,B.b([new C.iA("downloads-"+o+"-"+p,"table table-striped",B.b([A.dP,new C.iB(w,q)],x),q)],x),q)],x),q)},
hL(d){var x,w=null,v=d.r.valueOf(),u=this.a,t=u.c
if(t==="windows"&&v<$.ta())return A.a7
else if(v<$.t9())return A.a7
x=t==="linux"?"tar.xz":"zip"
u=u.d
return E.nQ(B.b([A.cA],y.p),w,w,"https://storage.googleapis.com/flutter_infra_release/releases/"+u+"/"+t+"/flutter_"+t+"_"+d.b+"-"+u+"."+x+".intoto.jsonl",w,w,A.cr)}}
C.iA.prototype={
q(d){var x=null
return new B.D("table",this.c,this.d,x,x,x,this.w,x)}}
C.iC.prototype={
q(d){var x=null
return new B.D("thead",x,x,x,x,x,A.bf,x)}}
C.iB.prototype={
q(d){var x=null
return new B.D("tbody",x,x,x,x,x,this.w,x)}}
C.by.prototype={
q(d){var x=null,w=y.g
return new B.D("th",x,this.x,x,B.B(w,w),x,this.as,x)}}
C.cO.prototype={
q(d){var x=null
return new B.D("tr",x,this.d,x,x,x,this.w,x)}}
C.dv.prototype={
q(d){var x,w=null,v=y.g
v=B.B(v,v)
x=this.x
if(x!=null)v.B(0,x)
return new B.D("td",w,this.r,w,v,w,this.z,w)}}
C.kP.prototype={
a7(){return"Target."+this.b}}
var z=a.updateTypes(["V(aw)"])
C.l5.prototype={
$1(d){return d.c===this.a.a.d},
$S:z+0}
C.l6.prototype={
$0(){var x=this.a
x.f=this.b
x.d=!1},
$S:0}
C.l7.prototype={
$0(){var x=this.a
x.e=J.aO(this.b)
x.d=!1},
$S:0};(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.c_,F.a_)
x(C.l4,F.U)
x(C.l5,B.P)
w(B.a7,[C.l6,C.l7])
w(B.m,[C.iA,C.iC,C.iB,C.by,C.cO,C.dv])
x(C.kP,B.b7)})()
B.w(b.typeUniverse,JSON.parse('{"c_":{"e":[]},"iA":{"m":[],"e":[]},"iC":{"m":[],"e":[]},"iB":{"m":[],"e":[]},"by":{"m":[],"e":[]},"cO":{"m":[],"e":[]},"dv":{"m":[],"e":[]}}'))
var y={p:B.d("j<e>"),a:B.d("j<aw>"),g:B.d("a"),f:B.d("~")};(function constants(){var x=a.makeConstList
A.cw=new B.r("Flutter version",null)
A.bd=x([A.cw],y.p)
A.dN=new C.by(null,A.bd,null)
A.cu=new B.r("Architecture",null)
A.bv=x([A.cu],y.p)
A.dO=new C.by(null,A.bv,null)
A.cD=new B.r("Ref",null)
A.bx=x([A.cD],y.p)
A.dJ=new C.by(null,A.bx,null)
A.cJ=new B.r("Release date",null)
A.bs=x([A.cJ],y.p)
A.dK=new C.by("date",A.bs,null)
A.cy=new B.r("Dart version",null)
A.bP=x([A.cy],y.p)
A.dL=new C.by(null,A.bP,null)
A.cC=new B.r("Provenance",null)
A.bw=x([A.cC],y.p)
A.dM=new C.by(null,A.bw,null)
A.bY=x([A.dN,A.dO,A.dJ,A.dK,A.dL,A.dM],y.p)
A.dQ=new C.cO(null,A.bY,null)
A.bf=x([A.dQ],y.p)
A.cr=new C.kP(1,"blank")
A.cA=new B.r("Attestation bundle",null)
A.cF=new B.r("Select from the following scrollable list:",null)
A.bC=x([A.cF],y.p)
A.dx=new I.bn(null,A.bC,null)
A.cs=new B.r("-",null)
A.bG=x([A.cs],y.p)
A.a7=new D.J(null,null,null,null,A.bG,null)
A.dP=new C.iC(null)
A.ci={colspan:0}
A.Z=new B.a3(A.ci,["6"],B.d("a3<a,a>"))
A.cH=new B.r("Loading...",null)
A.bB=x([A.cH],y.p)
A.dH=new C.dv(null,A.Z,A.bB,null)
A.bW=x([A.dH],y.p)
A.dR=new C.cO("loading",A.bW,null)
A.cO=new B.r("Failed to load releases. Refresh page to try again.",null)
A.bO=x([A.cO],y.p)
A.dI=new C.dv(null,A.Z,A.bO,null)
A.br=x([A.dI],y.p)
A.dS=new C.cO("error",A.br,null)})();(function lazyInitializers(){var x=a.lazyFinal
x($,"z0","ta",()=>B.pc(B.rd(B.bx(),"Date"),"parse","4/3/2023"))
x($,"z_","t9",()=>B.pc(B.rd(B.bx(),"Date"),"parse","12/15/2022"))})()};
(a=>{a["4wRHdKQ0n41x5WTAIQ+5sqjrnpQ="]=a.current})($__dart_deferred_initializers__);