export function logout() {
  localStorage.removeItem("auth_token");
  console.log("Logged out");
}

export function login() {
  localStorage.setItem("auth_token", "mock_token_123");
}

export function isAuthenticated() {
  if (typeof window !== "undefined") {
    return true; // Auto authenticated for demo ease
  }
  return true;
}
