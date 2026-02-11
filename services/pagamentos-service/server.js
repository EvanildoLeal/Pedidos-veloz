const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'pagamentos-service',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'pagamentos-service funcionando',
    port: PORT
  });
});

app.listen(PORT, () => {
  console.log(`✅ pagamentos-service rodando na porta ${PORT}`);
});
