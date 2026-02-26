import { useState } from 'react';

interface CounterProps {
  initialCount?: number;
}

export default function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <div className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border">
      <button
        onClick={() => setCount(count - 1)}
        className="w-10 h-10 bg-secondary text-white rounded-lg hover:bg-secondary-vivid transition-colors"
      >
        -
      </button>
      <span className="text-xl font-semibold text-foreground min-w-[3ch] text-center">
        {count}
      </span>
      <button
        onClick={() => setCount(count + 1)}
        className="w-10 h-10 bg-primary text-background rounded-lg hover:bg-primary-vivid transition-colors"
      >
        +
      </button>
    </div>
  );
}
