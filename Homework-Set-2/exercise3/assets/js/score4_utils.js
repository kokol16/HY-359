/* @Authors George Kokolakis (gkokol@ics.forth.gr) */
"use strict";

let row = 6;
let col = 7;
//player 1 and player 2
let game_info =
{
    stored_score: [0, 0, 0], //index 0 is draw score, index 1 is player wins, index 2 is player2 wins
    winner: false,
    plays: 1,
    moves_count: 0,
    moves: [row],
    bot: false

}
function play(i, j) {
    if (!has_player_won()) {
        if (is_valid_move(i, j)) {
            apply_move(i, j)

            if (!vertical_win(j, true, get_player_turn()) && !horizontal_win(i, true, get_player_turn()) && !diagonial_win(i, j, true, get_player_turn())) {

                update_page(startTime)
                check_if_bot_turn();
                if (is_draw()) {
                    var text = $("#game-text").html();
                    $("#game-text").html("It's a draw!!<br>" + text)
                    game_info.stored_score[0]++;
                    update_score("#game-score")

                    google.charts.load('current', { 'packages': ['corechart'] });
                    google.charts.setOnLoadCallback(drawChart);
                }
                return true

            }
            else {
                game_info.winner = true
                $("#game-text").html("player " + game_info.plays + " won the game!!")
                game_info.stored_score[game_info.plays]++;
                google.charts.load('current', { 'packages': ['corechart'] });
                google.charts.setOnLoadCallback(drawChart);
                update_score("#game-score")



            }
        }
    }
    return false


}

function get_player_turn() {
    return game_info.plays
}
var startTime

function update_page() {
    var text = ""
    if (startTime) {
        var endTime = new Date();
        var timeDiff = endTime - startTime; //in ms
        // strip the ms
        timeDiff /= 1000;
        // get seconds 
        var seconds = Math.round(timeDiff);
        text = "time passed: " + seconds + " seconds  <br>"
    }

    text += change_turn()
    $("#game-text").html(text)
    startTime = new Date();


}
function change_turn() {
    var text;
    if (game_info.plays == 1) {
        game_info.plays = 2
        text = "previous turn: player 1 <br> now turn player 2"
    }
    else {
        text = "previous turn: player 2 <br> now turn player 1"


        game_info.plays = 1

    }
    text += "<br> moves count: " + game_info.moves_count
    return text;


}
function is_valid_move(i, j) {
    if (i == row - 1) return true
    if (game_info.moves[i + 1][j] == 1 || game_info.moves[i + 1][j] == 2) {
        return true
    }
    return false
}
function add_blinking(id) {
    $("#" + id).addClass("blinking")
}
function vertical_win(j, bliking_enabled, player) {
    var count_continous = 0;
    for (var i = 0; i < row; i++) {
        if (game_info.moves[i][j] === player) {
            count_continous++
            if (count_continous == 4) {
                if (bliking_enabled) {
                    for (var k = i; k >= i - 3; k--) {

                        var id = "but_" + k + "_" + j;
                        add_blinking(id)
                    }
                }


                return true
            }

        }
        else {
            count_continous = 0
        }
    }
    return false;

}
function horizontal_win(i, bliking_enabled, player) {

    var count_continous = 0;
    for (var j = 0; j < col; ++j) {
        if (game_info.moves[i][j] === player) {
            count_continous++
            if (count_continous == 4) {
                if (bliking_enabled) {

                    for (var k = j; k >= j - 3; k--) {

                        var id = "but_" + i + "_" + k;
                        add_blinking(id)

                    }
                }


                return true
            }

        }
        else {
            count_continous = 0
        }
    }
    return false;
}

function has_player_won() {
    return game_info.winner;
}
function diagonial_win(i, j, bliking_enabled, player) {
    var count_continous = 0
    var tmp_i = i
    var tmp_j = j
    //left
    while (i < row - 1 && j < col - 1) {
        i++;
        j++;
    }

    while (1) {
        if (i == -1 || j == -1) break;
        if (game_info.moves[i][j] === player) {
            count_continous++
            if (count_continous == 4) {
                if (bliking_enabled) {

                    for (var k = 0; k < 4; k++, i++, j++) {

                        var id = "but_" + i + "_" + j;
                        add_blinking(id)

                    }
                }
                return true
            }
        }
        else {
            count_continous = 0
        }
        i--;
        j--;
    }
    //right
    i = tmp_i
    j = tmp_j
    count_continous = 0
    while (i < row - 1 && j > 0) {
        i++;
        j--;
    }
    while (1) {
        if (i <= -1 || j >= col) break;
        if (game_info.moves[i][j] === player) {
            count_continous++
            if (count_continous == 4) {
                if (bliking_enabled) {

                    for (var k = 0; k < 4; k++, i++, j--) {

                        var id = "but_" + i + "_" + j;
                        add_blinking(id)

                    }
                }
                return true
            }
        }
        else {
            count_continous = 0
        }
        i--;
        j++;
    }


}
function undo_move(i, j) {
    game_info.moves[i][j] = 0
    game_info.moves_count--;
}
function temporary_move(i, j, player) {
    game_info.moves[i][j] = player
    game_info.moves_count++;

}
function apply_move(i, j) {
    game_info.moves[i][j] = get_player_turn()
    var id = "but_" + i + "_" + j;

    if (get_player_turn() == 1) {
        $("#" + id).css({ "background-color": "blue" });

    }
    else {
        $("#" + id).css({ "background-color": "green" });
    }
    $("#" + id).prop('disabled', true);
    game_info.moves_count++;

}
function is_draw() {
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            if (game_info.moves[i][j] == 0) return false
        }
    }
    return true
}
function update_score(id) {
    var text = "player 1 (blue) wins: " + game_info.stored_score[1] + "<br>"
    text += "player 2 (green) wins: " + game_info.stored_score[2] + "<br>"
    text += "Draws: " + game_info.stored_score[0] + "<br>"
    $(id).html(text)

}
function new_game() {

    game_info.plays = 1
    game_info.moves_count = 0
    game_info.winner = false;
    for (var i = 0; i < row; ++i) {
        game_info.moves[i] = [0, 0, 0, 0, 0, 0, 0]
    }

    update_score("#game-score")

    for (var i = 0; i < row; i++) {

        for (var j = 0; j < col; ++j) {
            var id = "but_" + i + "_" + j;
            $("#" + id).css({ "background-color": "grey" });
            $("#" + id).prop('disabled', false);
            $("#" + id).removeClass("blinking")
        }
    }
    startTime = new Date();
    game_info.bot = false
    $("#game-text").html("")


}


$(document).ready(function () {
    $("#new-game").click(new_game)
    $("#bot-game").click(play_with_bot)


    new_game();

});


// Load the Visualization API and the corechart package.

// Set a callback to run when the Google Visualization API is loaded.

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Player');
    data.addColumn('number', 'score');
    data.addRows([
        ['draw', game_info.stored_score[0]],
        ['Player1 (blue) ', game_info.stored_score[1]],
        ['Player2 (green)', game_info.stored_score[2]]
    ]
    );

    // Set chart options
    var options = {
        'title': 'Score',
        'width': 400,
        'height': 300,
        colors: ['#e0440e', 'blue', 'green']
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
function traverse_board_and_apply_function(func_applied) {
    for (var j = 0; j < col; ++j) {
        for (var i = 0; i < row; ++i) {
            if (game_info.moves[i][j] === 0) {

                if (func_applied(i, j))
                    return true

            }
        }
    }
    return false
}

function check_if_bot_turn() {
    if (game_info.plays == 2 && game_info.bot) { //check if it's bot turns
        if (traverse_board_and_apply_function(bot_can_win)) return
        if (traverse_board_and_apply_function(bot_can_block_enemy_win)) return
        if (traverse_board_and_apply_function(next_move_doesnt_give_win_to_enemy)) return
        if (traverse_board_and_apply_function(play)) return

    }
}
// min kaneis kinisi an dinei win i epomeni ston antipalo
function next_move_doesnt_give_win_to_enemy(i, j) {
    var tmp_i = i, tmp_j = j
    if (is_valid_move(i, j)) {

        temporary_move(i, j, get_player_turn())
        for (var i = 0; i < row; ++i) {
            for (var j = 0; j < col; ++j) {
                if (game_info.moves[i][j] === 0) {
                    temporary_move(i, j, 1)
                    if (horizontal_win(i, false, 1) || vertical_win(j, false, 1) || diagonial_win(i, j, false, 1)) {
                        undo_move(i, j)
                        undo_move(tmp_i, tmp_j)
                        return false

                    }
                    undo_move(i, j)


                }
            }
        }


        undo_move(tmp_i, tmp_j)
        play(tmp_i, tmp_j)
        return true

    }
    return false
}
function bot_can_block_enemy_win(i, j) {
    if (is_valid_move(i, j)) {
        temporary_move(i, j, 1)

        if (horizontal_win(i, false, 1) || vertical_win(j, false, 1) || diagonial_win(i, j, false, 1)) {
            undo_move(i, j)
            play(i, j)
            return true
        }
        undo_move(i, j)

    }
    return false
}
function bot_can_win(i, j) {
    if (is_valid_move(i, j)) {
        temporary_move(i, j, get_player_turn())

        if (horizontal_win(i, false, get_player_turn()) || vertical_win(j, false, get_player_turn()) || diagonial_win(i, j, false, get_player_turn())) {
            undo_move(i, j)
            play(i, j)
            return true
        }
        undo_move(i, j)

    }
    return false
}

function play_with_bot() {
    new_game();
    game_info.bot = true

}