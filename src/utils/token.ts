export function getToken(): string | null {
    return localStorage.getItem('access_token');
}

export async function setToken(token: string) {
    return localStorage.setItem('access_token', JSON.stringify(token));
}

export function removeToken() {
    localStorage.removeItem('access_token');
}
