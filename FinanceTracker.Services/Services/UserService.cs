using AutoMapper;
using FinanceTracker.Data.Repositories.Interfaces;
using FinanceTracker.Services.Models;
using FinanceTracker.Services.Services.Interfaces;

namespace FinanceTracker.Services.Services;

public class UserService:IUserService
{
    private readonly IMapper _autoMapper;
    private readonly IUserRepository _userRepository;


    public UserService(IMapper autoMapper, IUserRepository userRepository)
    {
        _autoMapper = autoMapper;
        _userRepository = userRepository;
    }

    public async Task<bool> GetUser(string username, string password)
    {
        var user = await _userRepository.GetUser(username, password);
        // return _autoMapper.Map<UserDto>(user);
        if (user == null)
        {
            return false;
        }

        return true;
    }

    public async Task<bool> IsAnExistingUser(string username)
    {
        return await _userRepository.CheckIfExistingUser(username);

    }

    // public async Task<string> GetUserRole(string userName)
    // {
    //     if (!IsAnExistingUser(userName).Result)
    //     {
    //         return string.Empty;
    //     }
    //
    //     return userName == "admin" ? UserRoles.Admin : UserRoles.BasicUser;
    // }

    public async Task<UserDto> RegisterUser(string username, string password)
    {
        var user = await _userRepository.RegisterUser(username, password);

        if (!IsAnExistingUser(user.Username).Result) return null;
        
        // var user = await _userRepository.GetUser(username, password);
        return _autoMapper.Map<UserDto>(user);
    }
}