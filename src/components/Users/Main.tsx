"use client";

import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

import Sidebar from "../Dashboard/Sidebar";
import Topbar from "../Dashboard/Topbar";

import {
    createLocalUser,
    deleteLocalUser,
    getLocalUsers,
    updateLocalUser,
} from "../../features/auth/services/auth.service";
import type { AuthUser } from "../../features/auth/types/auth.types";

type UserFormState = {
    id: string | null;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const emptyFormState: UserFormState = {
    id: null,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};

function formatDate(value: string) {
    return new Date(value).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

export default function UsersMain() {
    const [users, setUsers] = useState<AuthUser[]>([]);
    const [formState, setFormState] = useState<UserFormState>(emptyFormState);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        setUsers(getLocalUsers());
        setLoading(false);
    }, []);

    const isEditing = Boolean(formState.id);

    const totalUsers = useMemo(() => users.length, [users]);

    function resetForm() {
        setFormState(emptyFormState);
        setFormVisible(false);
        setSaving(false);
    }

    function openCreateForm() {
        setErrorMessage(null);
        setSuccessMessage(null);
        setFormState(emptyFormState);
        setFormVisible(true);
    }

    function startEditing(user: AuthUser) {
        setErrorMessage(null);
        setSuccessMessage(null);

        setFormState({
            id: user.id,
            name: user.name,
            email: user.email,
            password: "",
            confirmPassword: "",
        });

        setFormVisible(true);
    }

    function refreshUsers() {
        setUsers(getLocalUsers());
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setErrorMessage(null);
        setSuccessMessage(null);

        if (!formState.name.trim() || !formState.email.trim()) {
            setErrorMessage("Preencha nome e e-mail.");
            return;
        }

        if (!isEditing && !formState.password) {
            setErrorMessage("Defina uma senha para criar o usuário.");
            return;
        }

        if (formState.password && formState.password !== formState.confirmPassword) {
            setErrorMessage("As senhas precisam ser iguais.");
            return;
        }

        setSaving(true);

        try {
            if (isEditing && formState.id) {
                updateLocalUser(formState.id, {
                    name: formState.name.trim(),
                    email: formState.email.trim(),
                    password: formState.password || undefined,
                });

                setSuccessMessage("Usuário atualizado com sucesso.");
            } else {
                createLocalUser({
                    name: formState.name.trim(),
                    email: formState.email.trim(),
                    password: formState.password,
                });

                setSuccessMessage("Usuário criado com sucesso.");
            }

            refreshUsers();
            setFormState(emptyFormState);
            setFormVisible(false);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Falha ao salvar.");
        } finally {
            setSaving(false);
        }
    }

    function handleDelete(userId: string) {
        setErrorMessage(null);
        setSuccessMessage(null);

        const confirmed = window.confirm("Tem certeza que deseja remover este usuário?");

        if (!confirmed) {
            return;
        }

        try {
            deleteLocalUser(userId);
            refreshUsers();

            if (formState.id === userId) {
                resetForm();
            }

            setSuccessMessage("Usuário removido com sucesso.");
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Falha ao remover.");
        }
    }

    const dialogHeader = (
        <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 text-sky-300">
                <i className={isEditing ? "pi pi-user-edit" : "pi pi-user-plus"} />
            </div>

            <div>
                <h2 className="m-0 text-lg font-bold text-white">
                    {isEditing ? "Editar usuário" : "Adicionar usuário"}
                </h2>

                <p className="m-0 mt-1 text-sm font-normal text-white/50">
                    {isEditing
                        ? "Atualize os dados do usuário selecionado."
                        : "Cadastre um novo usuário para acessar o sistema."}
                </p>
            </div>
        </div>
    );

    const dialogFooter = (
        <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-4 sm:flex-row sm:justify-end">
            <Button
                type="button"
                label="Cancelar"
                text
                onClick={resetForm}
                className="users-cancel-button w-full sm:w-auto"
                disabled={saving}
            />

            <Button
                type="submit"
                form="user-form"
                label={saving ? "Salvando..." : isEditing ? "Salvar alterações" : "Adicionar usuário"}
                icon={isEditing ? "pi pi-save" : "pi pi-user-plus"}
                className="users-primary-button w-full sm:w-auto"
                disabled={saving || loading}
            />
        </div>
    );

    return (
        <div className="users-page min-h-screen bg-black text-white">
            <style jsx global>{`
                .users-page .p-inputtext,
                .users-page .p-password-input {
                    width: 100% !important;
                    height: 46px !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    border-radius: 0.85rem !important;
                    background: rgba(255, 255, 255, 0.045) !important;
                    color: #ffffff !important;
                    padding-left: 0.9rem !important;
                    padding-right: 0.9rem !important;
                    transition:
                        border-color 0.2s ease,
                        box-shadow 0.2s ease,
                        background 0.2s ease;
                }

                .users-page .p-inputtext::placeholder,
                .users-page .p-password-input::placeholder {
                    color: rgba(255, 255, 255, 0.25) !important;
                }

                .users-page .p-inputtext:enabled:hover,
                .users-page .p-password-input:enabled:hover {
                    border-color: rgba(56, 189, 248, 0.35) !important;
                }

                .users-page .p-inputtext:enabled:focus,
                .users-page .p-password-input:enabled:focus {
                    border-color: rgba(14, 165, 233, 0.9) !important;
                    box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.14) !important;
                    background: rgba(255, 255, 255, 0.065) !important;
                }

                .users-page .users-password,
                .users-page .users-password .p-password,
                .users-page .users-password .p-icon-field,
                .users-page .users-password .p-input-icon-right,
                .users-page .users-password .p-password-input,
                .users-page .users-password input {
                    width: 100% !important;
                    display: block !important;
                }

                .users-page .users-password input {
                    padding-right: 3rem !important;
                }

                .users-page .users-password svg,
                .users-page .users-password .p-password-toggle-mask-icon {
                    color: rgba(255, 255, 255, 0.5) !important;
                }

                .users-dialog.p-dialog {
                    overflow: hidden !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    border-radius: 1.35rem !important;
                    background: #050505 !important;
                    color: #ffffff !important;
                    box-shadow:
                        0 28px 90px rgba(0, 0, 0, 0.75),
                        0 0 0 1px rgba(255, 255, 255, 0.03) !important;
                }

                .users-dialog .p-dialog-header {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
                    background: #050505 !important;
                    color: #ffffff !important;
                    padding: 1.4rem 1.5rem !important;
                }

                .users-dialog .p-dialog-content {
                    background: #050505 !important;
                    color: #ffffff !important;
                    padding: 1.5rem !important;
                }

                .users-dialog .p-dialog-footer {
                    background: #050505 !important;
                    padding: 0 1.5rem 1.5rem !important;
                }

                .users-dialog .p-dialog-header-close {
                    border-radius: 999px !important;
                    color: rgba(255, 255, 255, 0.6) !important;
                }

                .users-dialog .p-dialog-header-close:hover {
                    background: rgba(255, 255, 255, 0.08) !important;
                    color: #ffffff !important;
                }

                .users-page .p-dialog-mask {
                    background: rgba(0, 0, 0, 0.72) !important;
                    backdrop-filter: blur(6px);
                }

                .users-page .users-primary-button.p-button {
                    border: none !important;
                    border-radius: 999px !important;
                    background: linear-gradient(135deg, #0ea5e9, #2563eb) !important;
                    font-weight: 700 !important;
                    color: #ffffff !important;
                    box-shadow: 0 16px 38px rgba(14, 165, 233, 0.2) !important;
                }

                .users-page .users-primary-button.p-button:enabled:hover {
                    background: linear-gradient(135deg, #38bdf8, #1d4ed8) !important;
                    box-shadow: 0 20px 48px rgba(14, 165, 233, 0.28) !important;
                }

                .users-page .users-cancel-button.p-button {
                    border-radius: 999px !important;
                    color: rgba(255, 255, 255, 0.65) !important;
                }

                .users-page .users-cancel-button.p-button:enabled:hover {
                    background: rgba(255, 255, 255, 0.08) !important;
                    color: #ffffff !important;
                }

                .users-page .p-tooltip .p-tooltip-text {
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    border-radius: 0.75rem !important;
                    background: #111111 !important;
                    color: rgba(255, 255, 255, 0.86) !important;
                    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45) !important;
                    font-size: 0.75rem !important;
                }
            `}</style>

            <Sidebar />

            <div className="min-h-screen bg-black lg:pl-[280px]">
                <Topbar />

                <main className="mx-auto max-w-[1600px] p-4 lg:p-6">
                    <section className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#050505] p-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="m-0 text-2xl font-bold text-slate-100 md:text-3xl">
                                Usuários
                            </h1>

                            <p className="mt-1 text-sm text-white/55">
                                Gerencie acesso e permissões do sistema.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/60">
                            <i className="pi pi-users text-sky-400" />
                            <span>{totalUsers} usuário(s)</span>
                        </div>
                    </section>

                    {errorMessage && !formVisible ? (
                        <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                            {errorMessage}
                        </div>
                    ) : null}

                    {successMessage && !formVisible ? (
                        <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                            {successMessage}
                        </div>
                    ) : null}

                    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#050505]">
                        <div className="flex flex-col gap-4 border-b border-white/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10">
                                    <i className="pi pi-list text-sky-400" />
                                </div>

                                <div>
                                    <h2 className="m-0 text-sm font-semibold text-white">
                                        Lista de usuários
                                    </h2>

                                    <p className="m-0 mt-1 text-xs text-white/40">
                                        {loading ? "Carregando..." : `${users.length} registro(s) encontrados`}
                                    </p>
                                </div>
                            </div>

                            <Button
                                label="Adicionar usuário"
                                icon="pi pi-user-plus"
                                onClick={openCreateForm}
                                className="users-primary-button"
                                tooltip="Criar novo usuário"
                                tooltipOptions={{ position: "left" }}
                            />
                        </div>

                        <div className="p-6">
                            {users.length === 0 ? (
                                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-6 py-14 text-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                                        <i className="pi pi-users text-3xl text-white/25" />
                                    </div>

                                    <p className="m-0 text-sm font-medium text-white/70">
                                        Nenhum usuário cadastrado ainda.
                                    </p>

                                    <p className="m-0 max-w-sm text-xs leading-5 text-white/40">
                                        Clique em “Adicionar usuário” para criar o primeiro acesso ao sistema.
                                    </p>

                                    <Button
                                        label="Adicionar usuário"
                                        icon="pi pi-user-plus"
                                        onClick={openCreateForm}
                                        className="users-primary-button mt-2"
                                    />
                                </div>
                            ) : (
                                <div className="overflow-hidden rounded-2xl border border-white/10">
                                    <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                                        <thead className="bg-white/[0.035] text-xs uppercase tracking-wider text-white/40">
                                            <tr>
                                                <th className="px-4 py-3">Nome</th>
                                                <th className="px-4 py-3">E-mail</th>
                                                <th className="px-4 py-3">Criado em</th>
                                                <th className="px-4 py-3 text-right">Ações</th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-white/10 bg-black">
                                            {users.map((user) => (
                                                <tr
                                                    key={user.id}
                                                    className="transition hover:bg-white/[0.035]"
                                                >
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-400/10 text-xs font-bold uppercase text-sky-300">
                                                                {user.name.slice(0, 1)}
                                                            </div>

                                                            <span className="font-medium text-white">
                                                                {user.name}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-4 text-white/65">
                                                        {user.email}
                                                    </td>

                                                    <td className="px-4 py-4 text-white/50">
                                                        {formatDate(user.createdAt)}
                                                    </td>

                                                    <td className="px-4 py-4 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                icon="pi pi-pencil"
                                                                text
                                                                rounded
                                                                onClick={() => startEditing(user)}
                                                                className="text-sky-300 hover:bg-sky-400/10"
                                                                tooltip="Editar usuário"
                                                                tooltipOptions={{ position: "top" }}
                                                                aria-label={`Editar usuário ${user.name}`}
                                                            />

                                                            <Button
                                                                icon="pi pi-trash"
                                                                text
                                                                rounded
                                                                onClick={() => handleDelete(user.id)}
                                                                className="text-red-300 hover:bg-red-500/10"
                                                                tooltip="Remover usuário"
                                                                tooltipOptions={{ position: "top" }}
                                                                aria-label={`Remover usuário ${user.name}`}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </section>

                    <Dialog
                        header={dialogHeader}
                        footer={dialogFooter}
                        visible={formVisible}
                        modal
                        closable
                        dismissableMask
                        draggable={false}
                        resizable={false}
                        style={{ width: "min(92vw, 560px)" }}
                        className="users-dialog"
                        onHide={resetForm}
                    >
                        <div className="space-y-4">
                            {errorMessage ? (
                                <div className="flex gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                                    <i className="pi pi-exclamation-triangle mt-0.5 shrink-0" />
                                    <span>{errorMessage}</span>
                                </div>
                            ) : null}

                            {successMessage ? (
                                <div className="flex gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                                    <i className="pi pi-check-circle mt-0.5 shrink-0" />
                                    <span>{successMessage}</span>
                                </div>
                            ) : null}

                            {isEditing ? (
                                <div className="rounded-xl border border-sky-400/15 bg-sky-400/10 px-4 py-3 text-xs leading-5 text-sky-100/80">
                                    <strong className="font-semibold text-sky-200">
                                        Dica:
                                    </strong>{" "}
                                    deixe os campos de senha em branco se não quiser alterar a senha atual.
                                </div>
                            ) : null}

                            <form id="user-form" className="space-y-4" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-white/40">
                                        Nome
                                    </label>

                                    <InputText
                                        value={formState.name}
                                        onChange={(e) =>
                                            setFormState((current) => ({
                                                ...current,
                                                name: e.target.value,
                                            }))
                                        }
                                        placeholder="Nome do usuário"
                                        autoComplete="name"
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-white/40">
                                        E-mail
                                    </label>

                                    <InputText
                                        type="email"
                                        value={formState.email}
                                        onChange={(e) =>
                                            setFormState((current) => ({
                                                ...current,
                                                email: e.target.value,
                                            }))
                                        }
                                        placeholder="usuario@exemplo.com"
                                        autoComplete="email"
                                        className="w-full"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-white/40">
                                            Senha {isEditing ? "(opcional)" : ""}
                                        </label>

                                        <div className="users-password">
                                            <Password
                                                value={formState.password}
                                                onChange={(e) =>
                                                    setFormState((current) => ({
                                                        ...current,
                                                        password: e.target.value,
                                                    }))
                                                }
                                                placeholder={isEditing ? "Nova senha" : "Senha"}
                                                feedback={false}
                                                toggleMask
                                                autoComplete="new-password"
                                                className="w-full"
                                                inputClassName="w-full"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-white/40">
                                            Confirmar senha
                                        </label>

                                        <div className="users-password">
                                            <Password
                                                value={formState.confirmPassword}
                                                onChange={(e) =>
                                                    setFormState((current) => ({
                                                        ...current,
                                                        confirmPassword: e.target.value,
                                                    }))
                                                }
                                                placeholder="Repita a senha"
                                                feedback={false}
                                                toggleMask
                                                autoComplete="new-password"
                                                className="w-full"
                                                inputClassName="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Dialog>
                </main>
            </div>
        </div>
    );
}