import React, { useEffect, useState } from 'react';
import FilterPanel from './FilterPanel';
import Loading from './Loading';

const RootContainer = ({ serviceUrl, entity }) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [selectedMinIndex, setSelectedMinIndex] = useState(0);
	const [typeList, setTypeList] = useState([]);
	const [selectedType, setSelectedType] = useState({});

	useEffect(() => {
		const classObj = Object.values(entity);
		setTypeList(classObj);
		if (classObj.length) {
			setSelectedType(classObj[0]);
			queryData(selectedMinIndex, classObj[0]);
		}
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

	const changeMinIndex = e => {
		const { value } = e.target;
		setSelectedMinIndex(value);
		queryData(value, selectedType);
	};

	const changeType = e => {
		const { value } = e.target;
		const type = JSON.parse(value);
		setSelectedType(type);
		queryData(selectedMinIndex, type);
	};

	return (
		<div className="rootContainer">
			<span className="chart-title">List Similarity Visualisation</span>
			{!loading ? (
				<>
					{data && data.length && typeList.length ? (
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
						<div className="no-data">No Data Found!</div>
					)}
					{typeList.length ? (
						<FilterPanel
							selectedMinIndex={selectedMinIndex}
							typeList={typeList}
							selectedType={selectedType}
							changeMinIndex={changeMinIndex}
							changeType={changeType}
						/>
					) : (
						<></>
					)}
				</>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default RootContainer;
