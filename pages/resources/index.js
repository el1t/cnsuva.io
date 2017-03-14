import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
// import Link from '../../components/Link';
import s from './styles.css';
import { title, html } from './index.md';

class ResourcesPage extends React.Component {

	static propTypes = {
		resources: PropTypes.array.isRequired,
	};

	componentDidMount() {
		document.title = title;
	}

	render() {
		const jumpList = this.props.resources.map(category => category.title.toLowerCase().replace(' ', '-'));
		return (
			<Layout className={s.content}>
				{/*<div dangerouslySetInnerHTML={{ __html: html }}/>*/}
				<h3>Resources</h3>
				<nav className={s.nav}>
					{jumpList.map((category, i) =>
						<a key={i} href={`#${category}`} className="mdl-chip">
							<span className="mdl-chip__text">{this.props.resources[i].title}</span>
						</a>
					)}
				</nav>
				{this.props.resources.map((category, i) =>
					<Card key={i} name={jumpList[i]} className={s.card} title={category.title}>
						{category.sites.map((site, i) => (
							<a key={i} href={site.href} className={s.site} target="_blank">
								<h5>{site.name}</h5>
								<p>{site.desc}</p>
							</a>
						))}
					</Card>
				)}
				<p>
					<br /><br />
				</p>
			</Layout>
		);
	}

}

export default ResourcesPage;
