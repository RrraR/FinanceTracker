using System.Text.Json.Serialization;

namespace FinanceTracker.Models;

public class AuthResultDto
{
    [JsonPropertyName("username")] public string Username { get; set; }
    [JsonPropertyName("accessToken")] public string AccessToken { get; set; }

}