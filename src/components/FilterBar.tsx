// src/components/FilterBar.jsx — filter switcher + remaining count + clear.
import { FILTERS } from "../lib/filter";

interface FilterBarProps {
  filter: string;
  onFilterChange: (filter: string) => void;
  remaining: number;
  onClearCompleted: () => void;
}

export default function FilterBar(props: FilterBarProps): React.JSX.Element {
  const { filter, onFilterChange, remaining, onClearCompleted } = props;

  return (
    <div className="filter-bar">
      <span className="filter-bar__count">{remaining} left</span>
      <div className="filter-bar__filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-bar__filter ${f === filter ? "is-active" : ""}`}
            onClick={() => onFilterChange(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <button className="filter-bar__clear" onClick={onClearCompleted}>
        Clear completed
      </button>
    </div>
  );
}