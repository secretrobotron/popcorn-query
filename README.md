# Popcorn Query

Usage:



    var q = Popcorn.query(popcornInstance);
    
    q.find('foo');                                         // find trackevents with 'foo'
    q.find('foo', {types: ["image"]});                     // find image trackevents with 'foo'
    q.find('foo', {typeOptions: {"image": ["href"]}});    // find image trackevents with 'foo' in 'href' field

## Popcorn.query(popcornInstance, options)
Constructs  a popcorn query object.

* __popcornInstace__: An instance of Popcorn to use for searching.
* __options__: Initialization options for searching. Can be overridden on calls to `find`.
 * __types__: An array of trackevent types. Only these types are used during search.
 * __typeOptions__: An object whose keys represent trackevent types. Each key's value is an array of trackevent options to use during search. Other options will be ignored.
 * __ignore__: An array of trackevent options to ignore during search. Note that entries should not be trackevent _types_, but the _options_ on trackevents.

## Popcorn.query(popcornInstance, query)
Constructs a popcorn query object and executes a search immediately, returning the results.

* __popcornInstance__: An instance of Popcorn to use for searching.
* __query__: String to search for immediately.

## query.find(query, options)
Returns an array of trackevents which match the specified query. 

* __query__: Search string.
* __options__: Options for this query which will temporarily override initialization options.

## query.seekTo(search)
Moves the Popcorn media to the start time in the first entry in the specified search.

* __search__: A search string to pass to `query.find`. If an array, no search is executed and this param is assumed to be the resultant array.

## query.fromQueryString(queryStringKey)
Performs a search based on the window's query string.

* __queryStringKey__: Optional. Key in window query string whose value will be used to search.


# License (MIT)
Copyright (C) 2012 Bobby Richter

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.