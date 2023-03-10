using AutoMapper;
using FinanceTracker.Data.Entities;
using FinanceTracker.Models;
using FinanceTracker.Services.Objects;

namespace FinanceTracker;

public class AutoMapper : Profile
{
    public AutoMapper()
    {
        CreateMap<User, UserObject>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Username))
            .ForMember(d => d.Password, o => o.MapFrom(s => s.Password));


        CreateMap<Transaction, TransactionsObject>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.CategoryName, o => o.MapFrom(s => s.Category.Title))
            .ForMember(d => d.CategoryType, o => o.MapFrom(s => s.Category.Type))
            .ForMember(d => d.Amount, o => o.MapFrom(s => s.Amount))
            .ForMember(d => d.Date, act => act.Ignore())
            .ForMember(d => d.IsPeriodic, o => o.MapFrom(s => s.IsPeriodic))
            .ForMember(d => d.PeriodType, o => o.MapFrom(s => s.PeriodType))
            .ForMember(d => d.Name, o => o.MapFrom(s => s.Name));

        CreateMap<Category, CategoriesObject>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.CategoryName, o => o.MapFrom(s => s.Title))
            .ForMember(d => d.CategoryType, o => o.MapFrom(s => s.Type));

        // TSource, TDestination
        CreateMap<AuthRequestDto, AuthRequestObject>();
        CreateMap<AuthResultDto, AuthResultObject>();
        CreateMap<CategoriesDto, CategoriesObject>();
        CreateMap<CategoryToAddDto, CategoryToAddObject>();
        CreateMap<CategoryToDeleteDto, CategoryToDeleteObject>();
        CreateMap<CategoryToUpdateDto, CategoryToUpdateObject>();
        CreateMap<TransactionsDto, TransactionsObject>();
        CreateMap<TransactionToAddDto, TransactionToAddObject>();
        CreateMap<TransactionToDeleteDto, TransactionToDeleteObject>();
        CreateMap<TransactionToUpdateDto, TransactionToUpdateObject>();
        CreateMap<UserDto, UserObject>();
        CreateMap<UsernameDto, UsernameObject>();


        CreateMap<AuthRequestObject, AuthRequestDto>();
        CreateMap<AuthResultObject, AuthResultDto>();
        CreateMap<CategoriesObject, CategoriesDto>();
        CreateMap<CategoryToAddObject, CategoryToAddDto>();
        CreateMap<CategoryToDeleteObject, CategoryToDeleteDto>();
        CreateMap<CategoryToUpdateObject, CategoryToUpdateDto>();
        CreateMap<TransactionsObject, TransactionsDto>();
        CreateMap<TransactionToAddObject, TransactionToAddDto>();
        CreateMap<TransactionToDeleteObject, TransactionToDeleteDto>();
        CreateMap<TransactionToUpdateObject, TransactionToUpdateDto>();
        CreateMap<UserObject, UserDto>();
        CreateMap<UsernameObject, UsernameDto>();
    }
}