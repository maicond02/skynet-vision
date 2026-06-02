import type { LoginCredentials, RegisterPayload } from "../types/auth.types";

const AUTH_API_BASE_URL = "/api/auth";

export async function loginAuthApi(payload: LoginCredentials) {
	const response = await fetch(`${AUTH_API_BASE_URL}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		throw new Error("Falha ao autenticar na API.");
	}

	return response.json();
}

export async function registerAuthApi(payload: RegisterPayload) {
	const response = await fetch(`${AUTH_API_BASE_URL}/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		throw new Error("Falha ao registrar na API.");
	}

	return response.json();
}
