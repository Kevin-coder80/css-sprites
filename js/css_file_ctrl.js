Sprites.app.controller( 'fileCtrl', [ '$scope', function ( $scope ) {
    $scope.fileCtrlUrl = '../templates/drag_file.html';
    $scope.items = {};
    $scope.liArray = [];

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

            filesList = $( dataTransfer.files );
            $scope.canvas = $( '#preview').get( 0 );
            $scope.context = $scope.canvas.getContext( '2d' );

            if ( filesList.length > 0 )
            {
                var createObjectURL = window.URL.createObjectURL || window.webkitURL.createObjectURL;

                filesList.each( function ( i, item ) {
                    if ( /image/g.test( item.type ) )
                    {
                        $scope.img = new Image();
                        $scope.img.src = createObjectURL( item );
                        $scope.img.onload = function () {
                            this.style.visibility = 'hidden';
                            $( document.body ).append( this );

                            $scope.img.imgW = this.offsetWidth;
                            $scope.img.imgH = this.offsetHeight;
                            $scope.img.clearX = $scope.canvas.width/2-$scope.img.imgW/2;
                            $scope.img.clearY = $scope.canvas.height/2-$scope.img.imgH/2;
                            $scope.context.drawImage( this, $scope.canvas.width/2-$scope.img.imgW/2, $scope.canvas.height/2-$scope.img.imgH/2 );

                            $scope.items[ this.src ] = {};
                            $scope.items[ this.src ].img = this;

                            $scope.liArray.push( this.src );
                            $scope.$apply();
                            $( this ).remove();
                        } ;
                    }
                } );
                // window.location = canvas.toDataURL( 'image/png' );
            }
        }, false );
    } );
} ] );
