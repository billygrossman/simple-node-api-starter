Simple Node REST API Starter
=======================

About
-------
Coming soon!

File Structure
-------
Separation of concerns is priority.
```
node-api-starter/
 ├──config/                        * app configs go in here
 |   ├──master.js                  * global/high level app configurations
 │
 ├──controllers/                   * controllers go in here
 |   ├──index.js                   * file autoloads all controllers in directory
 │   │
 |   ├──api.js                     * starter controller for general api
 │   │
 |   ├──user.js                    * starter controller for all things user
 │
 ├──models/                        * models go in here
 |   ├──validation/								 * json validation goes in here
 |   |   │
 | 	 |   ├──user-register.json   	 * validation for user register
 |   |
 |   ├──index.js                   * file autoloads all models in directory
 │   │
 |   ├──Token.js                   * model for user authentication tokens
 │   │
 |   ├──User.js                    * model for user
 │
 ├──routes/                        * routes go in here
 |   ├──index.js                   * file autoloads all routes in directory
 │   │
 |   ├──user.js                    * routes to access all things user
 │
 ├──test/                          * integration/unit tests go in here
 |   ├──app.js                     * sample test
 │   │
 |   ├──user.js                    * routes to access all things user
 │
 ├──utils/                         * utility files go in here
 |   ├──logger.js                  * utility for logging
 │   │
 |   ├──middleware.js              * utlity for middleware
 │
 ├──.env.example                   * environmnet variables
 ├──.gitignore                     * what git uses to ignore files
 ├──app.js                         * main app.js
 ├──LICENSE                        * license
 ├──package.json                   * what npm uses to manage its dependencies
 └──README.md                      * documentation
```

License
-------

The MIT License (MIT)

Copyright (c) 2017 Billy Grossman

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
