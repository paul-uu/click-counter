
var click_num = 0, seconds = 30, x, high_score_array = [];

$(function() {
	$('#count_text').html(click_num);
	$('#timer_text').html(seconds + ' secs');
	$('#button').on('click', count );
	$('#reset_button').on('click', reset );
});

// functions
function count() {
	if (seconds > 0) {
		click_num++;
		$('#count_text').html(click_num);
	}
	if (click_num == 1) {
		timer();
	}
}
function timer() {
	x = setTimeout("timer()", 1000);
	seconds -= 1;
	if (seconds === 0) {

		check_score(click_num);
		clearTimeout(x);
	}
	$("#timer_text").html(seconds + " secs");
}
function reset() {
	click_num = 0;
	seconds = 30;
	$("#count_text").html(click_num);
	$("#timer_text").html(seconds + " secs");
	clearTimeout(x);
}

function check_score(clicks) {
	for (var i = 0; i < high_score_array.length; i++) {
		if (clicks > high_score_array[i]) {
			console.log(high_score_array + ', user clicks: ' + clicks);
			var name = prompt(i + ', New high score. Please enter your name:');
			var info = "name=" + name + "&score=" + clicks + "&position=" + i;
			$.ajax({
				url: 'high_score.php',
				dataType: 'json',
				type: 'post',
				data: info,
				success: function() {
					console.log('High scores updated');
				}
			});
			render_data();
			return;
		}
	}
}


/* --- Leaderboard --- */

// retreive json data
render_data();
function render_data() {
	$('#leaderboard_data').html('');
	$.ajax({
		url: 'high_scores.js',
		dataType: 'json',
		type: 'GET',
		cache: 'false',
		success: function(json) {
			console.log('retreived json');
			var data, dom_string = "", i = 0;
			data = json.high_scores;
			for (; i < data.length; i++) {
				high_score_array[i] = data[i].score;
				dom_string += '<div class="high_score_name">' + data[i].name + '</div>' + '<div class="high_score_score">' + data[i].score + '</div><br>';
			}
			$('#leaderboard_data').append(dom_string);
		}
	});
}
