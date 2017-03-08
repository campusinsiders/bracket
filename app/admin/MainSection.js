import SectionControls from './SectionControls';

export default class MainSectionControls extends SectionControls {

	api;

	settings_base;

	section;

	sectionId;

	controls;

	constructor( api, sectionId ) {
		super( api, sectionId )
		this.settings_base = 'wp_bracket_main_';
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

	createLogoSetting() {
		const settingId = this.setting('main_logo');
		let settingValue = '';
		this.api.create( settingId, settingId, settingValue, this.settingOpts() );
	}

	createLogoControl() {
		this.createLogoSetting();
		const controlId = 'main_logo';
		const label = 'Main Logo';
		let controlData = {
			//content: this.template( controlId, { labelText: label } ),
			content: '<li id="customize-control-main_logo" class="customize-control customize-control-upload"></li>',
			label: label,
			settings: { 'default': this.setting('main_logo') },
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
}
