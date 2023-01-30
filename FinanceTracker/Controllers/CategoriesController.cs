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
        public async Task<ICollection<CategoriesDto>> GetCategories([FromBody] UsernameDto request)
        {
            var temp = await _categoriesService.GetCategoriesByUser(request.Username);
            return _autoMapper.Map<ICollection<CategoriesDto>>(temp);
        }

        [HttpPut]
        public async Task<ICollection<CategoriesDto>> UpdateCategory([FromBody] CategoryToUpdateDto data)
        {
            var temp = await _categoriesService.UpdateCategory(_autoMapper.Map<CategoryToUpdateObject>(data));
            return _autoMapper.Map<ICollection<CategoriesDto>>(temp);
        }


        [HttpPost("delete")]
        public async Task<ICollection<CategoriesDto>> DeleteCategory([FromBody] CategoryToDeleteDto data)
        {
            var temp = await _categoriesService.DeleteCategory(_autoMapper.Map<CategoryToDeleteObject>(data));
            return _autoMapper.Map<ICollection<CategoriesDto>>(temp);
        }

        [HttpPost("create")]
        public async Task<ICollection<CategoriesDto>> CreateCategory([FromBody] CategoryToAddDto data)
        {
            var temp = await _categoriesService.CreateCategory(_autoMapper.Map<CategoryToAddObject>(data));
            return _autoMapper.Map<ICollection<CategoriesDto>>(temp);
        }
    }
}