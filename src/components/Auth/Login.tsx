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
    const rememberId = useId();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 py-8 font-sans selection:bg-sky-500/30">
            <style jsx global>{`
                .login-password,
                .login-password .p-password,
                .login-password .p-icon-field,
                .login-password .p-input-icon-right,
                .login-password input {
                    width: 100% !important;
                    display: block !important;
                }

                .login-password input {
                    height: 48px !important;
                    padding-top: 0.75rem !important;
                    padding-bottom: 0.75rem !important;
                }

                .login-password .p-password-input {
                    width: 100% !important;
                }

                .login-password .p-password .p-icon-field {
                    width: 100% !important;
                }

                .login-checkbox .p-checkbox-box {
                    border-color: rgba(255, 255, 255, 0.18);
                    background: rgba(255, 255, 255, 0.05);
                }

                .login-checkbox.p-highlight .p-checkbox-box {
                    border-color: #0ea5e9;
                    background: #0ea5e9;
                }
            `}</style>

            <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
                <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-sky-500/5 blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-sky-500/5 blur-[120px]" />
            </div>

            <div className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#121212] shadow-2xl md:flex-row">
                <div className="flex w-full flex-col justify-center p-8 md:w-1/2 lg:p-12">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
                            Acessar conta
                        </h1>

                        <p className="mt-2 text-sm text-white/50">
                            Seja bem-vindo de volta ao sistema de monitoramento inteligente.
                        </p>
                    </div>

                    <form className="space-y-4">
                        <div className="space-y-1.5">
                            <label
                                htmlFor={emailId}
                                className="text-xs font-semibold uppercase tracking-wider text-white/40"
                            >
                                E-mail
                            </label>

                            <InputText
                                id={emailId}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seuemail@exemplo.com"
                                className="h-12 w-full border-white/10 bg-white/5 py-3 text-white placeholder:text-white/20 focus:border-sky-500"
                                autoComplete="email"
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

                                <a
                                    href="#"
                                    className="text-xs text-sky-400 hover:underline"
                                >
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
                                    inputClassName="w-full border-white/10 bg-white/5 py-3 text-white placeholder:text-white/20 focus:border-sky-500"
                                    autoComplete="current-password"
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
                                />

                                Lembrar de mim
                            </label>
                        </div>

                        <Button
                            type="submit"
                            label="Entrar"
                            className="w-full bg-sky-500 py-3 font-bold text-white shadow-lg shadow-sky-500/20 transition-all hover:bg-sky-400 hover:shadow-sky-500/40"
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

                <div className="relative hidden w-1/2 flex-col justify-end bg-sky-950 p-12 md:flex">
                    <div
                        className="absolute inset-0 opacity-40 mix-blend-overlay"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                    <div className="relative z-20">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500 shadow-xl shadow-sky-500/20">
                            <i className="pi pi-eye text-2xl text-white" />
                        </div>

                        <h2 className="text-3xl font-bold text-white lg:text-4xl">
                            Skynet Vision
                        </h2>

                        <p className="mt-4 text-lg leading-relaxed text-white/70">
                            O futuro do monitoramento inteligente em suas mãos. Explore
                            novas possibilidades com visão computacional de ponta.
                        </p>

                        <div className="mt-8 flex gap-4">
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-white">
                                    99%
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-white/40">
                                    Precisão
                                </span>
                            </div>

                            <div className="h-8 w-px bg-white/10" />

                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-white">
                                    Real-time
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-white/40">
                                    Monitoramento
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}