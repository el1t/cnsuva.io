/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import Button from '../Button';
import s from './Card.css';

class Card extends React.Component {

	static propTypes = {
		component: PropTypes.oneOf([
			PropTypes.string,
			PropTypes.element,
			PropTypes.func,
		]),
		className: PropTypes.string,
		title: PropTypes.string,
		children: PropTypes.node,
	};

	render() {
		const {
			component, className, name, title, children, ...other
		} = this.props;
		return (
			<div className={cx('mdl-card mdl-shadow--2dp', className)}>
				{title && <div className="mdl-card__title">
					<a name={name}><h2 className="mdl-card__title-text">{title}</h2></a>
				</div>}
				<div className="mdl-card__supporting-text">
					{children}
				</div>
				{title && <div className="mdl-card__menu">
					<Button type="icon">
						<a href={`#${name}`} className={`material-icons ${s.icon}`}>link</a>
					</Button>
				</div>}
			</div>
		);
	}

}

export default Card;
