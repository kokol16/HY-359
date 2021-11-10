let row = 6;
let col = 7;
//player 1 and player 2
let game_info =
{
    winner: false,
    plays: 1,
    moves_count: 0,
    moves: [row],

}
function play(i, j) {
    if (!has_player_won()) {
        if (is_valid_move(i, j)) {
            apply_move(i, j)

            if (!vertical_win(j) && !horizontal_win(i) && !diagonial_win(i, j)) {

                update_page(startTime)
            }
            else {
                game_info.winner = true
                console.log("gg ez")
            }
        }
    }

}

function get_player_turn() {
    return game_info.plays
}
var startTime

function update_page() {
    text = ""
    if (startTime) {
        endTime = new Date();
        var timeDiff = endTime - startTime; //in ms
        // strip the ms
        timeDiff /= 1000;
        // get seconds 
        var seconds = Math.round(timeDiff);
        text = "time passed: " + seconds + " seconds\n"
    }

    text += change_turn()
    $("#game-text").text(text)
    startTime = new Date();


}
function change_turn() {
    var text;
    if (game_info.plays == 1) {
        game_info.plays = 2
        text = "previous turn: player 1 \n now turn player 2"
    }
    else {
        text = "previous turn: player 2 \n now turn player 1"


        game_info.plays = 1

    }
    return text;


}
function is_valid_move(i, j) {
    if (i == row - 1) return true
    if (game_info.moves[i + 1][j] == 1 || game_info.moves[i + 1][j] == 2) {
        return true
    }
    return false
}
function vertical_win(j) {
    count_continous = 0;
    for (i = 0; i < row; i++) {
        if (game_info.moves[i][j] == get_player_turn()) {
            count_continous++
            if (count_continous == 4) {
                for (k = i; k >= i-3; k--) {

                    id = "but_" + k + "_" + j;
                    console.log(id)
                    document.getElementById(id).className="blinking"
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
function horizontal_win(i) {

    count_continous = 0;
    for (j = 0; j < col; ++j) {
        if (game_info.moves[i][j] == get_player_turn()) {
            count_continous++
            if (count_continous == 4) {
                for (k = j; k >= j - 3; k--) {

                    id = "but_" + i + "_" + k;
                    console.log(id)
                    document.getElementById(id).className="blinking"
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
function diagonial_win(i, j) {
    count_continous = 0
    tmp_i = i
    tmp_j = j
    //left
    while (i < row - 1 && j < col - 1) {
        i++;
        j++;
    }

    while (1) {
        if (i == -1 || j == -1) break;
        if (game_info.moves[i][j] == get_player_turn()) {
            count_continous++
            if (count_continous == 4) return true
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
        if (game_info.moves[i][j] == get_player_turn()) {
            count_continous++
            if (count_continous == 4) return true
        }
        else {
            count_continous = 0
        }
        i--;
        j++;
    }


}
function apply_move(i, j) {
    game_info.moves[i][j] = get_player_turn()
    id = "but_" + i + "_" + j;

    if (get_player_turn() == 1) {
        $("#" + id).css({ "background-color": "blue" });

    }
    else {
        $("#" + id).css({ "background-color": "green" });
    }
    $("#" + id).prop('disabled', true);

}
function is_draw() {
    for (i = 0; i < row; i++) {
        for (j = 0; j < col; j++) {
            if (game_info.moves[i][j] == 0) return false
        }
    }
    return true
}

function new_game() {
    game_info.plays = 1
    game_info.moves_count = 0
    game_info.winner = false;
    for (i = 0; i < row; ++i) {
        game_info.moves[i] = [0, 0, 0, 0, 0, 0, 0]
    }

}
$(document).ready(new_game);