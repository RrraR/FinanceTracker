using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceTracker.Services.Models;
using FinanceTracker.Services.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinanceTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {

        private readonly ICategoriesService _categoriesService;
        
        public CategoriesController(ICategoriesService categoriesService)
        {
            _categoriesService = categoriesService;
        }
        
        [HttpPost]
        public async Task<ICollection<CategoriesDto>> GetCategories([FromBody] UsernameDto request)
        {
            return await _categoriesService.GetCategoriesByUser(request.Username);
        }

        [HttpPut]
        public async Task<ICollection<CategoriesDto>> UpdateCategory([FromBody] CategoryToUpdateDto data)
        {
            return await _categoriesService.UpdateCategory(data);
        }
        
        
        [HttpPost("delete")]
        public async Task<ICollection<CategoriesDto>> DeleteCategory([FromBody] CategoryToDeleteDto data)
        {
            return await _categoriesService.DeleteCategory(data);
        }
        
        [HttpPost("create")]
        public async Task<ICollection<CategoriesDto>> CreateCategory([FromBody] CategoryToAddDto data)
        {
            return await _categoriesService.CreateCategory(data);
        }
    }
}
