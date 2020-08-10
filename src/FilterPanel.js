import React from 'react';

const FilterPanel = ({
	selectedMinIndex,
	typeList,
	selectedType,
	changeMinIndex
}) => (
	<div className="filter-panel-root">
		<div className="filter-panel-title">Filter Panel</div>
		<div className="filter-panel">
			<div className="filter-container">
				<div className="jaccard-filter side">
					Min Jaccard Index
					<div className="filter-option">
						{[0, 0.05, 0.1, 0.5].map(term => (
							<div
								className={
									selectedMinIndex == term
										? 'option selected'
										: 'option not-selected'
								}
								key={term}
							>
								<input
									type="checkbox"
									id={term}
									value={term}
									onChange={changeMinIndex}
									checked={selectedMinIndex == term}
								/>
								<label htmlFor={term}>{term}</label>
							</div>
						))}
					</div>
				</div>
				<div className="jaccard-filter">
					Type
					<div className="filter-option">
						{typeList.map(term => (
							<div
								className={
									selectedType === term
										? 'option selected'
										: 'option not-selected'
								}
								key={term}
							>
								<input
									type="radio"
									id={term}
									value={term}
									checked={selectedType === term}
								/>
								<label htmlFor={term}>{term}</label>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default FilterPanel;
