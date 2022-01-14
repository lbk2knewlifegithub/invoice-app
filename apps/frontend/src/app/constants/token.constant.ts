export const TOKEN_KEY = "accessToken";

export function tokenGetter() {
  return localStorage.getItem(TOKEN_KEY);
}
