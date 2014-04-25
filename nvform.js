//non volatile form
$(function() {

	//初期変数
	class_array=[];
	var path_name = window.location.pathname;
	var search_name = location.search;
	root_path = path_name + search_name;
	get_storage = JSON.parse(localStorage.getItem(root_path));
	Obj = new Object();

	//localstorageデータが取得できた場合、入力する。
	if(get_storage){
		$("form").each(function(i){
			var form_name = $(this).attr("name");
			var count = $(this)[0].length
			var form_data = $(this)[0];//form内の
			//キーの有無
			if(form_name in get_storage){
				for(var j =0; j<count;j++){
					var type = form_data[j].type;
					var get_key = form_data[j].name;
					if(!Obj[form_name])  Obj[form_name]={};
					//キーの有無
					if(get_key in get_storage[form_name]) var val_data = get_storage[form_name][get_key];
					else var val_data ="";

					if(type == 'text' || type == 'select-one' || type=='textarea') form_data[j].value= val_data;
					else if(type == 'checkbox'){
						get_key = get_key+"_"+form_data[j].value;
						val_data = get_storage[form_name][get_key];
						form_data[j]['checked'] = val_data;
					}
					else if(type == 'radio'){
						var check = form_data[j].value;
						if(val_data == check) form_data[j]['checked'] = true;
						else form_data[j]['checked'] = false;
					}
					//キーの有無
					if(get_key in get_storage[form_name]) Obj[form_name][get_key] = get_storage[form_name][get_key];
				}
			}
		});
	}

	//送信ボタンクリック時、storageデータを削除、送信
       	$("[type='submit']").click(function(e){
		post_data($(this));
       	});

	//入力されるたびに呼び出し、storageに保存
	$("[type='text']").keyup(function(e){
		storage_save($(this));
	});

	$("textarea").keyup(function(e){
		storage_save($(this));
	});

	$("[type='checkbox']").click(function(e){
		storage_save($(this));
	});
	$("[type='radio']").click(function(e){
		storage_save($(this));
	});
	$("select").change(function(e){
		storage_save($(this));
	});

	function post_data(data){
		if(1<$("form").length){
			var form_check = data.parents("form");
			var form_name = form_check.attr("name");
			var form_data = form_check[0];
			var count =form_check[0].length;
			for(var j =0; j<count;j++){
				var type = form_data[j].type;
				var get_key = form_data[j].name;
				var val_data = get_storage[form_name][get_key];
				Obj[form_name]={};
				Obj[form_name][get_key] ="";
				if(type == 'text' || type == 'select-one' || type=='textarea') form_data[j].value= "";
				else if(type == 'checkbox' || type == 'radio') form_data[j]['checked'] = false;
			}
			localStorage.setItem(root_path,JSON.stringify(Obj));
		}
		else localStorage.removeItem(root_path);
	}

	function storage_save(data){
		var count = data[0].length;
		var form_name = data.parents("form").attr("name");
		var form_data = data[0];
		var type = form_data.type;
		var key_name = form_data.name;
		var get_key = form_data.name;
		var val_data = form_data.value;
		if(!Obj[form_name])  Obj[form_name]={};
		if(type =='checkbox'){
			var check_name = key_name +"_"+val_data;
			Obj[form_name][check_name] = form_data['checked'];
		}
		else Obj[form_name][key_name] = val_data;
		localStorage.setItem(root_path,JSON.stringify(Obj));
	}
});
