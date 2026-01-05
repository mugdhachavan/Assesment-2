import React, { useState } from 'react';
import './CreditCardForm.css';

const CreditCardForm = ({ totalAmount, onSuccess, onBack }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(totalAmount);
  const [cardType, setCardType] = useState('RuPay'); // ✅ default

  /* ---------------- CARD TYPE DETECTION ---------------- */
  const detectCardType = (number) => {
    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('5')) return 'MasterCard';
    if (number.startsWith('6')) return 'RuPay';
    return 'RuPay'; // ✅ default if unknown
  };

  /* ---------------- DISCOUNT LOGIC ---------------- */
  const calculateDiscount = (type, amount) => {
    let discountPercent = 0;

    switch (type) {
      case 'MasterCard':
        discountPercent = 5;
        break;
      case 'RuPay':
        discountPercent = 10;
        break;
      case 'Visa':
      default:
        discountPercent = 0;
    }

    const discountValue = (amount * discountPercent) / 100;
    setDiscount(discountValue);
    setFinalAmount(amount - discountValue);
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    return cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
  };

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      const cleanNumber = value.replace(/\s/g, '').slice(0, 16);
      formattedValue = formatCardNumber(cleanNumber);

      const detectedType = detectCardType(cleanNumber);
      setCardType(detectedType);
      calculateDiscount(detectedType, totalAmount); // ✅ instant update
    } 
    else if (name === 'expiry') {
      formattedValue = formatExpiry(value.slice(0, 5));
    } 
    else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setCardDetails({
      ...cardDetails,
      [name]: formattedValue,
    });

    setError('');
  };

  /* ---------------- VALIDATION ---------------- */
  const validateForm = () => {
    const cardNumberClean = cardDetails.cardNumber.replace(/\s/g, '');

    if (!/^\d{12,19}$/.test(cardNumberClean)) {
      setError('Card number must be 12–19 digits');
      return false;
    }
    if (cardDetails.expiry.length !== 5) {
      setError('Expiry must be in MM/YY format');
      return false;
    }
    if (cardDetails.cvv.length !== 3) {
      setError('CVV must be 3 digits');
      return false;
    }
    return true;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        'http://localhost:5084/api/payments/process',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cardNumber: cardDetails.cardNumber.replace(/\s/g, ''),
            cardType: cardType,
            expiry: cardDetails.expiry,
            cvv: cardDetails.cvv,
            amount: totalAmount,
            currency: 'INR',
            orderId: 'ORD12345',
            items: [],
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        // backend remains source of truth
        setDiscount(data.discount);
        setFinalAmount(data.finalAmount);
        setCardType(data.cardType || cardType);

        setTimeout(() => onSuccess(), 500);
      } else {
        setError(data.message || 'Payment failed. Please try again.');
      }
    } catch {
      setError('Unable to connect to payment server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="payment-container">
      <div className="credit-card-form">
        <h2>Enter Card Details</h2>

        <div className="amount-display">
          <span>Total Amount:</span>
          <span className="amount">INR {totalAmount.toLocaleString('en-IN')}</span>
        </div>

        <div className="amount-display">
          <span>Discount:</span>
          <span className="amount">INR {discount.toLocaleString('en-IN')}</span>
        </div>

        <div className="amount-display">
          <span>Final Amount:</span>
          <span className="amount">INR {finalAmount.toLocaleString('en-IN')}</span>
        </div>

        <div className="amount-display">
          <span>Card Type:</span>
          <span className="amount">{cardType}</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.cardNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expiry</label>
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="button-group">
            <button type="button" className="back-button" onClick={onBack} disabled={loading}>
              Back
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreditCardForm;
