const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.post('/api/confirm-payment', (req, res) => {
  const transactionId = 'TXN' + Date.now(); // Simulate transaction ID
  res.json({
    transactionId,
    sevaName: "Example Seva",
    date: "2024-06-01",
    time: "10:00 AM - 11:00 AM",
    numTickets: 2,
    totalAmount: 200
  });
});

app.listen(port, () => {
  console.log(`Kiosk app listening at http://localhost:${port}`);
});




function showSevaDetails(sevaId) {
    document.getElementById('seva-list').style.display = 'none';
    document.getElementById('seva-details').style.display = 'block';
  
    // Example data for demo
    document.getElementById('seva-name').innerText = 'Example Seva';
    document.getElementById('seva-time').innerText = '10:00 AM - 11:00 AM';
    document.getElementById('available-tickets').innerText = '50';
  
    document.getElementById('num-tickets').addEventListener('input', updateTotalAmount);
  }
  
  function updateTotalAmount() {
    let numTickets = document.getElementById('num-tickets').value;
    let ticketPrice = 100; // Example ticket price
    document.getElementById('total-amount').innerText = numTickets * ticketPrice;
  }
  
  function generateQRCode() {
    let paymentInfo = {
      seva: document.getElementById('seva-name').innerText,
      date: document.getElementById('seva-date').value,
      time: document.getElementById('seva-time').innerText,
      numTickets: document.getElementById('num-tickets').value,
      totalAmount: document.getElementById('total-amount').innerText
    };
    let qrCodeData = JSON.stringify(paymentInfo);
    document.getElementById('qrcode').innerHTML = '';
    new QRCode(document.getElementById("qrcode"), qrCodeData);
  
    document.getElementById('seva-details').style.display = 'none';
    document.getElementById('payment-section').style.display = 'block';
  }
  
  function confirmPayment() {
    fetch('/api/confirm-payment', {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('success-message').innerText = 'Payment Successful! Transaction ID: ' + data.transactionId;
      printTicket(data);
      document.getElementById('payment-section').style.display = 'none';
      document.getElementById('success-message').style.display = 'block';
    });
  }
  
  function printTicket(ticketData) {
    let ticketContent = `
      <div>
        <h2>Seva Ticket</h2>
        <p>Transaction ID: ${ticketData.transactionId}</p>
        <p>Seva: ${ticketData.sevaName}</p>
        <p>Date: ${ticketData.date}</p>
        <p>Time: ${ticketData.time}</p>
        <p>Tickets: ${ticketData.numTickets}</p>
        <p>Total Amount: ${ticketData.totalAmount}</p>
      </div>
    `;
    PrintJS({
      printable: ticketContent,
      type: 'html',
      style: '.ticket { font-size: 16px; }'
    });
  }
  