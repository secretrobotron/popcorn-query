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