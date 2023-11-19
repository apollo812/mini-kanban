const DEV_MODE = true;
export const API_BASE = DEV_MODE == true?'http://localhost:8006/api/v1':'';
export const API_URL = DEV_MODE == true ?'http://localhost:8006/':'';