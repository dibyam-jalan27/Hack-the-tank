const deploment = "http://localhost:5000";

export const login = () => `${deploment}/api/v1/login`;
export const register = () => `${deploment}/api/v1/register`;
export const logout = () => `${deploment}/api/v1/logout`;
export const forgotPassword = () => `${deploment}/api/v1/password/forgot`;
export const resetPassword = (token) =>
  `${deploment}/api/v1/password/reset/${token}`;
export const me = () => `${deploment}/api/v1/me`;
