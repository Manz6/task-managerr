export default function TaskFilters({ filters, onFilterChange }) {
  const handleStatusChange = (e) => {
    onFilterChange({ ...filters, status: e.target.value });
  };

  const handleDueDateFilterChange = (e) => {
    onFilterChange({ ...filters, dueDateFilter: e.target.value });
  };

  const clearFilters = () => {
    onFilterChange({ status: "All", dueDateFilter: "All" });
  };

  const hasActiveFilters = filters.status !== "All" || filters.dueDateFilter !== "All";

  return (
    <div className="filters-container">
      <div className="filters-header">
        <h4 className="filters-title">Filters</h4>
        {hasActiveFilters && (
          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear All
          </button>
        )}
      </div>
      
      <div className="filters-grid">
        <div className="filter-group">
          <label htmlFor="status-filter" className="filter-label">
            Status
          </label>
          <select
            id="status-filter"
            className="filter-select"
            value={filters.status}
            onChange={handleStatusChange}
          >
            <option value="All">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="due-date-filter" className="filter-label">
            Due Date
          </label>
          <select
            id="due-date-filter"
            className="filter-select"
            value={filters.dueDateFilter}
            onChange={handleDueDateFilterChange}
          >
            <option value="All">All Dates</option>
            <option value="Overdue">Overdue</option>
            <option value="Due Soon">Due Soon (≤2 days)</option>
            <option value="Upcoming">Upcoming</option>
            <option value="No Date">No Due Date</option>
          </select>
        </div>
      </div>
    </div>
  );
}

