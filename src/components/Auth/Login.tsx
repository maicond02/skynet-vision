"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useId, useState } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

import {
    getStoredSession,
    loginLocalUser,
} from "../../features/auth/services/auth.service";

export default function LoginPage() {
    const router = useRouter();
    const emailId = useId();
    const passwordId = useId();
    const rememberId = useId();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (getStoredSession()) {
            router.replace("/dashboard");
        }
    }, [router]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage(null);
        setIsLoading(true);

        try {
            await loginLocalUser({
                email,
                password,
                rememberMe,
            });

            router.replace("/dashboard");
        } catch (error) {
            setErrorMessage(
                error instanceof Error ? error.message : "Não foi possível entrar.",
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="auth-page relative isolate min-h-screen w-full overflow-hidden bg-[#0a0a0a] text-white selection:bg-sky-500/30">
            <style jsx global>{`
                .auth-page .p-inputtext,
                .auth-page .p-password-input {
                    width: 100% !important;
                    height: 48px !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    border-radius: 0.75rem !important;
                    background: rgba(255, 255, 255, 0.05) !important;
                    color: #ffffff !important;
                    padding-top: 0.75rem !important;
                    padding-bottom: 0.75rem !important;
                    transition:
                        border-color 0.2s ease,
                        box-shadow 0.2s ease,
                        background 0.2s ease;
                }

                .auth-page .p-inputtext::placeholder,
                .auth-page .p-password-input::placeholder {
                    color: rgba(255, 255, 255, 0.22) !important;
                }

                .auth-page .p-inputtext:enabled:focus,
                .auth-page .p-password-input:enabled:focus {
                    border-color: rgba(14, 165, 233, 0.9) !important;
                    box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.16) !important;
                    background: rgba(255, 255, 255, 0.075) !important;
                }

                .login-password,
                .login-password .p-password,
                .login-password .p-icon-field,
                .login-password .p-input-icon-right,
                .login-password .p-password-input,
                .login-password input {
                    width: 100% !important;
                    display: block !important;
                }

                .login-password input {
                    padding-right: 3rem !important;
                }

                .login-password svg,
                .login-password .p-password-toggle-mask-icon {
                    color: rgba(255, 255, 255, 0.5) !important;
                }

                .login-checkbox .p-checkbox-box {
                    border-color: rgba(255, 255, 255, 0.18) !important;
                    background: rgba(255, 255, 255, 0.05) !important;
                }

                .login-checkbox.p-highlight .p-checkbox-box {
                    border-color: #0ea5e9 !important;
                    background: #0ea5e9 !important;
                }

                .auth-page .p-button {
                    border-radius: 999px !important;
                    font-weight: 700 !important;
                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease,
                        background 0.2s ease;
                }

                .auth-page .p-button:enabled:hover {
                    transform: translateY(-1px);
                }

                .auth-page .auth-primary-button.p-button {
                    border: none !important;
                    background: linear-gradient(135deg, #0ea5e9, #2563eb) !important;
                    box-shadow: 0 18px 45px rgba(14, 165, 233, 0.22) !important;
                }

                .auth-page .auth-primary-button.p-button:enabled:hover {
                    background: linear-gradient(135deg, #38bdf8, #1d4ed8) !important;
                    box-shadow: 0 22px 55px rgba(14, 165, 233, 0.32) !important;
                }
            `}</style>

            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.16),transparent_36%),linear-gradient(135deg,#0a0a0a,#111827_48%,#0a0a0a)]" />
                <div className="absolute -left-[12%] -top-[8%] h-[420px] w-[420px] rounded-full bg-sky-500/10 blur-[140px]" />
                <div className="absolute -bottom-[10%] -right-[12%] h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[140px]" />
                <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60" />
            </div>

            <section className="flex min-h-screen items-center justify-center px-4 pb-10 pt-28">
                <div className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] shadow-2xl shadow-sky-950/20 backdrop-blur-xl md:flex-row">
                    <div className="flex w-full flex-col justify-center p-8 md:w-1/2 lg:p-12">
                        <div className="mb-8">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-medium text-sky-200">
                                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
                                Área segura
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
                                Acessar conta
                            </h1>

                            <p className="mt-2 text-sm leading-6 text-white/55">
                                Seja bem-vindo de volta ao sistema de monitoramento inteligente.
                            </p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {errorMessage ? (
                                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                                    {errorMessage}
                                </div>
                            ) : null}

                            <div className="space-y-1.5">
                                <label
                                    htmlFor={emailId}
                                    className="text-xs font-semibold uppercase tracking-wider text-white/40"
                                >
                                    E-mail
                                </label>

                                <InputText
                                    id={emailId}
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="seuemail@exemplo.com"
                                    className="w-full"
                                    autoComplete="email"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor={passwordId}
                                        className="text-xs font-semibold uppercase tracking-wider text-white/40"
                                    >
                                        Senha
                                    </label>

                                    <a href="#" className="text-xs text-sky-400 hover:underline">
                                        Esqueceu a senha?
                                    </a>
                                </div>

                                <div className="login-password">
                                    <Password
                                        id={passwordId}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        feedback={false}
                                        toggleMask
                                        className="w-full"
                                        inputClassName="w-full"
                                        autoComplete="current-password"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center pt-2">
                                <label
                                    htmlFor={rememberId}
                                    className="flex cursor-pointer items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                                >
                                    <Checkbox
                                        inputId={rememberId}
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(Boolean(e.checked))}
                                        className="login-checkbox"
                                        disabled={isLoading}
                                    />
                                    Lembrar de mim
                                </label>
                            </div>

                            <Button
                                type="submit"
                                label={isLoading ? "Entrando..." : "Entrar"}
                                icon="pi pi-sign-in"
                                iconPos="right"
                                className="auth-primary-button w-full py-3 text-white"
                                disabled={isLoading}
                            />
                        </form>

                        <p className="mt-8 text-center text-sm text-white/40">
                            Ainda não possui conta?{" "}
                            <Link
                                className="font-semibold text-sky-400 hover:text-sky-300"
                                href="/auth/register"
                            >
                                Crie uma agora
                            </Link>
                        </p>
                    </div>

                    <div className="relative hidden w-1/2 flex-col justify-end overflow-hidden border-l border-white/10 bg-white/[0.03] p-12 md:flex">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px]" />
                        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

                        <div className="relative z-20">
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 shadow-xl shadow-sky-950/20">
                                <i className="pi pi-eye text-2xl text-sky-300" />
                            </div>

                            <h2 className="text-3xl font-bold text-white lg:text-4xl">
                                Skynet Vision
                            </h2>

                            <p className="mt-4 text-lg leading-relaxed text-white/65">
                                O futuro do monitoramento inteligente em suas mãos. Explore
                                novas possibilidades com visão computacional de ponta.
                            </p>

                            <div className="mt-8 flex gap-4">
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-white">99%</span>
                                    <span className="text-[10px] uppercase tracking-widest text-white/40">
                                        Precisão
                                    </span>
                                </div>

                                <div className="h-8 w-px bg-white/10" />

                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-white">Real-time</span>
                                    <span className="text-[10px] uppercase tracking-widest text-white/40">
                                        Monitoramento
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}