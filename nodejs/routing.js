/**
 * 页面路由。
 * @param
 *      req: { Object }     http请求后返回require信息
 *      res: { Object }     http请求后返回response信息
 * @description
 *      此功能会在service.js中执行
 * @author
 *     liuwei@csdn.net(瓜籽：只要再好那么一点点！)
 */
var path = require( 'path' );
var url = require( 'url' );
var fs = require( 'fs' );
var header = require( './header' );
var fileDir = path.resolve( __dirname, '../' );

function rout ( req, res ) {
    var reqUrl = req.url;
    var pathName = url.parse( reqUrl ).pathname;

    //  TODO    页面打开时加载index.html页面
    if ( pathName.charAt( pathName.length - 1 ) == '/' )
    {
        pathName += 'css_sprites.html';
    }

    var filePath = path.join( fileDir, pathName );
    path.exists( filePath, function ( exists ) {
        if ( exists )
        {
            res.writeHead( 200, {
                'Content-Type': header.run( filePath )
            } );

            var stream = fs.createReadStream( filePath, {
                flags: 'r',
                encoding: null
            } );

            stream.on( 'error', function () {
                res.writeHead( 404 );
                res.end( '<h1>404 Read Error!</h1>');
            } );

            stream.pipe( res );
        }
        else
        {
            res.writeHead( 404, {
                'Content-Type': 'text/html'
            } );
            res.end( '<h1>404 Not Found!!!!</h1>' );
        }
    } );
}

exports.run = rout;
