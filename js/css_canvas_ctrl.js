Sprites.app.controller( 'canvasCtrl', [ '$scope', function ( $scope ) {
    $scope.canvasCtrlUrl = '../templates/css_canvas.html';
    $scope.$on( '$includeContentLoaded', function () {
        var canvas = $( '#preview' ).get( 0 ).getContext( '2d' );

        canvas.fillStyle = 'transparent';
    } );
} ] );
