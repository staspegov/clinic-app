export default function Hero() {
  return (
    <section
      className="py-12 md:py-20 min-h-[300px] md:min-h-[auto]"
      style={{
        background: `
          radial-gradient(circle at 20% 30%, rgba(173, 216, 230, 0.4), transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(144, 238, 144, 0.4), transparent 50%),
          radial-gradient(circle at 50% 80%, rgba(0, 191, 165, 0.3), transparent 50%),
          #f8fafc
        `,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center h-full">
        
        {/* Texto */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4">
            ¿Sabías que aún hay esperanza en etapas avanzadas del cáncer de pulmón?
          </h1>
          <p className="text-gray-800 mb-6">
            <span className="font-bold">CIMER:</span> Comprometidos con tu salud y la investigación médica
          </p>
          <div className="flex space-x-4">
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg shadow-md text-sm md:text-base">
              Evaluación gratuita
            </button>
            <button className="border border-blue-700 text-blue-700 hover:bg-blue-50 px-6 py-2 rounded-lg shadow-md text-sm md:text-base">
              Postular a un estudio
            </button>
          </div>
        </div>

        {/* Imagen */}
        <div className="w-full md:w-1/2 hidden md:block">
          <img
            src="/doctor.png"
            alt="Doctor"
            className="rounded-lg shadow-lg"
          />
        </div>

      </div>
    </section>
  );
}
