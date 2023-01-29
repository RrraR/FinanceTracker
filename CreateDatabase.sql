USE [master]
GO

/****** Object:  Database [FinanceTrackerDB]    Script Date: 1/29/2023 9:02:32 PM ******/
CREATE DATABASE [FinanceTrackerDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FinanceTrackerDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\FinanceTrackerDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'FinanceTrackerDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\FinanceTrackerDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FinanceTrackerDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [FinanceTrackerDB] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [FinanceTrackerDB] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [FinanceTrackerDB] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [FinanceTrackerDB] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [FinanceTrackerDB] SET ARITHABORT OFF 
GO

ALTER DATABASE [FinanceTrackerDB] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [FinanceTrackerDB] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [FinanceTrackerDB] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [FinanceTrackerDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [FinanceTrackerDB] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [FinanceTrackerDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [FinanceTrackerDB] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [FinanceTrackerDB] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [FinanceTrackerDB] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [FinanceTrackerDB] SET  DISABLE_BROKER 
GO

ALTER DATABASE [FinanceTrackerDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [FinanceTrackerDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [FinanceTrackerDB] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [FinanceTrackerDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [FinanceTrackerDB] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [FinanceTrackerDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [FinanceTrackerDB] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [FinanceTrackerDB] SET RECOVERY SIMPLE 
GO

ALTER DATABASE [FinanceTrackerDB] SET  MULTI_USER 
GO

ALTER DATABASE [FinanceTrackerDB] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [FinanceTrackerDB] SET DB_CHAINING OFF 
GO

ALTER DATABASE [FinanceTrackerDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [FinanceTrackerDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO

ALTER DATABASE [FinanceTrackerDB] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [FinanceTrackerDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO

ALTER DATABASE [FinanceTrackerDB] SET QUERY_STORE = OFF
GO

ALTER DATABASE [FinanceTrackerDB] SET  READ_WRITE 
GO

create table Users
(
    Id       int identity
        constraint PK_Users
            primary key,
    Username nvarchar(30)  not null,
    Password nvarchar(max) not null
)
go

create table Categories
(
    Id     int identity
        constraint PK_Category
            primary key,
    Title  nvarchar(50) not null,
    Type   nvarchar(50) not null,
    UserId int          not null
        constraint FK_Categories_Users
            references Users
)
go

create table Transactions
(
    Id         int identity
        constraint PK_Transactions
            primary key,
    CategoryId int                             not null
        constraint FK_Transactions_Categories
            references Categories,
    Amount     int          default 0          not null,
    UserId     int                             not null
        constraint FK_Transactions_Users
            references Users,
    Date       date         default getdate()  not null,
    IsPeriodic bit          default 0          not null,
    PeriodType nvarchar(50) default 'one-time' not null,
    Name       nvarchar(50)                    not null
)
go


