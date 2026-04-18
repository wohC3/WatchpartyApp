using RoomHub;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
var app = builder.Build();

app.UseStaticFiles();
app.UseDefaultFiles();
app.MapHub<ChatHub>("/Chat");

app.MapGet("/api/test", () => "OK");

app.Run();
