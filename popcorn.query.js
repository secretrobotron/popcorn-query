(function( global, Popcorn ) {

  Popcorn.query = function( popcornInstance ) {
    var options = {};
    var initialQuery;

    if ( !( popcornInstance instanceof Popcorn ) ) {
      throw "Popcorn.query must take Popcorn instance as first argument";
    }

    if ( typeof arguments[ 1 ] === "string" ) {
      initialQuery = arguments[ 1 ];
    }
    else if ( typeof arguments[ 1 ] === "object" ) {
      options = arguments[ 1 ];
    }

    var genericTypeKeys = {};
    var genericIgnoreKeys = options.ignore || [ "start", "end" ];

    function generateTypeKeys( types, specificTypeKeys, ignoreKeys ) {
      var typeKeys = {};

      specificTypeKeys = specificTypeKeys || {};

      types = types || Object.keys( Popcorn.manifest );

      types.forEach( function( typeKey ) {
        var manifestKeys = specificTypeKeys[ typeKey ] || Object.keys( Popcorn.manifest[ typeKey ].options );
        typeKeys[ typeKey ] = manifestKeys.filter( function( manifestKey ) {
          return ignoreKeys ? ignoreKeys.indexOf( manifestKey ) === -1 : true;
        });
      });

      return typeKeys;
    }

    function exec( query, options ) {
      var typeKeys = genericTypeKeys;

      options = options || {};

      if ( options.ignore || options.types || options.typeOptions ) {
        typeKeys = generateTypeKeys( options.types, options.typeOptions, options.ignore );
      }

      var queryRegex = query instanceof RegExp ? query : new RegExp( query );
      return popcornInstance.data.trackEvents.byStart.filter( function( trackEvent ) {
        var keys, value;

        if ( trackEvent._natives && trackEvent._natives.type ) {
          keys = typeKeys[ trackEvent._natives.type ];

          if ( keys ) {
            for ( var i = 0, l = keys.length; i < l; ++i ) {
              value = trackEvent[ keys[ i ] ];

              if ( value ) {
                value = typeof value === "string" ? value : value.toString();

                if ( value.search( queryRegex ) > -1 ) {
                  return trackEvent;
                }
              }
            }
          }
        }

      });
    }

    genericTypeKeys = generateTypeKeys( options.types, options.typeOptions, genericIgnoreKeys );

    if ( initialQuery ) {
      return exec( initialQuery );
    }

    return {
      find: exec,
      seekTo: function() {
        var results = arguments.length === 1 && Array.isArray( arguments[ 0 ] ) ? arguments[ 0 ] : exec.apply(this, arguments);

        if ( results && results.length > 0 ) {
          popcornInstance.currentTime( results[0].start );
        }
      },
      fromQueryString: function( queryStringKey ) {
        var queryPair = window.location.search.match(new RegExp('(\\?|&)' + queryStringKey + '=' + '([^$&]*)'));
        if ( queryPair ) {
          return exec( queryPair[ 2 ] );
        }
        return null;
      }
    };

  };

})( window, window.Popcorn );