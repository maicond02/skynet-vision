"use client";

import React from "react";
import { Button } from "primereact/button";

type Metric = {
	value: string;
	description: string;
	valueClassName?: string;
};

type Feature = {
	icon: string;
	title: string;
	description: string;
};

type Step = {
	number: string;
	title: string;
	description: string;
};

type UseCase = {
	title: string;
	description: string;
};

export default function Main() {
	const metrics: Metric[] = [
		{
			value: "99%",
			description: "Precisão na detecção e alertas",
		},
		{
			value: "<100ms",
			description: "Latência em tempo real",
			valueClassName: "text-green-400",
		},
		{
			value: "24/7",
			description: "Monitoramento contínuo",
		},
		{
			value: "YOLOv8",
			description: "Tecnologia de ponta em IA",
		},
	];

	const features: Feature[] = [
		{
			icon: "pi pi-video",
			title: "Monitoramento inteligente",
			description:
				"Acompanhe câmeras em tempo real com análise automática de eventos críticos.",
		},
		{
			icon: "pi pi-bell",
			title: "Alertas instantâneos",
			description:
				"Receba notificações imediatas quando comportamentos suspeitos forem detectados.",
		},
		{
			icon: "pi pi-chart-line",
			title: "Análise operacional",
			description:
				"Transforme dados visuais em insights para melhorar segurança, produtividade e tomada de decisão.",
		},
	];

	const steps: Step[] = [
		{
			number: "01",
			title: "Conecte suas câmeras",
			description:
				"Integre câmeras IP, sistemas locais ou fontes de vídeo já existentes na sua operação.",
		},
		{
			number: "02",
			title: "A IA analisa em tempo real",
			description:
				"O sistema processa os frames usando modelos inteligentes para identificar padrões e riscos.",
		},
		{
			number: "03",
			title: "Receba alertas e relatórios",
			description:
				"Notificações, registros e métricas ajudam sua equipe a agir com mais velocidade.",
		},
	];

	const useCases: UseCase[] = [
		{
			title: "Segurança patrimonial",
			description:
				"Detecção de invasões, movimentações suspeitas e situações de risco em áreas monitoradas.",
		},
		{
			title: "Ambientes corporativos",
			description:
				"Monitoramento de escritórios, fábricas, centros logísticos e espaços de grande circulação.",
		},
		{
			title: "Operações críticas",
			description:
				"Acompanhamento contínuo para equipes que precisam agir rapidamente diante de incidentes.",
		},
	];

	return (
		<main className="w-full">
			<section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col items-center justify-center px-4 pt-20">
				<div className="text-center">
					<h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
						Desbloqueando a tecnologia
					</h1>

					<p className="mx-auto mt-4 max-w-2xl text-pretty text-sm text-white/70 md:text-base">
						Capacitando empresas e equipes com visão digital com soluções de TI que
						otimizam operações, aumentam a eficiência e impulsionam o crescimento.
					</p>

					<div className="mt-6 flex items-center justify-center gap-3">
						<Button label="Começar" rounded />

						<Button
							label="Ver demonstração"
							icon="pi pi-play"
							iconPos="left"
							text
							rounded
						/>
					</div>
				</div>

				<div className="mt-10 grid w-full grid-cols-1 gap-4 md:grid-cols-4">
					{metrics.map((metric) => (
						<div
							key={metric.value}
							className="rounded-lg border border-white/10 bg-white/5 p-4"
						>
							<div
								className={`text-lg font-semibold ${
									metric.valueClassName ?? ""
								}`}
							>
								{metric.value}
							</div>

							<div className="mt-1 text-xs text-white/70">
								{metric.description}
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-4 py-20">
				<div className="max-w-2xl">
					<span className="text-xs font-medium uppercase tracking-[0.3em] text-sky-400">
						Recursos
					</span>

					<h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
						Uma plataforma criada para decisões rápidas
					</h2>

					<p className="mt-4 text-sm leading-6 text-white/70 md:text-base">
						Combine visão computacional, automação e relatórios inteligentes para
						entender o que está acontecendo em tempo real e reduzir o tempo de
						resposta da sua equipe.
					</p>
				</div>

				<div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="rounded-xl border border-white/10 bg-white/[0.04] p-6"
						>
							<div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-400/10 text-sky-400">
								<i className={feature.icon} />
							</div>

							<h3 className="mt-5 text-base font-semibold">{feature.title}</h3>

							<p className="mt-2 text-sm leading-6 text-white/70">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-4 py-20">
				<div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
					<div>
						<span className="text-xs font-medium uppercase tracking-[0.3em] text-green-400">
							Como funciona
						</span>

						<h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
							Da câmera ao alerta em poucos segundos
						</h2>

						<p className="mt-4 text-sm leading-6 text-white/70 md:text-base">
							O sistema recebe o vídeo, processa as imagens com inteligência
							artificial e envia alertas automáticos sempre que identificar eventos
							importantes.
						</p>

						<div className="mt-6">
							<Button label="Conhecer solução" icon="pi pi-arrow-right" rounded />
						</div>
					</div>

					<div className="space-y-4">
						{steps.map((step) => (
							<div
								key={step.number}
								className="rounded-xl border border-white/10 bg-white/[0.04] p-5"
							>
								<div className="text-xs font-semibold text-sky-400">
									{step.number}
								</div>

								<h3 className="mt-2 text-base font-semibold">{step.title}</h3>

								<p className="mt-2 text-sm leading-6 text-white/70">
									{step.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-4 py-20">
				<div className="text-center">
					<span className="text-xs font-medium uppercase tracking-[0.3em] text-sky-400">
						Aplicações
					</span>

					<h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
						Ideal para diferentes cenários
					</h2>

					<p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/70 md:text-base">
						A solução pode ser adaptada para empresas, condomínios, indústrias,
						operações logísticas e ambientes que precisam de vigilância inteligente.
					</p>
				</div>

				<div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
					{useCases.map((useCase) => (
						<div
							key={useCase.title}
							className="rounded-xl border border-white/10 bg-white/[0.04] p-6"
						>
							<h3 className="text-base font-semibold">{useCase.title}</h3>

							<p className="mt-2 text-sm leading-6 text-white/70">
								{useCase.description}
							</p>
						</div>
					))}
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-4 pb-24">
				<div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-8 text-center md:p-12">
					<h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
						Pronto para modernizar sua operação?
					</h2>

					<p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/70 md:text-base">
						Automatize o monitoramento, reduza riscos e tenha mais controle sobre
						seus ambientes com uma plataforma inteligente e escalável.
					</p>

					<div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
						<Button label="Começar agora" icon="pi pi-check" rounded />

						<Button
							label="Falar com especialista"
							icon="pi pi-comments"
							outlined
							rounded
						/>
					</div>
				</div>
			</section>
		</main>
	);
}