using Microsoft.AspNetCore.SignalR;
namespace RoomHub;

public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message, string roomId)
        => await Clients.Group(roomId).SendAsync("ReceiveMessage", user, message);

    public async Task AddToGroup(string user, string groupName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

        await Clients.Group(groupName).SendAsync("UserJoined", $"{user} has joined the room {groupName}.");
    }

    public async Task RemoveFromGroup(string user, string groupName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

        await Clients.Group(groupName).SendAsync("UserLeft", $"{user} has left the room {groupName}.");
    }

    public async Task VideoPlay(double time, string groupName)
     => await Clients.OthersInGroup(groupName).SendAsync("VideoPlay", time);


    public async Task VideoPause(double time, string groupName)
     => await Clients.OthersInGroup(groupName).SendAsync("VideoPause", time);


    public async Task VideoSeek(double time, string groupName)
     => await Clients.OthersInGroup(groupName).SendAsync("VideoSeek", time);

}
