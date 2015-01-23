<?php
	if (isset($_POST['name'], $_POST['score'], $_POST['position'])) {
		$name = $_POST['name'];
		$score = $_POST['score'];
		$position = $_POST['position'];
		$file = "high_scores.js";
		$high_scores = json_decode(file_get_contents($file), true);

		$high_scores["high_scores"][9]["name"] = "";
		$high_scores["high_scores"][9]["score"] = "";		
		
		for ($i = 9; $i > $position; $i--) {
			$high_scores["high_scores"][$i]["name"] = $high_scores["high_scores"][$i - 1]["name"];
			$high_scores["high_scores"][$i]["score"] = $high_scores["high_scores"][$i - 1]["score"];
		}

		// save new high score
		$high_scores["high_scores"][$position]["name"] = $name;
		$high_scores["high_scores"][$position]["score"] = $score;

		// encode and save json updates
		$updated = json_encode($high_scores);
		file_put_contents("high_scores.js", $updated);
	}
?>
