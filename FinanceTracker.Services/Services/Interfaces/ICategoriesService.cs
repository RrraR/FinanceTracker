using FinanceTracker.Services.Models;

namespace FinanceTracker.Services.Services.Interfaces;

public interface ICategoriesService
{
    public Task<ICollection<CategoriesDto>> GetCategoriesByUser(string Username);
    public Task<ICollection<CategoriesDto>> UpdateCategory(CategoryToUpdateDto data);
    public Task<ICollection<CategoriesDto>> DeleteCategory(CategoryToDeleteDto data);
    public Task<ICollection<CategoriesDto>> CreateCategory(CategoryToAddDto data);
}