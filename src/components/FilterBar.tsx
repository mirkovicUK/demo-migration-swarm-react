// src/components/FilterBar.tsx
import { FILTERS } from "../lib/filter";

export default function FilterBar(props: {
  filter: string;
  onFilterChange: (filter: string) => void;
  remaining: number;
  onClearCompleted: () => void;
}): React.JSX.Element {
  return (
    <div className="filter-bar">
      <span className="filter-bar__count">{props.remaining} left</span>
      <div className="filter-bar__filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-bar__filter ${f === props.filter ? "is-active" : ""}`}
            onClick={() => props.onFilterChange(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <button className="filter-bar__clear" onClick={props.onClearCompleted}>
        Clear completed
      </button>
    </div>
  );
}