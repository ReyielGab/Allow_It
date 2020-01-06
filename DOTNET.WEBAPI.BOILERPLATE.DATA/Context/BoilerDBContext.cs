using System;
using System.Data.Entity;
using DOTNET.WEBAPI.BOILERPLATE.DOMAIN;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.Context
{
    public class BoilerDbContext : DbContext, IBoilerDbContext
    {
        public BoilerDbContext() : base("BoilerDbCtx")
        {
            
        }

        //public BoilerDbContext(string connectionstring)
        //    : base(connectionstring)
        //{

        //}

        //public ITransactionScope CreateTransactionScope()
        //{
        //    return new EfTransactionScope(Database.BeginTransaction());
        //}

        //public IDbSet<User> Users { get; set; }

        //public IDbSet<Todo> Todos { get; set; }  

        public DbSet<User> Users { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Balance> Balances { get; set; }

        public int SaveChanges()
        {
            return base.SaveChanges();
        }
    }

    //public class EfTransactionScope : ITransactionScope
    //{
    //    private readonly DbContextTransaction _entityTransaction;

    //    public EfTransactionScope(DbContextTransaction entityTransaction)
    //    {
    //        _entityTransaction = entityTransaction;
    //    }

    //    public void Commit()
    //    {
    //        _entityTransaction.Commit();
    //    }

    //    public void Rollback()
    //    {
    //        _entityTransaction.Rollback();
    //    }

    //    public void Dispose()
    //    {
    //        _entityTransaction.Dispose();
    //    }

    //}

    //public interface ITransactionScope : IDisposable
    //{
    //    void Commit();
    //    void Rollback();
    //}


    public interface IBoilerDbContext : IDisposable
    {

        DbSet<User> Users { get; set; }
        DbSet<Expense> Expenses { get; set; }
        DbSet<Income> Incomes { get; set; }
        DbSet<Balance> Balances { get; set; }
        int SaveChanges();

        //IDbSet<User> Users { get; set; }
        //IDbSet<Todo> Todos { get; set; }
        //ITransactionScope CreateTransactionScope();
        //int SaveChanges();
    }
}
