const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ACCESS_TOKEN_KEY = 'accessToken';

/**
 * accessToken을 sessionStorage에 저장
 * @param {string} token - 저장할 accessToken
 */
export const setAccessToken = (token) => {
  sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
};

/**
 * sessionStorage에서 accessToken 가져오기
 * @returns {string|null} 저장된 accessToken 또는 null
 */
export const getAccessToken = () => {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * sessionStorage에서 accessToken 삭제
 */
export const removeAccessToken = () => {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
};

/**
 * 로그인 API
 * @param {Object} credentials
 * @param {string} credentials.id
 * @param {string} credentials.pwd
 * @returns {Promise<Object>}
 */
export const login = async (credentials) => {
  try {
    const url = `${API_BASE_URL}/api/signin`;

    const requestBody = {
      id: credentials.id,
      pwd: credentials.pwd,
    };

    console.log("Login request URL:", url);
    console.log("Login request body:", requestBody);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("response 값", response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log("errorData 값", errorData);
      throw new Error(errorData.error || "로그인에 실패했습니다.");
    }

    const res = await response.json();

    if (res.accessToken) {
      localStorage.setItem("access_token", res.accessToken);
      console.log("✔ access_token saved:", res.accessToken);
    } else {
      console.warn(
        "⚠ 로그인 응답에 accessToken이 없습니다.",
        res.data.accessToken
      );
    }

    return res;
  } catch (error) {
    console.error("Login error:", error);

    if (error.message === "Failed to fetch" || error.name === "TypeError") {
      throw new Error(
        `서버에 연결할 수 없습니다. 백엔드 서버(${API_BASE_URL})가 실행 중인지 확인해주세요.`
      );
    }

    throw error;
  }
};
