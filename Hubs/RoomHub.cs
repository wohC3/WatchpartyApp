using Microsoft.AspNetCore.SignalR;
namespace RoomHub;

public class ChatHub : Hub
{
    private static Dictionary<string, string> Users = new Dictionary<string, string>();

    public async Task SendMessage(string message, string roomId)
    {
        string user;
        if (!Users.TryGetValue(Context.ConnectionId, out user))
        {
            user = "Unknown";
        }

        await Clients.Group(roomId).SendAsync("ReceiveMessage", new
        {
            user,
            message,
            connectionId = Context.ConnectionId
        });
    }
    public async Task AddToGroup(string user, string groupName)
    {
        if (string.IsNullOrWhiteSpace(user))
        {
            int randomNumber = Random.Shared.Next(1000, 10000);
            user = $"Guest{randomNumber}";
        }

        user = user.Trim();

        Users[Context.ConnectionId] = user;


        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        await Clients.Caller.SendAsync("Connected", Context.ConnectionId);
        await Clients.Group(groupName).SendAsync("UserJoined", new
        {
            user = "System",
            message = $"{user} has joined the room {groupName}"
        });
    }

    public async Task RemoveFromGroup(string groupName)
    {
        string user;
        if (Users.TryGetValue(Context.ConnectionId, out user))
        {

            await Clients.Group(groupName).SendAsync("UserLeft", new
            {
                user = "System",
                message = $"{user} has left the room {groupName}"
            });
        }
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        Users.Remove(Context.ConnectionId);
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        if (Users.TryGetValue(Context.ConnectionId, out var user))
        {
            Users.Remove(Context.ConnectionId);
        }
        await base.OnDisconnectedAsync(exception);
    }

    public async Task VideoPlay(double time, string groupName)
     => await Clients.OthersInGroup(groupName).SendAsync("VideoPlay", time);


    public async Task VideoPause(double time, string groupName)
     => await Clients.OthersInGroup(groupName).SendAsync("VideoPause", time);


    public async Task VideoSeek(double time, string groupName)
     => await Clients.OthersInGroup(groupName).SendAsync("VideoSeek", time);

}
