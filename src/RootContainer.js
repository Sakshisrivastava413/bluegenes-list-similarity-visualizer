import React, { useEffect, useState } from 'react';

const RootContainer = ({ serviceUrl, entity }) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	useEffect(() => {
		setLoading(true);
		if (!fetch) fetch = window.fetch;
		fetch(
			`${serviceUrl}/service/lists/jaccard-index?ids=${entity.value}&type=${entity.class}`
		)
			.then(res => res.text())
			.then(data => {
				setLoading(false);
				const response = JSON.parse(data);
				setData(response.results);
			})
			.catch(() => setLoading(false));
	}, []);
	return (
		!loading &&
		data.length && (
			<div className="rootContainer">
				<h1>Your Data Viz Here</h1>
			</div>
		)
	);
};

export default RootContainer;
