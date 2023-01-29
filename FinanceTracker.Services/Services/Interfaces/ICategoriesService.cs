using FinanceTracker.Services.Objects;

namespace FinanceTracker.Services.Services.Interfaces;

public interface ICategoriesService
{
    public Task<ICollection<CategoriesObject>> GetCategoriesByUser(string Username);
    public Task<ICollection<CategoriesObject>> UpdateCategory(CategoryToUpdateObject data);
    public Task<ICollection<CategoriesObject>> DeleteCategory(CategoryToDeleteObject data);
    public Task<ICollection<CategoriesObject>> CreateCategory(CategoryToAddObject data);
}