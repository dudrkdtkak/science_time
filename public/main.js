import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBHjJw2bulmt4p5uqtSFwNiJ5rENYiMsAI",
    authDomain: "science-time-7cb8e.firebaseapp.com",
    projectId: "science-time-7cb8e",
    storageBucket: "science-time-7cb8e.firebasestorage.app",
    messagingSenderId: "999893607916",
    appId: "1:999893607916:web:5ccae72663ca5f52e0ccc9",
    measurementId: "G-G5FH9LKN51"
  };


// --- Firebase 앱 초기화 (중복 방지) ---
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
const auth = getAuth(app);

// --- HTML 요소 가져오기 ---
const logoutBtn = document.getElementById('logout-btn');
// (향후 퀴즈 선택 드롭다운 등 다른 요소들도 여기에 추가됩니다)

// --- 이벤트 리스너 ---
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        signOut(auth).then(() => {
            // 로그아웃 성공
            alert("성공적으로 로그아웃되었습니다.");
            window.location.href = 'index.html'; // 로그인 페이지로 이동
        }).catch((error) => {
            // 에러 발생
            console.error("로그아웃 에러:", error);
            alert("로그아웃 중 문제가 발생했습니다.");
        });
    });
}