var path = require( 'path' );

function header ( filePath ) {
    var contentType = '';
    var ext = path.extname( filePath );

    switch( ext )
    {
        case '.html':
            contentType = 'text/html';
            break;

        case '.js':
            contentType = 'text/javascript';
            break;

        case '.css':
            contentType = 'text/css';
            break;

        case '.png':
            contentType = 'image/png';
            break;

        case '.gif':
            contentType = 'image/gif';
            break;

        case '.jpeg':
            contentType = 'image/pjpeg';
            break;

        case '.jpg':
            contentType = 'image/pjpeg';
            break;

        case '.jpe':
            contentType = 'image/pjpeg';
            break;

        case '.json':
            contentType = 'application/json';
            break;

        default:
            contentType = 'text/plain';
    }

    return contentType;
};

exports.run = header;
