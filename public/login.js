// login.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js';

// 1) Firebase 설정 (콘솔에서 복사해 온 값으로 바꿔주세요)
const firebaseConfig = {
    apiKey: "AIzaSyBHjJw2bulmt4p5uqtSFwNiJ5rENYiMsAI",
    authDomain: "science-time-7cb8e.firebaseapp.com",
    projectId: "science-time-7cb8e",
    storageBucket: "science-time-7cb8e.appspot.com",
    messagingSenderId: "999893607916",
    appId: "1:999893607916:web:5ccae72663ca5f52e0ccc9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const btnGoogle = document.getElementById('btnGoogle');
const noticeEl = document.getElementById('notice');

// 2) 소셜 로그인 클릭 시
btnGoogle.addEventListener('click', async () => {
    // 4-1) 기존 프로필 불러오기
    const profile = JSON.parse(localStorage.getItem('user_profile') || '{}');

    // 4-2) 이미 로그인 후 정식 탐사대원일 경우
    const isComplete = profile.uid && profile.nickname && profile.character;
    if (isComplete) {
        alert('✅ 이미 정식 탐사대원입니다!');
        return window.location.href = 'welcome.html';
    }

    // 4-3) 이메일조차 없으면 아직 회원가입 전
    if (!profile.email) {
        alert('🛑 아직 회원가입이 완료되지 않았습니다.\n“탐사 대원 등록”을 먼저 진행해주세요.');
        return window.location.href = 'signup.html';
    }

    // 4-4) 학교 정보 미입력 시
    if (!profile.schoolName || !profile.grade || !profile.className) {
        alert('탐사대원 등록을 먼저 해주세요!!');
        return;
    }

    try {
        // ── 4-5) 구글 팝업 로그인
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // ... 이후 로직 생략
    } catch (err) {
        console.error(err);
        alert('❌ Google 로그인에 실패했습니다. 다시 시도해주세요.');
    }
});

// 5) (선택) 페이지 로드시 바로 상태 표시
window.addEventListener('load', () => {
    const p = JSON.parse(localStorage.getItem('user_profile') || '{}');
    if (!p.email) {
        noticeEl.textContent = '🛑 회원가입이 필요합니다.';
        btnGoogle.disabled = true;
        btnGoogle.classList.add('disabled');
    }
});
