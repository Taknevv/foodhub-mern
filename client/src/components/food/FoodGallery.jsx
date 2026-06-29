export default function FoodGallery({ image, title }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <img
        src={
          image ||
          "https://via.placeholder.com/800x600?text=No+Image"
        }
        alt={title}
        className="w-full h-[500px] object-cover"
      />
    </div>
  );
}