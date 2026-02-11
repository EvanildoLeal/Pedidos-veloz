# 🚀 Estratégia de Deploy - Rolling Update

## 📌 ESCOLHA: Rolling Update

### ✅ Justificativa Técnica

**1. Zero Downtime**
- Atualiza pods gradualmente (1 por vez)
- Serviço continua disponível durante todo o processo
- Clientes não percebem a atualização

**2. Rollback Automático**
- Se as health checks falharem, o Kubernetes reverte automaticamente
- Tempo de rollback < 30 segundos
- Histórico de revisões mantido (revisionHistoryLimit: 3)

**3. Controle de Risco**
```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 1     # Apenas 1 pod extra por vez
    maxUnavailable: 0  # Nunca derruba todos os pods