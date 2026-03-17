// src/app/blog/loading.tsx
// Skeleton que Next.js muestra automáticamente mientras carga /blog.

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header placeholder */}
      <div className="h-16 bg-white border-b border-gray-200" />

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero skeleton */}
          <div className="text-center mb-12 animate-pulse">
            <div className="h-5 w-32 rounded-full bg-blue-100 mx-auto mb-4" />
            <div className="h-12 w-2/3 rounded-xl bg-gray-200 mx-auto mb-3" />
            <div className="h-5 w-1/2 rounded bg-gray-100 mx-auto" />
            <div className="mt-8 flex justify-center gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="h-8 w-8 rounded bg-gray-200 mx-auto mb-1" />
                  <div className="h-3 w-14 rounded bg-gray-100 mx-auto" />
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center gap-3">
              <div className="h-11 w-36 rounded-xl bg-blue-100" />
              <div className="h-11 w-28 rounded-xl bg-gray-200" />
            </div>
          </div>

          {/* Filter buttons skeleton */}
          <div className="flex gap-2 mb-8 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-20 rounded-full bg-gray-200" />
            ))}
          </div>

          {/* Cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse"
              >
                <div className="h-1 w-full bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="flex justify-between">
                    <div className="h-5 w-16 rounded-full bg-gray-200" />
                    <div className="h-4 w-20 rounded bg-gray-100" />
                  </div>
                  <div className="h-5 w-3/4 rounded bg-gray-200" />
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-gray-100" />
                    <div className="h-3 w-5/6 rounded bg-gray-100" />
                    <div className="h-3 w-4/6 rounded bg-gray-100" />
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gray-200" />
                      <div className="h-4 w-24 rounded bg-gray-200" />
                    </div>
                    <div className="h-4 w-16 rounded bg-gray-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
