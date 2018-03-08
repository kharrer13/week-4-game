// Declare the character objects
var obiWan = {
    name: "Obi Wan Kenobi",
    attack: 8,
    HP: 120,
    counterAttack: 8,
};

var lukeSky = {
    name: "Luke Skywalker",
    attack: 5,
    HP: 100,
    counterAttack: 5,
};

var darthSid = {
    name: "Darth Sidious",
    attack: 20,
    HP: 150,
    counterAttack: 20,
};

var darthMaul = {
    name: "Darth Maul",
    attack: 25,
    HP: 180,
    counterAttack: 25,
};

// Define variables for selected fighter and defender, allowing program to keep original values for reset
var fighter = {};
var defender = {};
var fighterSelect = false;
var defenderSelect = false;

// Other global variables
var dead = false;
var wins = 0;

// Create Fighter based on initial character stats
function createFighter(selectedFighter) {
    fighter.name = selectedFighter.name;
    fighter.attack = selectedFighter.attak;
    fighter.HP = selectedFighter.HP;
    fighter.counterAttack = selectedFighter.counterAttack;
}

// Create Defender based on initial character stats
function createDefender(selectedDefender) {
    defender.name = selectedDefender.name;
    defender.attack = selectedDefender.attak;
    defender.HP = selectedDefender.HP;
    defender.counterAttack = selectedDefender.counterAttack;
}

function reset() {
    fighter = {};
    defender = {};
    fighterSelect = false;
    defenderSelect = false;
}

// Main body of game
$(document).ready(function () {
    $('.character').click(function () {
        if (fighterSelect === false) {
            createFighter(this);
            fighterSelect = true;
            $(this).removeClass('character').addClass('your-character');
            $('.character').removeClass('character').addClass('enemy');
            $('.enemies').prepend($('.enemy'));
            $('.characters').html($(this))
        }
    })
})
