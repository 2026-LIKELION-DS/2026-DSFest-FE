// 어드민 로그인 관련 함수 해당 파일에 한번에 정리
// localStorage로 로그인 상태 관리

const ADMIN_TOKEN_KEY = "adminAccessToken";

export const saveAdminToken = (token: string) => {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const getAdminToken = () => {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
};

export const removeAdminToken = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};

export const isAdminLoggedIn = () => {
  return !!getAdminToken();
};
