const coreHost = process.env.MANUAL_BACKEND_HOST || process.env.NEXT_PUBLIC_API_BASE_URL;
export const NEXT_PUBLIC_API_BASE_URL = `${coreHost}/api`;