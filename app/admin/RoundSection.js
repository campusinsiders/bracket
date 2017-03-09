import SectionControls from './SectionControls';

export default class RoundSectionControls extends SectionControls {

	api;

	settings_base;

	section;

	sectionId;

	controls;

	round;

	constructor( api, sectionId, round ) {
		super( api, sectionId );
		this.round = round;
		this.sectionId = 'wp_bracket_round_' + sectionId;
		this.settings_base = 'wp_bracket_round_' + sectionId + '_';
		const sectionVars = {
			'title': `${this.round.title} (${this.round.position})` || `${this.round.ordinal} round from the ${this.round.position}`,
			'id': this.sectionId
		};
		const sectionContent = this.template( 'round_section', sectionVars );
		const sectionData = {
			content: sectionContent,
			active: true,
			type: 'default',
			priority: 180 - parseInt( this.round.uid )
		};
		this.section = new wp.customize.Section( this.sectionId, { params: sectionData } );
		this.api.section.add( this.sectionId, this.section );
		return this;
	}

	setting( slug ) {
		return `${this.settings_base}_${slug}`;
	}

	settingOpts() {
		return {
			transport: 'postMessage',
			previewer: this.api.previewer,
			type: 'wp_bracket'
		}
	}

	createControls() {
		this.createTitleControl();
		this.createSubTitleControl();
		this.createSponsorControl();
		this.createSponsorLinkControl();
		if ( this.round.uid == 0 ) {
			this.createPromoControl();
		}
	}

	createTitleSetting() {
		const settingId = this.setting('title');
		let settingValue = this.round.title || '';
		this.api.create( settingId, settingId, settingValue, this.settingOpts() );
	}

	createTitleControl() {
		this.createTitleSetting();
		const controlId = this.setting('title');
		const label = 'Round Title';
		const controlVars = {
			id: controlId,
			label: label,
			value: this.round.title || ''
		};
		let controlData = {
			content: this.template( 'input_text', controlVars ),
			label: label,
			settings: { 'default': this.setting('title') },
			type: 'text',
		    active: true,
		    priority: 10
		};
		let constructor = this.api.controlConstructor[controlData.type];
		this.controls[controlId] = new this.api.Control( controlId, {
			params: controlData,
			previewer: this.api.previewer
		});
		this.api.control.add(controlId, this.controls[controlId]);
		this.controls[controlId].section(this.section.id);
		this.controls[controlId].activate();
		return this.controls[controlId];
	}

	createSubTitleSetting() {
		const settingId = this.setting('subtitle');
		let settingValue = this.round.subtitle || '';
		this.api.create( settingId, settingId, settingValue, this.settingOpts() );
	}

	createSubTitleControl() {
		this.createSubTitleSetting();
		const controlId = this.setting('subtitle');
		const label = 'Round Subtitle/Date';
		const controlVars = {
			id: controlId,
			label: 'Round Subtext (Date/Venue)',
			value: this.round.subtitle || ''
		};
		let controlData = {
			content: this.template( 'input_text', controlVars ),
			label: label,
			settings: { 'default': this.setting('subtitle') },
			type: 'text',
		    active: true,
		    priority: 20
		};
		this.controls[controlId] = new this.api.Control( controlId, {
			params: controlData,
			previewer: this.api.previewer
		});
		this.api.control.add(controlId, this.controls[controlId]);
		this.controls[controlId].section(this.section.id);
		this.controls[controlId].activate();
		return this.controls[controlId];
	}

	createPromoSetting() {
		const settingId = this.setting('promo');
		let settingValue = '';
		this.api.create( settingId, settingId, settingValue, this.settingOpts() );
	}

	createPromoControl() {
		this.createPromoSetting();
		const controlId = 'promo';
		const label = 'Main Promo';
		let controlData = {
			//content: this.template( controlId, { labelText: label } ),
			content: '<li id="customize-control-promo" class="customize-control customize-control-upload"></li>',
			label: label,
			settings: { 'default': this.setting('promo') },
			button_labels: {
				change: "Change Image",
				default: "Default",
				frame_button: "Choose Image",
				frame_title: "Select Image",
				placeholder: "No Image Selected",
				remove: "Remove",
				select: "Select Image"
			},
			canUpload: true,
			type: 'upload',
		    active: true,
		    priority: 50
		};
		let constructor = this.api.controlConstructor[controlData.type];
		this.controls[controlId] = new constructor( controlId, {
			params: controlData,
			previewer: this.api.previewer
		});
		this.api.control.add(controlId, this.controls[controlId]);
		this.controls[controlId].section(this.section.id);
		this.controls[controlId].activate();
		return this.controls[controlId];
	}

	createSponsorSetting() {
		const settingId = this.setting('sponsor');
		let settingValue = '';
		this.api.create( settingId, settingId, settingValue, this.settingOpts() );
	}

	createSponsorControl() {
		this.createSponsorSetting();
		const controlId = 'sponsor';
		const label = 'Round Sponsor';
		let controlData = {
			//content: this.template( controlId, { labelText: label } ),
			content: '<li id="customize-control-sponsor" class="customize-control customize-control-upload"></li>',
			label: label,
			settings: { 'default': this.setting('sponsor') },
			button_labels: {
				change: "Change Image",
				default: "Default",
				frame_button: "Choose Image",
				frame_title: "Select Image",
				placeholder: "No Image Selected",
				remove: "Remove",
				select: "Select Image"
			},
			canUpload: true,
			type: 'upload',
		    active: true,
		    priority: 100,
		};
		let constructor = this.api.controlConstructor[controlData.type];
		this.controls[controlId] = new constructor( controlId, {
			params: controlData,
			previewer: this.api.previewer
		});
		this.api.control.add(controlId, this.controls[controlId]);
		this.controls[controlId].section(this.section.id);
		this.controls[controlId].activate();
		return this.controls[controlId];
	}

	createSponsorLinkSetting() {
		const settingId = this.setting('sponsorLink');
		let settingValue = this.round.sponsorLink || '';
		this.api.create( settingId, settingId, settingValue, this.settingOpts() );
	}

	createSponsorLinkControl() {
		this.createSponsorLinkSetting();
		const controlId = this.setting('sponsorLink');
		const label = 'Round Sponsor Link';
		const controlVars = {
			id: controlId,
			label: label,
			value: this.round.sponsorLink || ''
		};
		let controlData = {
			content: this.template( 'input_text', controlVars ),
			label: label,
			settings: { 'default': this.setting('sponsorLink') },
			type: 'text',
		    active: true,
		    priority: 120
		};
		let constructor = this.api.controlConstructor[controlData.type];
		this.controls[controlId] = new this.api.Control( controlId, {
			params: controlData,
			previewer: this.api.previewer
		});
		this.api.control.add(controlId, this.controls[controlId]);
		this.controls[controlId].section(this.section.id);
		this.controls[controlId].activate();
		return this.controls[controlId];
	}
}
