var Ru=Object.defineProperty;var Cu=(i,t,e)=>t in i?Ru(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var nt=(i,t,e)=>Cu(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Yo="170",ns={ROTATE:0,DOLLY:1,PAN:2},Qi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Pu=0,Ll=1,Lu=2,dh=1,fh=2,Dn=3,ri=0,ke=1,en=2,ti=0,is=1,Dl=2,Il=3,Ul=4,Du=5,yi=100,Iu=101,Uu=102,Nu=103,Fu=104,Ou=200,ku=201,Bu=202,zu=203,to=204,eo=205,Hu=206,Gu=207,Vu=208,Wu=209,Xu=210,qu=211,$u=212,Yu=213,ju=214,no=0,io=1,so=2,ls=3,ro=4,ao=5,oo=6,lo=7,ph=0,Zu=1,Ku=2,ei=0,Ju=1,Qu=2,td=3,ed=4,nd=5,id=6,mh=7,gh=300,cs=301,hs=302,co=303,ho=304,oa=306,us=1e3,Mi=1001,uo=1002,Ge=1003,sd=1004,lr=1005,bn=1006,pa=1007,Si=1008,Bn=1009,_h=1010,vh=1011,Ws=1012,jo=1013,Ei=1014,Mn=1015,er=1016,Zo=1017,Ko=1018,ds=1020,xh=35902,yh=1021,bh=1022,dn=1023,Mh=1024,Sh=1025,ss=1026,fs=1027,Jo=1028,Qo=1029,wh=1030,tl=1031,el=1033,Hr=33776,Gr=33777,Vr=33778,Wr=33779,fo=35840,po=35841,mo=35842,go=35843,_o=36196,vo=37492,xo=37496,yo=37808,bo=37809,Mo=37810,So=37811,wo=37812,Eo=37813,To=37814,Ao=37815,Ro=37816,Co=37817,Po=37818,Lo=37819,Do=37820,Io=37821,Xr=36492,Uo=36494,No=36495,Eh=36283,Fo=36284,Oo=36285,ko=36286,rd=3200,ad=3201,Th=0,od=1,Jn="",Ee="srgb",_s="srgb-linear",la="linear",ae="srgb",Ii=7680,Nl=519,ld=512,cd=513,hd=514,Ah=515,ud=516,dd=517,fd=518,pd=519,Fl=35044,Ol="300 es",Fn=2e3,Zr=2001;class Pi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let kl=1234567;const ks=Math.PI/180,Xs=180/Math.PI;function Li(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Le[i&255]+Le[i>>8&255]+Le[i>>16&255]+Le[i>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]).toLowerCase()}function ve(i,t,e){return Math.max(t,Math.min(e,i))}function nl(i,t){return(i%t+t)%t}function md(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function gd(i,t,e){return i!==t?(e-i)/(t-i):0}function Bs(i,t,e){return(1-e)*i+e*t}function _d(i,t,e,n){return Bs(i,t,1-Math.exp(-e*n))}function vd(i,t=1){return t-Math.abs(nl(i,t*2)-t)}function xd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function yd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function bd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Md(i,t){return i+Math.random()*(t-i)}function Sd(i){return i*(.5-Math.random())}function wd(i){i!==void 0&&(kl=i);let t=kl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ed(i){return i*ks}function Td(i){return i*Xs}function Ad(i){return(i&i-1)===0&&i!==0}function Rd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Cd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Pd(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),f=a((t-n)/2),d=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*u,l*f,o*c);break;case"YZY":i.set(l*f,o*h,l*u,o*c);break;case"ZXZ":i.set(l*u,l*f,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*d,o*c);break;case"YXY":i.set(l*d,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*d,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ki(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ne(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Zn={DEG2RAD:ks,RAD2DEG:Xs,generateUUID:Li,clamp:ve,euclideanModulo:nl,mapLinear:md,inverseLerp:gd,lerp:Bs,damp:_d,pingpong:vd,smoothstep:xd,smootherstep:yd,randInt:bd,randFloat:Md,randFloatSpread:Sd,seededRandom:wd,degToRad:Ed,radToDeg:Td,isPowerOfTwo:Ad,ceilPowerOfTwo:Rd,floorPowerOfTwo:Cd,setQuaternionFromProperEuler:Pd,normalize:Ne,denormalize:Ki};class it{constructor(t=0,e=0){it.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ve(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xt{constructor(t,e,n,s,r,a,o,l,c){Xt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],v=s[0],m=s[3],p=s[6],w=s[1],S=s[4],x=s[7],I=s[2],_=s[5],b=s[8];return r[0]=a*v+o*w+l*I,r[3]=a*m+o*S+l*_,r[6]=a*p+o*x+l*b,r[1]=c*v+h*w+u*I,r[4]=c*m+h*S+u*_,r[7]=c*p+h*x+u*b,r[2]=f*v+d*w+g*I,r[5]=f*m+d*S+g*_,r[8]=f*p+d*x+g*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,d=c*r-a*l,g=e*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*c-h*n)*v,t[2]=(o*n-s*a)*v,t[3]=f*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=d*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(ma.makeScale(t,e)),this}rotate(t){return this.premultiply(ma.makeRotation(-t)),this}translate(t,e){return this.premultiply(ma.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ma=new Xt;function Rh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Kr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ld(){const i=Kr("canvas");return i.style.display="block",i}const Bl={};function Is(i){i in Bl||(Bl[i]=!0,console.warn(i))}function Dd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Id(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Ud(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Qt={enabled:!0,workingColorSpace:_s,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ae&&(i.r=On(i.r),i.g=On(i.g),i.b=On(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ae&&(i.r=rs(i.r),i.g=rs(i.g),i.b=rs(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Jn?la:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function On(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function rs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const zl=[.64,.33,.3,.6,.15,.06],Hl=[.2126,.7152,.0722],Gl=[.3127,.329],Vl=new Xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wl=new Xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Qt.define({[_s]:{primaries:zl,whitePoint:Gl,transfer:la,toXYZ:Vl,fromXYZ:Wl,luminanceCoefficients:Hl,workingColorSpaceConfig:{unpackColorSpace:Ee},outputColorSpaceConfig:{drawingBufferColorSpace:Ee}},[Ee]:{primaries:zl,whitePoint:Gl,transfer:ae,toXYZ:Vl,fromXYZ:Wl,luminanceCoefficients:Hl,outputColorSpaceConfig:{drawingBufferColorSpace:Ee}}});let Ui;class Nd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ui===void 0&&(Ui=Kr("canvas")),Ui.width=t.width,Ui.height=t.height;const n=Ui.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ui}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Kr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=On(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(On(e[n]/255)*255):e[n]=On(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Fd=0;class Ch{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=Li(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ga(s[a].image)):r.push(ga(s[a]))}else r=ga(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function ga(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Nd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Od=0;class Ue extends Pi{constructor(t=Ue.DEFAULT_IMAGE,e=Ue.DEFAULT_MAPPING,n=Mi,s=Mi,r=bn,a=Si,o=dn,l=Bn,c=Ue.DEFAULT_ANISOTROPY,h=Jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=Li(),this.name="",this.source=new Ch(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new it(0,0),this.repeat=new it(1,1),this.center=new it(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==gh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case us:t.x=t.x-Math.floor(t.x);break;case Mi:t.x=t.x<0?0:1;break;case uo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case us:t.y=t.y-Math.floor(t.y);break;case Mi:t.y=t.y<0?0:1;break;case uo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ue.DEFAULT_IMAGE=null;Ue.DEFAULT_MAPPING=gh;Ue.DEFAULT_ANISOTROPY=1;class le{constructor(t=0,e=0,n=0,s=1){le.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(c+1)/2,x=(d+1)/2,I=(p+1)/2,_=(h+f)/4,b=(u+v)/4,E=(g+m)/4;return S>x&&S>I?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=_/n,r=b/n):x>I?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=_/s,r=E/s):I<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),n=b/r,s=E/r),this.set(n,s,r,e),this}let w=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(u-v)/w,this.z=(f-h)/w,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class kd extends Pi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new le(0,0,t,e),this.scissorTest=!1,this.viewport=new le(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ue(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ch(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ti extends kd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ph extends Ue{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Bd extends Ue{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const f=r[a+0],d=r[a+1],g=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==f||c!==d||h!==g){let m=1-o;const p=l*f+c*d+h*g+u*v,w=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const I=Math.sqrt(S),_=Math.atan2(I,p*w);m=Math.sin(m*_)/I,o=Math.sin(o*_)/I}const x=o*w;if(l=l*m+f*x,c=c*m+d*x,h=h*m+g*x,u=u*m+v*x,m===1-o){const I=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=I,c*=I,h*=I,u*=I}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*d-c*f,t[e+1]=l*g+h*f+c*u-o*d,t[e+2]=c*g+h*d+o*f-l*u,t[e+3]=h*g-o*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),f=l(n/2),d=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(n>o&&n>u){const d=2*Math.sqrt(1+n-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>u){const d=2*Math.sqrt(1+o-n-u);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ve(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const d=1-e;return this._w=d*a+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Xl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return _a.copy(this).projectOnVector(t),this.sub(_a)}reflect(t){return this.sub(_a.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ve(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const _a=new D,Xl=new pn;class zn{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(on.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(on.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=on.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,on):on.fromBufferAttribute(r,a),on.applyMatrix4(t.matrixWorld),this.expandByPoint(on);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),cr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),cr.copy(n.boundingBox)),cr.applyMatrix4(t.matrixWorld),this.union(cr)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,on),on.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ms),hr.subVectors(this.max,Ms),Ni.subVectors(t.a,Ms),Fi.subVectors(t.b,Ms),Oi.subVectors(t.c,Ms),Vn.subVectors(Fi,Ni),Wn.subVectors(Oi,Fi),li.subVectors(Ni,Oi);let e=[0,-Vn.z,Vn.y,0,-Wn.z,Wn.y,0,-li.z,li.y,Vn.z,0,-Vn.x,Wn.z,0,-Wn.x,li.z,0,-li.x,-Vn.y,Vn.x,0,-Wn.y,Wn.x,0,-li.y,li.x,0];return!va(e,Ni,Fi,Oi,hr)||(e=[1,0,0,0,1,0,0,0,1],!va(e,Ni,Fi,Oi,hr))?!1:(ur.crossVectors(Vn,Wn),e=[ur.x,ur.y,ur.z],va(e,Ni,Fi,Oi,hr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,on).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(on).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(An[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),An[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),An[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),An[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),An[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),An[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),An[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),An[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(An),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const An=[new D,new D,new D,new D,new D,new D,new D,new D],on=new D,cr=new zn,Ni=new D,Fi=new D,Oi=new D,Vn=new D,Wn=new D,li=new D,Ms=new D,hr=new D,ur=new D,ci=new D;function va(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ci.fromArray(i,r);const o=s.x*Math.abs(ci.x)+s.y*Math.abs(ci.y)+s.z*Math.abs(ci.z),l=t.dot(ci),c=e.dot(ci),h=n.dot(ci);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const zd=new zn,Ss=new D,xa=new D;class nr{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):zd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ss.subVectors(t,this.center);const e=Ss.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ss,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(xa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ss.copy(t.center).add(xa)),this.expandByPoint(Ss.copy(t.center).sub(xa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Rn=new D,ya=new D,dr=new D,Xn=new D,ba=new D,fr=new D,Ma=new D;class il{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Rn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Rn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Rn.copy(this.origin).addScaledVector(this.direction,e),Rn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ya.copy(t).add(e).multiplyScalar(.5),dr.copy(e).sub(t).normalize(),Xn.copy(this.origin).sub(ya);const r=t.distanceTo(e)*.5,a=-this.direction.dot(dr),o=Xn.dot(this.direction),l=-Xn.dot(dr),c=Xn.lengthSq(),h=Math.abs(1-a*a);let u,f,d,g;if(h>0)if(u=a*l-o,f=a*o-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const v=1/h;u*=v,f*=v,d=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ya).addScaledVector(dr,f),d}intersectSphere(t,e){Rn.subVectors(t.center,this.origin);const n=Rn.dot(this.direction),s=Rn.dot(Rn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Rn)!==null}intersectTriangle(t,e,n,s,r){ba.subVectors(e,t),fr.subVectors(n,t),Ma.crossVectors(ba,fr);let a=this.direction.dot(Ma),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Xn.subVectors(this.origin,t);const l=o*this.direction.dot(fr.crossVectors(Xn,fr));if(l<0)return null;const c=o*this.direction.dot(ba.cross(Xn));if(c<0||l+c>a)return null;const h=-o*Xn.dot(Ma);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class re{constructor(t,e,n,s,r,a,o,l,c,h,u,f,d,g,v,m){re.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,u,f,d,g,v,m)}set(t,e,n,s,r,a,o,l,c,h,u,f,d,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new re().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/ki.setFromMatrixColumn(t,0).length(),r=1/ki.setFromMatrixColumn(t,1).length(),a=1/ki.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,d=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+g*c,e[5]=f-v*c,e[9]=-o*l,e[2]=v-f*c,e[6]=g+d*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,g=c*h,v=c*u;e[0]=f+v*o,e[4]=g*o-d,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-g,e[6]=v+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,g=c*h,v=c*u;e[0]=f-v*o,e[4]=-a*u,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*h,e[9]=v-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,d=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=g*c-d,e[8]=f*c+v,e[1]=l*u,e[5]=v*c+f,e[9]=d*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,d=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=v-f*u,e[8]=g*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*u+g,e[10]=f-v*u}else if(t.order==="XZY"){const f=a*l,d=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+v,e[5]=a*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=o*h,e[10]=v*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Hd,t,Gd)}lookAt(t,e,n){const s=this.elements;return Xe.subVectors(t,e),Xe.lengthSq()===0&&(Xe.z=1),Xe.normalize(),qn.crossVectors(n,Xe),qn.lengthSq()===0&&(Math.abs(n.z)===1?Xe.x+=1e-4:Xe.z+=1e-4,Xe.normalize(),qn.crossVectors(n,Xe)),qn.normalize(),pr.crossVectors(Xe,qn),s[0]=qn.x,s[4]=pr.x,s[8]=Xe.x,s[1]=qn.y,s[5]=pr.y,s[9]=Xe.y,s[2]=qn.z,s[6]=pr.z,s[10]=Xe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],v=n[6],m=n[10],p=n[14],w=n[3],S=n[7],x=n[11],I=n[15],_=s[0],b=s[4],E=s[8],M=s[12],y=s[1],P=s[5],k=s[9],B=s[13],G=s[2],j=s[6],q=s[10],Q=s[14],X=s[3],ht=s[7],mt=s[11],St=s[15];return r[0]=a*_+o*y+l*G+c*X,r[4]=a*b+o*P+l*j+c*ht,r[8]=a*E+o*k+l*q+c*mt,r[12]=a*M+o*B+l*Q+c*St,r[1]=h*_+u*y+f*G+d*X,r[5]=h*b+u*P+f*j+d*ht,r[9]=h*E+u*k+f*q+d*mt,r[13]=h*M+u*B+f*Q+d*St,r[2]=g*_+v*y+m*G+p*X,r[6]=g*b+v*P+m*j+p*ht,r[10]=g*E+v*k+m*q+p*mt,r[14]=g*M+v*B+m*Q+p*St,r[3]=w*_+S*y+x*G+I*X,r[7]=w*b+S*P+x*j+I*ht,r[11]=w*E+S*k+x*q+I*mt,r[15]=w*M+S*B+x*Q+I*St,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*l*u-s*c*u-r*o*f+n*c*f+s*o*d-n*l*d)+v*(+e*l*d-e*c*f+r*a*f-s*a*d+s*c*h-r*l*h)+m*(+e*c*u-e*o*d-r*a*u+n*a*d+r*o*h-n*c*h)+p*(-s*o*h-e*l*u+e*o*f+s*a*u-n*a*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],v=t[13],m=t[14],p=t[15],w=u*m*c-v*f*c+v*l*d-o*m*d-u*l*p+o*f*p,S=g*f*c-h*m*c-g*l*d+a*m*d+h*l*p-a*f*p,x=h*v*c-g*u*c+g*o*d-a*v*d-h*o*p+a*u*p,I=g*u*l-h*v*l-g*o*f+a*v*f+h*o*m-a*u*m,_=e*w+n*S+s*x+r*I;if(_===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/_;return t[0]=w*b,t[1]=(v*f*r-u*m*r-v*s*d+n*m*d+u*s*p-n*f*p)*b,t[2]=(o*m*r-v*l*r+v*s*c-n*m*c-o*s*p+n*l*p)*b,t[3]=(u*l*r-o*f*r-u*s*c+n*f*c+o*s*d-n*l*d)*b,t[4]=S*b,t[5]=(h*m*r-g*f*r+g*s*d-e*m*d-h*s*p+e*f*p)*b,t[6]=(g*l*r-a*m*r-g*s*c+e*m*c+a*s*p-e*l*p)*b,t[7]=(a*f*r-h*l*r+h*s*c-e*f*c-a*s*d+e*l*d)*b,t[8]=x*b,t[9]=(g*u*r-h*v*r-g*n*d+e*v*d+h*n*p-e*u*p)*b,t[10]=(a*v*r-g*o*r+g*n*c-e*v*c-a*n*p+e*o*p)*b,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*d-e*o*d)*b,t[12]=I*b,t[13]=(h*v*s-g*u*s+g*n*f-e*v*f-h*n*m+e*u*m)*b,t[14]=(g*o*s-a*v*s-g*n*l+e*v*l+a*n*m-e*o*m)*b,t[15]=(a*u*s-h*o*s+h*n*l-e*u*l-a*n*f+e*o*f)*b,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,d=r*h,g=r*u,v=a*h,m=a*u,p=o*u,w=l*c,S=l*h,x=l*u,I=n.x,_=n.y,b=n.z;return s[0]=(1-(v+p))*I,s[1]=(d+x)*I,s[2]=(g-S)*I,s[3]=0,s[4]=(d-x)*_,s[5]=(1-(f+p))*_,s[6]=(m+w)*_,s[7]=0,s[8]=(g+S)*b,s[9]=(m-w)*b,s[10]=(1-(f+v))*b,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=ki.set(s[0],s[1],s[2]).length();const a=ki.set(s[4],s[5],s[6]).length(),o=ki.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ln.copy(this);const c=1/r,h=1/a,u=1/o;return ln.elements[0]*=c,ln.elements[1]*=c,ln.elements[2]*=c,ln.elements[4]*=h,ln.elements[5]*=h,ln.elements[6]*=h,ln.elements[8]*=u,ln.elements[9]*=u,ln.elements[10]*=u,e.setFromRotationMatrix(ln),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=Fn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let d,g;if(o===Fn)d=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Zr)d=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Fn){const l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(a-r),f=(e+t)*c,d=(n+s)*h;let g,v;if(o===Fn)g=(a+r)*u,v=-2*u;else if(o===Zr)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ki=new D,ln=new re,Hd=new D(0,0,0),Gd=new D(1,1,1),qn=new D,pr=new D,Xe=new D,ql=new re,$l=new pn;class _n{constructor(t=0,e=0,n=0,s=_n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ve(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ve(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ve(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ve(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ql.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ql,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return $l.setFromEuler(this),this.setFromQuaternion($l,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_n.DEFAULT_ORDER="XYZ";class sl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Vd=0;const Yl=new D,Bi=new pn,Cn=new re,mr=new D,ws=new D,Wd=new D,Xd=new pn,jl=new D(1,0,0),Zl=new D(0,1,0),Kl=new D(0,0,1),Jl={type:"added"},qd={type:"removed"},zi={type:"childadded",child:null},Sa={type:"childremoved",child:null};class Te extends Pi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=Li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Te.DEFAULT_UP.clone();const t=new D,e=new _n,n=new pn,s=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new re},normalMatrix:{value:new Xt}}),this.matrix=new re,this.matrixWorld=new re,this.matrixAutoUpdate=Te.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Bi.setFromAxisAngle(t,e),this.quaternion.multiply(Bi),this}rotateOnWorldAxis(t,e){return Bi.setFromAxisAngle(t,e),this.quaternion.premultiply(Bi),this}rotateX(t){return this.rotateOnAxis(jl,t)}rotateY(t){return this.rotateOnAxis(Zl,t)}rotateZ(t){return this.rotateOnAxis(Kl,t)}translateOnAxis(t,e){return Yl.copy(t).applyQuaternion(this.quaternion),this.position.add(Yl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(jl,t)}translateY(t){return this.translateOnAxis(Zl,t)}translateZ(t){return this.translateOnAxis(Kl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Cn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?mr.copy(t):mr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Cn.lookAt(ws,mr,this.up):Cn.lookAt(mr,ws,this.up),this.quaternion.setFromRotationMatrix(Cn),s&&(Cn.extractRotation(s.matrixWorld),Bi.setFromRotationMatrix(Cn),this.quaternion.premultiply(Bi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Jl),zi.child=t,this.dispatchEvent(zi),zi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(qd),Sa.child=t,this.dispatchEvent(Sa),Sa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Cn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Cn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Cn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Jl),zi.child=t,this.dispatchEvent(zi),zi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ws,t,Wd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ws,Xd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Te.DEFAULT_UP=new D(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const cn=new D,Pn=new D,wa=new D,Ln=new D,Hi=new D,Gi=new D,Ql=new D,Ea=new D,Ta=new D,Aa=new D,Ra=new le,Ca=new le,Pa=new le;class hn{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),cn.subVectors(t,e),s.cross(cn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){cn.subVectors(s,e),Pn.subVectors(n,e),wa.subVectors(t,e);const a=cn.dot(cn),o=cn.dot(Pn),l=cn.dot(wa),c=Pn.dot(Pn),h=Pn.dot(wa),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Ln)===null?!1:Ln.x>=0&&Ln.y>=0&&Ln.x+Ln.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Ln)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ln.x),l.addScaledVector(a,Ln.y),l.addScaledVector(o,Ln.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return Ra.setScalar(0),Ca.setScalar(0),Pa.setScalar(0),Ra.fromBufferAttribute(t,e),Ca.fromBufferAttribute(t,n),Pa.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Ra,r.x),a.addScaledVector(Ca,r.y),a.addScaledVector(Pa,r.z),a}static isFrontFacing(t,e,n,s){return cn.subVectors(n,e),Pn.subVectors(t,e),cn.cross(Pn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return cn.subVectors(this.c,this.b),Pn.subVectors(this.a,this.b),cn.cross(Pn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return hn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return hn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return hn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return hn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return hn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Hi.subVectors(s,n),Gi.subVectors(r,n),Ea.subVectors(t,n);const l=Hi.dot(Ea),c=Gi.dot(Ea);if(l<=0&&c<=0)return e.copy(n);Ta.subVectors(t,s);const h=Hi.dot(Ta),u=Gi.dot(Ta);if(h>=0&&u<=h)return e.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Hi,a);Aa.subVectors(t,r);const d=Hi.dot(Aa),g=Gi.dot(Aa);if(g>=0&&d<=g)return e.copy(r);const v=d*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Gi,o);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return Ql.subVectors(r,s),o=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(Ql,o);const p=1/(m+v+f);return a=v*p,o=f*p,e.copy(n).addScaledVector(Hi,a).addScaledVector(Gi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Lh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$n={h:0,s:0,l:0},gr={h:0,s:0,l:0};function La(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Ot{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ee){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Qt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Qt.workingColorSpace){if(t=nl(t,1),e=ve(e,0,1),n=ve(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=La(a,r,t+1/3),this.g=La(a,r,t),this.b=La(a,r,t-1/3)}return Qt.toWorkingColorSpace(this,s),this}setStyle(t,e=Ee){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ee){const n=Lh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=On(t.r),this.g=On(t.g),this.b=On(t.b),this}copyLinearToSRGB(t){return this.r=rs(t.r),this.g=rs(t.g),this.b=rs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ee){return Qt.fromWorkingColorSpace(De.copy(this),t),Math.round(ve(De.r*255,0,255))*65536+Math.round(ve(De.g*255,0,255))*256+Math.round(ve(De.b*255,0,255))}getHexString(t=Ee){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.fromWorkingColorSpace(De.copy(this),e);const n=De.r,s=De.g,r=De.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Qt.workingColorSpace){return Qt.fromWorkingColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=Ee){Qt.fromWorkingColorSpace(De.copy(this),t);const e=De.r,n=De.g,s=De.b;return t!==Ee?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL($n),this.setHSL($n.h+t,$n.s+e,$n.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL($n),t.getHSL(gr);const n=Bs($n.h,gr.h,e),s=Bs($n.s,gr.s,e),r=Bs($n.l,gr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const De=new Ot;Ot.NAMES=Lh;let $d=0;class ir extends Pi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=Li(),this.name="",this.blending=is,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=to,this.blendDst=eo,this.blendEquation=yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ot(0,0,0),this.blendAlpha=0,this.depthFunc=ls,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ii,this.stencilZFail=Ii,this.stencilZPass=Ii,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==is&&(n.blending=this.blending),this.side!==ri&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==to&&(n.blendSrc=this.blendSrc),this.blendDst!==eo&&(n.blendDst=this.blendDst),this.blendEquation!==yi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ls&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ii&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ii&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ii&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ca extends ir{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=ph,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const _e=new D,_r=new it;class Ke{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Fl,this.updateRanges=[],this.gpuType=Mn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)_r.fromBufferAttribute(this,e),_r.applyMatrix3(t),this.setXY(e,_r.x,_r.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ki(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ne(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ki(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ki(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ki(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ki(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array),s=Ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array),s=Ne(s,this.array),r=Ne(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Fl&&(t.usage=this.usage),t}}class Dh extends Ke{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Ih extends Ke{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class jt extends Ke{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Yd=0;const Qe=new re,Da=new Te,Vi=new D,qe=new zn,Es=new zn,we=new D;class Se extends Pi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=Li(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Rh(t)?Ih:Dh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Xt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Qe.makeRotationFromQuaternion(t),this.applyMatrix4(Qe),this}rotateX(t){return Qe.makeRotationX(t),this.applyMatrix4(Qe),this}rotateY(t){return Qe.makeRotationY(t),this.applyMatrix4(Qe),this}rotateZ(t){return Qe.makeRotationZ(t),this.applyMatrix4(Qe),this}translate(t,e,n){return Qe.makeTranslation(t,e,n),this.applyMatrix4(Qe),this}scale(t,e,n){return Qe.makeScale(t,e,n),this.applyMatrix4(Qe),this}lookAt(t){return Da.lookAt(t),Da.updateMatrix(),this.applyMatrix4(Da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vi).negate(),this.translate(Vi.x,Vi.y,Vi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new jt(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];qe.setFromBufferAttribute(r),this.morphTargetsRelative?(we.addVectors(this.boundingBox.min,qe.min),this.boundingBox.expandByPoint(we),we.addVectors(this.boundingBox.max,qe.max),this.boundingBox.expandByPoint(we)):(this.boundingBox.expandByPoint(qe.min),this.boundingBox.expandByPoint(qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new nr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(qe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Es.setFromBufferAttribute(o),this.morphTargetsRelative?(we.addVectors(qe.min,Es.min),qe.expandByPoint(we),we.addVectors(qe.max,Es.max),qe.expandByPoint(we)):(qe.expandByPoint(Es.min),qe.expandByPoint(Es.max))}qe.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)we.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(we));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)we.fromBufferAttribute(o,c),l&&(Vi.fromBufferAttribute(t,c),we.add(Vi)),s=Math.max(s,n.distanceToSquared(we))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ke(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let E=0;E<n.count;E++)o[E]=new D,l[E]=new D;const c=new D,h=new D,u=new D,f=new it,d=new it,g=new it,v=new D,m=new D;function p(E,M,y){c.fromBufferAttribute(n,E),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,y),f.fromBufferAttribute(r,E),d.fromBufferAttribute(r,M),g.fromBufferAttribute(r,y),h.sub(c),u.sub(c),d.sub(f),g.sub(f);const P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(P),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(P),o[E].add(v),o[M].add(v),o[y].add(v),l[E].add(m),l[M].add(m),l[y].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let E=0,M=w.length;E<M;++E){const y=w[E],P=y.start,k=y.count;for(let B=P,G=P+k;B<G;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const S=new D,x=new D,I=new D,_=new D;function b(E){I.fromBufferAttribute(s,E),_.copy(I);const M=o[E];S.copy(M),S.sub(I.multiplyScalar(I.dot(M))).normalize(),x.crossVectors(_,M);const P=x.dot(l[E])<0?-1:1;a.setXYZW(E,S.x,S.y,S.z,P)}for(let E=0,M=w.length;E<M;++E){const y=w[E],P=y.start,k=y.count;for(let B=P,G=P+k;B<G;B+=3)b(t.getX(B+0)),b(t.getX(B+1)),b(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ke(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new D,r=new D,a=new D,o=new D,l=new D,c=new D,h=new D,u=new D;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)we.fromBufferAttribute(t,e),we.normalize(),t.setXYZ(e,we.x,we.y,we.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let d=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?d=l[v]*o.data.stride+o.offset:d=l[v]*h;for(let p=0;p<h;p++)f[g++]=c[d++]}return new Ke(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Se,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const tc=new re,hi=new il,vr=new nr,ec=new D,xr=new D,yr=new D,br=new D,Ia=new D,Mr=new D,nc=new D,Sr=new D;class Ht extends Te{constructor(t=new Se,e=new ca){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Mr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Ia.fromBufferAttribute(u,t),a?Mr.addScaledVector(Ia,h):Mr.addScaledVector(Ia.sub(e),h))}e.add(Mr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),vr.copy(n.boundingSphere),vr.applyMatrix4(r),hi.copy(t.ray).recast(t.near),!(vr.containsPoint(hi.origin)===!1&&(hi.intersectSphere(vr,ec)===null||hi.origin.distanceToSquared(ec)>(t.far-t.near)**2))&&(tc.copy(r).invert(),hi.copy(t.ray).applyMatrix4(tc),!(n.boundingBox!==null&&hi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,hi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=a[m.materialIndex],w=Math.max(m.start,d.start),S=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let x=w,I=S;x<I;x+=3){const _=o.getX(x),b=o.getX(x+1),E=o.getX(x+2);s=wr(this,p,t,n,c,h,u,_,b,E),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const w=o.getX(m),S=o.getX(m+1),x=o.getX(m+2);s=wr(this,a,t,n,c,h,u,w,S,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=a[m.materialIndex],w=Math.max(m.start,d.start),S=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let x=w,I=S;x<I;x+=3){const _=x,b=x+1,E=x+2;s=wr(this,p,t,n,c,h,u,_,b,E),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const w=m,S=m+1,x=m+2;s=wr(this,a,t,n,c,h,u,w,S,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function jd(i,t,e,n,s,r,a,o){let l;if(t.side===ke?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===ri,o),l===null)return null;Sr.copy(o),Sr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Sr);return c<e.near||c>e.far?null:{distance:c,point:Sr.clone(),object:i}}function wr(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,xr),i.getVertexPosition(l,yr),i.getVertexPosition(c,br);const h=jd(i,t,e,n,xr,yr,br,nc);if(h){const u=new D;hn.getBarycoord(nc,xr,yr,br,u),s&&(h.uv=hn.getInterpolatedAttribute(s,o,l,c,u,new it)),r&&(h.uv1=hn.getInterpolatedAttribute(r,o,l,c,u,new it)),a&&(h.normal=hn.getInterpolatedAttribute(a,o,l,c,u,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new D,materialIndex:0};hn.getNormal(xr,yr,br,f.normal),h.face=f,h.barycoord=u}return h}class He extends Se{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new jt(c,3)),this.setAttribute("normal",new jt(h,3)),this.setAttribute("uv",new jt(u,2));function g(v,m,p,w,S,x,I,_,b,E,M){const y=x/b,P=I/E,k=x/2,B=I/2,G=_/2,j=b+1,q=E+1;let Q=0,X=0;const ht=new D;for(let mt=0;mt<q;mt++){const St=mt*P-B;for(let kt=0;kt<j;kt++){const Bt=kt*y-k;ht[v]=Bt*w,ht[m]=St*S,ht[p]=G,c.push(ht.x,ht.y,ht.z),ht[v]=0,ht[m]=0,ht[p]=_>0?1:-1,h.push(ht.x,ht.y,ht.z),u.push(kt/b),u.push(1-mt/E),Q+=1}}for(let mt=0;mt<E;mt++)for(let St=0;St<b;St++){const kt=f+St+j*mt,Bt=f+St+j*(mt+1),Y=f+(St+1)+j*(mt+1),rt=f+(St+1)+j*mt;l.push(kt,Bt,rt),l.push(Bt,Y,rt),X+=6}o.addGroup(d,X,M),d+=X,f+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new He(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ps(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Fe(i){const t={};for(let e=0;e<i.length;e++){const n=ps(i[e]);for(const s in n)t[s]=n[s]}return t}function Zd(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Uh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}const Kd={clone:ps,merge:Fe};var Jd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ai extends ir{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Jd,this.fragmentShader=Qd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ps(t.uniforms),this.uniformsGroups=Zd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Nh extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new re,this.projectionMatrix=new re,this.projectionMatrixInverse=new re,this.coordinateSystem=Fn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Yn=new D,ic=new it,sc=new it;class Ze extends Nh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Xs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ks*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Xs*2*Math.atan(Math.tan(ks*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Yn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z),Yn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z)}getViewSize(t,e){return this.getViewBounds(t,ic,sc),e.subVectors(sc,ic)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ks*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Wi=-90,Xi=1;class tf extends Te{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ze(Wi,Xi,t,e);s.layers=this.layers,this.add(s);const r=new Ze(Wi,Xi,t,e);r.layers=this.layers,this.add(r);const a=new Ze(Wi,Xi,t,e);a.layers=this.layers,this.add(a);const o=new Ze(Wi,Xi,t,e);o.layers=this.layers,this.add(o);const l=new Ze(Wi,Xi,t,e);l.layers=this.layers,this.add(l);const c=new Ze(Wi,Xi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===Fn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Zr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Fh extends Ue{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:cs,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ef extends Ti{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Fh(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:bn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new He(5,5,5),r=new ai({name:"CubemapFromEquirect",uniforms:ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ke,blending:ti});r.uniforms.tEquirect.value=e;const a=new Ht(s,r),o=e.minFilter;return e.minFilter===Si&&(e.minFilter=bn),new tf(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const Ua=new D,nf=new D,sf=new Xt;class Kn{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Ua.subVectors(n,e).cross(nf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ua),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||sf.getNormalMatrix(t),s=this.coplanarPoint(Ua).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ui=new nr,Er=new D;class rl{constructor(t=new Kn,e=new Kn,n=new Kn,s=new Kn,r=new Kn,a=new Kn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Fn){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],d=s[8],g=s[9],v=s[10],m=s[11],p=s[12],w=s[13],S=s[14],x=s[15];if(n[0].setComponents(l-r,f-c,m-d,x-p).normalize(),n[1].setComponents(l+r,f+c,m+d,x+p).normalize(),n[2].setComponents(l+a,f+h,m+g,x+w).normalize(),n[3].setComponents(l-a,f-h,m-g,x-w).normalize(),n[4].setComponents(l-o,f-u,m-v,x-S).normalize(),e===Fn)n[5].setComponents(l+o,f+u,m+v,x+S).normalize();else if(e===Zr)n[5].setComponents(o,u,v,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ui.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ui.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ui)}intersectsSprite(t){return ui.center.set(0,0,0),ui.radius=.7071067811865476,ui.applyMatrix4(t.matrixWorld),this.intersectsSphere(ui)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Er.x=s.normal.x>0?t.max.x:t.min.x,Er.y=s.normal.y>0?t.max.y:t.min.y,Er.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Er)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Oh(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function rf(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],v=u[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,u[f]=v)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const v=u[d];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class mn extends Se{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=t/o,f=e/l,d=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const w=p*f-a;for(let S=0;S<c;S++){const x=S*u-r;g.push(x,-w,0),v.push(0,0,1),m.push(S/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let w=0;w<o;w++){const S=w+c*p,x=w+c*(p+1),I=w+1+c*(p+1),_=w+1+c*p;d.push(S,x,_),d.push(x,I,_)}this.setIndex(d),this.setAttribute("position",new jt(g,3)),this.setAttribute("normal",new jt(v,3)),this.setAttribute("uv",new jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new mn(t.width,t.height,t.widthSegments,t.heightSegments)}}var af=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,of=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,lf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,uf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,df=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ff=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,mf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,gf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_f=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,xf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,yf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,bf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Mf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ef=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Tf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Af=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Rf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Cf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Pf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Lf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Df=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,If=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Uf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Nf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ff="gl_FragColor = linearToOutputTexel( gl_FragColor );",Of=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,kf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Bf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,zf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Hf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Vf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Wf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Xf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,$f=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Yf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Kf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Jf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Qf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,tp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ep=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,np=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ip=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,sp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,rp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ap=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,op=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,cp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,up=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,dp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,fp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,pp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,mp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_p=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,vp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,xp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,yp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Mp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,wp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ep=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ap=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Rp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Cp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Pp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Lp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Dp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ip=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Up=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Np=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Fp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Op=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,kp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Bp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,zp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Gp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Vp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Wp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Xp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,qp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,$p=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Yp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,jp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Zp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Kp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Qp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,tm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,em=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,nm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,im=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,sm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const rm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,am=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,om=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,um=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,dm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,fm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,pm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,mm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_m=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ym=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,wm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Em=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Tm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Am=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Pm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Im=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Um=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Nm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Om=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,km=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Yt={alphahash_fragment:af,alphahash_pars_fragment:of,alphamap_fragment:lf,alphamap_pars_fragment:cf,alphatest_fragment:hf,alphatest_pars_fragment:uf,aomap_fragment:df,aomap_pars_fragment:ff,batching_pars_vertex:pf,batching_vertex:mf,begin_vertex:gf,beginnormal_vertex:_f,bsdfs:vf,iridescence_fragment:xf,bumpmap_pars_fragment:yf,clipping_planes_fragment:bf,clipping_planes_pars_fragment:Mf,clipping_planes_pars_vertex:Sf,clipping_planes_vertex:wf,color_fragment:Ef,color_pars_fragment:Tf,color_pars_vertex:Af,color_vertex:Rf,common:Cf,cube_uv_reflection_fragment:Pf,defaultnormal_vertex:Lf,displacementmap_pars_vertex:Df,displacementmap_vertex:If,emissivemap_fragment:Uf,emissivemap_pars_fragment:Nf,colorspace_fragment:Ff,colorspace_pars_fragment:Of,envmap_fragment:kf,envmap_common_pars_fragment:Bf,envmap_pars_fragment:zf,envmap_pars_vertex:Hf,envmap_physical_pars_fragment:Jf,envmap_vertex:Gf,fog_vertex:Vf,fog_pars_vertex:Wf,fog_fragment:Xf,fog_pars_fragment:qf,gradientmap_pars_fragment:$f,lightmap_pars_fragment:Yf,lights_lambert_fragment:jf,lights_lambert_pars_fragment:Zf,lights_pars_begin:Kf,lights_toon_fragment:Qf,lights_toon_pars_fragment:tp,lights_phong_fragment:ep,lights_phong_pars_fragment:np,lights_physical_fragment:ip,lights_physical_pars_fragment:sp,lights_fragment_begin:rp,lights_fragment_maps:ap,lights_fragment_end:op,logdepthbuf_fragment:lp,logdepthbuf_pars_fragment:cp,logdepthbuf_pars_vertex:hp,logdepthbuf_vertex:up,map_fragment:dp,map_pars_fragment:fp,map_particle_fragment:pp,map_particle_pars_fragment:mp,metalnessmap_fragment:gp,metalnessmap_pars_fragment:_p,morphinstance_vertex:vp,morphcolor_vertex:xp,morphnormal_vertex:yp,morphtarget_pars_vertex:bp,morphtarget_vertex:Mp,normal_fragment_begin:Sp,normal_fragment_maps:wp,normal_pars_fragment:Ep,normal_pars_vertex:Tp,normal_vertex:Ap,normalmap_pars_fragment:Rp,clearcoat_normal_fragment_begin:Cp,clearcoat_normal_fragment_maps:Pp,clearcoat_pars_fragment:Lp,iridescence_pars_fragment:Dp,opaque_fragment:Ip,packing:Up,premultiplied_alpha_fragment:Np,project_vertex:Fp,dithering_fragment:Op,dithering_pars_fragment:kp,roughnessmap_fragment:Bp,roughnessmap_pars_fragment:zp,shadowmap_pars_fragment:Hp,shadowmap_pars_vertex:Gp,shadowmap_vertex:Vp,shadowmask_pars_fragment:Wp,skinbase_vertex:Xp,skinning_pars_vertex:qp,skinning_vertex:$p,skinnormal_vertex:Yp,specularmap_fragment:jp,specularmap_pars_fragment:Zp,tonemapping_fragment:Kp,tonemapping_pars_fragment:Jp,transmission_fragment:Qp,transmission_pars_fragment:tm,uv_pars_fragment:em,uv_pars_vertex:nm,uv_vertex:im,worldpos_vertex:sm,background_vert:rm,background_frag:am,backgroundCube_vert:om,backgroundCube_frag:lm,cube_vert:cm,cube_frag:hm,depth_vert:um,depth_frag:dm,distanceRGBA_vert:fm,distanceRGBA_frag:pm,equirect_vert:mm,equirect_frag:gm,linedashed_vert:_m,linedashed_frag:vm,meshbasic_vert:xm,meshbasic_frag:ym,meshlambert_vert:bm,meshlambert_frag:Mm,meshmatcap_vert:Sm,meshmatcap_frag:wm,meshnormal_vert:Em,meshnormal_frag:Tm,meshphong_vert:Am,meshphong_frag:Rm,meshphysical_vert:Cm,meshphysical_frag:Pm,meshtoon_vert:Lm,meshtoon_frag:Dm,points_vert:Im,points_frag:Um,shadow_vert:Nm,shadow_frag:Fm,sprite_vert:Om,sprite_frag:km},dt={common:{diffuse:{value:new Ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new Ot(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},yn={basic:{uniforms:Fe([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:Fe([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:Fe([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Ot(0)},specular:{value:new Ot(1118481)},shininess:{value:30}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:Fe([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:Fe([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:Fe([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:Fe([dt.points,dt.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:Fe([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:Fe([dt.common,dt.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:Fe([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:Fe([dt.sprite,dt.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distanceRGBA:{uniforms:Fe([dt.common,dt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distanceRGBA_vert,fragmentShader:Yt.distanceRGBA_frag},shadow:{uniforms:Fe([dt.lights,dt.fog,{color:{value:new Ot(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};yn.physical={uniforms:Fe([yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new Ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new Ot(0)},specularColor:{value:new Ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};const Tr={r:0,b:0,g:0},di=new _n,Bm=new re;function zm(i,t,e,n,s,r,a){const o=new Ot(0);let l=r===!0?0:1,c,h,u=null,f=0,d=null;function g(w){let S=w.isScene===!0?w.background:null;return S&&S.isTexture&&(S=(w.backgroundBlurriness>0?e:t).get(S)),S}function v(w){let S=!1;const x=g(w);x===null?p(o,l):x&&x.isColor&&(p(x,1),S=!0);const I=i.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,a):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(w,S){const x=g(S);x&&(x.isCubeTexture||x.mapping===oa)?(h===void 0&&(h=new Ht(new He(1,1,1),new ai({name:"BackgroundCubeMaterial",uniforms:ps(yn.backgroundCube.uniforms),vertexShader:yn.backgroundCube.vertexShader,fragmentShader:yn.backgroundCube.fragmentShader,side:ke,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,_,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),di.copy(S.backgroundRotation),di.x*=-1,di.y*=-1,di.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(di.y*=-1,di.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Bm.makeRotationFromEuler(di)),h.material.toneMapped=Qt.getTransfer(x.colorSpace)!==ae,(u!==x||f!==x.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,f=x.version,d=i.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Ht(new mn(2,2),new ai({name:"BackgroundMaterial",uniforms:ps(yn.background.uniforms),vertexShader:yn.background.vertexShader,fragmentShader:yn.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=Qt.getTransfer(x.colorSpace)!==ae,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,f=x.version,d=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function p(w,S){w.getRGB(Tr,Uh(i)),n.buffers.color.setClear(Tr.r,Tr.g,Tr.b,S,a)}return{getClearColor:function(){return o},setClearColor:function(w,S=1){o.set(w),l=S,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,p(o,l)},render:v,addToRenderList:m}}function Hm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function o(y,P,k,B,G){let j=!1;const q=u(B,k,P);r!==q&&(r=q,c(r.object)),j=d(y,B,k,G),j&&g(y,B,k,G),G!==null&&t.update(G,i.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,x(y,P,k,B),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,P,k){const B=k.wireframe===!0;let G=n[y.id];G===void 0&&(G={},n[y.id]=G);let j=G[P.id];j===void 0&&(j={},G[P.id]=j);let q=j[B];return q===void 0&&(q=f(l()),j[B]=q),q}function f(y){const P=[],k=[],B=[];for(let G=0;G<e;G++)P[G]=0,k[G]=0,B[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:k,attributeDivisors:B,object:y,attributes:{},index:null}}function d(y,P,k,B){const G=r.attributes,j=P.attributes;let q=0;const Q=k.getAttributes();for(const X in Q)if(Q[X].location>=0){const mt=G[X];let St=j[X];if(St===void 0&&(X==="instanceMatrix"&&y.instanceMatrix&&(St=y.instanceMatrix),X==="instanceColor"&&y.instanceColor&&(St=y.instanceColor)),mt===void 0||mt.attribute!==St||St&&mt.data!==St.data)return!0;q++}return r.attributesNum!==q||r.index!==B}function g(y,P,k,B){const G={},j=P.attributes;let q=0;const Q=k.getAttributes();for(const X in Q)if(Q[X].location>=0){let mt=j[X];mt===void 0&&(X==="instanceMatrix"&&y.instanceMatrix&&(mt=y.instanceMatrix),X==="instanceColor"&&y.instanceColor&&(mt=y.instanceColor));const St={};St.attribute=mt,mt&&mt.data&&(St.data=mt.data),G[X]=St,q++}r.attributes=G,r.attributesNum=q,r.index=B}function v(){const y=r.newAttributes;for(let P=0,k=y.length;P<k;P++)y[P]=0}function m(y){p(y,0)}function p(y,P){const k=r.newAttributes,B=r.enabledAttributes,G=r.attributeDivisors;k[y]=1,B[y]===0&&(i.enableVertexAttribArray(y),B[y]=1),G[y]!==P&&(i.vertexAttribDivisor(y,P),G[y]=P)}function w(){const y=r.newAttributes,P=r.enabledAttributes;for(let k=0,B=P.length;k<B;k++)P[k]!==y[k]&&(i.disableVertexAttribArray(k),P[k]=0)}function S(y,P,k,B,G,j,q){q===!0?i.vertexAttribIPointer(y,P,k,G,j):i.vertexAttribPointer(y,P,k,B,G,j)}function x(y,P,k,B){v();const G=B.attributes,j=k.getAttributes(),q=P.defaultAttributeValues;for(const Q in j){const X=j[Q];if(X.location>=0){let ht=G[Q];if(ht===void 0&&(Q==="instanceMatrix"&&y.instanceMatrix&&(ht=y.instanceMatrix),Q==="instanceColor"&&y.instanceColor&&(ht=y.instanceColor)),ht!==void 0){const mt=ht.normalized,St=ht.itemSize,kt=t.get(ht);if(kt===void 0)continue;const Bt=kt.buffer,Y=kt.type,rt=kt.bytesPerElement,wt=Y===i.INT||Y===i.UNSIGNED_INT||ht.gpuType===jo;if(ht.isInterleavedBufferAttribute){const lt=ht.data,Dt=lt.stride,Ft=ht.offset;if(lt.isInstancedInterleavedBuffer){for(let It=0;It<X.locationSize;It++)p(X.location+It,lt.meshPerAttribute);y.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let It=0;It<X.locationSize;It++)m(X.location+It);i.bindBuffer(i.ARRAY_BUFFER,Bt);for(let It=0;It<X.locationSize;It++)S(X.location+It,St/X.locationSize,Y,mt,Dt*rt,(Ft+St/X.locationSize*It)*rt,wt)}else{if(ht.isInstancedBufferAttribute){for(let lt=0;lt<X.locationSize;lt++)p(X.location+lt,ht.meshPerAttribute);y.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let lt=0;lt<X.locationSize;lt++)m(X.location+lt);i.bindBuffer(i.ARRAY_BUFFER,Bt);for(let lt=0;lt<X.locationSize;lt++)S(X.location+lt,St/X.locationSize,Y,mt,St*rt,St/X.locationSize*lt*rt,wt)}}else if(q!==void 0){const mt=q[Q];if(mt!==void 0)switch(mt.length){case 2:i.vertexAttrib2fv(X.location,mt);break;case 3:i.vertexAttrib3fv(X.location,mt);break;case 4:i.vertexAttrib4fv(X.location,mt);break;default:i.vertexAttrib1fv(X.location,mt)}}}}w()}function I(){E();for(const y in n){const P=n[y];for(const k in P){const B=P[k];for(const G in B)h(B[G].object),delete B[G];delete P[k]}delete n[y]}}function _(y){if(n[y.id]===void 0)return;const P=n[y.id];for(const k in P){const B=P[k];for(const G in B)h(B[G].object),delete B[G];delete P[k]}delete n[y.id]}function b(y){for(const P in n){const k=n[P];if(k[y.id]===void 0)continue;const B=k[y.id];for(const G in B)h(B[G].object),delete B[G];delete k[y.id]}}function E(){M(),a=!0,r!==s&&(r=s,c(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:M,dispose:I,releaseStatesOfGeometry:_,releaseStatesOfProgram:b,initAttributes:v,enableAttribute:m,disableUnusedAttributes:w}}function Gm(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function l(c,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)a(c[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*f[v];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Vm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(b){return!(b!==dn&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(b){const E=b===er&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==Bn&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==Mn&&!E)}function l(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,_=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:w,maxVaryings:S,maxFragmentUniforms:x,vertexTextures:I,maxSamples:_}}function Wm(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Kn,o=new Xt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const w=r?0:n,S=w*4;let x=p.clippingState||null;l.value=x,x=h(g,f,S,d);for(let I=0;I!==S;++I)x[I]=e[I];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=d+v*4,w=f.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,x=d;S!==v;++S,x+=4)a.copy(u[S]).applyMatrix4(w,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function Xm(i){let t=new WeakMap;function e(a,o){return o===co?a.mapping=cs:o===ho&&(a.mapping=hs),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===co||o===ho)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new ef(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class kh extends Nh{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ts=4,rc=[.125,.215,.35,.446,.526,.582],bi=20,Na=new kh,ac=new Ot;let Fa=null,Oa=0,ka=0,Ba=!1;const _i=(1+Math.sqrt(5))/2,qi=1/_i,oc=[new D(-_i,qi,0),new D(_i,qi,0),new D(-qi,0,_i),new D(qi,0,_i),new D(0,_i,-qi),new D(0,_i,qi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)];class Bo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Fa=this._renderer.getRenderTarget(),Oa=this._renderer.getActiveCubeFace(),ka=this._renderer.getActiveMipmapLevel(),Ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Fa,Oa,ka),this._renderer.xr.enabled=Ba,t.scissorTest=!1,Ar(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===cs||t.mapping===hs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Fa=this._renderer.getRenderTarget(),Oa=this._renderer.getActiveCubeFace(),ka=this._renderer.getActiveMipmapLevel(),Ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:bn,minFilter:bn,generateMipmaps:!1,type:er,format:dn,colorSpace:_s,depthBuffer:!1},s=lc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=lc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=qm(r)),this._blurMaterial=$m(r,t,e)}return s}_compileMaterial(t){const e=new Ht(this._lodPlanes[0],t);this._renderer.compile(e,Na)}_sceneToCubeUV(t,e,n,s){const o=new Ze(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(ac),h.toneMapping=ei,h.autoClear=!1;const d=new ca({name:"PMREM.Background",side:ke,depthWrite:!1,depthTest:!1}),g=new Ht(new He,d);let v=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,v=!0):(d.color.copy(ac),v=!0);for(let p=0;p<6;p++){const w=p%3;w===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):w===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const S=this._cubeSize;Ar(s,w*S,p>2?S:0,S,S),h.setRenderTarget(s),v&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===cs||t.mapping===hs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=hc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=cc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ht(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Ar(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Na)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=oc[(s-r-1)%oc.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Ht(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*bi-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):bi;m>bi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${bi}`);const p=[];let w=0;for(let b=0;b<bi;++b){const E=b/v,M=Math.exp(-E*E/2);p.push(M),b===0?w+=M:b<m&&(w+=2*M)}for(let b=0;b<p.length;b++)p[b]=p[b]/w;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-n;const x=this._sizeLods[s],I=3*x*(s>S-ts?s-S+ts:0),_=4*(this._cubeSize-x);Ar(e,I,_,3*x,2*x),l.setRenderTarget(e),l.render(u,Na)}}function qm(i){const t=[],e=[],n=[];let s=i;const r=i-ts+1+rc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-ts?l=rc[a-i+ts-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,v=3,m=2,p=1,w=new Float32Array(v*g*d),S=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let _=0;_<d;_++){const b=_%3*2/3-1,E=_>2?0:-1,M=[b,E,0,b+2/3,E,0,b+2/3,E+1,0,b,E,0,b+2/3,E+1,0,b,E+1,0];w.set(M,v*g*_),S.set(f,m*g*_);const y=[_,_,_,_,_,_];x.set(y,p*g*_)}const I=new Se;I.setAttribute("position",new Ke(w,v)),I.setAttribute("uv",new Ke(S,m)),I.setAttribute("faceIndex",new Ke(x,p)),t.push(I),s>ts&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function lc(i,t,e){const n=new Ti(i,t,e);return n.texture.mapping=oa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ar(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function $m(i,t,e){const n=new Float32Array(bi),s=new D(0,1,0);return new ai({name:"SphericalGaussianBlur",defines:{n:bi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:al(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function cc(){return new ai({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:al(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function hc(){return new ai({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:al(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function al(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ym(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===co||l===ho,h=l===cs||l===hs;if(c||h){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Bo(i)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const d=o.image;return c&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Bo(i)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function jm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Is("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Zm(i,t,e,n){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const v=f.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)t.remove(v[m])}f.removeEventListener("dispose",a),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)t.update(f[g],i.ARRAY_BUFFER);const d=u.morphAttributes;for(const g in d){const v=d[g];for(let m=0,p=v.length;m<p;m++)t.update(v[m],i.ARRAY_BUFFER)}}function c(u){const f=[],d=u.index,g=u.attributes.position;let v=0;if(d!==null){const w=d.array;v=d.version;for(let S=0,x=w.length;S<x;S+=3){const I=w[S+0],_=w[S+1],b=w[S+2];f.push(I,_,_,b,b,I)}}else if(g!==void 0){const w=g.array;v=g.version;for(let S=0,x=w.length/3-1;S<x;S+=3){const I=S+0,_=S+1,b=S+2;f.push(I,_,_,b,b,I)}}else return;const m=new(Rh(f)?Ih:Dh)(f,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Km(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){i.drawElements(n,d,r,f*a),e.update(d,n,1)}function c(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*a,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/a,d[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,v,0,g);let p=0;for(let w=0;w<g;w++)p+=d[w]*v[w];e.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Jm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Qm(i,t,e){const n=new WeakMap,s=new le;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let y=function(){E.dispose(),n.delete(o),o.removeEventListener("dispose",y)};var d=y;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],w=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),v===!0&&(x=2),m===!0&&(x=3);let I=o.attributes.position.count*x,_=1;I>t.maxTextureSize&&(_=Math.ceil(I/t.maxTextureSize),I=t.maxTextureSize);const b=new Float32Array(I*_*4*u),E=new Ph(b,I,_,u);E.type=Mn,E.needsUpdate=!0;const M=x*4;for(let P=0;P<u;P++){const k=p[P],B=w[P],G=S[P],j=I*_*4*P;for(let q=0;q<k.count;q++){const Q=q*M;g===!0&&(s.fromBufferAttribute(k,q),b[j+Q+0]=s.x,b[j+Q+1]=s.y,b[j+Q+2]=s.z,b[j+Q+3]=0),v===!0&&(s.fromBufferAttribute(B,q),b[j+Q+4]=s.x,b[j+Q+5]=s.y,b[j+Q+6]=s.z,b[j+Q+7]=0),m===!0&&(s.fromBufferAttribute(G,q),b[j+Q+8]=s.x,b[j+Q+9]=s.y,b[j+Q+10]=s.z,b[j+Q+11]=G.itemSize===4?s.w:1)}}f={count:u,texture:E,size:new it(I,_)},n.set(o,f),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function t0(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class Bh extends Ue{constructor(t,e,n,s,r,a,o,l,c,h=ss){if(h!==ss&&h!==fs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ss&&(n=Ei),n===void 0&&h===fs&&(n=ds),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ge,this.minFilter=l!==void 0?l:Ge,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const zh=new Ue,uc=new Bh(1,1),Hh=new Ph,Gh=new Bd,Vh=new Fh,dc=[],fc=[],pc=new Float32Array(16),mc=new Float32Array(9),gc=new Float32Array(4);function vs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=dc[s];if(r===void 0&&(r=new Float32Array(s),dc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function be(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Me(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ha(i,t){let e=fc[t];e===void 0&&(e=new Int32Array(t),fc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function e0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function n0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2fv(this.addr,t),Me(e,t)}}function i0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(be(e,t))return;i.uniform3fv(this.addr,t),Me(e,t)}}function s0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4fv(this.addr,t),Me(e,t)}}function r0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Me(e,t)}else{if(be(e,n))return;gc.set(n),i.uniformMatrix2fv(this.addr,!1,gc),Me(e,n)}}function a0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Me(e,t)}else{if(be(e,n))return;mc.set(n),i.uniformMatrix3fv(this.addr,!1,mc),Me(e,n)}}function o0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Me(e,t)}else{if(be(e,n))return;pc.set(n),i.uniformMatrix4fv(this.addr,!1,pc),Me(e,n)}}function l0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function c0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2iv(this.addr,t),Me(e,t)}}function h0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;i.uniform3iv(this.addr,t),Me(e,t)}}function u0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4iv(this.addr,t),Me(e,t)}}function d0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function f0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2uiv(this.addr,t),Me(e,t)}}function p0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;i.uniform3uiv(this.addr,t),Me(e,t)}}function m0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4uiv(this.addr,t),Me(e,t)}}function g0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(uc.compareFunction=Ah,r=uc):r=zh,e.setTexture2D(t||r,s)}function _0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Gh,s)}function v0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Vh,s)}function x0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Hh,s)}function y0(i){switch(i){case 5126:return e0;case 35664:return n0;case 35665:return i0;case 35666:return s0;case 35674:return r0;case 35675:return a0;case 35676:return o0;case 5124:case 35670:return l0;case 35667:case 35671:return c0;case 35668:case 35672:return h0;case 35669:case 35673:return u0;case 5125:return d0;case 36294:return f0;case 36295:return p0;case 36296:return m0;case 35678:case 36198:case 36298:case 36306:case 35682:return g0;case 35679:case 36299:case 36307:return _0;case 35680:case 36300:case 36308:case 36293:return v0;case 36289:case 36303:case 36311:case 36292:return x0}}function b0(i,t){i.uniform1fv(this.addr,t)}function M0(i,t){const e=vs(t,this.size,2);i.uniform2fv(this.addr,e)}function S0(i,t){const e=vs(t,this.size,3);i.uniform3fv(this.addr,e)}function w0(i,t){const e=vs(t,this.size,4);i.uniform4fv(this.addr,e)}function E0(i,t){const e=vs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function T0(i,t){const e=vs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function A0(i,t){const e=vs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function R0(i,t){i.uniform1iv(this.addr,t)}function C0(i,t){i.uniform2iv(this.addr,t)}function P0(i,t){i.uniform3iv(this.addr,t)}function L0(i,t){i.uniform4iv(this.addr,t)}function D0(i,t){i.uniform1uiv(this.addr,t)}function I0(i,t){i.uniform2uiv(this.addr,t)}function U0(i,t){i.uniform3uiv(this.addr,t)}function N0(i,t){i.uniform4uiv(this.addr,t)}function F0(i,t,e){const n=this.cache,s=t.length,r=ha(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||zh,r[a])}function O0(i,t,e){const n=this.cache,s=t.length,r=ha(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Gh,r[a])}function k0(i,t,e){const n=this.cache,s=t.length,r=ha(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Vh,r[a])}function B0(i,t,e){const n=this.cache,s=t.length,r=ha(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Hh,r[a])}function z0(i){switch(i){case 5126:return b0;case 35664:return M0;case 35665:return S0;case 35666:return w0;case 35674:return E0;case 35675:return T0;case 35676:return A0;case 5124:case 35670:return R0;case 35667:case 35671:return C0;case 35668:case 35672:return P0;case 35669:case 35673:return L0;case 5125:return D0;case 36294:return I0;case 36295:return U0;case 36296:return N0;case 35678:case 36198:case 36298:case 36306:case 35682:return F0;case 35679:case 36299:case 36307:return O0;case 35680:case 36300:case 36308:case 36293:return k0;case 36289:case 36303:case 36311:case 36292:return B0}}class H0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=y0(e.type)}}class G0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=z0(e.type)}}class V0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const za=/(\w+)(\])?(\[|\.)?/g;function _c(i,t){i.seq.push(t),i.map[t.id]=t}function W0(i,t,e){const n=i.name,s=n.length;for(za.lastIndex=0;;){const r=za.exec(n),a=za.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){_c(e,c===void 0?new H0(o,i,t):new G0(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new V0(o),_c(e,u)),e=u}}}class qr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);W0(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function vc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const X0=37297;let q0=0;function $0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const xc=new Xt;function Y0(i){Qt._getMatrix(xc,Qt.workingColorSpace,i);const t=`mat3( ${xc.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(i)){case la:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function yc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+$0(i.getShaderSource(t),a)}else return s}function j0(i,t){const e=Y0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Z0(i,t){let e;switch(t){case Ju:e="Linear";break;case Qu:e="Reinhard";break;case td:e="Cineon";break;case ed:e="ACESFilmic";break;case id:e="AgX";break;case mh:e="Neutral";break;case nd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Rr=new D;function K0(){Qt.getLuminanceCoefficients(Rr);const i=Rr.x.toFixed(4),t=Rr.y.toFixed(4),e=Rr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function J0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Us).join(`
`)}function Q0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function tg(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Us(i){return i!==""}function bc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Mc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const eg=/^[ \t]*#include +<([\w\d./]+)>/gm;function zo(i){return i.replace(eg,ig)}const ng=new Map;function ig(i,t){let e=Yt[t];if(e===void 0){const n=ng.get(t);if(n!==void 0)e=Yt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return zo(e)}const sg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sc(i){return i.replace(sg,rg)}function rg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function wc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function ag(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===dh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===fh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Dn&&(t="SHADOWMAP_TYPE_VSM"),t}function og(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case cs:case hs:t="ENVMAP_TYPE_CUBE";break;case oa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function lg(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case hs:t="ENVMAP_MODE_REFRACTION";break}return t}function cg(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ph:t="ENVMAP_BLENDING_MULTIPLY";break;case Zu:t="ENVMAP_BLENDING_MIX";break;case Ku:t="ENVMAP_BLENDING_ADD";break}return t}function hg(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function ug(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=ag(e),c=og(e),h=lg(e),u=cg(e),f=hg(e),d=J0(e),g=Q0(r),v=s.createProgram();let m,p,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Us).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Us).join(`
`),p.length>0&&(p+=`
`)):(m=[wc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Us).join(`
`),p=[wc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ei?"#define TONE_MAPPING":"",e.toneMapping!==ei?Yt.tonemapping_pars_fragment:"",e.toneMapping!==ei?Z0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,j0("linearToOutputTexel",e.outputColorSpace),K0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Us).join(`
`)),a=zo(a),a=bc(a,e),a=Mc(a,e),o=zo(o),o=bc(o,e),o=Mc(o,e),a=Sc(a),o=Sc(o),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Ol?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ol?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=w+m+a,x=w+p+o,I=vc(s,s.VERTEX_SHADER,S),_=vc(s,s.FRAGMENT_SHADER,x);s.attachShader(v,I),s.attachShader(v,_),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function b(P){if(i.debug.checkShaderErrors){const k=s.getProgramInfoLog(v).trim(),B=s.getShaderInfoLog(I).trim(),G=s.getShaderInfoLog(_).trim();let j=!0,q=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,I,_);else{const Q=yc(s,I,"vertex"),X=yc(s,_,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+k+`
`+Q+`
`+X)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(B===""||G==="")&&(q=!1);q&&(P.diagnostics={runnable:j,programLog:k,vertexShader:{log:B,prefix:m},fragmentShader:{log:G,prefix:p}})}s.deleteShader(I),s.deleteShader(_),E=new qr(s,v),M=tg(s,v)}let E;this.getUniforms=function(){return E===void 0&&b(this),E};let M;this.getAttributes=function(){return M===void 0&&b(this),M};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(v,X0)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=q0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=I,this.fragmentShader=_,this}let dg=0;class fg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new pg(t),e.set(t,n)),n}}class pg{constructor(t){this.id=dg++,this.code=t,this.usedTimes=0}}function mg(i,t,e,n,s,r,a){const o=new sl,l=new fg,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,y,P,k,B){const G=k.fog,j=B.geometry,q=M.isMeshStandardMaterial?k.environment:null,Q=(M.isMeshStandardMaterial?e:t).get(M.envMap||q),X=Q&&Q.mapping===oa?Q.image.height:null,ht=g[M.type];M.precision!==null&&(d=s.getMaxPrecision(M.precision),d!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",d,"instead."));const mt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,St=mt!==void 0?mt.length:0;let kt=0;j.morphAttributes.position!==void 0&&(kt=1),j.morphAttributes.normal!==void 0&&(kt=2),j.morphAttributes.color!==void 0&&(kt=3);let Bt,Y,rt,wt;if(ht){const ie=yn[ht];Bt=ie.vertexShader,Y=ie.fragmentShader}else Bt=M.vertexShader,Y=M.fragmentShader,l.update(M),rt=l.getVertexShaderID(M),wt=l.getFragmentShaderID(M);const lt=i.getRenderTarget(),Dt=i.state.buffers.depth.getReversed(),Ft=B.isInstancedMesh===!0,It=B.isBatchedMesh===!0,Kt=!!M.map,L=!!M.matcap,O=!!Q,R=!!M.aoMap,st=!!M.lightMap,Z=!!M.bumpMap,xt=!!M.normalMap,ut=!!M.displacementMap,Ut=!!M.emissiveMap,bt=!!M.metalnessMap,C=!!M.roughnessMap,T=M.anisotropy>0,H=M.clearcoat>0,K=M.dispersion>0,et=M.iridescence>0,J=M.sheen>0,At=M.transmission>0,ft=T&&!!M.anisotropyMap,Mt=H&&!!M.clearcoatMap,Zt=H&&!!M.clearcoatNormalMap,ot=H&&!!M.clearcoatRoughnessMap,Et=et&&!!M.iridescenceMap,Nt=et&&!!M.iridescenceThicknessMap,zt=J&&!!M.sheenColorMap,Tt=J&&!!M.sheenRoughnessMap,Jt=!!M.specularMap,$t=!!M.specularColorMap,he=!!M.specularIntensityMap,U=At&&!!M.transmissionMap,pt=At&&!!M.thicknessMap,$=!!M.gradientMap,tt=!!M.alphaMap,vt=M.alphaTest>0,gt=!!M.alphaHash,Vt=!!M.extensions;let ge=ei;M.toneMapped&&(lt===null||lt.isXRRenderTarget===!0)&&(ge=i.toneMapping);const Pe={shaderID:ht,shaderType:M.type,shaderName:M.name,vertexShader:Bt,fragmentShader:Y,defines:M.defines,customVertexShaderID:rt,customFragmentShaderID:wt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:d,batching:It,batchingColor:It&&B._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&B.instanceColor!==null,instancingMorph:Ft&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:lt===null?i.outputColorSpace:lt.isXRRenderTarget===!0?lt.texture.colorSpace:_s,alphaToCoverage:!!M.alphaToCoverage,map:Kt,matcap:L,envMap:O,envMapMode:O&&Q.mapping,envMapCubeUVHeight:X,aoMap:R,lightMap:st,bumpMap:Z,normalMap:xt,displacementMap:f&&ut,emissiveMap:Ut,normalMapObjectSpace:xt&&M.normalMapType===od,normalMapTangentSpace:xt&&M.normalMapType===Th,metalnessMap:bt,roughnessMap:C,anisotropy:T,anisotropyMap:ft,clearcoat:H,clearcoatMap:Mt,clearcoatNormalMap:Zt,clearcoatRoughnessMap:ot,dispersion:K,iridescence:et,iridescenceMap:Et,iridescenceThicknessMap:Nt,sheen:J,sheenColorMap:zt,sheenRoughnessMap:Tt,specularMap:Jt,specularColorMap:$t,specularIntensityMap:he,transmission:At,transmissionMap:U,thicknessMap:pt,gradientMap:$,opaque:M.transparent===!1&&M.blending===is&&M.alphaToCoverage===!1,alphaMap:tt,alphaTest:vt,alphaHash:gt,combine:M.combine,mapUv:Kt&&v(M.map.channel),aoMapUv:R&&v(M.aoMap.channel),lightMapUv:st&&v(M.lightMap.channel),bumpMapUv:Z&&v(M.bumpMap.channel),normalMapUv:xt&&v(M.normalMap.channel),displacementMapUv:ut&&v(M.displacementMap.channel),emissiveMapUv:Ut&&v(M.emissiveMap.channel),metalnessMapUv:bt&&v(M.metalnessMap.channel),roughnessMapUv:C&&v(M.roughnessMap.channel),anisotropyMapUv:ft&&v(M.anisotropyMap.channel),clearcoatMapUv:Mt&&v(M.clearcoatMap.channel),clearcoatNormalMapUv:Zt&&v(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ot&&v(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Et&&v(M.iridescenceMap.channel),iridescenceThicknessMapUv:Nt&&v(M.iridescenceThicknessMap.channel),sheenColorMapUv:zt&&v(M.sheenColorMap.channel),sheenRoughnessMapUv:Tt&&v(M.sheenRoughnessMap.channel),specularMapUv:Jt&&v(M.specularMap.channel),specularColorMapUv:$t&&v(M.specularColorMap.channel),specularIntensityMapUv:he&&v(M.specularIntensityMap.channel),transmissionMapUv:U&&v(M.transmissionMap.channel),thicknessMapUv:pt&&v(M.thicknessMap.channel),alphaMapUv:tt&&v(M.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(xt||T),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!j.attributes.uv&&(Kt||tt),fog:!!G,useFog:M.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Dt,skinning:B.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:St,morphTextureStride:kt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:ge,decodeVideoTexture:Kt&&M.map.isVideoTexture===!0&&Qt.getTransfer(M.map.colorSpace)===ae,decodeVideoTextureEmissive:Ut&&M.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(M.emissiveMap.colorSpace)===ae,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===en,flipSided:M.side===ke,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Vt&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Vt&&M.extensions.multiDraw===!0||It)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function p(M){const y=[];if(M.shaderID?y.push(M.shaderID):(y.push(M.customVertexShaderID),y.push(M.customFragmentShaderID)),M.defines!==void 0)for(const P in M.defines)y.push(P),y.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(w(y,M),S(y,M),y.push(i.outputColorSpace)),y.push(M.customProgramCacheKey),y.join()}function w(M,y){M.push(y.precision),M.push(y.outputColorSpace),M.push(y.envMapMode),M.push(y.envMapCubeUVHeight),M.push(y.mapUv),M.push(y.alphaMapUv),M.push(y.lightMapUv),M.push(y.aoMapUv),M.push(y.bumpMapUv),M.push(y.normalMapUv),M.push(y.displacementMapUv),M.push(y.emissiveMapUv),M.push(y.metalnessMapUv),M.push(y.roughnessMapUv),M.push(y.anisotropyMapUv),M.push(y.clearcoatMapUv),M.push(y.clearcoatNormalMapUv),M.push(y.clearcoatRoughnessMapUv),M.push(y.iridescenceMapUv),M.push(y.iridescenceThicknessMapUv),M.push(y.sheenColorMapUv),M.push(y.sheenRoughnessMapUv),M.push(y.specularMapUv),M.push(y.specularColorMapUv),M.push(y.specularIntensityMapUv),M.push(y.transmissionMapUv),M.push(y.thicknessMapUv),M.push(y.combine),M.push(y.fogExp2),M.push(y.sizeAttenuation),M.push(y.morphTargetsCount),M.push(y.morphAttributeCount),M.push(y.numDirLights),M.push(y.numPointLights),M.push(y.numSpotLights),M.push(y.numSpotLightMaps),M.push(y.numHemiLights),M.push(y.numRectAreaLights),M.push(y.numDirLightShadows),M.push(y.numPointLightShadows),M.push(y.numSpotLightShadows),M.push(y.numSpotLightShadowsWithMaps),M.push(y.numLightProbes),M.push(y.shadowMapType),M.push(y.toneMapping),M.push(y.numClippingPlanes),M.push(y.numClipIntersection),M.push(y.depthPacking)}function S(M,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),M.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),M.push(o.mask)}function x(M){const y=g[M.type];let P;if(y){const k=yn[y];P=Kd.clone(k.uniforms)}else P=M.uniforms;return P}function I(M,y){let P;for(let k=0,B=h.length;k<B;k++){const G=h[k];if(G.cacheKey===y){P=G,++P.usedTimes;break}}return P===void 0&&(P=new ug(i,y,M,r),h.push(P)),P}function _(M){if(--M.usedTimes===0){const y=h.indexOf(M);h[y]=h[h.length-1],h.pop(),M.destroy()}}function b(M){l.remove(M)}function E(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:I,releaseProgram:_,releaseShaderCache:b,programs:h,dispose:E}}function gg(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function _g(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Ec(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Tc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,f,d,g,v,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function o(u,f,d,g,v,m){const p=a(u,f,d,g,v,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function l(u,f,d,g,v,m){const p=a(u,f,d,g,v,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,f){e.length>1&&e.sort(u||_g),n.length>1&&n.sort(f||Ec),s.length>1&&s.sort(f||Ec)}function h(){for(let u=t,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function vg(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Tc,i.set(n,[a])):s>=r.length?(a=new Tc,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function xg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Ot};break;case"SpotLight":e={position:new D,direction:new D,color:new Ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Ot,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Ot,groundColor:new Ot};break;case"RectAreaLight":e={color:new Ot,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function yg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let bg=0;function Mg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Sg(i){const t=new xg,e=yg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const s=new D,r=new re,a=new re;function o(c){let h=0,u=0,f=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let d=0,g=0,v=0,m=0,p=0,w=0,S=0,x=0,I=0,_=0,b=0;c.sort(Mg);for(let M=0,y=c.length;M<y;M++){const P=c[M],k=P.color,B=P.intensity,G=P.distance,j=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=k.r*B,u+=k.g*B,f+=k.b*B;else if(P.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(P.sh.coefficients[q],B);b++}else if(P.isDirectionalLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const Q=P.shadow,X=e.get(P);X.shadowIntensity=Q.intensity,X.shadowBias=Q.bias,X.shadowNormalBias=Q.normalBias,X.shadowRadius=Q.radius,X.shadowMapSize=Q.mapSize,n.directionalShadow[d]=X,n.directionalShadowMap[d]=j,n.directionalShadowMatrix[d]=P.shadow.matrix,w++}n.directional[d]=q,d++}else if(P.isSpotLight){const q=t.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(k).multiplyScalar(B),q.distance=G,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,n.spot[v]=q;const Q=P.shadow;if(P.map&&(n.spotLightMap[I]=P.map,I++,Q.updateMatrices(P),P.castShadow&&_++),n.spotLightMatrix[v]=Q.matrix,P.castShadow){const X=e.get(P);X.shadowIntensity=Q.intensity,X.shadowBias=Q.bias,X.shadowNormalBias=Q.normalBias,X.shadowRadius=Q.radius,X.shadowMapSize=Q.mapSize,n.spotShadow[v]=X,n.spotShadowMap[v]=j,x++}v++}else if(P.isRectAreaLight){const q=t.get(P);q.color.copy(k).multiplyScalar(B),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=q,m++}else if(P.isPointLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),q.distance=P.distance,q.decay=P.decay,P.castShadow){const Q=P.shadow,X=e.get(P);X.shadowIntensity=Q.intensity,X.shadowBias=Q.bias,X.shadowNormalBias=Q.normalBias,X.shadowRadius=Q.radius,X.shadowMapSize=Q.mapSize,X.shadowCameraNear=Q.camera.near,X.shadowCameraFar=Q.camera.far,n.pointShadow[g]=X,n.pointShadowMap[g]=j,n.pointShadowMatrix[g]=P.shadow.matrix,S++}n.point[g]=q,g++}else if(P.isHemisphereLight){const q=t.get(P);q.skyColor.copy(P.color).multiplyScalar(B),q.groundColor.copy(P.groundColor).multiplyScalar(B),n.hemi[p]=q,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=dt.LTC_FLOAT_1,n.rectAreaLTC2=dt.LTC_FLOAT_2):(n.rectAreaLTC1=dt.LTC_HALF_1,n.rectAreaLTC2=dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const E=n.hash;(E.directionalLength!==d||E.pointLength!==g||E.spotLength!==v||E.rectAreaLength!==m||E.hemiLength!==p||E.numDirectionalShadows!==w||E.numPointShadows!==S||E.numSpotShadows!==x||E.numSpotMaps!==I||E.numLightProbes!==b)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=x+I-_,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=_,n.numLightProbes=b,E.directionalLength=d,E.pointLength=g,E.spotLength=v,E.rectAreaLength=m,E.hemiLength=p,E.numDirectionalShadows=w,E.numPointShadows=S,E.numSpotShadows=x,E.numSpotMaps=I,E.numLightProbes=b,n.version=bg++)}function l(c,h){let u=0,f=0,d=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,w=c.length;p<w;p++){const S=c[p];if(S.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(S.isSpotLight){const x=n.spot[d];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(S.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(S.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(S.width*.5,0,0),x.halfHeight.set(0,S.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(S.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(S.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function Ac(i){const t=new Sg(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function wg(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Ac(i),t.set(s,[o])):r>=a.length?(o=new Ac(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Eg extends ir{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=rd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Tg extends ir{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Ag=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Rg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Cg(i,t,e){let n=new rl;const s=new it,r=new it,a=new le,o=new Eg({depthPacking:ad}),l=new Tg,c={},h=e.maxTextureSize,u={[ri]:ke,[ke]:ri,[en]:en},f=new ai({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:Ag,fragmentShader:Rg}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Se;g.setAttribute("position",new Ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ht(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=dh;let p=this.type;this.render=function(_,b,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||_.length===0)return;const M=i.getRenderTarget(),y=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),k=i.state;k.setBlending(ti),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const B=p!==Dn&&this.type===Dn,G=p===Dn&&this.type!==Dn;for(let j=0,q=_.length;j<q;j++){const Q=_[j],X=Q.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const ht=X.getFrameExtents();if(s.multiply(ht),r.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ht.x),s.x=r.x*ht.x,X.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ht.y),s.y=r.y*ht.y,X.mapSize.y=r.y)),X.map===null||B===!0||G===!0){const St=this.type!==Dn?{minFilter:Ge,magFilter:Ge}:{};X.map!==null&&X.map.dispose(),X.map=new Ti(s.x,s.y,St),X.map.texture.name=Q.name+".shadowMap",X.camera.updateProjectionMatrix()}i.setRenderTarget(X.map),i.clear();const mt=X.getViewportCount();for(let St=0;St<mt;St++){const kt=X.getViewport(St);a.set(r.x*kt.x,r.y*kt.y,r.x*kt.z,r.y*kt.w),k.viewport(a),X.updateMatrices(Q,St),n=X.getFrustum(),x(b,E,X.camera,Q,this.type)}X.isPointLightShadow!==!0&&this.type===Dn&&w(X,E),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(M,y,P)};function w(_,b){const E=t.update(v);f.defines.VSM_SAMPLES!==_.blurSamples&&(f.defines.VSM_SAMPLES=_.blurSamples,d.defines.VSM_SAMPLES=_.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),_.mapPass===null&&(_.mapPass=new Ti(s.x,s.y)),f.uniforms.shadow_pass.value=_.map.texture,f.uniforms.resolution.value=_.mapSize,f.uniforms.radius.value=_.radius,i.setRenderTarget(_.mapPass),i.clear(),i.renderBufferDirect(b,null,E,f,v,null),d.uniforms.shadow_pass.value=_.mapPass.texture,d.uniforms.resolution.value=_.mapSize,d.uniforms.radius.value=_.radius,i.setRenderTarget(_.map),i.clear(),i.renderBufferDirect(b,null,E,d,v,null)}function S(_,b,E,M){let y=null;const P=E.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(P!==void 0)y=P;else if(y=E.isPointLight===!0?l:o,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const k=y.uuid,B=b.uuid;let G=c[k];G===void 0&&(G={},c[k]=G);let j=G[B];j===void 0&&(j=y.clone(),G[B]=j,b.addEventListener("dispose",I)),y=j}if(y.visible=b.visible,y.wireframe=b.wireframe,M===Dn?y.side=b.shadowSide!==null?b.shadowSide:b.side:y.side=b.shadowSide!==null?b.shadowSide:u[b.side],y.alphaMap=b.alphaMap,y.alphaTest=b.alphaTest,y.map=b.map,y.clipShadows=b.clipShadows,y.clippingPlanes=b.clippingPlanes,y.clipIntersection=b.clipIntersection,y.displacementMap=b.displacementMap,y.displacementScale=b.displacementScale,y.displacementBias=b.displacementBias,y.wireframeLinewidth=b.wireframeLinewidth,y.linewidth=b.linewidth,E.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const k=i.properties.get(y);k.light=E}return y}function x(_,b,E,M,y){if(_.visible===!1)return;if(_.layers.test(b.layers)&&(_.isMesh||_.isLine||_.isPoints)&&(_.castShadow||_.receiveShadow&&y===Dn)&&(!_.frustumCulled||n.intersectsObject(_))){_.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,_.matrixWorld);const B=t.update(_),G=_.material;if(Array.isArray(G)){const j=B.groups;for(let q=0,Q=j.length;q<Q;q++){const X=j[q],ht=G[X.materialIndex];if(ht&&ht.visible){const mt=S(_,ht,M,y);_.onBeforeShadow(i,_,b,E,B,mt,X),i.renderBufferDirect(E,null,B,mt,_,X),_.onAfterShadow(i,_,b,E,B,mt,X)}}}else if(G.visible){const j=S(_,G,M,y);_.onBeforeShadow(i,_,b,E,B,j,null),i.renderBufferDirect(E,null,B,j,_,null),_.onAfterShadow(i,_,b,E,B,j,null)}}const k=_.children;for(let B=0,G=k.length;B<G;B++)x(k[B],b,E,M,y)}function I(_){_.target.removeEventListener("dispose",I);for(const E in c){const M=c[E],y=_.target.uuid;y in M&&(M[y].dispose(),delete M[y])}}}const Pg={[no]:io,[so]:oo,[ro]:lo,[ls]:ao,[io]:no,[oo]:so,[lo]:ro,[ao]:ls};function Lg(i,t){function e(){let U=!1;const pt=new le;let $=null;const tt=new le(0,0,0,0);return{setMask:function(vt){$!==vt&&!U&&(i.colorMask(vt,vt,vt,vt),$=vt)},setLocked:function(vt){U=vt},setClear:function(vt,gt,Vt,ge,Pe){Pe===!0&&(vt*=ge,gt*=ge,Vt*=ge),pt.set(vt,gt,Vt,ge),tt.equals(pt)===!1&&(i.clearColor(vt,gt,Vt,ge),tt.copy(pt))},reset:function(){U=!1,$=null,tt.set(-1,0,0,0)}}}function n(){let U=!1,pt=!1,$=null,tt=null,vt=null;return{setReversed:function(gt){if(pt!==gt){const Vt=t.get("EXT_clip_control");pt?Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.ZERO_TO_ONE_EXT):Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.NEGATIVE_ONE_TO_ONE_EXT);const ge=vt;vt=null,this.setClear(ge)}pt=gt},getReversed:function(){return pt},setTest:function(gt){gt?lt(i.DEPTH_TEST):Dt(i.DEPTH_TEST)},setMask:function(gt){$!==gt&&!U&&(i.depthMask(gt),$=gt)},setFunc:function(gt){if(pt&&(gt=Pg[gt]),tt!==gt){switch(gt){case no:i.depthFunc(i.NEVER);break;case io:i.depthFunc(i.ALWAYS);break;case so:i.depthFunc(i.LESS);break;case ls:i.depthFunc(i.LEQUAL);break;case ro:i.depthFunc(i.EQUAL);break;case ao:i.depthFunc(i.GEQUAL);break;case oo:i.depthFunc(i.GREATER);break;case lo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}tt=gt}},setLocked:function(gt){U=gt},setClear:function(gt){vt!==gt&&(pt&&(gt=1-gt),i.clearDepth(gt),vt=gt)},reset:function(){U=!1,$=null,tt=null,vt=null,pt=!1}}}function s(){let U=!1,pt=null,$=null,tt=null,vt=null,gt=null,Vt=null,ge=null,Pe=null;return{setTest:function(ie){U||(ie?lt(i.STENCIL_TEST):Dt(i.STENCIL_TEST))},setMask:function(ie){pt!==ie&&!U&&(i.stencilMask(ie),pt=ie)},setFunc:function(ie,rn,En){($!==ie||tt!==rn||vt!==En)&&(i.stencilFunc(ie,rn,En),$=ie,tt=rn,vt=En)},setOp:function(ie,rn,En){(gt!==ie||Vt!==rn||ge!==En)&&(i.stencilOp(ie,rn,En),gt=ie,Vt=rn,ge=En)},setLocked:function(ie){U=ie},setClear:function(ie){Pe!==ie&&(i.clearStencil(ie),Pe=ie)},reset:function(){U=!1,pt=null,$=null,tt=null,vt=null,gt=null,Vt=null,ge=null,Pe=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,v=!1,m=null,p=null,w=null,S=null,x=null,I=null,_=null,b=new Ot(0,0,0),E=0,M=!1,y=null,P=null,k=null,B=null,G=null;const j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,Q=0;const X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(X)[1]),q=Q>=1):X.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),q=Q>=2);let ht=null,mt={};const St=i.getParameter(i.SCISSOR_BOX),kt=i.getParameter(i.VIEWPORT),Bt=new le().fromArray(St),Y=new le().fromArray(kt);function rt(U,pt,$,tt){const vt=new Uint8Array(4),gt=i.createTexture();i.bindTexture(U,gt),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Vt=0;Vt<$;Vt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(pt,0,i.RGBA,1,1,tt,0,i.RGBA,i.UNSIGNED_BYTE,vt):i.texImage2D(pt+Vt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,vt);return gt}const wt={};wt[i.TEXTURE_2D]=rt(i.TEXTURE_2D,i.TEXTURE_2D,1),wt[i.TEXTURE_CUBE_MAP]=rt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),wt[i.TEXTURE_2D_ARRAY]=rt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),wt[i.TEXTURE_3D]=rt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),lt(i.DEPTH_TEST),a.setFunc(ls),Z(!1),xt(Ll),lt(i.CULL_FACE),R(ti);function lt(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function Dt(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Ft(U,pt){return u[U]!==pt?(i.bindFramebuffer(U,pt),u[U]=pt,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=pt),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=pt),!0):!1}function It(U,pt){let $=d,tt=!1;if(U){$=f.get(pt),$===void 0&&($=[],f.set(pt,$));const vt=U.textures;if($.length!==vt.length||$[0]!==i.COLOR_ATTACHMENT0){for(let gt=0,Vt=vt.length;gt<Vt;gt++)$[gt]=i.COLOR_ATTACHMENT0+gt;$.length=vt.length,tt=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,tt=!0);tt&&i.drawBuffers($)}function Kt(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const L={[yi]:i.FUNC_ADD,[Iu]:i.FUNC_SUBTRACT,[Uu]:i.FUNC_REVERSE_SUBTRACT};L[Nu]=i.MIN,L[Fu]=i.MAX;const O={[Ou]:i.ZERO,[ku]:i.ONE,[Bu]:i.SRC_COLOR,[to]:i.SRC_ALPHA,[Xu]:i.SRC_ALPHA_SATURATE,[Vu]:i.DST_COLOR,[Hu]:i.DST_ALPHA,[zu]:i.ONE_MINUS_SRC_COLOR,[eo]:i.ONE_MINUS_SRC_ALPHA,[Wu]:i.ONE_MINUS_DST_COLOR,[Gu]:i.ONE_MINUS_DST_ALPHA,[qu]:i.CONSTANT_COLOR,[$u]:i.ONE_MINUS_CONSTANT_COLOR,[Yu]:i.CONSTANT_ALPHA,[ju]:i.ONE_MINUS_CONSTANT_ALPHA};function R(U,pt,$,tt,vt,gt,Vt,ge,Pe,ie){if(U===ti){v===!0&&(Dt(i.BLEND),v=!1);return}if(v===!1&&(lt(i.BLEND),v=!0),U!==Du){if(U!==m||ie!==M){if((p!==yi||x!==yi)&&(i.blendEquation(i.FUNC_ADD),p=yi,x=yi),ie)switch(U){case is:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Dl:i.blendFunc(i.ONE,i.ONE);break;case Il:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ul:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case is:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Dl:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Il:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ul:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}w=null,S=null,I=null,_=null,b.set(0,0,0),E=0,m=U,M=ie}return}vt=vt||pt,gt=gt||$,Vt=Vt||tt,(pt!==p||vt!==x)&&(i.blendEquationSeparate(L[pt],L[vt]),p=pt,x=vt),($!==w||tt!==S||gt!==I||Vt!==_)&&(i.blendFuncSeparate(O[$],O[tt],O[gt],O[Vt]),w=$,S=tt,I=gt,_=Vt),(ge.equals(b)===!1||Pe!==E)&&(i.blendColor(ge.r,ge.g,ge.b,Pe),b.copy(ge),E=Pe),m=U,M=!1}function st(U,pt){U.side===en?Dt(i.CULL_FACE):lt(i.CULL_FACE);let $=U.side===ke;pt&&($=!$),Z($),U.blending===is&&U.transparent===!1?R(ti):R(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const tt=U.stencilWrite;o.setTest(tt),tt&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ut(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?lt(i.SAMPLE_ALPHA_TO_COVERAGE):Dt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Z(U){y!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),y=U)}function xt(U){U!==Pu?(lt(i.CULL_FACE),U!==P&&(U===Ll?i.cullFace(i.BACK):U===Lu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Dt(i.CULL_FACE),P=U}function ut(U){U!==k&&(q&&i.lineWidth(U),k=U)}function Ut(U,pt,$){U?(lt(i.POLYGON_OFFSET_FILL),(B!==pt||G!==$)&&(i.polygonOffset(pt,$),B=pt,G=$)):Dt(i.POLYGON_OFFSET_FILL)}function bt(U){U?lt(i.SCISSOR_TEST):Dt(i.SCISSOR_TEST)}function C(U){U===void 0&&(U=i.TEXTURE0+j-1),ht!==U&&(i.activeTexture(U),ht=U)}function T(U,pt,$){$===void 0&&(ht===null?$=i.TEXTURE0+j-1:$=ht);let tt=mt[$];tt===void 0&&(tt={type:void 0,texture:void 0},mt[$]=tt),(tt.type!==U||tt.texture!==pt)&&(ht!==$&&(i.activeTexture($),ht=$),i.bindTexture(U,pt||wt[U]),tt.type=U,tt.texture=pt)}function H(){const U=mt[ht];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function K(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function et(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function J(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function At(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ft(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Zt(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ot(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Et(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Nt(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function zt(U){Bt.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Bt.copy(U))}function Tt(U){Y.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),Y.copy(U))}function Jt(U,pt){let $=c.get(pt);$===void 0&&($=new WeakMap,c.set(pt,$));let tt=$.get(U);tt===void 0&&(tt=i.getUniformBlockIndex(pt,U.name),$.set(U,tt))}function $t(U,pt){const tt=c.get(pt).get(U);l.get(pt)!==tt&&(i.uniformBlockBinding(pt,tt,U.__bindingPointIndex),l.set(pt,tt))}function he(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ht=null,mt={},u={},f=new WeakMap,d=[],g=null,v=!1,m=null,p=null,w=null,S=null,x=null,I=null,_=null,b=new Ot(0,0,0),E=0,M=!1,y=null,P=null,k=null,B=null,G=null,Bt.set(0,0,i.canvas.width,i.canvas.height),Y.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:lt,disable:Dt,bindFramebuffer:Ft,drawBuffers:It,useProgram:Kt,setBlending:R,setMaterial:st,setFlipSided:Z,setCullFace:xt,setLineWidth:ut,setPolygonOffset:Ut,setScissorTest:bt,activeTexture:C,bindTexture:T,unbindTexture:H,compressedTexImage2D:K,compressedTexImage3D:et,texImage2D:Et,texImage3D:Nt,updateUBOMapping:Jt,uniformBlockBinding:$t,texStorage2D:Zt,texStorage3D:ot,texSubImage2D:J,texSubImage3D:At,compressedTexSubImage2D:ft,compressedTexSubImage3D:Mt,scissor:zt,viewport:Tt,reset:he}}function Rc(i,t,e,n){const s=Dg(n);switch(e){case yh:return i*t;case Mh:return i*t;case Sh:return i*t*2;case Jo:return i*t/s.components*s.byteLength;case Qo:return i*t/s.components*s.byteLength;case wh:return i*t*2/s.components*s.byteLength;case tl:return i*t*2/s.components*s.byteLength;case bh:return i*t*3/s.components*s.byteLength;case dn:return i*t*4/s.components*s.byteLength;case el:return i*t*4/s.components*s.byteLength;case Hr:case Gr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Vr:case Wr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case po:case go:return Math.max(i,16)*Math.max(t,8)/4;case fo:case mo:return Math.max(i,8)*Math.max(t,8)/2;case _o:case vo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case xo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case yo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case bo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Mo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case So:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case wo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Eo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case To:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ao:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ro:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Co:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Po:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Lo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Do:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Io:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Xr:case Uo:case No:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Eh:case Fo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Oo:case ko:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Dg(i){switch(i){case Bn:case _h:return{byteLength:1,components:1};case Ws:case vh:case er:return{byteLength:2,components:1};case Zo:case Ko:return{byteLength:2,components:4};case Ei:case jo:case Mn:return{byteLength:4,components:1};case xh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Ig(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new it,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,T){return d?new OffscreenCanvas(C,T):Kr("canvas")}function v(C,T,H){let K=1;const et=bt(C);if((et.width>H||et.height>H)&&(K=H/Math.max(et.width,et.height)),K<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const J=Math.floor(K*et.width),At=Math.floor(K*et.height);u===void 0&&(u=g(J,At));const ft=T?g(J,At):u;return ft.width=J,ft.height=At,ft.getContext("2d").drawImage(C,0,0,J,At),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+J+"x"+At+")."),ft}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),C;return C}function m(C){return C.generateMipmaps}function p(C){i.generateMipmap(C)}function w(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(C,T,H,K,et=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let J=T;if(T===i.RED&&(H===i.FLOAT&&(J=i.R32F),H===i.HALF_FLOAT&&(J=i.R16F),H===i.UNSIGNED_BYTE&&(J=i.R8)),T===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(J=i.R8UI),H===i.UNSIGNED_SHORT&&(J=i.R16UI),H===i.UNSIGNED_INT&&(J=i.R32UI),H===i.BYTE&&(J=i.R8I),H===i.SHORT&&(J=i.R16I),H===i.INT&&(J=i.R32I)),T===i.RG&&(H===i.FLOAT&&(J=i.RG32F),H===i.HALF_FLOAT&&(J=i.RG16F),H===i.UNSIGNED_BYTE&&(J=i.RG8)),T===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(J=i.RG8UI),H===i.UNSIGNED_SHORT&&(J=i.RG16UI),H===i.UNSIGNED_INT&&(J=i.RG32UI),H===i.BYTE&&(J=i.RG8I),H===i.SHORT&&(J=i.RG16I),H===i.INT&&(J=i.RG32I)),T===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(J=i.RGB8UI),H===i.UNSIGNED_SHORT&&(J=i.RGB16UI),H===i.UNSIGNED_INT&&(J=i.RGB32UI),H===i.BYTE&&(J=i.RGB8I),H===i.SHORT&&(J=i.RGB16I),H===i.INT&&(J=i.RGB32I)),T===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),H===i.UNSIGNED_INT&&(J=i.RGBA32UI),H===i.BYTE&&(J=i.RGBA8I),H===i.SHORT&&(J=i.RGBA16I),H===i.INT&&(J=i.RGBA32I)),T===i.RGB&&H===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),T===i.RGBA){const At=et?la:Qt.getTransfer(K);H===i.FLOAT&&(J=i.RGBA32F),H===i.HALF_FLOAT&&(J=i.RGBA16F),H===i.UNSIGNED_BYTE&&(J=At===ae?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function x(C,T){let H;return C?T===null||T===Ei||T===ds?H=i.DEPTH24_STENCIL8:T===Mn?H=i.DEPTH32F_STENCIL8:T===Ws&&(H=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Ei||T===ds?H=i.DEPTH_COMPONENT24:T===Mn?H=i.DEPTH_COMPONENT32F:T===Ws&&(H=i.DEPTH_COMPONENT16),H}function I(C,T){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ge&&C.minFilter!==bn?Math.log2(Math.max(T.width,T.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?T.mipmaps.length:1}function _(C){const T=C.target;T.removeEventListener("dispose",_),E(T),T.isVideoTexture&&h.delete(T)}function b(C){const T=C.target;T.removeEventListener("dispose",b),y(T)}function E(C){const T=n.get(C);if(T.__webglInit===void 0)return;const H=C.source,K=f.get(H);if(K){const et=K[T.__cacheKey];et.usedTimes--,et.usedTimes===0&&M(C),Object.keys(K).length===0&&f.delete(H)}n.remove(C)}function M(C){const T=n.get(C);i.deleteTexture(T.__webglTexture);const H=C.source,K=f.get(H);delete K[T.__cacheKey],a.memory.textures--}function y(C){const T=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(T.__webglFramebuffer[K]))for(let et=0;et<T.__webglFramebuffer[K].length;et++)i.deleteFramebuffer(T.__webglFramebuffer[K][et]);else i.deleteFramebuffer(T.__webglFramebuffer[K]);T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer[K])}else{if(Array.isArray(T.__webglFramebuffer))for(let K=0;K<T.__webglFramebuffer.length;K++)i.deleteFramebuffer(T.__webglFramebuffer[K]);else i.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&i.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let K=0;K<T.__webglColorRenderbuffer.length;K++)T.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(T.__webglColorRenderbuffer[K]);T.__webglDepthRenderbuffer&&i.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const H=C.textures;for(let K=0,et=H.length;K<et;K++){const J=n.get(H[K]);J.__webglTexture&&(i.deleteTexture(J.__webglTexture),a.memory.textures--),n.remove(H[K])}n.remove(C)}let P=0;function k(){P=0}function B(){const C=P;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),P+=1,C}function G(C){const T=[];return T.push(C.wrapS),T.push(C.wrapT),T.push(C.wrapR||0),T.push(C.magFilter),T.push(C.minFilter),T.push(C.anisotropy),T.push(C.internalFormat),T.push(C.format),T.push(C.type),T.push(C.generateMipmaps),T.push(C.premultiplyAlpha),T.push(C.flipY),T.push(C.unpackAlignment),T.push(C.colorSpace),T.join()}function j(C,T){const H=n.get(C);if(C.isVideoTexture&&ut(C),C.isRenderTargetTexture===!1&&C.version>0&&H.__version!==C.version){const K=C.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(H,C,T);return}}e.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+T)}function q(C,T){const H=n.get(C);if(C.version>0&&H.__version!==C.version){Y(H,C,T);return}e.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+T)}function Q(C,T){const H=n.get(C);if(C.version>0&&H.__version!==C.version){Y(H,C,T);return}e.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+T)}function X(C,T){const H=n.get(C);if(C.version>0&&H.__version!==C.version){rt(H,C,T);return}e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+T)}const ht={[us]:i.REPEAT,[Mi]:i.CLAMP_TO_EDGE,[uo]:i.MIRRORED_REPEAT},mt={[Ge]:i.NEAREST,[sd]:i.NEAREST_MIPMAP_NEAREST,[lr]:i.NEAREST_MIPMAP_LINEAR,[bn]:i.LINEAR,[pa]:i.LINEAR_MIPMAP_NEAREST,[Si]:i.LINEAR_MIPMAP_LINEAR},St={[ld]:i.NEVER,[pd]:i.ALWAYS,[cd]:i.LESS,[Ah]:i.LEQUAL,[hd]:i.EQUAL,[fd]:i.GEQUAL,[ud]:i.GREATER,[dd]:i.NOTEQUAL};function kt(C,T){if(T.type===Mn&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===bn||T.magFilter===pa||T.magFilter===lr||T.magFilter===Si||T.minFilter===bn||T.minFilter===pa||T.minFilter===lr||T.minFilter===Si)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,ht[T.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,ht[T.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,ht[T.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,mt[T.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,mt[T.minFilter]),T.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,St[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Ge||T.minFilter!==lr&&T.minFilter!==Si||T.type===Mn&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const H=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function Bt(C,T){let H=!1;C.__webglInit===void 0&&(C.__webglInit=!0,T.addEventListener("dispose",_));const K=T.source;let et=f.get(K);et===void 0&&(et={},f.set(K,et));const J=G(T);if(J!==C.__cacheKey){et[J]===void 0&&(et[J]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,H=!0),et[J].usedTimes++;const At=et[C.__cacheKey];At!==void 0&&(et[C.__cacheKey].usedTimes--,At.usedTimes===0&&M(T)),C.__cacheKey=J,C.__webglTexture=et[J].texture}return H}function Y(C,T,H){let K=i.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),T.isData3DTexture&&(K=i.TEXTURE_3D);const et=Bt(C,T),J=T.source;e.bindTexture(K,C.__webglTexture,i.TEXTURE0+H);const At=n.get(J);if(J.version!==At.__version||et===!0){e.activeTexture(i.TEXTURE0+H);const ft=Qt.getPrimaries(Qt.workingColorSpace),Mt=T.colorSpace===Jn?null:Qt.getPrimaries(T.colorSpace),Zt=T.colorSpace===Jn||ft===Mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Zt);let ot=v(T.image,!1,s.maxTextureSize);ot=Ut(T,ot);const Et=r.convert(T.format,T.colorSpace),Nt=r.convert(T.type);let zt=S(T.internalFormat,Et,Nt,T.colorSpace,T.isVideoTexture);kt(K,T);let Tt;const Jt=T.mipmaps,$t=T.isVideoTexture!==!0,he=At.__version===void 0||et===!0,U=J.dataReady,pt=I(T,ot);if(T.isDepthTexture)zt=x(T.format===fs,T.type),he&&($t?e.texStorage2D(i.TEXTURE_2D,1,zt,ot.width,ot.height):e.texImage2D(i.TEXTURE_2D,0,zt,ot.width,ot.height,0,Et,Nt,null));else if(T.isDataTexture)if(Jt.length>0){$t&&he&&e.texStorage2D(i.TEXTURE_2D,pt,zt,Jt[0].width,Jt[0].height);for(let $=0,tt=Jt.length;$<tt;$++)Tt=Jt[$],$t?U&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,Tt.width,Tt.height,Et,Nt,Tt.data):e.texImage2D(i.TEXTURE_2D,$,zt,Tt.width,Tt.height,0,Et,Nt,Tt.data);T.generateMipmaps=!1}else $t?(he&&e.texStorage2D(i.TEXTURE_2D,pt,zt,ot.width,ot.height),U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ot.width,ot.height,Et,Nt,ot.data)):e.texImage2D(i.TEXTURE_2D,0,zt,ot.width,ot.height,0,Et,Nt,ot.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){$t&&he&&e.texStorage3D(i.TEXTURE_2D_ARRAY,pt,zt,Jt[0].width,Jt[0].height,ot.depth);for(let $=0,tt=Jt.length;$<tt;$++)if(Tt=Jt[$],T.format!==dn)if(Et!==null)if($t){if(U)if(T.layerUpdates.size>0){const vt=Rc(Tt.width,Tt.height,T.format,T.type);for(const gt of T.layerUpdates){const Vt=Tt.data.subarray(gt*vt/Tt.data.BYTES_PER_ELEMENT,(gt+1)*vt/Tt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,gt,Tt.width,Tt.height,1,Et,Vt)}T.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,Tt.width,Tt.height,ot.depth,Et,Tt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,zt,Tt.width,Tt.height,ot.depth,0,Tt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $t?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,Tt.width,Tt.height,ot.depth,Et,Nt,Tt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,$,zt,Tt.width,Tt.height,ot.depth,0,Et,Nt,Tt.data)}else{$t&&he&&e.texStorage2D(i.TEXTURE_2D,pt,zt,Jt[0].width,Jt[0].height);for(let $=0,tt=Jt.length;$<tt;$++)Tt=Jt[$],T.format!==dn?Et!==null?$t?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,Tt.width,Tt.height,Et,Tt.data):e.compressedTexImage2D(i.TEXTURE_2D,$,zt,Tt.width,Tt.height,0,Tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$t?U&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,Tt.width,Tt.height,Et,Nt,Tt.data):e.texImage2D(i.TEXTURE_2D,$,zt,Tt.width,Tt.height,0,Et,Nt,Tt.data)}else if(T.isDataArrayTexture)if($t){if(he&&e.texStorage3D(i.TEXTURE_2D_ARRAY,pt,zt,ot.width,ot.height,ot.depth),U)if(T.layerUpdates.size>0){const $=Rc(ot.width,ot.height,T.format,T.type);for(const tt of T.layerUpdates){const vt=ot.data.subarray(tt*$/ot.data.BYTES_PER_ELEMENT,(tt+1)*$/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,tt,ot.width,ot.height,1,Et,Nt,vt)}T.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,Et,Nt,ot.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,zt,ot.width,ot.height,ot.depth,0,Et,Nt,ot.data);else if(T.isData3DTexture)$t?(he&&e.texStorage3D(i.TEXTURE_3D,pt,zt,ot.width,ot.height,ot.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,Et,Nt,ot.data)):e.texImage3D(i.TEXTURE_3D,0,zt,ot.width,ot.height,ot.depth,0,Et,Nt,ot.data);else if(T.isFramebufferTexture){if(he)if($t)e.texStorage2D(i.TEXTURE_2D,pt,zt,ot.width,ot.height);else{let $=ot.width,tt=ot.height;for(let vt=0;vt<pt;vt++)e.texImage2D(i.TEXTURE_2D,vt,zt,$,tt,0,Et,Nt,null),$>>=1,tt>>=1}}else if(Jt.length>0){if($t&&he){const $=bt(Jt[0]);e.texStorage2D(i.TEXTURE_2D,pt,zt,$.width,$.height)}for(let $=0,tt=Jt.length;$<tt;$++)Tt=Jt[$],$t?U&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,Et,Nt,Tt):e.texImage2D(i.TEXTURE_2D,$,zt,Et,Nt,Tt);T.generateMipmaps=!1}else if($t){if(he){const $=bt(ot);e.texStorage2D(i.TEXTURE_2D,pt,zt,$.width,$.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Et,Nt,ot)}else e.texImage2D(i.TEXTURE_2D,0,zt,Et,Nt,ot);m(T)&&p(K),At.__version=J.version,T.onUpdate&&T.onUpdate(T)}C.__version=T.version}function rt(C,T,H){if(T.image.length!==6)return;const K=Bt(C,T),et=T.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+H);const J=n.get(et);if(et.version!==J.__version||K===!0){e.activeTexture(i.TEXTURE0+H);const At=Qt.getPrimaries(Qt.workingColorSpace),ft=T.colorSpace===Jn?null:Qt.getPrimaries(T.colorSpace),Mt=T.colorSpace===Jn||At===ft?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const Zt=T.isCompressedTexture||T.image[0].isCompressedTexture,ot=T.image[0]&&T.image[0].isDataTexture,Et=[];for(let tt=0;tt<6;tt++)!Zt&&!ot?Et[tt]=v(T.image[tt],!0,s.maxCubemapSize):Et[tt]=ot?T.image[tt].image:T.image[tt],Et[tt]=Ut(T,Et[tt]);const Nt=Et[0],zt=r.convert(T.format,T.colorSpace),Tt=r.convert(T.type),Jt=S(T.internalFormat,zt,Tt,T.colorSpace),$t=T.isVideoTexture!==!0,he=J.__version===void 0||K===!0,U=et.dataReady;let pt=I(T,Nt);kt(i.TEXTURE_CUBE_MAP,T);let $;if(Zt){$t&&he&&e.texStorage2D(i.TEXTURE_CUBE_MAP,pt,Jt,Nt.width,Nt.height);for(let tt=0;tt<6;tt++){$=Et[tt].mipmaps;for(let vt=0;vt<$.length;vt++){const gt=$[vt];T.format!==dn?zt!==null?$t?U&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt,0,0,gt.width,gt.height,zt,gt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt,Jt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$t?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt,0,0,gt.width,gt.height,zt,Tt,gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt,Jt,gt.width,gt.height,0,zt,Tt,gt.data)}}}else{if($=T.mipmaps,$t&&he){$.length>0&&pt++;const tt=bt(Et[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,pt,Jt,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(ot){$t?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Et[tt].width,Et[tt].height,zt,Tt,Et[tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Jt,Et[tt].width,Et[tt].height,0,zt,Tt,Et[tt].data);for(let vt=0;vt<$.length;vt++){const Vt=$[vt].image[tt].image;$t?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt+1,0,0,Vt.width,Vt.height,zt,Tt,Vt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt+1,Jt,Vt.width,Vt.height,0,zt,Tt,Vt.data)}}else{$t?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,zt,Tt,Et[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Jt,zt,Tt,Et[tt]);for(let vt=0;vt<$.length;vt++){const gt=$[vt];$t?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt+1,0,0,zt,Tt,gt.image[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,vt+1,Jt,zt,Tt,gt.image[tt])}}}m(T)&&p(i.TEXTURE_CUBE_MAP),J.__version=et.version,T.onUpdate&&T.onUpdate(T)}C.__version=T.version}function wt(C,T,H,K,et,J){const At=r.convert(H.format,H.colorSpace),ft=r.convert(H.type),Mt=S(H.internalFormat,At,ft,H.colorSpace),Zt=n.get(T),ot=n.get(H);if(ot.__renderTarget=T,!Zt.__hasExternalTextures){const Et=Math.max(1,T.width>>J),Nt=Math.max(1,T.height>>J);et===i.TEXTURE_3D||et===i.TEXTURE_2D_ARRAY?e.texImage3D(et,J,Mt,Et,Nt,T.depth,0,At,ft,null):e.texImage2D(et,J,Mt,Et,Nt,0,At,ft,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),xt(T)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,et,ot.__webglTexture,0,Z(T)):(et===i.TEXTURE_2D||et>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,et,ot.__webglTexture,J),e.bindFramebuffer(i.FRAMEBUFFER,null)}function lt(C,T,H){if(i.bindRenderbuffer(i.RENDERBUFFER,C),T.depthBuffer){const K=T.depthTexture,et=K&&K.isDepthTexture?K.type:null,J=x(T.stencilBuffer,et),At=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ft=Z(T);xt(T)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ft,J,T.width,T.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,ft,J,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,J,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,At,i.RENDERBUFFER,C)}else{const K=T.textures;for(let et=0;et<K.length;et++){const J=K[et],At=r.convert(J.format,J.colorSpace),ft=r.convert(J.type),Mt=S(J.internalFormat,At,ft,J.colorSpace),Zt=Z(T);H&&xt(T)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Zt,Mt,T.width,T.height):xt(T)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Zt,Mt,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,Mt,T.width,T.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Dt(C,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(T.depthTexture);K.__renderTarget=T,(!K.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),j(T.depthTexture,0);const et=K.__webglTexture,J=Z(T);if(T.depthTexture.format===ss)xt(T)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0);else if(T.depthTexture.format===fs)xt(T)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0);else throw new Error("Unknown depthTexture format")}function Ft(C){const T=n.get(C),H=C.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==C.depthTexture){const K=C.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),K){const et=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,K.removeEventListener("dispose",et)};K.addEventListener("dispose",et),T.__depthDisposeCallback=et}T.__boundDepthTexture=K}if(C.depthTexture&&!T.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");Dt(T.__webglFramebuffer,C)}else if(H){T.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[K]),T.__webglDepthbuffer[K]===void 0)T.__webglDepthbuffer[K]=i.createRenderbuffer(),lt(T.__webglDepthbuffer[K],C,!1);else{const et=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=T.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,et,i.RENDERBUFFER,J)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=i.createRenderbuffer(),lt(T.__webglDepthbuffer,C,!1);else{const K=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=T.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,et)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function It(C,T,H){const K=n.get(C);T!==void 0&&wt(K.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Ft(C)}function Kt(C){const T=C.texture,H=n.get(C),K=n.get(T);C.addEventListener("dispose",b);const et=C.textures,J=C.isWebGLCubeRenderTarget===!0,At=et.length>1;if(At||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=T.version,a.memory.textures++),J){H.__webglFramebuffer=[];for(let ft=0;ft<6;ft++)if(T.mipmaps&&T.mipmaps.length>0){H.__webglFramebuffer[ft]=[];for(let Mt=0;Mt<T.mipmaps.length;Mt++)H.__webglFramebuffer[ft][Mt]=i.createFramebuffer()}else H.__webglFramebuffer[ft]=i.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){H.__webglFramebuffer=[];for(let ft=0;ft<T.mipmaps.length;ft++)H.__webglFramebuffer[ft]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(At)for(let ft=0,Mt=et.length;ft<Mt;ft++){const Zt=n.get(et[ft]);Zt.__webglTexture===void 0&&(Zt.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&xt(C)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ft=0;ft<et.length;ft++){const Mt=et[ft];H.__webglColorRenderbuffer[ft]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[ft]);const Zt=r.convert(Mt.format,Mt.colorSpace),ot=r.convert(Mt.type),Et=S(Mt.internalFormat,Zt,ot,Mt.colorSpace,C.isXRRenderTarget===!0),Nt=Z(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Nt,Et,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.RENDERBUFFER,H.__webglColorRenderbuffer[ft])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),lt(H.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(J){e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),kt(i.TEXTURE_CUBE_MAP,T);for(let ft=0;ft<6;ft++)if(T.mipmaps&&T.mipmaps.length>0)for(let Mt=0;Mt<T.mipmaps.length;Mt++)wt(H.__webglFramebuffer[ft][Mt],C,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,Mt);else wt(H.__webglFramebuffer[ft],C,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0);m(T)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(At){for(let ft=0,Mt=et.length;ft<Mt;ft++){const Zt=et[ft],ot=n.get(Zt);e.bindTexture(i.TEXTURE_2D,ot.__webglTexture),kt(i.TEXTURE_2D,Zt),wt(H.__webglFramebuffer,C,Zt,i.COLOR_ATTACHMENT0+ft,i.TEXTURE_2D,0),m(Zt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let ft=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ft=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ft,K.__webglTexture),kt(ft,T),T.mipmaps&&T.mipmaps.length>0)for(let Mt=0;Mt<T.mipmaps.length;Mt++)wt(H.__webglFramebuffer[Mt],C,T,i.COLOR_ATTACHMENT0,ft,Mt);else wt(H.__webglFramebuffer,C,T,i.COLOR_ATTACHMENT0,ft,0);m(T)&&p(ft),e.unbindTexture()}C.depthBuffer&&Ft(C)}function L(C){const T=C.textures;for(let H=0,K=T.length;H<K;H++){const et=T[H];if(m(et)){const J=w(C),At=n.get(et).__webglTexture;e.bindTexture(J,At),p(J),e.unbindTexture()}}}const O=[],R=[];function st(C){if(C.samples>0){if(xt(C)===!1){const T=C.textures,H=C.width,K=C.height;let et=i.COLOR_BUFFER_BIT;const J=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,At=n.get(C),ft=T.length>1;if(ft)for(let Mt=0;Mt<T.length;Mt++)e.bindFramebuffer(i.FRAMEBUFFER,At.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,At.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,At.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let Mt=0;Mt<T.length;Mt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(et|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(et|=i.STENCIL_BUFFER_BIT)),ft){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,At.__webglColorRenderbuffer[Mt]);const Zt=n.get(T[Mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Zt,0)}i.blitFramebuffer(0,0,H,K,0,0,H,K,et,i.NEAREST),l===!0&&(O.length=0,R.length=0,O.push(i.COLOR_ATTACHMENT0+Mt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(O.push(J),R.push(J),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,R)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,O))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ft)for(let Mt=0;Mt<T.length;Mt++){e.bindFramebuffer(i.FRAMEBUFFER,At.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,At.__webglColorRenderbuffer[Mt]);const Zt=n.get(T[Mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,At.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,Zt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const T=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[T])}}}function Z(C){return Math.min(s.maxSamples,C.samples)}function xt(C){const T=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function ut(C){const T=a.render.frame;h.get(C)!==T&&(h.set(C,T),C.update())}function Ut(C,T){const H=C.colorSpace,K=C.format,et=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||H!==_s&&H!==Jn&&(Qt.getTransfer(H)===ae?(K!==dn||et!==Bn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),T}function bt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=k,this.setTexture2D=j,this.setTexture2DArray=q,this.setTexture3D=Q,this.setTextureCube=X,this.rebindTextures=It,this.setupRenderTarget=Kt,this.updateRenderTargetMipmap=L,this.updateMultisampleRenderTarget=st,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=wt,this.useMultisampledRTT=xt}function Ug(i,t){function e(n,s=Jn){let r;const a=Qt.getTransfer(s);if(n===Bn)return i.UNSIGNED_BYTE;if(n===Zo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ko)return i.UNSIGNED_SHORT_5_5_5_1;if(n===xh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===_h)return i.BYTE;if(n===vh)return i.SHORT;if(n===Ws)return i.UNSIGNED_SHORT;if(n===jo)return i.INT;if(n===Ei)return i.UNSIGNED_INT;if(n===Mn)return i.FLOAT;if(n===er)return i.HALF_FLOAT;if(n===yh)return i.ALPHA;if(n===bh)return i.RGB;if(n===dn)return i.RGBA;if(n===Mh)return i.LUMINANCE;if(n===Sh)return i.LUMINANCE_ALPHA;if(n===ss)return i.DEPTH_COMPONENT;if(n===fs)return i.DEPTH_STENCIL;if(n===Jo)return i.RED;if(n===Qo)return i.RED_INTEGER;if(n===wh)return i.RG;if(n===tl)return i.RG_INTEGER;if(n===el)return i.RGBA_INTEGER;if(n===Hr||n===Gr||n===Vr||n===Wr)if(a===ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Hr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Hr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Gr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Vr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===fo||n===po||n===mo||n===go)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===fo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===po)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===mo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===go)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===_o||n===vo||n===xo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===_o||n===vo)return a===ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===xo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===yo||n===bo||n===Mo||n===So||n===wo||n===Eo||n===To||n===Ao||n===Ro||n===Co||n===Po||n===Lo||n===Do||n===Io)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===yo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===bo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Mo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===So)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===wo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Eo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===To)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ao)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ro)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Co)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Po)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Lo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Do)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Io)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Xr||n===Uo||n===No)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Xr)return a===ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Uo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===No)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Eh||n===Fo||n===Oo||n===ko)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Xr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Fo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Oo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ko)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ds?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Ng extends Ze{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class fn extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Fg={type:"move"};class Ha{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Fg)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new fn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Og=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,kg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Bg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Ue,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new ai({vertexShader:Og,fragmentShader:kg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ht(new mn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class zg extends Pi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null;const v=new Bg,m=e.getContextAttributes();let p=null,w=null;const S=[],x=[],I=new it;let _=null;const b=new Ze;b.viewport=new le;const E=new Ze;E.viewport=new le;const M=[b,E],y=new Ng;let P=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let rt=S[Y];return rt===void 0&&(rt=new Ha,S[Y]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(Y){let rt=S[Y];return rt===void 0&&(rt=new Ha,S[Y]=rt),rt.getGripSpace()},this.getHand=function(Y){let rt=S[Y];return rt===void 0&&(rt=new Ha,S[Y]=rt),rt.getHandSpace()};function B(Y){const rt=x.indexOf(Y.inputSource);if(rt===-1)return;const wt=S[rt];wt!==void 0&&(wt.update(Y.inputSource,Y.frame,c||a),wt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function G(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",j);for(let Y=0;Y<S.length;Y++){const rt=x[Y];rt!==null&&(x[Y]=null,S[Y].disconnect(rt))}P=null,k=null,v.reset(),t.setRenderTarget(p),d=null,f=null,u=null,s=null,w=null,Bt.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",G),s.addEventListener("inputsourceschange",j),m.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(I),s.renderState.layers===void 0){const rt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,rt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),w=new Ti(d.framebufferWidth,d.framebufferHeight,{format:dn,type:Bn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let rt=null,wt=null,lt=null;m.depth&&(lt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,rt=m.stencil?fs:ss,wt=m.stencil?ds:Ei);const Dt={colorFormat:e.RGBA8,depthFormat:lt,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(Dt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),w=new Ti(f.textureWidth,f.textureHeight,{format:dn,type:Bn,depthTexture:new Bh(f.textureWidth,f.textureHeight,wt,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Bt.setContext(s),Bt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function j(Y){for(let rt=0;rt<Y.removed.length;rt++){const wt=Y.removed[rt],lt=x.indexOf(wt);lt>=0&&(x[lt]=null,S[lt].disconnect(wt))}for(let rt=0;rt<Y.added.length;rt++){const wt=Y.added[rt];let lt=x.indexOf(wt);if(lt===-1){for(let Ft=0;Ft<S.length;Ft++)if(Ft>=x.length){x.push(wt),lt=Ft;break}else if(x[Ft]===null){x[Ft]=wt,lt=Ft;break}if(lt===-1)break}const Dt=S[lt];Dt&&Dt.connect(wt)}}const q=new D,Q=new D;function X(Y,rt,wt){q.setFromMatrixPosition(rt.matrixWorld),Q.setFromMatrixPosition(wt.matrixWorld);const lt=q.distanceTo(Q),Dt=rt.projectionMatrix.elements,Ft=wt.projectionMatrix.elements,It=Dt[14]/(Dt[10]-1),Kt=Dt[14]/(Dt[10]+1),L=(Dt[9]+1)/Dt[5],O=(Dt[9]-1)/Dt[5],R=(Dt[8]-1)/Dt[0],st=(Ft[8]+1)/Ft[0],Z=It*R,xt=It*st,ut=lt/(-R+st),Ut=ut*-R;if(rt.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ut),Y.translateZ(ut),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Dt[10]===-1)Y.projectionMatrix.copy(rt.projectionMatrix),Y.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{const bt=It+ut,C=Kt+ut,T=Z-Ut,H=xt+(lt-Ut),K=L*Kt/C*bt,et=O*Kt/C*bt;Y.projectionMatrix.makePerspective(T,H,K,et,bt,C),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ht(Y,rt){rt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(rt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let rt=Y.near,wt=Y.far;v.texture!==null&&(v.depthNear>0&&(rt=v.depthNear),v.depthFar>0&&(wt=v.depthFar)),y.near=E.near=b.near=rt,y.far=E.far=b.far=wt,(P!==y.near||k!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),P=y.near,k=y.far),b.layers.mask=Y.layers.mask|2,E.layers.mask=Y.layers.mask|4,y.layers.mask=b.layers.mask|E.layers.mask;const lt=Y.parent,Dt=y.cameras;ht(y,lt);for(let Ft=0;Ft<Dt.length;Ft++)ht(Dt[Ft],lt);Dt.length===2?X(y,b,E):y.projectionMatrix.copy(b.projectionMatrix),mt(Y,y,lt)};function mt(Y,rt,wt){wt===null?Y.matrix.copy(rt.matrixWorld):(Y.matrix.copy(wt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(rt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(rt.projectionMatrix),Y.projectionMatrixInverse.copy(rt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Xs*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(y)};let St=null;function kt(Y,rt){if(h=rt.getViewerPose(c||a),g=rt,h!==null){const wt=h.views;d!==null&&(t.setRenderTargetFramebuffer(w,d.framebuffer),t.setRenderTarget(w));let lt=!1;wt.length!==y.cameras.length&&(y.cameras.length=0,lt=!0);for(let Ft=0;Ft<wt.length;Ft++){const It=wt[Ft];let Kt=null;if(d!==null)Kt=d.getViewport(It);else{const O=u.getViewSubImage(f,It);Kt=O.viewport,Ft===0&&(t.setRenderTargetTextures(w,O.colorTexture,f.ignoreDepthValues?void 0:O.depthStencilTexture),t.setRenderTarget(w))}let L=M[Ft];L===void 0&&(L=new Ze,L.layers.enable(Ft),L.viewport=new le,M[Ft]=L),L.matrix.fromArray(It.transform.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale),L.projectionMatrix.fromArray(It.projectionMatrix),L.projectionMatrixInverse.copy(L.projectionMatrix).invert(),L.viewport.set(Kt.x,Kt.y,Kt.width,Kt.height),Ft===0&&(y.matrix.copy(L.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),lt===!0&&y.cameras.push(L)}const Dt=s.enabledFeatures;if(Dt&&Dt.includes("depth-sensing")){const Ft=u.getDepthInformation(wt[0]);Ft&&Ft.isValid&&Ft.texture&&v.init(t,Ft,s.renderState)}}for(let wt=0;wt<S.length;wt++){const lt=x[wt],Dt=S[wt];lt!==null&&Dt!==void 0&&Dt.update(lt,rt,c||a)}St&&St(Y,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),g=null}const Bt=new Oh;Bt.setAnimationLoop(kt),this.setAnimationLoop=function(Y){St=Y},this.dispose=function(){}}}const fi=new _n,Hg=new re;function Gg(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Uh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,w,S,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,w,S):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===ke&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===ke&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const w=t.get(p),S=w.envMap,x=w.envMapRotation;S&&(m.envMap.value=S,fi.copy(x),fi.x*=-1,fi.y*=-1,fi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(fi.y*=-1,fi.z*=-1),m.envMapRotation.value.setFromMatrix4(Hg.makeRotationFromEuler(fi)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,w,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*w,m.scale.value=S*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,w){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ke&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const w=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Vg(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,S){const x=S.program;n.uniformBlockBinding(w,x)}function c(w,S){let x=s[w.id];x===void 0&&(g(w),x=h(w),s[w.id]=x,w.addEventListener("dispose",m));const I=S.program;n.updateUBOMapping(w,I);const _=t.render.frame;r[w.id]!==_&&(f(w),r[w.id]=_)}function h(w){const S=u();w.__bindingPointIndex=S;const x=i.createBuffer(),I=w.__size,_=w.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,I,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,x),x}function u(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(w){const S=s[w.id],x=w.uniforms,I=w.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let _=0,b=x.length;_<b;_++){const E=Array.isArray(x[_])?x[_]:[x[_]];for(let M=0,y=E.length;M<y;M++){const P=E[M];if(d(P,_,M,I)===!0){const k=P.__offset,B=Array.isArray(P.value)?P.value:[P.value];let G=0;for(let j=0;j<B.length;j++){const q=B[j],Q=v(q);typeof q=="number"||typeof q=="boolean"?(P.__data[0]=q,i.bufferSubData(i.UNIFORM_BUFFER,k+G,P.__data)):q.isMatrix3?(P.__data[0]=q.elements[0],P.__data[1]=q.elements[1],P.__data[2]=q.elements[2],P.__data[3]=0,P.__data[4]=q.elements[3],P.__data[5]=q.elements[4],P.__data[6]=q.elements[5],P.__data[7]=0,P.__data[8]=q.elements[6],P.__data[9]=q.elements[7],P.__data[10]=q.elements[8],P.__data[11]=0):(q.toArray(P.__data,G),G+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(w,S,x,I){const _=w.value,b=S+"_"+x;if(I[b]===void 0)return typeof _=="number"||typeof _=="boolean"?I[b]=_:I[b]=_.clone(),!0;{const E=I[b];if(typeof _=="number"||typeof _=="boolean"){if(E!==_)return I[b]=_,!0}else if(E.equals(_)===!1)return E.copy(_),!0}return!1}function g(w){const S=w.uniforms;let x=0;const I=16;for(let b=0,E=S.length;b<E;b++){const M=Array.isArray(S[b])?S[b]:[S[b]];for(let y=0,P=M.length;y<P;y++){const k=M[y],B=Array.isArray(k.value)?k.value:[k.value];for(let G=0,j=B.length;G<j;G++){const q=B[G],Q=v(q),X=x%I,ht=X%Q.boundary,mt=X+ht;x+=ht,mt!==0&&I-mt<Q.storage&&(x+=I-mt),k.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=x,x+=Q.storage}}}const _=x%I;return _>0&&(x+=I-_),w.__size=x,w.__cache={},this}function v(w){const S={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(S.boundary=4,S.storage=4):w.isVector2?(S.boundary=8,S.storage=8):w.isVector3||w.isColor?(S.boundary=16,S.storage=12):w.isVector4?(S.boundary=16,S.storage=16):w.isMatrix3?(S.boundary=48,S.storage=48):w.isMatrix4?(S.boundary=64,S.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),S}function m(w){const S=w.target;S.removeEventListener("dispose",m);const x=a.indexOf(S.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function p(){for(const w in s)i.deleteBuffer(s[w]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Wg{constructor(t={}){const{canvas:e=Ld(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const w=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ee,this.toneMapping=ei,this.toneMappingExposure=1;const x=this;let I=!1,_=0,b=0,E=null,M=-1,y=null;const P=new le,k=new le;let B=null;const G=new Ot(0);let j=0,q=e.width,Q=e.height,X=1,ht=null,mt=null;const St=new le(0,0,q,Q),kt=new le(0,0,q,Q);let Bt=!1;const Y=new rl;let rt=!1,wt=!1;const lt=new re,Dt=new re,Ft=new D,It=new le,Kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let L=!1;function O(){return E===null?X:1}let R=n;function st(A,N){return e.getContext(A,N)}try{const A={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Yo}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",vt,!1),e.addEventListener("webglcontextcreationerror",gt,!1),R===null){const N="webgl2";if(R=st(N,A),R===null)throw st(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Z,xt,ut,Ut,bt,C,T,H,K,et,J,At,ft,Mt,Zt,ot,Et,Nt,zt,Tt,Jt,$t,he,U;function pt(){Z=new jm(R),Z.init(),$t=new Ug(R,Z),xt=new Vm(R,Z,t,$t),ut=new Lg(R,Z),xt.reverseDepthBuffer&&f&&ut.buffers.depth.setReversed(!0),Ut=new Jm(R),bt=new gg,C=new Ig(R,Z,ut,bt,xt,$t,Ut),T=new Xm(x),H=new Ym(x),K=new rf(R),he=new Hm(R,K),et=new Zm(R,K,Ut,he),J=new t0(R,et,K,Ut),zt=new Qm(R,xt,C),ot=new Wm(bt),At=new mg(x,T,H,Z,xt,he,ot),ft=new Gg(x,bt),Mt=new vg,Zt=new wg(Z),Nt=new zm(x,T,H,ut,J,d,l),Et=new Cg(x,J,xt),U=new Vg(R,Ut,xt,ut),Tt=new Gm(R,Z,Ut),Jt=new Km(R,Z,Ut),Ut.programs=At.programs,x.capabilities=xt,x.extensions=Z,x.properties=bt,x.renderLists=Mt,x.shadowMap=Et,x.state=ut,x.info=Ut}pt();const $=new zg(x,R);this.xr=$,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const A=Z.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Z.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(A){A!==void 0&&(X=A,this.setSize(q,Q,!1))},this.getSize=function(A){return A.set(q,Q)},this.setSize=function(A,N,V=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=A,Q=N,e.width=Math.floor(A*X),e.height=Math.floor(N*X),V===!0&&(e.style.width=A+"px",e.style.height=N+"px"),this.setViewport(0,0,A,N)},this.getDrawingBufferSize=function(A){return A.set(q*X,Q*X).floor()},this.setDrawingBufferSize=function(A,N,V){q=A,Q=N,X=V,e.width=Math.floor(A*V),e.height=Math.floor(N*V),this.setViewport(0,0,A,N)},this.getCurrentViewport=function(A){return A.copy(P)},this.getViewport=function(A){return A.copy(St)},this.setViewport=function(A,N,V,W){A.isVector4?St.set(A.x,A.y,A.z,A.w):St.set(A,N,V,W),ut.viewport(P.copy(St).multiplyScalar(X).round())},this.getScissor=function(A){return A.copy(kt)},this.setScissor=function(A,N,V,W){A.isVector4?kt.set(A.x,A.y,A.z,A.w):kt.set(A,N,V,W),ut.scissor(k.copy(kt).multiplyScalar(X).round())},this.getScissorTest=function(){return Bt},this.setScissorTest=function(A){ut.setScissorTest(Bt=A)},this.setOpaqueSort=function(A){ht=A},this.setTransparentSort=function(A){mt=A},this.getClearColor=function(A){return A.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor.apply(Nt,arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha.apply(Nt,arguments)},this.clear=function(A=!0,N=!0,V=!0){let W=0;if(A){let F=!1;if(E!==null){const ct=E.texture.format;F=ct===el||ct===tl||ct===Qo}if(F){const ct=E.texture.type,_t=ct===Bn||ct===Ei||ct===Ws||ct===ds||ct===Zo||ct===Ko,Rt=Nt.getClearColor(),Ct=Nt.getClearAlpha(),Gt=Rt.r,Wt=Rt.g,Pt=Rt.b;_t?(g[0]=Gt,g[1]=Wt,g[2]=Pt,g[3]=Ct,R.clearBufferuiv(R.COLOR,0,g)):(v[0]=Gt,v[1]=Wt,v[2]=Pt,v[3]=Ct,R.clearBufferiv(R.COLOR,0,v))}else W|=R.COLOR_BUFFER_BIT}N&&(W|=R.DEPTH_BUFFER_BIT),V&&(W|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),Mt.dispose(),Zt.dispose(),bt.dispose(),T.dispose(),H.dispose(),J.dispose(),he.dispose(),U.dispose(),At.dispose(),$.dispose(),$.removeEventListener("sessionstart",Sl),$.removeEventListener("sessionend",wl),oi.stop()};function tt(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function vt(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const A=Ut.autoReset,N=Et.enabled,V=Et.autoUpdate,W=Et.needsUpdate,F=Et.type;pt(),Ut.autoReset=A,Et.enabled=N,Et.autoUpdate=V,Et.needsUpdate=W,Et.type=F}function gt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Vt(A){const N=A.target;N.removeEventListener("dispose",Vt),ge(N)}function ge(A){Pe(A),bt.remove(A)}function Pe(A){const N=bt.get(A).programs;N!==void 0&&(N.forEach(function(V){At.releaseProgram(V)}),A.isShaderMaterial&&At.releaseShaderCache(A))}this.renderBufferDirect=function(A,N,V,W,F,ct){N===null&&(N=Kt);const _t=F.isMesh&&F.matrixWorld.determinant()<0,Rt=Eu(A,N,V,W,F);ut.setMaterial(W,_t);let Ct=V.index,Gt=1;if(W.wireframe===!0){if(Ct=et.getWireframeAttribute(V),Ct===void 0)return;Gt=2}const Wt=V.drawRange,Pt=V.attributes.position;let te=Wt.start*Gt,ue=(Wt.start+Wt.count)*Gt;ct!==null&&(te=Math.max(te,ct.start*Gt),ue=Math.min(ue,(ct.start+ct.count)*Gt)),Ct!==null?(te=Math.max(te,0),ue=Math.min(ue,Ct.count)):Pt!=null&&(te=Math.max(te,0),ue=Math.min(ue,Pt.count));const fe=ue-te;if(fe<0||fe===1/0)return;he.setup(F,W,Rt,V,Ct);let Be,ee=Tt;if(Ct!==null&&(Be=K.get(Ct),ee=Jt,ee.setIndex(Be)),F.isMesh)W.wireframe===!0?(ut.setLineWidth(W.wireframeLinewidth*O()),ee.setMode(R.LINES)):ee.setMode(R.TRIANGLES);else if(F.isLine){let Lt=W.linewidth;Lt===void 0&&(Lt=1),ut.setLineWidth(Lt*O()),F.isLineSegments?ee.setMode(R.LINES):F.isLineLoop?ee.setMode(R.LINE_LOOP):ee.setMode(R.LINE_STRIP)}else F.isPoints?ee.setMode(R.POINTS):F.isSprite&&ee.setMode(R.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ee.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Z.get("WEBGL_multi_draw"))ee.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Lt=F._multiDrawStarts,Tn=F._multiDrawCounts,ne=F._multiDrawCount,an=Ct?K.get(Ct).bytesPerElement:1,Di=bt.get(W).currentProgram.getUniforms();for(let We=0;We<ne;We++)Di.setValue(R,"_gl_DrawID",We),ee.render(Lt[We]/an,Tn[We])}else if(F.isInstancedMesh)ee.renderInstances(te,fe,F.count);else if(V.isInstancedBufferGeometry){const Lt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Tn=Math.min(V.instanceCount,Lt);ee.renderInstances(te,fe,Tn)}else ee.render(te,fe)};function ie(A,N,V){A.transparent===!0&&A.side===en&&A.forceSinglePass===!1?(A.side=ke,A.needsUpdate=!0,or(A,N,V),A.side=ri,A.needsUpdate=!0,or(A,N,V),A.side=en):or(A,N,V)}this.compile=function(A,N,V=null){V===null&&(V=A),p=Zt.get(V),p.init(N),S.push(p),V.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),A!==V&&A.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const W=new Set;return A.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ct=F.material;if(ct)if(Array.isArray(ct))for(let _t=0;_t<ct.length;_t++){const Rt=ct[_t];ie(Rt,V,F),W.add(Rt)}else ie(ct,V,F),W.add(ct)}),S.pop(),p=null,W},this.compileAsync=function(A,N,V=null){const W=this.compile(A,N,V);return new Promise(F=>{function ct(){if(W.forEach(function(_t){bt.get(_t).currentProgram.isReady()&&W.delete(_t)}),W.size===0){F(A);return}setTimeout(ct,10)}Z.get("KHR_parallel_shader_compile")!==null?ct():setTimeout(ct,10)})};let rn=null;function En(A){rn&&rn(A)}function Sl(){oi.stop()}function wl(){oi.start()}const oi=new Oh;oi.setAnimationLoop(En),typeof self<"u"&&oi.setContext(self),this.setAnimationLoop=function(A){rn=A,$.setAnimationLoop(A),A===null?oi.stop():oi.start()},$.addEventListener("sessionstart",Sl),$.addEventListener("sessionend",wl),this.render=function(A,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(N),N=$.getCamera()),A.isScene===!0&&A.onBeforeRender(x,A,N,E),p=Zt.get(A,S.length),p.init(N),S.push(p),Dt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Y.setFromProjectionMatrix(Dt),wt=this.localClippingEnabled,rt=ot.init(this.clippingPlanes,wt),m=Mt.get(A,w.length),m.init(),w.push(m),$.enabled===!0&&$.isPresenting===!0){const ct=x.xr.getDepthSensingMesh();ct!==null&&fa(ct,N,-1/0,x.sortObjects)}fa(A,N,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(ht,mt),L=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,L&&Nt.addToRenderList(m,A),this.info.render.frame++,rt===!0&&ot.beginShadows();const V=p.state.shadowsArray;Et.render(V,A,N),rt===!0&&ot.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,F=m.transmissive;if(p.setupLights(),N.isArrayCamera){const ct=N.cameras;if(F.length>0)for(let _t=0,Rt=ct.length;_t<Rt;_t++){const Ct=ct[_t];Tl(W,F,A,Ct)}L&&Nt.render(A);for(let _t=0,Rt=ct.length;_t<Rt;_t++){const Ct=ct[_t];El(m,A,Ct,Ct.viewport)}}else F.length>0&&Tl(W,F,A,N),L&&Nt.render(A),El(m,A,N);E!==null&&(C.updateMultisampleRenderTarget(E),C.updateRenderTargetMipmap(E)),A.isScene===!0&&A.onAfterRender(x,A,N),he.resetDefaultState(),M=-1,y=null,S.pop(),S.length>0?(p=S[S.length-1],rt===!0&&ot.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function fa(A,N,V,W){if(A.visible===!1)return;if(A.layers.test(N.layers)){if(A.isGroup)V=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(N);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Y.intersectsSprite(A)){W&&It.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Dt);const _t=J.update(A),Rt=A.material;Rt.visible&&m.push(A,_t,Rt,V,It.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Y.intersectsObject(A))){const _t=J.update(A),Rt=A.material;if(W&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),It.copy(A.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),It.copy(_t.boundingSphere.center)),It.applyMatrix4(A.matrixWorld).applyMatrix4(Dt)),Array.isArray(Rt)){const Ct=_t.groups;for(let Gt=0,Wt=Ct.length;Gt<Wt;Gt++){const Pt=Ct[Gt],te=Rt[Pt.materialIndex];te&&te.visible&&m.push(A,_t,te,V,It.z,Pt)}}else Rt.visible&&m.push(A,_t,Rt,V,It.z,null)}}const ct=A.children;for(let _t=0,Rt=ct.length;_t<Rt;_t++)fa(ct[_t],N,V,W)}function El(A,N,V,W){const F=A.opaque,ct=A.transmissive,_t=A.transparent;p.setupLightsView(V),rt===!0&&ot.setGlobalState(x.clippingPlanes,V),W&&ut.viewport(P.copy(W)),F.length>0&&ar(F,N,V),ct.length>0&&ar(ct,N,V),_t.length>0&&ar(_t,N,V),ut.buffers.depth.setTest(!0),ut.buffers.depth.setMask(!0),ut.buffers.color.setMask(!0),ut.setPolygonOffset(!1)}function Tl(A,N,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new Ti(1,1,{generateMipmaps:!0,type:Z.has("EXT_color_buffer_half_float")||Z.has("EXT_color_buffer_float")?er:Bn,minFilter:Si,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));const ct=p.state.transmissionRenderTarget[W.id],_t=W.viewport||P;ct.setSize(_t.z,_t.w);const Rt=x.getRenderTarget();x.setRenderTarget(ct),x.getClearColor(G),j=x.getClearAlpha(),j<1&&x.setClearColor(16777215,.5),x.clear(),L&&Nt.render(V);const Ct=x.toneMapping;x.toneMapping=ei;const Gt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),rt===!0&&ot.setGlobalState(x.clippingPlanes,W),ar(A,V,W),C.updateMultisampleRenderTarget(ct),C.updateRenderTargetMipmap(ct),Z.has("WEBGL_multisampled_render_to_texture")===!1){let Wt=!1;for(let Pt=0,te=N.length;Pt<te;Pt++){const ue=N[Pt],fe=ue.object,Be=ue.geometry,ee=ue.material,Lt=ue.group;if(ee.side===en&&fe.layers.test(W.layers)){const Tn=ee.side;ee.side=ke,ee.needsUpdate=!0,Al(fe,V,W,Be,ee,Lt),ee.side=Tn,ee.needsUpdate=!0,Wt=!0}}Wt===!0&&(C.updateMultisampleRenderTarget(ct),C.updateRenderTargetMipmap(ct))}x.setRenderTarget(Rt),x.setClearColor(G,j),Gt!==void 0&&(W.viewport=Gt),x.toneMapping=Ct}function ar(A,N,V){const W=N.isScene===!0?N.overrideMaterial:null;for(let F=0,ct=A.length;F<ct;F++){const _t=A[F],Rt=_t.object,Ct=_t.geometry,Gt=W===null?_t.material:W,Wt=_t.group;Rt.layers.test(V.layers)&&Al(Rt,N,V,Ct,Gt,Wt)}}function Al(A,N,V,W,F,ct){A.onBeforeRender(x,N,V,W,F,ct),A.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),F.onBeforeRender(x,N,V,W,A,ct),F.transparent===!0&&F.side===en&&F.forceSinglePass===!1?(F.side=ke,F.needsUpdate=!0,x.renderBufferDirect(V,N,W,F,A,ct),F.side=ri,F.needsUpdate=!0,x.renderBufferDirect(V,N,W,F,A,ct),F.side=en):x.renderBufferDirect(V,N,W,F,A,ct),A.onAfterRender(x,N,V,W,F,ct)}function or(A,N,V){N.isScene!==!0&&(N=Kt);const W=bt.get(A),F=p.state.lights,ct=p.state.shadowsArray,_t=F.state.version,Rt=At.getParameters(A,F.state,ct,N,V),Ct=At.getProgramCacheKey(Rt);let Gt=W.programs;W.environment=A.isMeshStandardMaterial?N.environment:null,W.fog=N.fog,W.envMap=(A.isMeshStandardMaterial?H:T).get(A.envMap||W.environment),W.envMapRotation=W.environment!==null&&A.envMap===null?N.environmentRotation:A.envMapRotation,Gt===void 0&&(A.addEventListener("dispose",Vt),Gt=new Map,W.programs=Gt);let Wt=Gt.get(Ct);if(Wt!==void 0){if(W.currentProgram===Wt&&W.lightsStateVersion===_t)return Cl(A,Rt),Wt}else Rt.uniforms=At.getUniforms(A),A.onBeforeCompile(Rt,x),Wt=At.acquireProgram(Rt,Ct),Gt.set(Ct,Wt),W.uniforms=Rt.uniforms;const Pt=W.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Pt.clippingPlanes=ot.uniform),Cl(A,Rt),W.needsLights=Au(A),W.lightsStateVersion=_t,W.needsLights&&(Pt.ambientLightColor.value=F.state.ambient,Pt.lightProbe.value=F.state.probe,Pt.directionalLights.value=F.state.directional,Pt.directionalLightShadows.value=F.state.directionalShadow,Pt.spotLights.value=F.state.spot,Pt.spotLightShadows.value=F.state.spotShadow,Pt.rectAreaLights.value=F.state.rectArea,Pt.ltc_1.value=F.state.rectAreaLTC1,Pt.ltc_2.value=F.state.rectAreaLTC2,Pt.pointLights.value=F.state.point,Pt.pointLightShadows.value=F.state.pointShadow,Pt.hemisphereLights.value=F.state.hemi,Pt.directionalShadowMap.value=F.state.directionalShadowMap,Pt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Pt.spotShadowMap.value=F.state.spotShadowMap,Pt.spotLightMatrix.value=F.state.spotLightMatrix,Pt.spotLightMap.value=F.state.spotLightMap,Pt.pointShadowMap.value=F.state.pointShadowMap,Pt.pointShadowMatrix.value=F.state.pointShadowMatrix),W.currentProgram=Wt,W.uniformsList=null,Wt}function Rl(A){if(A.uniformsList===null){const N=A.currentProgram.getUniforms();A.uniformsList=qr.seqWithValue(N.seq,A.uniforms)}return A.uniformsList}function Cl(A,N){const V=bt.get(A);V.outputColorSpace=N.outputColorSpace,V.batching=N.batching,V.batchingColor=N.batchingColor,V.instancing=N.instancing,V.instancingColor=N.instancingColor,V.instancingMorph=N.instancingMorph,V.skinning=N.skinning,V.morphTargets=N.morphTargets,V.morphNormals=N.morphNormals,V.morphColors=N.morphColors,V.morphTargetsCount=N.morphTargetsCount,V.numClippingPlanes=N.numClippingPlanes,V.numIntersection=N.numClipIntersection,V.vertexAlphas=N.vertexAlphas,V.vertexTangents=N.vertexTangents,V.toneMapping=N.toneMapping}function Eu(A,N,V,W,F){N.isScene!==!0&&(N=Kt),C.resetTextureUnits();const ct=N.fog,_t=W.isMeshStandardMaterial?N.environment:null,Rt=E===null?x.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:_s,Ct=(W.isMeshStandardMaterial?H:T).get(W.envMap||_t),Gt=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Wt=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Pt=!!V.morphAttributes.position,te=!!V.morphAttributes.normal,ue=!!V.morphAttributes.color;let fe=ei;W.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(fe=x.toneMapping);const Be=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ee=Be!==void 0?Be.length:0,Lt=bt.get(W),Tn=p.state.lights;if(rt===!0&&(wt===!0||A!==y)){const Je=A===y&&W.id===M;ot.setState(W,A,Je)}let ne=!1;W.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==Tn.state.version||Lt.outputColorSpace!==Rt||F.isBatchedMesh&&Lt.batching===!1||!F.isBatchedMesh&&Lt.batching===!0||F.isBatchedMesh&&Lt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Lt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Lt.instancing===!1||!F.isInstancedMesh&&Lt.instancing===!0||F.isSkinnedMesh&&Lt.skinning===!1||!F.isSkinnedMesh&&Lt.skinning===!0||F.isInstancedMesh&&Lt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Lt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Lt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Lt.instancingMorph===!1&&F.morphTexture!==null||Lt.envMap!==Ct||W.fog===!0&&Lt.fog!==ct||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==ot.numPlanes||Lt.numIntersection!==ot.numIntersection)||Lt.vertexAlphas!==Gt||Lt.vertexTangents!==Wt||Lt.morphTargets!==Pt||Lt.morphNormals!==te||Lt.morphColors!==ue||Lt.toneMapping!==fe||Lt.morphTargetsCount!==ee)&&(ne=!0):(ne=!0,Lt.__version=W.version);let an=Lt.currentProgram;ne===!0&&(an=or(W,N,F));let Di=!1,We=!1,ys=!1;const pe=an.getUniforms(),vn=Lt.uniforms;if(ut.useProgram(an.program)&&(Di=!0,We=!0,ys=!0),W.id!==M&&(M=W.id,We=!0),Di||y!==A){ut.buffers.depth.getReversed()?(lt.copy(A.projectionMatrix),Id(lt),Ud(lt),pe.setValue(R,"projectionMatrix",lt)):pe.setValue(R,"projectionMatrix",A.projectionMatrix),pe.setValue(R,"viewMatrix",A.matrixWorldInverse);const Hn=pe.map.cameraPosition;Hn!==void 0&&Hn.setValue(R,Ft.setFromMatrixPosition(A.matrixWorld)),xt.logarithmicDepthBuffer&&pe.setValue(R,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&pe.setValue(R,"isOrthographic",A.isOrthographicCamera===!0),y!==A&&(y=A,We=!0,ys=!0)}if(F.isSkinnedMesh){pe.setOptional(R,F,"bindMatrix"),pe.setOptional(R,F,"bindMatrixInverse");const Je=F.skeleton;Je&&(Je.boneTexture===null&&Je.computeBoneTexture(),pe.setValue(R,"boneTexture",Je.boneTexture,C))}F.isBatchedMesh&&(pe.setOptional(R,F,"batchingTexture"),pe.setValue(R,"batchingTexture",F._matricesTexture,C),pe.setOptional(R,F,"batchingIdTexture"),pe.setValue(R,"batchingIdTexture",F._indirectTexture,C),pe.setOptional(R,F,"batchingColorTexture"),F._colorsTexture!==null&&pe.setValue(R,"batchingColorTexture",F._colorsTexture,C));const bs=V.morphAttributes;if((bs.position!==void 0||bs.normal!==void 0||bs.color!==void 0)&&zt.update(F,V,an),(We||Lt.receiveShadow!==F.receiveShadow)&&(Lt.receiveShadow=F.receiveShadow,pe.setValue(R,"receiveShadow",F.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(vn.envMap.value=Ct,vn.flipEnvMap.value=Ct.isCubeTexture&&Ct.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&N.environment!==null&&(vn.envMapIntensity.value=N.environmentIntensity),We&&(pe.setValue(R,"toneMappingExposure",x.toneMappingExposure),Lt.needsLights&&Tu(vn,ys),ct&&W.fog===!0&&ft.refreshFogUniforms(vn,ct),ft.refreshMaterialUniforms(vn,W,X,Q,p.state.transmissionRenderTarget[A.id]),qr.upload(R,Rl(Lt),vn,C)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(qr.upload(R,Rl(Lt),vn,C),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&pe.setValue(R,"center",F.center),pe.setValue(R,"modelViewMatrix",F.modelViewMatrix),pe.setValue(R,"normalMatrix",F.normalMatrix),pe.setValue(R,"modelMatrix",F.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Je=W.uniformsGroups;for(let Hn=0,Gn=Je.length;Hn<Gn;Hn++){const Pl=Je[Hn];U.update(Pl,an),U.bind(Pl,an)}}return an}function Tu(A,N){A.ambientLightColor.needsUpdate=N,A.lightProbe.needsUpdate=N,A.directionalLights.needsUpdate=N,A.directionalLightShadows.needsUpdate=N,A.pointLights.needsUpdate=N,A.pointLightShadows.needsUpdate=N,A.spotLights.needsUpdate=N,A.spotLightShadows.needsUpdate=N,A.rectAreaLights.needsUpdate=N,A.hemisphereLights.needsUpdate=N}function Au(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(A,N,V){bt.get(A.texture).__webglTexture=N,bt.get(A.depthTexture).__webglTexture=V;const W=bt.get(A);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||Z.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,N){const V=bt.get(A);V.__webglFramebuffer=N,V.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(A,N=0,V=0){E=A,_=N,b=V;let W=!0,F=null,ct=!1,_t=!1;if(A){const Ct=bt.get(A);if(Ct.__useDefaultFramebuffer!==void 0)ut.bindFramebuffer(R.FRAMEBUFFER,null),W=!1;else if(Ct.__webglFramebuffer===void 0)C.setupRenderTarget(A);else if(Ct.__hasExternalTextures)C.rebindTextures(A,bt.get(A.texture).__webglTexture,bt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Pt=A.depthTexture;if(Ct.__boundDepthTexture!==Pt){if(Pt!==null&&bt.has(Pt)&&(A.width!==Pt.image.width||A.height!==Pt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(A)}}const Gt=A.texture;(Gt.isData3DTexture||Gt.isDataArrayTexture||Gt.isCompressedArrayTexture)&&(_t=!0);const Wt=bt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Wt[N])?F=Wt[N][V]:F=Wt[N],ct=!0):A.samples>0&&C.useMultisampledRTT(A)===!1?F=bt.get(A).__webglMultisampledFramebuffer:Array.isArray(Wt)?F=Wt[V]:F=Wt,P.copy(A.viewport),k.copy(A.scissor),B=A.scissorTest}else P.copy(St).multiplyScalar(X).floor(),k.copy(kt).multiplyScalar(X).floor(),B=Bt;if(ut.bindFramebuffer(R.FRAMEBUFFER,F)&&W&&ut.drawBuffers(A,F),ut.viewport(P),ut.scissor(k),ut.setScissorTest(B),ct){const Ct=bt.get(A.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+N,Ct.__webglTexture,V)}else if(_t){const Ct=bt.get(A.texture),Gt=N||0;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,Ct.__webglTexture,V||0,Gt)}M=-1},this.readRenderTargetPixels=function(A,N,V,W,F,ct,_t){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=bt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&_t!==void 0&&(Rt=Rt[_t]),Rt){ut.bindFramebuffer(R.FRAMEBUFFER,Rt);try{const Ct=A.texture,Gt=Ct.format,Wt=Ct.type;if(!xt.textureFormatReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!xt.textureTypeReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=A.width-W&&V>=0&&V<=A.height-F&&R.readPixels(N,V,W,F,$t.convert(Gt),$t.convert(Wt),ct)}finally{const Ct=E!==null?bt.get(E).__webglFramebuffer:null;ut.bindFramebuffer(R.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(A,N,V,W,F,ct,_t){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=bt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&_t!==void 0&&(Rt=Rt[_t]),Rt){const Ct=A.texture,Gt=Ct.format,Wt=Ct.type;if(!xt.textureFormatReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!xt.textureTypeReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=A.width-W&&V>=0&&V<=A.height-F){ut.bindFramebuffer(R.FRAMEBUFFER,Rt);const Pt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Pt),R.bufferData(R.PIXEL_PACK_BUFFER,ct.byteLength,R.STREAM_READ),R.readPixels(N,V,W,F,$t.convert(Gt),$t.convert(Wt),0);const te=E!==null?bt.get(E).__webglFramebuffer:null;ut.bindFramebuffer(R.FRAMEBUFFER,te);const ue=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await Dd(R,ue,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Pt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,ct),R.deleteBuffer(Pt),R.deleteSync(ue),ct}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,N=null,V=0){A.isTexture!==!0&&(Is("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,A=arguments[1]);const W=Math.pow(2,-V),F=Math.floor(A.image.width*W),ct=Math.floor(A.image.height*W),_t=N!==null?N.x:0,Rt=N!==null?N.y:0;C.setTexture2D(A,0),R.copyTexSubImage2D(R.TEXTURE_2D,V,0,0,_t,Rt,F,ct),ut.unbindTexture()},this.copyTextureToTexture=function(A,N,V=null,W=null,F=0){A.isTexture!==!0&&(Is("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,A=arguments[1],N=arguments[2],F=arguments[3]||0,V=null);let ct,_t,Rt,Ct,Gt,Wt,Pt,te,ue;const fe=A.isCompressedTexture?A.mipmaps[F]:A.image;V!==null?(ct=V.max.x-V.min.x,_t=V.max.y-V.min.y,Rt=V.isBox3?V.max.z-V.min.z:1,Ct=V.min.x,Gt=V.min.y,Wt=V.isBox3?V.min.z:0):(ct=fe.width,_t=fe.height,Rt=fe.depth||1,Ct=0,Gt=0,Wt=0),W!==null?(Pt=W.x,te=W.y,ue=W.z):(Pt=0,te=0,ue=0);const Be=$t.convert(N.format),ee=$t.convert(N.type);let Lt;N.isData3DTexture?(C.setTexture3D(N,0),Lt=R.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(C.setTexture2DArray(N,0),Lt=R.TEXTURE_2D_ARRAY):(C.setTexture2D(N,0),Lt=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,N.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,N.unpackAlignment);const Tn=R.getParameter(R.UNPACK_ROW_LENGTH),ne=R.getParameter(R.UNPACK_IMAGE_HEIGHT),an=R.getParameter(R.UNPACK_SKIP_PIXELS),Di=R.getParameter(R.UNPACK_SKIP_ROWS),We=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,fe.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,fe.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Ct),R.pixelStorei(R.UNPACK_SKIP_ROWS,Gt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Wt);const ys=A.isDataArrayTexture||A.isData3DTexture,pe=N.isDataArrayTexture||N.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){const vn=bt.get(A),bs=bt.get(N),Je=bt.get(vn.__renderTarget),Hn=bt.get(bs.__renderTarget);ut.bindFramebuffer(R.READ_FRAMEBUFFER,Je.__webglFramebuffer),ut.bindFramebuffer(R.DRAW_FRAMEBUFFER,Hn.__webglFramebuffer);for(let Gn=0;Gn<Rt;Gn++)ys&&R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,bt.get(A).__webglTexture,F,Wt+Gn),A.isDepthTexture?(pe&&R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,bt.get(N).__webglTexture,F,ue+Gn),R.blitFramebuffer(Ct,Gt,ct,_t,Pt,te,ct,_t,R.DEPTH_BUFFER_BIT,R.NEAREST)):pe?R.copyTexSubImage3D(Lt,F,Pt,te,ue+Gn,Ct,Gt,ct,_t):R.copyTexSubImage2D(Lt,F,Pt,te,ue+Gn,Ct,Gt,ct,_t);ut.bindFramebuffer(R.READ_FRAMEBUFFER,null),ut.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else pe?A.isDataTexture||A.isData3DTexture?R.texSubImage3D(Lt,F,Pt,te,ue,ct,_t,Rt,Be,ee,fe.data):N.isCompressedArrayTexture?R.compressedTexSubImage3D(Lt,F,Pt,te,ue,ct,_t,Rt,Be,fe.data):R.texSubImage3D(Lt,F,Pt,te,ue,ct,_t,Rt,Be,ee,fe):A.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,F,Pt,te,ct,_t,Be,ee,fe.data):A.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,F,Pt,te,fe.width,fe.height,Be,fe.data):R.texSubImage2D(R.TEXTURE_2D,F,Pt,te,ct,_t,Be,ee,fe);R.pixelStorei(R.UNPACK_ROW_LENGTH,Tn),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ne),R.pixelStorei(R.UNPACK_SKIP_PIXELS,an),R.pixelStorei(R.UNPACK_SKIP_ROWS,Di),R.pixelStorei(R.UNPACK_SKIP_IMAGES,We),F===0&&N.generateMipmaps&&R.generateMipmap(Lt),ut.unbindTexture()},this.copyTextureToTexture3D=function(A,N,V=null,W=null,F=0){return A.isTexture!==!0&&(Is("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,W=arguments[1]||null,A=arguments[2],N=arguments[3],F=arguments[4]||0),Is('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,N,V,W,F)},this.initRenderTarget=function(A){bt.get(A).__webglFramebuffer===void 0&&C.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?C.setTextureCube(A,0):A.isData3DTexture?C.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?C.setTexture2DArray(A,0):C.setTexture2D(A,0),ut.unbindTexture()},this.resetState=function(){_=0,b=0,E=null,ut.reset(),he.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}}class ol{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ot(t),this.near=e,this.far=n}clone(){return new ol(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Wh extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _n,this.environmentIntensity=1,this.environmentRotation=new _n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Cr=new D,Cc=new D;class Xg extends Te{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(t){super.copy(t,!1);const e=t.levels;for(let n=0,s=e.length;n<s;n++){const r=e[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=t.autoUpdate,this}addLevel(t,e=0,n=0){e=Math.abs(e);const s=this.levels;let r;for(r=0;r<s.length&&!(e<s[r].distance);r++);return s.splice(r,0,{distance:e,hysteresis:n,object:t}),this.add(t),this}removeLevel(t){const e=this.levels;for(let n=0;n<e.length;n++)if(e[n].distance===t){const s=e.splice(n,1);return this.remove(s[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(t){const e=this.levels;if(e.length>0){let n,s;for(n=1,s=e.length;n<s;n++){let r=e[n].distance;if(e[n].object.visible&&(r-=r*e[n].hysteresis),t<r)break}return e[n-1].object}return null}raycast(t,e){if(this.levels.length>0){Cr.setFromMatrixPosition(this.matrixWorld);const s=t.ray.origin.distanceTo(Cr);this.getObjectForDistance(s).raycast(t,e)}}update(t){const e=this.levels;if(e.length>1){Cr.setFromMatrixPosition(t.matrixWorld),Cc.setFromMatrixPosition(this.matrixWorld);const n=Cr.distanceTo(Cc)/t.zoom;e[0].object.visible=!0;let s,r;for(s=1,r=e.length;s<r;s++){let a=e[s].distance;if(e[s].object.visible&&(a-=a*e[s].hysteresis),n>=a)e[s-1].object.visible=!1,e[s].object.visible=!0;else break}for(this._currentLevel=s-1;s<r;s++)e[s].object.visible=!1}}toJSON(t){const e=super.toJSON(t);this.autoUpdate===!1&&(e.object.autoUpdate=!1),e.object.levels=[];const n=this.levels;for(let s=0,r=n.length;s<r;s++){const a=n[s];e.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return e}}class qg extends Ue{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Ge,h=Ge,u,f){super(null,a,o,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pc extends Ke{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const $i=new re,Lc=new re,Pr=[],Dc=new zn,$g=new re,Ts=new Ht,As=new nr;class Ga extends Ht{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Pc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,$g)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new zn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,$i),Dc.copy(t.boundingBox).applyMatrix4($i),this.boundingBox.union(Dc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new nr),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,$i),As.copy(t.boundingSphere).applyMatrix4($i),this.boundingSphere.union(As)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Ts.geometry=this.geometry,Ts.material=this.material,Ts.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),As.copy(this.boundingSphere),As.applyMatrix4(n),t.ray.intersectsSphere(As)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,$i),Lc.multiplyMatrices(n,$i),Ts.matrixWorld=Lc,Ts.raycast(t,Pr);for(let a=0,o=Pr.length;a<o;a++){const l=Pr[a];l.instanceId=r,l.object=this,e.push(l)}Pr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Pc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new qg(new Float32Array(s*this.count),s,this.count,Jo,Mn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class ms extends Ue{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class wn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const h=n[s],f=n[s+1]-h,d=(a-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new it:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new D,s=[],r=[],a=[],o=new D,l=new re;for(let d=0;d<=t;d++){const g=d/t;s[d]=this.getTangentAt(g,new D)}r[0]=new D,a[0]=new D;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(ve(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,g))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(ve(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ll extends wn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new it){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Yg extends ll{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function cl(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+u)+(l-o)/u;f*=h,d*=h,s(a,o,f,d)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const Lr=new D,Va=new cl,Wa=new cl,Xa=new cl;class Jr extends wn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new D){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Lr.subVectors(s[0],s[1]).add(s[0]),c=Lr);const u=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Lr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Lr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),d),v=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Va.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,v,m),Wa.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,v,m),Xa.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(Va.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Wa.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),Xa.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(Va.calc(l),Wa.calc(l),Xa.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new D().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Ic(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function jg(i,t){const e=1-i;return e*e*t}function Zg(i,t){return 2*(1-i)*i*t}function Kg(i,t){return i*i*t}function zs(i,t,e,n){return jg(i,t)+Zg(i,e)+Kg(i,n)}function Jg(i,t){const e=1-i;return e*e*e*t}function Qg(i,t){const e=1-i;return 3*e*e*i*t}function t_(i,t){return 3*(1-i)*i*i*t}function e_(i,t){return i*i*i*t}function Hs(i,t,e,n,s){return Jg(i,t)+Qg(i,e)+t_(i,n)+e_(i,s)}class Xh extends wn{constructor(t=new it,e=new it,n=new it,s=new it){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new it){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Hs(t,s.x,r.x,a.x,o.x),Hs(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class n_ extends wn{constructor(t=new D,e=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new D){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Hs(t,s.x,r.x,a.x,o.x),Hs(t,s.y,r.y,a.y,o.y),Hs(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class qh extends wn{constructor(t=new it,e=new it){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new it){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new it){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class i_ extends wn{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class $h extends wn{constructor(t=new it,e=new it,n=new it){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new it){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(zs(t,s.x,r.x,a.x),zs(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Yh extends wn{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(zs(t,s.x,r.x,a.x),zs(t,s.y,r.y,a.y),zs(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jh extends wn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new it){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(Ic(o,l.x,c.x,h.x,u.x),Ic(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new it().fromArray(s))}return this}}var Qr=Object.freeze({__proto__:null,ArcCurve:Yg,CatmullRomCurve3:Jr,CubicBezierCurve:Xh,CubicBezierCurve3:n_,EllipseCurve:ll,LineCurve:qh,LineCurve3:i_,QuadraticBezierCurve:$h,QuadraticBezierCurve3:Yh,SplineCurve:jh});class s_ extends wn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Qr[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Qr[s.type]().fromJSON(s))}return this}}class Uc extends s_{constructor(t){super(),this.type="Path",this.currentPoint=new it,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new qh(this.currentPoint.clone(),new it(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new $h(this.currentPoint.clone(),new it(t,e),new it(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new Xh(this.currentPoint.clone(),new it(t,e),new it(n,s),new it(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new jh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){const c=new ll(t,e,n,s,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class hl extends Se{constructor(t=[new it(0,-.5),new it(.5,0),new it(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=ve(s,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],h=1/e,u=new D,f=new it,d=new D,g=new D,v=new D;let m=0,p=0;for(let w=0;w<=t.length-1;w++)switch(w){case 0:m=t[w+1].x-t[w].x,p=t[w+1].y-t[w].y,d.x=p*1,d.y=-m,d.z=p*0,v.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[w+1].x-t[w].x,p=t[w+1].y-t[w].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),l.push(d.x,d.y,d.z),v.copy(g)}for(let w=0;w<=e;w++){const S=n+w*h*s,x=Math.sin(S),I=Math.cos(S);for(let _=0;_<=t.length-1;_++){u.x=t[_].x*x,u.y=t[_].y,u.z=t[_].x*I,a.push(u.x,u.y,u.z),f.x=w/e,f.y=_/(t.length-1),o.push(f.x,f.y);const b=l[3*_+0]*x,E=l[3*_+1],M=l[3*_+0]*I;c.push(b,E,M)}}for(let w=0;w<e;w++)for(let S=0;S<t.length-1;S++){const x=S+w*t.length,I=x,_=x+t.length,b=x+t.length+1,E=x+1;r.push(I,_,E),r.push(b,E,_)}this.setIndex(r),this.setAttribute("position",new jt(a,3)),this.setAttribute("uv",new jt(o,2)),this.setAttribute("normal",new jt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hl(t.points,t.segments,t.phiStart,t.phiLength)}}class qs extends Se{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new D,h=new it;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*s;c.x=t*Math.cos(d),c.y=t*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[f]/t+1)/2,h.y=(a[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new jt(a,3)),this.setAttribute("normal",new jt(o,3)),this.setAttribute("uv",new jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qs(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ni extends Se{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let g=0;const v=[],m=n/2;let p=0;w(),a===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new jt(u,3)),this.setAttribute("normal",new jt(f,3)),this.setAttribute("uv",new jt(d,2));function w(){const x=new D,I=new D;let _=0;const b=(e-t)/n;for(let E=0;E<=r;E++){const M=[],y=E/r,P=y*(e-t)+t;for(let k=0;k<=s;k++){const B=k/s,G=B*l+o,j=Math.sin(G),q=Math.cos(G);I.x=P*j,I.y=-y*n+m,I.z=P*q,u.push(I.x,I.y,I.z),x.set(j,b,q).normalize(),f.push(x.x,x.y,x.z),d.push(B,1-y),M.push(g++)}v.push(M)}for(let E=0;E<s;E++)for(let M=0;M<r;M++){const y=v[M][E],P=v[M+1][E],k=v[M+1][E+1],B=v[M][E+1];(t>0||M!==0)&&(h.push(y,P,B),_+=3),(e>0||M!==r-1)&&(h.push(P,k,B),_+=3)}c.addGroup(p,_,0),p+=_}function S(x){const I=g,_=new it,b=new D;let E=0;const M=x===!0?t:e,y=x===!0?1:-1;for(let k=1;k<=s;k++)u.push(0,m*y,0),f.push(0,y,0),d.push(.5,.5),g++;const P=g;for(let k=0;k<=s;k++){const G=k/s*l+o,j=Math.cos(G),q=Math.sin(G);b.x=M*q,b.y=m*y,b.z=M*j,u.push(b.x,b.y,b.z),f.push(0,y,0),_.x=j*.5+.5,_.y=q*.5*y+.5,d.push(_.x,_.y),g++}for(let k=0;k<s;k++){const B=I+k,G=P+k;x===!0?h.push(G,G+1,B):h.push(G+1,G,B),E+=3}c.addGroup(p,E,x===!0?1:2),p+=E}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ni(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ul extends Se{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new jt(r,3)),this.setAttribute("normal",new jt(r.slice(),3)),this.setAttribute("uv",new jt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(w){const S=new D,x=new D,I=new D;for(let _=0;_<e.length;_+=3)d(e[_+0],S),d(e[_+1],x),d(e[_+2],I),l(S,x,I,w)}function l(w,S,x,I){const _=I+1,b=[];for(let E=0;E<=_;E++){b[E]=[];const M=w.clone().lerp(x,E/_),y=S.clone().lerp(x,E/_),P=_-E;for(let k=0;k<=P;k++)k===0&&E===_?b[E][k]=M:b[E][k]=M.clone().lerp(y,k/P)}for(let E=0;E<_;E++)for(let M=0;M<2*(_-E)-1;M++){const y=Math.floor(M/2);M%2===0?(f(b[E][y+1]),f(b[E+1][y]),f(b[E][y])):(f(b[E][y+1]),f(b[E+1][y+1]),f(b[E+1][y]))}}function c(w){const S=new D;for(let x=0;x<r.length;x+=3)S.x=r[x+0],S.y=r[x+1],S.z=r[x+2],S.normalize().multiplyScalar(w),r[x+0]=S.x,r[x+1]=S.y,r[x+2]=S.z}function h(){const w=new D;for(let S=0;S<r.length;S+=3){w.x=r[S+0],w.y=r[S+1],w.z=r[S+2];const x=m(w)/2/Math.PI+.5,I=p(w)/Math.PI+.5;a.push(x,1-I)}g(),u()}function u(){for(let w=0;w<a.length;w+=6){const S=a[w+0],x=a[w+2],I=a[w+4],_=Math.max(S,x,I),b=Math.min(S,x,I);_>.9&&b<.1&&(S<.2&&(a[w+0]+=1),x<.2&&(a[w+2]+=1),I<.2&&(a[w+4]+=1))}}function f(w){r.push(w.x,w.y,w.z)}function d(w,S){const x=w*3;S.x=t[x+0],S.y=t[x+1],S.z=t[x+2]}function g(){const w=new D,S=new D,x=new D,I=new D,_=new it,b=new it,E=new it;for(let M=0,y=0;M<r.length;M+=9,y+=6){w.set(r[M+0],r[M+1],r[M+2]),S.set(r[M+3],r[M+4],r[M+5]),x.set(r[M+6],r[M+7],r[M+8]),_.set(a[y+0],a[y+1]),b.set(a[y+2],a[y+3]),E.set(a[y+4],a[y+5]),I.copy(w).add(S).add(x).divideScalar(3);const P=m(I);v(_,y+0,w,P),v(b,y+2,S,P),v(E,y+4,x,P)}}function v(w,S,x,I){I<0&&w.x===1&&(a[S]=w.x-1),x.x===0&&x.z===0&&(a[S]=I/2/Math.PI+.5)}function m(w){return Math.atan2(w.z,-w.x)}function p(w){return Math.atan2(-w.y,Math.sqrt(w.x*w.x+w.z*w.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ul(t.vertices,t.indices,t.radius,t.details)}}class $s extends Uc{constructor(t){super(t),this.uuid=Li(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Uc().fromJSON(s))}return this}}const r_={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=Zh(i,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,u,f,d;if(n&&(r=h_(i,t,r,e)),i.length>80*e){o=c=i[0],l=h=i[1];for(let g=e;g<s;g+=e)u=i[g],f=i[g+1],u<o&&(o=u),f<l&&(l=f),u>c&&(c=u),f>h&&(h=f);d=Math.max(c-o,h-l),d=d!==0?32767/d:0}return Ys(r,a,e,o,l,d,0),a}};function Zh(i,t,e,n,s){let r,a;if(s===b_(i,t,e,n)>0)for(r=t;r<e;r+=n)a=Nc(r,i[r],i[r+1],a);else for(r=e-n;r>=t;r-=n)a=Nc(r,i[r],i[r+1],a);return a&&ua(a,a.next)&&(Zs(a),a=a.next),a}function Ai(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(ua(e,e.next)||me(e.prev,e,e.next)===0)){if(Zs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ys(i,t,e,n,s,r,a){if(!i)return;!a&&r&&m_(i,n,s,r);let o=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?o_(i,n,s,r):a_(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),Zs(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=l_(Ai(i),t,e),Ys(i,t,e,n,s,r,2)):a===2&&c_(i,t,e,n,s,r):Ys(Ai(i),t,e,n,s,r,1);break}}}function a_(i){const t=i.prev,e=i,n=i.next;if(me(t,e,n)>=0)return!1;const s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=s<r?s<a?s:a:r<a?r:a,u=o<l?o<c?o:c:l<c?l:c,f=s>r?s>a?s:a:r>a?r:a,d=o>l?o>c?o:c:l>c?l:c;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&es(s,o,r,l,a,c,g.x,g.y)&&me(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function o_(i,t,e,n){const s=i.prev,r=i,a=i.next;if(me(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,h=s.y,u=r.y,f=a.y,d=o<l?o<c?o:c:l<c?l:c,g=h<u?h<f?h:f:u<f?u:f,v=o>l?o>c?o:c:l>c?l:c,m=h>u?h>f?h:f:u>f?u:f,p=Ho(d,g,t,e,n),w=Ho(v,m,t,e,n);let S=i.prevZ,x=i.nextZ;for(;S&&S.z>=p&&x&&x.z<=w;){if(S.x>=d&&S.x<=v&&S.y>=g&&S.y<=m&&S!==s&&S!==a&&es(o,h,l,u,c,f,S.x,S.y)&&me(S.prev,S,S.next)>=0||(S=S.prevZ,x.x>=d&&x.x<=v&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&es(o,h,l,u,c,f,x.x,x.y)&&me(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;S&&S.z>=p;){if(S.x>=d&&S.x<=v&&S.y>=g&&S.y<=m&&S!==s&&S!==a&&es(o,h,l,u,c,f,S.x,S.y)&&me(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;x&&x.z<=w;){if(x.x>=d&&x.x<=v&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&es(o,h,l,u,c,f,x.x,x.y)&&me(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function l_(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!ua(s,r)&&Kh(s,n,n.next,r)&&js(s,r)&&js(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Zs(n),Zs(n.next),n=i=r),n=n.next}while(n!==i);return Ai(n)}function c_(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&v_(a,o)){let l=Jh(a,o);a=Ai(a,a.next),l=Ai(l,l.next),Ys(a,t,e,n,s,r,0),Ys(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function h_(i,t,e,n){const s=[];let r,a,o,l,c;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=Zh(i,o,l,n,!1),c===c.next&&(c.steiner=!0),s.push(__(c));for(s.sort(u_),r=0;r<s.length;r++)e=d_(s[r],e);return e}function u_(i,t){return i.x-t.x}function d_(i,t){const e=f_(i,t);if(!e)return t;const n=Jh(e,i);return Ai(n,n.next),Ai(e,e.next)}function f_(i,t){let e=t,n=-1/0,s;const r=i.x,a=i.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const f=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;const o=s,l=s.x,c=s.y;let h=1/0,u;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&es(a<c?r:n,a,l,c,a<c?n:r,a,e.x,e.y)&&(u=Math.abs(a-e.y)/(r-e.x),js(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&p_(s,e)))&&(s=e,h=u)),e=e.next;while(e!==o);return s}function p_(i,t){return me(i.prev,i,t.prev)<0&&me(t.next,i,i.next)<0}function m_(i,t,e,n){let s=i;do s.z===0&&(s.z=Ho(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,g_(s)}function g_(i){let t,e,n,s,r,a,o,l,c=1;do{for(e=i,i=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<c&&(o++,n=n.nextZ,!!n);t++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,o--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,c*=2}while(a>1);return i}function Ho(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function __(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function es(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function v_(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!x_(i,t)&&(js(i,t)&&js(t,i)&&y_(i,t)&&(me(i.prev,i,t.prev)||me(i,t.prev,t))||ua(i,t)&&me(i.prev,i,i.next)>0&&me(t.prev,t,t.next)>0)}function me(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function ua(i,t){return i.x===t.x&&i.y===t.y}function Kh(i,t,e,n){const s=Ir(me(i,t,e)),r=Ir(me(i,t,n)),a=Ir(me(e,n,i)),o=Ir(me(e,n,t));return!!(s!==r&&a!==o||s===0&&Dr(i,e,t)||r===0&&Dr(i,n,t)||a===0&&Dr(e,i,n)||o===0&&Dr(e,t,n))}function Dr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Ir(i){return i>0?1:i<0?-1:0}function x_(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Kh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function js(i,t){return me(i.prev,i,i.next)<0?me(i,t,i.next)>=0&&me(i,i.prev,t)>=0:me(i,t,i.prev)<0||me(i,i.next,t)<0}function y_(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Jh(i,t){const e=new Go(i.i,i.x,i.y),n=new Go(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Nc(i,t,e,n){const s=new Go(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Zs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Go(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function b_(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Gs{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Gs.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];Fc(t),Oc(n,t);let a=t.length;e.forEach(Fc);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,Oc(n,e[l]);const o=r_.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Fc(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Oc(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class gs extends Se{constructor(t=new $s([new it(.5,.5),new it(-.5,.5),new it(-.5,-.5),new it(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new jt(s,3)),this.setAttribute("uv",new jt(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,w=e.UVGenerator!==void 0?e.UVGenerator:M_;let S,x=!1,I,_,b,E;p&&(S=p.getSpacedPoints(h),x=!0,f=!1,I=p.computeFrenetFrames(h,!1),_=new D,b=new D,E=new D),f||(m=0,d=0,g=0,v=0);const M=o.extractPoints(c);let y=M.shape;const P=M.holes;if(!Gs.isClockWise(y)){y=y.reverse();for(let L=0,O=P.length;L<O;L++){const R=P[L];Gs.isClockWise(R)&&(P[L]=R.reverse())}}const B=Gs.triangulateShape(y,P),G=y;for(let L=0,O=P.length;L<O;L++){const R=P[L];y=y.concat(R)}function j(L,O,R){return O||console.error("THREE.ExtrudeGeometry: vec does not exist"),L.clone().addScaledVector(O,R)}const q=y.length,Q=B.length;function X(L,O,R){let st,Z,xt;const ut=L.x-O.x,Ut=L.y-O.y,bt=R.x-L.x,C=R.y-L.y,T=ut*ut+Ut*Ut,H=ut*C-Ut*bt;if(Math.abs(H)>Number.EPSILON){const K=Math.sqrt(T),et=Math.sqrt(bt*bt+C*C),J=O.x-Ut/K,At=O.y+ut/K,ft=R.x-C/et,Mt=R.y+bt/et,Zt=((ft-J)*C-(Mt-At)*bt)/(ut*C-Ut*bt);st=J+ut*Zt-L.x,Z=At+Ut*Zt-L.y;const ot=st*st+Z*Z;if(ot<=2)return new it(st,Z);xt=Math.sqrt(ot/2)}else{let K=!1;ut>Number.EPSILON?bt>Number.EPSILON&&(K=!0):ut<-Number.EPSILON?bt<-Number.EPSILON&&(K=!0):Math.sign(Ut)===Math.sign(C)&&(K=!0),K?(st=-Ut,Z=ut,xt=Math.sqrt(T)):(st=ut,Z=Ut,xt=Math.sqrt(T/2))}return new it(st/xt,Z/xt)}const ht=[];for(let L=0,O=G.length,R=O-1,st=L+1;L<O;L++,R++,st++)R===O&&(R=0),st===O&&(st=0),ht[L]=X(G[L],G[R],G[st]);const mt=[];let St,kt=ht.concat();for(let L=0,O=P.length;L<O;L++){const R=P[L];St=[];for(let st=0,Z=R.length,xt=Z-1,ut=st+1;st<Z;st++,xt++,ut++)xt===Z&&(xt=0),ut===Z&&(ut=0),St[st]=X(R[st],R[xt],R[ut]);mt.push(St),kt=kt.concat(St)}for(let L=0;L<m;L++){const O=L/m,R=d*Math.cos(O*Math.PI/2),st=g*Math.sin(O*Math.PI/2)+v;for(let Z=0,xt=G.length;Z<xt;Z++){const ut=j(G[Z],ht[Z],st);lt(ut.x,ut.y,-R)}for(let Z=0,xt=P.length;Z<xt;Z++){const ut=P[Z];St=mt[Z];for(let Ut=0,bt=ut.length;Ut<bt;Ut++){const C=j(ut[Ut],St[Ut],st);lt(C.x,C.y,-R)}}}const Bt=g+v;for(let L=0;L<q;L++){const O=f?j(y[L],kt[L],Bt):y[L];x?(b.copy(I.normals[0]).multiplyScalar(O.x),_.copy(I.binormals[0]).multiplyScalar(O.y),E.copy(S[0]).add(b).add(_),lt(E.x,E.y,E.z)):lt(O.x,O.y,0)}for(let L=1;L<=h;L++)for(let O=0;O<q;O++){const R=f?j(y[O],kt[O],Bt):y[O];x?(b.copy(I.normals[L]).multiplyScalar(R.x),_.copy(I.binormals[L]).multiplyScalar(R.y),E.copy(S[L]).add(b).add(_),lt(E.x,E.y,E.z)):lt(R.x,R.y,u/h*L)}for(let L=m-1;L>=0;L--){const O=L/m,R=d*Math.cos(O*Math.PI/2),st=g*Math.sin(O*Math.PI/2)+v;for(let Z=0,xt=G.length;Z<xt;Z++){const ut=j(G[Z],ht[Z],st);lt(ut.x,ut.y,u+R)}for(let Z=0,xt=P.length;Z<xt;Z++){const ut=P[Z];St=mt[Z];for(let Ut=0,bt=ut.length;Ut<bt;Ut++){const C=j(ut[Ut],St[Ut],st);x?lt(C.x,C.y+S[h-1].y,S[h-1].x+R):lt(C.x,C.y,u+R)}}}Y(),rt();function Y(){const L=s.length/3;if(f){let O=0,R=q*O;for(let st=0;st<Q;st++){const Z=B[st];Dt(Z[2]+R,Z[1]+R,Z[0]+R)}O=h+m*2,R=q*O;for(let st=0;st<Q;st++){const Z=B[st];Dt(Z[0]+R,Z[1]+R,Z[2]+R)}}else{for(let O=0;O<Q;O++){const R=B[O];Dt(R[2],R[1],R[0])}for(let O=0;O<Q;O++){const R=B[O];Dt(R[0]+q*h,R[1]+q*h,R[2]+q*h)}}n.addGroup(L,s.length/3-L,0)}function rt(){const L=s.length/3;let O=0;wt(G,O),O+=G.length;for(let R=0,st=P.length;R<st;R++){const Z=P[R];wt(Z,O),O+=Z.length}n.addGroup(L,s.length/3-L,1)}function wt(L,O){let R=L.length;for(;--R>=0;){const st=R;let Z=R-1;Z<0&&(Z=L.length-1);for(let xt=0,ut=h+m*2;xt<ut;xt++){const Ut=q*xt,bt=q*(xt+1),C=O+st+Ut,T=O+Z+Ut,H=O+Z+bt,K=O+st+bt;Ft(C,T,H,K)}}}function lt(L,O,R){l.push(L),l.push(O),l.push(R)}function Dt(L,O,R){It(L),It(O),It(R);const st=s.length/3,Z=w.generateTopUV(n,s,st-3,st-2,st-1);Kt(Z[0]),Kt(Z[1]),Kt(Z[2])}function Ft(L,O,R,st){It(L),It(O),It(st),It(O),It(R),It(st);const Z=s.length/3,xt=w.generateSideWallUV(n,s,Z-6,Z-3,Z-2,Z-1);Kt(xt[0]),Kt(xt[1]),Kt(xt[3]),Kt(xt[1]),Kt(xt[2]),Kt(xt[3])}function It(L){s.push(l[L*3+0]),s.push(l[L*3+1]),s.push(l[L*3+2])}function Kt(L){r.push(L.x),r.push(L.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return S_(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Qr[s.type]().fromJSON(s)),new gs(n,t.options)}}const M_={generateTopUV:function(i,t,e,n,s){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new it(r,a),new it(o,l),new it(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[s*3],d=t[s*3+1],g=t[s*3+2],v=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new it(a,1-l),new it(c,1-u),new it(f,1-g),new it(v,1-p)]:[new it(o,1-l),new it(h,1-u),new it(d,1-g),new it(m,1-p)]}};function S_(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class dl extends ul{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new dl(t.radius,t.detail)}}class fl extends Se{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],h=[];let u=t;const f=(e-t)/s,d=new D,g=new it;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const p=r+m/n*a;d.x=u*Math.cos(p),d.y=u*Math.sin(p),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let v=0;v<s;v++){const m=v*(n+1);for(let p=0;p<n;p++){const w=p+m,S=w,x=w+n+1,I=w+n+2,_=w+1;o.push(S,x,_),o.push(x,I,_)}}this.setIndex(o),this.setAttribute("position",new jt(l,3)),this.setAttribute("normal",new jt(c,3)),this.setAttribute("uv",new jt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fl(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class as extends Se{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new D,f=new D,d=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const w=[],S=p/n;let x=0;p===0&&a===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let I=0;I<=e;I++){const _=I/e;u.x=-t*Math.cos(s+_*r)*Math.sin(a+S*o),u.y=t*Math.cos(a+S*o),u.z=t*Math.sin(s+_*r)*Math.sin(a+S*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),m.push(_+x,1-S),w.push(c++)}h.push(w)}for(let p=0;p<n;p++)for(let w=0;w<e;w++){const S=h[p][w+1],x=h[p][w],I=h[p+1][w],_=h[p+1][w+1];(p!==0||a>0)&&d.push(S,x,_),(p!==n-1||l<Math.PI)&&d.push(x,I,_)}this.setIndex(d),this.setAttribute("position",new jt(g,3)),this.setAttribute("normal",new jt(v,3)),this.setAttribute("uv",new jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new as(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ta extends Se{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],c=[],h=new D,u=new D,f=new D;for(let d=0;d<=n;d++)for(let g=0;g<=s;g++){const v=g/s*r,m=d/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/s),c.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=s;g++){const v=(s+1)*d+g-1,m=(s+1)*(d-1)+g-1,p=(s+1)*(d-1)+g,w=(s+1)*d+g;a.push(v,m,w),a.push(m,p,w)}this.setIndex(a),this.setAttribute("position",new jt(o,3)),this.setAttribute("normal",new jt(l,3)),this.setAttribute("uv",new jt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ta(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ea extends Se{constructor(t=new Yh(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new D,l=new D,c=new it;let h=new D;const u=[],f=[],d=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new jt(u,3)),this.setAttribute("normal",new jt(f,3)),this.setAttribute("uv",new jt(d,2));function v(){for(let S=0;S<e;S++)m(S);m(r===!1?e:0),w(),p()}function m(S){h=t.getPointAt(S/e,h);const x=a.normals[S],I=a.binormals[S];for(let _=0;_<=s;_++){const b=_/s*Math.PI*2,E=Math.sin(b),M=-Math.cos(b);l.x=M*x.x+E*I.x,l.y=M*x.y+E*I.y,l.z=M*x.z+E*I.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}function p(){for(let S=1;S<=e;S++)for(let x=1;x<=s;x++){const I=(s+1)*(S-1)+(x-1),_=(s+1)*S+(x-1),b=(s+1)*S+x,E=(s+1)*(S-1)+x;g.push(I,_,E),g.push(_,b,E)}}function w(){for(let S=0;S<=e;S++)for(let x=0;x<=s;x++)c.x=S/e,c.y=x/s,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new ea(new Qr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Ie extends ir{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Th,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class w_ extends Ie{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new it(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ve(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ot(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ot(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ot(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class pl extends Te{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ot(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class E_ extends pl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ot(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const qa=new re,kc=new D,Bc=new D;class Qh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new it(512,512),this.map=null,this.mapPass=null,this.matrix=new re,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rl,this._frameExtents=new it(1,1),this._viewportCount=1,this._viewports=[new le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;kc.setFromMatrixPosition(t.matrixWorld),e.position.copy(kc),Bc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Bc),e.updateMatrixWorld(),qa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(qa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const zc=new re,Rs=new D,$a=new D;class T_ extends Qh{constructor(){super(new Ze(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new it(4,2),this._viewportCount=6,this._viewports=[new le(2,1,1,1),new le(0,1,1,1),new le(3,1,1,1),new le(1,1,1,1),new le(3,0,1,1),new le(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Rs.setFromMatrixPosition(t.matrixWorld),n.position.copy(Rs),$a.copy(n.position),$a.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt($a),n.updateMatrixWorld(),s.makeTranslation(-Rs.x,-Rs.y,-Rs.z),zc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zc)}}class A_ extends pl{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new T_}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class R_ extends Qh{constructor(){super(new kh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class C_ extends pl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.target=new Te,this.shadow=new R_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Hc=new re;class P_{constructor(t,e,n=0,s=1/0){this.ray=new il(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new sl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Hc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Hc),this}intersectObject(t,e=!0,n=[]){return Vo(t,this,n,e),n.sort(Gc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Vo(t[s],this,n,e);return n.sort(Gc),n}}function Gc(i,t){return i.distance-t.distance}function Vo(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Vo(r[a],t,e,!0)}}class Vc{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(ve(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class L_ extends Pi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Yo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Yo);const Wc={type:"change"},ml={type:"start"},tu={type:"end"},Ur=new il,Xc=new Kn,D_=Math.cos(70*Zn.DEG2RAD),xe=new D,ze=2*Math.PI,oe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ya=1e-6;class I_ extends L_{constructor(t,e=null){super(t,e),this.state=oe.NONE,this.enabled=!0,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ns.ROTATE,MIDDLE:ns.DOLLY,RIGHT:ns.PAN},this.touches={ONE:Qi.ROTATE,TWO:Qi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new D,this._lastQuaternion=new pn,this._lastTargetPosition=new D,this._quat=new pn().setFromUnitVectors(t.up,new D(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Vc,this._sphericalDelta=new Vc,this._scale=1,this._panOffset=new D,this._rotateStart=new it,this._rotateEnd=new it,this._rotateDelta=new it,this._panStart=new it,this._panEnd=new it,this._panDelta=new it,this._dollyStart=new it,this._dollyEnd=new it,this._dollyDelta=new it,this._dollyDirection=new D,this._mouse=new it,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=N_.bind(this),this._onPointerDown=U_.bind(this),this._onPointerUp=F_.bind(this),this._onContextMenu=V_.bind(this),this._onMouseWheel=B_.bind(this),this._onKeyDown=z_.bind(this),this._onTouchStart=H_.bind(this),this._onTouchMove=G_.bind(this),this._onMouseDown=O_.bind(this),this._onMouseMove=k_.bind(this),this._interceptControlDown=W_.bind(this),this._interceptControlUp=X_.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Wc),this.update(),this.state=oe.NONE}update(t=null){const e=this.object.position;xe.copy(e).sub(this.target),xe.applyQuaternion(this._quat),this._spherical.setFromVector3(xe),this.autoRotate&&this.state===oe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=ze:n>Math.PI&&(n-=ze),s<-Math.PI?s+=ze:s>Math.PI&&(s-=ze),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(xe.setFromSpherical(this._spherical),xe.applyQuaternion(this._quatInverse),e.copy(this.target).add(xe),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=xe.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new D(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new D(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=xe.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Ur.origin.copy(this.object.position),Ur.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ur.direction))<D_?this.object.lookAt(this.target):(Xc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ur.intersectPlane(Xc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ya||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ya||this._lastTargetPosition.distanceToSquared(this.target)>Ya?(this.dispatchEvent(Wc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?ze/60*this.autoRotateSpeed*t:ze/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){xe.setFromMatrixColumn(e,0),xe.multiplyScalar(-t),this._panOffset.add(xe)}_panUp(t,e){this.screenSpacePanning===!0?xe.setFromMatrixColumn(e,1):(xe.setFromMatrixColumn(e,0),xe.crossVectors(this.object.up,xe)),xe.multiplyScalar(t),this._panOffset.add(xe)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;xe.copy(s).sub(this.target);let r=xe.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(ze*this._rotateDelta.x/e.clientHeight),this._rotateUp(ze*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(ze*this._rotateDelta.x/e.clientHeight),this._rotateUp(ze*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new it,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function U_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function N_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function F_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(tu),this.state=oe.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function O_(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case ns.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=oe.DOLLY;break;case ns.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=oe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=oe.ROTATE}break;case ns.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=oe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=oe.PAN}break;default:this.state=oe.NONE}this.state!==oe.NONE&&this.dispatchEvent(ml)}function k_(i){switch(this.state){case oe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case oe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case oe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function B_(i){this.enabled===!1||this.enableZoom===!1||this.state!==oe.NONE||(i.preventDefault(),this.dispatchEvent(ml),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(tu))}function z_(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function H_(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Qi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=oe.TOUCH_ROTATE;break;case Qi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=oe.TOUCH_PAN;break;default:this.state=oe.NONE}break;case 2:switch(this.touches.TWO){case Qi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=oe.TOUCH_DOLLY_PAN;break;case Qi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=oe.TOUCH_DOLLY_ROTATE;break;default:this.state=oe.NONE}break;default:this.state=oe.NONE}this.state!==oe.NONE&&this.dispatchEvent(ml)}function G_(i){switch(this._trackPointer(i),this.state){case oe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case oe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case oe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case oe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=oe.NONE}}function V_(i){this.enabled!==!1&&i.preventDefault()}function W_(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function X_(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class q_ extends Wh{constructor(){super();const t=new He;t.deleteAttribute("uv");const e=new Ie({side:ke}),n=new Ie,s=new A_(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Ht(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new Ht(t,n);a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),this.add(a);const o=new Ht(t,n);o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),this.add(o);const l=new Ht(t,n);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);const c=new Ht(t,n);c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),this.add(c);const h=new Ht(t,n);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);const u=new Ht(t,n);u.position.set(-2.193,-.369,-5.547),u.rotation.set(0,.516,0),u.scale.set(3.875,3.487,2.986),this.add(u);const f=new Ht(t,Yi(50));f.position.set(-16.116,14.37,8.208),f.scale.set(.1,2.428,2.739),this.add(f);const d=new Ht(t,Yi(50));d.position.set(-16.109,18.021,-8.207),d.scale.set(.1,2.425,2.751),this.add(d);const g=new Ht(t,Yi(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);const v=new Ht(t,Yi(43));v.position.set(-.462,8.89,14.52),v.scale.set(4.38,5.441,.088),this.add(v);const m=new Ht(t,Yi(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const p=new Ht(t,Yi(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function Yi(i){const t=new ca;return t.color.setScalar(i),t}const Cs=new D;function tn(i,t,e,n,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;Cs.copy(t),Cs[n]=0,Cs.normalize();const c=.5*a/(a+o),h=1-Cs.angleTo(i)/l;return Math.sign(Cs[e])===1?h*c:o/(a+o)+c+c*(1-h)}class $_ extends He{constructor(t=1,e=1,n=1,s=2,r=.1){if(s=s*2+1,r=Math.min(t/2,e/2,n/2,r),super(1,1,1,s,s,s),s===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const o=new D,l=new D,c=new D(t,e,n).divideScalar(2).subScalar(r),h=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,d=h.length/6,g=new D,v=.5/s;for(let m=0,p=0;m<h.length;m+=3,p+=2)switch(o.fromArray(h,m),l.copy(o),l.x-=Math.sign(l.x)*v,l.y-=Math.sign(l.y)*v,l.z-=Math.sign(l.z)*v,l.normalize(),h[m+0]=c.x*Math.sign(o.x)+l.x*r,h[m+1]=c.y*Math.sign(o.y)+l.y*r,h[m+2]=c.z*Math.sign(o.z)+l.z*r,u[m+0]=l.x,u[m+1]=l.y,u[m+2]=l.z,Math.floor(m/d)){case 0:g.set(1,0,0),f[p+0]=tn(g,l,"z","y",r,n),f[p+1]=1-tn(g,l,"y","z",r,e);break;case 1:g.set(-1,0,0),f[p+0]=1-tn(g,l,"z","y",r,n),f[p+1]=1-tn(g,l,"y","z",r,e);break;case 2:g.set(0,1,0),f[p+0]=1-tn(g,l,"x","z",r,t),f[p+1]=tn(g,l,"z","x",r,n);break;case 3:g.set(0,-1,0),f[p+0]=1-tn(g,l,"x","z",r,t),f[p+1]=1-tn(g,l,"z","x",r,n);break;case 4:g.set(0,0,1),f[p+0]=1-tn(g,l,"x","y",r,t),f[p+1]=1-tn(g,l,"y","x",r,e);break;case 5:g.set(0,0,-1),f[p+0]=tn(g,l,"x","y",r,t),f[p+1]=1-tn(g,l,"y","x",r,e);break}}}function na(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new Se;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(e){let h=0;const u=[];for(let f=0;f<i.length;++f){const d=i[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+h);h+=i[f].attributes.position.count}l.setIndex(u)}for(const h in r){const u=qc(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){const d=[];for(let v=0;v<a[h].length;++v)d.push(a[h][v][f]);const g=qc(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function qc(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new Ke(a,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let f=0,d=h.count;f<d;f++)for(let g=0;g<e;g++){const v=h.getComponent(f,g);o.setComponent(f+u,g,v)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}const Ae=2.05,Y_=.875,$c=1.15,Ye=1.27,Ns=-1.3,Qn=.315,xn=.375,Ji=.4,Fs=.7,Wo=(i,t,e)=>Math.min(e,Math.max(t,i)),Ps=(i,t,e)=>i+(t-i)*e;function eu(i){const t=i.length,e=[];for(let s=0;s<t-1;s++)e.push((i[s+1][1]-i[s][1])/(i[s+1][0]-i[s][0]));const n=[e[0]];for(let s=1;s<t-1;s++)n.push(e[s-1]*e[s]<=0?0:2*e[s-1]*e[s]/(e[s-1]+e[s]));return n.push(e[t-2]),s=>{if(s<=i[0][0])return i[0][1];if(s>=i[t-1][0])return i[t-1][1];let r=0;for(;s>i[r+1][0];)r++;const a=i[r+1][0]-i[r][0],o=(s-i[r][0])/a,l=o*o,c=l*o;return(2*c-3*l+1)*i[r][1]+(c-2*l+o)*a*n[r]+(-2*c+3*l)*i[r+1][1]+(c-l)*a*n[r+1]}}const j_=eu([[-2.05,.86],[-1.97,.93],[-1.88,.97],[-1.5,1.03],[-1.1,1.13],[-.6,1.2],[-.1,1.2],[.15,1.16],[.8,.93],[.9,.915],[1.4,.875],[1.9,.74],[2.05,.68]]),Z_=eu([[-2.05,.8],[-1.9,.9],[-1.6,.93],[-.5,.86],[.85,.83],[1.6,.76],[2.05,.64]]);function nu(i,t,e){const n=1-Math.abs(t),s=t<0?-1:1,r=Wo((Math.abs(i)-$c)/(Ae-$c),0,1),a=Y_*Math.pow(1-Math.pow(r,2.6),1/2.6),o=.15+.04*r*r,l=Z_(i),c=Math.max(j_(i),l+.02);let h=Wo((c-l-.06)/.22,0,1);h=h*h*(3-2*h);const u=a*.9854,f=Ps(a*.84,Math.min(a*.84,.66),h),d=Ps(l+(c-l)*.55,c-.05,h);let g,v;if(n<=Ji){const S=n/Ji;v=a*(.95+.05*Math.sin(S*Math.PI*.75)),g=Ps(o,l,S)}else if(n<=Fs){const S=(n-Ji)/(Fs-Ji);v=Ps(u,f,S),g=Ps(l,d,S)}else{const S=(n-Fs)/(1-Fs)*Math.PI*.5;v=f*Math.cos(S),g=d+(c-d)*Math.sin(S)}const m=g>.4?.2*(g-.4):.35*(.4-g);let p=i-Math.sign(i)*r*r*m,w=!1;if(n<=Ji+1e-6)for(const S of[Ye,Ns]){const x=p-S,I=g-Qn;if(I<0)Math.abs(x)<xn&&(p=S+(x<0?-xn:xn),w=!0);else if(x*x+I*I<xn*xn){const _=Math.hypot(x,I);_<1e-5?g=Qn+xn:(p=S+x/_*xn,g=Qn+I/_*xn),w=!0}}return e.set(p,g,s*v),w}const Nr=i=>Math.asin(Wo(i/Ae,-1,1))/(Math.PI/2),Yc=i=>Ae*Math.sin(i*Math.PI*.5);function jc(i,t,e,n){const s=Math.max(1,Math.ceil((t-i)/e)),r=[];for(let a=0;a<=s;a++)r.push(i+(t-i)*a/s);for(const a of n)a>i+1e-4&&a<t-1e-4&&r.push(a);return r.sort((a,o)=>a-o),r.filter((a,o)=>o===0||a-r[o-1]>1e-4)}function ye(i,t,e,n,s,r=[],a=.004){const o=a*.6,l=e<=0?0:e+o,c=n>=1?1:n-o,h=jc(Nr(i<=-Ae?-Ae:i+a),Nr(t>=Ae?Ae:t-a),.012,r.flatMap(_=>[Nr(_.x0),Nr(_.x1)]));let u,f;const d=[];for(const _ of r)d.push(1-_.v0,1-_.v1,-(1-_.v0),-(1-_.v1));s===0?(u=-(1-l),f=1-l):s>0?(u=1-c,f=1-l):(u=-(1-l),f=-(1-c)),d.push(1-Ji,1-Fs,-.6,-.30000000000000004);const g=jc(u,f,.016,d),v=h.length,m=g.length,p=new Float32Array(v*m*3),w=new Uint8Array(v*m),S=new D;for(let _=0;_<v;_++){const b=Yc(h[_]);for(let E=0;E<m;E++){const M=_*m+E;w[M]=nu(b,g[E],S)?1:0,p[M*3]=S.x,p[M*3+1]=S.y,p[M*3+2]=S.z}}const x=[];for(let _=0;_<v-1;_++){const b=Yc((h[_]+h[_+1])/2);for(let E=0;E<m-1;E++){const M=1-Math.abs((g[E]+g[E+1])/2);if(r.some(G=>b>G.x0&&b<G.x1&&M>G.v0&&M<G.v1))continue;const y=_*m+E,P=y+1,k=y+m,B=k+1;w[y]&&w[P]&&w[k]||x.push(y,P,k),w[P]&&w[B]&&w[k]||x.push(P,B,k)}}const I=new Se;return I.setAttribute("position",new Ke(p,3)),I.setIndex(x),I.computeVertexNormals(),I}const K_=.755;function iu(){const i=(l,c,h,u={})=>new Ie({color:l,roughness:c,metalness:h,...u}),t=en,e=document.createElement("canvas");e.width=64,e.height=64;const n=e.getContext("2d");n.fillStyle="#3a4046",n.fillRect(0,0,64,64),n.fillStyle="#9aa3ab";for(let l=0;l<64;l+=4)n.fillRect(l,0,1.5,64);n.fillStyle="#23272b";for(let l=0;l<64;l+=16)n.fillRect(0,l,64,2);const s=new ms(e);s.wrapS=s.wrapT=us,s.repeat.set(1,6),s.colorSpace=Ee;const r=document.createElement("canvas");r.width=r.height=256;const a=r.getContext("2d");a.fillStyle="#faf7ee",a.beginPath(),a.arc(128,128,128,0,Math.PI*2),a.fill(),a.fillStyle="#13203a",a.font="700 170px Oswald, Bahnschrift, Arial Narrow, sans-serif",a.textAlign="center",a.textBaseline="middle",a.fillText("27",128,140);const o=new ms(r);return o.colorSpace=Ee,o.anisotropy=4,{stripe:i(16633954,.45,.1,{side:t,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),number:i(16777215,.6,0,{map:o,transparent:!0,side:t,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),wheel:i(16171079,.35,.55),cage:i(15328470,.5,.3),hose:i(2381478,.6,.05),suede:i(1711136,1,0),screen:i(858670,.2,.2,{emissive:3126159,emissiveIntensity:.35}),paint:new w_({color:1981020,roughness:.38,metalness:.3,clearcoat:1,clearcoatRoughness:.1,side:t}),glass:i(2241084,.06,.3,{transparent:!0,opacity:.4,side:t,depthWrite:!1}),lens:i(14673644,.1,.8,{side:t,emissive:16774358,emissiveIntensity:0}),tail:i(11735839,.25,.2,{side:t,emissive:16718370,emissiveIntensity:.08}),trim:i(1842979,.7,.1,{side:t}),ecoat:i(9081497,.7,.25,{side:t}),rubber:i(1447962,.9,0),plastic:i(2106408,.65,.05),plasticGrey:i(3883336,.7,.05),steel:i(11120822,.4,.85),dark:i(2896182,.55,.6),iron:i(7041141,.6,.7),alu:i(12896718,.45,.8),chrome:i(15922422,.12,1),caliper:i(14165532,.45,.3),spring:i(15774499,.5,.35),exhaust:i(9407106,.5,.8),fabric:i(2830134,.95,0),fabric2:i(4870492,.95,0),tank:i(2369581,.8,0),battTop:i(1990568,.6,.05),red:i(13711914,.5,.1),white:i(15330543,.6,0),fins:i(16777215,.6,.5,{map:s}),fluid:i(15855320,.4,0,{transparent:!0,opacity:.8})}}const de=(i,t,e)=>new D(i,t,e),J_=de(0,1,0);function su(i){const t={},e=(_,b)=>{const E=new Ht(_,b);return E.castShadow=!0,E},n=(_,b,E,M)=>(_.position.set(b,E,M),_),s=(_,b,E,M,y=0,P=0,k=0,B=.012)=>n(e(new $_(_,b,E,2,Math.min(B,_/2.05,b/2.05,E/2.05)),M),y,P,k),r=(_,b,E,M,y=0,P=0,k=0,B=_,G=20)=>{const j=new ni(B,_,b,G);return M==="x"&&j.rotateZ(-Math.PI/2),M==="z"&&j.rotateX(Math.PI/2),n(e(j,E),y,P,k)},a=(_,b,E,M)=>r(_,b,E,"y",0,M+b/2,0),o=(_,b,E,M=!1)=>e(new ea(new Jr(_.map(y=>de(...y)),M),_.length*8,b,8,M),E),l=(_,b,E,M=28)=>{const y=new hl(_.map(([P,k])=>new it(P,k)),M);return E==="x"&&y.rotateZ(-Math.PI/2),E==="z"&&y.rotateX(Math.PI/2),e(y,b)},c=(_,b,E,M,y)=>{const P=[],k=E*14;for(let B=0;B<=k;B++){const G=B/k*E*Math.PI*2;P.push(de(Math.cos(G)*_,b*B/k,Math.sin(G)*_))}return e(new ea(new Jr(P),k*2,M,6),y)},h=(..._)=>{const b=new fn;return _.length&&b.add(..._),b},u=(_,b,E)=>{const M=b.clone().sub(_),y=E(M.length()),P=y.position.lengthSq()>0?h(y):y;return P.position.copy(_),P.quaternion.setFromUnitVectors(J_,M.normalize()),P},f=(_,b,E)=>{const M=new $s(_.map(([y,P])=>new it(y,P)));return e(new gs(M,{depth:b,bevelEnabled:!1}),E)},d=(_,b)=>e(_.length===1?_[0]:na(_),b),g=(_,b,E,M,y=[])=>[ye(_,b,E,M,1,y),ye(_,b,E,M,-1,y)],v=(_,b,E)=>{const M=de(0,0,0);return nu(_,E*(1-b),M),M},m=(_,...b)=>{t[_]=b.map(([E,M=1,y=1])=>(E.userData.sz=M,E.userData.sx=y,E))},p=[1,-1];{const _=h();_.add(d([...g(-.55,.72,0,.045),...g(-.55,.15,.675,.72),...g(.15,.72,.675,.74),...g(.72,.86,.55,.74)],i.paint));const b=f([[.84,-.8],[.84,.8],[-1.06,.8],[-1.06,-.8]],.025,i.ecoat);b.geometry.rotateX(Math.PI/2),_.add(n(b,0,.215,0));const E=f([[-1.04,-.56],[-1.04,.56],[-1.7,.56],[-1.7,.66],[-1.93,.5],[-1.93,-.5],[-1.7,-.66],[-1.7,-.56]],.025,i.ecoat);E.geometry.rotateX(Math.PI/2),_.add(n(E,0,.355,0));const M=new ni(.1,.1,1.42,14,1,!0,0,Math.PI);M.rotateZ(Math.PI/2),_.add(n(e(M,i.ecoat),.13,.21,0)),_.add(s(.58,.19,1.1,i.ecoat,-.76,.31,0,.02)),_.add(s(.02,.6,1.56,i.ecoat,.85,.52,0,.005));for(const y of p){_.add(s(1.02,.08,.07,i.ecoat,1.36,.62,y*.52)),_.add(r(.085,.28,i.ecoat,"y",1.24,.7,y*.58)),_.add(s(.04,.34,.04,i.ecoat,1.87,.5,y*.5)),_.add(r(.08,.17,i.ecoat,"y",-1.22,.44,y*.47)),_.add(s(.07,.64,.04,i.ecoat,-.55,.54,y*.79)),_.add(u(de(-.55,.86,y*.79),de(-.55,1.1,y*.67),P=>s(.07,P,.035,i.ecoat,0,P/2,0)));for(const P of[Ye,Ns]){const k=new ni(xn-.004,xn-.004,.3,22,1,!0,Math.PI/2,Math.PI);k.rotateX(Math.PI/2),_.add(n(e(k,i.trim),P,Qn,y*.71))}}_.add(s(.05,.05,1.1,i.ecoat,1.88,.33,0)),_.add(s(.05,.04,1,i.ecoat,1.86,.67,0)),_.add(s(.03,.26,.7,i.ecoat,-1.9,.5,0)),m("shell",[_])}m("roof",[h(d([ye(-1,.15,.72,1,0)],i.paint),d([ye(-1,.15,.95,1,0,[],0)],i.stripe))]),m("quarter",...p.map(_=>{const b={x0:-1,x1:-.62,v0:.45,v1:.62};return[h(d([ye(-1.72,-.55,0,.72,_,[b]),ye(-1.99,-1.72,.42,.72,_),ye(-1.99,-1.72,.24,.33,_)],i.paint),d([ye(b.x0,b.x1,b.v0,b.v1,_,[],0)],i.glass)),_]})),m("subframe",[h(o([[1.02,.22,-.44],[1.56,.22,-.4],[1.56,.22,.4],[1.02,.22,.44]],.03,i.dark,!0),s(.06,.04,.84,i.dark,1.3,.22,0),s(.1,.05,.1,i.rubber,1.45,.26,.3),s(.1,.05,.1,i.rubber,1.45,.26,-.3))]);{const _=h(s(.34,.28,.46,i.iron,1.38,.51,.12,.02),s(.3,.11,.46,i.alu,1.38,.705,.12,.015),s(.24,.055,.44,i.red,1.38,.785,.12,.02),s(.2,.12,.4,i.dark,1.42,.31,.12,.03),s(.3,.44,.03,i.plastic,1.38,.58,.365,.01),r(.07,.03,i.dark,"z",1.38,.42,.395),r(.045,.025,i.dark,"z",1.44,.66,.39),r(.04,.15,i.dark,"z",1.2,.45,-.03),r(.022,.016,i.spring,"y",1.45,.818,-.05),r(.03,.09,i.battTop,"x",1.58,.42,.2));for(let b=0;b<4;b++)_.add(r(.02,.025,i.dark,"y",1.37,.822,-.045+b*.11));m("engine",[_])}{const _=h(s(.24,.13,.2,i.plastic,1.5,.7,.52,.025),o([[1.62,.7,.52],[1.72,.68,.52],[1.8,.64,.48]],.028,i.plastic),o([[1.5,.7,.42],[1.6,.69,.4],[1.66,.665,.34]],.028,i.rubber),r(.045,.42,i.alu,"z",1.66,.66,.12),r(.034,.05,i.alu,"z",1.66,.66,.35));for(let b=0;b<4;b++){const E=-.045+b*.11;_.add(o([[1.67,.69,E],[1.64,.765,E],[1.58,.77,E],[1.535,.73,E]],.02,i.alu))}m("intake",[_])}{const _=l([[0,-.1],[.17,-.1],[.17,-.13],[.13,-.22],[.12,-.3],[.12,-.5],[.09,-.56],[0,-.56]],i.alu,"z"),b=e(new as(.1,18,12),i.alu);b.scale.set(1,1,.8),m("gearbox",[h(n(_,1.38,.42,0),n(b,Ye,.335,-.28),s(.08,.06,.12,i.dark,1.36,.56,-.38))])}{const _=(b,E)=>{const M=Math.abs(E-b),y=(b+E)/2,P=Math.sign(E-b);return h(r(.014,M,i.steel,"z",Ye,.325,y),r(.045,.08,i.rubber,"z",Ye,.325,b+P*.04,P>0?.02:.045,14),r(P>0?.045:.02,.08,i.rubber,"z",Ye,.325,E-P*.04,P>0?.02:.045,14),r(.02,.05,i.steel,"z",Ye,.325,E+P*.02))};m("driveshaft",[_(-.18,.66),1],[_(-.38,-.66),-1])}m("arm",...p.map(_=>{const b=f([[1.12,.42],[1.42,.42],[1.3,.7],[1.24,.7]],.025,i.dark);return b.geometry.rotateX(Math.PI/2),b.scale.z=_,[h(n(b,0,.225,0),r(.022,.05,i.steel,"y",Ye,.225,_*.69)),_]})),m("strut",...p.map(_=>[h(u(de(Ye,.37,_*.655),de(1.24,.85,_*.58),b=>h(a(.03,b*.56,i.dark,0),a(.011,b*.48,i.chrome,b*.52),n(c(.062,b*.5,6,.0085,i.spring),0,b*.43,0),a(.075,.012,i.dark,b*.42),a(.075,.025,i.dark,b*.93))),r(.055,.07,i.iron,"z",Ye,Qn,_*.665),s(.05,.13,.04,i.iron,Ye,.36,_*.655)),_])),m("arb",[o([[1.2,.3,-.6],[1.02,.26,-.56],[.94,.25,-.42],[.94,.25,.42],[1.02,.26,.56],[1.2,.3,.6]],.012,i.red)]);{const _=h(r(.026,.6,i.alu,"z",1.04,.3,0),r(.03,.1,i.dark,"y",1.04,.34,-.25),r(.04,.12,i.dark,"z",1.04,.3,.12));for(const b of p){const E=r(.026,.1,i.rubber,"z",1.04,.3,b*.35,.014,14);b<0&&(E.rotation.y=Math.PI),_.add(E),_.add(u(de(1.04,.3,b*.38),de(1.16,.33,b*.66),M=>a(.009,M,i.steel,0)))}m("rack",[_])}{const _=h(r(.04,1.16,i.dark,"z",-1.12,.27,0));for(const b of p)_.add(o([[-.8,.3,b*.6],[-.98,.28,b*.585],[-1.12,.27,b*.58],[-1.3,Qn,b*.61]],.035,i.dark)),_.add(r(.05,.05,i.rubber,"z",-.8,.3,b*.6)),_.add(r(.07,.04,i.iron,"z",Ns,Qn,b*.655)),_.add(r(.075,.012,i.dark,"y",-1.22,.275,b*.47));m("rearaxle",[_])}m("rearspring",...p.map(_=>[n(c(.058,.22,5,.008,i.spring),-1.22,.285,_*.47),_])),m("reardamper",...p.map(_=>[u(de(-1.36,.27,_*.6),de(-1.42,.72,_*.6),b=>h(a(.026,b*.58,i.dark,0),a(.01,b*.45,i.chrome,b*.55),a(.03,.03,i.rubber,b-.03))),_])),m("servo",[h(n(l([[0,0],[.09,0],[.115,.02],[.115,.06],[.09,.085],[0,.085]],i.dark,"x"),.865,.74,-.37),r(.024,.13,i.alu,"x",1.01,.74,-.37),s(.1,.05,.06,i.fluid,1.01,.785,-.37,.015),r(.02,.015,i.spring,"y",1.01,.815,-.37))]);const w=[[Ye,1],[Ye,-1],[Ns,1],[Ns,-1]],S=(_,b)=>w.map(([E,M])=>{const y=n(_(),E,Qn,M*K_);return y.rotation.order="YXZ",M<0&&(y.rotation.y=Math.PI),y.userData.hub={front:E>0,left:M<0,spin:b},[y,M,E>0?1:-1]});m("disc",...S(()=>{const _=h(l([[.04,-.035],[.085,-.035],[.085,-.075],[.172,-.075],[.172,-.099],[.04,-.099],[.04,-.035]],i.steel,"z",36));for(let b=0;b<12;b++){const E=b/12*Math.PI*2;_.add(r(.008,.027,i.dark,"z",Math.cos(E)*.13,Math.sin(E)*.13,-.087,.008,8))}return _},!0)),m("caliper",...S(()=>{const _=new $s,b=Math.PI*.27,E=Math.PI*.73;_.absarc(0,0,.192,b,E,!1),_.absarc(0,0,.11,E,b,!0);const M=new gs(_,{depth:.08,bevelEnabled:!1,curveSegments:12});return M.translate(0,0,-.127),h(e(M,i.caliper))},!1)),m("wheel",...S(()=>{const _=h(l([[.236,-.092],[.224,-.084],[.216,-.02],[.216,.05],[.224,.084],[.236,.092],[.228,.092],[.21,.062],[.208,-.02],[.216,-.084],[.236,-.092]],i.wheel,"z",40),r(.062,.03,i.wheel,"z",0,0,.055),r(.034,.03,i.red,"z",0,0,.08,.034,6));for(let b=0;b<10;b++){const E=f([[.045,-.014],[.217,-.009],[.217,.009],[.045,.014]],.02,i.wheel);E.position.z=.042,E.rotation.z=b/10*Math.PI*2,_.add(E)}return _},!0)),m("tyre",...S(()=>h(l([[.23,-.09],[.24,-.103],[.27,-.11],[.297,-.106],[.311,-.094],[.315,-.078],[.315,.078],[.311,.094],[.297,.106],[.27,.11],[.24,.103],[.23,.09]],i.rubber,"z",44)),!0)),m("tank",[h(s(.45,.2,.7,i.tank,-.775,.27,-.15,.03),s(.47,.03,.72,i.alu,-.775,.17,-.15,.01),o([[-.9,.36,.12],[-1.05,.46,.42],[-1.2,.66,.68],[-1.26,.76,.8]],.024,i.alu),r(.05,.02,i.red,"y",-.72,.375,-.15))]);{const _=h(o([[1.1,.5,.1],[1.07,.43,.06],[.98,.38,0],[.9,.28,0],[.84,.245,0]],.028,i.exhaust),n(l([[0,-.15],[.03,-.15],[.06,-.1],[.06,.1],[.03,.15],[0,.15]],i.exhaust,"x",18),.69,.245,0),r(.065,.06,i.iron,"z",1.1,.52,.1),r(.07,.05,i.alu,"z",1.1,.52,.17),r(.03,.05,i.alu,"z",1.1,.52,.215),o([[1.1,.59,.17],[1.14,.66,.3],[1.3,.7,.4],[1.44,.7,.42]],.022,i.alu));for(let b=0;b<4;b++){const E=-.045+b*.11;_.add(o([[1.225,.7,E],[1.16,.69,E],[1.12,.62,E*.6+.04],[1.1,.56,.1]],.017,i.exhaust))}m("manifold",[_])}{const _=(E,M)=>l([[0,-E/2],[M*.5,-E/2],[M,-E/2+M*.6],[M,E/2-M*.6],[M*.5,E/2],[0,E/2]],i.exhaust,"x",18),b=_(.38,.085);b.scale.y=.72,m("exhaust",[h(o([[.54,.245,0],[.1,.245,0],[-.3,.245,0],[-.42,.24,.18],[-.56,.235,.33],[-1,.235,.33],[-1.3,.25,.33],[-1.46,.265,.31]],.03,i.exhaust),n(_(.36,.055),-.05,.245,0),n(b,-1.64,.265,.3),r(.042,.24,i.chrome,"x",-1.93,.27,.3),r(.036,.242,i.dark,"x",-1.93,.27,.3))])}{const _=h(r(.15,.012,i.dark,"x",1.765,.5,0,.15,28),r(.04,.03,i.plasticGrey,"x",1.755,.5,0));m("radiator",[h(s(.035,.36,.62,i.fins,1.8,.5,0,.004),s(.05,.38,.04,i.alu,1.8,.5,.33),s(.05,.38,.04,i.alu,1.8,.5,-.33),s(.02,.34,.5,i.plastic,1.775,.5,0,.006),_,o([[1.79,.66,.3],[1.7,.7,.34],[1.56,.7,.34]],.018,i.hose),o([[1.79,.36,-.3],[1.7,.36,-.16],[1.56,.42,-.08]],.018,i.hose),r(.025,.02,i.spring,"y",1.8,.7,.33))])}m("battery",[h(s(.22,.13,.15,i.plastic,1.5,.73,-.5,.012),s(.22,.022,.15,i.battTop,1.5,.805,-.5,.01),r(.012,.018,i.steel,"y",1.57,.823,-.46),r(.014,.02,i.red,"y",1.43,.824,-.46))]),m("alternator",[h(r(.065,.1,i.alu,"z",1.6,.52,.26),r(.035,.03,i.dark,"z",1.6,.52,.325),r(.04,.02,i.plastic,"z",1.6,.52,.2))]),m("ecu",[h(s(.035,.13,.19,i.alu,.885,.73,.4,.008),s(.03,.035,.15,i.plastic,.9,.645,.4,.006))]);{const _=f([[.84,.56],[.84,.9],[.56,.91],[.47,.86],[.455,.74],[.52,.62],[.6,.56]],1.4,i.plastic);_.geometry.translate(0,0,-.7),m("dash",[h(_,s(.14,.05,.3,i.plastic,.56,.915,-.37,.02),s(.01,.075,.22,i.screen,.487,.875,-.37,.004),s(.015,.1,.2,i.alu,.462,.8,0,.004),r(.012,.012,i.red,"x",.45,.83,.06),r(.012,.012,i.spring,"x",.45,.83,0),r(.012,.012,i.battTop,"x",.45,.83,-.06))])}const x=de(.37,.84,-.37),I=de(.82,.66,-.37);m("column",[h(u(I,x,_=>h(a(.02,_,i.dark,0),s(.08,.14,.09,i.plastic,0,_-.11,0,.02))),u(de(1.04,.36,-.25),I,_=>a(.011,_,i.steel,0)),n(e(new as(.022,10,8),i.steel),.82,.66,-.37))]);{const _=h(e(new ta(.16,.017,10,30,Math.PI*1.5),i.suede),r(.045,.07,i.alu,"z",0,0,-.035));_.children[0].rotation.z=-Math.PI*.25,_.add(s(.235,.03,.03,i.suede,0,-.114,0,.012)),_.add(s(.2,.09,.014,i.plastic,0,0,0,.02));for(const[E,M]of[[-.11,i.plastic],[.11,i.plastic]])_.add(s(.1,.035,.014,M,E,.02,0,.01));_.add(r(.012,.01,i.red,"z",-.06,.02,.01),r(.012,.01,i.spring,"z",.06,.02,.01));const b=x.clone().sub(I).normalize();_.quaternion.setFromUnitVectors(de(0,0,1),b),_.position.copy(x).addScaledVector(b,.04),m("swheel",[_])}{const _=h(s(.03,.05,.34,i.dark,.82,.54,-.37));for(const[b,E]of[[-.49,.05],[-.38,.06],[-.26,.045]]){const M=u(de(.81,.54,b),de(.7,.34,b),y=>h(a(.008,y,i.steel,0),s(.07,.012,E,i.alu,0,y,0,.004)));M.children[1].rotation.z=.5,_.add(M)}m("pedals",[_])}{const _=u(de(-.05,.4,.05),de(-.12,.66,.05),b=>h(a(.012,b,i.alu,0),a(.018,.09,i.red,b-.09)));m("console",[h(s(.62,.14,.17,i.plastic,.14,.33,0,.02),u(de(.2,.4,0),de(.15,.7,0),b=>h(a(.011,b,i.alu,0),n(e(new as(.03,14,10),i.spring),0,b,0))),s(.12,.04,.09,i.alu,.2,.41,0,.01),_)])}{const _=s(.48,.09,.42,i.fabric,0,.33,0,.04);_.rotation.z=.14;const b=s(.09,.72,.42,i.fabric,-.29,.69,0,.04);b.rotation.z=.24;const E=h(_,b);for(const y of p){const P=s(.46,.15,.05,i.fabric,0,.38,y*.225,.025);P.rotation.z=.14;const k=s(.14,.34,.05,i.fabric,-.22,.6,y*.225,.025);k.rotation.z=.24;const B=s(.16,.17,.045,i.fabric,-.3,.98,y*.17,.02);B.rotation.z=.24;const G=s(.012,.5,.05,i.red,-.228,.72,y*.08,.004);G.rotation.z=.24,E.add(P,k,B,G,s(.5,.03,.035,i.alu,0,.245,y*.19))}const M=s(.05,.012,.4,i.red,-.1,.39,0,.004);E.add(M,r(.03,.02,i.alu,"x",-.19,.5,0),s(.4,.06,.36,i.dark,0,.275,0,.01)),m("seatf",[n(E,-.12,0,-.37)])}{const _=(E,M,y=.02)=>u(de(...E),de(...M),P=>a(y,P,i.cage,0)),b=h(o([[-.5,.23,-.63],[-.5,.86,-.61],[-.5,1,-.52],[-.5,1.08,-.38],[-.5,1.08,.38],[-.5,1,.52],[-.5,.86,.61],[-.5,.23,.63]],.021,i.cage),_([-.5,.25,-.6],[-.5,1.06,.36]),_([-.5,.7,-.6],[-.5,.7,.6]),_([.02,1.07,-.42],[.02,1.07,.42]));for(const E of p)b.add(o([[-.5,1.08,E*.4],[-.2,1.085,E*.42],[.04,1.07,E*.44],[.42,.93,E*.56],[.62,.74,E*.64],[.72,.24,E*.66]],.021,i.cage)),b.add(_([-.5,1.06,E*.4],[-1.2,.56,E*.45])),b.add(_([.7,.3,E*.665],[-.5,.6,E*.625])),b.add(_([.68,.6,E*.665],[-.5,.3,E*.625]));m("cage",[b])}m("extinguisher",[h(r(.06,.34,i.red,"x",.12,.3,.38),r(.025,.05,i.alu,"x",.31,.3,.38),s(.03,.02,.15,i.alu,.02,.24,.38),s(.03,.02,.15,i.alu,.2,.24,.38),o([[.33,.3,.38],[.5,.36,.3],[.7,.5,.2]],.008,i.alu))]),m("fender",...p.map(_=>[d([ye(.72,1.62,0,.55,_)],i.paint),_])),m("doorf",...p.map(_=>{const b={x0:-.48,x1:.58,v0:.428,v1:.645},E=v(-.42,.36,_),M=v(.08,.21,_),y=e(new qs(.19,36),i.number);return y.position.set(M.x,M.y,M.z+_*.012),_<0&&(y.rotation.y=Math.PI),y.castShadow=!1,[h(d([ye(-.55,.72,.045,.675,_,[b])],i.paint),d([ye(b.x0,b.x1,b.v0,b.v1,_,[],0)],i.glass),s(.1,.025,.025,i.trim,E.x,E.y,E.z+_*.008,.01),y),_]})),m("hood",[h(d([ye(.86,Ae,.55,1,0),...g(1.985,Ae,.4,.55)],i.paint),d([ye(.87,Ae,.95,1,0,[],0)],i.stripe),s(.22,.012,.16,i.trim,1.25,v(1.25,.86,1).y+.004,.36,.004),s(.22,.012,.16,i.trim,1.25,v(1.25,.86,1).y+.004,-.36,.004))]);{const _={x0:-1.75,x1:-1.08,v0:.77,v1:1};m("tailgate",[h(d([ye(-Ae,-1,.72,1,0,[_]),...g(-Ae,-1.99,.24,.72)],i.paint),d([ye(_.x0,_.x1,_.v0,1,0,[],0)],i.glass),d([ye(-2,-1.77,.95,1,0,[],0)],i.stripe))])}{const _=e(new ta(.035,.009,8,18),i.red);_.rotation.y=Math.PI/2;const b=v(2.03,.2,1);m("bumperf",[h(d(g(1.62,Ae,.1,.26),i.paint),d(g(1.62,Ae,0,.1),i.trim),n(_,b.x+.03,b.y,.3))])}m("bumperr",[h(d(g(-Ae,-1.72,.08,.24),i.paint),d(g(-Ae,-1.72,0,.08),i.trim))]),m("grille",[d(g(1.985,Ae,.26,.4,[]),i.trim)]),m("mirror",...p.map(_=>[h(s(.08,.075,.15,i.trim,.6,.955,_*.985,.03),s(.008,.06,.125,i.chrome,.558,.955,_*.985,.003),s(.03,.02,.12,i.trim,.6,.93,_*.9,.008)),_]));{const _=f([[0,0],[-.07,.034],[-.19,.042],[-.34,.014],[-.34,.002],[-.2,-.012],[-.06,-.016]],1.56,i.trim);_.geometry.translate(0,0,-.78),_.rotation.z=-.16;const b=h(n(_,-1.74,1.2,0));for(const E of p)b.add(s(.42,.2,.012,i.paint,-1.9,1.2,E*.786,.004)),b.add(s(.15,.26,.014,i.alu,-1.9,1.075,E*.42,.004));m("wing",[b])}{const _=f([[1.6,-.91],[1.95,-.84],[2.13,-.52],[2.17,0],[2.13,.52],[1.95,.84],[1.6,.91]],.018,i.trim);_.geometry.rotateX(Math.PI/2);const b=h(n(_,0,.14,0));for(const E of p){b.add(u(de(2.1,.14,E*.3),de(2.02,.3,E*.3),y=>a(.006,y,i.alu,0)));const M=s(.2,.01,.14,i.trim,1.82,.36,E*.86,.003);M.rotation.set(E*.25,E*-.45,-.3),b.add(M)}m("splitter",[b])}{const _=h(),b=s(.56,.012,1.3,i.trim,-1.8,.185,0,.004);b.rotation.z=-.15,_.add(b);for(const E of[-.6,-.36,-.12,.12,.36,.6]){const M=s(.52,.09,.012,i.trim,-1.8,.145,E,.004);M.rotation.z=-.15,_.add(M)}m("diffuser",[_])}return m("windscreen",[d([ye(.17,.86,.74,1,0,[],.006)],i.glass)]),m("headlight",...p.map(_=>[d([ye(1.62,1.985,.26,.55,_)],i.lens),_])),m("taillight",...p.map(_=>[d([ye(-1.99,-1.72,.33,.42,_)],i.tail),_])),t}const ru={body:"Body structure",panels:"Body panels",glass:"Glass & lighting",powertrain:"Powertrain",chassis:"Suspension & steering",brakes:"Brakes & wheels",fuel:"Fuel & exhaust",electrical:"Cooling & electrics",interior:"Interior"},Xo=["body","powertrain","chassis","brakes","fuel","electrical","interior","panels","glass"],ii=[{id:"shell",name:"Body shell",cat:"body",step:2,qty:1,desc:"The welded steel unibody: floor pan, firewall, sills, pillars and front rails in one piece. For racing it is stripped to bare metal and every seam is welded along its whole length, not just spot-welded, which makes the shell far stiffer.",specs:[["Construction","seam-welded steel monocoque"],["Mass (bare)","≈ 240 kg"],["Wheelbase","2 570 mm"],["Corrosion protection","galvanised, e-coated"]],ex:[0,0,0]},{id:"roof",name:"Roof panel",cat:"body",step:2,qty:1,desc:"A single pressed steel sheet laser-brazed to the roof rails. It closes the top of the body like the lid of a box, which is where much of the shell’s twisting stiffness comes from.",specs:[["Material","0.7 mm steel"],["Joint","laser-brazed to the rails"],["Mass","≈ 11 kg"]],ex:[0,1.75,0]},{id:"quarter",name:"Rear quarter panel",cat:"body",step:2,qty:2,lay:!0,desc:"The body side behind the door, flared out over the wide rear tyre, with a small fixed quarter window. Unlike a front wing it is welded on, so replacing one is a body-shop job.",specs:[["Fixing","welded to the shell"],["Includes","polycarbonate quarter window"],["Material","0.75 mm steel, flared arch"]],ex:[-.25,.25,.85]},{id:"subframe",name:"Front subframe",cat:"chassis",step:3,qty:1,desc:"A steel cradle bolted under the front of the shell. The engine mounts, steering rack and lower suspension arms all fix to it, so the whole front end can be built up as one unit and lifted into the car.",specs:[["Material","hydroformed steel tube"],["Fixing","4 bolts, rubber-bushed"],["Carries","engine mounts, rack, lower arms"]],ex:[.1,-.62,0]},{id:"engine",name:"Engine, 2.0 L turbo four",cat:"powertrain",step:3,qty:1,desc:"Four cylinders in a row, mounted sideways across the car. Fuel and air burn inside each cylinder and push a piston down; the crankshaft turns those pushes into rotation. A turbocharger forces in about twice the air the engine could breathe on its own, so it makes twice the power.",specs:[["Displacement","1 998 cc"],["Layout","transverse inline-4, DOHC 16 valve, turbo"],["Power","250 kW (340 hp) at 6 800 rpm"],["Torque","420 N·m at 3 500 rpm"],["Rev limit","7 200 rpm"],["Oil system","baffled sump"]],ex:[.3,1.05,.2]},{id:"intake",name:"Air box & intake manifold",cat:"powertrain",step:3,qty:1,desc:"Air is drawn through a paper filter in the air box, past the throttle, and shared out to the four cylinders by the manifold’s runners. The throttle is the valve your right foot controls: more air, more fuel, more power.",specs:[["Filter","oiled cotton race filter"],["Throttle","electronic, 60 mm"],["Manifold","cast aluminium, 4 runners"],["Boost","up to 1.5 bar"]],ex:[.75,1.45,.3]},{id:"gearbox",name:"Sequential gearbox & differential",cat:"powertrain",step:3,qty:1,desc:"A six-speed racing gearbox bolted to the end of the engine. The gears are selected one after another, like on a motorbike, so a shift takes a few hundredths of a second. The limited-slip differential in the same casing stops the inside front wheel spinning away the power in a corner.",specs:[["Type","6-speed sequential, paddle shift"],["Ratios","2.92 · 2.05 · 1.56 · 1.24 · 1.03 · 0.88"],["Final drive","4.06 : 1"],["Differential","plate-type limited slip"],["Shift time","≈ 40 ms"]],ex:[.3,1.05,-.45]},{id:"driveshaft",name:"Driveshaft",cat:"powertrain",step:4,qty:2,desc:"Carries the drive from the differential to a front wheel. A constant-velocity joint at each end lets the shaft keep turning smoothly while the wheel steers and rides over bumps; the rubber boots keep grease in and grit out.",specs:[["Joints","tripod inner, Rzeppa outer"],["Lengths","unequal: left short, right long"],["Boots","thermoplastic"]],ex:[0,-.34,.2]},{id:"arm",name:"Lower control arm",cat:"chassis",step:4,qty:2,desc:"A triangular arm that locates the bottom of the front wheel. Two rubber bushes pivot it on the subframe and a ball joint at the tip lets the wheel steer and move up and down.",specs:[["Type","fabricated steel wishbone"],["Pivots","2 spherical bearings"],["Outer joint","adjustable ball joint (camber)"]],ex:[.05,-.42,.28]},{id:"strut",name:"Front strut",cat:"chassis",step:4,qty:2,desc:"A MacPherson strut: a coil spring that carries the car’s weight wrapped round a damper that stops it bouncing. The whole strut turns with the wheel when you steer, on a bearing in its top mount.",specs:[["Type","MacPherson strut, coil-over"],["Spring rate","≈ 110 N/mm"],["Damper","adjustable, bump and rebound"],["Ride height","adjustable, 80 mm minimum"]],ex:[.05,.75,.62]},{id:"arb",name:"Anti-roll bar",cat:"chassis",step:4,qty:1,desc:"A U-shaped spring-steel bar that links the left and right front suspension. When the car leans in a corner the bar twists and resists, keeping the body flatter without making the ride harsher over bumps taken by both wheels together.",specs:[["Diameter","28 mm, adjustable blades"],["Material","spring steel"],["Links","drop links to the struts"]],ex:[-.25,-.8,0]},{id:"rack",name:"Steering rack",cat:"chassis",step:4,qty:1,desc:"A pinion gear on the end of the steering column moves a toothed bar, the rack, from side to side. Tie rods on each end push and pull the front wheels. An electric motor adds assistance.",specs:[["Type","rack and pinion, electric assist"],["Turns lock to lock","1.9"],["Turning circle","11.4 m"]],ex:[-.45,-.3,0]},{id:"rearaxle",name:"Rear twist-beam axle",cat:"chassis",step:4,qty:1,desc:"Two trailing arms joined by a cross beam that is allowed to twist. It is cheap, compact and leaves room for the boot floor, and the twisting beam works as its own anti-roll bar.",specs:[["Type","torsion (twist) beam"],["Mounts","2 rubber bushes"],["Mass","≈ 19 kg"]],ex:[-.1,-.6,0]},{id:"rearspring",name:"Rear coil spring",cat:"chassis",step:4,qty:2,desc:"Sits between the axle and the body and carries the weight of the back of the car. At the rear the spring and the damper are mounted separately to keep the boot floor low and wide.",specs:[["Rate","≈ 90 N/mm"],["Wire","13 mm chrome-silicon steel"],["Seats","threaded, height-adjustable"]],ex:[0,-.3,0]},{id:"reardamper",name:"Rear damper",cat:"chassis",step:4,qty:2,desc:"A piston pushing oil through small valves. It turns the energy of a bouncing spring into heat, so the wheel settles after one movement instead of bobbing up and down.",specs:[["Type","monotube, adjustable"],["Stroke","≈ 120 mm"],["Top mount","spherical bearing"]],ex:[-.3,-.22,.42]},{id:"servo",name:"Brake servo & master cylinder",cat:"brakes",step:5,qty:1,desc:"The pedal pushes the master cylinder, which pressurises brake fluid in two separate circuits. The big round servo in front of it uses engine vacuum to multiply your foot’s force about five times.",specs:[["Servo","10-inch vacuum booster"],["Circuits","2, diagonally split"],["Fluid","DOT 4"]],ex:[.15,1.3,-.15]},{id:"disc",name:"Brake disc",cat:"brakes",step:5,qty:4,lay:!0,desc:"A cast-iron disc that turns with the wheel. Squeezing it between two pads turns the car’s speed into heat: in a hard stop the front discs glow orange at over 700 °C. Air passages between the two faces and holes through them carry the heat away.",specs:[["Front","378 × 34 mm, vented"],["Rear","290 × 20 mm, vented"],["Material","grey cast iron, floating bell"],["Working temperature","300–750 °C"]],ex:[0,0,.42]},{id:"caliper",name:"Brake caliper",cat:"brakes",step:5,qty:4,desc:"A stiff aluminium clamp bolted over the disc. Pistons on both sides push the pads in together, so the caliper itself never has to slide, and the pedal stays firm lap after lap.",specs:[["Type","fixed, radial-mount"],["Pistons","6 front, 2 rear"],["Pads","sintered race compound"],["Fluid","racing, boils above 310 °C"]],ex:[0,.34,.3]},{id:"wheel",name:"Race wheel, 18 in",cat:"brakes",step:5,qty:4,lay:!0,desc:"A forged aluminium wheel held on by one big centre nut, so that a wheel can be changed in a pit stop in a couple of seconds with an air gun. Thin spokes leave room for air to reach the brake.",specs:[["Size","10J × 18"],["Fixing","single centre-lock nut"],["Nut torque","600 N·m"],["Mass","≈ 9 kg"]],ex:[0,0,.9]},{id:"tyre",name:"Slick tyre",cat:"brakes",step:5,qty:4,lay:!0,desc:"A racing tyre with no tread at all. Grooves are only there to clear water, so on a dry track a smooth tyre puts the most rubber on the road. The soft compound only grips properly once it is hot, which is why drivers weave on the warm-up lap.",specs:[["Size","250/660 R18"],["Compound","medium slick"],["Hot pressure","1.9 bar"],["Working temperature","80–100 °C"]],ex:[0,0,1.4]},{id:"tank",name:"Fuel cell",cat:"fuel",step:6,qty:1,desc:"A racing fuel tank: a flexible rubber bladder inside an aluminium box, filled with foam so the fuel cannot slosh or spray out if the box is crushed. It sits low, ahead of the rear axle, where it is best protected.",specs:[["Capacity","100 L"],["Construction","Kevlar-rubber bladder, foam-filled"],["Pumps","2 in-tank lift pumps"],["Filler","dry-break quick coupling"]],ex:[0,-.62,0]},{id:"manifold",name:"Turbo, manifold & catalyst",cat:"fuel",step:6,qty:1,desc:"Four pipes collect the hot exhaust gas and aim it at the turbine wheel of the turbocharger. The turbine spins at up to 150 000 rpm and drives a compressor on the same shaft, which packs extra air into the engine. A racing catalyst then cleans the gas.",specs:[["Manifold","4-into-1, stainless"],["Turbocharger","twin-scroll, ball bearing"],["Turbine speed","up to 150 000 rpm"],["Catalyst","200-cell race type"]],ex:[-.2,-.55,0]},{id:"exhaust",name:"Exhaust pipe & silencer",cat:"fuel",step:6,qty:1,desc:"A wide, nearly straight pipe to the back of the car, so the gas can leave with as little back-pressure as possible. One small silencer keeps it just inside the noise limit most circuits set.",specs:[["Pipe","76 mm stainless steel"],["Silencer","single straight-through box"],["Noise","≈ 98 dB(A) at the limit"]],ex:[-.15,-.85,0]},{id:"radiator",name:"Radiator & fan",cat:"electrical",step:7,qty:1,desc:"Hot coolant from the engine flows through thin aluminium tubes while air passes over the fins between them. An electric fan pulls air through when the car is moving too slowly to do it on its own.",specs:[["Core","aluminium race core, 620 × 360 mm"],["Coolant","7 L, water with wetting agent"],["Thermostat opens","82 °C"],["Fan","electric, for the pit lane"]],ex:[.85,.3,0]},{id:"battery",name:"Battery, 12 V",cat:"electrical",step:7,qty:1,desc:"A small lithium racing battery, a quarter of the weight of a road car’s. Its main job is the few seconds of very high current the starter motor needs; once the engine runs, the alternator powers the car. A master switch outside the car cuts it off in an emergency.",specs:[["Voltage","12 V (13.2 V rested)"],["Type","lithium iron phosphate"],["Capacity","20 Ah"],["Mass","≈ 4 kg"]],ex:[.3,1.3,-.4]},{id:"alternator",name:"Alternator",cat:"electrical",step:7,qty:1,desc:"A generator driven by a belt from the crankshaft. It makes alternating current, rectifies it to DC and holds the car’s electrical system at about 14 volts.",specs:[["Output","14.2 V, 110 A"],["Drive","multi-rib auxiliary belt"],["Regulator","built in"]],ex:[.75,.75,.55]},{id:"ecu",name:"Engine control unit",cat:"electrical",step:7,qty:1,desc:"The engine’s computer. Hundreds of times a second it reads the sensors — air flow, crank position, temperature, oxygen in the exhaust — and decides how much fuel to inject and when to fire each spark.",specs:[["Processor","32-bit microcontroller"],["Diagnostics","OBD-II over CAN bus"],["Housing","sealed die-cast aluminium"]],ex:[.05,1.3,.35]},{id:"dash",name:"Dashboard & display",cat:"interior",step:8,qty:1,desc:"A bare carbon-look panel with one screen in front of the driver and a row of switches in the middle. The screen shows gear, revs, lap time and warnings; everything a road car’s dashboard has for comfort is left out to save weight.",specs:[["Display","colour LCD with shift lights"],["Shows","gear, rpm, lap delta, alarms"],["Switches","ignition, start, pit limiter, fire"]],ex:[.15,.95,0]},{id:"column",name:"Steering column",cat:"interior",step:8,qty:1,desc:"The shaft from the steering wheel down through the firewall to the rack. Two universal joints let it bend round the pedals, and it is built to collapse like a telescope rather than push back at the driver in a crash.",specs:[["Adjustment","reach and rake"],["Joints","2 universal joints"],["Safety","collapsible, 80 mm stroke"]],ex:[-.1,.8,0]},{id:"swheel",name:"Steering wheel",cat:"interior",step:8,qty:1,desc:"A small, flat-bottomed wheel covered in suede for grip with racing gloves. It comes off with a quick-release hub so the driver can get in and out past the roll cage, and it carries the buttons for the radio, the pit limiter and the drink.",specs:[["Diameter","320 mm, flat bottom"],["Hub","quick release"],["Controls","radio, pit limiter, shift paddles"]],ex:[-.45,1.05,0]},{id:"pedals",name:"Pedal box",cat:"interior",step:8,qty:1,desc:"Clutch, brake and accelerator on one bracket bolted to the firewall. The brake pedal is a lever: it multiplies your foot’s push about four times before the servo multiplies it again.",specs:[["Pedals","clutch · brake · accelerator"],["Brake pedal ratio","≈ 4 : 1"],["Accelerator","drive-by-wire sensor"]],ex:[-.25,.55,0]},{id:"console",name:"Shifter & handbrake",cat:"interior",step:8,qty:1,desc:"A tall lever close to the wheel: pull it back for the next gear up, push it forward for the next one down. Next to it stands a hydraulic handbrake for holding the car on the grid.",specs:[["Shifter","sequential, pull for up"],["Handbrake","hydraulic, upright lever"],["Mounting","on the tunnel"]],ex:[0,.6,0]},{id:"seatf",name:"Racing seat & harness",cat:"interior",step:8,qty:1,desc:"A one-piece carbon shell with deep sides and wings beside the helmet, bolted straight to the floor with no adjustment at all. Six belts meet at one buckle and hold the driver so tightly that they feel everything the car does.",specs:[["Shell","carbon fibre, head-restraint wings"],["Harness","6-point, 75 mm belts"],["Mounting","fixed, on side brackets"],["Mass","≈ 7 kg"]],ex:[.1,.72,0]},{id:"cage",name:"Roll cage",cat:"interior",step:8,qty:1,desc:"A frame of steel tubes welded into the shell: a main hoop behind the driver, bars along the roof and down the windscreen pillars, crossed bars in the door openings and stays to the rear suspension. It protects the driver if the car rolls and also makes the body much stiffer.",specs:[["Tube","45 × 2.5 mm cold-drawn steel"],["Points","welded to the shell at 8 places"],["Door bars","X on both sides"],["Mass","≈ 45 kg"]],ex:[-.2,1.25,0]},{id:"extinguisher",name:"Fire extinguisher",cat:"interior",step:8,qty:1,desc:"A plumbed-in system: one bottle on the floor with pipes to nozzles in the engine bay and the cockpit. The driver, or a marshal pulling a handle outside the car, sets it all off at once.",specs:[["Type","plumbed-in, electrically triggered"],["Agent","3 kg, gas"],["Nozzles","2 engine bay, 2 cockpit"]],ex:[.2,.55,.5]},{id:"fender",name:"Front wing",cat:"panels",step:9,qty:2,lay:!0,desc:"The panel over the front wheel, called a fender in North America. It is bolted on rather than welded so that it can be replaced after a small knock.",specs:[["Fixing","8 bolts"],["Material","0.7 mm steel"],["Mass","≈ 3 kg"]],ex:[.15,.45,.95]},{id:"doorf",name:"Door",cat:"panels",step:9,qty:2,lay:!0,desc:"Only the outer skin of the road car’s door is left: the window lifter, speaker and trim are gone, the glass is replaced by a fixed plastic window, and the race number goes on the outside.",specs:[["Hinges","2, bolted"],["Window","4 mm polycarbonate, fixed"],["Carries","race number panel"],["Mass","≈ 9 kg"]],ex:[.05,0,1.15]},{id:"hood",name:"Bonnet",cat:"panels",step:9,qty:1,desc:"The cover over the engine bay, called a hood in North America. On the race car it is a light composite panel held by four pins so it can be lifted straight off, with vents that let hot air from the radiator escape over the top.",specs:[["Fixing","4 quick-release pins"],["Material","composite, vented"],["Vents","2, behind the radiator"],["Mass","≈ 5 kg"]],ex:[.35,1.55,0]},{id:"tailgate",name:"Tailgate",cat:"panels",step:9,qty:1,desc:"The sloping rear hatch, hinged at the roof. It carries the rear window, and the rear wing bolts through it into the body underneath.",specs:[["Hinges","roof, 2"],["Window","polycarbonate"],["Carries","wing mounts"],["Mass","≈ 8 kg"]],ex:[-1,.8,0]},{id:"bumperf",name:"Front bumper",cat:"panels",step:9,qty:1,desc:"A flexible plastic cover over a foam absorber and an aluminium crash beam. The cover springs back from a parking nudge; the beam spreads a harder hit into the two front rails.",specs:[["Cover","painted composite"],["Behind it","foam absorber, crash beam"],["Fitted with","tow eye, brake cooling ducts"]],ex:[1.25,0,0]},{id:"bumperr",name:"Rear bumper",cat:"panels",step:9,qty:1,desc:"The same idea as the front: a painted cover over a foam absorber and a steel beam. Its lower edge is cut away for the diffuser and the exhaust.",specs:[["Cover","painted composite"],["Behind it","foam absorber, steel beam"],["Fitted with","rain light, tow eye"]],ex:[-1.25,0,0]},{id:"grille",name:"Grille",cat:"panels",step:9,qty:1,desc:"The opening that lets cooling air reach the radiator. Its slats are shaped to guide the air and to keep stones and leaves out.",specs:[["Material","ABS plastic"],["Fixing","clips"],["Feeds","radiator and air intake"]],ex:[1.65,.1,0]},{id:"mirror",name:"Door mirror",cat:"panels",step:9,qty:2,desc:"A small fixed mirror on a thin stalk, shaped to disturb the air as little as possible. With no interior mirror view through the cage, the two door mirrors are how the driver sees who is behind.",specs:[["Housing","carbon, fixed"],["Glass","convex"],["Mass","≈ 0.3 kg"]],ex:[.1,.15,1.45]},{id:"wing",name:"Rear wing",cat:"panels",step:9,qty:1,desc:"An aeroplane wing turned upside down. Instead of lifting, it pushes the back of the car onto the track, harder the faster the car goes, so the tyres can corner and brake with more grip than the car’s weight alone would give.",specs:[["Span","1 560 mm"],["Element","single, adjustable angle"],["Downforce","≈ 1 800 N at 200 km/h"],["Material","carbon fibre"]],ex:[-1.25,1.35,0]},{id:"splitter",name:"Front splitter",cat:"panels",step:9,qty:1,desc:"A flat blade sticking out under the nose. Air piles up on top of it and speeds up underneath, which pushes the front of the car down and balances the rear wing. The small dive planes at the corners add a little more.",specs:[["Projection","120 mm ahead of the bumper"],["Material","carbon over a plywood core"],["Supports","2 adjustable rods"],["Extras","dive planes"]],ex:[1.5,-.25,0]},{id:"diffuser",name:"Rear diffuser",cat:"panels",step:9,qty:1,desc:"A ramp under the tail that lets the fast air from under the car slow down and spread out smoothly. That keeps the pressure under the floor low, sucking the car onto the track; the vertical fences keep the flow straight.",specs:[["Angle","9°"],["Fences","5 vertical strakes"],["Material","carbon fibre"]],ex:[-1.35,-.45,0]},{id:"windscreen",name:"Windscreen",cat:"glass",step:9,qty:1,desc:"Two sheets of glass with a plastic layer between them, so it cracks instead of shattering. It is glued to the body and is part of the structure: it stiffens the shell and gives the passenger airbag something to push against.",specs:[["Type","laminated, heated, 4.8 mm"],["Fixing","polyurethane adhesive"],["Extras","tear-off film layers"]],ex:[.65,1.15,0]},{id:"headlight",name:"Headlight",cat:"glass",step:9,qty:2,desc:"Dipped beam, main beam, daytime running light and indicator in one sealed unit behind a clear polycarbonate lens. The dipped beam has a sharp cut-off so it lights the road without dazzling oncoming drivers.",specs:[["Dipped beam","LED projector, ≈ 1 000 lm"],["Main beam","LED reflector"],["Lens","hard-coated polycarbonate"]],ex:[1.1,.25,.55]},{id:"taillight",name:"Tail light",cat:"glass",step:9,qty:2,desc:"Tail, brake, indicator and reversing lamps in one cluster. The brake lamps are about five times brighter than the tail lamps so that they are obvious even at night.",specs:[["Tail / brake","LED, 5 W / 21 W equivalent"],["Indicator","amber LED"],["Lens","red acrylic"]],ex:[-1.1,.25,.55]}],ia=Object.fromEntries(ii.map(i=>[i.id,i])),sn=[{slug:"parts",short:"Parts",kicker:"Get ready",title:"Gather the parts",intro:"Everything in a touring-class race car: a two-door coupe with a 340 hp turbo engine, front-wheel drive, a roll cage, slick tyres and a big rear wing. Tick each part off as you find it. Hover a row to see it light up on the mat, or click a part for what it does and its numbers.",todo:[],note:"Touring-car racers start life as the shell of a road car. Everything a race does not need is taken out, and the parts that make it fast and safe are put in."},{slug:"shell",short:"Shell",kicker:"Build",title:"Body shell",intro:"A modern car has no separate chassis. The floor, the pillars and the roof are welded into one hollow steel box, the unibody, and everything else bolts to it. The shell is built first and painted before any other part goes near it.",todo:["Stand the shell on four stands under the sill jacking points, level front to back.","Check the two front rails and the strut towers: the engine and front suspension hang from these.","Fit the roof panel along both roof rails and the flared rear quarter panels round the rear wheel arches."],note:"The shell works like an eggshell: thin metal, but closed on every side. That is why the roof and the glued-in windscreen matter to how stiff the car feels."},{slug:"powertrain",short:"Engine",kicker:"Build",title:"Engine & gearbox",intro:"The turbo engine sits sideways across the nose with the sequential gearbox bolted to its left-hand end, so the power goes straight down to the front wheels. Engine, gearbox and subframe are joined on the bench and raised into the shell from underneath as one unit.",todo:["Bolt the gearbox to the engine, with the racing clutch centred between them.","Lower the engine and gearbox onto their mounts on the front subframe.","Raise the subframe into the shell and tighten its four bolts to the front rails.","Fit the air box and the intake manifold to the front of the cylinder head."],note:"A road car hangs its engine on soft rubber so the cabin stays quiet. A race car uses hard mounts instead: the engine cannot rock about, so the driver gets the power the instant they ask for it."},{slug:"suspension",short:"Suspension",kicker:"Build",title:"Suspension & steering",intro:"Springs hold the car up, dampers stop it bouncing, and arms decide how each wheel may move. The front uses adjustable MacPherson struts, which steer; the rear uses a simple twist beam. Everything is much stiffer and lower than on a road car. The steering rack and the two driveshafts go in at the same time because they all meet at the front hubs.",todo:["Bolt the lower control arms to the subframe and the struts up into the strut towers.","Fit the steering rack to the subframe and join its tie rods to the struts.","Slide the driveshafts into the differential and out through the front hubs.","Hang the rear twist-beam axle from its two bushes, then fit the rear springs and dampers.","Clip the anti-roll bar to the subframe and link its ends to the struts."],note:"Race teams set the car up on a perfectly flat patch of floor: ride height, the lean of each wheel (camber) and which way it points (toe), all to a fraction of a millimetre. A tiny change is worth tenths of a second a lap."},{slug:"wheels",short:"Wheels",kicker:"Build",title:"Brakes & wheels",intro:"Every wheel gets a big drilled disc and a caliper. Pressing the pedal pushes fluid from the master cylinder to all four calipers at once, and each one squeezes its disc. Then the wheels go on: one centre nut each, done up with an air gun.",todo:["Fit the servo and master cylinder to the firewall, in line with the brake pedal.","Slide a disc over each hub and bolt a caliper over each disc.","Fit the slick tyres to the wheels, balance them, and lock a wheel onto each hub with its centre nut.","Fill the system with brake fluid and bleed the air out, starting at the wheel furthest from the master cylinder."],note:"Brake fluid cannot be squeezed, and air can. One bubble in a brake line makes the pedal feel spongy and sink, which is why bleeding the brakes is never skipped."},{slug:"fuel",short:"Fuel",kicker:"Build",title:"Fuel & exhaust",intro:"Fuel is stored at the back, burnt at the front, and the waste gas is piped all the way back again, spinning the turbocharger on its way out. The fuel cell sits low ahead of the rear axle; the exhaust runs down the tunnel in the middle of the floor to one small silencer at the tail.",todo:["Lift the fuel cell up into its bay under the floor and fasten its two straps.","Bolt the exhaust manifold and turbocharger to the back of the cylinder head, with the catalyst below.","Hang the exhaust pipe and silencer on their rubber mounts and clamp the pipe to the catalyst."],note:"The turbocharger runs on energy that would otherwise be thrown away. Exhaust gas leaves the engine at around 900 °C, and the turbine can glow red after a few hard laps."},{slug:"electrics",short:"Electrics",kicker:"Build",title:"Cooling & electrics",intro:"Only about a third of the fuel’s energy moves the car; much of the rest is heat that the radiator has to get rid of, and a race engine at full throttle makes a lot of it. The battery starts the engine, the alternator takes over once it runs, and the engine control unit decides, spark by spark, how the engine behaves.",todo:["Fit the radiator and fan to the front crossmember and connect its two hoses to the engine.","Bolt the alternator to the engine block and run the auxiliary belt round its pulley.","Fix the engine control unit to the firewall and plug in the engine wiring loom.","Clamp the battery on its tray. Connect the positive lead first and the negative lead last."],note:"Negative goes on last and comes off first. The whole body is connected to the negative terminal, so with it disconnected a spanner touching the bodywork cannot short the battery."},{slug:"interior",short:"Interior",kicker:"Build",title:"Interior",intro:"A race car’s cabin is an office, not a living room. There is one seat, a roll cage, a fire extinguisher and the controls, and nothing else: no carpet, no back seat, no radio. The cage goes in first because everything else has to fit round it.",todo:["Weld the roll cage to the floor, the pillars and the rear suspension turrets.","Slide the dashboard in through a door opening and fix it between the two cage legs.","Fit the pedal box, then join the steering column to the rack and fit the steering wheel.","Bolt the shifter and handbrake to the tunnel and connect them to the gearbox and rear brakes.","Bolt the seat to the floor to fit this driver, fix the six harness straps, and mount the extinguisher."],note:"The seat is fitted to one driver: they sit in the car while the team sets its position, because a driver who is held firmly can feel what the tyres are doing through their back."},{slug:"panels",short:"Panels",kicker:"Build",title:"Panels, glass & lights",intro:"Last come the parts you actually see, and the ones that work the air. The doors, bonnet, tailgate and front wings close up the body; then the splitter under the nose, the diffuser under the tail and the wing on top turn the whole car into something that is pushed down onto the track.",todo:["Bolt on the front wings, then hang the two doors and set their gaps.","Glue in the windscreen and leave the adhesive to cure.","Fit the bonnet and the tailgate and adjust their latches.","Fit the headlights, tail lights and grille, then the two bumpers and the mirrors.","Bolt on the splitter, the diffuser and the rear wing, and set the wing angle."],note:"At 200 km/h the wing, splitter and diffuser together push this car down with about a third of its own weight. More wing angle means faster corners and slower straights, so the setting changes from circuit to circuit."},{slug:"drive",short:"Drive",kicker:"Drive",title:"Drive it",intro:"The finished race car on a 4.5 km circuit: a three-lap race against five AI drivers, with start lights, lap timing and track limits like a race weekend. Watch what the parts do as you drive: the front wheels steer on their struts, the sequential gearbox bangs up through six gears as the revs rise, and the brake lights come on when you slow down. Any part can still be clicked for its details.",todo:[]}],Q_=[["Trolley jack & axle stands","lifting the shell and holding it safely"],["Socket set & torque wrench","wheel bolts, suspension and subframe bolts"],["Engine hoist","lowering the engine and gearbox onto the subframe"],["Wheel gun","the single centre nut on each wheel"],["Corner-weight scales & set-up plates","ride height, camber and toe"],["Trim tools & screwdrivers","interior clips, lamp units, bumpers"],["Brake bleeding kit","getting the air out of the brake lines"],["Multimeter","checking battery voltage and charging"]],$r=[2.92,2.05,1.56,1.24,1.03,.88],au=4.06,qo=.315,Zc=2.57,In=1300,vi=9.81,tv=.9,ev=.5*1.2*1,nv=In*vi/3/(200/3.6)**2,iv=.015,Ls=1100,Fr=7200,sv=6950,rv=.04,av=.46,Ds=[[800,160],[2e3,300],[3500,420],[5600,420],[6800,351],[7200,325],[7400,0]];function ov(i){if(i<=Ds[0][0])return Ds[0][1];for(let t=1;t<Ds.length;t++){const[e,n]=Ds[t];if(i<=e){const[s,r]=Ds[t-1];return r+(n-r)*(i-s)/(e-s)}}return 0}const pi=(i,t)=>Math.abs(i)/(2*Math.PI*qo)*60*(t===-1?3.2:$r[t-1])*au;class lv{constructor(){nt(this,"x",0);nt(this,"z",0);nt(this,"heading",0);nt(this,"speed",0);nt(this,"steer",0);nt(this,"rpm",Ls);nt(this,"gear",1);nt(this,"throttle",0);nt(this,"braking",!1);nt(this,"limiter",!1);nt(this,"manual",!1);nt(this,"lastShift",null);nt(this,"accel",0);nt(this,"aLat",0);nt(this,"shifts",0);nt(this,"odo",0);nt(this,"time",0);nt(this,"coolant",24);nt(this,"wheelAngle",0);nt(this,"locked",!1);nt(this,"s",0);nt(this,"lat",0);nt(this,"surface","track");nt(this,"start",{x:0,z:0,heading:0});nt(this,"input",{up:!1,down:!1,left:!1,right:!1,brake:!1});nt(this,"shiftT",0)}reset(t=this.start){this.start=t,this.x=t.x,this.z=t.z,this.heading=t.heading,this.speed=0,this.steer=0,this.rpm=Ls,this.gear=1,this.odo=0,this.time=0,this.wheelAngle=0,this.accel=0,this.aLat=0,this.shiftT=0}get moving(){const t=this.input;return Math.abs(this.speed)>.002||t.up||t.down||t.left||t.right||Math.abs(this.steer)>.002||Math.abs(this.rpm-Ls)>5}update(t,e=1.45,n=0){const s=this.input;let r=this.speed;const a=Math.abs(r),o=nv*r*r,l=In*vi+o;if(this.throttle=0,this.braking=!1,this.limiter=!1,this.locked){const x=s.up?4200+Math.sin(this.time*31)*150:Ls;this.rpm+=(x-this.rpm)*Math.min(1,t*(s.up?9:4)),this.throttle=s.up?1:0,this.speed=0,this.accel=0,this.aLat=0,this.steerToward(t,0);return}this.time+=t,this.shiftT>0&&(this.shiftT-=t),!this.manual&&r>=-.05&&this.gear!==-1&&(this.gear<$r.length&&pi(r,this.gear)>sv?this.shift(1):this.gear>1&&pi(r,this.gear)<3800&&pi(r,this.gear-1)<6300&&this.shift(-1));let c=0;const h=s.up&&!s.down&&!s.brake,u=s.down&&!s.up&&!s.brake;if(s.brake||h&&r<-.2||u&&r>.2)this.braking=!0,c=-Math.sign(r)*e*l*.98;else if(h){this.gear===-1&&(this.gear=1),this.throttle=1;const x=Math.max(pi(r,this.gear),3400),I=Math.max(0,Math.min(1,(Fr-x)/150));this.limiter=x>Fr-75;const _=this.shiftT>0?0:ov(x)*I*$r[this.gear-1]*au*tv/qo,b=e*(In*vi*av+o*.42);c=Math.min(_,b)}else u?(this.gear=-1,this.throttle=.6,c=r>-7?-.25*In*vi:0):a>.05&&this.gear>0&&(c=-Math.sign(r)*.05*In*vi);const f=a>.5?e*l/In/(r*r):1/0,d=Math.min(.58,Math.atan(Math.min(10,1.15*f*Zc)));this.steerToward(t,((s.right?1:0)-(s.left?1:0))*d);let g=Math.tan(this.steer)/Zc,v=0;Math.abs(g)>f&&(v=Math.min(1,Math.abs(g)/f-1),g=Math.sign(g)*f),this.aLat=r*r*g;const m=Math.sign(r)*(ev*r*r+(iv+n)*In*vi+v*.5*e*In*vi),p=r,w=(c-m)/In;r+=w*t,!this.throttle&&p!==0&&Math.sign(r)!==Math.sign(p)&&(r=0),Math.abs(r)<.02&&!this.throttle&&(r=0),this.accel=(r-p)/Math.max(t,1e-4),this.speed=r,r===0&&!s.down&&(this.gear=1);const S=this.throttle?Math.max(pi(r,this.gear),this.gear===-1?2400:3400):Math.max(Ls,pi(r,this.gear));this.rpm+=(Math.min(Fr,S)-this.rpm)*Math.min(1,t*(this.shiftT>0?30:9)),this.heading-=r*g*t,this.x+=Math.cos(this.heading)*r*t,this.z+=-Math.sin(this.heading)*r*t,this.odo+=Math.abs(r)*t,this.wheelAngle+=r*t/qo,this.coolant+=(88-this.coolant)*t*(.01+1e-5*this.rpm)}shiftUp(){return this.gear>=1&&this.gear<$r.length?(this.shift(1),!0):!1}shiftDown(){return this.gear<=1||pi(this.speed,this.gear-1)>Fr-100?!1:(this.shift(-1),!0)}shift(t){this.gear+=t,this.shiftT=t>0?rv:0,this.shifts++,this.lastShift=t>0?"up":"down"}steerToward(t,e){const n=e-this.steer;this.steer+=Math.sign(n)*Math.min(Math.abs(n),t*2.2)}}const cv=[[-150,0],[100,0],[300,0],[400,15],[445,70],[425,130],[360,155],[250,160],[180,195],[135,265],[160,355],[260,415],[420,430],[520,465],[600,440],[680,475],[770,450],[850,380],[870,250],[845,100],[815,-50],[720,-145],[580,-175],[300,-200],[0,-210],[-300,-200],[-380,-175],[-425,-215],[-490,-195],[-620,-150],[-700,-70],[-670,-10],[-560,0],[-400,0]],hv=6,uv=1.45,dv=9.81,fv=1.45*(1300*9.81/3/(200/3.6)**2)/1300;function pv(i){return()=>{i|=0,i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function jn(i,t,e,n=!0){const s=document.createElement("canvas");s.width=i,s.height=t,e(s.getContext("2d"));const r=new ms(s);return r.colorSpace=Ee,n&&(r.wrapS=r.wrapT=us),r.anisotropy=8,r}const Or='"Barlow Condensed", "Arial Narrow", Arial, sans-serif';class mi{constructor(){nt(this,"pos",[]);nt(this,"uv",[]);nt(this,"col",[]);nt(this,"idx",[])}add(t,e,n){const s=this.pos.length/3;for(let r=0;r<4;r++){this.pos.push(...t[r]),this.uv.push(...e?e[r]:[0,0]);const a=n??mv;this.col.push(a.r,a.g,a.b)}this.idx.push(s,s+2,s+1,s,s+3,s+2)}mesh(t,e=!0){const n=new Se;n.setAttribute("position",new jt(this.pos,3)),n.setAttribute("uv",new jt(this.uv,2)),n.setAttribute("color",new jt(this.col,3)),n.setIndex(this.idx),e?n.setAttribute("normal",new jt(this.pos.map((r,a)=>a%3===1?1:0),3)):n.computeVertexNormals();const s=new Ht(n,t);return s.receiveShadow=!0,s}}const mv=new Ot(1,1,1);class gv{constructor(){nt(this,"group",new fn);nt(this,"length");nt(this,"n");nt(this,"ds");nt(this,"px");nt(this,"pz");nt(this,"tx");nt(this,"tz");nt(this,"curv");nt(this,"vmax");nt(this,"line");nt(this,"gravel");nt(this,"half",6);nt(this,"kerb",1.3);nt(this,"wall",22);nt(this,"sectors");nt(this,"startPose");nt(this,"corners",[]);nt(this,"lamps",[]);nt(this,"keepOut",[]);const t=new Jr(cv.map(([r,a])=>new D(r,0,a)),!0,"centripetal");this.length=t.getLength();const e=this.n=Math.round(this.length/2);this.ds=this.length/e;const n=t.getSpacedPoints(e);this.px=new Float32Array(e),this.pz=new Float32Array(e),this.tx=new Float32Array(e),this.tz=new Float32Array(e),this.curv=new Float32Array(e);for(let r=0;r<e;r++)this.px[r]=n[r].x,this.pz[r]=n[r].z;for(let r=0;r<e;r++){const a=(r-1+e)%e,o=(r+1)%e,l=this.px[o]-this.px[a],c=this.pz[o]-this.pz[a],h=Math.hypot(l,c)||1;this.tx[r]=l/h,this.tz[r]=c/h}const s=new Float32Array(e);for(let r=0;r<e;r++){const a=(r+1)%e;s[r]=(this.tx[r]*this.tz[a]-this.tz[r]*this.tx[a])/this.ds}for(let r=0;r<e;r++){let a=0;for(let o=-4;o<=4;o++)a+=s[this.wrap(r+o)];this.curv[r]=a/9}this.sectors=[this.length/3,this.length*2/3],this.startPose=this.gridPose(2),this.vmax=this.speedProfile(),this.line=this.racingLine(),this.gravel=new Int8Array(e);for(let r=0;r<e;r++){let a=0;for(let o=-10;o<=10;o++){const l=this.curv[this.wrap(r+o)];Math.abs(l)>Math.abs(a)&&(a=l)}Math.abs(a)>1/110&&(this.gravel[r]=-Math.sign(a))}this.findCorners(),this.build()}wrap(t){return(t%this.n+this.n)%this.n}at(t,e,n=0){return t=this.wrap(Math.round(t)),[this.px[t]-this.tz[t]*e,n,this.pz[t]+this.tx[t]*e]}headingAt(t){return t=this.wrap(Math.round(t)),Math.atan2(-this.tz[t],this.tx[t])}poseAt(t,e=0){const n=this.wrap(Math.round(t/this.ds)),[s,,r]=this.at(n,e);return{x:s,z:r,heading:this.headingAt(n)}}gridSlot(t){return{s:this.length-12.6-t*9,lat:t%2?2.6:-2.6}}gridPose(t){const e=this.gridSlot(t);return this.poseAt(e.s,e.lat)}locate(t,e,n=-1){let s=0,r=1/0;const a=n<0?0:n-30,o=n<0?this.n-1:n+30;for(let d=a;d<=o;d++){const g=this.wrap(d),v=(t-this.px[g])**2+(e-this.pz[g])**2;v<r&&(r=v,s=g)}if(n>=0&&r>(this.wall*2)**2)return this.locate(t,e,-1);const l=t-this.px[s],c=e-this.pz[s],h=-l*this.tz[s]+c*this.tx[s],u=l*this.tx[s]+c*this.tz[s],f=((s*this.ds+u)%this.length+this.length)%this.length;return{i:s,s:f,lat:h}}surfaceAt(t,e){const n=Math.abs(e);if(n<=this.half)return"track";if(n<=this.half+this.kerb)return"kerb";const s=this.gravel[this.wrap(t)];return s&&Math.sign(e)===s&&n>this.half+this.kerb+1&&n<this.wall-2.5?"gravel":"grass"}setLights(t){this.lamps.forEach((e,n)=>{e.emissiveIntensity=n<t?3.2:0,e.color.setHex(n<t?16722463:2758420)})}speedProfile(){const{n:t,ds:e}=this,n=new Float32Array(t);for(let a=0;a<t;a++){const l=Math.abs(this.curv[a])-fv;n[a]=l>0?Math.min(68,Math.sqrt(uv*dv/l)):68}const s=15,r=a=>Math.max(.5,Math.min(6.8,225e3/(1300*Math.max(a,1)))-.6*a*a/1300);for(let a=0;a<3;a++){for(let o=2*t;o>0;o--){const l=o%t,c=(o+1)%t;n[l]=Math.min(n[l],Math.sqrt(n[c]**2+2*s*e))}for(let o=0;o<2*t;o++){const l=o%t,c=(o+1)%t;n[c]=Math.min(n[c],Math.sqrt(n[l]**2+2*r(n[l])*e))}}return n}racingLine(){const{n:t}=this,e=new Float32Array(t),n=new Float32Array(t);for(let s=0;s<t;s++)e[s]=Math.max(-4.2,Math.min(4.2,this.curv[s]*900));for(let s=0;s<t;s++){let r=0;for(let a=-30;a<=30;a++)r+=e[this.wrap(s+a)];n[s]=r/61}return n}findCorners(){let t=!1,e=0,n=0;for(let s=0;s<this.n;s++){const r=Math.abs(this.curv[s]);r>1/220?(t||(t=!0,e=0),r>e&&(e=r,n=s)):t&&(t=!1,this.corners.push({s:n*this.ds,side:-Math.sign(this.curv[n])}))}}distToTrack(t,e){let n=1/0;for(let s=0;s<this.n;s+=4)n=Math.min(n,(t-this.px[s])**2+(e-this.pz[s])**2);return Math.sqrt(n)}build(){const{n:t,half:e,kerb:n,wall:s}=this,r=L=>new Ie({roughness:.9,metalness:0,envMapIntensity:.3,...L}),a=new Ot("#d2382c"),o=new Ot("#f2eee4"),l=jn(256,256,L=>{L.fillStyle="#9fbf86",L.fillRect(0,0,256,256);for(let O=0;O<5e3;O++){const R=Math.random();L.fillStyle=R>.5?"rgba(120,160,95,0.35)":"rgba(190,210,150,0.3)",L.fillRect(Math.random()*256,Math.random()*256,2,2)}});l.repeat.set(120,120);const c=new Ht(new mn(3200,3200).rotateX(-Math.PI/2),r({map:l,roughness:1}));c.position.set(80,.002,130),c.receiveShadow=!0,this.group.add(c);const h=new mi,u=new Ot("#4a8a62"),f=new Ot("#539569");for(let L=0;L<t;L++){const O=Math.floor(L/10)%2?u:f;h.add([this.at(L,-s-1.5,.004),this.at(L+1,-s-1.5,.004),this.at(L+1,s+1.5,.004),this.at(L,s+1.5,.004)],void 0,O)}this.group.add(h.mesh(r({vertexColors:!0,roughness:1})));const d=new mi,g=new Ot("#d9c9a0");for(let L=0;L<t;L++){const O=this.gravel[L];if(!O)continue;const R=O*(e+n+1),st=O*(s-2.5),[Z,xt]=O>0?[R,st]:[st,R];d.add([this.at(L,Z,.007),this.at(L+1,Z,.007),this.at(L+1,xt,.007),this.at(L,xt,.007)],void 0,g)}const v=jn(64,64,L=>{L.fillStyle="#fff",L.fillRect(0,0,64,64);for(let O=0;O<900;O++){const R=170+Math.random()*70;L.fillStyle=`rgb(${R},${R},${R})`,L.fillRect(Math.random()*64,Math.random()*64,1.5,1.5)}});this.group.add(d.mesh(r({vertexColors:!0,map:v,roughness:1,polygonOffset:!0,polygonOffsetFactor:-.5,polygonOffsetUnits:-.5})));const m=jn(128,128,L=>{L.fillStyle="#4a4f57",L.fillRect(0,0,128,128);for(let O=0;O<2600;O++){const R=60+Math.random()*40;L.fillStyle=`rgb(${R},${R+3},${R+8})`,L.fillRect(Math.random()*128,Math.random()*128,1,1)}}),p=new mi;for(let L=0;L<t;L++){const O=L*this.ds/6,R=(L+1)*this.ds/6;p.add([this.at(L,-e,.01),this.at(L+1,-e,.01),this.at(L+1,e,.01),this.at(L,e,.01)],[[0,O],[0,R],[2,R],[2,O]])}this.group.add(p.mesh(r({map:m,color:16777215,roughness:.85,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1})));const w=new mi;for(let L=0;L<t;L++)for(const[O,R]of[[-e,-e+.25],[e-.25,e]])w.add([this.at(L,O,.013),this.at(L+1,O,.013),this.at(L+1,R,.013),this.at(L,R,.013)]);const S=new mi;for(let L=0;L<t;L++){let O=0;for(let st=-8;st<=8;st++)O=Math.max(O,Math.abs(this.curv[this.wrap(L+st)]));if(O<1/170)continue;const R=L%2?a:o;for(const[st,Z]of[[-e-n,-e],[e,e+n]])S.add([this.at(L,st,.016),this.at(L+1,st,.016),this.at(L+1,Z,.016),this.at(L,Z,.016)],void 0,R)}const x=r({vertexColors:!0,roughness:.7,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});this.group.add(w.mesh(x),S.mesh(x));const I=new mi,_=new Ot("#c3c8cf"),b=[];for(let L=0;L<t;L++)for(const O of[-1,1]){const st=Math.sign(this.curv[L])===-O&&Math.abs(this.curv[L])>.005?Math.floor(L/2)%2?a:o:_,Z=O*s;I.add([this.at(L,Z,0),this.at(L+1,Z,0),this.at(L+1,Z,.9),this.at(L,Z,.9)],void 0,st),this.gravel[L]===O&&L%1===0&&b.push(this.at(L,O*(s-.55),.42))}this.group.add(I.mesh(r({vertexColors:!0,roughness:.55,side:en}),!1));const E=new Ga(new ni(.34,.34,.84,10),r({color:1909032,roughness:.8}),b.length),M=new re;b.forEach(([L,O,R],st)=>E.setMatrixAt(st,M.makeTranslation(L,O,R))),this.group.add(E);const y=jn(24,192,L=>{for(let O=0;O<2;O++)for(let R=0;R<16;R++)L.fillStyle=(O+R)%2?"#15181d":"#f4f1e8",L.fillRect(O*12,R*12,12,12)},!1);y.magFilter=Ge,this.flat(0,0,1.5,e*2,.018,r({map:y,roughness:.7,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}));const P=r({color:15920868,roughness:.7,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3});for(let L=0;L<hv;L++){const{s:O,lat:R}=this.gridSlot(L);this.flat(O+2.5,R,.22,2.8,.018,P),this.flat(O+1.7,R-1.3,1.6,.16,.018,P),this.flat(O+1.7,R+1.3,1.6,.16,.018,P)}const k=r({color:1778483,roughness:.5,metalness:.3});for(const L of[-1,1])this.box(0,L*(e+1.6),3.4,.5,.5,6.8,k);this.box(0,0,6.6,.7,e*2+3.7,1.1,k);for(let L=0;L<5;L++){const O=r({color:2758420,emissive:16722463,emissiveIntensity:0,roughness:.3});this.lamps.push(O);const R=new Ht(new as(.26,16,10),O),[st,,Z]=this.at(0,(L-2)*.85);R.position.set(st-this.tx[0]*.42,6.6,Z-this.tz[0]*.42),this.group.add(R)}this.board(-.5,0,7.75,e*2+3.4,1.1,this.banner("CARKIT CIRCUIT  ·  START / FINISH","#fdc93a","#14233a",512));const B=r({color:14275265}),G=r({color:1981020,roughness:.6}),j=r({color:16632122,roughness:.6}),q=jn(1024,64,L=>{L.fillStyle="#d9d2c1",L.fillRect(0,0,1024,64);for(let O=0;O<12;O++){const R=8+O*84.6;L.fillStyle="#26364d",L.fillRect(R,12,70,52),L.fillStyle="#fdc93a",L.font=`700 20px ${Or}`,L.textAlign="center",L.fillText(String(O+1),R+35,9),L.strokeStyle="rgba(255,255,255,0.12)";for(let st=18;st<64;st+=6)L.beginPath(),L.moveTo(R,st),L.lineTo(R+70,st),L.stroke()}},!1),Q=-(s+14);this.box(-90,Q-6,3.2,170,14,6.4,B),this.box(-90,Q-6,6.6,172,15,.4,G),this.board(-90,Q+1.05,3,168,5.4,q,!0),this.board(-90,Q+.9,7.4,120,1.4,this.banner("CARKIT RACING  ·  PIT LANE","#14233a","#fdc93a",1024),!0),this.ribbon(-175,-5,-(s+1.6),-(s+7.5),.011,r({map:m,roughness:.85})),this.keepOut.push({...this.xz(-90,Q-6),r:110});for(const[L,O]of[[-260,140],[60,120]])this.grandstand(L+O/2,1,O,B,G,j);this.grandstand(this.length*.52,-1,110,B,G,j);const X=this.backStraight();for(const L of[-1,1])this.box(X,L*(s+2),4.6,2.2,2.2,9.2,B);this.box(X,0,8.2,3.2,2*s+6.4,1.2,G),this.box(X,0,9.15,3.2,2*s+6.4,.7,B);const ht=this.banner("CARKIT  ·  BUILT PART BY PART  ·  27","#fdc93a","#14233a",1024);this.board(X-1.62,0,8.2,2*s+4,1.1,ht),this.board(X+1.62,0,8.2,2*s+4,1.1,ht,!0);const mt=[this.banner("CARKIT","#14233a","#fdc93a",512),this.banner("SLICKS · 250/660 R18","#f4f1e8","#14233a",512),this.banner("TURBO 2.0 · 340 HP","#fdc93a","#14233a",512),this.banner("#27","#d2382c","#f4f1e8",512)];let St=-1e9,kt=0;for(let L=0;L<t;L+=5){const O=L*this.ds;if(Math.abs(this.curv[L])>1/900||O-St<260||O<60||O>this.length-60)continue;const R=kt%2?1:-1;this.clear(O,R,10)&&(St=O,this.box(O,R*(s+4.5),1.6,.3,.3,3.2,k),this.board(O,R*(s+4.3),2.4,9,1.8,mt[kt++%mt.length]))}for(const L of this.brakePoints())for(const O of[150,100,50]){const R=L-O,st=jn(128,96,Z=>{Z.fillStyle="#f4f1e8",Z.fillRect(0,0,128,96),Z.fillStyle="#14233a",Z.font=`700 58px ${Or}`,Z.textAlign="center",Z.textBaseline="middle",Z.fillText(String(O),64,52)},!1);this.box(R,-(e+3.2),.9,.12,.12,1.8,k),this.board(R-.08,-(e+3.2),2,1.3,1,st)}this.corners.forEach((L,O)=>{const R=jn(96,96,st=>{st.fillStyle="#14233a",st.fillRect(0,0,96,96),st.fillStyle="#fdc93a",st.font=`italic 700 54px ${Or}`,st.textAlign="center",st.textBaseline="middle",st.fillText("T"+(O+1),48,52)},!1);this.box(L.s,L.side*(s+2.5),1.2,.15,.15,2.4,k),this.board(L.s,L.side*(s+2.5),2.6,1.6,1.6,R)});let Bt={x:0,z:0,r:0};for(let L=-800;L<=1e3;L+=40)for(let O=-500;O<=700;O+=40){const R=this.distToTrack(L,O)-s-30;R>Bt.r&&this.keepOut.every(st=>Math.hypot(L-st.x,O-st.z)>st.r+R)&&(Bt={x:L,z:O,r:R})}if(Bt.r>30){Bt.r=Math.min(Bt.r,150);const L=new Ht(new qs(Bt.r+6,48).rotateX(-Math.PI/2),r({color:14931632,roughness:1}));L.position.set(Bt.x,.008,Bt.z),L.scale.set(1.35,1,1);const O=new Ht(new qs(Bt.r,48).rotateX(-Math.PI/2),new Ie({color:5215165,roughness:.15,metalness:.1,envMapIntensity:.9}));O.position.set(Bt.x,.02,Bt.z),O.scale.set(1.35,1,1),this.group.add(L,O),this.keepOut.push({x:Bt.x,z:Bt.z,r:Bt.r*1.4+10})}const Y=pv(27),rt=[];for(let L=0;L<9e3&&rt.length<900;L++){const O=-1e3+Y()*2150,R=-650+Y()*1500;Math.sin(O*.006)+Math.cos(R*.007)+Math.sin((O+R)*.004)<.4&&Y()>.15||this.distToTrack(O,R)<s+9||this.keepOut.some(Z=>Math.hypot(O-Z.x,R-Z.z)<Z.r)||rt.push([O,R,.75+Y()*.7])}const wt=new Ga(new ni(.22,.32,2.4,6).translate(0,1.2,0),r({color:7032630}),rt.length),lt=new Ga(new dl(2.4,0).translate(0,4.4,0),r({color:4160075,roughness:.95,flatShading:!0}),rt.length),Dt=new pn,Ft=new D,It=new D,Kt=new Ot;rt.forEach(([L,O,R],st)=>{Dt.setFromAxisAngle(new D(0,1,0),Y()*6.28),M.compose(It.set(L,0,O),Dt,Ft.set(R,R*(.9+Y()*.4),R)),wt.setMatrixAt(st,M),lt.setMatrixAt(st,M),lt.setColorAt(st,Kt.setHSL(.3+Y()*.06,.38+Y()*.15,.3+Y()*.1))}),this.group.add(wt,lt)}banner(t,e,n,s){return jn(s,64,r=>{r.fillStyle=e,r.fillRect(0,0,s,64),r.fillStyle=n,r.font=`italic 700 44px ${Or}`,r.textAlign="center",r.textBaseline="middle",r.fillText(t,s/2,34)},!1)}grandstand(t,e,n,s,r,a){const{wall:o}=this;if(this.clear(t,e,16)){for(let l=0;l<6;l++){const c=e*(o+3+l*1.7);this.box(t,c,(l+1)*.35,n,1.7,(l+1)*.7,s),this.box(t,c-e*.5,(l+1)*.7+.12,n,.6,.24,r)}this.box(t,e*(o+7.5),7.4,n+2,11,.25,a);for(const l of[-n/2+1,0,n/2-1])this.box(t+l,e*(o+12.4),3.7,.4,.4,7.4,r);this.keepOut.push({...this.xz(t,e*(o+8)),r:n/2+15})}}clear(t,e,n){const s=this.wrap(Math.round(t/this.ds));for(const r of[this.wall+3,this.wall+n]){const[a,,o]=this.at(s,e*r);if(this.distToTrack(a,o)<r-4)return!1}return!0}xz(t,e){const[n,,s]=this.at(Math.round(t/this.ds),e);return{x:n,z:s}}backStraight(){let t=0,e=0,n=this.length/2;for(let s=0;s<this.n;s++)Math.abs(this.curv[s])<1/900?(e++,e>t&&s*this.ds>this.length*.35&&(t=e,n=(s-e/2)*this.ds)):e=0;return n}brakePoints(){const t=[];let e=0;for(let n=0;n<this.n;n++){const s=Math.abs(this.curv[n]);s<1/400?e++:(e*this.ds>220&&s>1/120&&t.push(n*this.ds),e=0)}return t.slice(0,4)}ribbon(t,e,n,s,r,a){const o=new mi,[l,c]=n<s?[n,s]:[s,n];for(let h=t;h<e;h+=this.ds){const u=h/this.ds,f=u+1;o.add([this.at(u,l,r),this.at(f,l,r),this.at(f,c,r),this.at(u,c,r)],[[0,h/6],[0,(h+this.ds)/6],[1,(h+this.ds)/6],[1,h/6]])}this.group.add(o.mesh(a))}flat(t,e,n,s,r,a){const o=new Ht(new mn(n,s).rotateX(-Math.PI/2),a);this.place(o,t,e,r),o.receiveShadow=!0}box(t,e,n,s,r,a,o){const l=new Ht(new He(s,a,r),o);this.place(l,t,e,n),l.receiveShadow=!0}board(t,e,n,s,r,a,o=!1){const l=new Ht(new mn(s,r),new Ie({map:a,roughness:.6,envMapIntensity:.3,side:en}));this.place(l,t,e,n),o?e>0&&l.rotateY(Math.PI):(l.rotateY(Math.PI/2),l.scale.x=-1)}place(t,e,n,s){const r=this.wrap(Math.round(e/this.ds)),[a,,o]=this.at(r,n);t.position.set(a,s,o),t.rotation.y=this.headingAt(r),this.group.add(t)}}const _v=[["R. Okafor",8,13121325,16052712,.965],["L. Moreau",14,2071160,1319738,.95],["K. Tanaka",3,15525849,13776940,.935],["S. Varga",44,15764004,1319738,.92],["M. Haddad",61,7158712,16632122,.9]];function vv(i,t){const e=document.createElement("canvas");e.width=e.height=128;const n=e.getContext("2d");n.fillStyle="#"+t.toString(16).padStart(6,"0"),n.fillRect(0,0,128,128),n.fillStyle="#f6f3ea",n.beginPath(),n.arc(64,64,50,0,Math.PI*2),n.fill(),n.fillStyle="#14233a",n.font='italic 700 64px "Barlow Condensed", Arial, sans-serif',n.textAlign="center",n.textBaseline="middle",n.fillText(String(i),62,68);const s=new ms(e);return s.colorSpace=Ee,s}function xv(){const i=new $s;i.moveTo(-2.2,.22),i.lineTo(2.2,.22),i.lineTo(2.25,.5),i.quadraticCurveTo(2.1,.72,1.4,.78),i.lineTo(.55,.86),i.lineTo(-1.6,.92),i.quadraticCurveTo(-2.2,.9,-2.25,.62),i.closePath();const t=new gs(i,{depth:1.86,bevelEnabled:!0,bevelThickness:.08,bevelSize:.06,bevelSegments:2,curveSegments:6});t.translate(0,0,-.93);const e=new $s;e.moveTo(.5,.86),e.lineTo(-1.5,.92),e.quadraticCurveTo(-1.4,1.32,-.6,1.33),e.lineTo(-.1,1.32),e.closePath();const n=new gs(e,{depth:1.5,bevelEnabled:!0,bevelThickness:.04,bevelSize:.04,bevelSegments:1,curveSegments:4});n.translate(0,0,-.75);const s=new ni(.33,.33,.28,16).rotateX(Math.PI/2),r=na([[1.35,.95],[1.35,-.95],[-1.3,.95],[-1.3,-.95]].map(([l,c])=>s.clone().translate(l,.33,c))),a=na([new He(.42,.05,1.76).translate(-2.05,1.3,0),new He(.3,.38,.05).translate(-1.95,1.1,.7),new He(.3,.38,.05).translate(-1.95,1.1,-.7),new He(.4,.05,2).translate(2.25,.2,0),new He(.5,.12,1.8).translate(-2.15,.28,0)]),o=new He(4.3,.02,.36).translate(0,.95,0);return{body:t,glass:n,wheels:r,dark:a,stripe:o}}const yv=["shell","roof","quarter","wheel","tyre","disc","caliper","exhaust","seatf","cage","swheel","dash","fender","doorf","hood","tailgate","bumperf","bumperr","grille","mirror","wing","splitter","diffuser","windscreen","headlight","taillight"];function bv(i){const t=document.createElement("canvas");t.width=t.height=256;const e=t.getContext("2d");e.fillStyle="#faf7ee",e.beginPath(),e.arc(128,128,128,0,Math.PI*2),e.fill(),e.fillStyle="#13203a",e.font='italic 700 170px "Barlow Condensed", Arial, sans-serif',e.textAlign="center",e.textBaseline="middle",e.fillText(String(i),124,140);const n=new ms(t);return n.colorSpace=Ee,n}function Mv(i,t,e){const n=iu();n.paint.color.setHex(i),n.stripe.color.setHex(t),n.number.map=bv(e);const s=su(n),r=new fn;for(const l of yv)for(const c of s[l]??[])r.add(c);r.updateMatrixWorld(!0);const a=new Map;r.traverse(l=>{const c=l;if(!c.isMesh)return;let h=c.geometry.clone().applyMatrix4(c.matrixWorld);h.index&&(h=h.toNonIndexed()),h.attributes.normal||h.computeVertexNormals(),h.attributes.uv||h.setAttribute("uv",new jt(new Float32Array(h.attributes.position.count*2),2));for(const f of Object.keys(h.attributes))["position","normal","uv"].includes(f)||h.deleteAttribute(f);if(h.morphAttributes={},c.matrixWorld.determinant()<0)for(const f of["position","normal","uv"]){const d=h.attributes[f],g=d.itemSize;for(let v=0;v<d.count;v+=3)for(let m=0;m<g;m++){const p=(v+1)*g+m,w=(v+2)*g+m,S=d.array[p];d.array[p]=d.array[w],d.array[w]=S}}const u=c.material;a.has(u)||a.set(u,[]),a.get(u).push(h)});const o=new fn;for(const[l,c]of a){const h=na(c);if(!h)continue;const u=new Ht(h,l);u.castShadow=!l.transparent,u.receiveShadow=!0,o.add(u),c.forEach(f=>f.dispose())}return o}class Sv{constructor(t){nt(this,"group",new fn);nt(this,"cars",[]);nt(this,"enabled",!0);nt(this,"locked",!0);nt(this,"raceTime",0);nt(this,"bumped",!1);this.track=t;const e=xv(),n=new Ie({color:1382687,roughness:.6,metalness:.2}),s=new Ie({color:1778739,roughness:.1,metalness:.6,envMapIntensity:1.2}),r=new Ie({color:1711136,roughness:.85}),a=new Ie({color:16632122,roughness:.45}),o=new mn(.62,.62);for(const[l,c,h,u,f]of _v){const d=new fn,g=new Ie({color:h,roughness:.35,metalness:.25,envMapIntensity:1}),v=new Ht(e.body,g),m=new Ht(e.glass,s),p=new Ht(e.wheels,r),w=new Ht(e.dark,n),S=new Ht(e.stripe,a.clone());S.material.color.setHex(u);const x=new Ie({map:vv(c,h),roughness:.4,polygonOffset:!0,polygonOffsetFactor:-2}),I=new Ht(o,x);I.position.set(.1,.55,1);const _=new Ht(o,x);_.position.set(.1,.55,-1),_.rotation.y=Math.PI;for(const E of[v,m,p,w])E.castShadow=!0,E.receiveShadow=!0;d.add(v,m,p,w,S,I,_);const b=new Xg;b.addLevel(Mv(h,u,c),0),b.addLevel(d,110),this.group.add(b),this.cars.push({name:l,number:c,color:h,skill:f,s:0,lat:0,v:0,latGoal:0,crossings:0,lapStart:0,best:null,last:null,finished:null,obj:b,wheels:p,hint:-1,heading:0,spin:0})}}toGrid(t){let e=0;for(const n of this.cars){e===t&&e++;const s=this.track.gridSlot(e++);Object.assign(n,{s:s.s,lat:s.lat,latGoal:s.lat,v:0,crossings:0,lapStart:0,best:null,last:null,finished:null,hint:-1})}this.raceTime=0,this.locked=!0,this.place()}progress(t){return t.crossings*this.track.length+t.s-this.track.length}update(t,e,n,s){if(!this.enabled)return;const r=this.track,a=r.length;this.locked||(this.raceTime+=t);for(const o of this.cars){if(this.locked){o.v=0;continue}const l=r.wrap(Math.round(o.s/r.ds));let c=68;const h=Math.ceil(o.v*o.v/(2*14)/r.ds)+6;for(let m=0;m<=h;m+=2){const p=r.wrap(l+m),w=m*r.ds;c=Math.min(c,Math.sqrt(r.vmax[p]**2+2*14*w))}c*=o.skill,o.finished!==null&&(c=Math.min(c,30));let u=null;const f=this.cars.filter(m=>m!==o);n&&f.push({s:e.s,lat:e.lat,v:e.speed});for(const m of f){let p=m.s-o.s;p<-a/2&&(p+=a),p>a/2&&(p-=a),p>0&&p<22&&Math.abs(m.lat-o.lat)<2.3&&(!u||p<u.gap)&&(u={dv:o.v-m.v,gap:p,lat:m.lat})}if(o.latGoal=r.line[l],u){const m=u.lat-3.3,p=u.lat+3.3,w=x=>Math.abs(x)<r.half-1.1,S=w(p)&&(!w(m)||Math.abs(p-r.line[l])<Math.abs(m-r.line[l]))?p:w(m)?m:null;S!==null?o.latGoal=S:u.gap<10&&(c=Math.min(c,o.v-u.dv))}const d=o.v<c?Math.min(6.8,225e3/(1300*Math.max(o.v,1)))-.6*o.v*o.v/1300:-Math.min(15,(o.v-c)*6+2);o.v=Math.max(0,Math.min(68,o.v+d*t));const g=o.latGoal-o.lat;o.lat+=Math.sign(g)*Math.min(Math.abs(g),t*(1.5+o.v*.04));const v=o.s;if(o.s+=o.v*t,o.s>=a&&(o.s-=a),v>a-80&&o.s<80){if(o.crossings++,o.crossings>1){const m=this.raceTime-o.lapStart;o.last=m,(o.best===null||m<o.best)&&(o.best=m),s(o,m)}o.lapStart=this.raceTime}o.spin+=o.v*t/.33}this.collide(e,n),this.place()}collide(t,e){const n=this.track,s=(r,a,o)=>[[r+Math.cos(o)*1.15,a-Math.sin(o)*1.15],[r-Math.cos(o)*1.15,a+Math.sin(o)*1.15]];for(const r of this.cars){const a=r.obj.position;if(e){const o=s(a.x,a.z,r.heading),l=s(t.x,t.z,t.heading);for(const[c,h]of o)for(const[u,f]of l){const d=u-c,g=f-h,v=Math.hypot(d,g);if(v>.01&&v<2){const m=(2-v)/v;t.x+=d*m*.6,t.z+=g*m*.6;const p=-(d*-n.tz[n.wrap(Math.round(r.s/n.ds))]+g*n.tx[n.wrap(Math.round(r.s/n.ds))])*m*.4;r.lat=Math.max(-n.half+.5,Math.min(n.half-.5,r.lat+p));const w=t.speed-r.v;t.speed-=w*.25,r.v+=w*.2,this.bumped=!0}}}for(const o of this.cars){if(o===r)continue;let l=o.s-r.s;l<-n.length/2&&(l+=n.length),l>n.length/2&&(l-=n.length),l>0&&l<4.6&&Math.abs(o.lat-r.lat)<1.9&&(r.v=Math.min(r.v,o.v),r.s=o.s-4.6,r.s<0&&(r.s+=n.length))}}}place(){const t=this.track;for(const e of this.cars){const n=e.s/t.ds,s=Math.floor(n),r=n-s,a=t.at(s,e.lat),o=t.at(s+1,e.lat);e.obj.position.set(a[0]+(o[0]-a[0])*r,0,a[2]+(o[2]-a[2])*r);const l=Math.atan2(-(e.latGoal-e.lat),14)*.6;e.heading=t.headingAt(s)+l,e.obj.rotation.set(0,e.heading,0),e.obj.visible=this.enabled}}}const ja=16250090,wv=14083822,Ev=.95,gi=35,Za=new Ot(16633954),ce=(i,t,e)=>new D(i,t,e),ji=i=>i-Math.floor(i);function Ka(i,t){if(i==="inout")return t<.5?4*t*t*t:1-(-2*t+2)**3/2;if(i==="back")return 1+(1.45+1)*(t-1)**3+1.45*(t-1)**2;const e=7.5625,n=2.75;return t<1/n?e*t*t:t<2/n?e*(t-=1.5/n)*t+.75:t<2.5/n?e*(t-=2.25/n)*t+.9375:e*(t-=2.625/n)*t+.984375}function Kc(i,t,e,n=256){const s=document.createElement("canvas");s.width=s.height=n;const r=s.getContext("2d");if(r.fillStyle=i,r.fillRect(0,0,n,n),e){r.fillStyle=e;for(let o=1;o<4;o++)r.fillRect(o*n/4,0,1,n),r.fillRect(0,o*n/4,n,1)}r.fillStyle=t,r.fillRect(0,0,n,2),r.fillRect(0,0,2,n);const a=new ms(s);return a.wrapS=a.wrapT=us,a.colorSpace=Ee,a.anisotropy=4,a}class Tv{constructor(t,e,n){nt(this,"drive",new lv);nt(this,"track",new gv);nt(this,"rivals",new Sv(this.track));nt(this,"renderer");nt(this,"scene",new Wh);nt(this,"camera",new Ze(gi,1,.1,400));nt(this,"controls");nt(this,"mats");nt(this,"carRoot",new fn);nt(this,"insts",[]);nt(this,"byPart",new Map);nt(this,"sun");nt(this,"matMesh");nt(this,"turntable");nt(this,"matSize",new it(10,8));nt(this,"rings",[]);nt(this,"mode","mat");nt(this,"stepNo",1);nt(this,"explode",!1);nt(this,"transition","plain");nt(this,"selected",null);nt(this,"hover",null);nt(this,"labelsOn",!0);nt(this,"labelEls",new Map);nt(this,"hlCache",[new Map,new Map]);nt(this,"playing",!0);nt(this,"speed",1);nt(this,"autoplay",!0);nt(this,"fitMode",!1);nt(this,"chase",!0);nt(this,"lights",!1);nt(this,"hazard",!1);nt(this,"flyClock",0);nt(this,"clock",0);nt(this,"dirty",!0);nt(this,"last",0);nt(this,"camTween",null);nt(this,"ray",new P_);nt(this,"lastHoverAt",0);nt(this,"blinkOn",!1);nt(this,"shadowDirty",!0);nt(this,"locHint",-1);nt(this,"lastContact",0);nt(this,"body",{pitch:0,roll:0});this.canvas=t,this.labelBox=e,this.ev=n;const s=this.renderer=new Wg({canvas:t,antialias:!0,powerPreference:"high-performance"});s.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),s.toneMapping=mh,s.toneMappingExposure=1,s.shadowMap.enabled=!0,s.shadowMap.type=fh,s.shadowMap.autoUpdate=!1,this.scene.background=new Ot(ja),this.scene.fog=new ol(ja,45,190),this.makeEnv(),t.addEventListener("webglcontextrestored",()=>{var v,m;this.makeEnv(),this.shadowDirty=!0,this.dirty=!0,(m=(v=this.ev).onRestore)==null||m.call(v)}),this.scene.environmentIntensity=.75,this.scene.add(new E_(16776694,11905938,.75)),this.sun=new C_(16774884,1.9),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024),this.sun.shadow.bias=-6e-4,this.sun.shadow.normalBias=.02,this.scene.add(this.sun,this.sun.target);const r=Kc("#f6f2e6","#e7e1d0",null,128);r.repeat.set(1200,1200);const a=new Ht(new mn(2400,2400),new Ie({map:r,roughness:1,metalness:0,envMapIntensity:.2}));a.rotation.x=-Math.PI/2,a.receiveShadow=!0,this.scene.add(a);const o=Kc("#2f6350","#6fa38f","#386f5a");this.matMesh=new Ht(new mn(1,1),new Ie({map:o,roughness:.95,metalness:0,envMapIntensity:.25})),this.matMesh.rotation.x=-Math.PI/2,this.matMesh.position.y=.006,this.matMesh.receiveShadow=!0,this.scene.add(this.matMesh);const l=o.clone();l.repeat.set(8,5),this.turntable=new Ht(new mn(8,5),new Ie({map:l,roughness:.95,metalness:0,envMapIntensity:.25})),this.turntable.rotation.x=-Math.PI/2,this.turntable.position.y=.005,this.turntable.receiveShadow=!0,this.scene.add(this.turntable),this.scene.add(this.track.group,this.rivals.group),this.drive.reset(this.track.startPose);const c=new fl(.86,1,48);for(let v=0;v<8;v++){const m=new Ht(c,new ca({color:Za,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1}));m.renderOrder=10,m.visible=!1,this.scene.add(m),this.rings.push({mesh:m,t:1,r:1})}this.mats=iu();const h=su(this.mats);this.scene.add(this.carRoot);for(const v of ii){const m=h[v.id];if(!m)throw new Error("no geometry for part "+v.id);const p=[];for(const w of m){this.carRoot.add(w),w.updateMatrixWorld(!0);const S=new zn().setFromObject(w,!0),x={obj:w,def:v,idx:this.insts.length,home:w.position.clone(),homeQ:w.quaternion.clone(),matP:ce(0,0,0),matQ:new pn,ex:ce(v.ex[0]*(w.userData.sx??1),v.ex[1],v.ex[2]*(w.userData.sz??1)),center:w.worldToLocal(S.getCenter(ce(0,0,0))),radius:Math.max(.12,S.getSize(ce(0,0,0)).length()/2),scale0:w.scale.clone(),meshes:[],pending:!1,waiting:!1,waitOff:ce(0,0,0),delay:0,flyFrom:ce(0,0,0),tw:null,goal:w.position.clone(),goalQ:w.quaternion.clone(),pop:0,hub:w.userData.hub};w.traverse(I=>{const _=I;_.isMesh&&(_.userData.inst=x,x.meshes.push({mesh:_,base:_.material}))}),p.push(x),this.insts.push(x)}this.byPart.set(v.id,p)}this.layoutMat();const u=this.controls=new I_(this.camera,t);u.enableDamping=!0,u.dampingFactor=.12,u.minDistance=1.2,u.maxDistance=60,u.maxPolarAngle=Math.PI*.495,u.zoomSpeed=.9,u.addEventListener("change",()=>this.dirty=!0),u.addEventListener("start",()=>this.camTween=null);let f=0,d=0,g=-1;t.addEventListener("pointerdown",v=>{f=v.clientX,d=v.clientY,g=v.button}),t.addEventListener("pointerup",v=>{if(g!==0||Math.hypot(v.clientX-f,v.clientY-d)>5)return;const m=this.pick(v.clientX,v.clientY,!0);if(m!=null&&m.waiting){this.fit(m);return}this.ev.onPick(m?m.def.id:null)}),t.addEventListener("pointermove",v=>{if(v.buttons)return;const m=performance.now();if(m-this.lastHoverAt<45)return;this.lastHoverAt=m;const p=this.pick(v.clientX,v.clientY,!1);t.style.cursor=p?"pointer":"grab",this.ev.onHover(p?p.def.id:null,v.clientX,v.clientY,!!(p!=null&&p.waiting))}),t.addEventListener("pointerleave",()=>this.ev.onHover(null,0,0,!1)),new ResizeObserver(()=>this.resize()).observe(t.parentElement),this.resize(),this.applyMode(!0),this.snapCamera(),requestAnimationFrame(v=>this.tick(v))}makeEnv(){const t=new Bo(this.renderer);this.scene.environment=t.fromScene(new q_,.04).texture,t.dispose()}layoutMat(){const e=[],n=[...ii].sort((u,f)=>Xo.indexOf(u.cat)-Xo.indexOf(f.cat));for(const u of n){const f={def:u,w:0,d:0,h:0,items:[]};for(const d of this.byPart.get(u.id)){const g=d.obj,v=new pn;u.lay&&v.setFromAxisAngle(ce(1,0,0),-(g.userData.sz??1)*Math.PI/2),d.matQ.copy(v).multiply(d.homeQ),g.position.set(0,0,0),g.quaternion.copy(d.matQ),g.updateMatrixWorld(!0);const m=new zn().setFromObject(g,!0),p=m.getSize(ce(0,0,0));f.items.push({inst:d,box:m,w:p.x}),f.w+=p.x+(f.items.length>1?.14:0),f.d=Math.max(f.d,p.z),f.h=Math.max(f.h,p.y),g.position.copy(d.home),g.quaternion.copy(d.homeQ)}e.push(f)}const s=e.reduce((u,f)=>u+(f.w+.34)*(f.d+.34),0),r=Math.max(6,Math.sqrt(s*1.75)),a=[];let o={items:[],w:0,d:0};for(const u of e)o.items.length&&o.w+u.w>r&&(a.push(o),o={items:[],w:0,d:0}),o.items.push(u),o.w+=u.w+(o.items.length>1?.34:0),o.d=Math.max(o.d,u.d);a.push(o);const l=Math.max(...a.map(u=>u.w)),c=a.reduce((u,f)=>u+f.d,0)+.34*(a.length-1);let h=-c/2;for(const u of a){let f=-u.w/2;for(const d of u.items){const g=h+u.d/2;let v=f;for(const p of d.items){const w=p.box.getCenter(ce(0,0,0));p.inst.matP.set(v+p.w/2-w.x,.012-p.box.min.y,g-w.z),v+=p.w+.14}const m=document.createElement("div");m.className="lbl",m.textContent=(d.def.qty>1?d.def.qty+"× ":"")+d.def.name,this.labelBox.appendChild(m),this.labelEls.set(d.def.id,{el:m,anchor:ce(f+d.w/2,d.h+.12,g),w:m.offsetWidth||d.def.name.length*7+18,size:d.w*d.d}),f+=d.w+.34}h+=u.d+.34}this.matSize.set(l+.9,c+.9),this.matMesh.scale.set(this.matSize.x,this.matSize.y,1),this.matMesh.material.map.repeat.set(this.matSize.x,this.matSize.y)}setStep(t){var r,a;const e=this.mode,n=this.stepNo;this.stepNo=t+1,this.mode=t===0?"mat":t===9?"drive":"build",this.transition=e!==this.mode&&(e==="mat"||this.mode==="mat")?"shuffle":"plain";for(const o of this.insts)o.pending=!1,o.waiting=!1;for(const o of this.rings)o.t=1,o.mesh.visible=!1;e==="drive"&&this.mode!=="drive"&&(this.carRoot.position.set(0,0,0),this.carRoot.rotation.set(0,0,0)),this.mode==="drive"&&(this.drive.reset(this.track.startPose),this.rivals.toGrid(2),this.locHint=-1);const s=this.stepNo!==n&&(n<this.stepNo||e!=="build");this.mode==="build"&&(this.fitMode?this.stepNo!==n:this.autoplay&&s)?this.replay():(a=(r=this.ev).onFit)==null||a.call(r,0,0),this.applyHighlight(),this.applyMode(e!==this.mode)}snap(t=!1){this.carRoot.position.y=this.mode==="drive"?0:this.rootLift();for(const e of this.insts){if(e.pending||e.waiting)continue;const n=this.targetOf(e),s=this.mode==="mat"?e.matQ:e.homeQ;e.obj.visible=this.mode!=="build"||e.def.step<=this.stepNo,e.obj.position.copy(n),e.obj.quaternion.copy(s),e.goal.copy(n),e.goalQ.copy(s),e.tw=null,t&&this.mode==="mat"&&(e.tw={from:n.clone().add(ce(0,1.4+ji(e.idx*.37)*1.6,0)),fromQ:s.clone(),t:0,delay:.15+ji(e.idx*.618)*.7,dur:.9,arc:0,ease:"bounce",land:!1},e.obj.position.copy(e.tw.from))}this.snapCamera(),this.shadowDirty=!0,this.dirty=!0}replay(){var r,a;if(this.mode!=="build")return;let t=0,e=0;const n=this.insts.filter(o=>o.def.step===this.stepNo),s=Math.ceil(n.length/7);n.forEach((o,l)=>{const c=Math.floor(l/7),h=Math.min(7,n.length-c*7),u=l%7,f=h>1?-1.9+3.8*u/(h-1):0;o.waitOff.set(f,1.15+(s-1-c)*.8+Math.min(.4,o.radius*.2),1.75+c*.25)});for(const o of ii){if(o.step!==this.stepNo)continue;let l=0;for(const c of this.byPart.get(o.id)){const h=c.ex.lengthSq()>.001?c.ex.clone().normalize():ce(0,1,0);c.tw=null,this.fitMode?(c.waiting=!0,c.pending=!1,c.delay=t*.09+l*.05,c.obj.visible=!1):(c.pending=!0,c.delay=.25+t*.32+l*.07,c.flyFrom.copy(h).multiplyScalar(1.2).add(ce(0,.55,0))),e++,l++}t++}this.flyClock=0,this.playing=!0,this.fitMode&&(this.applyHighlight(),(a=(r=this.ev).onFit)==null||a.call(r,e,e),this.camTween=this.tweenTo(this.defaultView())),this.dirty=!0}setFitMode(t){var e,n;if(this.fitMode=t,this.mode==="build")if(t)this.replay();else{for(const s of this.insts)s.waiting&&(s.waiting=!1,s.tw=null,s.obj.visible=!0);this.applyHighlight(),(n=(e=this.ev).onFit)==null||n.call(e,0,0),this.camTween=this.tweenTo(this.defaultView())}}waitingOf(t){return(this.byPart.get(t)??[]).filter(e=>e.waiting).length}fitPart(t){var n;const e=(n=this.byPart.get(t))==null?void 0:n.find(s=>s.waiting);return e&&this.fit(e),!!e}fit(t){var s,r;t.waiting=!1,t.tw={from:t.obj.position.clone(),fromQ:t.obj.quaternion.clone(),t:0,delay:0,dur:.7,arc:.35,ease:"back",land:!0},t.goal.copy(this.targetOf(t)),t.goalQ.copy(t.homeQ),this.applyHighlight();const e=this.insts.filter(a=>a.waiting).length,n=this.insts.filter(a=>a.def.step===this.stepNo).length;(r=(s=this.ev).onFit)==null||r.call(s,e,n),e||(this.camTween=this.tweenTo(this.defaultView())),this.dirty=!0}setPlaying(t){this.playing=t,this.dirty=!0}setExplode(t){t!==this.explode&&(this.transition="explode"),this.explode=t,this.mode==="build"&&(this.camTween=this.tweenTo(this.defaultView())),this.dirty=!0}setLabels(t){this.labelsOn=t,this.labelBox.style.display=this.mode==="mat"&&t?"":"none",this.dirty=!0}setChase(t){this.chase=t,this.controls.enabled=!(this.mode==="drive"&&t),t||this.controls.update(),this.dirty=!0}setShadows(t){this.sun.castShadow=t,this.shadowDirty=!0,this.dirty=!0}setStartLights(t){this.track.setLights(t),this.dirty=!0}setPaint(t){this.mats.paint.color.setHex(t),this.hlCache.forEach(e=>e.clear()),this.applyHighlight()}setSelected(t){if(t&&t!==this.selected)for(const e of this.byPart.get(t)??[])e.pop=1;this.selected=t,this.applyHighlight()}setHover(t){this.hover!==t&&(this.hover=t,this.applyHighlight())}zoom(t){const e=this.camera.position.clone().sub(this.controls.target),n=Zn.clamp(e.length()*t,this.controls.minDistance,this.controls.maxDistance);this.camTween=this.tweenTo({pos:this.controls.target.clone().add(e.setLength(n)),target:this.controls.target.clone()},.35),this.dirty=!0}resetView(){this.camTween=this.tweenTo(this.defaultView()),this.dirty=!0}focus(t){const e=this.byPart.get(t);if(!e||this.mode==="drive")return;const n=e.filter(a=>a.obj.visible);if(!n.length)return;const s=ce(0,0,0);for(const a of n)s.add(this.targetOf(a).add(ce(0,this.rootLift(),0)));if(s.multiplyScalar(1/n.length),n.length>1&&this.mode!=="mat")return;const r=s.clone().sub(this.controls.target);this.camTween=this.tweenTo({pos:this.camera.position.clone().add(r),target:s})}setLights(t){this.lights=t,this.applyLamps()}setHazard(t){this.hazard=t,this.applyLamps()}thumbnail(t,e=176,n=128){if(this.renderer.getContext().isContextLost())return null;const s={mode:this.mode,step:this.stepNo,explode:this.explode,camP:this.camera.position.clone(),camQ:this.camera.quaternion.clone(),fov:this.camera.fov,rootP:this.carRoot.position.clone(),rootQ:this.carRoot.quaternion.clone(),insts:this.insts.map(a=>({p:a.obj.position.clone(),q:a.obj.quaternion.clone(),v:a.obj.visible})),pr:this.renderer.getPixelRatio()};this.stepNo=t+1,this.mode=t===0?"mat":t===9?"drive":"build",this.explode=!1,this.setStage(),this.carRoot.position.set(0,0,0),this.carRoot.quaternion.identity();for(const a of this.insts)a.obj.visible=this.mode!=="build"||a.def.step<=this.stepNo,a.obj.position.copy(this.targetOf(a)),a.obj.quaternion.copy(this.mode==="mat"?a.matQ:a.homeQ);if(this.renderer.setPixelRatio(1),this.renderer.setSize(e,n,!1),this.camera.fov=gi,this.camera.aspect=e/n,this.camera.updateProjectionMatrix(),this.mode==="mat"){const a=this.defaultView();this.camera.position.copy(a.pos),this.camera.lookAt(a.target)}else this.camera.position.set(4.3,2.3,4.9),this.camera.lookAt(0,.55,0);this.sun.position.set(5,11,6.5),this.sun.target.position.set(0,0,0),this.sun.target.updateMatrixWorld(),this.renderer.shadowMap.needsUpdate=!0,this.renderer.render(this.scene,this.camera);const r=this.renderer.getContext().isContextLost()?null:this.canvas.toDataURL("image/jpeg",.82);return this.mode=s.mode,this.stepNo=s.step,this.explode=s.explode,this.setStage(),this.carRoot.position.copy(s.rootP),this.carRoot.quaternion.copy(s.rootQ),this.insts.forEach((a,o)=>{a.obj.position.copy(s.insts[o].p),a.obj.quaternion.copy(s.insts[o].q),a.obj.visible=s.insts[o].v}),this.camera.position.copy(s.camP),this.camera.quaternion.copy(s.camQ),this.camera.fov=s.fov,this.renderer.setPixelRatio(s.pr),this.resize(),this.shadowDirty=!0,this.draw(!1),r}debug(){return{mode:this.mode,step:this.stepNo,parts:this.byPart.size,instances:this.insts.length,visible:this.insts.filter(t=>t.obj.visible).length,waiting:this.insts.filter(t=>t.waiting).length,triangles:this.renderer.info.render.triangles,calls:this.renderer.info.render.calls}}screenOf(t){var r;const e=(r=this.byPart.get(t))==null?void 0:r[0];if(!e)return null;const n=e.obj.localToWorld(e.center.clone()).project(this.camera),s=this.canvas.getBoundingClientRect();return[s.left+(n.x+1)/2*s.width,s.top+(1-n.y)/2*s.height]}rootLift(){return this.mode==="build"&&this.explode?Ev:0}targetOf(t){if(this.mode==="mat")return t.matP.clone();const e=t.home.clone();return this.mode==="build"&&this.explode&&e.add(t.ex),e}defaultView(){const t=this.camera.aspect,e=Math.min(Zn.degToRad(gi/2),Math.atan(Math.tan(Zn.degToRad(gi/2))*t)),n=o=>o/Math.sin(e);if(this.mode==="mat"){const o=ce(0,.84,.54).normalize(),l=Math.tan(Zn.degToRad(gi/2)),c=Math.max(this.matSize.x/2/(l*t),this.matSize.y/2*o.y/l)*1.3+this.matSize.y*.1,h=ce(0,0,-.2);return{target:h,pos:h.clone().addScaledVector(o,c)}}if(this.mode==="drive"){const o=this.drive,l=ce(Math.cos(o.heading),0,-Math.sin(o.heading)),c=ce(o.x,0,o.z),h=6.4+Math.min(1,Math.abs(o.speed)/68)*1.6;return{target:c.clone().add(ce(0,.8,0)).addScaledVector(l,1.2+Math.abs(o.speed)*.04),pos:c.clone().addScaledVector(l,-h).add(ce(0,2.4,0))}}const s=this.explode,r=this.insts.some(o=>o.waiting),a=ce(0,s?1.6:r?.95:.62,r&&!s?.7:0);return{target:a,pos:a.clone().add(ce(.62,.34,.7).normalize().multiplyScalar(n(s?3.9:r?3.1:2.3)))}}snapCamera(){const t=this.defaultView();this.camera.position.copy(t.pos),this.controls.target.copy(t.target),this.camTween=null,this.controls.update()}tweenTo(t,e=.95){return{fromP:this.camera.position.clone(),fromT:this.controls.target.clone(),pos:t.pos,target:t.target,t:0,dur:e}}setStage(){const t=this.mode==="drive";this.matMesh.visible=this.mode==="mat",this.turntable.visible=this.mode==="build",this.track.group.visible=t,this.rivals.group.visible=t;const e=this.scene.fog,n=t?wv:ja;this.scene.background.setHex(n),e.color.setHex(n),e.near=t?140:45,e.far=t?700:190,this.camera.far=t?1200:400,this.camera.near=t?.3:.1,t||(this.camera.fov=gi),this.camera.updateProjectionMatrix();const s=this.sun.shadow.camera,r=this.mode==="mat"?Math.max(this.matSize.x,this.matSize.y)/2+1:t?7:5.5;s.left=-r,s.right=r,s.top=r,s.bottom=-r,s.near=1,s.far=60,s.updateProjectionMatrix()}applyMode(t){if(this.setStage(),this.labelBox.style.display=this.mode==="mat"&&this.labelsOn?"":"none",this.controls.enabled=!(this.mode==="drive"&&this.chase),t&&(this.camTween=this.mode==="drive"?null:this.tweenTo(this.defaultView(),1.2)),t&&this.mode==="drive"){const e=this.defaultView();this.camera.position.copy(e.pos),this.controls.target.copy(e.target),this.camera.lookAt(e.target)}this.applyLamps(),this.shadowDirty=!0,this.dirty=!0}applyLamps(){const t=this.mode==="drive",e=t&&this.hazard&&this.blinkOn,{lens:n,tail:s}=this.mats;n.emissive.setHex(e?16750592:16773580),n.emissiveIntensity=e?2.2:t&&this.lights?1.7:0,s.emissive.setHex(e?16747008:16718370),s.emissiveIntensity=e?2.2:t&&this.drive.braking?2.4:t&&this.lights?.7:.08,this.dirty=!0}hlMat(t,e){const n=this.hlCache[e-1];let s=n.get(t);if(!s){s=t.clone();const r=s;r.emissive&&(r.color=r.color.clone().lerp(Za,e===2?.85:.35),r.emissive=Za.clone(),r.emissiveIntensity=e===2?.42:.16,r.emissiveMap=null,e===2&&(r.map=null,r.metalness=Math.min(r.metalness,.2),r.roughness=Math.max(r.roughness,.45))),r.transparent&&(r.opacity=Math.min(1,r.opacity+.25)),n.set(t,s)}return s}applyHighlight(){for(const t of this.insts){const e=t.def.id===this.selected?2:t.def.id===this.hover||t.waiting?1:0;for(const{mesh:n,base:s}of t.meshes)n.material=e?this.hlMat(s,e):s}for(const[t,e]of this.labelEls)e.el.classList.toggle("on",t===this.selected),e.el.classList.toggle("hot",t===this.hover);this.dirty=!0}pick(t,e,n){const s=this.canvas.getBoundingClientRect();this.ray.setFromCamera(new it((t-s.left)/s.width*2-1,-((e-s.top)/s.height)*2+1),this.camera);const r=this.insts.filter(c=>c.obj.visible).map(c=>c.obj),a=this.ray.intersectObjects(r,!0);if(!a.length)return null;const o=a.find(c=>c.object.userData.inst.waiting);if(o)return o.object.userData.inst;const l=a[0].object.userData.inst;if(n&&l.def.id===this.selected){const c=a.find(h=>h.object.userData.inst.def.id!==this.selected);if(c)return c.object.userData.inst}return l}resize(){const t=this.canvas.parentElement,e=Math.max(50,t.clientWidth),n=Math.max(50,t.clientHeight);this.renderer.setSize(e,n,!1),this.camera.aspect=e/n,this.camera.updateProjectionMatrix(),this.dirty=!0}ring(t){const e=this.rings.find(n=>n.t>=1)??this.rings[0];e.t=0,e.r=Math.min(.9,t.radius*.8+.15),e.mesh.position.copy(t.obj.localToWorld(t.center.clone())),e.mesh.visible=!0}animate(t){var a,o;let e=!1;this.playing&&(this.flyClock+=t*this.speed);const n=this.mode==="drive",s=1-Math.exp(-t*5.5);if(n){const l=this.drive,c=1-Math.exp(-t*6);this.body.pitch+=(Zn.clamp(l.accel,-22,12)*.0016-this.body.pitch)*c,this.body.roll+=(Zn.clamp(-l.aLat,-20,20)*.0013-this.body.roll)*c,this.carRoot.position.set(l.x,0,l.z),this.carRoot.rotation.set(this.body.roll,l.heading,this.body.pitch,"YXZ")}else{const l=this.rootLift(),c=l-this.carRoot.position.y;Math.abs(c)>1e-4?(this.carRoot.position.y+=c*(1-Math.exp(-t*4)),e=!0):this.carRoot.position.y=l}let r=.01;if(this.transition==="explode")for(const l of this.insts)r=Math.max(r,l.ex.length());for(const l of this.insts){const c=l.obj;if(!(this.mode!=="build"||l.def.step<=this.stepNo)){c.visible&&(c.visible=!1,e=!0),l.tw=null;continue}const u=this.targetOf(l),f=this.mode==="mat"?l.matQ:l.homeQ;if(l.pending){if(this.flyClock<l.delay){c.visible&&(c.visible=!1,e=!0),this.playing&&(e=!0);continue}l.pending=!1,c.visible=!0;const d=new pn().setFromEuler(new _n((ji(l.idx*.31)-.5)*.7,(ji(l.idx*.53)-.5)*.9,(ji(l.idx*.71)-.5)*.7));l.tw={from:u.clone().add(l.flyFrom),fromQ:f.clone().multiply(d),t:0,delay:0,dur:.85,arc:.4,ease:"back",land:!0},l.goal.copy(u),l.goalQ.copy(f)}else if(l.waiting){const d=l.waitOff.clone();if(!c.visible){if(this.flyClock<l.delay){e=!0;continue}c.visible=!0,l.tw={from:d.clone().add(ce(0,1.4,0)),fromQ:f.clone(),t:0,delay:0,dur:.6,arc:0,ease:"back",land:!1}}if(!l.tw){c.position.copy(d).add(ce(0,Math.sin(this.clock*2.4+l.idx)*.05,0)),c.quaternion.copy(f),e=!0,this.applyPop(l,t);continue}l.goal.copy(d),l.goalQ.copy(f)}else if(!c.visible)c.visible=!0,c.position.copy(u),c.quaternion.copy(f),l.goal.copy(u),l.goalQ.copy(f),l.tw=null,e=!0;else if(l.goal.distanceToSquared(u)>1e-8||l.goalQ.angleTo(f)>1e-4){const d=this.transition==="shuffle",g=d?ji(l.idx*.618)*.55:this.transition==="explode"?l.ex.length()/r*.28:0;l.tw={from:c.position.clone(),fromQ:c.quaternion.clone(),t:0,delay:g,dur:d?1:.8,arc:d?.5+l.radius*.3:0,ease:"inout",land:!1},l.goal.copy(u),l.goalQ.copy(f)}if(l.tw){const d=l.tw;(this.playing||!d.land)&&(d.t+=t*this.speed),e=!0;const g=Zn.clamp((d.t-d.delay)/d.dur,0,1),v=Ka(d.ease,g);c.position.lerpVectors(d.from,l.goal,v),c.position.y+=Math.sin(Math.PI*g)*d.arc,c.quaternion.slerpQuaternions(d.fromQ,l.goalQ,Math.min(1,v)),g>=1&&(c.position.copy(l.goal),c.quaternion.copy(l.goalQ),l.tw=null,d.land&&(this.ring(l),l.pop=.6,(o=(a=this.ev).onLand)==null||o.call(a,l.def.id)))}else if(n&&l.hub){const d=this.drive;c.rotation.set(0,(l.hub.left?Math.PI:0)-(l.hub.front?d.steer:0),l.hub.spin?l.hub.left?d.wheelAngle:-d.wheelAngle:0,"YXZ")}else{c.position.distanceToSquared(l.goal)>1e-8&&(c.position.lerp(l.goal,s),e=!0);const g=c.quaternion.angleTo(l.goalQ);g>.001?(c.quaternion.slerp(l.goalQ,s),e=!0):g>0&&c.quaternion.copy(l.goalQ)}this.applyPop(l,t)&&(e=!0)}for(const l of this.rings){if(l.t>=1)continue;l.t=Math.min(1,l.t+t*2.2);const c=l.r*(.35+Ka("inout",l.t)*1.1);l.mesh.scale.setScalar(c),l.mesh.quaternion.copy(this.camera.quaternion),l.mesh.material.opacity=.95*(1-l.t),l.mesh.visible=l.t<1,e=!0}return e}applyPop(t,e){if(t.pop<=0)return!1;t.pop=Math.max(0,t.pop-e*3);const n=1+Math.sin(t.pop*Math.PI)*.06;return t.obj.scale.copy(t.scale0).multiplyScalar(n),!0}updateLabels(){if(this.mode!=="mat"||!this.labelsOn)return;const t=this.canvas.clientWidth,e=this.canvas.clientHeight,n=[...this.labelEls.entries()].sort((a,o)=>{const l=a[0]===this.selected||a[0]===this.hover?1:0;return(o[0]===this.selected||o[0]===this.hover?1:0)-l||o[1].size-a[1].size}),s=[],r=ce(0,0,0);for(const[a,o]of n){r.copy(o.anchor).project(this.camera);const l=(r.x+1)/2*t,c=(1-r.y)/2*e,h=a===this.selected||a===this.hover,u=l-o.w/2,f=c-22;let d=r.z<1&&l>4&&l<t-4&&c>26&&c<e-2;d&&!h&&(d=!s.some(g=>u<g[2]+4&&u+o.w>g[0]-4&&f<g[3]+3&&f+20>g[1]-3)),o.el.style.display=d?"":"none",d&&(s.push([u,f,u+o.w,f+20]),o.el.style.transform=`translate(${Math.round(u)}px, ${Math.round(f)}px)`)}}driveStep(t,e){var m,p,w,S;const n=this.drive,s=this.track,r=n.x,a=n.z,o=n.braking,l={track:[1.45,0],kerb:[1.35,.01],grass:[.55,.22],gravel:[.42,.5]},[c,h]=l[n.surface];n.update(t,c,h);const u=s.locate(n.x,n.z,this.locHint);this.locHint=u.i,n.s=u.s,n.lat=u.lat;const f=Math.abs(u.lat);if(n.surface=s.surfaceAt(u.i,u.lat),this.rivals.locked=n.locked,this.rivals.update(t,n,!0,(x,I)=>{var _,b;return(b=(_=this.ev).onRivalLap)==null?void 0:b.call(_,x,I)}),this.rivals.bumped){this.rivals.bumped=!1;const x=performance.now();x-this.lastContact>500&&(this.lastContact=x,(p=(m=this.ev).onBump)==null||p.call(m))}const d=s.wall-1.2;if(f>d){const x=u.i,I=Math.sign(u.lat),_=u.lat-I*d;n.x+=s.tz[x]*_,n.z-=s.tx[x]*_;const b=-s.tz[x]*I,E=s.tx[x]*I,M=Math.cos(n.heading)*n.speed,y=-Math.sin(n.heading)*n.speed,P=M*b+y*E;if(P>.3){const k=M-P*b,B=y-P*E,j=Math.hypot(k,B)*.92;if(j>.5){const Q=n.speed>=0?1:-1;n.heading=Math.atan2(-B*Q,k*Q)+I*Q*.04,n.speed=j*Q}else n.speed*=.5;const q=performance.now();P>3&&q-this.lastContact>700&&(this.lastContact=q,(S=(w=this.ev).onContact)==null||S.call(w,P))}}const g=this.hazard&&Math.floor(e/380)%2===0;(g!==this.blinkOn||o!==n.braking)&&(this.blinkOn=g,this.applyLamps());let v=n.moving;if(this.chase){const x=this.defaultView();this.camera.position.lerp(x.pos,1-Math.exp(-t*3.6)),this.controls.target.lerp(x.target,1-Math.exp(-t*8));const I=Math.abs(n.speed),_=Math.max(0,I-35)/33*.012+(n.surface!=="track"&&I>3?.02:0);_>0&&(this.camera.position.y+=(Math.sin(e*.071)+Math.sin(e*.113))*_),this.camera.lookAt(this.controls.target);const b=gi+Math.min(1,I/68)*12;Math.abs(b-this.camera.fov)>.05&&(this.camera.fov+=(b-this.camera.fov)*(1-Math.exp(-t*3)),this.camera.updateProjectionMatrix()),this.camera.position.distanceToSquared(x.pos)>1e-4&&(v=!0)}else{const x=n.x-r,I=n.z-a;this.camera.position.x+=x,this.camera.position.z+=I,this.controls.target.x+=x,this.controls.target.z+=I}return this.ev.onDrive(n),v}tick(t){requestAnimationFrame(s=>this.tick(s));const e=Math.min(.05,(t-this.last)/1e3||.016);this.last=t,this.clock+=e;let n=!1;if(this.mode==="drive"&&this.driveStep(e,t)&&(n=!0),this.animate(e)&&(n=!0),this.camTween&&!(this.mode==="drive"&&this.chase)){const s=this.camTween;s.t+=e;const r=Ka("inout",Math.min(1,s.t/s.dur));this.camera.position.lerpVectors(s.fromP,s.pos,r),this.controls.target.lerpVectors(s.fromT,s.target,r),s.t>=s.dur&&(this.camTween=null),this.dirty=!0}this.controls.enabled&&this.controls.update(),(n||this.dirty)&&this.draw(n)}draw(t){const e=this.mode==="drive"?this.carRoot.position:ce(0,0,0);this.sun.position.set(e.x+5,11,e.z+6.5),this.sun.target.position.set(e.x,0,e.z),(t||this.shadowDirty)&&(this.renderer.shadowMap.needsUpdate=!0,this.shadowDirty=!1),this.renderer.render(this.scene,this.camera),this.updateLabels(),this.dirty=!1}}const se={get(i,t){try{const e=localStorage.getItem("carkit."+i);return e===null?t:JSON.parse(e)}catch{return t}},set(i,t){try{localStorage.setItem("carkit."+i,JSON.stringify(t))}catch{}}},da=[["Navy",1981020],["Red",13121325],["Chalk",15525849],["Graphite",2831174],["Green",2071160]],z={step:0,part:null,explode:!1,ticks:new Set(se.get("ticks",[])),paint:se.get("paint",0),mph:se.get("mph",!1),labels:se.get("labels",!0),shadows:se.get("shadows",!0),autoplay:se.get("autoplay",!0),fit:se.get("fit",!1),sound:se.get("sound",!0),manual:se.get("manual",!1),realRevs:se.get("realRevs",!1),railMin:se.get("railMin",!1),panelMin:se.get("panelMin",!1),rivals:se.get("rivals",!0)},gl="v5",sa="Morish Macayan",ou="https://moriyamao.github.io/morish-portfolio/",Ri=3,Re=i=>i.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),Av=i=>ii.filter(t=>t.step===i),Rv=i=>i.step-1;function _l(i){return i===0?ii.map(t=>"bom:"+t.id):sn[i].todo.map((t,e)=>`do:${i}:${e}`)}const ra=i=>_l(i).filter(t=>z.ticks.has(t)).length,Os=document.getElementById("app");Os.innerHTML=`
<header class="top">
  <button class="icon menu" id="btnRail" aria-label="Build order" aria-controls="rail" title="Show or hide the build order (B)">
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/><path d="M5.5 8h1M5.5 11h1M5.5 14h1"/></svg>
  </button>
  <a class="brand" href="#parts" aria-label="CarKit, start of the build">
    <span class="plate">27</span>
    <span class="word">CARKIT</span>
  </a>
  <span class="tagline">Race car, built part by part</span>
  <span class="grow"></span>
  <span class="cap">Livery</span>
  <div class="paints" role="radiogroup" aria-label="Paint colour">
    ${da.map(([i,t],e)=>`<button role="radio" class="sw" data-paint="${e}" title="${i}" aria-label="${i} paint" style="--c:#${t.toString(16).padStart(6,"0")}"><span>${i}</span></button>`).join("")}
  </div>
  <button class="icon side-btn" id="btnPanel" aria-label="Instructions" aria-controls="side" title="Show or hide the instructions (I)">
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M15 4v16"/><path d="M17.5 8h1M17.5 11h1M17.5 14h1"/></svg>
  </button>
  <button class="icon" id="btnSettings" aria-label="Settings" title="Settings">
    <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7.3 7.3 0 0 0-1.7-1L15 3.5h-4l-.4 2.5a7.3 7.3 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a7.6 7.6 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7.3 7.3 0 0 0 1.7 1l.4 2.5h4l.4-2.5a7.3 7.3 0 0 0 1.7-1l2.4 1 2-3.4zM13 15.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4z" transform="translate(-1 0)"/></svg>
  </button>
</header>
<main class="main">
  <nav class="rail" id="rail" aria-label="Build order">
    <div class="rail-head"><span>Build order</span><b id="railCount"></b></div>
    <div class="rail-list" id="strip"></div>
    <div class="rail-foot"><div class="rail-bar"><i id="railBar"></i></div><span id="railNote"></span><span class="ver">${gl}</span><a class="credit" href="${ou}" target="_blank" rel="noopener">Made by <b>${sa}</b></a></div>
  </nav>
  <section class="bench">
    <div class="stage">
      <canvas id="gl"></canvas>
      <div class="labels" id="labels"></div>
      <div class="tag" id="tag"></div>
      <div class="bench-head" id="benchHead"><span class="chip" id="benchIcon"></span><div><div class="bench-title" id="benchTitle"></div><div class="bench-sub" id="benchSub"></div><div class="fitbar" id="fitbar"></div></div><span class="status" id="benchStatus"><i></i>Live</span></div>
      <div class="tele" id="tele"></div>
      <div class="laps" id="laps">
        <div class="lap-pos" id="lapPos"></div>
        <div class="lap-top"><span>Lap</span><b id="lapN">Out</b></div>
        <div class="lap-time" id="lapTime">0:00.000</div>
        <div class="lap-secs"><i id="sec0">S1</i><i id="sec1">S2</i><i id="sec2">S3</i></div>
        <div class="lap-best"><span>Best</span><b id="lapBest">—</b></div>
      </div>
      <canvas class="minimap" id="minimap" aria-label="Track map"></canvas>
      <div class="lights" id="lights" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
      <div class="toast" id="toast" role="status"></div>
      <div class="results" id="results" role="dialog" aria-label="Race result"></div>
      <button class="guide-fab" id="guideFab" aria-label="Show the instructions"><span class="num" id="fabNum">1</span><b id="fabTitle"></b><i>›</i></button>
      <div class="touchpad" id="touchpad">
        <div class="tp-l"><button data-key="left" aria-label="Steer left">◀</button><button data-key="right" aria-label="Steer right">▶</button></div>
        <div class="tp-r"><button class="tp-brake" data-key="brake" aria-label="Brake">Brake</button><button class="tp-gas" data-key="up" aria-label="Accelerate">Gas</button></div>
      </div>
      <div class="tools" id="tools"></div>
      <div class="hint" id="hint"></div>
    </div>
  </section>
  <aside class="side" id="side">
    <button class="side-tab" id="sideTab" aria-label="Show the instructions" title="Show the instructions (I)"><span class="num" id="sideNum">1</span><span class="side-t" id="sideTitle"></span><i>‹</i></button>
    <div class="panel" id="panel"></div>
  </aside>
</main>
<div class="scrim" id="scrim"></div>
<dialog id="settings" class="dlg"></dialog>`;const qt=i=>document.getElementById(i),je=qt("panel"),xi=qt("strip"),Cv=qt("tools"),Ja=qt("tag"),lu=qt("tele"),at=new Tv(qt("gl"),qt("labels"),{onPick:i=>{kn(z.step,i),i&&rr.matches&&tr(!0)},onHover:(i,t,e,n)=>{if(at.setHover(i),sr(i),i){const s=qt("gl").getBoundingClientRect();Ja.textContent=(n?"Click to fit · ":"")+ia[i].name,Ja.style.transform=`translate(${Math.round(t-s.left+14)}px, ${Math.round(e-s.top+14)}px)`}Ja.classList.toggle("show",!!i)},onDrive:i=>{Vv(i),zv(i);const t=Bv(i);Ci.update(i,t),Nv(i,t)},onFit:(i,t)=>Hv(i,t),onLand:()=>wi(1),onContact:i=>{wi(.45,Math.min(1,i/20)),Ce(`Contact with the barrier at ${fu(i).join(" ")}`),yt.start>=0&&!yt.invalid&&(yt.invalid=!0),un("Contact! Lap deleted","warn")},onBump:()=>{wi(.5,.6),Ce("Contact with another car")},onRivalLap:i=>{Ve.on&&i.crossings>Ri&&i.finished===null&&(i.finished=at.rivals.raceTime,Ce(`#${i.number} ${i.name} takes the flag`))},onRestore:()=>Su()});at.rivals.enabled=z.rivals;at.fitMode=z.fit;at.drive.manual=z.manual;lu.innerHTML=`
  <div><span>Speed</span><b><em id="tSpeed">0</em><small id="tUnit">km/h</small></b></div>
  <div><span>Engine</span><b><em id="tRpm">1100</em><small>rpm</small></b></div>
  <div class="gearbox" id="tGearBox"><span id="tMode">Gear</span><b id="tGear">N</b><i id="tShift"></i></div>
  <div><span>Steering</span><b><em id="tSteer">0</em>°</b></div>
  <div class="hudleds" id="hudShift">${"<i></i>".repeat(10)}</div>`;at.setPaint(da[z.paint][1]);at.setLabels(z.labels);at.setShadows(z.shadows);at.autoplay=z.autoplay;const Ks=Array(10).fill(null);window.carkit={viewer:at,state:z};const Un={wrench:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 6.5a4 4 0 0 0 5 5L11 20a2.1 2.1 0 0 1-3-3z"/><path d="m14.5 6.5 3-3"/></svg>',wheel:'<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2"/><path d="M12 14v6M10.2 11 4.5 9M13.8 11l5.7-2"/></svg>',pause:'<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',play:'<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M8 5.5v13l11-6.500z"/></svg>',layers:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3 3 7.5l9 4.5 9-4.5z"/><path d="m3 12 9 4.5 9-4.5"/><path d="m3 16.5 9 4.5 9-4.5"/></svg>',cam:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="7" width="12" height="10" rx="2"/><path d="m15 11 6-3v8l-6-3z"/></svg>',replay:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.6-5.9"/><path d="M4 4v4.5h4.500"/></svg>',hand:'<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12"/><path d="M11 11.5V4a1.5 1.5 0 0 1 3 0v7.5"/><path d="M14 11.5V6a1.5 1.5 0 0 1 3 0v8a7 7 0 0 1-7 7h-.5a6 6 0 0 1-4.6-2.2L3.5 16a1.6 1.6 0 0 1 2.400-2.100L8 16"/></svg>',home:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11.500 12 5l8 6.500"/><path d="M6.500 10v9h11v-9"/></svg>'};function kn(i,t=null){const e="#"+sn[i].slug+(t?"-"+t:"");location.hash===e?vl():location.hash=e}function vl(){const[i,t]=location.hash.replace(/^#/,"").split("-");let e=sn.findIndex(a=>a.slug===i);e<0&&(e=0);const n=t&&ia[t]?t:null,s=!Jc,r=e!==z.step||s;if(Jc=!0,z.step=e,z.part=n,r){(e===0||e===9)&&(z.explode=!1),at.setExplode(z.explode),at.setStep(e),s&&at.snap(e===0);for(const a of Object.keys(at.drive.input))at.drive.input[a]=!1;e===9?Oe("resetcar"):_u()}at.setSelected(n),Js()}let Jc=!1;window.addEventListener("hashchange",vl);let Qc=-1;function Js(){const i=sn[z.step],t=z.step===9;if(Qc!==z.step){Qc=z.step;const e=qt("benchHead");e.classList.remove("swap"),e.offsetWidth,e.classList.add("swap")}qt("laps").classList.toggle("show",t),qt("touchpad").classList.toggle("show",t),qt("sideNum").textContent=qt("fabNum").textContent=String(z.step+1),qt("sideTitle").textContent=qt("fabTitle").textContent=z.part?ia[z.part].name:i.title,t||qt("results").classList.remove("show"),qt("minimap").classList.toggle("show",t),t&&Mu(at.drive),gu(),qt("benchIcon").innerHTML=t?Un.wheel:Un.wrench,qt("benchStatus").classList.toggle("show",t),qt("benchTitle").textContent=t?"Race circuit":"Workbench",qt("benchSub").textContent=t?"CarKit Circuit · 4.5 km · race of 3 laps · W A S D to drive":`Step ${z.step+1} · ${i.title}`,qt("hint").textContent=t?"":"Drag to turn · wheel to zoom · right-drag to move · click a part",lu.classList.toggle("show",t),document.querySelectorAll(".sw").forEach((e,n)=>e.setAttribute("aria-checked",String(n===z.paint))),Pv(),cu(),z.part?Dv(ia[z.part]):t?Iv():du()}function Pv(){const i=z.step>0&&z.step<9,t=z.step===9;Cv.innerHTML=`
    ${i?`<button class="tb fit ${z.fit?"on":""}" data-act="fit" title="Fit the parts yourself (F)" aria-label="Fit the parts yourself" aria-pressed="${z.fit}">${Un.hand}<span>Fit</span></button>
    ${z.fit?"":`<button class="tb accent" data-act="play" title="${at.playing?"Pause":"Play"} the assembly (Space)" aria-label="Play or pause">${at.playing?Un.pause:Un.play}</button>
    <button class="tb small" data-act="speed" title="Animation speed" aria-label="Animation speed">${at.speed}×</button>`}
    <button class="tb" data-act="replay" title="${z.fit?"Take this step's parts off again":"Replay this step"} (R)" aria-label="Replay this step">${Un.replay}</button><span class="tsep"></span>`:""}
    <button class="tb" data-act="zin" title="Zoom in" aria-label="Zoom in">+</button>
    <button class="tb" data-act="zout" title="Zoom out" aria-label="Zoom out">−</button>
    <button class="tb" data-act="home" title="Reset the view (0)" aria-label="Reset the view">${Un.home}</button><span class="tsep"></span>
    ${i?`<button class="tb ${z.explode?"on":""}" data-act="explode" title="Exploded view (E)" aria-label="Exploded view" aria-pressed="${z.explode}">${Un.layers}</button>`:""}
    ${z.step===0?`<button class="tb small ${z.labels?"on":""}" data-act="labels" title="Part labels (L)" aria-label="Part labels" aria-pressed="${z.labels}">Aa</button>`:""}
    ${t?`<button class="tb ${at.chase?"on":""}" data-act="chase" title="Chase camera (C)" aria-label="Chase camera" aria-pressed="${at.chase}">${Un.cam}</button>`:""}`}function cu(){let i=0;xi.innerHTML=sn.map((e,n)=>{const s=_l(n).length,r=ra(n),a=s>0&&r===s;return a&&i++,`<button class="st ${n===z.step?"cur":""} ${a?"full":""}" data-step="${n}" aria-current="${n===z.step?"step":"false"}" title="Step ${n+1}: ${e.title}">
      <span class="st-n">${n+1}</span>
      <span class="st-pic">${Ks[n]?`<img src="${Ks[n]}" alt="" draggable="false">`:"<em></em>"}</span>
      <span class="st-t">${e.short}</span>
      <span class="st-prog">${s?a?"✓":`${r}/${s}`:""}</span></button>`}).join("");const t=xi.querySelector(".cur");t&&xi.scrollWidth>xi.clientWidth&&(xi.scrollLeft=t.offsetLeft-(xi.clientWidth-t.offsetWidth)/2),qt("railCount").textContent=`${z.step+1} / 10`,qt("railBar").style.width=`${i/9*100}%`,qt("railNote").textContent=i===9?"All steps ticked off":`${i} of 9 steps ticked off`}const Lv=i=>`<span class="qty">${i.qty}×</span>`,th=(i,t)=>`
  <div class="row ${t?"":"need"}" data-row="${i.id}">
    ${t?`<input type="checkbox" class="cb" data-tick="bom:${i.id}" aria-label="Got it: ${Re(i.name)}" ${z.ticks.has("bom:"+i.id)?"checked":""}>`:""}
    ${Lv(i)}<button class="rowname" data-part="${i.id}">${Re(i.name)}<span class="chev">›</span></button>
    ${!t&&at.waitingOf(i.id)?`<button class="fitbtn" data-fit="${i.id}" aria-label="Fit ${Re(i.name)}">Fit${at.waitingOf(i.id)>1?" ×"+at.waitingOf(i.id):""}</button>`:""}
  </div>`;function hu(i){const t=i>0?`<button class="btn" data-step="${i-1}">Back</button>`:'<button class="btn" disabled>Back</button>',e=i<9?`<button class="btn primary" data-step="${i+1}"><span>Next · ${sn[i+1].short}</span></button>`:'<button class="btn primary" data-step="0"><span>Start over</span></button>';return`<div class="p-foot">${t}<span class="keys">${i===9?"":"<kbd>←</kbd><kbd>→</kbd> steps"}</span>${e}</div>`}const uu=i=>`
  <div class="p-head"><span class="num">${i+1}</span>
    <div><div class="kicker">${sn[i].kicker} · step ${i+1} of 10</div><h1>${Re(sn[i].title)}</h1></div></div>`;function du(){const i=z.step,t=sn[i];let e=`<p class="intro">${Re(t.intro)}</p>`;if(i===0){e+=`<div class="sec"><span>Bill of materials</span><span class="count">${ra(0)} / ${ii.length}</span></div>`;for(const n of Xo)e+=`<div class="group">${ru[n]}</div>`+ii.filter(s=>s.cat===n).map(s=>th(s,!0)).join("");e+=`<div class="sec"><span>Tools</span></div><ul class="tools-list">${Q_.map(([n,s])=>`<li><b>${Re(n)}</b><span>${Re(s)}</span></li>`).join("")}</ul>`}else e+='<div class="sec"><span>You’ll need</span></div>'+Av(i+1).map(n=>th(n,!1)).join(""),e+=`<div class="sec"><span>Do this</span><span class="count">${ra(i)} / ${t.todo.length}</span></div>`,e+=t.todo.map((n,s)=>`
      <label class="todo"><input type="checkbox" data-tick="do:${i}:${s}" ${z.ticks.has(`do:${i}:${s}`)?"checked":""}>
      <span class="tn"><b>${s+1}</b></span><span class="tt">${Re(n)}</span></label>`).join("");t.note&&(e+=`<div class="note"><span>Note</span><p>${Re(t.note)}</p></div>`),xl(uu(i)+`<div class="p-body">${e}</div>`+hu(i),"step"+i)}function Dv(i){const t=sn[z.step],e=Rv(i);xl(`
    <div class="p-head back"><button class="btn dark" data-act="back">← Step ${z.step+1} · ${t.short}</button><kbd>Esc</kbd></div>
    <div class="p-body">
      <div class="kicker">${ru[i.cat]}</div>
      <h1 class="part-name">${Re(i.name)}</h1>
      <div class="pill">${i.qty} on the car</div>
      <p class="intro">${Re(i.desc)}</p>
      <div class="sec"><span>Specs</span></div>
      <dl class="specs">${i.specs.map(([n,s])=>`<div><dt>${Re(n)}</dt><dd>${Re(s)}</dd></div>`).join("")}</dl>
    </div>
    <div class="p-foot"><span class="fitted">Fitted in <b>step ${e+1} · ${sn[e].short}</b></span>
      ${e!==z.step?`<button class="btn primary" data-step="${e}"><span>Go to step ${e+1}</span></button>`:""}</div>`,"part"+i.id)}function Iv(){const i=t=>t?"on":"";xl(uu(9)+`<div class="p-body">
    <p class="intro">${Re(sn[9].intro)}</p>
    <div class="sec"><span>Drive</span></div>
    <div class="drivebox">
      <div class="dpad">
        <button class="dk up" data-key="up" aria-label="Accelerate"><s class="tri"></s></button>
        <button class="dk left" data-key="left" aria-label="Steer left"><s class="tri"></s></button>
        <button class="dk mid" data-key="brake" aria-label="Brake"><s class="sq"></s></button>
        <button class="dk right" data-key="right" aria-label="Steer right"><s class="tri"></s></button>
        <button class="dk down" data-key="down" aria-label="Brake, then reverse"><s class="tri"></s></button>
      </div>
      <div class="gauge">
        <div class="rowb"><span class="lab">Speed</span><span class="big" id="gSpeed">0</span></div>
        <div class="meter"><i id="gSpeedBar"></i></div>
        <div class="rowb"><span class="lab">Engine</span><span class="big" id="gRpm">1100</span></div>
        <div class="meter rpm"><i id="gRpmBar"></i></div>
        <div class="shift" id="shift">${"<i></i>".repeat(10)}</div>
        <div class="paddles ${z.manual?"show":""}"><button class="paddle" data-act="shiftdown" aria-label="Change down">− <span>Down</span><kbd>Q</kbd></button><button class="paddle" data-act="shiftup" aria-label="Change up"><span>Up</span> +<kbd>E</kbd></button></div>
      </div>
    </div>
    <div class="sec"><span>Switches</span></div>
    <div class="acts">
      <button class="sw2 ${i(at.lights)}" data-act="lights" aria-pressed="${at.lights}"><em class="dot lamp"></em>Headlights<i></i></button>
      <button class="sw2 ${i(at.hazard)}" data-act="hazard" aria-pressed="${at.hazard}"><em class="dot haz"></em>Hazards<i></i></button>
      <button class="sw2 ${i(at.chase)}" data-act="chase" aria-pressed="${at.chase}"><em class="dot cam"></em>Chase cam<i></i></button>
      <button class="sw2 ${i(z.manual)}" data-act="manual" aria-pressed="${z.manual}"><em class="dot"></em>Manual gears<i></i></button>
      <button class="sw2 ${i(z.realRevs)}" data-act="realrevs" aria-pressed="${z.realRevs}"><em class="dot"></em>Real rev drops<i></i></button>
      <button class="sw2 ${i(z.sound)}" data-act="sound" aria-pressed="${z.sound}"><em class="dot"></em>Engine sound<i></i></button>
      <button class="sw2 horn" data-act="horn"><em class="dot hrn"></em>Horn<span class="tap">tap</span></button>
    </div>
    <div class="sec"><span>${z.rivals?`Race · ${Ri} laps`:"Hot laps"}</span><button class="link" data-act="rivals">${z.rivals?"Drive alone":"Race the AI"}</button></div>
    <div class="standings" id="standings">${z.rivals?"":'<p class="empty">No other cars on track. Switch on “Race the AI” for a three-lap race against five AI drivers.</p>'}</div>
    <div class="sec"><span>Lap times</span><span class="count" id="lapCount"></span></div>
    <div class="laplist" id="lapList"></div>
    <p class="keysline"><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> drive · <kbd>Space</kbd> brake · <kbd>L</kbd> lights · <kbd>H</kbd> horn · <kbd>Z</kbd> hazards · <kbd>C</kbd> camera · <kbd>Q</kbd><kbd>E</kbd> gears (manual)</p>
    <div class="sec"><span>Pit-wall telemetry</span><button class="link" data-act="clearlog">Clear</button></div>
    <div class="log" id="log"></div>
    <button class="btn" data-act="resetcar">${z.rivals?"Restart the race":"Back to the grid"}</button>
  </div>`+hu(9),"drive"),yl(),xu()}let Qa="";function xl(i,t){const e=je.querySelector(".p-body"),n=t===Qa&&e?e.scrollTop:0;je.innerHTML=i,t!==Qa&&(je.classList.remove("enter"),je.offsetWidth,je.classList.add("enter"),je.querySelectorAll(".p-body > *").forEach((r,a)=>r.style.setProperty("--i",String(Math.min(a,14))))),Qa=t;const s=je.querySelector(".p-body");s&&(s.scrollTop=n),sr(null)}function sr(i){je.querySelectorAll("[data-row]").forEach(t=>t.classList.toggle("hot",t.dataset.row===i))}let eh=0,nh=0,ih="";const os=[],Uv=()=>new Date().toTimeString().slice(0,8);function Ce(i){const t=Re(i).split(" · ").map(e=>{const n=/^([^:]+): (.+)$/.exec(e);return n?`<span class="k">${n[1]}:</span> <span class="v">${n[2]}</span>`:`<b>${e}</b>`}).join(' <span class="t">·</span> ');os.push(`<div><span class="t">[${Uv()}]</span> ${t}</div>`),os.length>60&&os.shift(),yl()}function yl(){const i=document.getElementById("log");i&&(i.innerHTML=os.join(""),i.scrollTop=i.scrollHeight)}function fu(i){return z.mph?[Math.round(Math.abs(i)*2.237),"mph"]:[Math.round(Math.abs(i)*3.6),"km/h"]}function Nv(i,t){const e=performance.now();if(e-eh<90)return;eh=e;const[n,s]=fu(i.speed),r=i.gear===-1?"R":i.speed===0&&!i.throttle?"N":String(i.gear),a=Math.round(t/10)*10,o=(f,d)=>{const g=document.getElementById(f);g&&(g.textContent=d)};o("tSpeed",String(n)),o("tUnit",s),o("tRpm",String(a)),o("tGear",r),o("tMode",z.manual?"Gear · manual":"Gear · auto"),o("tSteer",String(Math.round(i.steer*180/Math.PI)));const l=(f,d)=>{const g=document.getElementById(f);g&&(g.style.width=Math.round(Math.min(1,d)*100)+"%")};o("gSpeed",`${n} ${s}`),l("gSpeedBar",Math.abs(i.speed)/68),o("gRpm",`${a} rpm`),l("gRpmBar",t/7200);const c=z.realRevs||z.manual,h=Math.max(0,Math.min(10,Math.round(c?(t-5900)/1050*10:(t-1100)/6e3*10)));for(const f of[document.getElementById("shift"),document.getElementById("hudShift")])f&&(f.classList.toggle("max",c&&(i.limiter||t>6900)),f.querySelectorAll("i").forEach((d,g)=>d.classList.toggle("on",g<h)));const u=`${r}|${Math.round(n/5)}|${i.braking}`;e-nh>2500&&u!==ih&&(nh=e,ih=u,Ce(`Speed: ${n} ${s} · Gear: ${r} · Engine: ${Math.round(t)} rpm · Throttle: ${Math.round(i.throttle*100)} % · Coolant: ${Math.round(i.coolant)} °C${i.braking?" · Brake: ON":""}`))}function Fv(){os.length=0,Ce(`CarKit race car #27 — simulated · CarKit Circuit 4.5 km · ${gl} · by ${sa}`),Ce("ECU online · CAN bus 1 Mbit/s · no fault codes"),Ce("Battery: 13.2 V · Fuel: 100 L · Coolant: 24 °C"),Ce("Engine started · Idle: 1100 rpm · Boost: 0.0 bar")}function Ov(){try{const i=bl();if(!i)return;const t=i.currentTime,e=i.createGain();e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(.12,t+.02),e.gain.setValueAtTime(.12,t+.3),e.gain.exponentialRampToValueAtTime(1e-4,t+.42),e.connect(i.destination);for(const n of[420,525]){const s=i.createOscillator();s.type="sawtooth",s.frequency.value=n,s.connect(e),s.start(t),s.stop(t+.45)}}catch{}Ce("Horn")}const si=qt("settings");function kv(){const i=(t,e,n)=>`<label class="set"><span>${e}</span><input type="checkbox" data-set="${t}" ${n?"checked":""}><i></i></label>`;si.innerHTML=`
    <div class="dlg-head"><h2>Settings</h2><button class="x" data-act="closeset" aria-label="Close">✕</button></div>
    <div class="sec"><span>Display</span></div>
    ${i("labels","Show part labels on the mat",z.labels)}
    ${i("shadows","Shadows (turn off on a slow computer)",z.shadows)}
    ${i("autoplay","Play the assembly animation on each step",z.autoplay)}
    <div class="sec"><span>Drive step</span></div>
    ${i("mph","Show speed in mph",z.mph)}
    ${i("sound","Sound (engine, parts clicking into place)",z.sound)}
    <div class="sec"><span>Credits</span></div>
    <p class="credits">CarKit was designed and built by <a href="${ou}" target="_blank" rel="noopener"><b>${sa}</b></a>: the race car, the build guide, the circuit, the AI drivers, the driving model and the sound. Everything is generated in code, with no model or image files. Built with Three.js; fonts Barlow, Barlow Condensed and JetBrains Mono (SIL Open Font License).</p>
    <p class="ver-line">CarKit ${gl} · © 2026 ${sa}</p>
    <div class="dlg-foot"><button class="btn" data-act="resetticks">Clear all ticks</button><button class="btn primary" data-act="closeset"><span>Done</span></button></div>`}si.addEventListener("change",i=>{const t=i.target,e=t.dataset.set;e&&(z[e]=t.checked,se.set(e,t.checked),at.setLabels(z.labels),at.setShadows(z.shadows),at.autoplay=z.autoplay,z.sound||Ci.stop(),Js())});function Oe(i){switch(i){case"play":at.setPlaying(!at.playing);break;case"speed":at.speed=at.speed===1?2:at.speed===2?.5:1;break;case"replay":at.replay();break;case"fit":z.fit=!z.fit,se.set("fit",z.fit),at.setFitMode(z.fit),un(z.fit?"Fit mode: click each glowing part to fit it":"Fit mode off","");break;case"sound":z.sound=!z.sound,se.set("sound",z.sound),z.sound?Ci.start():Ci.stop();break;case"zin":at.zoom(.8);return;case"zout":at.zoom(1.25);return;case"home":at.resetView();return;case"explode":z.step>0&&z.step<9&&(z.explode=!z.explode,at.setExplode(z.explode));break;case"labels":z.labels=!z.labels,se.set("labels",z.labels),at.setLabels(z.labels);break;case"chase":at.setChase(!at.chase);break;case"realrevs":z.realRevs=!z.realRevs,se.set("realRevs",z.realRevs),un(z.realRevs?"Real revs: they drop on every gear change":"Smooth revs: they climb with speed","");break;case"manual":z.manual=!z.manual,se.set("manual",z.manual),at.drive.manual=z.manual,un(z.manual?"Manual gears: E up, Q down":"Automatic gears",""),Ce("Gearbox: "+(z.manual?"MANUAL":"AUTO"));break;case"shiftup":at.drive.shiftUp()||un("Already in top gear","warn");return;case"shiftdown":at.drive.shiftDown()||un(at.drive.gear<=1?"Already in first":"Too many revs to change down","warn");return;case"rail":Qs();return;case"panel":tr();return;case"rivals":z.rivals=!z.rivals,se.set("rivals",z.rivals),at.rivals.enabled=z.rivals,Oe("resetcar"),Js();return;case"closeres":qt("results").classList.remove("show");return;case"lights":at.setLights(!at.lights),Ce("Headlights: "+(at.lights?"ON":"OFF"));break;case"hazard":at.setHazard(!at.hazard),Ce("Hazards: "+(at.hazard?"ON":"OFF"));break;case"horn":Ov();return;case"clearlog":os.length=0,yl();return;case"resetcar":at.setStep(9),yt.prevS=-1,yt.start=-1,yt.n=0,yt.invalid=!1,Ve.on=z.rivals,Ve.done=!1,Ve.playerTime=null,qt("results").classList.remove("show"),Gv(),yu(!0),Ce(z.rivals?`Race start · ${Ri} laps · 6 cars`:"Car back on the grid");return;case"back":kn(z.step);return;case"prev":z.step>0&&kn(z.step-1);return;case"next":z.step<9&&kn(z.step+1);return;case"closeset":si.close();return;case"resetticks":z.ticks.clear(),se.set("ticks",[]);break}Js()}document.addEventListener("click",i=>{const t=i.target.closest("[data-act],[data-step],[data-part],[data-paint],[data-fit],#btnSettings,#btnRail,#btnPanel,#sideTab,#guideFab");if(t){if(t.dataset.fit){at.fitPart(t.dataset.fit);return}if(t.id==="btnSettings"){kv(),si.showModal();return}if(t.id==="btnRail"){Qs();return}if(t.id==="btnPanel"||t.id==="sideTab"||t.id==="guideFab"){tr(t.id==="btnPanel"?void 0:!0);return}if(t.dataset.act)return Oe(t.dataset.act);if(t.dataset.step)return gn&&Qs(!1),kn(Number(t.dataset.step));if(t.dataset.part){kn(z.step,t.dataset.part),at.focus(t.dataset.part);return}t.dataset.paint&&(z.paint=Number(t.dataset.paint),se.set("paint",z.paint),at.setPaint(da[z.paint][1]),Js())}});si.addEventListener("click",i=>{i.target===si&&si.close()});je.addEventListener("change",i=>{const t=i.target;t.dataset.tick&&(t.checked?z.ticks.add(t.dataset.tick):z.ticks.delete(t.dataset.tick),se.set("ticks",[...z.ticks]),cu(),je.querySelectorAll(".sec .count").forEach(e=>{const n=z.step;e.textContent=`${ra(n)} / ${_l(n).length}`}))});je.addEventListener("pointerover",i=>{const t=i.target.closest("[data-row]");t&&(at.setHover(t.dataset.row),sr(t.dataset.row))});je.addEventListener("pointerleave",()=>{at.setHover(null),sr(null)});je.addEventListener("pointerout",i=>{const t=i.target.closest("[data-row]");t&&!t.contains(i.relatedTarget)&&(at.setHover(null),sr(null))});const pu=i=>{var t;return(t=i.target.closest("[data-key]"))==null?void 0:t.dataset.key};document.addEventListener("pointerdown",i=>{var e,n;const t=pu(i);t&&(at.drive.input[t]=!0,Ci.start(),(n=(e=i.target).setPointerCapture)==null||n.call(e,i.pointerId))});for(const i of["pointerup","pointercancel","lostpointercapture"])document.addEventListener(i,t=>{const e=pu(t);e&&(at.drive.input[e]=!1)});const aa={w:"up",arrowup:"up",s:"down",arrowdown:"down",a:"left",arrowleft:"left",d:"right",arrowright:"right"," ":"brake"};window.addEventListener("keydown",i=>{if(i.ctrlKey||i.metaKey||i.altKey||si.open)return;const t=i.target;if(t.tagName==="INPUT"&&t.type!=="checkbox")return;const e=i.key.toLowerCase();if(e==="escape"&&(gn||Sn))return gn=Sn=!1,xs();if(e==="escape"&&z.part)return kn(z.step);if(z.step===9){if(aa[e]){at.drive.input[aa[e]]=!0,Ci.start(),i.preventDefault();return}return i.repeat?void 0:e==="l"?Oe("lights"):e==="h"?Oe("horn"):e==="z"?Oe("hazard"):e==="c"?Oe("chase"):e==="e"&&z.manual?Oe("shiftup"):e==="q"&&z.manual?Oe("shiftdown"):e==="b"?Qs():e==="i"?tr():void 0}if(!i.repeat){if(e==="arrowright"&&z.step<9)return kn(z.step+1);if(e==="arrowleft"&&z.step>0)return kn(z.step-1);if(e==="b")return Qs();if(e==="i")return tr();if(e==="e")return Oe("explode");if(e==="f"&&z.step>0)return Oe("fit");if(e==="l"&&z.step===0)return Oe("labels");if(e==="r")return Oe("replay");if(e==="0")return Oe("home");if(e===" "&&z.step>0)return i.preventDefault(),Oe("play")}});window.addEventListener("keyup",i=>{const t=i.key.toLowerCase();aa[t]&&(at.drive.input[aa[t]]=!1)});window.addEventListener("blur",()=>{for(const i of Object.keys(at.drive.input))at.drive.input[i]=!1});const rr=window.matchMedia("(max-width: 760px)");let gn=!1,Sn=!1;function xs(){const i=rr.matches;i||(gn=Sn=!1),Os.classList.toggle("rail-min",z.railMin&&!i),Os.classList.toggle("panel-min",z.panelMin&&!i),Os.classList.toggle("rail-open",gn&&i),Os.classList.toggle("panel-open",Sn&&i),qt("btnRail").setAttribute("aria-expanded",String(i?gn:!z.railMin)),qt("btnPanel").setAttribute("aria-expanded",String(i?Sn:!z.panelMin))}function Qs(i){rr.matches?(gn=i??!gn,gn&&(Sn=!1)):(z.railMin=i===void 0?!z.railMin:!i,se.set("railMin",z.railMin)),xs()}function tr(i){rr.matches?(Sn=i??!Sn,Sn&&(gn=!1)):(z.panelMin=i===void 0?!z.panelMin:!i,se.set("panelMin",z.panelMin)),xs()}rr.addEventListener("change",xs);qt("scrim").addEventListener("click",()=>{gn=Sn=!1,xs()});xs();let sh=0,mu=-10;function Bv(i){if(z.realRevs||z.manual)return i.rpm;const t=Math.abs(i.speed),e=1100+Math.pow(Math.min(1,t/65.2),.8)*6050,n=Math.max(0,1-t/8);let s=e*(1-n)+Math.max(e,i.rpm)*n;const r=performance.now()/1e3-mu;return r<.3&&(s*=1-.045*Math.exp(-r/.07)),Math.min(7200,s)}function zv(i){if(i.shifts===sh)return;sh=i.shifts,mu=performance.now()/1e3;const t=document.getElementById("tGearBox"),e=document.getElementById("tShift");!t||!e||(document.getElementById("tGear").textContent=String(i.gear),e.textContent=i.lastShift==="down"?"▼":"▲",t.classList.remove("up","down"),t.offsetWidth,t.classList.add(i.lastShift==="down"?"down":"up"))}let rh=0;function un(i,t){const e=qt("toast");e.textContent=i,e.className="toast "+t,e.offsetWidth,e.classList.add("show"),clearTimeout(rh),rh=window.setTimeout(()=>e.classList.remove("show"),2600)}const Nn={left:0,total:0};function Hv(i,t){const e=Nn.left;Nn.left=i,Nn.total=t,gu(),t>0&&i===0&&e>0&&(un(`Step ${z.step+1} built — every part fitted`,"ok"),wi(1.5)),!z.part&&z.step>0&&z.step<9&&du()}function gu(){const i=qt("fitbar"),t=z.fit&&z.step>0&&z.step<9&&Nn.total>0;if(i.classList.toggle("show",t),!t)return;const e=Nn.total-Nn.left;i.innerHTML=Nn.left?`<span>Click the glowing parts to fit them</span><b>${e} / ${Nn.total}</b><em><i style="width:${e/Nn.total*100}%"></i></em>`:'<span>All parts fitted</span><b>✓</b><em><i style="width:100%"></i></em>'}let kr=null,Br=null;function bl(){if(!z.sound)return null;try{return kr??(kr=new AudioContext),kr.state==="suspended"&&kr.resume(),kr}catch{return null}}function wi(i,t=.5){const e=bl();if(!e)return;const n=e.currentTime,s=e.createGain();s.gain.setValueAtTime(1e-4,n),s.gain.exponentialRampToValueAtTime(.22*t+.02,n+.008),s.gain.exponentialRampToValueAtTime(1e-4,n+.16),s.connect(e.destination);const r=e.createOscillator();if(r.type="triangle",r.frequency.setValueAtTime(220*i,n),r.frequency.exponentialRampToValueAtTime(90*i,n+.12),r.connect(s),r.start(n),r.stop(n+.18),!Br){Br=e.createBuffer(1,e.sampleRate*.1,e.sampleRate);const c=Br.getChannelData(0);for(let h=0;h<c.length;h++)c[h]=(Math.random()*2-1)*(1-h/c.length)}const a=e.createBufferSource();a.buffer=Br;const o=e.createBiquadFilter();o.type="bandpass",o.frequency.value=2400*i,o.Q.value=2;const l=e.createGain();l.gain.value=.18*t,a.connect(o),o.connect(l),l.connect(e.destination),a.start(n)}const ah=new Map;function zr(i,t){let e=ah.get(t);if(!e){e=i.createBuffer(1,Math.round(i.sampleRate*t),i.sampleRate);const n=e.getChannelData(0);for(let s=0;s<n.length;s++)n[s]=Math.random()*2-1;ah.set(t,e)}return e}function oh(i){const t=new Float32Array(1024);for(let e=0;e<t.length;e++){const n=e/(t.length-1)*2-1;t[e]=Math.tanh(i*n)/Math.tanh(i)}return t}const Ci={n:null,shifts:0,throttle:0,liftAt:-10,nextPop:0,start(){if(this.n||z.step!==9)return;const i=bl();if(!i)return;const t=i.createDynamicsCompressor();t.threshold.value=-16,t.ratio.value=5,t.attack.value=.003,t.release.value=.15,t.connect(i.destination);const e=i.createGain();e.gain.value=0,e.connect(t),e.gain.setTargetAtTime(1,i.currentTime,.15);const n=M=>{const y=i.createOscillator();return y.type=M,y.start(),y},s=(M,y)=>{const P=i.createGain();return P.gain.value=M,P.connect(y),P},r=s(0,e),a=i.createBiquadFilter();a.type="lowpass",a.Q.value=3,a.connect(r);const o=i.createWaveShaper();o.curve=oh(3.2),o.oversample="2x",o.connect(a);const l=n("sawtooth"),c=n("square");l.connect(s(.55,o)),c.connect(s(.35,o));const h=s(0,e),u=n("sine");u.connect(h);const f=s(0,e),d=i.createWaveShaper();d.curve=oh(2.2),d.connect(f);const g=i.createBiquadFilter();g.type="bandpass",g.Q.value=1.1,g.connect(d);const v=i.createGain();v.gain.value=.5,v.connect(g);const m=n("square");m.connect(s(.5,v.gain));const p=i.createBufferSource();p.buffer=zr(i,2),p.loop=!0,p.connect(v),p.start();const w=s(0,e),S=n("triangle");S.connect(w);const x=s(0,e),I=i.createBiquadFilter();I.type="lowpass",I.frequency.value=700,I.connect(x);const _=i.createBufferSource();_.buffer=zr(i,3),_.loop=!0,_.playbackRate.value=.8,_.connect(I),_.start();const b=s(0,e),E=n("sine");E.connect(b),this.n={a:i,master:e,o1:l,o2:c,sub:u,pulse:m,whine:S,turbo:E,coreLp:a,core:r,subG:h,exBp:g,ex:f,whineG:w,windG:x,turboG:b,srcs:[p,_]},this.shifts=at.drive.shifts},bang(i,t){const e=this.n;if(!e)return;const{a:n}=e,s=n.createBufferSource();s.buffer=zr(n,.25),s.playbackRate.value=.6+Math.random()*.5;const r=n.createBiquadFilter();r.type="lowpass",r.frequency.value=900+Math.random()*900;const a=n.createGain();a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(i,t+.004),a.gain.exponentialRampToValueAtTime(1e-4,t+.05+Math.random()*.05),s.connect(r),r.connect(a),a.connect(e.master),s.start(t,Math.random()*.15,.12)},blowOff(i){const t=this.n;if(!t)return;const{a:e}=t,n=e.createBufferSource();n.buffer=zr(e,.5);const s=e.createBiquadFilter();s.type="bandpass",s.Q.value=1.6,s.frequency.setValueAtTime(3200,i),s.frequency.exponentialRampToValueAtTime(1100,i+.35);const r=e.createGain();r.gain.setValueAtTime(1e-4,i),r.gain.exponentialRampToValueAtTime(.09,i+.02),r.gain.exponentialRampToValueAtTime(1e-4,i+.4),n.connect(s),s.connect(r),r.connect(t.master),n.start(i)},update(i,t){const e=this.n;if(!e)return;const n=e.a.currentTime,s=t/7200,r=i.throttle,a=Math.abs(i.speed),o=t/30,l=i.shifts!==this.shifts?.03:.015;e.o1.frequency.setTargetAtTime(o,n,l),e.o2.frequency.setTargetAtTime(o*.5,n,l),e.sub.frequency.setTargetAtTime(o*.5,n,l),e.pulse.frequency.setTargetAtTime(o,n,l),e.exBp.frequency.setTargetAtTime(420+s*1500+r*300,n,.03),e.coreLp.frequency.setTargetAtTime(300+r*1800+s*1200,n,.03);let c=.05+r*.06+s*.03,h=.025+r*(.05+s*.09);if(i.limiter&&(z.realRevs||z.manual)){const u=.55+Math.random()*.45;c*=u,h*=u}if(e.subG.gain.setTargetAtTime(.05+r*.04,n,.05),e.whine.frequency.setTargetAtTime(120+a*52,n,.05),e.whineG.gain.setTargetAtTime(Math.min(1,a/68)*(.006+r*.008),n,.08),e.windG.gain.setTargetAtTime(Math.min(1,a/68)**2*.07,n,.1),e.turbo.frequency.setTargetAtTime(1400+t*.42,n,.06),e.turboG.gain.setTargetAtTime(r*Math.max(0,(t-3200)/4e3)*.01,n,.08),i.shifts!==this.shifts){const u=i.lastShift==="up";this.shifts=i.shifts,e.core.gain.setTargetAtTime(c*.45,n,.006),e.ex.gain.setTargetAtTime(h*.4,n,.006),e.core.gain.setTargetAtTime(c,n+.045,.03),e.ex.gain.setTargetAtTime(h,n+.045,.03),this.bang(u?.32:.22,n+.01),u||this.bang(.16,n+.08)}else e.core.gain.setTargetAtTime(c,n,.03),e.ex.gain.setTargetAtTime(h,n,.03);this.throttle>.5&&r<.5&&(this.liftAt=n,t>4300&&this.blowOff(n)),this.throttle=r,r<.5&&t>3600&&n-this.liftAt<1.4&&n>this.nextPop&&!i.locked&&(this.bang(.08+Math.random()*.18,n),this.nextPop=n+.04+Math.random()*.16)},stop(){const i=this.n;if(!i)return;this.n=null;const t=i.a.currentTime;i.master.gain.setTargetAtTime(0,t,.08);for(const e of[i.o1,i.o2,i.sub,i.pulse,i.whine,i.turbo,...i.srcs])e.stop(t+.5)}};let Vs=[];function Yr(i){qt("lights").querySelectorAll("i").forEach((t,e)=>t.classList.toggle("on",e<i)),at.setStartLights(i)}function Gv(){_u();const i=qt("lights");i.classList.remove("go"),i.classList.add("show"),at.drive.locked=!0,Yr(0);for(let e=1;e<=5;e++)Vs.push(window.setTimeout(()=>{Yr(e),wi(2.2,.25)},250+e*600));const t=250+5*600+300+Math.random()*900;Vs.push(window.setTimeout(()=>{Yr(0),at.drive.locked=!1,i.classList.add("go"),Ce("Lights out · GO"),un("Lights out — go!","ok")},t)),Vs.push(window.setTimeout(()=>i.classList.remove("show"),t+900))}function _u(){Vs.forEach(clearTimeout),Vs=[],at.drive.locked=!1,Yr(0),qt("lights").classList.remove("show"),Ci.stop()}const nn=i=>`${Math.floor(i/60)}:${(i%60).toFixed(3).padStart(6,"0")}`,yt={n:0,start:-1,prevS:-1,splits:[],invalid:!1,best:se.get("bestLap45",null),bestSecs:se.get("bestSecs45",[]),list:[]};function Vv(i){const t=at.track.length,[e,n]=at.track.sectors,s=i.s,r=yt.prevS;if(yt.prevS=s,i.locked||r<0){ch(i);return}if(i.surface==="grass"&&Math.abs(i.lat)>at.track.half+2.2&&yt.start>=0&&!yt.invalid&&(yt.invalid=!0,Ce("Track limits · lap time deleted"),un("Track limits — lap deleted","warn")),r>t-80&&s<80)yt.start>=0&&Wv(i.time-yt.start),yt.n++,Ve.on&&!Ve.done&&yt.n>Ri&&Xv(i.time),yt.start=i.time,yt.splits=[],yt.invalid=!1,lh();else if(r<80&&s>t-80)yt.start=-1;else if(yt.start>=0)for(const[a,o]of[[0,e],[1,n]])yt.splits.length===a&&r<o&&s>=o&&s-r<60&&(yt.splits.push(i.time-yt.start),lh());ch(i)}function vu(i){const[t,e]=yt.splits;return[t??null,e!==void 0&&t!==void 0?e-t:null,i!==null&&e!==void 0?i-e:null]}function Wv(i){const t=vu(i),e=!yt.invalid&&(yt.best===null||i<yt.best);yt.invalid||t.forEach((s,r)=>{s!==null&&(yt.bestSecs[r]===void 0||s<yt.bestSecs[r])&&(yt.bestSecs[r]=s)}),yt.list.unshift({n:yt.n,t:i,invalid:yt.invalid,best:e}),yt.list.length>8&&yt.list.pop(),e&&(yt.best=i,se.set("bestLap45",i)),se.set("bestSecs45",yt.bestSecs);const n=yt.best!==null&&!e&&!yt.invalid?` (+${(i-yt.best).toFixed(3)})`:"";Ce(`Lap ${yt.n}: ${nn(i)}${yt.invalid?" · deleted":e?" · BEST":""}`),un(yt.invalid?`Lap ${yt.n} · ${nn(i)} · deleted`:e?`New best lap · ${nn(i)}`:`Lap ${yt.n} · ${nn(i)}${n}`,yt.invalid?"warn":e?"best":""),e&&wi(1.8,.4),xu()}function lh(){vu(null).forEach((t,e)=>{const n=document.getElementById("sec"+e);n&&(n.className=t===null?"":yt.invalid?"bad":yt.bestSecs[e]===void 0||t<=yt.bestSecs[e]?"pb":"slow",n.textContent=t===null?`S${e+1}`:t.toFixed(1))})}function ch(i){const t=document.getElementById("lapN"),e=document.getElementById("lapTime");!t||!e||(t.textContent=Ve.on?`${Math.max(1,Math.min(yt.n,Ri))} / ${Ri}`:yt.start<0?"Out":String(yt.n),yu(),e.textContent=yt.start<0?i.locked?"Grid":"Out lap":nn(i.time-yt.start),e.classList.toggle("bad",yt.invalid&&yt.start>=0),qt("lapBest").textContent=yt.best===null?"—":nn(yt.best),Mu(i))}function xu(){const i=document.getElementById("lapList");if(!i)return;const t=document.getElementById("lapCount");t&&(t.textContent=yt.best===null?"":"Best "+nn(yt.best)),i.innerHTML=yt.list.length?yt.list.map(e=>`<div class="${e.invalid?"bad":e.best?"best":""}"><span>Lap ${e.n}</span><b>${nn(e.t)}</b><em>${e.invalid?"deleted":e.best?"best":yt.best!==null?"+"+(e.t-yt.best).toFixed(3):""}</em></div>`).join(""):'<p class="empty">Cross the line to start a timed lap. Leave the track with all four wheels, or touch the barrier, and the lap is deleted.</p>'}const Ve={on:z.rivals,done:!1,playerTime:null};let hh=0;function Ml(){const i=at.drive,t=at.track.length,e=[{name:"You",number:27,color:"#"+da[z.paint][1].toString(16).padStart(6,"0"),me:!0,prog:yt.n*t+i.s-t,fin:Ve.playerTime,best:yt.best}];if(Ve.on)for(const n of at.rivals.cars)e.push({name:n.name,number:n.number,color:"#"+n.color.toString(16).padStart(6,"0"),me:!1,prog:at.rivals.progress(n),fin:n.finished,best:n.best});return e.sort((n,s)=>n.fin!==null||s.fin!==null?n.fin===null?1:s.fin===null?-1:n.fin-s.fin:s.prog-n.prog)}function jr(i,t){if(i===t)return i.fin!==null?nn(i.fin):"Leader";if(i.fin!==null&&t.fin!==null)return"+"+(i.fin-t.fin).toFixed(3);const e=t.prog-i.prog;return e>at.track.length?`+${Math.floor(e/at.track.length)} lap`:"+"+(e/48).toFixed(1)+" s"}function yu(i=!1){const t=performance.now();if(!i&&t-hh<300)return;hh=t;const e=Ml(),n=e.findIndex(a=>a.me),s=document.getElementById("lapPos");s&&(s.textContent=Ve.on?`P${n+1} / ${e.length}`:"",s.classList.toggle("show",Ve.on));const r=document.getElementById("standings");r&&Ve.on&&(r.innerHTML=e.map((a,o)=>`<div class="${a.me?"me":""}"><span class="pos">${o+1}</span><i style="--c:${a.color}">${a.number}</i><b>${Re(a.name)}</b><em>${a.fin!==null&&o>0?jr(a,e[0]):o===0?jr(a,a):jr(a,e[0])}</em></div>`).join("")),qt("results").classList.contains("show")&&bu()}function Xv(i){Ve.done=!0,Ve.playerTime=i;const e=Ml().findIndex(n=>n.me)+1;Ce(`Chequered flag · you finish P${e} · ${nn(i)}`),un(e===1?"You win!":`Chequered flag · P${e}`,e===1?"best":"ok"),wi(e===1?2:1.4,.5),bu(),qt("results").classList.add("show")}function bu(){const i=Ml(),t=i.findIndex(e=>e.me)+1;qt("results").innerHTML=`
    <div class="res-head"><span>Race result · ${Ri} laps</span><h2>${t===1?"Winner!":`You finished P${t}`}</h2></div>
    <div class="res-rows">${i.map((e,n)=>`<div class="${e.me?"me":""}"><span class="pos">${n+1}</span><i style="--c:${e.color}">${e.number}</i><b>${Re(e.name)}</b><em>${e.fin===null?"running":n===0?nn(e.fin):jr(e,i[0])}</em><small>${e.best!==null?"best "+nn(e.best):""}</small></div>`).join("")}</div>
    <div class="res-foot"><button class="btn" data-act="closeres">Keep driving</button><button class="btn primary" data-act="resetcar"><span>Race again</span></button></div>`}let Zi=null,$e={s:1,ox:0,oz:0},uh=0;function Mu(i){const t=qt("minimap");if(!t.classList.contains("show"))return;const e=performance.now();if(e-uh<50)return;uh=e;const n=Math.min(2,window.devicePixelRatio||1),s=t.clientWidth||200,r=t.clientHeight||120;if(t.width!==Math.round(s*n)||!Zi){t.width=Math.round(s*n),t.height=Math.round(r*n);const c=at.track;let h=1/0,u=-1/0,f=1/0,d=-1/0;for(let S=0;S<c.n;S++)h=Math.min(h,c.px[S]),u=Math.max(u,c.px[S]),f=Math.min(f,c.pz[S]),d=Math.max(d,c.pz[S]);const g=12*n,v=Math.min((t.width-g*2)/(u-h),(t.height-g*2)/(d-f));$e={s:v,ox:(t.width-(u-h)*v)/2-h*v,oz:(t.height-(d-f)*v)/2-f*v},Zi=document.createElement("canvas"),Zi.width=t.width,Zi.height=t.height;const m=Zi.getContext("2d");m.lineJoin="round",m.beginPath();for(let S=0;S<=c.n;S++){const x=S%c.n,I=c.px[x]*v+$e.ox,_=c.pz[x]*v+$e.oz;S?m.lineTo(I,_):m.moveTo(I,_)}m.strokeStyle="rgba(239,243,248,0.25)",m.lineWidth=7*n,m.stroke(),m.strokeStyle="#eff3f8",m.lineWidth=2.2*n,m.stroke();const p=c.px[0]*v+$e.ox,w=c.pz[0]*v+$e.oz;m.fillStyle="#fdc93a",m.fillRect(p-1.5*n,w-6*n,3*n,12*n)}const a=t.getContext("2d");if(a.clearRect(0,0,t.width,t.height),a.drawImage(Zi,0,0),at.rivals.enabled)for(const c of at.rivals.cars){const h=c.obj.position;a.beginPath(),a.arc(h.x*$e.s+$e.ox,h.z*$e.s+$e.oz,2.6*n,0,Math.PI*2),a.fillStyle="#"+c.color.toString(16).padStart(6,"0"),a.fill(),a.lineWidth=1*n,a.strokeStyle="#0d1624",a.stroke()}const o=i.x*$e.s+$e.ox,l=i.z*$e.s+$e.oz;a.beginPath(),a.arc(o,l,6*n,0,Math.PI*2),a.fillStyle="rgba(253,201,58,0.3)",a.fill(),a.beginPath(),a.arc(o,l,3.4*n,0,Math.PI*2),a.fillStyle="#fdc93a",a.fill(),a.lineWidth=1.2*n,a.strokeStyle="#0d1624",a.stroke()}Fv();vl();let $o=0;function Su(){clearTimeout($o),$o=window.setTimeout(()=>wu(Math.max(0,Ks.indexOf(null))),1200)}function wu(i){var n;if(i>9||Ks[i])return;const t=at.thumbnail(i);if(!t)return;Ks[i]=t;const e=xi.querySelector(`[data-step="${i}"] .st-pic`);if(e){const s=new Image;s.src=t,s.alt="",s.draggable=!1,(n=e.querySelector("em"))==null||n.replaceWith(s)}$o=window.setTimeout(()=>wu(i+1),80)}Su();
