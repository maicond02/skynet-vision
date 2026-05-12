"use client";

import Link from "next/link";
import React, { useId, useState } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

export default function LoginPage() {
	const emailId = useId();
	const passwordId = useId();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);

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

				.auth-card .p-icon-field {
					width: 100% !important;
				}

				.auth-card .p-input-icon-right {
					width: 100% !important;
				}
			`}</style>

			<div className="flex min-h-screen items-center justify-center px-4">
				<div className="auth-card w-full max-w-sm rounded-lg border border-white/10 bg-white/5 p-6">
					<div className="text-center">
						<h1 className="text-lg font-semibold">Acessar conta</h1>

						<p className="mt-2 text-xs text-white/70">
							Entre com seus dados para acompanhar suas
							<br />
							operações de forma inteligente.
						</p>
					</div>

					<form className="mt-6 space-y-4">
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
								autoComplete="current-password"
								className="w-full"
								inputClassName="w-full"
								style={{
									width: "100%",
									display: "block",
								}}
								inputStyle={{
									width: "100%",
								}}
							/>
						</div>

						<div className="flex items-center justify-between">
							<label className="flex items-center gap-2 text-xs text-white/70">
								<Checkbox
									inputId="remember"
									checked={rememberMe}
									onChange={(e) => setRememberMe(Boolean(e.checked))}
								/>

								Lembrar de mim
							</label>

							<a href="#" className="text-xs text-sky-400 hover:text-sky-300">
								Esqueci minha senha
							</a>
						</div>

						<Button
							type="submit"
							label="Entrar"
							icon="pi pi-sign-in"
							className="w-full"
						/>

						<p className="pt-1 text-center text-xs text-white/70">
							Ainda não possui conta?{" "}
							<Link
								className="text-sky-400 hover:text-sky-300"
								href="/auth/register"
							>
								Criar agora
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}