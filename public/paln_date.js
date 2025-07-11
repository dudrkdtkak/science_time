import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBHjJw2bulmt4p5uqtSFwNiJ5rENYiMsAI",
    authDomain: "science-time-7cb8e.firebaseapp.com",
    projectId: "science-time-7cb8e",
    storageBucket: "science-time-7cb8e.firebasestorage.app",
    messagingSenderId: "999893607916",
    appId: "1:999893607916:web:5ccae72663ca5f52e0ccc9",
    measurementId: "G-G5FH9LKN51"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const saveDatesBtn = document.getElementById('save-dates-btn');

saveDatesBtn.addEventListener('click', async () => {
    const user = auth.currentUser;
    if (user) {
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;

        if (!startDate || !endDate) {
            alert('시작일과 종료일을 모두 선택해주세요.');
            return;
        }

        const planDates = {
            'plan.startDate': startDate,
            'plan.endDate': endDate
        };

        const userDocRef = doc(db, "users", user.uid);
        try {
            await updateDoc(userDocRef, planDates);
            alert('기간이 저장되었습니다. 이제 학습할 단원을 선택해주세요.');
            // 다음 단계인 '단원 선택' 페이지로 이동 (아직 만들지 않았음)
            window.location.href = 'plan_chapters.html';
        } catch (error) {
            console.error("기간 저장 중 에러: ", error);
            alert('기간 저장에 실패했습니다.');
        }

    } else {
        alert('로그인 정보가 없습니다.');
        window.location.href = 'index.html';
    }
});