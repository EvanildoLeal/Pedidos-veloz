# Ì¥Ñ CI/CD Pipeline - Pedidos Veloz

## Ì≥ã Vis√£o Geral

O pipeline de CI/CD do Pedidos Veloz √© automatizado com GitHub Actions e oferece:

### Ì¥ß CI (Continuous Integration)
- ‚úÖ **Testes automatizados** para todos os microsservi√ßos
- ‚úÖ **Lint code** (ESLint)
- ‚úÖ **Scan de vulnerabilidades** (Trivy, npm audit)
- ‚úÖ **Build das imagens** Docker
- ‚úÖ **Valida√ß√£o das imagens** (health check)

### Ì∫Ä CD (Continuous Deployment)
- ‚úÖ **Push para Docker Hub** (versionamento sem√¢ntico)
- ‚úÖ **Deploy staging** autom√°tico na branch main
- ‚úÖ **Deploy production** via tags (v*.*.*)
- ‚úÖ **Canary deployment** (10% tr√°fego)
- ‚úÖ **Rollback autom√°tico** em caso de falha
- ‚úÖ **Health checks** p√≥s-deploy

## Ì¥ê Secrets Necess√°rios

| Secret | Descri√ß√£o |
|--------|-----------|
| `DOCKER_USERNAME` | Usu√°rio do Docker Hub |
| `DOCKER_PASSWORD` | Senha ou token do Docker Hub |
| `KUBE_CONFIG_STAGING` | Kubeconfig do ambiente staging |
| `KUBE_CONFIG_PRODUCTION` | Kubeconfig do ambiente production |
