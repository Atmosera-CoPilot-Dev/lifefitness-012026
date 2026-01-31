package MathFun;

/*
This file contains a minimal class that provides operations in the mathematical field of combinatorics.

TODO: 
1. Change parameter and variable names to be more descriptive.
2. Add JavaDoc comments for all methods and the class itself.
3. Implement a method to calculate combinations (nCr).
4. Optimize factorial calculation using memoization or iterative approach for large n.
*/
public class Combinatorics {

    public static long fact(int n) {
        if (n <= 1) {
            return 1L;
        }
        return n * fact(n - 1);
    }


    public static long perm(int n, int r) {
        return fact(n) / fact(n - r);
    }
}



