const board_size = 5;
var segunder;
var t_sec = 60;
var t_cen = 0;
var active_box = '';


function activate_boxes() {
    var rows = document.getElementById('board').childNodes;
    for (let i = 0; i < rows.length; i++) {
        let boxes = rows[i].childNodes;
        for (let j = 0; j < boxes.length; j++)
            if (boxes[j].style.background != '#02df93')
                boxes[j].addEventListener('click', move);
    }
}


function deactivate_boxes() {
    var rows = document.getElementById('board').childNodes;
    for (let i = 0; i < rows.length; i++) {
        let boxes = rows[i].childNodes;
        for (let j = 0; j < boxes.length; j++)
            boxes[j].removeEventListener('click', move);
    }
}


function timekeeper() {
    if (t_sec > 0 || t_cen > 0) {
        if (t_cen == 0) {
            --t_sec;
            t_cen = 99;
        } else {
            --t_cen;
        }
        document.getElementById('seconds').innerHTML = String(t_sec).padStart(2, '0');
        document.getElementById('centiseconds').innerHTML = String(t_cen).padStart(2, '0');
    } else {
        clearInterval(segunder);
        deactivate_boxes();
        var rows = document.getElementById('board').childNodes;
        for (let i = 0; i < rows.length; i++) {
            let boxes = rows[i].childNodes;
            for (let j = 0; j < boxes.length; j++)
                    boxes[j].innerHTML = boxes[j].className.split(' ')[0];
        }
    }
}


function winner() {
    var rows = document.getElementById('board').childNodes;
    for (let i = 0; i < rows.length; i++) {
        let boxes = rows[i].childNodes;
        if (document.getElementsByClassName('hidden').length != 0)
            return false;
    }
    return true;
}


function move() {
    if (active_box == '') {
        this.removeEventListener('click', move);
        this.innerHTML = this.className.split(' ')[0];
        active_box = this;
    } else {
        deactivate_boxes();
        this.innerHTML = this.className.split(' ')[0];
        if (this.innerHTML == active_box.innerHTML) {
            var par = document.getElementsByClassName(this.className.split(' ')[0]);
            for (let i = 0; i < par.length; i++) {
                par[i].classList.remove('hidden');
                par[i].style.background = '#02df93';
            }
            if (winner())
                clearInterval(segunder);
            else
                if (t_sec > 0) 
                    activate_boxes();
            active_box = '';
        } else {
            setTimeout(function(that) {
                if (t_sec > 0) {
                    active_box.innerHTML = '?';
                    that.innerHTML = '?';
                    activate_boxes();
                }
                active_box = '';
            }, 1000, this);
        }
    }
}


function start_game() {
    var rows = document.getElementById('board').childNodes;
    for (let i = 0; i < rows.length; i++) {
        let boxes = rows[i].childNodes;
        for (let j = 0; j < boxes.length; j++) {
            while (true) {
                let n = parseInt((Math.random() * (board_size * (board_size + 1) / 2)) + 1);
                let par = document.getElementsByClassName(n);
                if (par.length < 2) {
                    boxes[j].classList.add(n, 'hidden');
                    boxes[j].addEventListener('click', move);
                    break;
                }
            }
        }
    }
    var btn = document.getElementById('action_btn');
    btn.removeEventListener('click', start_game);
    btn.addEventListener('click', function(){location.reload()});
    btn.value = 'Reload';
    segunder = setInterval(timekeeper, 10);
}


function coincidences() {
    document.getElementById('subtitle').innerHTML = 'Coincidences';
    var coincidences = document.getElementById('coincidences');
    var board = document.createElement('DIV');
    board.id = 'board';
    for (let r = 0; r < board_size + 1; ++r) {
        let row = document.createElement('DIV');
        row.id = 'r' + r;
        for (let c = 0; c < board_size; ++c) {
            let box = document.createElement('DIV');
            box.id = 'b' + ((board_size * r) + c);
            box.innerHTML = '?';
            row.appendChild(box);
        }
        board.appendChild(row);
    }
    var segunder_box = document.createElement('DIV');
    var seconds = segunder_box.cloneNode();
    var centiseconds = segunder_box.cloneNode();
    segunder_box.id = 'segunder_box';
    seconds.id = 'seconds';
    centiseconds.id = 'centiseconds';
    seconds.innerHTML = t_sec;
    centiseconds.innerHTML = String(t_cen).padStart(2, '0');        
    segunder_box.appendChild(seconds);
    segunder_box.appendChild(centiseconds);
    coincidences.appendChild(segunder_box);
    coincidences.appendChild(board);
    
    var action_btn = document.createElement("INPUT");
    action_btn.type = 'button';
    action_btn.id = 'action_btn';
    action_btn.value = 'Start';
    action_btn.addEventListener('click', start_game);
    coincidences.appendChild(action_btn);
}


coincidences();
