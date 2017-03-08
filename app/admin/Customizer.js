import MainSection from './MainSection';
import RoundSection from './RoundSection';
import MatchSection from './MatchSection';

export default class WPBracketCustomizer {
	api;

	panel;

	panelId = 'wp_bracket';

	mainSection;

	mainSectionId = 'wp_bracket_main';

	roundSections = [];

	roundSectionId = 'wp_bracket_round';

	matchupSections = [];

	matchupSectionId = 'wp_bracket_matchup';

	constructor( api ) {
		this.api = api;
		this.panel = this.api.panel( this.panelId );
		this.mainSection = new MainSection( this.api, this.mainSectionId );

		// this.roundSection = this.api.section( this.roundSectionId );
		// this.matchupSection = this.api.section( this.matchupSectionId );
		return this;
	}

	initMainSection() {
		this.mainSection.createLogoControl();
	}

	initRound( round ) {
		let section = new RoundSection( this.api, round.uid, round );
		this.roundSections.push( section );
		return section;
	}

	initMatchup( matchup ) {
		let section = new MatchSection( this.api, matchup.uid, matchup );
		this.matchupSections.push( section );
		return section;
	}

	reset() {
		this.roundSections.map( (round) => round.section.deactivate() );
		this.matchupSections.map( (match) => match.section.deactivate() );
		this.api.section(this.mainSectionId).focus();
	}
}
