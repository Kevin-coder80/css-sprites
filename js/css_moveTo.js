Sprites.app.directive( 'moveTo', [ function () {
    var img, imgW, imgH, clearX, clearY, canvas, context;

    function _moveTo ( scope, element, attrs ) {
        var val = element.val();
        var to = attrs.class;

        _imgPosition( scope, val, to );
    };

    function _imgPosition ( scope, val, to ) {
        if ( context )
        {
            img = scope.items[ scope.img.src ].img;
            imgW = img.imgW;
            imgH = img.imgH;
            clearX = img.clearX;
            clearY = img.clearY;
            // console.log( scope, ' ## ', img );

            context.clearRect( clearX, clearY, imgW, imgH );

            if ( to == 'top' )
            {
                context.drawImage( img, clearX, val );
                clearY = val;
            }
            else if ( to == 'bottom' )
            {
                val = ( val > 0 ) ? canvas.height - val - imgH : canvas.height - imgH;
                context.drawImage( img, clearX, val );
                clearY = val;
            }
            else if ( to == 'left' )
            {
                context.drawImage( img, val, clearY );
                clearX = val;
            }
            else if ( to == 'right' )
            {
                val = ( val > 0 ) ? canvas.width - val - imgW : canvas.width - imgW;
                context.drawImage( img, val, clearY );
                clearX = val;
            }
            scope.items[ img.src ].img.clearX = clearX;
            scope.items[ img.src ].img.clearY = clearY;
        }
    };

    function isOccupied ( img, val ) {
        var occupy = false;

        if ( img.clearX == val )
        {
            occupy = true;
        }
        else if ( img.clearY == val )
        {
            occupy = true;
        }
        return occupy;
    };

    return function ( scope, element, attrs ) {
        canvas = scope.canvas;
        context = scope.context;

        element.bind( 'keyup', function () {
            _moveTo( scope, element, attrs );
        } );
    }
} ] );
