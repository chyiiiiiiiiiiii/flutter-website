((a,b)=>{a[b]=a[b]||{}})(self,"$__dart_deferred_initializers__")
$__dart_deferred_initializers__.current=function(a,b,c,$){var A,E,D,F,B={
u6(d){return new B.c8(d,null)},
c8:function c8(d,e){this.c=d
this.a=e},
hV:function hV(d){this.d=d
this.c=this.a=null}},C,G,H,I
A=c[0]
E=c[2]
D=c[57]
F=c[42]
B=a.updateHolder(c[6],B)
C=c[37]
G=c[43]
H=c[45]
I=c[58]
B.c8.prototype={
T(){return new B.hV(new F.ae(null,y.b))}}
B.hV.prototype={
aG(){var x=0,w=A.aZ(y.v),v,u=2,t=[],s=this,r,q,p,o,n,m,l,k,j,i,h
var $async$aG=A.b_(function(d,e){if(d===1){t.push(e)
x=u}for(;;)switch(x){case 0:j=s.d.gaD()
i=null
if(!(j==null)){j=j.closest(".code-block-wrapper")
if(!(j==null)){j=j.querySelector("pre code")
if(j==null)j=i
else{j=j.textContent
if(j==null)j=i
else j=A.cN(j,"\u200b","")}i=j}}r=i
if(r==null){x=1
break}j=b.G
x=j.showSaveFilePicker!=null?3:5
break
case 3:u=7
o=y.h
x=10
return A.as(C.bX(j.showSaveFilePicker({id:"download-project-file",startIn:"documents",suggestedName:s.a.c,types:A.b([{description:"Dart",accept:G.rJ(A.F(["text/plain",A.b([".dart"],y.x)],y.w,y.B))}],y.k)}),o),$async$aG)
case 10:q=e
x=11
return A.as(C.bX(q.createWritable(),o),$async$aG)
case 11:p=e
o=y.q
x=12
return A.as(C.bX(p.write(r),o),$async$aG)
case 12:x=13
return A.as(C.bX(p.close(),o),$async$aG)
case 13:u=2
x=9
break
case 7:u=6
h=t.pop()
x=9
break
case 6:x=2
break
case 9:x=4
break
case 5:m=new j.Blob(A.b([r],y.x),{type:"text/plain"})
l=j.URL.createObjectURL(m)
k=j.document.createElement("a")
k.href=l
k.download=s.a.c
k.style.display="none"
o=j.document.body
if(o!=null)o.append(k)
k.click()
k.remove()
j.URL.revokeObjectURL(l)
case 4:case 1:return A.aX(v,w)
case 2:return A.aW(t.at(-1),w)}})
return A.aY($async$aG,w)},
q(d){var x="Download file"
return H.aH(E.h,null,x,!1,null,"download",this.d,this.gf5(),I.p,x)}}
var z=a.updateTypes(["a8<~>()"]);(function installTearOffs(){var x=a._instance_0u
x(B.hV.prototype,"gf5","aG",0)})();(function inheritance(){var x=a.inherit
x(B.c8,D.a_)
x(B.hV,D.U)})()
A.w(b.typeUniverse,JSON.parse('{"c8":{"e":[]}}'))
var y={k:A.d("j<p>"),x:A.d("j<a>"),h:A.d("p"),b:A.d("ae<p>"),B:A.d("n<a>"),w:A.d("a"),q:A.d("i?"),v:A.d("~")}};
(a=>{a["ma0LYVlwa5CQEbpN635fVJR9q5Q="]=a.current})($__dart_deferred_initializers__);