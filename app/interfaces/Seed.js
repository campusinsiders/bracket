import { computed, observable } from 'mobx';
export default class Seed {

	teamName;

	seedNumber;

	constructor() {
		this.teamName = '';
	}

	winner() {
		return this.teamName;
	}
}
