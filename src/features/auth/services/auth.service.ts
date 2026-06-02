import type {
	AuthSession,
	AuthUser,
	LoginCredentials,
	PublicAuthUser,
	RegisterPayload,
} from "../types/auth.types";

const USERS_STORAGE_KEY = "skynet-vision:auth-users";
const SESSION_STORAGE_KEY = "skynet-vision:auth-session";
const LEGACY_TOKEN_KEY = "token";
const LEGACY_USER_KEY = "user";

function isBrowser() {
	return typeof window !== "undefined";
}

function readJson<T>(storageKey: string, fallback: T): T {
	if (!isBrowser()) {
		return fallback;
	}

	const storedValue = window.localStorage.getItem(storageKey);

	if (!storedValue) {
		return fallback;
	}

	try {
		return JSON.parse(storedValue) as T;
	} catch {
		return fallback;
 	}
}

function writeJson(storageKey: string, value: unknown) {
	if (!isBrowser()) {
		return;
	}

	window.localStorage.setItem(storageKey, JSON.stringify(value));
}

function removeStorageKey(storageKey: string) {
	if (!isBrowser()) {
		return;
	}

	window.localStorage.removeItem(storageKey);
}

function normalizeEmail(email: string) {
	return email.trim().toLowerCase();
}

function publicUser(user: AuthUser): PublicAuthUser {
	const { password: _password, ...rest } = user;
	return rest;
}

function createToken() {
	const randomPart =
		typeof globalThis.crypto?.randomUUID === "function"
			? globalThis.crypto.randomUUID()
			: Math.random().toString(36).slice(2, 10);

	return `sv-${Date.now()}-${randomPart}`;
}

function readUsers() {
	return readJson<AuthUser[]>(USERS_STORAGE_KEY, []);
}

function writeUsers(users: AuthUser[]) {
	writeJson(USERS_STORAGE_KEY, users);
}

function persistSession(session: AuthSession) {
	writeJson(SESSION_STORAGE_KEY, session);
	window.localStorage.setItem(LEGACY_TOKEN_KEY, session.token);
	window.localStorage.setItem(LEGACY_USER_KEY, JSON.stringify(session.user));
}

export function getStoredSession() {
	if (!isBrowser()) {
		return null;
	}

	const session = readJson<AuthSession | null>(SESSION_STORAGE_KEY, null);

	if (session) {
		return session;
	}

	const legacyUser = window.localStorage.getItem(LEGACY_USER_KEY);
	const legacyToken = window.localStorage.getItem(LEGACY_TOKEN_KEY);

	if (!legacyUser || !legacyToken) {
		return null;
	}

	try {
		const user = JSON.parse(legacyUser) as PublicAuthUser;

		return {
			token: legacyToken,
			user,
			rememberMe: true,
			createdAt: new Date().toISOString(),
		};
	} catch {
		return null;
	}
}

export function getAuthenticatedUser() {
	return getStoredSession()?.user ?? null;
}

export async function registerLocalUser(payload: RegisterPayload) {
	const name = payload.name.trim();
	const email = normalizeEmail(payload.email);
	const password = payload.password;

	if (!name || !email || !password) {
		throw new Error("Preencha todos os campos para continuar.");
	}

	const users = readUsers();
	const existingUser = users.find((user) => normalizeEmail(user.email) === email);

	if (existingUser) {
		throw new Error("Já existe uma conta cadastrada com este e-mail.");
	}

	const user: AuthUser = {
		id: globalThis.crypto?.randomUUID?.() ?? `user-${Date.now()}`,
		name,
		email,
		password,
		createdAt: new Date().toISOString(),
	};

	const session: AuthSession = {
		token: createToken(),
		user: publicUser(user),
		rememberMe: true,
		createdAt: new Date().toISOString(),
	};

	writeUsers([...users, user]);
	persistSession(session);

	return session;
}

export async function loginLocalUser(payload: LoginCredentials) {
	const email = normalizeEmail(payload.email);
	const password = payload.password;

	if (!email || !password) {
		throw new Error("Preencha seu e-mail e senha para entrar.");
	}

	const user = readUsers().find((item) => item.email === email && item.password === password);

	if (!user) {
		throw new Error("E-mail ou senha inválidos.");
	}

	const session: AuthSession = {
		token: createToken(),
		user: publicUser(user),
		rememberMe: Boolean(payload.rememberMe),
		createdAt: new Date().toISOString(),
	};

	persistSession(session);

	return session;
}

export function logoutLocalUser() {
	removeStorageKey(SESSION_STORAGE_KEY);
	removeStorageKey(LEGACY_TOKEN_KEY);
	removeStorageKey(LEGACY_USER_KEY);
}
