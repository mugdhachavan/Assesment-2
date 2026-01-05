using Microsoft.AspNetCore.Mvc;

namespace Payments.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MockPaymentServerController : ControllerBase
    {
        [HttpPost("pay")]
        public IActionResult Pay([FromBody] object payload)
        {
            return Ok(new
            {
                Status = "Success",
                Message = "Payment processed (mock)"
            });
        }
    }
}
