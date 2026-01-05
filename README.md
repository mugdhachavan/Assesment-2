# Assessment-2 - React Payment Frontend

A complete React-based e-commerce payment frontend application with a mock backend server.

## Features

- **Header** - Branded e-commerce header with store name
- **Footer** - Professional footer with copyright and links
- **Shopping Basket** - Displays dummy items:
  - Laptop: INR 76,000
  - KeyBoard: INR 3,000
  - Headphones: INR 12,536
- **Price Calculation**:
  - Subtotal display
  - GST calculation (18%)
  - Total with GST display
- **Payment Flow**:
  - Credit card input form with validation
  - Card number (16 digits with auto-formatting)
  - Expiry date (MM/YY format)
  - CVV (3 digits)
  - Backend API integration
- **Order Success** - Confirmation screen with thank you message
- **Routing** - Default route to `/Payment`

## Project Structure

```
Assesment-2/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CreditCardForm.jsx
│   │   │   └── OrderSuccess.jsx
│   │   ├── pages/           # Page components
│   │   │   └── Payment.jsx
│   │   ├── App.jsx          # Main app with routing
│   │   └── main.jsx         # Entry point
│   └── package.json
├── mock-backend.js          # Mock payment API server
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Install Backend Dependencies**
   ```bash
   npm install
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

You need to run both the backend server and frontend development server:

1. **Start the Backend Server** (in the root directory)
   ```bash
   node mock-backend.js
   ```
   The backend will run on `http://localhost:3000`

2. **Start the Frontend** (in a new terminal, from the frontend directory)
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:5173`
   - You will be automatically redirected to `/Payment`

## Usage Flow

1. **Shopping Basket Page**
   - View the basket items with prices
   - See subtotal, GST (18%), and total amount
   - Click "Proceed to Pay" button

2. **Payment Form**
   - Enter card details:
     - Card Number: 16 digits (auto-formatted with spaces)
     - Expiry: MM/YY format
     - CVV: 3 digits
   - Click "Pay Now" to submit
   - Click "Back" to return to basket

3. **Order Success**
   - View confirmation message
   - Click "Place New Order" to start a new order

## API Endpoint

The frontend calls the following backend endpoint:

- **POST** `http://localhost:3000/Payment/Pay`
  - Request Body:
    ```json
    {
      "cardNumber": "4532123456789012",
      "expiry": "12/28",
      "cvv": "123",
      "amount": 108012.48
    }
    ```
  - Response (200 OK):
    ```json
    {
      "success": true,
      "message": "Payment processed successfully",
      "transactionId": "TXN1234567890"
    }
    ```

## Technologies Used

- **Frontend**:
  - React 19
  - React Router DOM (for routing)
  - Vite (build tool)
  - CSS3 (styling)

- **Backend**:
  - Node.js
  - Express.js
  - CORS

## Features Implemented

✅ Header component with branding  
✅ Footer component with copyright  
✅ Shopping basket with dummy items  
✅ Subtotal calculation  
✅ GST calculation (18%)  
✅ Total with GST display  
✅ Credit card input form with validation  
✅ Card number formatting (spaces every 4 digits)  
✅ Expiry date formatting (MM/YY)  
✅ CVV validation  
✅ Backend API integration  
✅ Loading states during payment processing  
✅ Error handling  
✅ Order success screen  
✅ Default route to /Payment  
✅ Responsive design  

## Screenshots

### 1. Shopping Basket
![Shopping Basket](https://github.com/user-attachments/assets/634738f6-bfce-404a-9be4-69702ac21d8e)

### 2. Payment Form
![Payment Form](https://github.com/user-attachments/assets/c285d744-c4df-415f-a697-586b0044b121)

### 3. Filled Card Details
![Filled Card](https://github.com/user-attachments/assets/a5743ffc-519c-40ae-82ec-b1bcd718bc0e)

### 4. Order Success
![Order Success](https://github.com/user-attachments/assets/71246a68-7d6e-499c-ab12-b6f280d756bf)