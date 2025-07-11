const admin = require("firebase-admin");
const serviceAccount = require("./firebase-adminsdk.json"); // 🔁 키 파일명 맞추기!

// Firebase Admin 초기화
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

async function deleteAllUsers(nextPageToken) {
  try {
    // 최대 1000명까지 사용자 목록 가져오기
    const listUsersResult = await auth.listUsers(1000, nextPageToken);
    const uids = listUsersResult.users.map(user => user.uid);

    if (uids.length === 0) {
      console.log("❗ 삭제할 사용자가 없습니다.");
      return;
    }

    // 일괄 삭제
    const result = await auth.deleteUsers(uids);
    console.log(`✅ ${result.successCount}명 삭제됨 / ❌ ${result.failureCount}명 실패`);

    if (result.errors.length > 0) {
      console.log("🛠 에러 목록:");
      result.errors.forEach(err => {
        console.log(` - UID: ${err.index}, 원인: ${err.error.message}`);
      });
    }

    // 다음 페이지가 있으면 재귀 호출
    if (listUsersResult.pageToken) {
      await deleteAllUsers(listUsersResult.pageToken);
    }
  } catch (err) {
    console.error("🚨 삭제 중 오류:", err);
  }
}

// 실행
deleteAllUsers();
