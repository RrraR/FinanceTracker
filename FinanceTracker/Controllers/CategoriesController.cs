using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FinanceTracker.Models;
using FinanceTracker.Services.Objects;
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
        private readonly IMapper _autoMapper;
        
        public CategoriesController(ICategoriesService categoriesService, IMapper autoMapper)
        {
            _categoriesService = categoriesService;
            _autoMapper = autoMapper;
        }
        
        [HttpPost]
        public async Task<ICollection<CategoriesObject>> GetCategories([FromBody] UsernameDto request)
        {
            return await _categoriesService.GetCategoriesByUser(request.Username);
        }

        [HttpPut]
        public async Task<ICollection<CategoriesObject>> UpdateCategory([FromBody] CategoryToUpdateDto data)
        {
            return await _categoriesService.UpdateCategory(_autoMapper.Map<CategoryToUpdateObject>(data));
        }
        
        
        [HttpPost("delete")]
        public async Task<ICollection<CategoriesObject>> DeleteCategory([FromBody] CategoryToDeleteDto data)
        {
            return await _categoriesService.DeleteCategory(_autoMapper.Map<CategoryToDeleteObject>(data));
        }
        
        [HttpPost("create")]
        public async Task<ICollection<CategoriesObject>> CreateCategory([FromBody] CategoryToAddDto data)
        {
            return await _categoriesService.CreateCategory(_autoMapper.Map<CategoryToAddObject>(data));
        }
    }
}
