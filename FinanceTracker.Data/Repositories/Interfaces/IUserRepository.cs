using FinanceTracker.Data.Entities;

namespace FinanceTracker.Data.Repositories.Interfaces;

public interface IUserRepository
{
    public Task<ICollection<User>> GetAllUsers();
    public Task<User> GetUser(string username, string? password);
    public Task<bool> CheckIfExistingUser(string username);
    public Task<User> RegisterUser(string username, string password);
}