export default function Button({ children }) {
  return (
    <button className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:bg-blue-500">
      {children}
    </button>
  );
}