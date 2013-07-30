#!/usr/bin/env node

var http = require( 'http' );
var rout = require( './routing' );
var webSvr = http.createServer( rout.run );

webSvr.on( 'error', function ( error ) {
    console.log( error );
} );

webSvr.listen( 8080, function () {
    console.log( '[WebSvr][Start] running!' );
} );
