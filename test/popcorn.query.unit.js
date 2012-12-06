/**
 * Copyright (C) 2012 Bobby Richter
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function( Popcorn ) {
  
  var popcornInstance;

  module( "Popcorn Query", {
    setup: function() {
      this.popcorn = Popcorn(document.querySelector('video'));
    }
  });

  test( "Initialization", 3, function() {
    var trackEventId = this.popcorn.text( { start: 1, end: 2, text: "foo" } ).getLastTrackEventId();

    var q1 = Popcorn.query( this.popcorn );
    var q2 = Popcorn.query( this.popcorn, "foo" );
    var q3 = Popcorn.query( this.popcorn, {
      ignore: [ "start", "end", "text" ]
    });

    ok( !!q1.find &&  !!q1.seekTo && !!q1.fromQueryString, "Object initialization" );

    equal( trackEventId, q2[ 0 ]._id, "Direct query execution" );
    
    equal( q3.find( "foo" ).length, 0, "Object initialization with options" );
  });

  test( "Type options", 3, function() {
    this.popcorn.image( { start: 1, end: 2, href: "data:image/png;base64,bar", text: "foo cheese" } );
    this.popcorn.image( { start: 3, end: 4, href: "data:image/png;base64,bar", text: "foo cheese" } );
    this.popcorn.text( { start: 5, end: 6, text: "foo cheese" } );
    this.popcorn.text( { start: 7, end: 8, text: "bar cheese" } );

    var q3 = Popcorn.query( this.popcorn, { types: [ "text" ] } );

    equal(
      q3.find( "foo" ).length,
      1,
      "Search for 'foo'" );

    equal(
      q3.find( "bar" ).length,
      1,
      "Search for 'bar'" );

    equal(
      q3.find( "cheese", { types: [ "image" ] } ).length,
      2,
      "Override: Search for 'cheese'" );
  });

  test( "Type option options", 3, function() {
    this.popcorn.image( { start: 1, end: 2, href: "data:image/png;base64,foo", text: "bar cheese" } );
    this.popcorn.image( { start: 3, end: 4, href: "data:image/png;base64,bar", text: "foo cheese" } );

    var q3 = Popcorn.query( this.popcorn, { typeOptions: { image: [ "text" ] } } );

    equal(
      q3.find( "foo" ).length,
      1,
      "Search for 'foo'" );

    equal(
      q3.find( "bar" ).length,
      1,
      "Search for 'bar'" );

    equal(
      q3.find( "bar", { typeOptions: { image: [ "href" ] } } ).length,
      1,
      "Override: Search for 'cheese'" );
  });

  test( "Ignore options", 3, function() {
    this.popcorn.image( { start: 1, end: 2, href: "data:image/png;base64,bar", text: "foo cheese" } );
    this.popcorn.image( { start: 3, end: 4, href: "data:image/png;base64,foo", text: "bar cheese" } );

    var q3 = Popcorn.query( this.popcorn, { ignore: [ "text" ] } );

    equal(
      q3.find( "foo" ).length,
      1,
      "Ignore text, search for 'foo'" );

    equal(
      q3.find( "bar" ).length,
      1,
      "Ignore text, search for 'bar'" );

    equal(
      q3.find( "cheese", {
        ignore: [ "href" ]
      }).length,
      2,
      "Override: Ignore href, search for 'cheese'" );
  });

})( window.Popcorn );