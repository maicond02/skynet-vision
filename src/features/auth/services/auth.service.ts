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

export function getLocalUsers() {
	return readUsers();
}

export function getLocalUserById(id: string) {
	return readUsers().find((user) => user.id === id) ?? null;
}

export function createLocalUser(payload: RegisterPayload) {
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

	writeUsers([...users, user]);

	return user;
}

type UpdateLocalUserPayload = {
	name: string;
	email: string;
	password?: string;
};

export function updateLocalUser(id: string, payload: UpdateLocalUserPayload) {
	const name = payload.name.trim();
	const email = normalizeEmail(payload.email);
	const password = payload.password?.trim();

	if (!name || !email) {
		throw new Error("Preencha nome e e-mail para salvar.");
	}

	const users = readUsers();
	const index = users.findIndex((user) => user.id === id);

	if (index < 0) {
		throw new Error("Usuário não encontrado.");
	}

	const emailOwner = users.find(
		(user) => normalizeEmail(user.email) === email && user.id !== id,
	);

	if (emailOwner) {
		throw new Error("Já existe outro usuário cadastrado com este e-mail.");
	}

	const currentUser = users[index];
	const updatedUser: AuthUser = {
		...currentUser,
		name,
		email,
		password: password ? password : currentUser.password,
	};

	const nextUsers = [...users];
	nextUsers[index] = updatedUser;
	writeUsers(nextUsers);

	const session = getStoredSession();
	if (session && session.user.id === id) {
		persistSession({
			...session,
			user: publicUser(updatedUser),
		});
	}

	return updatedUser;
}

export function deleteLocalUser(id: string) {
	const users = readUsers();
	const userToDelete = users.find((user) => user.id === id);

	if (!userToDelete) {
		throw new Error("Usuário não encontrado.");
	}

	writeUsers(users.filter((user) => user.id !== id));

	const session = getStoredSession();
	if (session && session.user.id === id) {
		logoutLocalUser();
	}

	return userToDelete;
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
	const user = createLocalUser(payload);

	const session: AuthSession = {
		token: createToken(),
		user: publicUser(user),
		rememberMe: true,
		createdAt: new Date().toISOString(),
	};

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
