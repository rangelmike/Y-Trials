import"./modulepreload-polyfill-B5Qt9EMX.js";import{getDatabase as I,ref as A,get as p,child as S}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";import{initializeApp as d}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";import{GoogleAuthProvider as m,getAuth as R,signInWithPopup as g,signOut as B}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";var e={FIREBASE_API_KEY:'"AIzaSyCbmdIyIqyEDELeAiMJaMcwkAcoR_ID5QU"',FIREBASE_AUTH_DOMAIN:'"projecty-v1.firebaseapp.com"',FIREBASE_DATABASE_URL:'"https://projecty-v1-default-rtdb.firebaseio.com/"',FIREBASE_PROJECT_ID:'"projecty-v1"',FIREBASE_STORAGE_BUCKET:'"projecty-v1.appspot.com"',FIREBASE_MESSAGING_SENDER_ID:'"1031013084147"',FIREBASE_APP_ID:'"1:1031013084147:web:afe73747c5d3e512308086"',FIREBASE_MEASUREMENT_ID:'"G-ZGZ9W8CBRR"'};const f={apiKey:e.FIREBASE_API_KEY.replace(/"/g,""),authDomain:e.FIREBASE_AUTH_DOMAIN.replace(/"/g,""),projectId:e.FIREBASE_PROJECT_ID.replace(/"/g,""),storageBucket:e.FIREBASE_STORAGE_BUCKET.replace(/"/g,""),messagingSenderId:e.FIREBASE_MESSAGING_SENDER_ID.replace(/"/g,""),appId:e.FIREBASE_APP_ID.replace(/"/g,""),measurementId:e.FIREBASE_MEASUREMENT_ID.replace(/"/g,""),databaseURL:e.FIREBASE_DATABASE_URL.replace(/"/g,"")},i=d(f),u=new m(i),l=R(i),y=I(i);A(y,"allowed");let E="",c="";sessionStorage.setItem("myEmail",E);sessionStorage.setItem("myName",c);let r=!1;const D=document.getElementById("signinBtn");function F(n){const t=A(I());return p(S(t,n)).then(a=>a.exists()?a.val():(console.log("No data available"),0)).catch(a=>(console.error(a),0))}D.addEventListener("click",async n=>{await g(l,u).then(async t=>{m.credentialFromResult(t).accessToken;const s=t.user,_=Object.keys(await F("allowed"));for(let o of _)o=o.replace(/,/g,"."),s.email==o&&(r=!0);r?(E=s.email,c=s.displayName,sessionStorage.setItem("myEmail",E),sessionStorage.setItem("myName",c)):B(l)}).catch(t=>{t.code;const a=t.message;alert(a)}),r&&(window.location.href="/addReu.html")});
