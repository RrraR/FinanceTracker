﻿using FinanceTracker.Services.Models;

namespace FinanceTracker.Services.Services.Interfaces;

public interface IUserService
{
    public Task<bool> GetUser(string username, string password);
    public Task<bool> IsAnExistingUser(string username);
    // public Task<string> GetUserRole(string userName);
    public Task<UserDto> RegisterUser(string username, string password);
}