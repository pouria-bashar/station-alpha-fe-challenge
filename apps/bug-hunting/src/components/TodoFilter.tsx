import { FilterType } from "../types/type";

interface FilterProps {
  value: FilterType;
  onChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

type FilterOption = {
  value: FilterType;
  label: string;
};

export default function TodoFilter({
  value,
  onChange,
  onClearCompleted,
}: FilterProps) {
  const filters: FilterOption[] = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div className="filter-buttons">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={value === filter.value ? "active" : ""}
        >
          {filter.label}
        </button>
      ))}
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear Completed
      </button>
    </div>
  );
}
