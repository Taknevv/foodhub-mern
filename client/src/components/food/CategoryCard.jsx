export default function CategoryCard({ emoji, title }) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-lg
      hover:shadow-2xl
      hover:-translate-y-3
      hover:scale-105
      transition-all
      duration-300
      cursor-pointer
      p-8
      text-center
      "
    >
      <div className="text-6xl">{emoji}</div>

      <h3 className="mt-5 font-bold text-xl">
        {title}
      </h3>

      <p className="text-gray-500 mt-2">
        Fresh & Delicious
      </p>
    </div>
  );
}