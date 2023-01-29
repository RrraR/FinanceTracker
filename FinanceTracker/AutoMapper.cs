using AutoMapper;
using FinanceTracker.Data.Entities;
using FinanceTracker.Services.Models;

namespace FinanceTracker;

public class AutoMapper : Profile
{
    public AutoMapper()
    {
        CreateMap<User, UserDto>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Username))
            .ForMember(d => d.Password, o => o.MapFrom(s => s.Password));


        CreateMap<Transaction, TransactionsDto>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.CategoryName, o => o.MapFrom(s => s.Category.Title))
            .ForMember(d => d.CategoryType, o => o.MapFrom(s => s.Category.Type))
            .ForMember(d => d.Amount, o => o.MapFrom(s => s.Amount))
            .ForMember(d => d.Date, act => act.Ignore())
            .ForMember(d => d.IsPeriodic, o => o.MapFrom(s => s.IsPeriodic))
            .ForMember(d => d.PeriodType, o => o.MapFrom(s => s.PeriodType))
            .ForMember(d => d.Name, o => o.MapFrom(s => s.Name));

        CreateMap<Category, CategoriesDto>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.CategoryName, o => o.MapFrom(s => s.Title))
            .ForMember(d => d.CategoryType, o => o.MapFrom(s => s.Type));



    }
}