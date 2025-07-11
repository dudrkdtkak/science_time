// 1. 필요한 모든 함수들을 Firebase에서 가져옵니다. (getFirestore 추가)
import { initializeApp } 
  from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getAuth } 
  from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';
  import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 2. 모든 오타를 수정한, 완벽한 Firebase 설정입니다.
const firebaseConfig = {
  apiKey: "AIzaSyBHjJw2bulmt4p5uqtSFWNij5rENYIMsAI",
  authDomain: "science-time-7cb8e.firebaseapp.com",
  projectId: "science-time-7cb8e",
  storageBucket: "science-time-7cb8e.appspot.com",
  messagingSenderId: "999893607916",
  appId: "1:999893607916:web:5ccae72663ca5f52e0ccc9",
  measurementId: "G-G5FH9LKN51"
};

// 3. Firebase 앱 초기화 (중복 방지)
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
const auth = getAuth(app);
const db = getFirestore(app); // 이제 getFirestore 함수를 찾을 수 있습니다.
const googleProvider = new GoogleAuthProvider();

// script.js

window.addEventListener('DOMContentLoaded', () => {
  const noticeEl = document.getElementById('signup-notice');
  const loginBtn = document.getElementById('google-login-btn');

  // 1) 정보 입력 플래그 확인 (school_info.js 에서 localStorage.setItem('info_saved','true') 했다고 가정)
  const signedUp = localStorage.getItem('info_saved') === 'true';

  if (!signedUp) {
    // 안내 문구 보여주기
    noticeEl.style.display = 'block';
    // 로그인 버튼 비활성화
    loginBtn.disabled = true;
    loginBtn.classList.add('disabled');
  } else {
    // 정보가 이미 저장된 사용자만 로그인이 가능하도록 이벤트 바인딩
    loginBtn.addEventListener('click', async e => {
      e.preventDefault();
      try {
        const { user } = await signInWithPopup(auth, provider);
        // 로그인 성공 후 메인으로
        window.location.href = 'main.html';
      } catch (err) {
        console.error(err);
        alert('로그인 중 오류가 발생했습니다.');
      }
    });
  }

});

// 4. HTML 문서가 모두 로드된 후에 아래 코드를 실행합니다.
document.addEventListener('DOMContentLoaded', () => {
    // HTML 요소들 가져오기
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    const signupLink = document.getElementById('signup-link'); // signup.html 링크

    // 로그인 성공 후 실행될 길안내 함수
    const handleLoginSuccess = async (user) => {
        if (!user) return;
        const userDocRef = doc(db, "users", user.uid);
        try {
            const docSnap = await getDoc(userDocRef);
            if (!docSnap.exists()) {
                window.location.href = 'school_info.html';
            } else {
                window.location.href = 'main.html';
            }
        } catch (error) {
            console.error("사용자 정보 확인 중 에러: ", error);
            alert("사용자 정보를 확인하는 데 실패했습니다.");
        }
    };

    // 로그인 버튼 기능
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
                .then((userCredential) => {
                    handleLoginSuccess(userCredential.user);
                })
                .catch((error) => {
                    alert('로그인 에러: ' + error.message);
                });
        });
    }

    // (참고: signup.html을 만들면, 이 링크에 대한 기능도 추가할 수 있습니다)
    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault(); // 기본 링크 이동을 막음
            // TODO: 나중에 회원가입 팝업을 띄우거나 페이지를 이동시킬 수 있습니다.
            alert('회원가입 기능은 현재 구글 로그인 팝업으로 제공됩니다.');
        });
    }
});