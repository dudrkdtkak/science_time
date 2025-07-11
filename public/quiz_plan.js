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

// main.js, user_info.js 와 동일한 단원 데이터
const scienceChapters = {
    '1': [ { chapter: 'I. 과학과 인류의 지속가능한 삶', subChapters: ['과학적 탐구 방법', '과학의 발전과 인류 문명', '첨단 과학기술과 미래 사회', '인류의 지속가능한 삶'] }, { chapter: 'II. 생물의 구성과 다양성', subChapters: ['세포', '생물의 구성 단계', '생물다양성의 이해', '생물의 분류', '생물다양성보전'] }, { chapter: 'III. 열과 열의 이동', subChapters: ['온도와 열평형', '열의 이동 방식', '비열', '열팽창'] }, { chapter: 'IV. 물질의 상태 변화', subChapters: ['확산과 증발', '물질의 세 가지 상태', '상태 변화와 입자 모형', '상태 변화가 일어날 때', '상태 변화와 열에너지 출입'] }, { chapter: 'V. 힘의 작용', subChapters: ['힘의 표시와 평형', '중력', '탄성력', '마찰력', '부력', '알짜힘과 물체의 운동', '일상생활 속 힘'] }, { chapter: 'VI. 기체의 성질', subChapters: ['기체의 압력', '압력과 부피 관계', '생활 속 기체의 압력과 부피', '기체의 온도와 부피 관계', '생활 속 기체의 온도와 부피'] }, { chapter: 'VII. 태양계', subChapters: ['태양계를 구성하는 천체', '태양 활동과 영향', '지구의 자전과 공전', '달의 운동'] } ],
    '2': [ { chapter: 'I. 물질의 구성', subChapters: ['원소', '원자', '이온'] }, { chapter: 'II. 전기와 자기', subChapters: ['전류와 전압', '저항과 저항의 연결', '전류의 자기 작용'] }, { chapter: 'III. 태양계', subChapters: ['지구와 달의 운동', '태양계의 구성'] }, { chapter: 'IV. 식물과 에너지', subChapters: ['광합성', '증산 작용'] }, { chapter: 'V. 동물과 에너지', subChapters: ['소화계', '순환계', '호흡계', '배설계'] }, { chapter: 'VI. 물질의 특성', subChapters: ['순물질과 혼합물', '밀도', '용해도'] } ],
    '3': [ { chapter: 'I. 화학 반응의 규칙과 에너지 변화', subChapters: ['물질의 변화와 화학 반응식', '화학 반응의 규칙', '화학 반응에서의 에너지 출입'] }, { chapter: 'II. 기권과 날씨', subChapters: ['기권', '구름과 강수', '기압과 바람', '날씨의 변화'] }, { chapter: 'III. 운동과 에너지', subChapters: ['속력과 등속 운동', '자유 낙하 운동', '일과 에너지'] }, { chapter: 'IV. 자극과 반응', subChapters: ['감각 기관', '신경계', '호르몬'] }, { chapter: 'V. 생식과 발생', subChapters: ['세포 분열', '생식', '사람의 발생'] }, { chapter: 'VI. 별과 우주', subChapters: ['별의 특성', '우리 은하와 우주'] } ]
};

// --- HTML 요소들 가져오기 ---
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const gradeSelect = document.getElementById('grade-select');
const chapterSelect = document.getElementById('chapter-select');
const savePlanBtn = document.getElementById('save-plan-btn');

// --- 기능 구현 ---

// ▼▼▼ 이 부분이 새로 추가된 연동 드롭다운 기능입니다! ▼▼▼
// 학년 선택 시 -> 단원 목록 채우기
gradeSelect.addEventListener('change', (event) => {
    const selectedGrade = event.target.value;
    chapterSelect.innerHTML = '<option value="">단원 선택</option>';

    if (selectedGrade) {
        const chapters = scienceChapters[selectedGrade];
        chapters.forEach(chapterData => {
            const option = document.createElement('option');
            option.value = chapterData.chapter; // 대단원 제목을 값으로 저장
            option.textContent = chapterData.chapter;
            chapterSelect.appendChild(option);
        });
    }
});

// '학습 계획 저장하기' 버튼 기능
savePlanBtn.addEventListener('click', async () => {
    const user = auth.currentUser;
    if (user) {
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        const grade = gradeSelect.value;
        const chapter = chapterSelect.value;

        if (!startDate || !endDate || !grade || !chapter) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        const planData = {
            plan: {
                startDate: startDate,
                endDate: endDate,
                chapters: [
                    { grade: grade, chapter: chapter }
                ]
            }
        };

        const userDocRef = doc(db, "users", user.uid);
        try {
            await updateDoc(userDocRef, planData);
            alert('학습 계획이 저장되었습니다!');
            window.location.href = 'main.html';
        } catch (error) {
            console.error("학습 계획 저장 중 에러: ", error);
            alert('계획 저장에 실패했습니다. 다시 시도해주세요.');
        }

    } else {
        alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
        window.location.href = 'index.html';
    }
});
