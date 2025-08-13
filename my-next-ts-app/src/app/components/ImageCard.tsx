const ImageCard = () => {
  return (
    <div className="card card-border-green">
      <h2 className="text-title text-center">Optimización de Imágenes</h2>
      <div className="flex justify-center">
        <img
          src="https://placehold.co/400x200/FFFFFF/000000?text=Optimized+Image"
          alt="Next.js Image Optimization"
          width={400}
          height={200}
          className="rounded-lg shadow-md"
        />
      </div>
      <p className="mt-4 text-center text-sm text-body">
        Next.js optimiza el tamaño y el formato de las imágenes automáticamente.
      </p>
    </div>
  );
};