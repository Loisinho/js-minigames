const board_size = 3;
var pieces = ['O', 'X'];
var t = board_size * board_size;
    
function winner(box) {
    var wclass = box.className.split(/\s+/);
    var regexp = RegExp(pieces[t % 2]);
    for (var i = 0; i < wclass.length; ++i) {
        var line = [];
        var boxes = document.querySelectorAll('#board .' + wclass[i]);
        for (box of boxes) {
            if ((box.innerHTML).match(regexp))
                line.push(box);
        }
        if (line.length == board_size) {
            for (box of line) {
                box.style.color = 'rgba(255, 215, 0, 0.8)';
            }
            return true;
        }
    }
    return false;
}
    
    
function move() {
    if (this.innerHTML == '') {
        this.innerHTML = pieces[t % 2];
        if (winner(this)) {
            document.getElementById('turn').style.display = 'none';
            document.getElementById('reload_btn').style.display = 'inline-block';
            var boxes = document.getElementById('board').children;
            for (box of boxes)
                box.removeEventListener('click', move);
        } else if (t == 1) {
            document.getElementById('turn').style.display = 'none';
            document.getElementById('reload_btn').style.display = 'inline-block';
        } else {
            t--;
            document.getElementById('turn').innerHTML = pieces[t % 2] + ' plays';
        }
    } else
    return;
}
    
    
function tictactoe() {
    document.getElementById('subtitle').innerHTML = 'Tic Tac Toe';
    var board = document.createElement('DIV');
    board.id = 'board';
    for (var r = 0; r < board_size; ++r) {
        for (var c = 0; c < board_size; ++c) {
            var box = document.createElement('DIV');
            box.id = 'b' + ((r * 3) + c);
            box.classList.add('r' + r, 'c' + c);
            if (r == c)
                box.classList.add('d' + 0);
            if (c == board_size-1 - r)
                box.classList.add('d' + 1);
            box.addEventListener('click', move);
            board.appendChild(box);
        }
    }
    var turn = document.createElement('H2');
    turn.id = 'turn';
    turn.innerHTML = pieces[t % 2] + ' plays';
    var reload = document.createElement("INPUT");
    reload.type = 'button';
    reload.id = 'reload_btn';
    reload.value = 'Reload';
    reload.addEventListener('click', function(){location.reload()});
    
    var tictactoe = document.getElementById('tictactoe');
    tictactoe.appendChild(board);
    tictactoe.appendChild(turn);
    tictactoe.appendChild(reload);
}
    
    
tictactoe();
