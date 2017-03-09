import React, { Component } from 'react';

export default class HeaderComponent extends Component {

	render() {
		return (
			<div className="header">
				<div className="header__section header__section--left">
					<a className="header__link header__link--site" href="https://campusinsiders.com">Back to CampusInsiders.com</a>
				</div>
				<a className="header__logo" href="/">
					<img src="https://campusinsiders.com/wp-content/themes/stadium/vendor/lift/playbook/dist/assets/components/common/assets/campus-insiders-logo.svg"/>
				</a>
				<div className="header__section header__section--right">
					<a className="header__link header__link--news" href="https://campusinsiders.com/news/tag/ncaa-tournament-predictions/">NCAA Tourament News</a>
				</div>
			</div>
		);
	}
}
