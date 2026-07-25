// src/components/FilterBar.tsx — filter switcher + remaining count + clear.
import { FILTERS } from "../lib/filter";

export default function FilterBar({ filter, onFilterChange, remaining, onClearCompleted }: {
  filter: string;
  onFilterChange: (filter: string) => void;
  remaining: number;
  onClearCompleted: () => void;
}) {
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