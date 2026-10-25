((a,b)=>{a[b]=a[b]||{}})(self,"$__dart_deferred_initializers__")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,C,D,N,F,O,G,P,H,I,E,K,L,B={
vr(){return new B.cv(null)},
cv:function cv(d){this.a=d},
kK:function kK(){},
kI:function kI(d){this.a=d},
kJ:function kJ(d){this.a=d},
bj:function bj(d,e,f,g){var _=this
_.c=d
_.d=e
_.a=f
_.b=g},
a3:function a3(d,e,f,g){var _=this
_.c=d
_.d=e
_.a=f
_.b=g}},A,M
J=c[1]
C=c[0]
D=c[2]
N=c[54]
F=c[37]
O=c[36]
G=c[45]
P=c[52]
H=c[69]
I=c[43]
E=c[30]
K=c[46]
L=c[47]
B=a.updateHolder(c[11],B)
A=c[74]
M=c[72]
B.cv.prototype={
q(d){return new E.e4("learning-resource-filter-toggle",C.b([new O.db($.bp(),new B.kK(),null)],y.F),D.B,null)}}
B.bj.prototype={
a_(){return"LearningResourceType."+this.b}}
B.a3.prototype={
a_(){return"LearningResourceTag."+this.b}}
var z=a.updateTypes(["B(P)"])
B.kK.prototype={
$1(d){var x,w,v,u,t,s,r,q,p,o,n,m,l,k,j=null,i="resource-filter-",h=y.F,g=C.b([],h)
for(x=F.pv(A.cb,0,y.c),w=J.af(x.a),x=x.b,v=new F.co(w,x),u=y.w,t=y.B,s=y.x;v.m();){r={}
q=v.c
q=q>=0?new C.bU(x+q,w.gp()):C.C(C.bI())
r.a=null
p=r.a=q.b
o=C.b([],s)
n=$.bp()
if(!n.w&&q.a>3)o.push("hidden")
q=D.b.Y(o," ")
o=i+p.b
m=C.D(["name",o],u,u)
g.push(new L.bY(q,j,j,C.b([new G.bn(M.o,j,n.f.C(0,p),j,new B.kI(r),o,j,m,j,t),new I.cW(j,C.D(["for",o],u,u),C.b([new C.r(r.a.c,j)],h),j)],h),j))}g=K.ft(g,j)
x=$.bp()
w=x.w
v=w?"Less":"More"
w=w?"expand_less":"expand_more"
w=P.ap(D.h,A.bF,v,!1,j,j,j,x.gjf(),H.v,H.e,j,w)
v=C.b([],h)
for(x=x.r,l=0;l<4;++l){k=A.bt[l]
s=i+k.b
r=C.D(["name",s],u,u)
v.push(new L.bY(j,j,j,C.b([new G.bn(M.o,j,x.C(0,k),j,new B.kJ(k),s,j,r,j,t),new I.cW(j,C.D(["for",s],u,u),C.b([new C.r(k.c,j)],h),j)],h),j))}return new N.B(j,"table-content",j,j,C.b([A.dF,g,w,A.dH,K.ft(v,j)],h),j)},
$S:z+0}
B.kI.prototype={
$1(d){var x=$.bp(),w=this.a.a,v=x.f
if(C.iF(d)){v.E(0,w)
$.j1().bO("learning_resource_index_filter_selected",C.D(["learning_resource_filter_name",w.c.toLowerCase(),"learning_resource_filter_type","tags"],y.w,y.q))}else v.J(0,w)
x.aT()},
$S:11}
B.kJ.prototype={
$1(d){var x=$.bp(),w=this.a,v=x.r
if(C.iF(d)){v.E(0,w)
$.j1().bO("learning_resource_index_filter_selected",C.D(["learning_resource_filter_name",w.c.toLowerCase(),"learning_resource_filter_type","type"],y.w,y.q))}else v.J(0,w)
x.aT()},
$S:11};(function inheritance(){var x=a.inherit,w=a.inheritMany
x(B.cv,C.k)
w(C.F,[B.kK,B.kI,B.kJ])
w(C.aU,[B.bj,B.a3])})()
C.w(b.typeUniverse,JSON.parse('{"cv":{"k":[],"e":[]}}'))
var y={F:C.d("j<e>"),x:C.d("j<a>"),c:C.d("a3"),w:C.d("a"),B:C.d("bn<h?>"),q:C.d("h?")};(function constants(){var x=a.makeConstList
A.c1=x(["codelab","tutorial"],y.x)
A.br=new B.bj("Tutorial",A.c1,0,"tutorial")
A.cg=x(["quickstart","demo","sample","sample code"],y.x)
A.bq=new B.bj("Sample code",A.cg,1,"sampleCode")
A.ck=x(["workshop","video"],y.x)
A.bp=new B.bj("Workshop",A.ck,2,"workshop")
A.bw=x(["recipe","how to","cookbook"],y.x)
A.bo=new B.bj("Recipe",A.bw,3,"recipe")
A.bt=x([A.br,A.bq,A.bp,A.bo],C.d("j<bj>"))
A.bF=x(["filter-expansion-button"],y.x)
A.bY=x(["ai","gemini","llm"],y.x)
A.bl=new B.a3("AI",A.bY,0,"ai")
A.bZ=x(["animations","animate","animation"],y.x)
A.bk=new B.a3("Animation",A.bZ,1,"animation")
A.a4=x(["state-management","architecture","provider","bloc","stream"],y.x)
A.bb=new B.a3("Architecture",A.a4,2,"architecture")
A.c3=x(["cupertino","ios","macos"],y.x)
A.bi=new B.a3("Cupertino",A.c3,3,"cupertino")
A.c4=x(["design","widgets"],y.x)
A.bf=new B.a3("Design",A.c4,4,"design")
A.cj=x(["windows","macos","linux"],y.x)
A.bd=new B.a3("Desktop",A.cj,5,"desktop")
A.c6=x(["firebase","firestore","cloud"],y.x)
A.be=new B.a3("Firebase",A.c6,6,"firebase")
A.c_=x(["beginner","beginners"],y.x)
A.bg=new B.a3("Good for beginners",A.c_,7,"goodForBeginners")
A.cc=x(["google","gemini","maps","firebase","cloud"],y.x)
A.bm=new B.a3("Google APIs",A.cc,8,"googleApis")
A.c2=x(["cupertino","ios"],y.x)
A.b9=new B.a3("iOS",A.c2,9,"ios")
A.c9=x(["layout","lists","scrolling","widgets"],y.x)
A.ba=new B.a3("Layout",A.c9,10,"layout")
A.ca=x(["material","android"],y.x)
A.b7=new B.a3("Material",A.ca,11,"material")
A.ce=x(["routing","route","navigation","navigator"],y.x)
A.bh=new B.a3("Routing and navigation",A.ce,12,"routingAndNavigation")
A.bj=new B.a3("State management",A.a4,13,"stateManagement")
A.bM=x(["testing","tests","test","perf","performance"],y.x)
A.b8=new B.a3("Testing",A.bM,14,"testing")
A.ch=x(["web","wasm"],y.x)
A.bn=new B.a3("Web",A.ch,15,"web")
A.ci=x(["widgets","layout"],y.x)
A.bc=new B.a3("Widgets",A.ci,16,"widgets")
A.cb=x([A.bl,A.bk,A.bb,A.bi,A.bf,A.bd,A.be,A.bg,A.bm,A.b9,A.ba,A.b7,A.bh,A.bj,A.b8,A.bn,A.bc],C.d("j<a3>"))
A.cU=new C.r("Subject",null)
A.bS=x([A.cU],y.F)
A.dF=new E.dH(A.bS,null)
A.cW=new C.r("Type",null)
A.bT=x([A.cW],y.F)
A.dH=new E.dH(A.bT,null)})()};
(a=>{a["X05pt1Pc7CvSFjEgMxQPrdf7l1c="]=a.current})($__dart_deferred_initializers__);