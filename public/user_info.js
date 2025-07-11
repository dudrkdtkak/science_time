import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// "HTML 문서 로딩이 완료되면, 이 안의 코드를 실행해라" 라는 안전장치
document.addEventListener('DOMContentLoaded', () => {

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

    // --- 예시 데이터 ---
    const schoolData = {
        '중학교': {
            '서울특별시': { '강남구': ['대왕중학교', '대청중학교'], '서초구': ['서운중학교', '서일중학교'] },
            '경기도': { '수원시': ['다산중학교', '매원중학교'], '성남시': ['내정중학교', '백현중학교'] }
        },
        '고등학교': {
            '서울특별시': { '강남구': ['개포고등학교', '경기고등학교', '명덕외국어고등학교'], '서초구': ['반포고등학교', '상문고등학교'] },
            '경기도': { '수원시': ['수원고등학교', '유신고등학교'], '성남시': ['낙생고등학교', '분당고등학교'] }
        }
    };

    // --- HTML 요소들 가져오기 ---
    const schoolLevelSelect = document.getElementById('school-level-select');
    const region1Select = document.getElementById('region1-select');
    const region2Select = document.getElementById('region2-select');
    const schoolSelect = document.getElementById('school-select');
    const gradeSelect = document.getElementById('grade-select');
    const classInput = document.getElementById('class-input');
    const saveBtn = document.getElementById('save-user-info-btn');

    // --- 드롭다운 메뉴 기능 구현 ---
    schoolLevelSelect.addEventListener('change', (event) => {
        const selectedLevel = event.target.value;
        region1Select.innerHTML = '<option value="">시/도 선택</option>';
        region2Select.innerHTML = '<option value="">시/군/구 선택</option>';
        schoolSelect.innerHTML = '<option value="">학교 선택</option>';
        gradeSelect.innerHTML = '<option value="">학년 선택</option>';

        if (selectedLevel) {
            const region1List = Object.keys(schoolData[selectedLevel]);
            region1List.forEach(region1 => {
                const option = document.createElement('option');
                option.value = region1;
                option.textContent = region1;
                region1Select.appendChild(option);
            });
            ['1', '2', '3'].forEach(grade => {
                const option = document.createElement('option');
                option.value = grade;
                option.textContent = `${grade}학년`;
                gradeSelect.appendChild(option);
            });
        }
    });

    region1Select.addEventListener('change', (event) => {
        const selectedLevel = schoolLevelSelect.value;
        const selectedRegion1 = event.target.value;
        region2Select.innerHTML = '<option value="">시/군/구 선택</option>';
        schoolSelect.innerHTML = '<option value="">학교 선택</option>';
        if (selectedRegion1) {
            const region2List = Object.keys(schoolData[selectedLevel][selectedRegion1]);
            region2List.forEach(region2 => {
                const option = document.createElement('option');
                option.value = region2;
                option.textContent = region2;
                region2Select.appendChild(option);
            });
        }
    });

    region2Select.addEventListener('change', (event) => {
        const selectedLevel = schoolLevelSelect.value;
        const selectedRegion1 = region1Select.value;
        const selectedRegion2 = event.target.value;
        schoolSelect.innerHTML = '<option value="">학교 선택</option>';
        if (selectedRegion2) {
            const schoolList = schoolData[selectedLevel][selectedRegion1][selectedRegion2];
            schoolList.forEach(school => {
                const option = document.createElement('option');
                option.value = school;
                option.textContent = school;
                schoolSelect.appendChild(option);
            });
        }
    });

    // '저장하고 시작하기' 버튼 기능
    saveBtn.addEventListener('click', () => {
        const user = auth.currentUser;
        if (user) {
            const userInfo = {
                schoolLevel: schoolLevelSelect.value,
                region1: region1Select.value,
                region2: region2Select.value,
                school: schoolSelect.value,
                grade: gradeSelect.value,
                class: classInput.value,
                lastUpdate: new Date()
            };

            if (Object.values(userInfo).some(value => !value) || !userInfo.class) {
                alert('모든 항목을 선택하고 입력해주세요.');
                return;
            }

            setDoc(doc(db, "users", user.uid), userInfo)
                .then(() => {
                    alert('정보가 저장되었습니다!');
                    window.location.href = 'plan_date.html';
                })
                .catch((error) => {
                    console.error("정보 저장 중 에러 발생: ", error);
                    alert('정보 저장에 실패했습니다. 다시 시도해주세요.');
                });
        } else {
            alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
            window.location.href = 'index.html';
        }
    });

}); // 'DOMContentLoaded'의 닫는 괄호