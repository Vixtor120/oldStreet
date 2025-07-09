// Configuración de URLs de la API
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// URL base para desarrollo local
const DEV_API_BASE = 'http://localhost:8000';

// URL base para producción (Hostinger) - URLs relativas
const PROD_API_BASE = '.';

export const API_BASE_URL = isDevelopment ? DEV_API_BASE : PROD_API_BASE;

export const API_ENDPOINTS = {
  checkSession: `${API_BASE_URL}/auth/check_session.php`,
  login: `${API_BASE_URL}/auth/login.php`,
  register: `${API_BASE_URL}/auth/register.php`,
  logout: `${API_BASE_URL}/auth/logout.php`,
};
