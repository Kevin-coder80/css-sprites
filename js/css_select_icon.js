Sprites.app.directive( 'changeIcon', [ function () {
    return function ( scope, element, attrs ) {
        element.bind( 'click', function () {
            var img = element.find( 'img' );
            var imgW = img.width();
            var imgH = img.height();

            scope.img = img.get( 0 );
            $( '.spanBG' ).removeClass( 'spanBG' );
            $( this ).addClass( 'spanBG' );
        } );
    }
} ] );
