var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.UseStaticFiles();
app.UseDefaultFiles();

app.MapGet("/api/test", () => "OK");

app.Run();
