// school_info.js (기본 연결 테스트용 코드)

alert("1. school_info.js 파일이 로드되었습니다.");

document.addEventListener('DOMContentLoaded', () => {
    alert("2. HTML 문서가 로드되었습니다.");

    const form = document.getElementById('schoolForm');

    if (form) {
        alert("3. ID가 'schoolForm'인 폼을 찾았습니다.");

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("4. 폼 제출 버튼이 클릭되었습니다!");
        });

    } else {
        alert("오류: ID가 'schoolForm'인 폼을 찾지 못했습니다!");
    }
});