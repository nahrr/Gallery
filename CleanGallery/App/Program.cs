using Infrastructure;
using Application;
using App.Middleware;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Application.AssemblyReference).Assembly));
builder.Services.AddDistributedMemoryCache();
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddApplicationServices();
builder.Services.AddControllers()
    .AddJsonOptions(opt => 
    opt.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase)
    .AddApplicationPart(Presentation.AssemblyReference.Assembly);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(opt => opt.WithOrigins(builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() ?? Array.Empty<string>()));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
