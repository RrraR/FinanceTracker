using System.Security.Cryptography;
using System.Text;
using FinanceTracker.Data.Entities;
using FinanceTracker.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Data.Repositories;

public class UserRepository : IUserRepository
{
    private readonly FinanceTrackerDbContext _dbContext;

    public UserRepository(FinanceTrackerDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ICollection<User>> GetAllUsers()
    {
        var users = await _dbContext.Users.ToListAsync();
        return users;
    }

    public async Task<User> GetUser(string username, string? password)
    {
        if (string.IsNullOrEmpty(password))
        {
            return (await _dbContext.Users.FirstOrDefaultAsync(u =>
                u.Username == username))!;
        }
        else
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                var passwordHash = GetHash(sha256Hash, password);

                if (VerifyHash(sha256Hash, password, passwordHash))
                {
                    return (await _dbContext.Users.FirstOrDefaultAsync(u =>
                        u.Username == username && u.Password == passwordHash))!;
                }

            }
        }

        return null;

    }

    public async Task<bool> CheckIfExistingUser(string username)
    {
        return await _dbContext.Users.AnyAsync(u => u.Username == username);

    }

    public async Task<User> RegisterUser(string username, string password)
    {
        using (SHA256 sha256Hash = SHA256.Create())
        {
            var passwordHash = GetHash(sha256Hash, password);

            if (!VerifyHash(sha256Hash, password, passwordHash)) return null;
            
            var newUser = new User()
            {
                Username = username,
                Password = passwordHash
            };

            await _dbContext.Users.AddAsync(newUser);
            await _dbContext.SaveChangesAsync();
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Username == username);
            return user;
        }
    }
    private static string GetHash(HashAlgorithm hashAlgorithm, string input)
    {
        byte[] data = hashAlgorithm.ComputeHash(Encoding.UTF8.GetBytes(input));
        var sBuilder = new StringBuilder();
        foreach (var t in data)
        {
            sBuilder.Append(t.ToString("x2"));
        }
        return sBuilder.ToString();
    }
    
    private static bool VerifyHash(HashAlgorithm hashAlgorithm, string input, string hash)
    {
        var hashOfInput = GetHash(hashAlgorithm, input);
        StringComparer comparer = StringComparer.OrdinalIgnoreCase;
        return comparer.Compare(hashOfInput, hash) == 0;
    }
    
}