"use client";

import Link from "next/link";
import React, { useId, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

export default function RegisterPage() {
	const nameId = useId();
	const emailId = useId();
	const passwordId = useId();
	const confirmPasswordId = useId();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	return (
		<div>

			<style jsx global>{`
				.auth-card .p-password {
					width: 100% !important;
					display: block !important;
				}

				.auth-card .p-password input {
					width: 100% !important;
				}

				.auth-card .p-password-input {
					width: 100% !important;
				}

				.auth-card .p-inputtext {
					width: 100%;
				}
			`}</style>

			<div className="flex min-h-screen items-center justify-center px-4">
				<div className="auth-card w-full max-w-sm rounded-lg border border-white/10 bg-white/5 p-6">
					<div className="text-center">
						<h1 className="text-lg font-semibold">Criar conta</h1>

						<p className="mt-2 text-xs text-white/70">
							Preencha seus dados para começar a usar a plataforma.
						</p>
					</div>

					<form className="mt-6 space-y-4">
						<div className="space-y-2">
							<label htmlFor={nameId} className="text-xs text-white/70">
								Nome
							</label>

							<InputText
								id={nameId}
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Seu nome"
								className="w-full"
								autoComplete="name"
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor={emailId} className="text-xs text-white/70">
								E-mail
							</label>

							<InputText
								id={emailId}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="seuemail@exemplo.com"
								className="w-full"
								autoComplete="email"
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor={passwordId} className="text-xs text-white/70">
								Senha
							</label>

							<Password
								id={passwordId}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
								feedback={false}
								toggleMask
								autoComplete="new-password"
								className="w-full"
								inputClassName="w-full"
								style={{ width: "100%" }}
								inputStyle={{ width: "100%" }}
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor={confirmPasswordId} className="text-xs text-white/70">
								Confirmar senha
							</label>

							<Password
								id={confirmPasswordId}
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								placeholder="••••••••"
								feedback={false}
								toggleMask
								autoComplete="new-password"
								className="w-full"
								inputClassName="w-full"
								style={{ width: "100%" }}
								inputStyle={{ width: "100%" }}
							/>
						</div>

						<Button
							type="submit"
							label="Cadastrar"
							icon="pi pi-user-plus"
							className="w-full"
						/>

						<p className="pt-1 text-center text-xs text-white/70">
							Já tem uma conta?{" "}
							<Link
								className="text-sky-400 hover:text-sky-300"
								href="/auth/login"
							>
								Entrar
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}