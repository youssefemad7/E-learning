import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { queryClient } from "../queryClient";
type AuthUser = {
  _id: string;
  email: string;
  name: string;
  role: "student" | "instructor" | "admin";
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type AuthResponse = {
  user: AuthUser;
  access_token: string;
};

type RefreshResponse = {
  user: AuthUser;
  access_token: string;
};

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let accessToken: string | null = null;
export function setAccessToken(token: string | null) {
  accessToken = token;
}

apiAuth.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
let refreshPromise: Promise<string> | null = null;

apiAuth.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshToken()
          .then((data) => {
            setAccessToken(data.access_token);
            return data.access_token;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken = await refreshPromise;

      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

      return apiAuth(originalRequest);
    } catch (refreshError) {
      setAccessToken(null);

      queryClient.setQueryData(["user"], null);

      window.location.assign("/");

      return Promise.reject(refreshError);
    }
  },
);

// POST /auth/register
// تستقبل بيانات إنشاء الحساب، تبعتها للباك، وترجع الـ response اللي فيه بيانات المستخدم والـ tokens.
export async function register(
  name: string,
  email: string,
  password: string,
  role: "student" | "instructor",
): Promise<AuthResponse> {
  const data = { name, email, password, role };
  const { data } = await apiAuth.post<AuthResponse>("/auth/register", data);
  return data;
}
// POST /auth/login
// تستقبل email وpassword، وتبعتهم للباك، وترجع بيانات تسجيل الدخول.
export async function login(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const data = { email, password };
  const { data } = await apiAuth.post<AuthResponse>("/auth/login", data);
  return data;
}
// POST /auth/refresh
// تطلب تجديد الـ tokens لما الـ access token ينتهي.
export async function refreshToken(): Promise<RefreshResponse> {
  const { data } = await apiAuth.post<RefreshResponse>("/auth/refresh");
  return data;
}

export async function restoreSession(): Promise<RefreshResponse> {
  const data = await refreshToken();

  setAccessToken(data.access_token);

  return data;
}

// POST /auth/logout
// تبعت طلب تسجيل الخروج للباك. الـ Backend عندك بيحمي الـ endpoint ده بالـ access token.
export async function logout() {
  await apiAuth.post("/auth/logout");
}
