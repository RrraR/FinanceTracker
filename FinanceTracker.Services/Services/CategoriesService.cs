using AutoMapper;
using FinanceTracker.Data.Repositories.Interfaces;
using FinanceTracker.Services.Objects;
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


    public async Task<ICollection<CategoriesObject>> GetCategoriesByUser(string Username)
    {
        var user = await _userRepository.GetUser(Username, string.Empty);
        var res = await _categoriesRepository.GetCategoriesByUser(user.Id);
        return _autoMapper.Map<ICollection<CategoriesObject>>(res);
    }

    public async Task<ICollection<CategoriesObject>> UpdateCategory(CategoryToUpdateObject data)
    {
        var user = await _userRepository.GetUser(data.Username, string.Empty);
        var res = await _categoriesRepository.UpdateCategory(user.Id, data.OldValue, data.NewValue);
        return _autoMapper.Map<ICollection<CategoriesObject>>(res);
    }

    public async Task<ICollection<CategoriesObject>> DeleteCategory(CategoryToDeleteObject data)
    {
        var user = await _userRepository.GetUser(data.Username, string.Empty);
        var res = await _categoriesRepository.DeleteCategory(user.Id, data.CategoryName);
        return _autoMapper.Map<ICollection<CategoriesObject>>(res);
    }

    public async Task<ICollection<CategoriesObject>> CreateCategory(CategoryToAddObject data)
    {
        var user = await _userRepository.GetUser(data.Username, string.Empty);
        var res = await _categoriesRepository.CreateCategory(user.Id, data.CategoryName, data.CategoryType);
        return _autoMapper.Map<ICollection<CategoriesObject>>(res);
    }
}