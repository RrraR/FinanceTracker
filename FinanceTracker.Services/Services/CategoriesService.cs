using AutoMapper;
using FinanceTracker.Data.Repositories.Interfaces;
using FinanceTracker.Services.Models;
using FinanceTracker.Services.Services.Interfaces;

namespace FinanceTracker.Services.Services;

public class CategoriesService : ICategoriesService
{
    private readonly IMapper _autoMapper;
    private readonly IUserRepository _userRepository;
    private readonly ICategoriesRepository _categoriesRepository;

    public CategoriesService(IMapper autoMapper, IUserRepository userRepository,
        ICategoriesRepository categoriesRepository)
    {
        _autoMapper = autoMapper;
        _userRepository = userRepository;
        _categoriesRepository = categoriesRepository;
    }


    public async Task<ICollection<CategoriesDto>> GetCategoriesByUser(string Username)
    {
        var user = await _userRepository.GetUser(Username, string.Empty);
        var res = await _categoriesRepository.GetCategoriesByUser(user.Id);
        return _autoMapper.Map<ICollection<CategoriesDto>>(res);
    }

    public async Task<ICollection<CategoriesDto>> UpdateCategory(CategoryToUpdateDto data)
    {
        var user = await _userRepository.GetUser(data.Username, string.Empty);
        var res = await _categoriesRepository.UpdateCategory(user.Id, data.OldValue, data.NewValue);
        return _autoMapper.Map<ICollection<CategoriesDto>>(res);
    }

    public async Task<ICollection<CategoriesDto>> DeleteCategory(CategoryToDeleteDto data)
    {
        var user = await _userRepository.GetUser(data.Username, string.Empty);
        var res = await _categoriesRepository.DeleteCategory(user.Id, data.CategoryName);
        return _autoMapper.Map<ICollection<CategoriesDto>>(res);
    }

    public async Task<ICollection<CategoriesDto>> CreateCategory(CategoryToAddDto data)
    {
        var user = await _userRepository.GetUser(data.Username, string.Empty);
        var res = await _categoriesRepository.CreateCategory(user.Id, data.CategoryName, data.CategoryType);
        return _autoMapper.Map<ICollection<CategoriesDto>>(res);
    }
}