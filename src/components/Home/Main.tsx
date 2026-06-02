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
            valueClassName: "text-emerald-400",
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
        <main className="relative isolate min-h-screen w-full overflow-hidden bg-[#0a0a0a] text-white selection:bg-sky-500/30">
            <style jsx global>{`
                .home-page .p-button {
                    border-radius: 999px;
                    font-weight: 700;
                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease,
                        background 0.2s ease,
                        border-color 0.2s ease;
                }

                .home-page .p-button:enabled:hover {
                    transform: translateY(-1px);
                }

                .home-page .p-button:not(.p-button-text):not(.p-button-outlined) {
                    border: none;
                    background: linear-gradient(135deg, #0ea5e9, #2563eb);
                    box-shadow: 0 18px 45px rgba(14, 165, 233, 0.22);
                }

                .home-page .p-button:not(.p-button-text):not(.p-button-outlined):enabled:hover {
                    background: linear-gradient(135deg, #38bdf8, #1d4ed8);
                    box-shadow: 0 22px 55px rgba(14, 165, 233, 0.32);
                }

                .home-page .p-button.p-button-text {
                    color: rgba(255, 255, 255, 0.72);
                }

                .home-page .p-button.p-button-text:enabled:hover {
                    background: rgba(255, 255, 255, 0.08);
                    color: #ffffff;
                }

                .home-page .p-button.p-button-outlined {
                    border-color: rgba(56, 189, 248, 0.55);
                    color: #7dd3fc;
                }

                .home-page .p-button.p-button-outlined:enabled:hover {
                    border-color: rgba(125, 211, 252, 0.85);
                    background: rgba(14, 165, 233, 0.1);
                    color: #bae6fd;
                }
            `}</style>

            {/* Fundo geral igual às telas de login/registro */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.16),transparent_36%),linear-gradient(135deg,#0a0a0a,#111827_48%,#0a0a0a)]" />

                <div className="absolute -left-[12%] -top-[8%] h-[420px] w-[420px] rounded-full bg-sky-500/10 blur-[140px]" />
                <div className="absolute -bottom-[10%] -right-[12%] h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[140px]" />

                <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl" />

                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60" />
            </div>

            <div className="home-page">
                <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 pb-16 pt-28">
                    <div className="text-center">
                        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-medium text-sky-200 shadow-lg shadow-sky-950/20 backdrop-blur">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
                            Monitoramento inteligente em tempo real
                        </div>

                        <h1 className="text-balance text-4xl font-bold tracking-tight text-white md:text-6xl">
                            Visão computacional para operações mais seguras
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-pretty text-sm leading-6 text-white/60 md:text-base">
                            Capacitando empresas e equipes com inteligência artificial,
                            automação e análise visual para detectar eventos críticos,
                            reduzir riscos e agir com mais velocidade.
                        </p>

                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Button label="Começar" icon="pi pi-arrow-right" iconPos="right" />

                            <Button
                                label="Ver demonstração"
                                icon="pi pi-play"
                                iconPos="left"
                                text
                            />
                        </div>
                    </div>

                    <div className="mt-12 grid w-full grid-cols-1 gap-4 md:grid-cols-4">
                        {metrics.map((metric) => (
                            <div
                                key={metric.value}
                                className="group rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-xl shadow-black/10 backdrop-blur transition-all hover:-translate-y-1 hover:border-sky-400/30 hover:bg-white/[0.07]"
                            >
                                <div
                                    className={`text-2xl font-bold ${
                                        metric.valueClassName ?? "text-white"
                                    }`}
                                >
                                    {metric.value}
                                </div>

                                <div className="mt-2 text-xs leading-5 text-white/55">
                                    {metric.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="features" className="mx-auto max-w-6xl px-4 py-20">
                    <div className="max-w-2xl">
                        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
                            Recursos
                        </span>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                            Uma plataforma criada para decisões rápidas
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-white/60 md:text-base">
                            Combine visão computacional, automação e relatórios inteligentes
                            para entender o que está acontecendo em tempo real e reduzir o
                            tempo de resposta da sua equipe.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="group rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-xl shadow-black/10 backdrop-blur transition-all hover:-translate-y-1 hover:border-sky-400/30 hover:bg-white/[0.07]"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 text-sky-300 transition group-hover:bg-sky-400/15">
                                    <i className={`${feature.icon} text-lg`} />
                                </div>

                                <h3 className="mt-5 text-base font-semibold text-white">
                                    {feature.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-white/60">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-4 py-20">
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
                                Como funciona
                            </span>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                                Da câmera ao alerta em poucos segundos
                            </h2>

                            <p className="mt-4 text-sm leading-6 text-white/60 md:text-base">
                                O sistema recebe o vídeo, processa as imagens com inteligência
                                artificial e envia alertas automáticos sempre que identificar
                                eventos importantes.
                            </p>

                            <div className="mt-7">
                                <Button label="Conhecer solução" icon="pi pi-arrow-right" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {steps.map((step) => (
                                <div
                                    key={step.number}
                                    className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-xl shadow-black/10 backdrop-blur transition-all hover:border-sky-400/30 hover:bg-white/[0.07]"
                                >
                                    <div className="text-xs font-bold tracking-[0.25em] text-sky-400">
                                        {step.number}
                                    </div>

                                    <h3 className="mt-2 text-base font-semibold text-white">
                                        {step.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-white/60">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-4 py-20">
                    <div className="text-center">
                        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
                            Aplicações
                        </span>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                            Ideal para diferentes cenários
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/60 md:text-base">
                            A solução pode ser adaptada para empresas, condomínios,
                            indústrias, operações logísticas e ambientes que precisam de
                            vigilância inteligente.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                        {useCases.map((useCase) => (
                            <div
                                key={useCase.title}
                                className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-xl shadow-black/10 backdrop-blur transition-all hover:-translate-y-1 hover:border-sky-400/30 hover:bg-white/[0.07]"
                            >
                                <h3 className="text-base font-semibold text-white">
                                    {useCase.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-white/60">
                                    {useCase.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="contact" className="mx-auto max-w-6xl px-4 pb-24 pt-10">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-8 text-center shadow-2xl shadow-sky-950/20 backdrop-blur md:p-12">
                        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-sky-500/10 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />

                        <div className="relative">
                            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                                Pronto para modernizar sua operação?
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/60 md:text-base">
                                Automatize o monitoramento, reduza riscos e tenha mais controle
                                sobre seus ambientes com uma plataforma inteligente e escalável.
                            </p>

                            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <Button label="Começar agora" icon="pi pi-check" />

                                <Button
                                    label="Falar com especialista"
                                    icon="pi pi-comments"
                                    outlined
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}