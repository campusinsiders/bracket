import React, { Component } from 'react';

export default class HeaderComponent extends Component {

	render() {
		return (
			<div className="header">
				<a className="header__logo" href="/">
					<img src="https://campusinsiders.com/wp-content/themes/stadium/vendor/lift/playbook/dist/assets/components/common/assets/campus-insiders-logo.svg" />
				</a>
			</div>
		);
	}
}
