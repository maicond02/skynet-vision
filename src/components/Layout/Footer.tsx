import Link from "next/link";
import React from "react";

export default function Footer({ dashboard = false }: { dashboard?: boolean }) {
	if (dashboard) {
		return (
			<footer className="dashboard-footer w-full border-t border-white/10 bg-black text-slate-200 lg:pl-[280px]">
				<div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-6">
					<div>
						<div className="font-semibold tracking-wide">SKYNET-VISION</div>
						<p className="mb-0 mt-1 text-xs opacity-70">Monitoramento inteligente em tempo real.</p>
					</div>
					<p className="m-0 text-xs opacity-70">© {new Date().getFullYear()} SKYNET-VISION · Todos os direitos reservados.</p>
				</div>
			</footer>
		);
	}

	return (
		<footer className="public-footer w-full border-t border-white/10 bg-transparent">
			<div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-10 md:grid-cols-3 md:items-start">
				<div>
					<div className="text-sm font-semibold tracking-wide">SKYNET-VISION</div>
					<p className="mt-2 max-w-sm text-xs text-white/70">
						Plataforma de visão computacional para monitoramento inteligente.
					</p>
				</div>

				<nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/70 md:justify-center">
					<Link className="hover:text-white" href="/">
						Início
					</Link>
					<a className="hover:text-white" href="#features">
						Recursos
					</a>
					<a className="hover:text-white" href="#contact">
						Contato
					</a>
					<Link className="hover:text-white" href="/dashboard">
						Dashboard
					</Link>
				</nav>

				<div className="text-xs text-white/70 md:text-right">
					<div>© {new Date().getFullYear()} SKYNET-VISION</div>
					<div className="mt-1">Todos os direitos reservados.</div>
				</div>
			</div>
		</footer>
	);
}

