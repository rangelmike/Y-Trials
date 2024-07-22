import"./modulepreload-polyfill-B5Qt9EMX.js";import{getDatabase as v,ref as Q,get as Y,child as Z}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";import{initializeApp as M}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";import{getAuth as k,signOut as z}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";var d={FIREBASE_API_KEY:'"AIzaSyBnbcPg2bm9uNHtQvSCKwneB9qyUC4RYPs"',FIREBASE_AUTH_DOMAIN:'"y-trials.firebaseapp.com"',FIREBASE_DATABASE_URL:'"https://y-trials-default-rtdb.firebaseio.com"',FIREBASE_PROJECT_ID:'"y-trials"',FIREBASE_STORAGE_BUCKET:'"y-trials.appspot.com"',FIREBASE_MESSAGING_SENDER_ID:'"38252670103"',FIREBASE_APP_ID:'"1:38252670103:web:e93dd07b17de6537bc4dd2"',FIREBASE_MEASUREMENT_ID:'"G-DHZ2M1NK82"',SPREADSHEET_APP_ID:'"https://script.google.com/macros/s/AKfycbxCcBN7Ono829TeRK8iB3QQmZCsBSrds_h4a0pXClcl8T6SEo-TM4oEAShs5fCRXP1V/exec"'};const X={apiKey:d.FIREBASE_API_KEY.replace(/"/g,""),authDomain:d.FIREBASE_AUTH_DOMAIN.replace(/"/g,""),projectId:d.FIREBASE_PROJECT_ID.replace(/"/g,""),storageBucket:d.FIREBASE_STORAGE_BUCKET.replace(/"/g,""),messagingSenderId:d.FIREBASE_MESSAGING_SENDER_ID.replace(/"/g,""),appId:d.FIREBASE_APP_ID.replace(/"/g,""),measurementId:d.FIREBASE_MEASUREMENT_ID.replace(/"/g,""),databaseURL:d.FIREBASE_DATABASE_URL.replace(/"/g,"")},K=M(X);v(K);k(K);function y(e){let t=0;for(const o of e)t+=o;return t}function V(e){let t="";for(const o of e)t+=`${o}, `;return t.slice(0,-2)}async function W(e,t){let o=2;const i=d.SPREADSHEET_APP_ID.replace(/"/g,"");for(let s=0;s<Object.values(e).length;s++){const a=Object.entries(e)[s],n=a[0];if(n==t)continue;const I=a[1].wentDates!=null?Object.values(a[1].wentDates).length:0,_=a[1].missedDates!=null?Object.values(a[1].missedDates).length:0,g=a[1].rprts!=null?y(Object.values(a[1].rprts)):0,u=a[1].ejercicio!=null?y(Object.values(a[1].ejercicio)):0,B=a[1].cuotas!=null?y(Object.values(a[1].cuotas)):0,R=a[1].listBooks!=null?V(Object.values(a[1].listBooks)):"";await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},mode:"no-cors",body:JSON.stringify({A:n,B:I,C:_,E:g,G:u,I:B,J:R,Z:o})}).catch(S=>{console.error("Error:",S),alert("Error: "+S.message)}),o++}await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},mode:"no-cors",body:JSON.stringify({desde:o})}).catch(s=>{console.error("Error:",s),alert("Error: "+s.message)})}var E={FIREBASE_API_KEY:'"AIzaSyBnbcPg2bm9uNHtQvSCKwneB9qyUC4RYPs"',FIREBASE_AUTH_DOMAIN:'"y-trials.firebaseapp.com"',FIREBASE_DATABASE_URL:'"https://y-trials-default-rtdb.firebaseio.com"',FIREBASE_PROJECT_ID:'"y-trials"',FIREBASE_STORAGE_BUCKET:'"y-trials.appspot.com"',FIREBASE_MESSAGING_SENDER_ID:'"38252670103"',FIREBASE_APP_ID:'"1:38252670103:web:e93dd07b17de6537bc4dd2"',FIREBASE_MEASUREMENT_ID:'"G-DHZ2M1NK82"',SPREADSHEET_APP_ID:'"https://script.google.com/macros/s/AKfycbxCcBN7Ono829TeRK8iB3QQmZCsBSrds_h4a0pXClcl8T6SEo-TM4oEAShs5fCRXP1V/exec"'};const ee={apiKey:E.FIREBASE_API_KEY.replace(/"/g,""),authDomain:E.FIREBASE_AUTH_DOMAIN.replace(/"/g,""),projectId:E.FIREBASE_PROJECT_ID.replace(/"/g,""),storageBucket:E.FIREBASE_STORAGE_BUCKET.replace(/"/g,""),messagingSenderId:E.FIREBASE_MESSAGING_SENDER_ID.replace(/"/g,""),appId:E.FIREBASE_APP_ID.replace(/"/g,""),measurementId:E.FIREBASE_MEASUREMENT_ID.replace(/"/g,""),databaseURL:E.FIREBASE_DATABASE_URL.replace(/"/g,"")},G=M(ee);v(G);const te=k(G),oe=document.getElementById("datos"),se=document.getElementById("loader"),b=sessionStorage.getItem("myName");let r;class ne{constructor(){this.items=[]}enqueue(t){this.items.push(t)}dequeue(){if(this.isEmpty())throw new Error("Queue is empty");return this.items.shift()}peek(){if(this.isEmpty())throw new Error("Queue is empty");return this.items[0]}isEmpty(){return this.items.length===0}size(){return this.items.length}print(){console.log(this.items.toString())}}let f=new ne;document.getElementById("logoutBtn").addEventListener("click",()=>{z(te),window.location.href="index.html"});document.getElementById("UpStuff").addEventListener("click",()=>{document.getElementById("reset").checked&&console.log("reset"),document.getElementById("UpSheet").checked&&W(r,b)});function c(e){const t=document.createElement("p");return t.textContent=e,t}function m(e,t){let o=0;if(r[t][e]!=null)for(const i of Object.values(r[t][e]))o+=i;return o}function D(e,t){let o="",i=0;if(r[t][e]!=null)for(const s of Object.values(r[t][e]))o+=s+"; ",i++;return{str:o,num:i}}function ae(e){return e=="none"?"block":"none"}function ce(e,t){const o=document.createElement("div"),i=document.createElement("h3");i.textContent=e+" ("+r[e].NombreCentro+")",o.append(i),oe.append(o);for(const s of t){if(r[s]==null){const A=document.createElement("p");A.textContent=`No hay registros de infromación aún sobre ${s}`,o.append(A);continue}const a=document.createElement("h4"),n=document.createElement("div");a.textContent=s,n.classList=s,o.append(a),o.append(n);const{str:I,num:_}=D("wentDates",s),g=I,u=_;n.append(c("Fechas que asistio: "+g));const{str:B,num:R}=D("missedDates",s),F=B,S=R;n.append(c("Fechas que falto: "+F));const l=Number(u+S),L=`${Math.floor(100*u/l)}`;n.append(c("Porcentaje de asistencia: "+L+`% (${u}/${l})`));const P=m("rprts",s);n.append(c(`Total de reportes: ${P}`)),n.append(c(`Promedio reportes: ${(P/l).toFixed(2)}`));const O=m("ejercicio",s);n.append(c(`Total dias de ejercicio: ${O}`)),n.append(c(`Promedio dias de ejercicio: ${(O/l).toFixed(2)}`));const H=m("cuotas",s);n.append(c(`Total cuotas pagadas: ${H}`));const N=m("comisiones",s);n.append(c(`Promedio de cumplimiento de comisiones: ${(N*100/l).toFixed(2)}% (${N}/${l})`));let C="",j="";r[s].actBook!=null&&(C=Object.keys(r[s].actBook),j=Object.values(r[s].actBook)),n.append(c(`Actualmente leyendo: ${C} /Desde: ${j}`));const{str:q,num:ie}=D("listBooks",s),J=q;n.append(c(`Lista de libros leidos: ${J}`)),n.style.display="none",a.addEventListener("click",function(){n.style.display=ae(n.style.display)});const w=m("misas",s);n.append(c(`Total de misas acudidas: ${w}`)),n.append(c(`Promedio dias de misas por semana: ${(w/l).toFixed(2)}`));const x=m("rosarios",s);n.append(c(`Total de rosarios: ${x}`)),n.append(c(`Promedio de rosarios por semana: ${(x/l).toFixed(2)}`));const $=r[s].observaciones;if($!=null){const A=c("Observaciones:");A.style.marginBottom="0px",n.append(A);const p=document.createElement("textarea");p.value=$,p.style.height="auto",p.setAttribute("readonly","true"),p.onmousedown=function(h){h.preventDefault()},p.onselectstart=function(h){h.preventDefault()},n.append(p)}else n.append(c("Observaciones: ninguna"))}}function T(){if(!f.isEmpty()){const e=f.dequeue();if(r[e]==null){T();return}let t=r[e].subs;if(t!=null){t=Object.values(t);for(const o of t)f.enqueue(o);ce(e,t)}T()}}function U(e){const t=Q(v());return Y(Z(t,e)).then(o=>o.exists()?o.val():(console.log("No data available"),0)).catch(o=>(console.error(o),0))}window.onload=async function(){const e=sessionStorage.getItem("myEmail");if(e==""&&(window.location.href="index.html"),Object.keys(await U("jefe"))[0].replace(/,/g,".")==e){const o=document.querySelectorAll(".NO");for(let i=0;i<o.length;i++)o[i].style.display="block"}document.getElementById("email").textContent=e,document.getElementById("name").textContent=b,r=await U("personas"),f.enqueue(b),se.style.display="none",T()};