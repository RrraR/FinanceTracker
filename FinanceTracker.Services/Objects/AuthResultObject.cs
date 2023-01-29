using System.Text.Json.Serialization;

namespace FinanceTracker.Services.Objects;

public class AuthResultObject
{
    [JsonPropertyName("username")] public string Username { get; set; }
    [JsonPropertyName("accessToken")] public string AccessToken { get; set; }

}