import React, { useEffect, useState } from 'react';
import FilterPanel from './FilterPanel';

const RootContainer = ({ serviceUrl, entity }) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [selectedMinIndex, setSelectedMinIndex] = useState(0);
	const [typeList, setTypeList] = useState([]);
	const [selectedType, setSelectedType] = useState('');
	useEffect(() => {
		const classObj = Object.values(entity);
		const classList = Object.keys(entity);
		setTypeList(classList);
		setSelectedType(classList[0]);
		queryData(selectedMinIndex, classObj[0]);
	}, []);

	const queryData = (min, entity) => {
		setLoading(true);
		if (!fetch) fetch = window.fetch;
		fetch(
			`${serviceUrl}/service/lists/jaccard-index?ids=${entity.value}&type=${entity.class}&min=${min}`
		)
			.then(res => res.text())
			.then(data => {
				setLoading(false);
				const response = JSON.parse(data);
				setData(response.results);
			})
			.catch(() => setLoading(false));
	};

	return (
		<div className="rootContainer">
			<span className="chart-title">List Similarity Visualisation</span>
			{!loading ? (
				<>
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
					<FilterPanel
						selectedMinIndex={selectedMinIndex}
						typeList={typeList}
						selectedType={selectedType}
						changeMinIndex={e => setSelectedMinIndex(e.target.value)}
					/>
				</>
			) : (
				<h1>Loading</h1>
			)}
		</div>
	);
};

export default RootContainer;
