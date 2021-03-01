![Logo](img/logo.png "Logo")

**[↤ Developer Overview](../README.md)**

Troubleshooting
===

> This document contains a list of known issues, and how to solve them.

<img src="https://octodex.github.com/images/dinotocat.png" width="400" />


Terminal Console Errors
---

### `npm ERR! Test failed.  See above for more details.`

This is the default error message if the `npm test` failed.  Directly above this message, you should see what exactly the problem was.

### `error  Parsing error: ...`

This is a JavaScript error that was captured during `npm test`.  The entire error message will include the exact file, line number and column where the error occured.

```
/Volumes/RedVan/website/src/js/site.js
  5:18  error  Parsing error: Unexpected token ,
```

### `error  Expected an assignment or function call and instead saw an expression  no-unused-expressions`

See: [https://eslint.org/docs/2.0.0/rules/no-unused-expressions](https://eslint.org/docs/2.0.0/rules/no-unused-expressions) for details

### `error  'someVariable' is not defined no-undef`

See: [https://eslint.org/docs/2.0.0/rules/no-undef](https://eslint.org/docs/2.0.0/rules/no-undef) for details

### `site.js ... error ...`

If you get any other errors in your site.js file, you can search [https://eslint.org/docs/2.0.0/rules/](https://eslint.org/docs/2.0.0/rules/) for any error messages you might see.  The last bit of text after the error will look something like `no-whatever` and you can check this page for why that specific error is happening on the line of the file it is yelling at you for.

### `[lint-html] ...`

If you see this, the rendered HTML code in the `./dist` folder ended up having a problem.  More than likely this is because of a change you made that introduce invalid markup into the HTML.

Your full error message will likely look something like:

```
[lint-html] ./dist/careers.html [314:18] (E005) the `class` attribute is not double quoted
```

The error is broken down into:

```
[lint-html] FILE_PATH [ LINE_NUMBER : COLUMN_NUMBER ] ( ERROR_CODE ) ERROR_MESSAGE
```

You can lookup the specific [Error Code](https://github.com/htmllint/htmllint/wiki/Option-by-Error-Code) and get [More Information](https://github.com/htmllint/htmllint/wiki/Options) for the HTML Linting Rule that is being reported.

### `Expecting 'OPEN_ENDBLOCK', got 'EOF'`

If you see this error, this means that there was an issue with one of the panani template variables.  For example, when including the menu in a template, you would use `{{> menu}}`, but if for whatever reason you added some invalid markup to this template section, e.g. `{{#> menu}}` you will see this error.  The total error message may look something like this:

```
/Volumes/RedVan/website/node_modules/panini/lib/render.js:80
    throw new Error('Panini: rendering error occured.\n' + e);
    ^
Error: Panini: rendering error occured.
Error: Parse error on line 253:
...ion>{{> footer}}
-------------------^
Expecting 'OPEN_ENDBLOCK', got 'EOF'
```

This one is a bit tricky, as the error message for where the error occurred is not going to be 100% accurate.  Most likely you saw this error immediatley after modifying and saving an HTML file, and a template string inside that file is what is broken.

If you cannot find it there, likely because you saved multiple files at the same time, you can look at your `git diff` and see what you've changed that is inside the template brackets `{{ }}`.

Once you've found this issue, you can restart the server to test your fix. If it starts, you're fixed the issue.


HTML Errors
---

### `I'm seeing Template Properties at the Top of the Page`

You might be seeing something that looks like this injected at the top of the page:

```
---layout: default title: End of Life Plan description: End of Life Plan partners with e-commerce retailers who want to get things done. All on-shore. All Salesforce Commerce Cloud. ---
```

If so, that means you likely used some fancy code formatting tool that messed up the panini template variables that are set on top of some HTML pages.  To fix this, you can check the HTML files that are used on the page you are seeing this error on.  At the top of one of them, you will see that text you saw in your HTML page.  To correct the issue, make sure the template varables in the HTML are written like this:

```
---
layout: default
title: End of Life Plan
description: End of Life Plan partners with e-commerce retailers who want to get things done. All on-shore. All Salesforce Commerce Cloud.
---
```

You may need to stop the server and restart it in order to rebuild the templates into HTML pages.
