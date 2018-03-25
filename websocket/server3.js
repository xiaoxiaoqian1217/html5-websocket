var http = require('http');
var io=require('socket.io');
var fs=require('fs');
var documentRoot="D:/HTML5/websocket/";
var httpServer=http.createServer(function(req,res){

var url=req.url;
console.log(url);
var file=documentRoot+url;
console.log(file);
fs.readFile(file, function(err, data) {
		
		if (err) {
			res.writeHeader(404, {
				'content-type' : 'text/html;charset="utf-8"'
			});
			res.write('<h1>404</h1><p>你要找的页面被LEO吃了</p>');
			res.end();
		} else {
			res.writeHeader(200, {
				'content-type' : 'text/html;charset="utf-8"'
			});
			res.write(data);
			res.end();
		}
		
	});
}).listen(8888);
//浏览器的请求都是http请求，不是websocket


//客户端向服务器端发送请求，建立起来一个连接socket(socket是一个连接对象)，
var _io=io(httpServer);
_io.on('connection',function(socket){
   console.log('有人通过socket连接进来了');
	// 客户端和服务端进行通信
	socket.emit('news',{"hello":"world"});
         socket.on('hellotoo', function (data) {
          console.log(data);
          
  });
   socket.broadcast.emit('a','有新人进来了');
         socket.on('move', function(data) {
		console.log(data);
		socket.broadcast.emit('move2', data);
		
	});
	
})




