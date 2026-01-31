// This file contains a class that provides operations in the mathematical field of combinatorics.

/*
TODO:

1) Replace all local variables and parameters with descriptive names.

2) Add a method to generate the count of combinations.

3) Modify the Combinatorics class to make use of memoization.

4) Add documentation to the class and all methods.
*/

``` CSharp
/*
This file contains a class that provides operations in the mathematical field of combinatorics.
*/

namespace MathFun
{

    public class Combinatorics
    {

        public static ulong fact(uint n)
        {
            if (n <= 1)
            {
                return 1;
            }
            return n * fact(n - 1);
        }

        public static ulong perm(uint n, uint r)
        {
            return fact(n) / fact(n - r);
        }
  
    }

}

```


