const modules = require('./modules/modules.css');

if ( document.querySelectorAll('body.react').length ) {
	// Require the Bracket.
	require( './Bracket');
	var regionToggles = document.getElementsByClassName('regionToggle__region');

	for (var i = regionToggles.length - 1; i >= 0; i--) {
		regionToggles[i].addEventListener('click', regionToggle);
	}

	function regionToggle(event) {
		console.log(event);

		var activeRegionToggle = document.getElementsByClassName('regionToggle__region--active')[0];
		activeRegionToggle.classList.remove('regionToggle__region--active');;

		var regionToggle = event.target;
		var newRegion = regionToggle.getAttribute('data-region');

		regionToggle.classList.add('regionToggle__region--active');

		var rounds = document.getElementsByClassName('rounds')[0];

		if ( newRegion == 'finalFour' )
			var ifRegion = '';
		else
			var ifRegion = 'Region';

		rounds.classList = 'rounds';
		rounds.classList.add('rounds--display' + ifRegion + capitalizeFirstLetter(newRegion));
	}


	function capitalizeFirstLetter(string) {
		return string[0].toUpperCase() + string.slice(1);
	}
} else {


var modalClose = document.getElementsByClassName('modal__close')[0];

modalClose.addEventListener('click', toggleModal);

// Populate FPO matchups
var matchups = document.getElementsByClassName('matchups');
var matchup = document.getElementsByClassName('matchup')[0];

for (var i = matchups.length - 1; i >= 0; i--) {
	var roundMatchups = matchups[i].getAttribute('data-matchups');

	for (var x = roundMatchups; x > 0; x--) {
		var random_complete = Math.random() >= .6;
		var random_winner = Math.random() >= .5;
		var random_empty = Math.random() >= .8;
		var random_inProgress = Math.random() >= .8;
		var matchupClone = matchup.cloneNode(true);
		var matchupTeamA = matchupClone.getElementsByClassName('team')[0];
		var matchupTeamB = matchupClone.getElementsByClassName('team')[1];

		matchupClone.addEventListener('click', toggleModal);

		if ( random_complete ) {
			matchupClone.classList.add('matchup--complete');

			if ( random_winner )
				matchupTeamA.classList.add('team--winner');
			else
				matchupTeamB.classList.add('team--winner');
		}
		else if ( random_empty ) {
			matchupClone.classList.add('matchup--empty');
			matchupClone.getElementsByClassName('team__seed')[0].innerHTML = '&nbsp;';
			matchupClone.getElementsByClassName('team__seed')[1].innerHTML = '&nbsp;';
			matchupClone.getElementsByClassName('team__name')[0].innerHTML = '&nbsp;';
			matchupClone.getElementsByClassName('team__name')[1].innerHTML = '&nbsp;';
			matchupClone.getElementsByClassName('team__logo')[0].innerHTML = '<img>';
			matchupClone.getElementsByClassName('team__logo')[1].innerHTML = '<img>';
		}
		else if ( random_inProgress ) {
			matchupClone.classList.add('matchup--inProgress');
		}

		matchups[i].appendChild(matchupClone);
	}
}

setRegions();

function setRegions() {

	// First Four
	var round_firstFour = document.getElementsByClassName('round--firstFour')[0].getElementsByClassName('matchup');

	round_firstFour[0].classList.add('matchup--regionSouth');
	round_firstFour[1].classList.add('matchup--regionWest');
	round_firstFour[2].classList.add('matchup--regionEast');
	round_firstFour[3].classList.add('matchup--regionMidwest');

	// First Left
	var round_firstLeft = document.getElementsByClassName('round--firstLeft')[0].getElementsByClassName('matchup');

	for (var i = round_firstLeft.length - 1; i >= 0; i--) {
		if ( i < (round_firstLeft.length / 2) )
			round_firstLeft[i].classList.add('matchup--regionSouth');
		else
			round_firstLeft[i].classList.add('matchup--regionWest');
	}

	// Second Left
	var round_secondLeft = document.getElementsByClassName('round--secondLeft')[0].getElementsByClassName('matchup');

	for (var i = round_secondLeft.length - 1; i >= 0; i--) {
		if ( i < (round_secondLeft.length / 2) )
			round_secondLeft[i].classList.add('matchup--regionSouth');
		else
			round_secondLeft[i].classList.add('matchup--regionWest');
	}

	// Third Left
	var round_thirdLeft = document.getElementsByClassName('round--thirdLeft')[0].getElementsByClassName('matchup');

	for (var i = round_thirdLeft.length - 1; i >= 0; i--) {
		if ( i < (round_thirdLeft.length / 2) )
			round_thirdLeft[i].classList.add('matchup--regionSouth');
		else
			round_thirdLeft[i].classList.add('matchup--regionWest');
	}

	// Fourth Left
	var round_fourthLeft = document.getElementsByClassName('round--fourthLeft')[0].getElementsByClassName('matchup');

	for (var i = round_fourthLeft.length - 1; i >= 0; i--) {
		if ( i < (round_fourthLeft.length / 2) )
			round_fourthLeft[i].classList.add('matchup--regionSouth');
		else
			round_fourthLeft[i].classList.add('matchup--regionWest');
	}

	// First Right
	var round_firstRight = document.getElementsByClassName('round--firstRight')[0].getElementsByClassName('matchup');

	for (var i = round_firstRight.length - 1; i >= 0; i--) {
		if ( i < (round_firstRight.length / 2) )
			round_firstRight[i].classList.add('matchup--regionEast');
		else
			round_firstRight[i].classList.add('matchup--regionMidwest');
	}

	// Second Right
	var round_secondRight = document.getElementsByClassName('round--secondRight')[0].getElementsByClassName('matchup');

	for (var i = round_secondRight.length - 1; i >= 0; i--) {
		if ( i < (round_secondRight.length / 2) )
			round_secondRight[i].classList.add('matchup--regionEast');
		else
			round_secondRight[i].classList.add('matchup--regionMidwest');
	}

	// Third Right
	var round_thirdRight = document.getElementsByClassName('round--thirdRight')[0].getElementsByClassName('matchup');

	for (var i = round_thirdRight.length - 1; i >= 0; i--) {
		if ( i < (round_thirdRight.length / 2) )
			round_thirdRight[i].classList.add('matchup--regionEast');
		else
			round_thirdRight[i].classList.add('matchup--regionMidwest');
	}

	// Fourth Right
	var round_fourthRight = document.getElementsByClassName('round--fourthRight')[0].getElementsByClassName('matchup');

	for (var i = round_fourthRight.length - 1; i >= 0; i--) {
		if ( i < (round_fourthRight.length / 2) )
			round_fourthRight[i].classList.add('matchup--regionEast');
		else
			round_fourthRight[i].classList.add('matchup--regionMidwest');
	}
}

// Populate round dividers
var dividers = document.getElementsByClassName('roundDividers');
var divider = document.getElementsByClassName('roundDivider')[0];
var dividerSpacer = document.getElementsByClassName('roundDividerSpacer')[0];

for (var i = dividers.length - 1; i >= 0; i--) {
	var roundDividers = dividers[i].getAttribute('data-dividers');

	dividers[i].appendChild(dividerSpacer.cloneNode(true));

	for (var x = roundDividers; x > 0; x--) {
		dividers[i].appendChild(divider.cloneNode(true));
		dividers[i].appendChild(dividerSpacer.cloneNode(true));
	}
}

// Setup Region Toggles

var regionToggles = document.getElementsByClassName('regionToggle__region');

for (var i = regionToggles.length - 1; i >= 0; i--) {
	regionToggles[i].addEventListener('click', regionToggle);
}

function regionToggle(event) {
	console.log(event);

	var activeRegionToggle = document.getElementsByClassName('regionToggle__region--active')[0];
	activeRegionToggle.classList.remove('regionToggle__region--active');;

	var regionToggle = event.target;
	var newRegion = regionToggle.getAttribute('data-region');

	regionToggle.classList.add('regionToggle__region--active');

	var rounds = document.getElementsByClassName('rounds')[0];

	if ( newRegion == 'finalFour' )
		var ifRegion = '';
	else
		var ifRegion = 'Region';

	rounds.classList = 'rounds';
	rounds.classList.add('rounds--display' + ifRegion + capitalizeFirstLetter(newRegion));
}

// Toggle Debug Overlay
window.addEventListener('keydown', keyPress);

function keyPress(e) {
	switch ( e.keyCode ) {
		case 192:
			toggleDebug();
			break;
		case 27:
			hideModal();
			break;
	}
}

function toggleDebug() {
	// let bodyTag = document.getElementsByTagName('body')[0];
	// bodyTag.classList.toggle('debug');

	let bracketTag = document.getElementsByClassName('bracket')[0];
	bracketTag.classList.toggle('bracket--compact');
}

function toggleModal() {
	let bodyTag = document.getElementsByTagName('body')[0];
	bodyTag.classList.toggle('frame--scrollLock');

	let modalTag = document.getElementsByClassName('modal')[0];
	modalTag.classList.toggle('modal--visible');
}

function hideModal() {
	let bodyTag = document.getElementsByTagName('body')[0];
	bodyTag.classList.remove('frame--scrollLock');

	let modalTag = document.getElementsByClassName('modal')[0];
	modalTag.classList.remove('modal--visible');
}

function capitalizeFirstLetter(string) {
	return string[0].toUpperCase() + string.slice(1);
}

}
