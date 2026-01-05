using System.Collections.Generic;

namespace Payments.Domain.Models
{
    public class PaymentRequest
    {
        public decimal Amount { get; set; }
        public List<PaymentItem> Items { get; set; } = new List<PaymentItem>(); // initialize to avoid CS8618
        public string Currency { get; set; } = string.Empty;
        public string OrderId { get; set; } = string.Empty;
        public string CardNumber { get; set; } = string.Empty; // for card type detection
    }

    public class PaymentItem
    {
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
