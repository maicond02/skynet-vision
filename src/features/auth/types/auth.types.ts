export type AuthUser = {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: string;
};

export type PublicAuthUser = Omit<AuthUser, "password">;

export type AuthSession = {
	token: string;
	user: PublicAuthUser;
	rememberMe: boolean;
	createdAt: string;
};

export type LoginCredentials = {
	email: string;
	password: string;
	rememberMe?: boolean;
};

export type RegisterPayload = {
	name: string;
	email: string;
	password: string;
};
