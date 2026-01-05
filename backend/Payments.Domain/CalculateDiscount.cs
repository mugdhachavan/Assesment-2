using Payments.Domain.Models;  // ✅ Required to find CardType

namespace Payments.Domain
{
    public static class CalculateDiscount
    {
        public static CardType GetCardType(string cardNumber)
        {
            if (string.IsNullOrEmpty(cardNumber))
                return CardType.RuPay;

            if (cardNumber.StartsWith("4")) return CardType.Visa;
            if (cardNumber.StartsWith("5")) return CardType.MasterCard;
            if (cardNumber.StartsWith("6")) return CardType.RuPay;

            return CardType.RuPay;
        }

        public static decimal GetDiscount(CardType cardType, decimal amount)
        {
            return cardType switch
            {
                CardType.Visa => 0m,
                CardType.MasterCard => amount * 0.05m,
                CardType.RuPay => amount * 0.10m,
                _ => 0m
            };
        }
    }
}
