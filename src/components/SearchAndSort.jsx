const SearchAndSort = ({
	searchItem,
	setSearchItem,
	sortOption,
	setSortOption,
	searchPlaceholder = "Search...",
}) => {
	return (
		<div className="search">
			<input
				type="text"
				placeholder={searchPlaceholder}
				value={searchItem}
				onChange={(e) => setSearchItem(e.target.value)}
			/>

			<select
				className="sort"
				value={sortOption}
				onChange={(e) => setSortOption(e.target.value)}
			>
				<option value="">Sort by</option>
				<option value="name-asc">Name A-Z</option>
				<option value="name-desc">Name Z-A</option>
				<option value="price-asc">Price low - high</option>
				<option value="price-desc">Price high - low</option>
			</select>
		</div>
	);
};

export default SearchAndSort;
