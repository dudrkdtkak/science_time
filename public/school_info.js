// school_info.js (최종 강제 디버깅 버전)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// ❗️ 본인의 실제 Firebase 설정 값으로 이 부분을 교체해야 합니다.
const firebaseConfig = {
    apiKey: "AIzaSyBHjJw2buImt4p5uqtSFWNij5rENYIMsAI",
    authDomain: "science-time-7cb8e.firebaseapp.com",
    projectId: "science-time-7cb8e",
    storageBucket: "science-time-7cb8e.appspot.com",
    messagingSenderId: "999893607916",
    appId: "1:999893607916:web:5ccae72663ca5f52e0ccc9",
    measurementId: "G-G5FH9LKN51"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    // --- HTML 요소 변수 선언 (이전과 동일) ---
    const userType = document.getElementById('userType');
    const region1 = document.getElementById('region1');
    const region2 = document.getElementById('region2');
    const schoolSelect = document.getElementById('schoolSelect');
    const gradeSelect = document.getElementById('gradeSelect');
    const classSelect = document.getElementById('className');
    const form = document.getElementById('schoolForm');
    const submitButton = form.querySelector('button[type="submit"]');
    let currentUser = null;
    let rawItems = [];
    let selectedSchoolLevel = "";

    // --- 로그인 상태 확인 (이전과 동일) ---
    submitButton.disabled = true;
    submitButton.textContent = '로그인 정보 확인 중...';
    onAuthStateChanged(auth, user => {
        if (user) {
            currentUser = user;
            submitButton.disabled = false;
            submitButton.textContent = '가입 완료';
        } else {
            alert("로그인 세션이 만료되었습니다. 다시 가입을 시도해주세요.");
            window.location.href = "signup.html";
        }
    });

    // --- 드롭다운 메뉴 관련 로직 (이전과 동일하여 생략) ---
    // ...

    // --- ✨✨✨ 강제 디버깅을 위한 최종 제출 로직 ✨✨✨ ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        alert('1. "가입 완료" 버튼 클릭을 감지했습니다.');

        if (!currentUser) {
            alert('2. 오류: currentUser 객체가 없습니다! 저장할 수 없습니다.');
            return;
        }
        alert('2. 사용자(currentUser)가 확인되었습니다. UID: ' + currentUser.uid);

        const data = {
            userType: userType.value,
            region1: region1.options[region1.selectedIndex].text,
            region2: region2.value,
            schoolName: schoolSelect.value || "미입력",
            grade: gradeSelect.value || "미입력",
            className: classSelect.value || "미입력",
            completedAt: new Date()
        };
        alert('3. 저장할 데이터 객체를 생성했습니다.');

        try {
            alert('4. Firestore에 저장을 시도합니다. (try 블록 시작)');
            const userRef = doc(db, "users", currentUser.uid);
            await setDoc(userRef, data, { merge: true });

            alert('5. ✅ 저장 성공! main.html로 이동합니다.');
            window.location.href = "main.html";

        } catch (err) {
            alert('5. ❌ 저장 실패! 오류가 발생했습니다. 다음 경고창에 오류 내용이 표시됩니다.');
            alert('오류 메시지: ' + err.message); // 실제 오류 메시지 표시
            console.error('전체 오류 객체:', err);
        }
    });

    // --- 아래 함수 및 SIDO 배열은 생략 없이 모두 있어야 합니다. ---
    function getPlaceholder(id) { /* 이전과 동일 */ }
    function resetBelow(elem) { /* 이전과 동일 */ }
    userType.addEventListener('change', () => { /* 이전과 동일 */ });
    region1.addEventListener('change', async () => { /* 이전과 동일 */ });
    region2.addEventListener('change', () => { /* 이전과 동일 */ });
    schoolSelect.addEventListener('change', () => { /* 이전과 동일 */ });
    gradeSelect.addEventListener('change', () => { /* 이전과 동일 */ });
});

const SIDO = [ /* 이전과 동일 */];