# test-slow-code-lens-ext README

Demonstrates how one slow resolving code lens can delay rendering of all others. To test extension:
 
1. Open markdown file
2. Any line starting with `x` will get two code lenses. The `🐰` resolves immediately. The `🐢` resolves after 5 seconds
3. Notice that both of these are rendered after 5 seconds