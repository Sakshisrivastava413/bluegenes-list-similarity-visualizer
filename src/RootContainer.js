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
		<div className="rootContainer">
			<span className="chart-title">List Similarity Visualisation</span>
			{!loading ? (
				<div className="table">
					<table className="table-container">
						<tr>
							<th className="name">Name</th>
							<th className="value">Jaccard Value</th>
						</tr>
						{data.map(item => (
							<tr key={item}>
								<td>{Object.keys(item)}</td>
								<td>{Object.values(item)}</td>
							</tr>
						))}
					</table>
				</div>
			) : (
				<h1>Loading</h1>
			)}
		</div>
	);
};

export default RootContainer;
