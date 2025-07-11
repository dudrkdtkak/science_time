document.addEventListener('DOMContentLoaded', () => {
    const userType = document.getElementById('userType');
    const region1 = document.getElementById('region1');
    const region2 = document.getElementById('region2');
    const schoolSelect = document.getElementById('schoolSelect');
    const gradeSelect = document.getElementById('gradeSelect');
    const classSelect = document.getElementById('className');
    const form = document.getElementById('schoolForm');

    // 하위 셀렉트 초기화 함수
    function resetBelow(elem) {
        const map = {
            region1: [region2, schoolSelect, gradeSelect, classSelect],
            region2: [schoolSelect, gradeSelect, classSelect],
            schoolSelect: [gradeSelect, classSelect],
            gradeSelect: [classSelect]
        };
        (map[elem.id] || []).forEach(el => {
            el.disabled = true;
            el.innerHTML = `<option value="">${el.id === 'gradeSelect' ? '학년을 선택하세요' : '선택하세요'}</option>`;
        });
    }

    // 전체 초기화
    function resetAll() {
        [region1, region2, schoolSelect, gradeSelect, classSelect].forEach(el => {
            el.disabled = true;
            el.innerHTML = `<option value="">${el.id === 'gradeSelect' ? '학년을 선택하세요' : '선택하세요'}</option>`;
        });
    }

    resetAll();

    // 1) userType 선택 처리
    userType.onchange = () => {
        resetAll();
        const v = userType.value;
        if (v === '중학생' || v === '고등학생') {
            region1.disabled = false;
            region1.innerHTML = '<option value="">시/도를 선택하세요</option>';
            SIDO.forEach(o => {
                const e = document.createElement('option');
                e.value = o.code;
                e.textContent = o.name;
                region1.appendChild(e);
            });
        } else {
            // 성인/대학생 등은 바로 학교→학년→반 활성화
            schoolSelect.disabled = gradeSelect.disabled = classSelect.disabled = false;
        }
    };

    // 페이지 로드 시 최초 호출
    userType.dispatchEvent(new Event('change'));

    // 2) 시/도 선택 → 학교 리스트
    region1.onchange = async () => {
        resetBelow(region1);
        const code = region1.value;
        if (!code) return;
        try {
            const res = await fetch(
                `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=4ca5d4d252147bee6587e8e9c8523b0a&svcType=api&svcCode=SCHOOL&contentType=xml&gubun=midd_list&region=${code}&thisPage=1&perPage=1000`
            );
            const xml = new DOMParser().parseFromString(await res.text(), 'application/xml');
            rawItems = Array.from(xml.getElementsByTagName('content')).map(c => ({
                name: c.getElementsByTagName('schoolName')[0]?.textContent.trim() || '',
                district: (c.getElementsByTagName('adres')[0]?.textContent.split(/\s+/)[1] || '')
            }));

            const ds = Array.from(new Set(rawItems.map(i => i.district))).filter(d => d).sort((a, b) => a.localeCompare(b, 'ko'));
            region2.disabled = false;
            region2.innerHTML = '<option value="">시/군/구를 선택하세요</option>';
            ds.forEach(d => {
                const e = document.createElement('option');
                e.value = d;
                e.textContent = d;
                region2.appendChild(e);
            });
        } catch (err) {
            console.error(err);
        }
    };

    // 3) 구 선택 → 학교 활성화
    region2.onchange = () => {
        resetBelow(region2);
        const d = region2.value;
        schoolSelect.disabled = !d;
        schoolSelect.innerHTML = '<option value="">학교를 선택하세요</option>';
        rawItems
            .filter(i => i.district === d)
            .forEach(i => {
                const e = document.createElement('option');
                e.value = i.name;
                e.textContent = i.name;
                schoolSelect.appendChild(e);
            });
    };

    // 4) 학교 선택 → 학년 활성화
    schoolSelect.onchange = () => {
        resetBelow(schoolSelect);
        const s = schoolSelect.value;
        gradeSelect.disabled = !s;
        gradeSelect.innerHTML = '<option value="">학년을 선택하세요</option>';
        for (let g = 1; g <= 3; g++) {
            const e = document.createElement('option');
            e.value = `${g}학년`;
            e.textContent = `${g}학년`;
            gradeSelect.appendChild(e);
        }
    };

    // 5) 학년 선택 → 반 활성화
    gradeSelect.onchange = () => {
        resetBelow(gradeSelect);
        const g = gradeSelect.value;
        classSelect.disabled = !g;
        classSelect.innerHTML = '<option value="">반을 선택하세요</option>';
        for (let c = 1; c <= 15; c++) {
            const e = document.createElement('option');
            e.value = `${c}반`;
            e.textContent = `${c}반`;
            classSelect.appendChild(e);
        }
    };

    // 6) 저장
    form.onsubmit = e => {
        e.preventDefault();
        const data = {
            userType: userType.value,
            region1: region1.options[region1.selectedIndex].text,
            region2: region2.value,
            schoolName: schoolSelect.value,
            grade: gradeSelect.value,
            className: classSelect.value
        };
        localStorage.setItem('user_data', JSON.stringify(data));
        window.location.href = 'welcome.html';
    };
});

// 시/도 목록
const SIDO = [
    { code: '100260', name: '서울특별시' },
    { code: '100200', name: '부산광역시' },
    /* 이하 생략… */
];

// API로부터 가져온 학교 rawItems 저장용
let rawItems = [];
