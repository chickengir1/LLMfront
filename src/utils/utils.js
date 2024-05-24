export const DISCORD_AUTH_URL = "http://localhost:3000/auth/discord";
export const ADMIN_PAGE_URL = "/LLMfront/admin.html";

export const checkAuthStatus = (setIsLoggedIn) => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  if (token) {
    console.log("Token found in URL:", token);
    sessionStorage.setItem("discord_access_token", token);
    setIsLoggedIn(true);
    window.history.replaceState({}, document.title, window.location.pathname);
  } else {
    const accessToken = sessionStorage.getItem("discord_access_token");
    if (accessToken) {
      console.log("Token found in sessionStorage:", accessToken);
      setIsLoggedIn(true);
    } else {
      console.log("No token found");
      setIsLoggedIn(false);
    }
  }
};
