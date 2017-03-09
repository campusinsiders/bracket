import SectionControls from './SectionControls';

export default class MatchSectionControls extends SectionControls {

	api;

	settings_base;

	section;

	sectionId;

	controls;

	round;

	constructor( api, sectionId, matchup ) {
		super( api, sectionId );
		this.matchup = matchup;
		this.sectionId = 'wp_bracket_round_' + this.matchup.roundId + '_matchup_' + sectionId;
		this.settings_base = 'wp_bracket_round_' + this.matchup.roundId + '_matchup_' + sectionId + '_';
		const sectionVars = {
			'title': 'Match',
			'id': this.sectionId
		};
		const sectionContent = this.template( 'round_section', sectionVars );
		const sectionData = {
			content: sectionContent,
			active: true,
			type: 'default',
			priority: 180 - parseInt( this.matchup.uid )
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
		const controls = [
			this.createTeam1Control,
			this.createTeam1SeedControl,
			this.createTeam1LogoControl,
			this.createTeam1WinnerControl,
			this.createTeam2Control,
			this.createTeam2SeedControl,
			this.createTeam2LogoControl,
			this.createTeam2WinnerControl,
			this.createArticleIdControl,
			this.createMainVideoControl,
			this.createSupplementalVideo1Control,
			this.createSupplementalVideo2Control,
		];
		controls.map( (func) => func.apply(this) );
		return this;
	}

	createTeam1Setting() {
		const settingId = this.setting('seat1Team');
		let settingValue = this.matchup.seat1Team || '';
		this.api.create( settingId, settingId, settingValue, this.settingOpts() );
	}

	createTeam1Control() {
		this.createTeam1Setting();
		const controlId = this.setting('seat1Team');
		const label = 'Team One';
		const controlVars = {
			id: controlId,
			label: label,
			value: this.matchup.seat1Team || ''
		};
		let controlData = {
			content: this.template( 'input_text', controlVars ),
			label: label,
			settings: { 'default': this.setting('seat1Team') },
			type: 'text',
		    active: true
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

	createTeam1SeedSetting() {
		const settingId = this.setting('seat1Seed');
		let settingValue = this.matchup.seat1Seed || '';
		this.api.create( settingId, settingId, settingValue, this.settingOpts() );
	}

	createTeam1SeedControl() {
		this.createTeam1SeedSetting();
		const controlId = this.setting('seat1Seed');
		const label = 'Team One Seed #';
		const controlVars = {
			id: controlId,
			label: label,
			value: this.matchup.seat1Seed || ''
		};
		let controlData = {
			content: this.template( 'input_number', controlVars ),
			label: label,
			settings: { 'default': this.setting('seat1Seed') },
			type: 'number',
		    active: true
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

	createTeam1LogoSetting() {
		const settingId = this.setting('seat1Logo');
		let settingValue = '';
		this.api.create( settingId, settingId, settingValue, this.settingOpts() );
	}

	createTeam1LogoControl() {
		this.createTeam1LogoSetting();
		const controlId = 'seat1Logo';
		const label = 'Team 1 Logo';
		let controlData = {
			//content: this.template( controlId, { labelText: label } ),
			content: '<li id="customize-control-seat1Logo" class="customize-control customize-control-upload"></li>',
			label: label,
			settings: { 'default': this.setting('seat1Logo') },
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
		    active: true
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

	createTeam1WinnerSetting() {
		const settingId = this.setting('seat1Winner');
		let settingValue = this.matchup.seat1Winner || '';
		this.api.create( settingId, settingId, settingValue, this.settingOpts() );
	}

	createTeam1WinnerControl() {
		this.createTeam1WinnerSetting();
		const controlId = this.setting('seat1Winner');
		const label = 'Team One Won this Matchup';
		const controlVars = {
			id: controlId,
			label: label,
			value: this.matchup.seat1Winner || ''
		};
		let controlData = {
			content: this.template( 'input_checkbox', controlVars ),
			label: label,
			settings: { 'default': this.setting('seat1Winner') },
			type: 'checkbox',
		    active: true
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

	createTeam2Setting() {
		const settingId = this.setting('seat2Team');
		let settingValue = this.matchup.seat2Team || '';
		this.api.create( settingId, settingId, settingValue, this.settingOpts() );
	}

	createTeam2Control() {
		this.createTeam2Setting();
		const controlId = this.setting('seat2Team');
		const label = 'Team Two';
		const controlVars = {
			id: controlId,
			label: label,
			value: this.matchup.seat2Team || ''
		};
		let controlData = {
			content: this.template( 'input_text', controlVars ),
			label: label,
			settings: { 'default': this.setting('seat2Team') },
			type: 'text',
		    active: true
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

	createTeam2SeedSetting() {
		const settingId = this.setting('seat2Seed');
		let settingValue = this.matchup.seat2Seed || '';
		this.api.create( settingId, settingId, settingValue, this.settingOpts() );
	}

	createTeam2SeedControl() {
		this.createTeam2SeedSetting();
		const controlId = this.setting('seat2Seed');
		const label = 'Team Two Seed #';
		const controlVars = {
			id: controlId,
			label: label,
			value: this.matchup.seat1Seed || ''
		};
		let controlData = {
			content: this.template( 'input_text', controlVars ),
			label: label,
			settings: { 'default': this.setting('seat2Seed') },
			type: 'number',
		    active: true
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

	createTeam2LogoSetting() {
		const settingId = this.setting('seat2Logo');
		let settingValue = '';
		this.api.create( settingId, settingId, settingValue, this.settingOpts() );
	}

	createTeam2LogoControl() {
		this.createTeam2LogoSetting();
		const controlId = 'seat2Logo';
		const label = 'Team 2 Logo';
		let controlData = {
			//content: this.template( controlId, { labelText: label } ),
			content: '<li id="customize-control-seat2Logo" class="customize-control customize-control-upload"></li>',
			label: label,
			settings: { 'default': this.setting('seat2Logo') },
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
		    active: true
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

	createTeam2WinnerSetting() {
		const settingId = this.setting('seat2Winner');
		let settingValue = this.matchup.seat2Winner || '';
		this.api.create( settingId, settingId, settingValue, this.settingOpts() );
	}

	createTeam2WinnerControl() {
		this.createTeam2WinnerSetting();
		const controlId = this.setting('seat2Winner');
		const label = 'Team Two Won this Matchup';
		const controlVars = {
			id: controlId,
			label: label,
			value: this.matchup.seat2Winner || ''
		};
		let controlData = {
			content: this.template( 'input_checkbox', controlVars ),
			label: label,
			settings: { 'default': this.setting('seat2Winner') },
			type: 'checkbox',
		    active: true
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

	createArticleIdSetting() {
		const settingId = this.setting('articleId');
		let settingValue = this.matchup.articleId || '';
		this.api.create( settingId, settingId, settingValue, this.settingOpts() );
	}

	createArticleIdControl() {
		this.createArticleIdSetting();
		const controlId = this.setting('articleId');
		const label = 'Select Article';
		const controlVars = {
			id: controlId,
			label: label,
			value: this.matchup.articleId || '',
			options: window.wp_bracket.dropdownPosts
		};
		let controlData = {
			content: this.template( 'select', controlVars ),
			label: label,
			settings: { 'default': this.setting('articleId') },
			type: 'select',
		    active: true
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

	createMainVideoSetting() {
		const settingId = this.setting('mainVideo');
		let settingValue = this.matchup.mainVideo || '';
		this.api.create( settingId, settingId, settingValue, this.settingOpts() );
	}

	createMainVideoControl() {
		this.createMainVideoSetting();
		const controlId = this.setting('mainVideo');
		const label = 'Main Video Embed URL';
		const controlVars = {
			id: controlId,
			label: label,
			value: this.matchup.mainVideo || ''
		};
		let controlData = {
			content: this.template( 'input_text', controlVars ),
			label: label,
			settings: { 'default': this.setting('mainVideo') },
			type: 'text',
		    active: true
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

	createSupplementalVideo1Setting() {
		const settingId = this.setting('supplementalVideo1');
		let settingValue = this.matchup.supplementalVideo1 || '';
		this.api.create( settingId, settingId, settingValue, this.settingOpts() );
	}

	createSupplementalVideo1Control() {
		this.createSupplementalVideo1Setting();
		const controlId = this.setting('supplementalVideo1');
		const label = 'Supplemental Video Embed URL';
		const controlVars = {
			id: controlId,
			label: label,
			value: this.matchup.supplementalVideo1 || ''
		};
		let controlData = {
			content: this.template( 'input_text', controlVars ),
			label: label,
			settings: { 'default': this.setting('supplementalVideo1') },
			type: 'text',
		    active: true
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

	createSupplementalVideo2Setting() {
		const settingId = this.setting('supplementalVideo2');
		let settingValue = this.matchup.supplementalVideo2 || '';
		this.api.create( settingId, settingId, settingValue, this.settingOpts() );
	}

	createSupplementalVideo2Control() {
		this.createSupplementalVideo2Setting();
		const controlId = this.setting('supplementalVideo2');
		const label = 'Supplemental Video Embed URL';
		const controlVars = {
			id: controlId,
			label: label,
			value: this.matchup.supplementalVideo2 || ''
		};
		let controlData = {
			content: this.template( 'input_text', controlVars ),
			label: label,
			settings: { 'default': this.setting('supplementalVideo2') },
			type: 'text',
		    active: true
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
