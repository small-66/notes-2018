##**Vue 中使用socket.io**
###客户端 web

	npm install vue-socket.io --save 
	
* main.js添加下列代码
 
		import VueSocketIO from 'vue-socket.io';
		Vue.use(new VueSocketIO({
		    debug: true,
		    connection: 'http://localhost:3000',// 服务器端地址
		    vuex: {
		    }
		}))	

* 发送消息和监听消息

		//发送信息给服务端
		this.$socket.emit('login',{
		  username: 'username',
		  password: 'password'
		});
		
		//接收服务端的信息
		this.sockets.subscribe('relogin', (data) => {
		  console.log(data)
		})



###服务端 node

**服务端，我们基于express搭建node服务器。**

	npm install --save express
	npm install --save socket.io	
	
**1.  index.js文件**

		var app = require('express')();
		var http = require('http').Server(app);
		var io = require('socket.io')(http);
		
		app.get('/', function(req, res){
		  res.send('<h1>你好web秀</h1>');
		});
		 
		io.on('connection',function(socket) {
		  //接收数据
		  socket.on('login', function (obj) {                
		      console.log(obj.username);
		      // 发送数据
		      socket.emit('relogin', {
		        msg: `你好${obj.username}`,
		        code: 200
		      });  
		  });
		});
		 
		http.listen(3000, function(){
		  console.log('listening on *:3000');
		});
	
**2.  然后启动服务端服务**```node index.js```


### Socket.IO有哪些事件


	io.on('connect', onConnect);

	function onConnect(socket){
	
	  // 发送给当前客户端
	  socket.emit(
	    'hello', 
	    'can you hear me?', 
	    1, 
	    2, 
	    'abc'
	  );
	
	  // 发送给所有客户端，除了发送者
	  socket.broadcast.emit(
	    'broadcast', 
	    'hello friends!'
	  );
	
	  // 发送给同在 'game' 房间的所有客户端，除了发送者
	  socket.to('game').emit(
	    'nice game', 
	    "let's play a game"
	  );
	
	  // 发送给同在 'game1' 或 'game2' 房间的所有客户端，除了发送者
	  socket.to('game1').to('game2').emit(
	    'nice game', 
	    "let's play a game (too)"
	  );
	
	  // 发送给同在 'game' 房间的所有客户端，包括发送者
	  io.in('game').emit(
	    'big-announcement', 
	    'the game will start soon'
	  );
	
	  // 发送给同在 'myNamespace' 命名空间下的所有客户端，包括发送者
	  io.of('myNamespace').emit(
	    'bigger-announcement', 
	    'the tournament will start soon'
	  );
	
	  // 发送给指定 socketid 的客户端（私密消息）
	  socket.to(<socketid>).emit(
	    'hey', 
	    'I just met you'
	  );
	
	  // 包含回执的消息
	  socket.emit(
	    'question', 
	    'do you think so?', 
	    function (answer) {}
	  );
	
	  // 不压缩，直接发送
	  socket.compress(false).emit(
	    'uncompressed', 
	    "that's rough"
	  );
	
	  // 如果客户端还不能接收消息，那么消息可能丢失
	  socket.volatile.emit(
	    'maybe', 
	    'do you really need it?'
	  );
	
	  // 发送给当前 node 实例下的所有客户端（在使用多个 node 实例的情况下）
	  io.local.emit(
	    'hi', 
	    'my lovely babies'
	  );
	};