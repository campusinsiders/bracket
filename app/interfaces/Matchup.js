import { computed, observable } from 'mobx';
import Team from './Team';

export default class Matchup {

	roundId;

	uid;

	@observable region;

	@observable seat1Team;

	@observable seat2Team;

	@observable seat1Seed;

	@observable seat2Seed;

	@observable seat1Video;

	@observable seat2Video;

	@observable seat1Score;

	@observable seat2Score;

	@observable seat1Winner;

	@observable seat2Winner;

	@observable seat1Logo = "";

	@observable seat2Logo = "";

	@observable final;

	@observable articleId = 0;

	@observable article = { id: 0, title: '', content: '' };

	@observable mainVideo = "";

	@observable supplementalVideo1 = "";

	@observable supplementalVideo2 = "";

	@observable loading = false;

	constructor( data ) {
		const defaults = {
			seat1Team: '',
			seat2Team: '',
			seat1Winner: false,
			seat2Winner: false,
			articleId: 0
		};
		Object.assign(this, defaults, data );
		this.upgradeRegions();
	}

	upgradeRegions() {
		switch ( this.region ) {
			case 'South':
				this.region = 'TopLeft';
				break;
			case 'East':
				this.region = 'TopRight';
				break;
			case 'West':
				this.region = 'BottomLeft';
				break;
			case 'Midwest':
				this.region = 'BottomRight';
				break;
		}
	}
}
