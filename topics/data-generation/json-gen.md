## Data Generation with JSON
```
Generate a sample JSON array of 10 rows of sample data. The data should include the following keys: 
- employee ID (unique and random in the range 10 to 1000),
- department name (randomly assigned to one of the following departments: Human Resources, Engineering, Sales),
- first name,
- middle initial,
- last name,
- hourly rate ($25.00 to $75.00, standard deviation of $7.65)
Use international naming conventions for the names.
```


## Consuming JSON Data in Java
```
@workspace /new You are a Java developer with expertise in designing services that consume JSON data over HTTP.

Assuming the data you provided is consumable over http://localhost:6543/employees, how would I consume this JSON data using Java within package 'hr'? 
- The design must include a service contract and a concrete implementation with each type in its own file. 
- Make the implementation responsible for performing the HTTP request, parsing JSON, mapping to Employee objects, and handling errors. 
- The design should be dependency-injection friendly (constructor injection), unit-testable (allow the HTTP client to be mocked), and include expectations for timeouts, retries, logging, and JSON schema validation.
 - The result should produce a collection of Employee objects (e.g., a list) and adhere to SOLID design principles. 
```

## Consuming JSON Data in a React Application using Axios
```
Assuming the data you provided is consumable over http://localhost:6543/employees, how would I consume the same JSON data in a React application using Axios? Do not show code, but describe the architecture and design patterns you would use to ensure maintainability, scalability, and performance. Include considerations for state management, error handling, and component structure.
```

## Consuming JSON Data in C++ with Separation of Concerns
```
@workspace /new You are a C++ developer with expertise in designing services that consume JSON data over HTTP.
- Assuming the data is consumable over http://localhost:6543/employees, I want to consume this JSON data using C++ within namespace 'HR'. 
- The result should produce an efficient and performant collection of Employee objects and adhere to separation of concerns principles. 
- I want the result to include a service and a contract. Each type definition (.h) and implementation (.cpp) will be in its own file.
```