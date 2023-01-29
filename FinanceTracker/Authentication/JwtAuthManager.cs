using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;
using Microsoft.IdentityModel.Tokens;

namespace FinanceTracker.Authentication;

public class JwtAuthManager
{
    private readonly JwtTokenConfig _jwtTokenConfig;
    private readonly byte[] _secret;

    public JwtAuthManager(JwtTokenConfig jwtTokenConfig)
    {
        _jwtTokenConfig = jwtTokenConfig;
        _secret = Encoding.ASCII.GetBytes(jwtTokenConfig.Secret);
    }

    public JwtAuthResult GenerateTokens(string username, Claim[] claims, DateTime now)
    {
        var shouldAddAudienceClaim =
            string.IsNullOrWhiteSpace(claims?.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Aud)?.Value);
        var jwtToken = new JwtSecurityToken(
            _jwtTokenConfig.Issuer,
            shouldAddAudienceClaim ? _jwtTokenConfig.Audience : string.Empty,
            claims,
            expires: now.AddMinutes(_jwtTokenConfig.AccessTokenExpiration),
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(_secret),
                SecurityAlgorithms.HmacSha256Signature));
        var accessToken = new JwtSecurityTokenHandler().WriteToken(jwtToken);
        

        return new JwtAuthResult
        {
            AccessToken = accessToken,
        };
    }

    public (ClaimsPrincipal, JwtSecurityToken) DecodeJwtToken(string token)
    {
        if (string.IsNullOrWhiteSpace(token))
        {
            throw new SecurityTokenException("Invalid token");
        }

        var principal = new JwtSecurityTokenHandler()
            .ValidateToken(token,
                new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = _jwtTokenConfig.Issuer,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(_secret),
                    ValidAudience = _jwtTokenConfig.Audience,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.FromMinutes(1)
                },
                out var validatedToken);
        return (principal, validatedToken as JwtSecurityToken);
    }
}

public class JwtAuthResult
{
    [JsonPropertyName("accessToken")] public string AccessToken { get; set; }
}

// private readonly string _key;
//
// private readonly IDictionary<string, string> users = new Dictionary<string, string>
//     {{"user1", "password1"}, {"user2", "password2"}, {"user3", "password3"}};
//
// public JwtAuthManager(string key)
// {
//     _key = key;
// }
//
// public string Authenticate(string username, string password)
// {
//     if (!users.Any(u => u.Key == username && u.Value == password))
//     {
//         return null;
//     }
//
//     JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
//     var tokenKey = Encoding.ASCII.GetBytes(_key);
//
//     SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor()
//     {
//         Subject = new ClaimsIdentity(new Claim[]
//         {
//             new Claim(ClaimTypes.CategoryName, username)
//         }),
//         Expires = DateTime.UtcNow.AddHours(1),
//
//         SigningCredentials = new SigningCredentials(
//             new SymmetricSecurityKey(tokenKey),
//             SecurityAlgorithms.HmacSha256Signature) //setting sha256 algorithm
//     };
//
//     var token = tokenHandler.CreateToken(tokenDescriptor);
//
//     return tokenHandler.WriteToken(token);
// }