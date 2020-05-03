import apiLibrary from '/api.js';
//apiLibrary.sayHi();
//apiLibrary.viewPokemonInfo();
//console.log(apiLibrary.getPokemonNamebyID(1));

// variables declaration
let IMAGE_SOURCE = [
    'src/img/1.png',
    'src/img/2.png',
    'src/img/3.png',
    'src/img/4.png',
    'src/img/5.png',
    'src/img/6.png',
];
let IMAGE_SOURCE_HARD = [
    'src/img/h1.png',
    'src/img/h2.png',
    'src/img/h3.png',
    'src/img/h4.png',
    'src/img/h5.png',
    'src/img/h6.png',
];
let DEFAULT_IMAGE = 'src/img/default.png';
let INITIAL_VALUE = 0;
let TYPE_OF_DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Extra-Hard'];
let TILE = [20, 24, 30, 36];
let PATTERN = [5, 6, 5, 6];
let TILE_EASY_MODE = 20;
let PATTERN_EASY = 5;
let TILE_MEDIUM_MODE = 24;
let PATTERN_MEDIUM = 6;
let TILE_HARD_MODE = 30;
let PATTERN_HARD = 5;
let TILE_EXTRA_HARD_MODE = 36;
let PATTERN_EXTRA_HARD = 6;
let openedCards = [];
let CURRENT_SCORE = 0;
let MATCH_SCORE = 20;
let MULTI0 = 1;
let MULTI1 = 1.2;
let MULTI2 = 1.5;
let MULTI3 = 2;
let getDefault;
let userInfo = { ID: ['danny', 'adam', 'bernard'], password: ['1234', '2234', '3234'], cumScore: [0, 0, 0], cumPokemonID: [{ PokeID: [1, 4, 7] }, { PokeID: [1, 4, 7] }, { PokeID: [1, 4, 7] }] };
let interval;
let getPokemon;
let matchedAudio;
    
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

function matchedSound() {
    matchedAudio = new sound('src/sound/pikachu.mp3');
    matchedAudio.play();
}

window.viewPokemonInfo = (id) => {
    $('#popup6 .popup h2').empty();
    $('#popup6 .popup h2').html(apiLibrary.getPokemonNamebyID(id));
    $('#popup6 .popup .content-1').empty();
    let $img = $('<img>');
    $img.attr('src', apiLibrary.getPokemonSpritesbyID(id)).css('width', '20%');
    $('#popup6 .popup .content-1').append($img);
    $('#popup6 .popup .content-2').empty();
    let a = apiLibrary.getPokemonTypebyID(id);
    const getType = (typeArray) => {
        return typeArray.map(item => item.type.name).join(', ');
    };
    $('#popup6 .popup .content-2').html('Type: ' + getType(a));
    $('#popup6 .popup .content-3').empty();
    let b = apiLibrary.getPokemonWeightHeightbyID(id);
    $("[id^=popup]").removeClass('popshow');
    $('#popup6').addClass('popshow');
    $('#popup6 .popup .content-3').html('weight: ' + b.weight + ', height: ' + b.height);
    closePopUp();
};

function createPokedexList() {
    $('#PokeDex').empty();
    let c = getCurrentUser();
    let d = userInfo.ID.indexOf(c);
    for (let i = INITIAL_VALUE; i < (userInfo.cumPokemonID[d].PokeID.length); i++) {
        let a = createTags('div', `content-${i + 1}`, '', $('#PokeDex'));
        a.html(apiLibrary.getPokemonNamebyID(userInfo.cumPokemonID[d].PokeID[i]));
        let b = createTags2('button', `poke${i + 1}`, `viewPokemonInfo(${userInfo.cumPokemonID[d].PokeID[i]})`, a);
        b.html('view');
    };
};

window.checkPokemonInfo = (event) => {
    event.preventDefault();
    let c = getCurrentUser();
    if (c === 'stranger' || c === '') {
        alert('You have to login to use PokeDex!');
    } else {
        createPokedexList();
        $("[id^=popup]").removeClass('popshow');
        $('#popup5').addClass('popshow');
        closePopUp();
    };
};

window.goBack = () => {
    $("[id^=popup]").removeClass('popshow');
    $('#popup2').addClass('popshow');
    closePopUp();
};

window.goBack2 = () => {
    $("[id^=popup]").removeClass('popshow');
    $('#popup5').addClass('popshow');
    closePopUp();
};


// console.log(userInfo.ID.indexOf('adam'));
// console.log(userInfo.ID.indexOf('bernard'));
// console.log(userInfo.cumScore[0]);
// console.log(userInfo.cumPokemonID[0]);
// userInfo.cumPokemonID[0].PokeID.push(10);
// console.log(userInfo.cumPokemonID[0]);

// function declaration
// create new user
const createUser = (name) => {
    userInfo.ID.push(name);
    userInfo.cumScore.push(0);
    userInfo.cumPokemonID.push({ PokeID: [] });
};

//createUser('casey');

// shuffle array function
const shuffleArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };
    return array;
};

// create a shuffled array
const createStartArray = (tile, pattern, modeImg) => {
    let patternArray = [];
    for (let i = (INITIAL_VALUE + 1); i < (tile / pattern + 1); i++) {
        for (let j = (INITIAL_VALUE + 1); j < (pattern + 1); j++) {
            let $card = 'card' + j;
            patternArray.push($card);
        };
    };
    shuffleArray(patternArray);
    let totalImageArray = createImgList(patternArray, modeImg);
    return {
        imgArray: totalImageArray.imgArray,
        defaultImgArray: totalImageArray.defaultImgArray,
        patternArray: patternArray
    };
};

// create image link array for appending to src based on shuffled array later
const createImgList = (array, modeImgArr) => {
    let imgArray = [];
    let defaultImgArray = [];
    for (let k = 0; k < array.length; k++) {
        if (array[k] === 'card1') {
            imgArray.push(modeImgArr[0]);
            defaultImgArray.push(DEFAULT_IMAGE);
        } else if (array[k] === 'card2') {
            imgArray.push(modeImgArr[1]);
            defaultImgArray.push(DEFAULT_IMAGE);
        } else if (array[k] === 'card3') {
            imgArray.push(modeImgArr[2]);
            defaultImgArray.push(DEFAULT_IMAGE);
        } else if (array[k] === 'card4') {
            imgArray.push(modeImgArr[3]);
            defaultImgArray.push(DEFAULT_IMAGE);
        } else if (array[k] === 'card5') {
            imgArray.push(modeImgArr[4]);
            defaultImgArray.push(DEFAULT_IMAGE);
        } else if (array[k] === 'card6') {
            imgArray.push(modeImgArr[5]);
            defaultImgArray.push(DEFAULT_IMAGE);
        } else {
            return {
                imgArray,
                defaultImgArray
            }
        };
    };
    return {
        imgArray: imgArray,
        defaultImgArray: defaultImgArray
    }
};

//create html tags
const createTags = (input, itsClass, itsAttr = null, appendTo) => {
    let $input = $('<' + input + '>');
    $input.addClass(itsClass).attr('src', itsAttr);
    appendTo.append($input);
    return $input;
};

//create html tags2
const createTags2 = (input, itsID, itsFunc = null, appendTo) => {
    let $input = $('<' + input + '>');
    $input.attr('id', itsID).attr('onclick', itsFunc);
    appendTo.append($input);
    return $input;
};

//initialise game time
function startTimer() {
    $('.timer').empty();
    clearInterval(interval);
    let second = 0, minute = 3;
    interval = setInterval(function () {
        $('.timer').html('Time left: ' + minute + ' mins ' + second + ' seconds');
        if (second <= 0 && minute >= 1) {
            minute--;
            second += 60;
        } else if (second === 0 && minute === 0) {
            clearInterval(interval);
            timeIsUp();
        };
        second--;
    }, 1000);
};

// when selected game mode, the page will dissolve then popup modes to select
window.selectGameMode = () => {
    $('.greet-user').html('Hello ' + getCurrentUser());
    $("[id^=popup]").removeClass('popshow');
    $('#popup2').addClass('popshow');
    closePopUp();
};

// function declaration
function getCurrentUser() {
    let CURRENT_USER;
    if ((($('#userID'))[0].value) === '') {
        CURRENT_USER = 'stranger';
    } else {
        CURRENT_USER = $('#userID')[0].value;
    };
    return CURRENT_USER;
};

// check if user input exist in server
window.checkExistingID = () => {
    let b = getCurrentUser();
    if (b === 'stranger') {
        alert('Please enter your name!');
    } else if ((userInfo.ID.indexOf(b)) >= 0) {
        selectGameMode();
    } else if ((userInfo.ID.indexOf(b)) <= 0) {
        createUser(b);
        selectGameMode();
    };
};

//
function genRandomPokemonID() {
    return (Math.round((Math.random() * 150)));
}

// when play again is clicked
window.playAgain = () => {
    $("[id^=popup]").removeClass('popshow');
    selectGameMode();
    closePopUp();
};

// close icon on popup
function closePopUp() {
    $('.close').on("click", function () {
        location.reload();
    });
};

// when time is up
function timeIsUp() {
    disable();
    $('#popup4').addClass('popshow');
    closePopUp();
};

// disable all cards temporarily
function disable() {
    let a = $("div[class^='card']");
    for (let p = 0; p < a.length; p++) {
        a[p].classList.add('disabled');
    }
};

$(() => {

    // variable declaration
    // prepare game area
    let $gameAreaTiles = $('#game-area-tiles')
    let $COMBO_VALUE = $('.combo-value');
    let $SCORE_VALUE = $('.score-value');
    let $FINAL_SCORE = $('#finalScore');
    let $CURRENT_COMBO = INITIAL_VALUE;
    getDefault = () => $('.default');

    // start game function will load start page as popup
    function startGame() {
        startPage();
    };

    // start page to load first when page loaded
    function startPage() {
        $('#popup1').addClass('popshow');
        closePopUp();
    };

    // upon clicking game mode, it will prepare game area
    $('input[type=submit]').on('click', (event) => {
        $("[id^=popup]").removeClass('popshow');
        event.preventDefault();
        $gameAreaTiles.empty();
        $SCORE_VALUE.empty().html(INITIAL_VALUE);
        $COMBO_VALUE.empty().html(INITIAL_VALUE);
        CURRENT_SCORE = INITIAL_VALUE;
        getPokemon = genRandomPokemonID();

        // Create and append divs element
        let modeInfo = modeType(event.currentTarget.value);
        let startObject = createStartArray(modeInfo.TILE, modeInfo.PATTERN, selectImgSource(modeInfo.TILE));
        let createdArray = startObject.patternArray;
        let imgArray = startObject.imgArray;
        let defaultImg = startObject.defaultImgArray;
        for (let i = INITIAL_VALUE; i < createdArray.length; i++) {
            let $card = createTags('div', createdArray[i], '', $gameAreaTiles);
            createTags('img', 'default', imgArray[i], $card);
            createTags('img', 'show', defaultImg[i], $card);
            if (modeInfo.TILE > TILE[0]) {
                $card.css('width', '16%');
            }
        };

        $("div[class^='card']").on('click', displayCard);
        $("div[class^='card']").on('click', cardOpen);

        //set timer
        startTimer();
    });

    function selectImgSource(info) {
        if (info > 24) {
            return IMAGE_SOURCE_HARD;
        };
        return IMAGE_SOURCE;
    }

    function modeType(mode) {
        let index = TYPE_OF_DIFFICULTIES.indexOf(mode);
        return {
            TILE: TILE[index],
            PATTERN: PATTERN[index]
        }
    };

    // Combo counter and reflect in html
    function increaseCombo() {
        $CURRENT_COMBO += 1;
        $COMBO_VALUE.html($CURRENT_COMBO);
    };

    // Combo counter and reflect in html
    function restartCombo() {
        $CURRENT_COMBO = 0;
        $COMBO_VALUE.html($CURRENT_COMBO);
    };

    // Score counter and reflect in html
    function scoreCounter() {
        if ($CURRENT_COMBO <= 1) {
            CURRENT_SCORE += (MATCH_SCORE * MULTI0);
            $SCORE_VALUE.html(CURRENT_SCORE);
        } else if ($CURRENT_COMBO === 2) {
            CURRENT_SCORE += (MATCH_SCORE * MULTI1);
            $SCORE_VALUE.html(CURRENT_SCORE);
        } else if ($CURRENT_COMBO === 3) {
            CURRENT_SCORE += (MATCH_SCORE * MULTI2);
            $SCORE_VALUE.html(CURRENT_SCORE);
        } else if ($CURRENT_COMBO > 3) {
            CURRENT_SCORE += (MATCH_SCORE * MULTI3);
            $SCORE_VALUE.html(CURRENT_SCORE);
        }
    };

    // swap between 'show' and 'default' class to display cards then add 'selected' class
    function displayCard(event) {
        event.currentTarget.querySelector('img.show').className = 'default';
        event.currentTarget.querySelector('img.default').className = 'show';
        event.currentTarget.classList.add('is-flipped');
        event.currentTarget.classList.add('selected');
    };

    // to compare 1st list and check if cards are match or not
    function cardOpen() {
        openedCards.push(this);
        let len = openedCards.length;
        if (len === 2) {
            if ((openedCards[0].className === openedCards[1].className)) {
                matched();
            } else {
                unmatched();
            }
        }
    };

    // when cards match
    function matched() {
        setTimeout(function () {
            openedCards[0].classList.add("completed");
            openedCards[1].classList.add("completed");
            openedCards = [];
            enable();
        }, 500);
        disable();
        matchedSound();
        increaseCombo();
        scoreCounter();
    };

    // when cards don't match
    function unmatched() {
        setTimeout(function () {
            openedCards[0].classList.remove('is-flipped');
            openedCards[1].classList.remove('is-flipped');
            openedCards[0].querySelectorAll('img').forEach(img => {
                img.className = img.className === 'show' ? 'default' : 'show';
            });
            openedCards[1].querySelectorAll('img').forEach(img => {
                img.className = img.className === 'show' ? 'default' : 'show';
            });
            openedCards = [];
            enable();
        }, 500);
        disable();
        restartCombo();
    };

    // enable all cards by removing disable & selected and check win
    function enable() {
        let a = $("div[class^='card']");
        for (let p = 0; p < a.length; p++) {
            a[p].classList.remove('disabled');
            a[p].classList.remove('selected');
        };
        congratulations();
    };

    // check for win game
    function congratulations() {
        if ((($('.completed')).length) === (($("[class^='card']")).length)) {
            let c = getCurrentUser();
            let d = userInfo.ID.indexOf(c);
            let e = apiLibrary.getPokemonNamebyID(getPokemon);
            $('#popup3 .popup .content-2 p:last').empty();
            $('#popup3 .popup .content-2 p:last').html('and you caught ' + e + '!');
            if ( d >= 0 && !userInfo.cumPokemonID[d].PokeID.includes(getPokemon)) {
                userInfo.cumPokemonID[d].PokeID.push(getPokemon);
            };
            clearInterval(interval);
            $('#popup3').addClass("popshow");
            $FINAL_SCORE.html(CURRENT_SCORE);
            closePopUp();
        };
    };

    startGame();
});