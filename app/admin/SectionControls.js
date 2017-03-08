import Templates from './Templates';

export default class SectionControls {
	api;

	sectionId;

	controls;

	templates;

	constructor( api, sectionId ) {
		this.api = api;
		this.sectionId = sectionId;
		this.controls = {};
		this.templates = Templates;
		this.section = this.api.section( this.sectionId );
	}

	template( slug, data ) {
		return this.templates[slug].call( data );
	}
}
