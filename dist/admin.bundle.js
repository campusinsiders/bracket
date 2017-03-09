webpackJsonp([2,3],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Templates__ = __webpack_require__(244);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SectionControls; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var SectionControls = function () {
	function SectionControls(api, sectionId) {
		_classCallCheck(this, SectionControls);

		this.api = api;
		this.sectionId = sectionId;
		this.controls = {};
		this.templates = __WEBPACK_IMPORTED_MODULE_0__Templates__["a" /* default */];
		this.section = this.api.section(this.sectionId);
	}

	_createClass(SectionControls, [{
		key: 'template',
		value: function template(slug, data) {
			return this.templates[slug].call(data);
		}
	}]);

	return SectionControls;
}();



/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Customizer__ = __webpack_require__(240);


wp.customize.bind('ready', function () {
	var bracket = window.bracket = { customizer: new __WEBPACK_IMPORTED_MODULE_0__Customizer__["a" /* default */](wp.customize) };
	// Init the controls.
	bracket.customizer.initMainSection();

	wp.customize.previewer.bind('ready', function () {
		wp.customize.bind('change', function () {
			return wp.customize('wp_bracket_data')._dirty = true;
		});
		wp.customize('wp_bracket_data').get = function () {
			return wp.customize.previewer.targetWindow().appStore.stringified;
		};
	});

	// Listen for init on the bracket.
	window.addEventListener("message", function (event) {
		var parsedData = JSON.parse(event.data);
		if (void 0 !== parsedData && parsedData.hasOwnProperty('actions')) {
			parsedData.actions.map(function (action) {
				//console.log( 'Frame Event: ', event );
				if ('init' === action.action) {
					// Init rounds.
					var nodes = action.data.roundStore.nodes;

					nodes.map(function (node) {
						if (node.hasOwnProperty('matchStore')) {
							var roundSection = bracket.customizer.initRound(node);
							roundSection.createControls();
							roundSection.section.deactivate();

							node.matchStore.matchups.map(function (match) {
								var matchSection = bracket.customizer.initMatchup(match);
								matchSection.createControls();
								matchSection.section.deactivate();
							});
						}
					});
				}

				if ('update' === action.action) {
					wp.customize('wp_bracket_data', function (object) {
						return object.set(JSON.stringify(action.data));
					});
				}

				if ('focusOn' === action.action) {
					if (action.hasOwnProperty('target') && action.target.hasOwnProperty('matchStore')) {
						var id = 'wp_bracket_round_' + action.target.uid;
						bracket.customizer.roundSections.map(function (s) {
							return s.section.deactivate();
						});
						wp.customize.section(id).activate();
						wp.customize.section(id).focus();
					}

					if (action.hasOwnProperty('target') && action.target.hasOwnProperty('seat1Team')) {
						var _id = 'wp_bracket_round_' + action.target.roundId + '_matchup_' + action.target.uid;
						bracket.customizer.roundSections.map(function (s) {
							return s.section.deactivate();
						});
						wp.customize.section(_id).activate();
						wp.customize.section(_id).focus();
					}
				}

				if ('unmount' === action.action) {
					wp.customize.panel(window.bracket.customizer.panelId).focus();
				}
			});
		}
	});
});

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MainSection__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__RoundSection__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MatchSection__ = __webpack_require__(242);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WPBracketCustomizer; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var WPBracketCustomizer = function () {
	function WPBracketCustomizer(api) {
		_classCallCheck(this, WPBracketCustomizer);

		this.panelId = 'wp_bracket';
		this.mainSectionId = 'wp_bracket_main';
		this.roundSections = [];
		this.roundSectionId = 'wp_bracket_round';
		this.matchupSections = [];
		this.matchupSectionId = 'wp_bracket_matchup';

		this.api = api;
		this.panel = this.api.panel(this.panelId);
		this.mainSection = new __WEBPACK_IMPORTED_MODULE_0__MainSection__["a" /* default */](this.api, this.mainSectionId);
		return this;
	}

	_createClass(WPBracketCustomizer, [{
		key: 'initMainSection',
		value: function initMainSection() {
			this.mainSection.createLogoControl();
		}
	}, {
		key: 'initRound',
		value: function initRound(round) {
			var section = new __WEBPACK_IMPORTED_MODULE_1__RoundSection__["a" /* default */](this.api, round.uid, round);
			this.roundSections.push(section);
			return section;
		}
	}, {
		key: 'initMatchup',
		value: function initMatchup(matchup) {
			var section = new __WEBPACK_IMPORTED_MODULE_2__MatchSection__["a" /* default */](this.api, matchup.uid, matchup);
			this.matchupSections.push(section);
			return section;
		}
	}, {
		key: 'reset',
		value: function reset() {
			this.roundSections.map(function (round) {
				return round.section.deactivate();
			});
			this.matchupSections.map(function (match) {
				return match.section.deactivate();
			});
			this.api.section(this.mainSectionId).focus();
		}
	}]);

	return WPBracketCustomizer;
}();



/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SectionControls__ = __webpack_require__(106);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainSectionControls; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var MainSectionControls = function (_SectionControls) {
	_inherits(MainSectionControls, _SectionControls);

	function MainSectionControls(api, sectionId) {
		_classCallCheck(this, MainSectionControls);

		var _this = _possibleConstructorReturn(this, (MainSectionControls.__proto__ || Object.getPrototypeOf(MainSectionControls)).call(this, api, sectionId));

		_this.settings_base = 'wp_bracket_main_';
		return _this;
	}

	_createClass(MainSectionControls, [{
		key: 'setting',
		value: function setting(slug) {
			return this.settings_base + '_' + slug;
		}
	}, {
		key: 'settingOpts',
		value: function settingOpts() {
			return {
				transport: 'postMessage',
				previewer: this.api.previewer,
				type: 'wp_bracket'
			};
		}
	}, {
		key: 'createLogoSetting',
		value: function createLogoSetting() {
			var settingId = this.setting('main_logo');
			var settingValue = '';
			this.api.create(settingId, settingId, settingValue, this.settingOpts());
		}
	}, {
		key: 'createLogoControl',
		value: function createLogoControl() {
			this.createLogoSetting();
			var controlId = 'main_logo';
			var label = 'Main Logo';
			var controlData = {
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
			var constructor = this.api.controlConstructor[controlData.type];
			this.controls[controlId] = new constructor(controlId, {
				params: controlData,
				previewer: this.api.previewer
			});
			this.api.control.add(controlId, this.controls[controlId]);
			this.controls[controlId].section(this.section.id);
			this.controls[controlId].activate();
			return this.controls[controlId];
		}
	}]);

	return MainSectionControls;
}(__WEBPACK_IMPORTED_MODULE_0__SectionControls__["a" /* default */]);



/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SectionControls__ = __webpack_require__(106);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MatchSectionControls; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var MatchSectionControls = function (_SectionControls) {
	_inherits(MatchSectionControls, _SectionControls);

	function MatchSectionControls(api, sectionId, matchup) {
		var _ret;

		_classCallCheck(this, MatchSectionControls);

		var _this = _possibleConstructorReturn(this, (MatchSectionControls.__proto__ || Object.getPrototypeOf(MatchSectionControls)).call(this, api, sectionId));

		_this.matchup = matchup;
		_this.sectionId = 'wp_bracket_round_' + _this.matchup.roundId + '_matchup_' + sectionId;
		_this.settings_base = 'wp_bracket_round_' + _this.matchup.roundId + '_matchup_' + sectionId + '_';
		var sectionVars = {
			'title': 'Match',
			'id': _this.sectionId
		};
		var sectionContent = _this.template('round_section', sectionVars);
		var sectionData = {
			content: sectionContent,
			active: true,
			type: 'default',
			priority: 180 - parseInt(_this.matchup.uid)
		};
		_this.section = new wp.customize.Section(_this.sectionId, { params: sectionData });
		_this.api.section.add(_this.sectionId, _this.section);
		return _ret = _this, _possibleConstructorReturn(_this, _ret);
	}

	_createClass(MatchSectionControls, [{
		key: 'setting',
		value: function setting(slug) {
			return this.settings_base + '_' + slug;
		}
	}, {
		key: 'settingOpts',
		value: function settingOpts() {
			return {
				transport: 'postMessage',
				previewer: this.api.previewer,
				type: 'wp_bracket'
			};
		}
	}, {
		key: 'createControls',
		value: function createControls() {
			var _this2 = this;

			var controls = [this.createTeam1Control, this.createTeam1SeedControl, this.createTeam1LogoControl, this.createTeam1WinnerControl, this.createTeam2Control, this.createTeam2SeedControl, this.createTeam2LogoControl, this.createTeam2WinnerControl, this.createArticleIdControl, this.createMainVideoControl, this.createSupplementalVideo1Control, this.createSupplementalVideo2Control];
			controls.map(function (func) {
				return func.apply(_this2);
			});
			return this;
		}
	}, {
		key: 'createTeam1Setting',
		value: function createTeam1Setting() {
			var settingId = this.setting('seat1Team');
			var settingValue = this.matchup.seat1Team || '';
			this.api.create(settingId, settingId, settingValue, this.settingOpts());
		}
	}, {
		key: 'createTeam1Control',
		value: function createTeam1Control() {
			this.createTeam1Setting();
			var controlId = this.setting('seat1Team');
			var label = 'Team One';
			var controlVars = {
				id: controlId,
				label: label,
				value: this.matchup.seat1Team || ''
			};
			var controlData = {
				content: this.template('input_text', controlVars),
				label: label,
				settings: { 'default': this.setting('seat1Team') },
				type: 'text',
				active: true
			};
			var constructor = this.api.controlConstructor[controlData.type];
			this.controls[controlId] = new this.api.Control(controlId, {
				params: controlData,
				previewer: this.api.previewer
			});
			this.api.control.add(controlId, this.controls[controlId]);
			this.controls[controlId].section(this.section.id);
			this.controls[controlId].activate();
			return this.controls[controlId];
		}
	}, {
		key: 'createTeam1SeedSetting',
		value: function createTeam1SeedSetting() {
			var settingId = this.setting('seat1Seed');
			var settingValue = this.matchup.seat1Seed || '';
			this.api.create(settingId, settingId, settingValue, this.settingOpts());
		}
	}, {
		key: 'createTeam1SeedControl',
		value: function createTeam1SeedControl() {
			this.createTeam1SeedSetting();
			var controlId = this.setting('seat1Seed');
			var label = 'Team One Seed #';
			var controlVars = {
				id: controlId,
				label: label,
				value: this.matchup.seat1Seed || ''
			};
			var controlData = {
				content: this.template('input_number', controlVars),
				label: label,
				settings: { 'default': this.setting('seat1Seed') },
				type: 'number',
				active: true
			};
			var constructor = this.api.controlConstructor[controlData.type];
			this.controls[controlId] = new this.api.Control(controlId, {
				params: controlData,
				previewer: this.api.previewer
			});
			this.api.control.add(controlId, this.controls[controlId]);
			this.controls[controlId].section(this.section.id);
			this.controls[controlId].activate();
			return this.controls[controlId];
		}
	}, {
		key: 'createTeam1LogoSetting',
		value: function createTeam1LogoSetting() {
			var settingId = this.setting('seat1Logo');
			var settingValue = '';
			this.api.create(settingId, settingId, settingValue, this.settingOpts());
		}
	}, {
		key: 'createTeam1LogoControl',
		value: function createTeam1LogoControl() {
			this.createTeam1LogoSetting();
			var controlId = 'seat1Logo';
			var label = 'Team 1 Logo';
			var controlData = {
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
			var constructor = this.api.controlConstructor[controlData.type];
			this.controls[controlId] = new constructor(controlId, {
				params: controlData,
				previewer: this.api.previewer
			});
			this.api.control.add(controlId, this.controls[controlId]);
			this.controls[controlId].section(this.section.id);
			this.controls[controlId].activate();
			return this.controls[controlId];
		}
	}, {
		key: 'createTeam1WinnerSetting',
		value: function createTeam1WinnerSetting() {
			var settingId = this.setting('seat1Winner');
			var settingValue = this.matchup.seat1Winner || '';
			this.api.create(settingId, settingId, settingValue, this.settingOpts());
		}
	}, {
		key: 'createTeam1WinnerControl',
		value: function createTeam1WinnerControl() {
			this.createTeam1WinnerSetting();
			var controlId = this.setting('seat1Winner');
			var label = 'Team One Won this Matchup';
			var controlVars = {
				id: controlId,
				label: label,
				value: this.matchup.seat1Winner || ''
			};
			var controlData = {
				content: this.template('input_checkbox', controlVars),
				label: label,
				settings: { 'default': this.setting('seat1Winner') },
				type: 'checkbox',
				active: true
			};
			var constructor = this.api.controlConstructor[controlData.type];
			this.controls[controlId] = new this.api.Control(controlId, {
				params: controlData,
				previewer: this.api.previewer
			});
			this.api.control.add(controlId, this.controls[controlId]);
			this.controls[controlId].section(this.section.id);
			this.controls[controlId].activate();
			return this.controls[controlId];
		}
	}, {
		key: 'createTeam2Setting',
		value: function createTeam2Setting() {
			var settingId = this.setting('seat2Team');
			var settingValue = this.matchup.seat2Team || '';
			this.api.create(settingId, settingId, settingValue, this.settingOpts());
		}
	}, {
		key: 'createTeam2Control',
		value: function createTeam2Control() {
			this.createTeam2Setting();
			var controlId = this.setting('seat2Team');
			var label = 'Team Two';
			var controlVars = {
				id: controlId,
				label: label,
				value: this.matchup.seat2Team || ''
			};
			var controlData = {
				content: this.template('input_text', controlVars),
				label: label,
				settings: { 'default': this.setting('seat2Team') },
				type: 'text',
				active: true
			};
			var constructor = this.api.controlConstructor[controlData.type];
			this.controls[controlId] = new this.api.Control(controlId, {
				params: controlData,
				previewer: this.api.previewer
			});
			this.api.control.add(controlId, this.controls[controlId]);
			this.controls[controlId].section(this.section.id);
			this.controls[controlId].activate();
			return this.controls[controlId];
		}
	}, {
		key: 'createTeam2SeedSetting',
		value: function createTeam2SeedSetting() {
			var settingId = this.setting('seat2Seed');
			var settingValue = this.matchup.seat2Seed || '';
			this.api.create(settingId, settingId, settingValue, this.settingOpts());
		}
	}, {
		key: 'createTeam2SeedControl',
		value: function createTeam2SeedControl() {
			this.createTeam2SeedSetting();
			var controlId = this.setting('seat2Seed');
			var label = 'Team Two Seed #';
			var controlVars = {
				id: controlId,
				label: label,
				value: this.matchup.seat1Seed || ''
			};
			var controlData = {
				content: this.template('input_text', controlVars),
				label: label,
				settings: { 'default': this.setting('seat2Seed') },
				type: 'number',
				active: true
			};
			var constructor = this.api.controlConstructor[controlData.type];
			this.controls[controlId] = new this.api.Control(controlId, {
				params: controlData,
				previewer: this.api.previewer
			});
			this.api.control.add(controlId, this.controls[controlId]);
			this.controls[controlId].section(this.section.id);
			this.controls[controlId].activate();
			return this.controls[controlId];
		}
	}, {
		key: 'createTeam2LogoSetting',
		value: function createTeam2LogoSetting() {
			var settingId = this.setting('seat2Logo');
			var settingValue = '';
			this.api.create(settingId, settingId, settingValue, this.settingOpts());
		}
	}, {
		key: 'createTeam2LogoControl',
		value: function createTeam2LogoControl() {
			this.createTeam2LogoSetting();
			var controlId = 'seat2Logo';
			var label = 'Team 2 Logo';
			var controlData = {
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
			var constructor = this.api.controlConstructor[controlData.type];
			this.controls[controlId] = new constructor(controlId, {
				params: controlData,
				previewer: this.api.previewer
			});
			this.api.control.add(controlId, this.controls[controlId]);
			this.controls[controlId].section(this.section.id);
			this.controls[controlId].activate();
			return this.controls[controlId];
		}
	}, {
		key: 'createTeam2WinnerSetting',
		value: function createTeam2WinnerSetting() {
			var settingId = this.setting('seat2Winner');
			var settingValue = this.matchup.seat2Winner || '';
			this.api.create(settingId, settingId, settingValue, this.settingOpts());
		}
	}, {
		key: 'createTeam2WinnerControl',
		value: function createTeam2WinnerControl() {
			this.createTeam2WinnerSetting();
			var controlId = this.setting('seat2Winner');
			var label = 'Team Two Won this Matchup';
			var controlVars = {
				id: controlId,
				label: label,
				value: this.matchup.seat2Winner || ''
			};
			var controlData = {
				content: this.template('input_checkbox', controlVars),
				label: label,
				settings: { 'default': this.setting('seat2Winner') },
				type: 'checkbox',
				active: true
			};
			var constructor = this.api.controlConstructor[controlData.type];
			this.controls[controlId] = new this.api.Control(controlId, {
				params: controlData,
				previewer: this.api.previewer
			});
			this.api.control.add(controlId, this.controls[controlId]);
			this.controls[controlId].section(this.section.id);
			this.controls[controlId].activate();
			return this.controls[controlId];
		}
	}, {
		key: 'createArticleIdSetting',
		value: function createArticleIdSetting() {
			var settingId = this.setting('articleId');
			var settingValue = this.matchup.articleId || '';
			this.api.create(settingId, settingId, settingValue, this.settingOpts());
		}
	}, {
		key: 'createArticleIdControl',
		value: function createArticleIdControl() {
			this.createArticleIdSetting();
			var controlId = this.setting('articleId');
			var label = 'Select Article';
			var controlVars = {
				id: controlId,
				label: label,
				value: this.matchup.articleId || '',
				options: window.wp_bracket.dropdownPosts
			};
			var controlData = {
				content: this.template('select', controlVars),
				label: label,
				settings: { 'default': this.setting('articleId') },
				type: 'select',
				active: true
			};
			var constructor = this.api.controlConstructor[controlData.type];
			this.controls[controlId] = new this.api.Control(controlId, {
				params: controlData,
				previewer: this.api.previewer
			});
			this.api.control.add(controlId, this.controls[controlId]);
			this.controls[controlId].section(this.section.id);
			this.controls[controlId].activate();
			return this.controls[controlId];
		}
	}, {
		key: 'createMainVideoSetting',
		value: function createMainVideoSetting() {
			var settingId = this.setting('mainVideo');
			var settingValue = this.matchup.mainVideo || '';
			this.api.create(settingId, settingId, settingValue, this.settingOpts());
		}
	}, {
		key: 'createMainVideoControl',
		value: function createMainVideoControl() {
			this.createMainVideoSetting();
			var controlId = this.setting('mainVideo');
			var label = 'Main Video Embed URL';
			var controlVars = {
				id: controlId,
				label: label,
				value: this.matchup.mainVideo || ''
			};
			var controlData = {
				content: this.template('input_text', controlVars),
				label: label,
				settings: { 'default': this.setting('mainVideo') },
				type: 'text',
				active: true
			};
			var constructor = this.api.controlConstructor[controlData.type];
			this.controls[controlId] = new this.api.Control(controlId, {
				params: controlData,
				previewer: this.api.previewer
			});
			this.api.control.add(controlId, this.controls[controlId]);
			this.controls[controlId].section(this.section.id);
			this.controls[controlId].activate();
			return this.controls[controlId];
		}
	}, {
		key: 'createSupplementalVideo1Setting',
		value: function createSupplementalVideo1Setting() {
			var settingId = this.setting('supplementalVideo1');
			var settingValue = this.matchup.supplementalVideo1 || '';
			this.api.create(settingId, settingId, settingValue, this.settingOpts());
		}
	}, {
		key: 'createSupplementalVideo1Control',
		value: function createSupplementalVideo1Control() {
			this.createSupplementalVideo1Setting();
			var controlId = this.setting('supplementalVideo1');
			var label = 'Supplemental Video Embed URL';
			var controlVars = {
				id: controlId,
				label: label,
				value: this.matchup.supplementalVideo1 || ''
			};
			var controlData = {
				content: this.template('input_text', controlVars),
				label: label,
				settings: { 'default': this.setting('supplementalVideo1') },
				type: 'text',
				active: true
			};
			var constructor = this.api.controlConstructor[controlData.type];
			this.controls[controlId] = new this.api.Control(controlId, {
				params: controlData,
				previewer: this.api.previewer
			});
			this.api.control.add(controlId, this.controls[controlId]);
			this.controls[controlId].section(this.section.id);
			this.controls[controlId].activate();
			return this.controls[controlId];
		}
	}, {
		key: 'createSupplementalVideo2Setting',
		value: function createSupplementalVideo2Setting() {
			var settingId = this.setting('supplementalVideo2');
			var settingValue = this.matchup.supplementalVideo2 || '';
			this.api.create(settingId, settingId, settingValue, this.settingOpts());
		}
	}, {
		key: 'createSupplementalVideo2Control',
		value: function createSupplementalVideo2Control() {
			this.createSupplementalVideo2Setting();
			var controlId = this.setting('supplementalVideo2');
			var label = 'Supplemental Video Embed URL';
			var controlVars = {
				id: controlId,
				label: label,
				value: this.matchup.supplementalVideo2 || ''
			};
			var controlData = {
				content: this.template('input_text', controlVars),
				label: label,
				settings: { 'default': this.setting('supplementalVideo2') },
				type: 'text',
				active: true
			};
			var constructor = this.api.controlConstructor[controlData.type];
			this.controls[controlId] = new this.api.Control(controlId, {
				params: controlData,
				previewer: this.api.previewer
			});
			this.api.control.add(controlId, this.controls[controlId]);
			this.controls[controlId].section(this.section.id);
			this.controls[controlId].activate();
			return this.controls[controlId];
		}
	}]);

	return MatchSectionControls;
}(__WEBPACK_IMPORTED_MODULE_0__SectionControls__["a" /* default */]);



/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SectionControls__ = __webpack_require__(106);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoundSectionControls; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var RoundSectionControls = function (_SectionControls) {
	_inherits(RoundSectionControls, _SectionControls);

	function RoundSectionControls(api, sectionId, round) {
		var _ret;

		_classCallCheck(this, RoundSectionControls);

		var _this = _possibleConstructorReturn(this, (RoundSectionControls.__proto__ || Object.getPrototypeOf(RoundSectionControls)).call(this, api, sectionId));

		_this.round = round;
		_this.sectionId = 'wp_bracket_round_' + sectionId;
		_this.settings_base = 'wp_bracket_round_' + sectionId + '_';
		var sectionVars = {
			'title': _this.round.title + ' (' + _this.round.position + ')' || _this.round.ordinal + ' round from the ' + _this.round.position,
			'id': _this.sectionId
		};
		var sectionContent = _this.template('round_section', sectionVars);
		var sectionData = {
			content: sectionContent,
			active: true,
			type: 'default',
			priority: 180 - parseInt(_this.round.uid)
		};
		_this.section = new wp.customize.Section(_this.sectionId, { params: sectionData });
		_this.api.section.add(_this.sectionId, _this.section);
		return _ret = _this, _possibleConstructorReturn(_this, _ret);
	}

	_createClass(RoundSectionControls, [{
		key: 'setting',
		value: function setting(slug) {
			return this.settings_base + '_' + slug;
		}
	}, {
		key: 'settingOpts',
		value: function settingOpts() {
			return {
				transport: 'postMessage',
				previewer: this.api.previewer,
				type: 'wp_bracket'
			};
		}
	}, {
		key: 'createControls',
		value: function createControls() {
			this.createTitleControl();
			this.createSubTitleControl();
			this.createSponsorControl();
			this.createSponsorLinkControl();
			if (this.round.uid == 0) {
				this.createPromoControl();
			}
			if (this.round.quadrantTop || this.round.quadrantBottom) {
				this.createQuadrantTopControl();
				this.createQuadrantBottomControl();
			}
		}
	}, {
		key: 'createTitleSetting',
		value: function createTitleSetting() {
			var settingId = this.setting('title');
			var settingValue = this.round.title || '';
			this.api.create(settingId, settingId, settingValue, this.settingOpts());
		}
	}, {
		key: 'createTitleControl',
		value: function createTitleControl() {
			this.createTitleSetting();
			var controlId = this.setting('title');
			var label = 'Round Title';
			var controlVars = {
				id: controlId,
				label: label,
				value: this.round.title || ''
			};
			var controlData = {
				content: this.template('input_text', controlVars),
				label: label,
				settings: { 'default': this.setting('title') },
				type: 'text',
				active: true,
				priority: 10
			};
			var constructor = this.api.controlConstructor[controlData.type];
			this.controls[controlId] = new this.api.Control(controlId, {
				params: controlData,
				previewer: this.api.previewer
			});
			this.api.control.add(controlId, this.controls[controlId]);
			this.controls[controlId].section(this.section.id);
			this.controls[controlId].activate();
			return this.controls[controlId];
		}
	}, {
		key: 'createSubTitleSetting',
		value: function createSubTitleSetting() {
			var settingId = this.setting('subtitle');
			var settingValue = this.round.subtitle || '';
			this.api.create(settingId, settingId, settingValue, this.settingOpts());
		}
	}, {
		key: 'createSubTitleControl',
		value: function createSubTitleControl() {
			this.createSubTitleSetting();
			var controlId = this.setting('subtitle');
			var label = 'Round Subtitle/Date';
			var controlVars = {
				id: controlId,
				label: 'Round Subtext (Date/Venue)',
				value: this.round.subtitle || ''
			};
			var controlData = {
				content: this.template('input_text', controlVars),
				label: label,
				settings: { 'default': this.setting('subtitle') },
				type: 'text',
				active: true,
				priority: 20
			};
			this.controls[controlId] = new this.api.Control(controlId, {
				params: controlData,
				previewer: this.api.previewer
			});
			this.api.control.add(controlId, this.controls[controlId]);
			this.controls[controlId].section(this.section.id);
			this.controls[controlId].activate();
			return this.controls[controlId];
		}
	}, {
		key: 'createPromoSetting',
		value: function createPromoSetting() {
			var settingId = this.setting('promo');
			var settingValue = '';
			this.api.create(settingId, settingId, settingValue, this.settingOpts());
		}
	}, {
		key: 'createPromoControl',
		value: function createPromoControl() {
			this.createPromoSetting();
			var controlId = 'promo';
			var label = 'Main Promo';
			var controlData = {
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
			var constructor = this.api.controlConstructor[controlData.type];
			this.controls[controlId] = new constructor(controlId, {
				params: controlData,
				previewer: this.api.previewer
			});
			this.api.control.add(controlId, this.controls[controlId]);
			this.controls[controlId].section(this.section.id);
			this.controls[controlId].activate();
			return this.controls[controlId];
		}
	}, {
		key: 'createSponsorSetting',
		value: function createSponsorSetting() {
			var settingId = this.setting('sponsor');
			var settingValue = '';
			this.api.create(settingId, settingId, settingValue, this.settingOpts());
		}
	}, {
		key: 'createSponsorControl',
		value: function createSponsorControl() {
			this.createSponsorSetting();
			var controlId = 'sponsor';
			var label = 'Round Sponsor';
			var controlData = {
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
				priority: 100
			};
			var constructor = this.api.controlConstructor[controlData.type];
			this.controls[controlId] = new constructor(controlId, {
				params: controlData,
				previewer: this.api.previewer
			});
			this.api.control.add(controlId, this.controls[controlId]);
			this.controls[controlId].section(this.section.id);
			this.controls[controlId].activate();
			return this.controls[controlId];
		}
	}, {
		key: 'createSponsorLinkSetting',
		value: function createSponsorLinkSetting() {
			var settingId = this.setting('sponsorLink');
			var settingValue = this.round.sponsorLink || '';
			this.api.create(settingId, settingId, settingValue, this.settingOpts());
		}
	}, {
		key: 'createSponsorLinkControl',
		value: function createSponsorLinkControl() {
			this.createSponsorLinkSetting();
			var controlId = this.setting('sponsorLink');
			var label = 'Round Sponsor Link';
			var controlVars = {
				id: controlId,
				label: label,
				value: this.round.sponsorLink || ''
			};
			var controlData = {
				content: this.template('input_text', controlVars),
				label: label,
				settings: { 'default': this.setting('sponsorLink') },
				type: 'text',
				active: true,
				priority: 120
			};
			var constructor = this.api.controlConstructor[controlData.type];
			this.controls[controlId] = new this.api.Control(controlId, {
				params: controlData,
				previewer: this.api.previewer
			});
			this.api.control.add(controlId, this.controls[controlId]);
			this.controls[controlId].section(this.section.id);
			this.controls[controlId].activate();
			return this.controls[controlId];
		}
	}, {
		key: 'createQuadrantTopSetting',
		value: function createQuadrantTopSetting() {
			var settingId = this.setting('quadrantTop');
			var settingValue = this.round.quadrantTop || '';
			this.api.create(settingId, settingId, settingValue, this.settingOpts());
		}
	}, {
		key: 'createQuadrantTopControl',
		value: function createQuadrantTopControl() {
			this.createQuadrantTopSetting();
			var controlId = this.setting('quadrantTop');
			var label = 'Conference Label Top';
			var controlVars = {
				id: controlId,
				label: label,
				value: this.round.quadrantTop || ''
			};
			var controlData = {
				content: this.template('input_text', controlVars),
				label: label,
				settings: { 'default': this.setting('quadrantTop') },
				type: 'text',
				active: true,
				priority: 10
			};
			var constructor = this.api.controlConstructor[controlData.type];
			this.controls[controlId] = new this.api.Control(controlId, {
				params: controlData,
				previewer: this.api.previewer
			});
			this.api.control.add(controlId, this.controls[controlId]);
			this.controls[controlId].section(this.section.id);
			this.controls[controlId].activate();
			return this.controls[controlId];
		}
	}, {
		key: 'createQuadrantBottomSetting',
		value: function createQuadrantBottomSetting() {
			var settingId = this.setting('quadrantBottom');
			var settingValue = this.round.quadrantBottom || '';
			this.api.create(settingId, settingId, settingValue, this.settingOpts());
		}
	}, {
		key: 'createQuadrantBottomControl',
		value: function createQuadrantBottomControl() {
			this.createQuadrantBottomSetting();
			var controlId = this.setting('quadrantBottom');
			var label = 'Conference Label Bottom';
			var controlVars = {
				id: controlId,
				label: label,
				value: this.round.quadrantBottom || ''
			};
			var controlData = {
				content: this.template('input_text', controlVars),
				label: label,
				settings: { 'default': this.setting('quadrantBottom') },
				type: 'text',
				active: true,
				priority: 10
			};
			var constructor = this.api.controlConstructor[controlData.type];
			this.controls[controlId] = new this.api.Control(controlId, {
				params: controlData,
				previewer: this.api.previewer
			});
			this.api.control.add(controlId, this.controls[controlId]);
			this.controls[controlId].section(this.section.id);
			this.controls[controlId].activate();
			return this.controls[controlId];
		}
	}]);

	return RoundSectionControls;
}(__WEBPACK_IMPORTED_MODULE_0__SectionControls__["a" /* default */]);



/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Templates = {

	round_section: function round_section() {
		return '\n\t\t\t<li id="accordion-section-' + this.id + '"\n\t\t\t\tclass="accordion-section control-section control-section-default">\n\t\t\t\t<h3 class="accordion-section-title" tabindex="0">\n\t\t\t\t\t' + this.title + '\n\t\t\t\t\t<span class="screen-reader-text">Press return or enter to open</span>\n\t\t\t\t</h3>\n\t\t\t\t<ul class="accordion-section-content">\n\t\t\t\t\t<li class="customize-section-description-container">\n\t\t\t\t\t\t<div class="customize-section-title">\n\t\t\t\t\t\t\t<button class="customize-section-back" tabindex="-1">\n\t\t\t\t\t\t\t\t<span class="screen-reader-text">Back</span>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t<h3>\n\t\t\t\t\t\t\t\t<span class="customize-action">Customizing &#9656; ' + this.title + '</span>\n\t\t\t\t\t\t\t\t' + this.title + '\n\t\t\t\t\t\t\t</h3>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</li>\n\t\t';
	},

	input_text: function input_text() {
		return '\n\t\t<li id="customize-control-' + this.id + '" class="customize-control customize-control-text" style="display: list-item;">\n\t\t\t<label>\n\t\t\t\t<span class="customize-control-title">' + this.label + '</span>\n\t\t\t\t<div class="customize-control-notifications-container" style="">\n\t\t\t\t\t<ul></ul>\n\t\t\t\t</div>\n\t\t\t\t<input type="text" value="' + this.value + '" data-customize-setting-link="' + this.id + '" />\n\t\t\t</label>\n\t\t</li>\n\t\t';
	},

	input_number: function input_number() {
		return '\n\t\t<li id="customize-control-' + this.id + '" class="customize-control customize-control-text" style="display: list-item;">\n\t\t\t<label>\n\t\t\t\t<span class="customize-control-title">' + this.label + '</span>\n\t\t\t\t<div class="customize-control-notifications-container" style="">\n\t\t\t\t\t<ul></ul>\n\t\t\t\t</div>\n\t\t\t\t<input type="number" value="' + this.value + '" data-customize-setting-link="' + this.id + '" />\n\t\t\t</label>\n\t\t</li>\n\t\t';
	},

	input_checkbox: function input_checkbox() {
		return '\n\t\t<li id="customize-control-' + this.id + '" class="customize-control customize-control-text" style="display: list-item;">\n\t\t\t<div class="customize-control-notifications-container" style="">\n\t\t\t\t<ul></ul>\n\t\t\t</div>\n\t\t\t<label>\n\t\t\t\t<input type="checkbox" value="' + this.value + '" data-customize-setting-link="' + this.id + '" />\n\t\t\t\t' + this.label + '\n\t\t\t</label>\n\t\t</li>\n\t\t';
	},

	select: function select() {
		var _this = this;

		var els = '';
		this.options.map(function (option) {
			if (option.value === _this.value) {
				els = els.concat('<option value="' + option.value + '" selected="selected">' + option.name + '</option>');
			} else {
				els = els.concat('<option value="' + option.value + '">' + option.name + '</option>');
			}
		});
		return '\n\t\t<li id="customize-control-' + this.id + '" class="customize-control customize-control-dropdown">\n\t\t\t<label>\n\t\t\t\t<span class="customize-control-title">' + this.label + '</span>\n\t\t\t\t<select data-customize-setting-link="' + this.id + '">\n\t\t\t\t<option value="0" selected=\'selected\'>&mdash; Select &mdash;</option>\n\t\t\t\t' + els + '\n\t\t\t</label>\n\t\t</li>\n\t\t';
	}
};

/* harmony default export */ __webpack_exports__["a"] = Templates;

/***/ }),

/***/ 565:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(104);
__webpack_require__(105);
module.exports = __webpack_require__(235);


/***/ })

},[565]);