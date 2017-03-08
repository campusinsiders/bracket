export default class Team {
	teamName;

	teamLogo;

	teamSeed;

	teamVideo;

	constructor( data ) {
		data = data || {};
		this.teamName = data.teamName || '???';
		this.teamLogo = data.teamLogo || '';
		this.teamSeed = data.teamSeed || 1;
		this.teamVideo = data.teamVideo || void 0;
	}
}
