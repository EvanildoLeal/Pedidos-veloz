# 🔐 Estratégia de Segurança - Pedidos Veloz

## 📌 Boas Práticas Implementadas

### 1. 🚫 Usuário Non-Root

```dockerfile
# Cria usuário não-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Muda para usuário não-root
USER nodejs
```
