const Templates = {

	round_section: function() {
		return (`
			<li id="accordion-section-${this.id}"
				class="accordion-section control-section control-section-default">
				<h3 class="accordion-section-title" tabindex="0">
					${this.title}
					<span class="screen-reader-text">Press return or enter to open</span>
				</h3>
				<ul class="accordion-section-content">
					<li class="customize-section-description-container">
						<div class="customize-section-title">
							<button class="customize-section-back" tabindex="-1">
								<span class="screen-reader-text">Back</span>
							</button>
							<h3>
								<span class="customize-action">Customizing &#9656; ${this.title}</span>
								${this.title}
							</h3>
						</div>
					</li>
				</ul>
			</li>
		`)
	},

	input_text: function() {
		return (`
		<li id="customize-control-${this.id}" class="customize-control customize-control-text" style="display: list-item;">
			<label>
				<span class="customize-control-title">${this.label}</span>
				<div class="customize-control-notifications-container" style="">
					<ul></ul>
				</div>
				<input type="text" value="${this.value}" data-customize-setting-link="${this.id}" />
			</label>
		</li>
		`);
	},

	input_number: function() {
		return (`
		<li id="customize-control-${this.id}" class="customize-control customize-control-text" style="display: list-item;">
			<label>
				<span class="customize-control-title">${this.label}</span>
				<div class="customize-control-notifications-container" style="">
					<ul></ul>
				</div>
				<input type="number" value="${this.value}" data-customize-setting-link="${this.id}" />
			</label>
		</li>
		`);
	},

	input_checkbox: function() {
		return (`
		<li id="customize-control-${this.id}" class="customize-control customize-control-text" style="display: list-item;">
			<div class="customize-control-notifications-container" style="">
				<ul></ul>
			</div>
			<label>
				<input type="checkbox" value="${this.value}" data-customize-setting-link="${this.id}" />
				${this.label}
			</label>
		</li>
		`);
	},

	select: function() {
		let els = '';
		this.options.map( (option) => {
			if ( option.value === this.value ) {
				els = els.concat( `<option value="${option.value}" selected="selected">${option.name}</option>`);
			} else {
				els = els.concat( `<option value="${option.value}">${option.name}</option>`);
			}
		});
		return (`
		"<li id="customize-control-${this.id}" class="customize-control customize-control-dropdown">
			<label>
				<span class="customize-control-title">${this.label}</span>
				<select data-customize-setting-link="${this.id}">
				<option value="0" selected='selected'>&mdash; Select &mdash;</option>
				${els}
			</label>
		</li>
		`);
	}
}

export default Templates;
