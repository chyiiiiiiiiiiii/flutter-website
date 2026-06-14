((a,b)=>{a[b]=a[b]||{}})(self,"$__dart_deferred_initializers__")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,C,L,M,N,E,O,D,H,I,K,P,Q,F,G,B={
ut(){return new B.co(null)},
co:function co(d){this.a=d},
kl:function kl(){},
kj:function kj(d){this.a=d},
kk:function kk(d){this.a=d},
bg:function bg(d,e,f,g){var _=this
_.c=d
_.d=e
_.a=f
_.b=g},
Y:function Y(d,e,f,g){var _=this
_.c=d
_.d=e
_.a=f
_.b=g},
fe:function fe(d,e){this.w=d
this.a=e}},A
J=c[1]
C=c[0]
L=c[2]
M=c[48]
N=c[56]
E=c[77]
O=c[53]
D=c[52]
H=c[34]
I=c[41]
K=c[35]
P=c[27]
Q=c[71]
F=c[36]
G=c[30]
B=a.updateHolder(c[21],B)
A=c[76]
B.co.prototype={
q(d){var x=null,w=y.F
return new D.E(x,"right-col",x,x,C.b([A.du,new D.E("resource-filter-group-wrapper",x,x,x,C.b([new D.E("resource-filter-group",x,x,x,C.b([A.dp,A.dm,new P.e_($.aG(),new B.kl(),x)],w),x)],w),x)],w),x)}}
B.bg.prototype={
a7(){return"LearningResourceType."+this.b}}
B.Y.prototype={
a7(){return"LearningResourceTag."+this.b}}
B.fe.prototype={
q(d){var x=null
return new C.D("h4",x,x,x,x,x,this.w,x)}}
var z=a.updateTypes(["E(S)"])
B.kl.prototype={
$1(d){var x,w,v,u,t,s,r,q,p,o,n,m,l,k=null,j=$.aG().w?"":"collapsed",i=y.F,h=C.b([],i)
for(x=K.oM(A.bT,0,y.c),w=J.ai(x.a),x=x.b,v=new K.cj(w,x),u=y.w,t=y.B,s=y.x;v.m();){r={}
q=v.c
q=q>=0?new C.bS(x+q,w.gp()):C.z(C.bD())
r.a=null
p=r.a=q.b
o=C.b([],s)
if(!$.aG().w&&q.a>3)o.push("hidden")
q=L.b.W(o," ")
o="filter-"+p.b
n=C.F(["role","checkbox","name",o],u,u)
h.push(new I.cM(q,k,k,C.b([new F.bm(E.r,k,$.aG().f.D(0,p),k,new B.kj(r),o,n,k,t),new G.cL(k,C.F(["for",o],u,u),C.b([new C.r(r.a.c,k)],i),k)],i),k))}j=H.oA(h,k,j)
h=$.aG()
x=C.b([new C.r(h.w?"Less":"More",k)],i)
h=O.dr(C.b([new N.J("label",k,k,k,x,k),M.oV($.aG().w?"expand_less":"expand_more")],i),k,k,k,k,h.gj_(),k)
x=C.b([],i)
for(m=0;m<4;++m){l=A.bc[m]
w="filter-"+l.b
v=C.F(["role","checkbox","name",w],u,u)
x.push(new I.cM(k,k,k,C.b([new F.bm(E.r,k,$.aG().r.D(0,l),k,new B.kk(l),w,v,k,t),new G.cL(k,C.F(["for",w],u,u),C.b([new C.r(l.c,k)],i),k)],i),k))}return new D.E(k,"table-content",k,k,C.b([A.dq,j,h,A.dr,H.oA(x,k,k)],i),k)},
$S:z+0}
B.kj.prototype={
$1(d){var x=$.aG(),w=this.a.a,v=x.f
if(C.ng(d)){v.H(0,w)
$.iH().bL("learning_resource_index_filter_selected",C.F(["learning_resource_filter_name",w.c.toLowerCase(),"learning_resource_filter_type","tags"],y.w,y.q))}else v.I(0,w)
x.bz()},
$S:12}
B.kk.prototype={
$1(d){var x=$.aG(),w=this.a,v=x.r
if(C.ng(d)){v.H(0,w)
$.iH().bL("learning_resource_index_filter_selected",C.F(["learning_resource_filter_name",w.c.toLowerCase(),"learning_resource_filter_type","type"],y.w,y.q))}else v.I(0,w)
x.bz()},
$S:12};(function inheritance(){var x=a.inheritMany
x(C.m,[B.co,B.fe])
x(C.P,[B.kl,B.kj,B.kk])
x(C.b7,[B.bg,B.Y])})()
C.w(b.typeUniverse,JSON.parse('{"co":{"m":[],"e":[]},"fe":{"m":[],"e":[]}}'))
var y={p:C.d("a3<a,a>"),F:C.d("j<e>"),x:C.d("j<a>"),c:C.d("Y"),w:C.d("a"),B:C.d("bm<i?>"),q:C.d("i?")};(function constants(){var x=a.makeConstList
A.bH=x(["codelab","tutorial"],y.x)
A.ba=new B.bg("Tutorial",A.bH,0,"tutorial")
A.bZ=x(["quickstart","demo","sample","sample code"],y.x)
A.b9=new B.bg("Sample code",A.bZ,1,"sampleCode")
A.c2=x(["workshop","video"],y.x)
A.b8=new B.bg("Workshop",A.c2,2,"workshop")
A.be=x(["recipe","how to","cookbook"],y.x)
A.b7=new B.bg("Recipe",A.be,3,"recipe")
A.bc=x([A.ba,A.b9,A.b8,A.b7],C.d("j<bg>"))
A.bD=x(["ai","gemini","llm"],y.x)
A.b4=new B.Y("AI",A.bD,0,"ai")
A.bE=x(["animations","animate","animation"],y.x)
A.b3=new B.Y("Animation",A.bE,1,"animation")
A.X=x(["state-management","architecture","provider","bloc","stream"],y.x)
A.aV=new B.Y("Architecture",A.X,2,"architecture")
A.bJ=x(["cupertino","ios","macos"],y.x)
A.b1=new B.Y("Cupertino",A.bJ,3,"cupertino")
A.bK=x(["design","widgets"],y.x)
A.aZ=new B.Y("Design",A.bK,4,"design")
A.c1=x(["windows","macos","linux"],y.x)
A.aX=new B.Y("Desktop",A.c1,5,"desktop")
A.bN=x(["firebase","firestore","cloud"],y.x)
A.aY=new B.Y("Firebase",A.bN,6,"firebase")
A.bF=x(["beginner","beginners"],y.x)
A.b_=new B.Y("Good for beginners",A.bF,7,"goodForBeginners")
A.bV=x(["google","gemini","maps","firebase","cloud"],y.x)
A.b5=new B.Y("Google APIs",A.bV,8,"googleApis")
A.bI=x(["cupertino","ios"],y.x)
A.aT=new B.Y("iOS",A.bI,9,"ios")
A.bR=x(["layout","lists","scrolling","widgets"],y.x)
A.aU=new B.Y("Layout",A.bR,10,"layout")
A.bS=x(["material","android"],y.x)
A.aR=new B.Y("Material",A.bS,11,"material")
A.bX=x(["routing","route","navigation","navigator"],y.x)
A.b0=new B.Y("Routing and navigation",A.bX,12,"routingAndNavigation")
A.b2=new B.Y("State management",A.X,13,"stateManagement")
A.bu=x(["testing","tests","test","perf","performance"],y.x)
A.aS=new B.Y("Testing",A.bu,14,"testing")
A.c_=x(["web","wasm"],y.x)
A.b6=new B.Y("Web",A.c_,15,"web")
A.c0=x(["widgets","layout"],y.x)
A.aW=new B.Y("Widgets",A.c0,16,"widgets")
A.bT=x([A.b4,A.b3,A.aV,A.b1,A.aZ,A.aX,A.aY,A.b_,A.b5,A.aT,A.aU,A.aR,A.b0,A.b2,A.aS,A.b6,A.aW],C.d("j<Y>"))
A.cL=new C.r("Filter by",null)
A.bl=x([A.cL],y.F)
A.dm=new D.E(null,"table-title",null,null,A.bl,null)
A.co={for:0,"aria-hidden":1}
A.c4=new C.a3(A.co,["open-filter-toggle","true"],y.p)
A.bj=x([Q.a0],y.F)
A.dv=new G.cL("close-icon",A.c4,A.bj,null)
A.bp=x([A.dv],y.F)
A.dp=new D.E(null,"filter-header",null,null,A.bp,null)
A.cE=new C.r("Subject",null)
A.by=x([A.cE],y.F)
A.dq=new B.fe(A.by,null)
A.cG=new C.r("Type",null)
A.bz=x([A.cG],y.F)
A.dr=new B.fe(A.bz,null)
A.cj={hidden:0}
A.c7=new C.a3(A.cj,["true"],y.p)
A.du=new F.bm(E.r,null,null,null,null,"open-filter-toggle",A.c7,null,C.d("bm<@>"))})()};
(a=>{a["CQo2Pk/DO3zx50GUsBLnclh4KXo="]=a.current})($__dart_deferred_initializers__);