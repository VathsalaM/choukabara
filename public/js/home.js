var turn = ['Red','Green'];
var kill = 0;
var validRoll = 0;
var greenHome = []
var routes = {
	'Green':[53,54,55,45,35,25,15,14,13,12,11,21,31,41,51,52,42,32,22,23,24,34,44,43,33],
	'Red':[13,12,11,21,31,41,51,52,53,54,55,45,35,25,15,14,24,34,44,43,42,32,22,23,33]
}

var board = function(){
	var result = '<table>';
	for(var i=1;i<6;i++){
		var text = '<tr>';
		for(var j=1;j<6;j++){
			var safe = ((i==1 && j==3)||(i==3 && j==1) || (i==3 && j==3) || (i==3 && j==5) || (i==5 && j==3))?'class="safe"':'';
			text += '<td id="'+i+j+'"'+safe+'></td>';
		}
		text += '</tr>';
		result += text;
	}
	return result;
}

var diceRoll = function(){
	return Math.floor(Math.random()*6+1-1)+1;
}

var coinMove = function(value,coin,Turn){
	var x = $('#'+coin);
	if(value==6){
		var a = $('#'+routes[Turn][0]);
		a.append(x);
	}
}

var coinSelected = function(coin,turn,value){
	validRoll = 0;
	$('.'+turn).removeClass('highlight'+turn);
	coinMove(value,coin,turn);
	$('#'+turn+1).off('click');
	$('#'+turn+2).off('click');
	$('#'+turn+3).off('click');
	$('#'+turn+4).off('click');	
}

var coinHeighlight = function(value,Turn){
	validRoll = 1;
	if(value==6){
		$('.'+Turn).addClass('highlight'+Turn);
		$('#'+Turn+1).click(function(){coinSelected(Turn+1,Turn,value);});
		$('#'+Turn+2).click(function(){coinSelected(Turn+2,Turn,value);});
		$('#'+Turn+3).click(function(){coinSelected(Turn+3,Turn,value);});
		$('#'+Turn+4).click(function(){coinSelected(Turn+4,Turn,value);});
	}

	validRoll = 0;
}

var submittingFunc = function(){
	$('.board').html(board());
	var previousvalue;
	$('.dice').click(function(){
		if(validRoll==1)
			return;
		var value = diceRoll();
		var currentTurn = (previousvalue==6 || kill==1)?turn[0]:turn.reverse()[0];
		previousvalue = value; 
		console.log(value,currentTurn)
		$('#diceRoll').html('<img src="images/d'+value+'.gif" id="dice">');
		coinHeighlight(value,currentTurn);
	})
}


$(document).ready(submittingFunc)