# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

Code refactoring explanation. 

1. I extracted the TRIVIAL_PARTITION_KEY and MAX_PARTITION_KEY_LENGTH constants out of the function to make it easier to read and modify.

2. I split the function into smaller, more focused functions that each do one thing. This makes the code easier to understand and reduces the cognitive load on the reader.

3. I gave each function a descriptive name that explains what it does. This makes it easier to read the code and understand the intention behind each function.

4. I used guard clauses and early returns to reduce the nesting and make the code flow more naturally. This reduces the complexity of the code and makes it easier to follow.

5. I removed unnecessary if statements and simplified the logic. For example, the if (candidate) check is not necessary since we set candidate to TRIVIAL_PARTITION_KEY by default.

6. I used template literals instead of concatenation to make the code more readable.

7. I removed the exports. prefix since it's not necessary in this case.

Unit testing explanation. 

The tests cover the various scenarios that the original code handles, including the case where no input is provided, a partition key is provided, the event data needs to be hashed, non-string partition keys, and partition keys that are too long. 