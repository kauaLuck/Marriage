export function Progress({ value }: { value: number }) {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-[#efe6df]">
      <div
        className="h-full rounded-full bg-gradient-to-r from-caramel via-mocha to-olive transition-all duration-700"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
