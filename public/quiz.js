/* --- 기본 및 로그인 페이지 스타일 --- */
body {
    font-family: Arial, sans-serif;
    background-color: #f0f2f5;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}
.container {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 400px;
    text-align: center;
}
h1, h2 {
    font-size: 24px;
    color: #333;
    margin-top: 0;
    margin-bottom: 20px;
}
p {
    color: #666;
    margin-bottom: 20px;
}
.form-group {
    margin-bottom: 15px;
}
input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
}
button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
}
#login-btn {
    background-color: #007bff;
}
#signup-btn {
    background-color: #6c757d; /* 회색 계열로 변경 */
}

/* --- 모달 (팝업창) 스타일 --- */
.modal {
  display: none; /* 평소에는 안보이게 숨겨놓기 */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 30px;
  border: 1px solid #888;
  width: 90%;
  max-width: 400px;
  border-radius: 10px;
  text-align: center;
  position: relative;
}
.close-btn {
  color: #aaa;
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}
.close-btn:hover, .close-btn:focus {
  color: black;
  text-decoration: none;
}

/* --- 소셜 로그인 버튼 스타일 --- */
.google-btn {
    background-color: #ffffff;
    color: #444;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
}
.google-btn img {
    width: 20px;
    height: 20px;
    margin-right: 12px;
}
.google-btn:hover {
    background-color: #f8f8f8;
}
.naver-btn {
    background-color: #03C75A;
    display: flex;
    align-items: center;
    justify-content: center;
}
.naver-btn img {
    width: 18px;
    height: 18px;
    margin-right: 12px;
}
.naver-btn:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
}