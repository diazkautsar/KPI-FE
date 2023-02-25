export function getToken(): string | null {
    return localStorage.getItem('access_token');
}
  
export function setToken(token: string) {
    localStorage.setItem('access_token', token);
}

export function removeToken() {
    localStorage.removeItem('access_token')
}