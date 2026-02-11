# 📊 Estratégia de Escalabilidade Horizontal - HPA

## 📌 ESCOLHA: Horizontal Pod Autoscaler (HPA)

### ✅ Justificativa Técnica

**1. Baseado em Métricas Reais**

- **CPU**: 70% de utilização (limiar para escalar)
- **Memória**: 80% de utilização (proteção contra OOM)
- **Métricas customizadas**: Implementação futura (RPS, latência)

**2. Reação Rápida**

```yaml
behavior:
  scaleUp:
    stabilizationWindowSeconds: 0 # Escala imediatamente
    policies:
      - type: Percent
        value: 100
        periodSeconds: 15
  scaleDown:
    stabilizationWindowSeconds: 300 # Aguarda 5min antes de reduzir
    policies:
      - type: Percent
        value: 10
        periodSeconds: 60
```
