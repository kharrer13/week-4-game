// Declare the character objects

var charList = {
    obiWan: {
        name: "Obi Wan Kenobi",
        attack: 8,
        HP: 120,
        counterAttack: 8,
        HPTar: obiHP
    },
    lukeSky: {
        name: "Luke Skywalker",
        attack: 5,
        HP: 100,
        counterAttack: 5,
        HPTar: lukeHP
    },
    darthSid: {
        name: "Darth Sidious",
        attack: 20,
        HP: 150,
        counterAttack: 20,
        HPTar: sidHP
    },
    darthMaul: {
        name: "Darth Maul",
        attack: 25,
        HP: 180,
        counterAttack: 25,
        HPTar: maulHP
    }
};


// Define variables for selected fighter and defender, allowing program to keep original values for reset
var fighter = {};
var defender = {};
var fighterSelect = false;
var defenderSelect = false;

// Other global variables
var dead = false;
var multiplier = 1;
var wins = 0

// Create Fighter based on initial character stats
function createFighter(selectedFighter) {
    fighter.name = selectedFighter.name;
    fighter.attack = selectedFighter.attack;
    fighter.HP = selectedFighter.HP;
    fighter.counterAttack = selectedFighter.counterAttack;
    fighter.HPTar= selectedFighter.HPTar;
}

// Create Defender based on initial character stats
function createDefender(selectedDefender) {
    defender.name = selectedDefender.name;
    defender.attack = selectedDefender.attak;
    defender.HP = selectedDefender.HP;
    defender.counterAttack = selectedDefender.counterAttack;
    defender.HPTar = selectedDefender.HPTar;
}

function reset() {
    fighter = {};
    defender = {};
    fighterSelect = false;
    defenderSelect = false;
    dead =  false;
}

// Main body of game
$(document).ready(function () {

    //select main character and move the others to enemies
    $('.character').click(function (event) {
        var id = event.target.id;
        if (fighterSelect === false) {
            createFighter(charList[id]);
            fighterSelect = true;
            $(this).removeClass('character').addClass('your-character');
            $('.character').removeClass('character').addClass('enemy');
            $('.enemies').prepend($('.enemy'));
            $('.characters').html($(this));
            $('#instructions').html('');
        }
    })

    // Select one of the enemies available to attack and moves them to defender
    $('.enemies').click('.enemy', function (event) {
        var id = event.target.id;
        if (defenderSelect === false) {
            createDefender(charList[id]);
            defenderSelect = true;
            console.log($(id));
            $('#' + id).parent().removeClass('enemy').addClass('defender');
            $('.defenders').prepend($('.defender'));
            $('#instructions').html('');
        }
    })

    $('#attack').click(function () {
        if (fighterSelect === true && defenderSelect === true && wins < 3 && dead === false) {
            defender.HP = defender.HP - (fighter.attack * multiplier);
            $(defender.HPTar).html(defender.HP);
            multiplier++;
            if (defender.HP <= 0) {
                wins++;
                if (wins === 3) {
                    $('.defenders').empty();
                    $('#instructions').html(defender.name + ' was defeted, You WIN!');
                    defenderSelect = false;
                } else {
                    $('.defenders').empty();
                    $('#instructions').html(defender.name + ' was defeted, select another enemy to attack');
                    defenderSelect = false;
                }
            } else {
                fighter.HP = fighter.HP - defender.counterAttack;
                $(fighter.HPTar).html(fighter.HP);
                if (fighter.HP <= 0) {
                    $('#instructions').html(defender.name +' won, You Lost');
                    dead = true;
                }
            }
        } else if (dead === true) {
            $('#instructions').html('You lost, press Reset to play again.');
        } else if (wins === 3) {
            $('#instructions').html(defender.name + ' was defeted, You WIN!');
        } else if (fighterSelect === true && defenderSelect === false) {
            $('#instructions').html('Select a Defender to attack');
        } else {
            $('#instructions').html('Select your Character and a Defender to attack');
        }
    })
});
