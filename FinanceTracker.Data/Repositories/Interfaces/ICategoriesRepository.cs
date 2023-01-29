using FinanceTracker.Data.Entities;

namespace FinanceTracker.Data.Repositories.Interfaces;

public interface ICategoriesRepository
{
    public Task<ICollection<Category>> GetCategoriesByUser(int Userid);
    public Task<ICollection<Category>> UpdateCategory(int UserId, string OldVaue, string NewValue);
    public Task<ICollection<Category>> DeleteCategory(int UserId, string categoryName);
    public Task<ICollection<Category>> CreateCategory(int UserId, string categoryName, string categoryType);
}