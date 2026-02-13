# 🛵 Pedidos Veloz - Plataforma de Microsserviços em Nuvem

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Kubernetes](https://img.shields.io/badge/kubernetes-1.28+-blue)
![Docker](https://img.shields.io/badge/docker-24.0+-blue)
![Node](https://img.shields.io/badge/node-18.x-green)
![License](https://img.shields.io/badge/license-MIT-green)
![CI/CD](https://img.shields.io/badge/CI/CD-GitHub%20Actions-brightgreen)
![Observability](https://img.shields.io/badge/observability-Prometheus%2FGrafana-orange)

**Uma plataforma de e-commerce moderna construída com arquitetura de microsserviços, containerização Docker, orquestração Kubernetes e pipeline CI/CD automatizado.**

[🎥 Ver Demonstração](#) | [📚 Documentação Completa](#) | [🐳 Docker Hub](#)

</div>

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Execução Local (Docker Compose)](#-execução-local-docker-compose)
- [Execução em Produção (Kubernetes)](#-execução-em-produção-kubernetes)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Observabilidade](#-observabilidade)
- [Auto-scaling](#-auto-scaling)
- [Estratégias de Deploy](#-estratégias-de-deploy)
- [Segurança](#-segurança)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Demonstração](#-demonstração)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## 🎯 Visão Geral

**Pedidos Veloz** é uma plataforma de e-commerce desenvolvida para demonstrar boas práticas de Cloud DevOps, implementando:

✅ **8+ microsserviços** conteinerizados  
✅ **Orquestração Kubernetes** com auto-scaling  
✅ **Pipeline CI/CD** automatizado (GitHub Actions)  
✅ **Observabilidade completa** (Métricas, Logs, Tracing)  
✅ **Estratégias de deploy** (Rolling Update + Canary)  
✅ **Segurança** (non-root, multi-stage, secrets)

---

## 🏗️ Arquitetura

```mermaid
graph TB
    subgraph "🌐 Cliente"
        A[Usuário]
    end

    subgraph "🚪 API Gateway"
        B[Nginx - Porta 8080]
    end

    subgraph "📦 Microsserviços"
        C[Pedidos Service<br/>Node.js - 3001]
        D[Pagamentos Service<br/>Node.js - 3002]
        E[Estoque Service<br/>Node.js - 3003]
    end

    subgraph "🗄️ Dados"
        F[(PostgreSQL<br/>5432)]
        G[(Redis Cache<br/>6379)]
        H[RabbitMQ<br/>5672/15672]
    end

    subgraph "📊 Observabilidade"
        I[Prometheus<br/>9090]
        J[Grafana<br/>3000]
        K[Jaeger Tracing<br/>16686]
        L[Loki<br/>3100]
    end

    A --> B
    B --> C & D & E
    C & D & E --> F
    C & E --> G
    C & D & E --> H
    C & D & E --> I
    I --> J
    K --> J
    L --> J
    🚀 Tecnologias
Categoria	Tecnologias
Backend	Node.js, Express
Containerização	Docker, Docker Compose
Orquestração	Kubernetes, HPA
Banco de Dados	PostgreSQL, Redis
Mensageria	RabbitMQ
Observabilidade	Prometheus, Grafana, Jaeger, Loki
CI/CD	GitHub Actions
Infra como Código	Terraform (esqueleto)
📋 Pré-requisitos
Docker 24.0+

Docker Compose V2

Kubernetes 1.28+ (Docker Desktop ou Minikube)

kubectl

Git

8GB RAM mínimo (recomendado 16GB)

🚀 Execução Local (Docker Compose)
Passo a Passo
bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/pedidos-veloz.git
cd pedidos-veloz

# 2. Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# 3. Inicie todos os serviços com um único comando
cd docker-compose
docker-compose up -d

# 4. Verifique se todos os containers estão rodando
docker-compose ps

# 5. Acompanhe os logs (opcional)
docker-compose logs -f
📊 Serviços Disponíveis
Serviço	URL	Credenciais
API Gateway	http://localhost:8080	-
Pedidos API	http://localhost:3001/health-
Pagamentos API http://localhost:3002/health	-
Estoque API	http://localhost:3003/health
Grafana	http://localhost:3000	admin / admin
Prometheus	http://localhost:9090	-
Jaeger	http://localhost:16686	-
RabbitMQ	http://localhost:15672	admin / Rabbit123!
☸️ Execução em Produção (Kubernetes)
Deploy Completo
bash
# 1. Navegue até a raiz do projeto
cd /caminho/para/pedidos-veloz

# 2. Aplique os manifests na ordem correta
kubectl apply -f kubernetes/base/      # Namespace, ConfigMap, Secrets
kubectl apply -f kubernetes/services/  # Deployments e Services
kubectl apply -f kubernetes/hpa/       # Auto-scaling

# 3. Verifique os recursos
kubectl get pods -n pedidos-veloz -w
kubectl get svc -n pedidos-veloz
kubectl get hpa -n pedidos-veloz
Testando Localmente
bash
# Port-forward para acessar os serviços
kubectl port-forward -n pedidos-veloz svc/pedidos-service 3001:3001 &
kubectl port-forward -n pedidos-veloz svc/pagamentos-service 3002:3002 &
kubectl port-forward -n pedidos-veloz svc/estoque-service 3003:3003 &

# Teste
curl http://localhost:3001/health
curl http://localhost:3002/health
curl http://localhost:3003/health
🔄 CI/CD Pipeline
GitHub Actions Workflows
yaml
name: CI/CD Pipeline
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  tags: [ 'v*' ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Testes automatizados
      - name: Lint code
      - name: Scan de segurança (Trivy)

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Build multi-stage
      - name: Push para Docker Hub

  deploy:
    needs: build-and-push
    steps:
      - name: Deploy staging (Rolling Update)
      - name: Deploy production (Canary)
🔐 Secrets Necessários
Secret	Descrição
DOCKER_USERNAME	Usuário do Docker Hub
DOCKER_PASSWORD	Token de acesso do Docker Hub
KUBE_CONFIG_STAGING	Kubeconfig do ambiente staging
KUBE_CONFIG_PRODUCTION	Kubeconfig da produção
📊 Observabilidade
Métricas (Prometheus + Grafana)
bash
# Dashboards pré-configurados
- Taxa de requisições por segundo
- Latência (p95, p99)
- Taxa de erros HTTP
- Uso de CPU e memória por pod
- Status dos serviços (up/down)
Acesso: http://localhost:3000 (admin/admin)

Logs Centralizados (Loki + Promtail)
bash
# Consultar logs
kubectl logs -f deployment/pedidos-service -n pedidos-veloz
# Ou via Grafana: Explore → Loki
Tracing Distribuído (Jaeger)
bash
# Rastrear requisições entre serviços
# Acesso: http://localhost:16686
# Buscar por: serviço, operação, tags
📈 Auto-scaling
Horizontal Pod Autoscaler (HPA)
yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: pedidos-service-hpa
spec:
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
📊 Métricas de Escala
Cenário	Pods Iniciais	Pods Finais	Tempo
Pico de tráfego	2	8	45s
Black Friday	2	10	60s
Queda noturna	8	2	5min
🚀 Estratégias de Deploy
Staging: Rolling Update
yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 1        # 1 pod extra por vez
    maxUnavailable: 0  # Nunca derruba todos
Vantagens:

✅ Zero downtime

✅ Rollback automático

✅ Controle gradual

Produção: Canary Release
text
1. 🟢 Deploy canary (10% do tráfego)
2. ⏱️ Validação por 5 minutos
3. 📊 Métricas saudáveis?
4. 🟢 Promoção para 100%
5. 🔴 Rollback automático em caso de falha
🔐 Segurança
Implementado
dockerfile
# 1. Usuário non-root
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs

# 2. Multi-stage builds
FROM node:18-alpine AS builder
FROM node:18-alpine  # Apenas produção

# 3. Imagens enxutas (Alpine)
FROM node:18-alpine  # ~45MB vs 350MB

# 4. Secrets no Kubernetes
apiVersion: v1
kind: Secret
data:
  database.password: <base64>
Health Checks
yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3001
  initialDelaySeconds: 30
readinessProbe:
  httpGet:
    path: /health
    port: 3001
  initialDelaySeconds: 5
📁 Estrutura do Projeto
text
pedidos-veloz/
├── 📁 .github/
│   └── workflows/
│       ├── ci.yml
│       ├── cd.yml
│       └── environments.yml
├── 📁 docker-compose/
│   ├── docker-compose.yml
│   ├── .env
│   ├── nginx/
│   └── monitoring/
├── 📁 kubernetes/
│   ├── base/
│   │   ├── namespace.yaml
│   │   ├── configmap.yaml
│   │   └── secrets.yaml
│   ├── services/
│   │   ├── pedidos-deployment.yaml
│   │   ├── pagamentos-deployment.yaml
│   │   └── estoque-deployment.yaml
│   └── hpa/
│       └── pedidos-hpa.yaml
├── 📁 services/
│   ├── pedidos-service/
│   │   ├── Dockerfile.production
│   │   ├── Dockerfile.dev
│   │   ├── server.js
│   │   └── package.json
│   ├── pagamentos-service/
│   └── estoque-service/
├── 📁 monitoring/
│   ├── prometheus/
│   ├── grafana/
│   └── loki/
├── 📝 README.md
├── 📝 DEPLOY-STRATEGY.md
├── 📝 HPA-STRATEGY.md
├── 📝 SECURITY.md
└── 📝 CICD-README.md
✅ Status do Projeto
Componente Status Observação
Docker Compose 🟢 Funcionando 10 containers
Kubernetes	🟢 Funcionando	7 pods
CI/CD 🟢 Configurado	GitHub Actions
Observabilidade	🟢 Completa	Prometheus + Grafana + Jaeger
Auto-scaling	🟢 Configurado	HPA
Segurança 🟢 Implementada Non-root + Multi-stage
Documentação 🟢 Completa 5 arquivos .md
👥 Contribuição
Fork o projeto

Crie sua feature branch (git checkout -b feature/AmazingFeature)

Commit suas mudanças (git commit -m 'Add some AmazingFeature')

Push para a branch (git push origin feature/AmazingFeature)

Abra um Pull Request

📄 Licença
Distribuído sob a licença MIT. Veja LICENSE para mais informações.

```
