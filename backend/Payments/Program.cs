using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddHttpClient();
// Add CORS for React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy => policy
            .WithOrigins("http://localhost:5173") // React dev server
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

// Use CORS
app.UseCors("AllowReact");

// No HTTPS redirection to avoid "Failed to determine the https port"
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run("http://localhost:5084"); // Run on HTTP port 5084
