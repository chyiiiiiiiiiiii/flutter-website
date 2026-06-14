((a,b)=>{a[b]=a[b]||{}})(self,"$__dart_deferred_initializers__")
$__dart_deferred_initializers__.current=function(a,b,c,$){var B,E,F,G,D,H,I,K,L,M,A={
v8(){return new A.cC(null)},
cC:function cC(d){this.a=d},
bT:function bT(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.a=g
_.b=h},
ih:function ih(d){this.d=d
this.c=this.a=null},
mQ:function mQ(d,e){this.a=d
this.b=e},
ig:function ig(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
mP:function mP(d){this.a=d}},C,N,O
B=c[0]
E=c[2]
F=c[48]
G=c[56]
D=c[57]
H=c[53]
I=c[52]
K=c[38]
L=c[34]
M=c[41]
A=a.updateHolder(c[17],A)
C=c[73]
N=c[47]
O=c[58]
A.cC.prototype={
T(){return new A.ih(C.v)}}
A.bT.prototype={
a7(){return"_Theme."+this.b}}
A.ih.prototype={
Z(){var x=this,w=b.G.document.body.classList
if(w.contains("auto-mode"))x.d=C.D
else if(w.contains("dark-mode"))x.d=C.a6
else if(w.contains("light-mode"))x.d=C.v
else{x.d=C.v
w.add("light-mode")}x.a2()},
hq(d){var x,w,v,u,t,s
if(d===this.d)return
x=b.G
w=x.document.body.classList
for(v=0;v<3;++v)w.remove(C.Y[v].b+"-mode")
u=d.b+"-mode"
w.add(u)
if(d===C.D){t=x.window.matchMedia("(prefers-color-scheme: dark)").matches?"dark-mode":"light-mode"
w.add(t)}try{x.window.localStorage.setItem("theme",u)}catch(s){}this.M(new A.mQ(this,d))},
q(d){var x,w,v,u,t,s=null,r=y.g
r=B.F(["role","listbox"],r,r)
x=y.p
w=B.b([],x)
for(v=this.ghp(),u=0;u<3;++u){t=C.Y[u]
w.push(new A.ig(t,this.d===t,v,s))}return new K.ca("theme-switcher",C.ac,new I.E(s,"dropdown-menu",s,s,B.b([L.oA(w,r,s)],x),s),s)}}
A.ig.prototype={
q(d){var x=null,w=y.g,v=B.F(["click",new A.mP(this)],w,y.a),u=this.c,t=u.d
w=B.F(["title",t,"aria-label",t,"aria-selected",String(this.d)],w,w)
t=y.p
return M.iw(B.b([H.dr(B.b([F.oV(u.e),new G.J(x,x,x,x,B.b([new B.r(u.c,x)],t),x)],t),w,x,v,x,x,x)],t),x,x,x)}}
var z=a.updateTypes(["~(bT)"])
A.mQ.prototype={
$0(){this.a.d=this.b},
$S:0}
A.mP.prototype={
$1(d){var x=this.a
x.e.$1(x.c)},
$S:1};(function installTearOffs(){var x=a._instance_1u
x(A.ih.prototype,"ghp","hq",0)})();(function inheritance(){var x=a.inherit
x(A.cC,D.a_)
x(A.bT,B.b7)
x(A.ih,D.U)
x(A.mQ,B.a7)
x(A.ig,B.m)
x(A.mP,B.P)})()
B.w(b.typeUniverse,JSON.parse('{"cC":{"e":[]},"ig":{"m":[],"e":[]}}'))
var y={p:B.d("j<e>"),g:B.d("a"),a:B.d("~(p)")};(function constants(){var x=a.makeConstList
C.ac=new N.bz(null,"Select a theme.",O.e,"routine",null,E.h,!1,null,null,null)
C.v=new A.bT("Light","Switch to the light theme.","light_mode",0,"light")
C.a6=new A.bT("Dark","Switch to the dark theme.","dark_mode",1,"dark")
C.D=new A.bT("Automatic","Match theme to device theme.","night_sight_auto",2,"auto")
C.Y=x([C.v,C.a6,C.D],B.d("j<bT>"))})()};
(a=>{a["BmUz97OaAS32LRGUn6mcm+jM9F8="]=a.current})($__dart_deferred_initializers__);