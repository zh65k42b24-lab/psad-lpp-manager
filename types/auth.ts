export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'user' | 'technician';
  organization?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface AuthError {
  code: 'INVALID_CREDENTIALS' | 'USER_NOT_FOUND' | 'ACCOUNT_DISABLED' | 'UNAUTHORIZED';
  message: string;
}

export interface Session {
  user: User;
  expiresAt: Date;
}
