$(document).ready(function(){
	$('#delAll, #delItem').on('click', function(){
		var obj = $(this);
		var url = obj.attr('value');
		var name = obj.next().html();
		
		if(obj.attr('id')==='delAll'){
			if(!confirm('Delete all users?'))
				return false;
		}
		else{
			if(!confirm('Delete '+name+'?'))
				return false;	
		}
		
		$.get(url, function(d){
			if(obj.attr('id')==='delItem')
				obj.parent().remove();
			else
				$('#userList').empty();
		}, 'json');
		return false;
	});
	
	$('.edtbtn').on('click', function(){
		var text = $(this).next().html();
		$(this).next().css({'display':'none'});
		$(this).next().next().css({'display':'block'});
		$(this).next().next().val(text);
	});
	
	$('.edText').keypress(function(event){
		// Submit for when user presses "Enter"
		if(event.which == 13){
			var _this		= $(this);
			var id			= _this.prev().attr('alt');
			var updateText	= _this.val();
			$.post('/update/'+id, {data:updateText}, function(){
				_this.css({'display':'none'});
				_this.prev().css({'display':'block'});
				_this.prev().html(updateText);
			});
		}
	});
});