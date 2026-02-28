const TOKEN_KEY = "mindstock_token";
const USER_KEY = "mindstock_user";

export function loadSession() {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const userRaw = localStorage.getItem(USER_KEY);
    if (!token) {
      return null;
    }

    return {
      token,
      user: userRaw ? JSON.parse(userRaw) : null,
    };
  } catch {
    return null;
  }
}

export function saveSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user || {}));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
