import { Button } from "@/components/ui/button"

type ControlGroupProps<T extends string> = {
  label: string
  testId: string
  value: T
  options: readonly T[]
  onChange: (next: T) => void
}

export function ControlGroup<T extends string>({
  label,
  testId,
  value,
  options,
  onChange,
}: ControlGroupProps<T>) {
  return (
    <fieldset className="space-y-2" data-testid={testId}>
      <legend className="text-sm font-medium text-foreground">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option}
            type="button"
            size="sm"
            variant={value === option ? "default" : "outline"}
            data-testid={`${testId}-${option}`}
            aria-pressed={value === option}
            onClick={() => onChange(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </fieldset>
  )
}
