export default function Hero() {
  return (
    <section className="bg-gray-100 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-700 mb-4">
            ¿Sabías que aún hay esperanza en etapas avanzadas del cáncer de pulmón?
          </h1>
          <p className="text-gray-600 mb-6">
            En CimerChile estamos realizando estudios clínicos, que busca ofrecer una alternativa de tratamiento para personas diagnosticadas con cáncer de pulmón en etapa IV.
          </p>
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded">Agenda</button>
            <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded">Estudios</button>
          </div>
        </div>
        <div className="w-full md:w-1/2 hidden md:block">
          <img src="/doctor.png" alt="Doctor" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </section>
  )
}
