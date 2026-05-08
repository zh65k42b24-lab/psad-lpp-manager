// Système d'authentification simple basé sur localStorage
// Pour production : remplacer par NextAuth + base de données

export interface UserAccount {
  id: string;
  email: string;
  password: string; // Hash en production!
  name: string;
  organization?: string;
  role: 'admin' | 'manager' | 'user' | 'technician';
  createdAt: string;
}

export interface AuthResult {
  success: boolean;
  user?: Omit<UserAccount, 'password'>;
  error?: string;
}

const USERS_KEY = 'psad_users';
const CURRENT_USER_KEY = 'psad_user';

// Hash simple (FAKE pour démo - utiliser bcrypt en prod !)
function simpleHash(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'psad_' + Math.abs(hash).toString(36);
}

export function getUsers(): UserAccount[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(USERS_KEY);
  if (!stored) {
    // Créer le compte démo par défaut
    const demoUser: UserAccount = {
      id: 'demo',
      email: 'demo@psad-france.fr',
      password: simpleHash('Demo2024!'),
      name: 'Utilisateur Démo',
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(USERS_KEY, JSON.stringify([demoUser]));
    return [demoUser];
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveUsers(users: UserAccount[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function register(
  email: string,
  password: string,
  name: string,
  organization?: string
): AuthResult {
  if (typeof window === 'undefined') {
    return { success: false, error: 'Inscription impossible côté serveur' };
  }

  // Validations
  if (!email || !password || !name) {
    return { success: false, error: 'Tous les champs sont obligatoires' };
  }

  if (!email.includes('@') || !email.includes('.')) {
    return { success: false, error: 'Email invalide' };
  }

  if (password.length < 6) {
    return { success: false, error: 'Le mot de passe doit faire au moins 6 caractères' };
  }

  const users = getUsers();
  
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: 'Un compte existe déjà avec cet email' };
  }

  const newUser: UserAccount = {
    id: 'user_' + Date.now(),
    email: email.toLowerCase(),
    password: simpleHash(password),
    name,
    organization,
    role: 'user',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  // Auto-login
  const { password: _, ...userWithoutPassword } = newUser;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

  return { success: true, user: userWithoutPassword };
}

export function login(email: string, password: string): AuthResult {
  if (typeof window === 'undefined') {
    return { success: false, error: 'Connexion impossible côté serveur' };
  }

  if (!email || !password) {
    return { success: false, error: 'Email et mot de passe requis' };
  }

  const users = getUsers();
  const hashedPassword = simpleHash(password);
  
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === hashedPassword
  );

  if (!user) {
    return { success: false, error: 'Email ou mot de passe incorrect' };
  }

  const { password: _, ...userWithoutPassword } = user;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

  return { success: true, user: userWithoutPassword };
}

export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser(): Omit<UserAccount, 'password'> | null {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
