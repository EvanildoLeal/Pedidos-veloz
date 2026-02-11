const express = require('express');
const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'estoque-service',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'estoque-service funcionando',
    port: PORT
  });
});

app.listen(PORT, () => {
  console.log(`✅ estoque-service rodando na porta ${PORT}`);
});
