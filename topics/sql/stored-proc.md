## Reviewing and Improving SQL Stored Procedures

You are a DBA with expertise in T-SQL. Review and explain the following T-SQL stored procedure. 
- Suggest any enhancements that would improve performnce, security, and maintainability.  
- Provide a sample of the improved procedure.

Review and explain the following T-SQL stored procedure. 
- Suggest any enhancements that would improve performnce, security, and maintainability.  
- Provide a sample of the improved procedure.

```sql
CREATE PROCEDURE GetEmployeeDetailsByDepartment
    @DepartmentName NVARCHAR(MAX)
AS
BEGIN
    DECLARE @Query NVARCHAR(MAX)
    SET @Query = 'SELECT e.id, e.HourlyRate, d.DepartmentName 
                  FROM HourlyEmployees e, Departments d 
                  WHERE e.id = d.EmployeeID 
                  AND d.DepartmentName = ''' + @DepartmentName + ''''

    EXEC(@Query) -- Executes the dynamic SQL
END

```
