"use client";

import React from "react";

import Sidebar from "../Dashboard/Sidebar";
import Topbar from "../Dashboard/Topbar";

export default function UsersMain() {
	return (
		<div className="min-h-screen bg-black text-white">
			<Sidebar />

			<div className="min-h-screen lg:pl-[280px]">
				<Topbar />

				<main className="mx-auto max-w-[1600px] p-4 lg:p-6">
					<section className="mb-6 flex flex-col gap-4 rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
						<div>
							<h1 className="m-0 text-2xl font-bold text-slate-200 md:text-3xl">
								Usuários
							</h1>
							<p className="mt-1 text-sm text-white/60">
								Gerencie acesso e permissões do sistema.
							</p>
						</div>

						<div className="flex items-center gap-3 text-xs text-white/60">
							<i className="pi pi-users text-sky-400" />
							<span>Em desenvolvimento</span>
						</div>
					</section>

					<section className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
						<div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
							<div className="flex items-center gap-3">
								<i className="pi pi-id-card text-sky-400" />
								<h2 className="m-0 text-sm font-semibold text-white">
									Administração de usuários
								</h2>
							</div>
							<div className="text-xs text-white/60">—</div>
						</div>

						<div className="p-6">
							<div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-white/10 bg-black/20 px-6 py-14 text-center">
								<i className="pi pi-wrench text-4xl text-white/20" />
								<p className="m-0 text-sm text-white/60">
									Tela de usuários ainda não está integrada.
								</p>
								<p className="m-0 text-xs text-white/40">
									Quando o endpoint/API de usuários estiver disponível, esta área
									vai exibir listagem, criação e edição.
								</p>
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
