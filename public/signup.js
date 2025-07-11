// signup.js
// 1) Firebase 모듈 임포트
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

// 2) Firebase 콘솔에서 발급받은 설정값을 여기에 넣어주세요
const firebaseConfig = {
  apiKey: "AIzaSyBHjJw2buImt4p5uqtSFWNij5rENYIMsAI",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  // ... 나머지 설정
};

// 3) 앱 초기화 및 Auth 인스턴스 생성
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 4) Google 버튼 클릭 핸들러
const googleBtn = document.getElementById('google-signup-btn');
googleBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // (선택) 사용자 정보를 로컬에 저장
    localStorage.setItem('user_profile', JSON.stringify({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    }));
    // 로그인 성공하면 정보 입력 페이지로
    window.location.href = 'school_info.html';
  } catch (error) {
    console.error('Google 로그인 오류', error);
    alert('구글 로그인에 실패했습니다. 다시 시도해주세요.');
  }
});
