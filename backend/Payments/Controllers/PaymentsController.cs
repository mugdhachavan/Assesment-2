using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Payments.Domain.Models; // ✅ Important for CardHelper
using System.Linq;

namespace Payments.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;

        public PaymentsController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }

        
        [HttpPost("process")]
        public async Task<IActionResult> ProcessPayment([FromBody] PaymentRequest request)
        {
            if (request == null)
                return BadRequest(new PaymentResponse
                {
                    Success = false,
                    Message = "Invalid request"
                });

            decimal totalAmount = request.Items != null && request.Items.Any()
                ? request.Items.Sum(i => i.Price * i.Quantity)
                : request.Amount;

            // Detect card type and calculate discount
            var cardType = CardHelper.GetCardType(request.CardNumber);
            var discount = CardHelper.GetDiscount(cardType, totalAmount);
            var finalAmount = totalAmount - discount;

            var client = _httpClientFactory.CreateClient();
            var paymentServerUrl = _configuration["PaymentServer:BaseUrl"] + "/api/MockPaymentServer/pay";


            try
            {
                var payload = new
                {
                    Amount = finalAmount,
                    Currency = request.Currency,
                    OrderId = request.OrderId,
                    CardType = cardType.ToString(),
                    Discount = discount
                };

                var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
                var response = await client.PostAsync(paymentServerUrl, content);
                response.EnsureSuccessStatusCode();

                // Return typed DTO
                return Ok(new PaymentResponse
                {
                    TotalAmount = totalAmount,
                    Discount = discount,
                    FinalAmount = finalAmount,
                    CardType = cardType.ToString(),
                    Message = "Payment processed successfully",
                    Success = true
                });
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine("Payment server error: " + ex.Message);
                return StatusCode(503, new PaymentResponse
                {
                    Success = false,
                    Message = "Unable to connect to payment server. Please try again later."
                });
            }
        }

    }
}
