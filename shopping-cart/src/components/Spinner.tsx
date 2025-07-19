export default function Spinner() {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50"
      role="status"
      aria-label="Loading"
    >
      <div className="relative">
        <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>

        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-orange-400 rounded-full animate-spin animate-reverse"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
