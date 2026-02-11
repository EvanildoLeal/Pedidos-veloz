const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'pedidos-service',
    timestamp: new Date().toISOString(),
    port: PORT,
    message: 'Funcionando sem banco de dados'
  });
});

// Rota bÃ¡sica
app.get('/', (req, res) => {
  res.json({ 
    message: 'Pedidos Service - Sistema de Pedidos',
    version: '1.0.0',
    endpoints: ['GET /health', 'GET /api/pedidos']
  });
});

// Listar pedidos (mock)
app.get('/api/pedidos', (req, res) => {
  res.json([
    { id: 1, cliente: 'JoÃ£o Silva', total: 150.00, status: 'pendente' },
    { id: 2, cliente: 'Maria Santos', total: 200.50, status: 'processando' }
  ]);
});

app.listen(PORT, () => {
  console.log(`âœ… pedidos-service rodando na porta ${PORT}`);
  console.log(`í³¡ Health check: http://localhost:${PORT}/health`);
});
