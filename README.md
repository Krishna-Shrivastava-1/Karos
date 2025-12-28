karos
=====

**Opinionated, minimal API response & error standardization for Express.**

Karos enforces predictable JSON response shapes and centralized error handling in Node.js APIs — without adding business logic, configuration, or framework lock-in.

The Problem
-----------

In most Express backends:

*   Every route formats responses differently
    
*   Errors are sometimes strings, sometimes objects
    
*   Status codes are inconsistent
    
*   Frontend logic becomes fragile and full of conditionals
    
*   Teams re-implement the same response boilerplate in every project
    

There is no shared contract between backend and frontend.

What Karos Enforces
-------------------

Karos enforces **one response contract** for your entire API.

Success
-------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   json{    "success": true,    "data": {}  }   `

Error
-----

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   json{    "success": false,    "error": {      "code": "NOT_FOUND",      "message": "User not found"    }  }   `

No exceptions. No special cases.

Install + Usage (60 seconds)
----------------------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashnpm install karos   `

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   const express = require('express');  const { ok, notFoundError, errorHandler } = require('karos');  const app = express();  app.use(express.json());  // Your routes here...  app.get('/users/:id', async (req, res) => {    const user = await db.findUser(req.params.id);    if (!user) {      notFoundError('User not found');  // Throws → middleware catches    }    ok(res, user);  });  // ONE middleware catches everything  app.use(errorHandler);  app.listen(3000);   `

No try/catch. No per-route error formatting. One consistent API surface.

Core API
--------

**ok(res, data, message?, meta?)**Formats a successful response.

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ok(res, user);  ok(res, user, 'User fetched');   `

**notFoundError(message?)**Prebuilt helpers (autocomplete-safe).

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   notFoundError();                           // 404 "Not found"  validationError('Invalid email');          // 400  unauthorizedError();                       // 401   `

**errorHandler**Express middleware that:

*   Catches all thrown Karos errors
    
*   Formats unknown errors as INTERNAL\_ERROR
    
*   Preserves correct HTTP status codes
    

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   app.use(errorHandler);  // Last, after all routes   `

Error Codes (Autocomplete)
--------------------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ErrorCode.NOT_FOUND          // 404  ErrorCode.VALIDATION_FAILED  // 400    ErrorCode.UNAUTHORIZED       // 401  ErrorCode.FORBIDDEN          // 403  ErrorCode.CONFLICT           // 409  ErrorCode.INTERNAL_ERROR     // 500   `

You control: message, status, structured details.Karos only enforces the response shape.

Database Errors (Auto-handled)
------------------------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   app.get('/orders', async (req, res) => {    const orders = await prisma.order.findMany();  // Crashes? → 500    ok(res, orders);  });   `

**Zero try/catch needed.** Middleware formats everything.

What Karos Does NOT Do (By Design)
----------------------------------

❌ No request validation❌ No authentication helpers❌ No logging❌ No database handling❌ No config files❌ No framework adapters (Fastify, Hono, etc.)

**Pure formatting layer only.** Your business logic stays yours.

TypeScript ✅
------------

Full types + autocomplete for ErrorCode.NOT\_FOUND, response shapes.

License
-------

MIT