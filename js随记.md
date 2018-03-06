##本地存储保存复杂格式


		var str = JSON.stringify(data.list);   
    	localStorage.setItem("options",str); 

##读取

		
		var optionss=localStorage.getItem("options");  
		console.log(JSON.parse(optionss));


