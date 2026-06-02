<div align="center">
	<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
	<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
	<img src="https://img.shields.io/badge/PrimeReact-0E1E2A?style=for-the-badge&logo=prime&logoColor=white" alt="PrimeReact" />
	<img src="https://img.shields.io/badge/Tailwind_CSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8" alt="Tailwind CSS" />
	<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</div>

# 🛰️ Skynet Vision - Plataforma de IA para Seguranca Publica

Sistema inteligente de monitoramento urbano com Visao Computacional, analise em tempo real e interface analitica para operadores e gestores.

**UNISAL - Centro Universitario Salesiano de Sao Paulo**  
Engenharia de Computacao - 9o semestre

Americana - SP • Campus Maria Auxiliadora • 2026

**Orientador:** M.Sc. Paulo Da Silva Soares

## 📋 Sobre o Projeto

Skynet Vision foi criado para transformar o videomonitoramento tradicional em uma operacao preventiva. Em vez de depender apenas da atencao humana, a plataforma automatiza a deteccao de eventos criticos, reduz o tempo de resposta e gera inteligencia acionavel com dashboards e indicadores.

O projeto adota **privacy by design**, com mecanismos de anonimizaao e boas praticas de governanca de dados, alinhado a principios de seguranca da informacao e LGPD.

## 🎯 Missao

Entregar uma plataforma acessivel e escalavel para monitoramento urbano inteligente, com foco em eficiencia operacional, confiabilidade e responsabilidade social.

## 🧩 O Problema

- Vigilancia reativa devido a fadiga humana.
- Alto custo e baixa transparencia em solucoes proprietarias.
- Dificuldade em transformar video em decisao rapida.

## 🚀 A Proposta

Uma arquitetura modular que integra:

- Captura de video (cameras IP e bases gravadas)
- Inferencia de IA (familia YOLO)
- API de IA em Python (FastAPI)
- Servicos gerais em Java (Spring Boot)
- Persistencia com PostgreSQL
- Interface web analitica (Next.js)

> Nota: este repositorio concentra o **front-end web**. Os servicos de IA e back-end geral estao descritos no projeto, mas nao fazem parte deste codigo.

## ✨ Funcionalidades Principais

### 🛑 Deteccao Inteligente
- Identificacao de eventos como aglomeracoes, quedas, invasoes e vandalismo
- Inferencia em tempo real com baixa latencia

### 🔔 Alertas e Escalonamento
- Alertas multicanal (SMS, voz e Telegram)
- Politicas de cooldown e rate limiting

### 📊 Analitica Operacional
- Dashboards com indicadores e ranking de eventos
- Mapas de calor e filtros avancados

### 🔐 Governanca e Confianca
- Registro de ocorrencias e trilhas de auditoria
- Anonimizacao de dados sensiveis

## 🏗️ Arquitetura Tecnica

### Stack Tecnologica (Front-end neste repo)
```
Next.js 16.2.6
React 19.2.4
PrimeReact 10.9.7
PrimeIcons 7.0.0
Tailwind CSS 4
TypeScript 5
```

### Ecossistema Completo (visao do projeto)
```
IA e Processamento
├── Python + FastAPI
├── OpenCV + NumPy
└── Ultralytics YOLO

Servicos e API
├── Java + Spring Boot
└── Swagger (OpenAPI)

Dados
└── PostgreSQL

Infraestrutura
└── AWS + Terraform
```

## 📁 Estrutura de Diretorios

```
src/
├── app/                      # Rotas e paginas (App Router)
│   ├── api/monitoring/        # Endpoint de monitoramento
│   ├── auth/                  # Login e cadastro
│   ├── dashboard/             # Painel principal
│   ├── incidents/             # Ocorrencias
│   ├── users/                 # Usuarios
│   └── config/                # Configuracoes
├── components/                # Componentes de UI
│   ├── Dashboard/
│   ├── Incidents/
│   ├── Users/
│   └── Layout/
├── features/                  # Servicos e tipos por dominio
└── providers/                 # Providers (PrimeReact)
```

## 🚀 Instalacao e Execucao

### Pre-requisitos
- Node.js 18+
- npm, yarn, pnpm ou bun

### Passo a Passo
1. Instale as dependencias
```bash
npm install
```

2. Inicie o ambiente de desenvolvimento
```bash
npm run dev
```

3. Acesse
```
http://localhost:3000
```

### Scripts Disponiveis
```
npm run dev     # Ambiente de desenvolvimento
npm run build   # Build de producao
npm start       # Servidor de producao
npm run lint    # Lint do codigo
```

## 🔐 Etica, Privacidade e Seguranca

- Privacy by design com anonimizaao de dados sensiveis
- Supervisao humana significativa nas decisoes criticas
- Rastreabilidade e auditoria de ocorrencias

## 🧭 Metodologia (Resumo)

1) Aquisicao e preparacao de dados com normalizacao e data augmentation
2) Modelos de IA e back-end modular com telemetria e auditoria
3) Front-end analitico para apoio a decisao
4) Implantacao em nuvem com DevOps e MLOps

## 👥 Equipe de Desenvolvimento

<table>
	<tr>
		<td align="center">
			<a href="https://github.com/Krllos31">
				<img src="https://github.com/Krllos31.png" width="100px" alt="Carlos" />
				<br />
				<sub><b>Carlos Alberto de Aguiar</b></sub>
			</a>
			<br />
			<sub>Developer</sub>
		</td>
		<td align="center">
			<a href="https://github.com/JRacanelli16">
				<img src="https://github.com/JRacanelli16.png" width="100px" alt="Joao" />
				<br />
				<sub><b>Joao Marcos Racanelli</b></sub>
			</a>
			<br />
			<sub>Developer</sub>
		</td>
		<td align="center">
			<a href="https://github.com/LeonardoMarcondeli">
				<img src="https://github.com/LeonardoMarcondeli.png" width="100px" alt="Leonardo" />
				<br />
				<sub><b>Leonardo Marcondeli</b></sub>
			</a>
			<br />
			<sub>Developer</sub>
		</td>
		<td align="center">
			<a href="https://github.com/maicond02">
				<img src="https://github.com/maicond02.png" width="100px" alt="Maicon" />
				<br />
				<sub><b>Maicon Douglas Mendes Alves</b></sub>
			</a>
			<br />
			<sub>Developer</sub>
		</td>
		<td align="center">
			<a href="https://github.com/viMoraes10">
				<img src="https://github.com/viMoraes10.png" width="100px" alt="Vinicius" />
				<br />
				<sub><b>Vinicius de Moraes de Godoi</b></sub>
			</a>
			<br />
			<sub>Developer</sub>
		</td>
	</tr>
</table>

## 📄 Licenca

Projeto academico desenvolvido para fins educacionais no curso de Engenharia de Computacao da UNISAL.

## 📬 Contato

Campus Maria Auxiliadora - Americana, SP

Feito pela equipe Skynet Vision
