const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/Payment/Pay', (req, res) => {
  console.log('Payment request received:', req.body);
  
  // Simulate payment processing
  setTimeout(() => {
    res.status(200).json({
      success: true,
      message: 'Payment processed successfully',
      transactionId: 'TXN' + Date.now()
    });
  }, 1000);
});

app.listen(PORT, () => {
  console.log(`Mock payment server running on http://localhost:${PORT}`);
});
