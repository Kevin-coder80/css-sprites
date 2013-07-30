Sprites.app.controller( 'fileCtrl', [ '$scope', function ( $scope ) {
    var img, imgW, imgH, clearX, clearY, canvas, context;

    $scope.fileCtrlUrl = '../templates/drag_file.html';
    $scope.$on( '$includeContentLoaded', function () {
        var dragFile = $( '.file-js' ).get( 0 );

        $( document ).on( {
            dragenter: function ( evt ) {
                evt.preventDefault();
            },
            dragover: function ( evt ) {
                evt.preventDefault();
            },
            drop: function ( evt ) {
                evt.preventDefault();
            },
            dragleave: function ( evt ) {
                evt.preventDefault();
            }
        } );

        dragFile.addEventListener( 'drop', function ( evt ) {
            evt.preventDefault();

            var dataTransfer = evt.dataTransfer;
            var filesList = $( dataTransfer.files );
            canvas = $( '#preview').get( 0 );
            context = canvas.getContext( '2d' );

            if ( filesList.length > 0 )
            {
                var createObjectURL = window.URL.createObjectURL || window.webkitURL.createObjectURL;

                filesList.each( function ( i, item ) {
                    if ( /image/g.test( item.type ) )
                    {
                        img = new Image();
                        img.src = createObjectURL( item );
                        img.onload = function () {
                            this.style.visibility = 'hidden';
                            $( document.body ).append( this );
                            imgW = this.offsetWidth;
                            imgH = this.offsetHeight;
                            clearX = canvas.width/2-imgW/2;
                            clearY = canvas.height/2-imgH/2;
                            context.drawImage( this, canvas.width/2-imgW/2, canvas.height/2-imgH/2 );
                            $( this ).remove();
                            // window.location = canvas.toDataURL( 'image/png' );
                            canvas.toBlob( function ( blob ) {
                                console.log( blob );
                            } );
                        } ;
                    }
                } );
            }
        }, false );
    } );

    $scope.moveTo = function ( evt, to ) {
        $scope.dir = $( '.num' ).val();
        $scope.to = to;
        $scope.imgPosition( $scope.dir );

        evt.preventDefault();
        evt.stopPropagation();
    };

    $scope.imgPosition = function ( val ) {
        if ( context )
        {
            context.clearRect( clearX, clearY, imgW, imgH );

            if ( $scope.to == 'top' )
            {
                context.drawImage( img, clearX, val );
                clearY = val;
            }
            else if ( $scope.to == 'bottom' )
            {
                val = ( val > 0 ) ? canvas.height - val - imgH : canvas.height - imgH;
                context.drawImage( img, clearX, val );
                clearY = val;
            }
            else if ( $scope.to == 'left' )
            {
                context.drawImage( img, val, clearY );
                clearX = val;
            }
            else if ( $scope.to == 'right' )
            {
                val = ( val > 0 ) ? canvas.width - val - imgW : canvas.width - imgW;
                context.drawImage( img, val, clearY );
                clearX = val;
            }
        }
    };
} ] );
