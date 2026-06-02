import type { LoginCredentials, RegisterPayload } from "../types/auth.types";

const AUTH_API_BASE_URL =
	process.env.NEXT_PUBLIC_AUTH_API_BASE_URL ?? "http://localhost:8080";

function normalizeAuthResponse(value: string) {
	const trimmed = value.trim();

	if (!trimmed) {
		return "";
	}

	if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
		return trimmed.slice(1, -1);
	}

	return trimmed;
}

export async function loginAuthApi(payload: LoginCredentials) {
	const response = await fetch(`${AUTH_API_BASE_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: payload.email,
			password: payload.password,
		}),
	});

	if (!response.ok) {
		throw new Error("Falha ao autenticar na API.");
	}

	return normalizeAuthResponse(await response.text());
}

export async function registerAuthApi(payload: RegisterPayload) {
	const response = await fetch(`${AUTH_API_BASE_URL}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: payload.name,
			password: payload.password,
			role: "USER",
			email: payload.email,
		}),
	});

	if (!response.ok) {
		throw new Error("Falha ao registrar na API.");
	}

	return normalizeAuthResponse(await response.text());
}
