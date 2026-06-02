import type { RegisterPayload } from "../../auth/types/auth.types";

const USERS_API_BASE_URL = "/api/users";

export async function fetchUsersApi() {
	const response = await fetch(USERS_API_BASE_URL, {
		method: "GET",
	});

	if (!response.ok) {
		throw new Error("Falha ao listar usuários na API.");
	}

	return response.json();
}

export async function createUserApi(payload: RegisterPayload) {
	const response = await fetch(USERS_API_BASE_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		throw new Error("Falha ao criar usuário na API.");
	}

	return response.json();
}

export async function updateUserApi(
	id: string,
	payload: Partial<RegisterPayload>,
) {
	const response = await fetch(`${USERS_API_BASE_URL}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		throw new Error("Falha ao atualizar usuário na API.");
	}

	return response.json();
}

export async function deleteUserApi(id: string) {
	const response = await fetch(`${USERS_API_BASE_URL}/${id}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error("Falha ao excluir usuário na API.");
	}

	return response.json();
}
