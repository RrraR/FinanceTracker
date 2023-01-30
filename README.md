# FinanceTracer

## About project
Projects acts as a tracker for your expenses and incomes.
 User registration/login is required to use the application

## How To Use

1. Register or login
2. If new user is registered they will need to create their own income/expenses categories before adding transactions or schedule payments
3. After new category is registered user can add transactions of this category type and create scheduled payments
4. In Statistics user can view their expenses and incomes for the current month in graph form 

## Confuguration

#### Frontend 
Frontend of the project is witten in react.  

In the project directory, you can run:

```bash
  npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

#### Backend
Backend is witten in C# using Web.Api and does not requre any additional settings

This project uses MSSQL and MSSQL managment studio 18
1. Change database settings in [appsettings.json](https://github.com/RrraR/FinanceTracker/blob/master/FinanceTracker/appsettings.json)

```csharp
  "ConnectionStrings": {"Default": "your string here"}
```

2. Run [CreateDatabase.sql](https://github.com/RrraR/FinanceTracker/blob/master/CreateDatabase.sql) file to create database and tables

![Database structure](DatabaseDiagram.png?raw=true "Database Structure")


## Architecture

1. Project uses Repository-Service pattern

2. Project contains 4 layers:
 - [Frontend UI](https://github.com/RrraR/FinanceTracker/tree/master/financetracker.ui) - displays pages to user
 - [Api](https://github.com/RrraR/FinanceTracker/tree/master/FinanceTracker) - controllers in this layer manage communications between Services and Frontend
 - [Service layer](https://github.com/RrraR/FinanceTracker/tree/master/FinanceTracker.Services) - main function is to access repositories to manipulate data
 - [Data access](https://github.com/RrraR/FinanceTracker/tree/master/FinanceTracker.Data)(repository layer) - has access to database and is used to get required data

 3. Entity Framework Core is used to communicate with database

## Project Features

- user cannot use application without login/registration
- authentication type: JWT Bearer token
- user add categories of either Income or Expenses types
- user can add income or expenses transactions of categories added previously 
- user can add scheduled payments 
- user can view their expenses and incomes for the current month in graph form 
