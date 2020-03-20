const qwerty = ['QWERTYUIOP', 'ASDFGHJKLÑ', 'ZXCVBNM'];
var word;
var turn = 6;


function fill_barrel() {
    var water = document.getElementById('water');
    switch(turn) {
        case 5:
            water.style.bottom = 0;
            break;
        case 4:
            water.style.height = '20%';
            break;
        case 3:
            water.style.height = '40%';
            break;
        case 2:
            water.style.height = '60%';
            break;
        case 1:
            water.style.height = '70%';
            break;
        case 0:
            water.style.background = 'rgba(255, 55, 90, 0.5)';
            break;
    }
}


function winner() {
    for (let i = 0; i < word.length; i++)
        if (document.getElementById('l' + i).innerHTML == '')
            return false;
    return true;
}
        

function move() {
    var right = false;
    var values = (this.className).split(' ');
    for (let i = 0; i < word.length; i++) {
        if (values.includes(word.charAt(i))) {
            document.getElementById('l' + i).innerHTML = word.charAt(i);
            right = true;
        }
    }
    if (!right) {
        --turn;
        fill_barrel();
    }
    this.style.visibility = 'hidden';
    var win = winner();
    if(win || turn == 0) {
        for (let i = 0; i < qwerty.length; i++) {
            var keys = document.getElementById('r' + i).childNodes;
            for (let j = 0; j < qwerty[i].length; j++) {
                keys[j].removeEventListener('click', move);
            }
        }
    }
    if (win){
        document.getElementById('reload_btn').style.display = 'inline-block';
    }
    else if (turn == 0) {
        document.getElementById('reload_btn').style.display = 'inline-block';
        for (let i = 0; i < word.length; i++)
            document.getElementById('l' + i).innerHTML = word.charAt(i);
    }
}


function hangman() {
    document.getElementById('subtitle').innerHTML = 'Hangman';
    do {
        word = words[parseInt(Math.random() * words.length)].toUpperCase();
    } while (word.length < 4);
    var word_container = document.createElement('DIV');
    word_container.id = 'word-container';
    for (let i = 0; i < word.length; i++) {
        var letter = document.createElement('DIV');
        letter.id = 'l' + i;
        word_container.appendChild(letter);
    }
    var keyboard = document.createElement('DIV');
    keyboard.id = 'keyboard';
    for (let i = 0; i < qwerty.length; i++) {
        var row = document.createElement('DIV');
        row.id = 'r' + i;
        for (let j = 0; j < qwerty[i].length; j++) {
            var key = document.createElement('DIV');
            key.addEventListener('click', move);
            key.innerHTML = qwerty[i].charAt(j);
            switch (qwerty[i].charAt(j)) {
                case 'A':
                    key.classList.add(qwerty[i].charAt(j), 'Á');
                    break;
                case 'E':
                    key.classList.add(qwerty[i].charAt(j), 'É');
                    break;
                case 'I':
                    key.classList.add(qwerty[i].charAt(j), 'Í');
                    break;
                case 'O':
                    key.classList.add(qwerty[i].charAt(j), 'Ó');
                    break;
                case 'U':
                    key.classList.add(qwerty[i].charAt(j), 'Ú', 'Ü');
                    break;
                default:
                    key.classList.add(qwerty[i].charAt(j));
            }
            row.appendChild(key);
        }
        keyboard.appendChild(row);
    }
    var hangman = document.getElementById('hangman');
    hangman.appendChild(word_container);
    hangman.appendChild(keyboard);
    var reload = document.createElement("INPUT");
    reload.type = 'button';
    reload.id = 'reload_btn';
    reload.value = 'Reload';
    reload.addEventListener('click', function(){location.reload()});
    hangman.appendChild(reload);
}


hangman();
