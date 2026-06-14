((a,b)=>{a[b]=a[b]||{}})(self,"$__dart_deferred_initializers__")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,E,K,D,L,F,M,G,H,N,B={
uI(d,e,f,g){return new B.cw(d,g,f,e,null)},
cw:function cw(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
mB:function mB(d){this.d=d
this.c=this.a=null},
mF:function mF(d){this.a=d},
mE:function mE(d){this.a=d},
mD:function mD(d){this.a=d},
mC:function mC(d){this.a=d},
qt(d,e,f){return new B.eq(e,new B.l1(d,e),null,f.h("eq<0>"))},
eq:function eq(d,e,f,g){var _=this
_.c=d
_.d=e
_.a=f
_.$ti=g},
l1:function l1(d,e){this.a=d
this.b=e},
iq:function iq(d,e){this.w=d
this.a=e},
ir:function ir(d,e){this.w=d
this.a=e},
dM:function dM(d){this.$ti=d},
cZ:function cZ(d,e){this.a=d
this.$ti=e}},C,I,O,P
J=c[1]
A=c[0]
E=c[2]
K=c[54]
D=c[56]
L=c[50]
F=c[57]
M=c[53]
G=c[46]
H=c[64]
N=c[38]
B=a.updateHolder(c[14],B)
C=c[69]
I=c[35]
O=c[27]
P=c[28]
B.cw.prototype={
T(){return new B.mB(new B.cZ(null,y.y))}}
B.mB.prototype={
Z(){this.a2()
this.c.r.b$.push(new B.mF(this))},
q(d){var x,w,v,u,t,s,r,q,p=this,o="Toggle the table of contents dropdown",n=null,m=y.w,l=A.F(["title",o,"aria-label",o],m,m),k=y.F,j=A.b([H.a1],k)
if(p.a.c.gl(0)===0)j.push(C.dC)
else{x=A.b([],k)
for(m=I.oM(p.a.c,0,m),w=J.ai(m.a),m=m.b,v=new I.cj(w,m),u=y.x;v.m();){t=v.c
t=t>=0?new A.bS(m+t,w.gp()):A.z(A.bD())
s=t.a
r=A.b(["toc-breadcrumb"],u)
if(s<J.ap(p.a.c.a)-2)r.push("toc-hide-medium")
if(s<J.ap(p.a.c.a)-1)r.push("toc-hide-small")
r=E.b.W(r," ")
q=A.b([],k)
if(s===J.ap(p.a.c.a)-1&&p.a.d!=null)q.push(new D.J("page-number",n,n,n,A.b([new A.r(A.o(p.a.d),n)],k),n))
q.push(new D.J(n,n,n,n,A.b([p.hs(t.b)],k),n))
q.push(C.a_)
E.b.B(x,A.b([new D.J(r,n,n,n,q,n)],k))}E.b.B(j,x)}j.push(new D.J("toc-current",n,n,n,A.b([B.qt(new B.mD(p),$.pC(),y.e)],k),n))
return new N.ca("pagenav",M.dr(j,l,n,n,n,n,n),p.a.f.gt(),p.d)},
hs(d){var x,w,v,u,t,s,r,q=null,p=A.Z("`([^`]+)`|\\*([^*]+)\\*|\\*\\*([^*]+)\\*\\*"),o=y.F,n=A.b([],o),m=p.bl(0,d)
for(x=new A.et(m.a,m.b,m.c),w=y.q,v=0;x.m();){u=x.d
t=(u==null?w.a(u):u).b
s=t.index
if(s>v)n.push(new A.r(E.a.n(d,v,s),q))
r=t[1]
if(r!=null){r=r
r.toString
n.push(new B.iq(A.b([new A.r(r,q)],o),q))}else{r=t[2]
if(r!=null){r=r
r.toString
n.push(new B.ir(A.b([new A.r(r,q)],o),q))}else{r=t[3]
if(r!=null){r=r
r.toString
n.push(new P.du(A.b([new A.r(r,q)],o),q))}}}v=s+t[0].length}if(v<d.length)n.push(new A.r(E.a.N(d,v),q))
return n.length>1?new L.cf(n,q):E.b.gaX(n)}}
B.eq.prototype={}
B.iq.prototype={
q(d){var x=null
return new A.D("code",x,x,x,x,x,this.w,x)}}
B.ir.prototype={
q(d){var x=null
return new A.D("em",x,x,x,x,x,this.w,x)}}
B.dM.prototype={
ghW(){var x,w,v,u=$.dG.i(0,this)
A:{x=u instanceof F.eg
w=null
if(x){v=u.ry
v.toString
w=v
v=A.t(this).c.b(v)}else v=!1
if(v){if(x)v=w
else{v=u.ry
v.toString}A.t(this).c.a(v)
break A}v=null
break A}return v}}
B.cZ.prototype={
j(d){if(A.b0(this)===C.d_)return"[GlobalKey#"+G.oz(this)+"]"
return"["+("<optimized out>#"+G.oz(this))+"]"}}
var z=a.updateTypes(["J(S,a?)"])
B.mF.prototype={
$0(){var x,w,v,u,t,s,r=b.G.document.querySelectorAll("#pagenav-content a")
for(x=A.dj,w=this.a,v=0;v<r.length;++v){u=r.item(v)
if(u==null)u=A.ar(u)
t=new B.mE(w)
if(typeof t=="function")A.z(A.A("Attempting to rewrap a JS function.",null))
s=function(d,e){return function(f){return d(e,f,arguments.length)}}(x,t)
s[$.bd()]=t
u.addEventListener("click",s)}},
$S:0}
B.mE.prototype={
$1(d){var x=this.a.d.ghW()
if(x!=null)x.bG(!1)},
$S:6}
B.mD.prototype={
$2(d,e){var x=null
if(e)return new D.J(x,x,x,x,A.b([new A.r(this.a.a.e,x)],y.F),x)
return B.qt(new B.mC(this.a),$.fj(),y.v)},
$S:80}
B.mC.prototype={
$2(d,e){var x=null
return new D.J(x,x,x,x,A.b([new A.r(e==null?this.a.a.e:e,x)],y.F),x)},
$S:z+0}
B.l1.prototype={
$1(d){return this.a.$2(d,this.b.f)},
$S:19};(function inheritance(){var x=a.inherit,w=a.inheritMany
x(B.cw,F.a_)
x(B.mB,F.U)
x(B.mF,A.a7)
w(A.P,[B.mE,B.l1])
w(A.cR,[B.mD,B.mC])
x(B.eq,O.e_)
w(A.m,[B.iq,B.ir])
x(B.dM,G.b2)
x(B.cZ,B.dM)})()
A.w(b.typeUniverse,JSON.parse('{"cw":{"e":[]},"eq":{"e":[]},"iq":{"m":[],"e":[]},"ir":{"m":[],"e":[]},"cZ":{"dM":["1"],"b2":[],"bf":[]},"dM":{"b2":[],"bf":[]}}'))
var y={F:A.d("j<e>"),x:A.d("j<a>"),y:A.d("cZ<fK>"),q:A.d("e9"),w:A.d("a"),e:A.d("V"),v:A.d("a?")};(function constants(){var x=a.makeConstList
C.a_=new K.b4("chevron_right",E.m,null)
C.d_=A.aA("cZ<U<a_>>")
C.ch={"aria-label":0}
C.ca=new A.a3(C.ch,["On this page"],A.d("a3<a,a>"))
C.dF=new D.J(null,null,C.ca,null,H.W,null)
C.bn=x([C.dF,C.a_],y.F)
C.dC=new D.J("toc-breadcrumb",null,null,null,C.bn,null)})()};
(a=>{a["ujr3+1JvJRhwF8oUpVNDfrkCj6Y="]=a.current})($__dart_deferred_initializers__);