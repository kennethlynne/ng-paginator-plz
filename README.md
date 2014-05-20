ng-paginator-plz
========================

Angular pagination library that handles pagination non-intrusively.
It provides you with the paginated data and some controlls to navigate in the data,
it's up to you to handle listing of data.

# Install:
Download zip, or use bower

```
bower install ng-paginate-plz --save
```

Add `ng-paginate-plz` as a dependancy to your module.
```
angular.module('yourApp', 'ngPaginatorPlz')
```
# Usage:

```html
<paginator data="data" page-size="5" export-paged-data-to="target"></paginator>

<ul>
    <li ng-repeat="row in target">{{row}}</li>
</ul>
```

Now the provided data will be paginated and exported into the `target` variable.
It is up to you to list this data.

## Parameters:
1.  data: data to be paginated. Must be an array.
2.  page-size: items per page, defaults to 20
3.  export-paged-data-to: variable to export current page data. Must be an array.

# Custom template
Provide a custom template by overriding the default template url:
```
angular.module('yourApp')
  .value('DefaultPaginatorTemplate', 'views/custom-paginator.html')
```

# Build and develop:

```
npm install
karma start
```

========================

The MIT License (MIT)

Copyright (c) 2014 Kenneth Lynne

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[![Analytics](https://ga-beacon.appspot.com/UA-46835353-1/kl-ng-paginator/README)](https://github.com/igrigorik/ga-beacon)
