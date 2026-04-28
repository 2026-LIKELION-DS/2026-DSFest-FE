// 어드민 로그인 관련 함수 해당 파일에 한번에 정리
// localStorage로 로그인 상태 관리

// 임시적으로 넣은 코드입니당

const ADMIN_KEY = "isAdmin";

//관리자 로그인 (임시 mock 데이터)

export const adminLogin = async (id: string, password: string) => {
  //나중에 API로 교체할 부분
  if (id === "admin" && password === "1234") {
    localStorage.setItem(ADMIN_KEY, "true");
    return true;
  }
  return false;
};

//로그인 여부 확인

export const isAdmin = () => {
  return localStorage.getItem(ADMIN_KEY) === "true";
};

//로그아웃

export const logoutAdmin = () => {
  localStorage.removeItem(ADMIN_KEY);
};
