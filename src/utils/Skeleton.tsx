export function FlightSkeleton() {
  return (
    <div className="mt-6 bg-white rounded-lg shadow p-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-4 border-b last:border-none">
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
          <div className="h-4 bg-gray-300 rounded w-20" />
          <div className="h-4 bg-gray-300 rounded w-20" />
          <div className="h-4 bg-gray-300 rounded w-16" />
          <div className="h-4 bg-gray-300 rounded w-16" />
          <div className="h-4 bg-gray-400 rounded w-16" />
        </div>
      ))}
    </div>
  );
}
