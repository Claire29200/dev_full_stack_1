/**
 * Store d'authentification.
 * Le JWT est stocké en cookie httpOnly par le backend (invisible au JS).
 * On ne conserve côté client que les infos utilisateur pour l'affichage.
 * Validation du mot de passe selon NIST SP 800-63B.
 */

const USER_KEY = 'auth_user';

/** Stocke les infos utilisateur après connexion. */
export const setAuth = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/** Supprime les données d'authentification. */
export const clearAuth = () => {
  localStorage.removeItem(USER_KEY);
};

/** Vérifie si l'utilisateur est connecté. */
export const isAuthenticated = () => getCurrentUser() !== null;

/** Retourne l'utilisateur connecté ou null. */
export const getCurrentUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

/**
 * Validation du mot de passe selon NIST SP 800-63B.
 * Retourne un tableau d'erreurs (vide si valide).
 */
const COMMON_PASSWORDS = Object.freeze([
  'password', '12345678', '123456789', '1234567890', 'qwerty123',
  'password1', 'iloveyou', 'admin123', 'welcome1', 'monkey123',
  'letmein1', 'dragon12', 'baseball', 'sunshine', 'trustno1',
  'superman', 'princess', 'football', 'shadow12', 'master12',
  'abcdefgh', 'qwertyui', 'azerty12', 'motdepasse', 'bonjour1',
]);

export const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) {
    errors.push('Le mot de passe doit contenir au moins 8 caractères.');
  }
  if (password.length > 64) {
    errors.push('Le mot de passe ne doit pas dépasser 64 caractères.');
  }
  if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
    errors.push('Ce mot de passe est trop courant, veuillez en choisir un autre.');
  }
  if (/^(.)\1+$/.test(password)) {
    errors.push("Le mot de passe ne peut pas être composé d'un seul caractère répété.");
  }
  return errors;
};
