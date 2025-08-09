export default function Stats() {
  return (
    <section className="bg-blue-600 text-white py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
             <div>
          <p className="text-4xl font-bold">2,150+</p>
          <p className="text-sm mt-2">Pacientes Atendidos</p>
        </div>
        <div>
          <p className="text-4xl font-bold">120+</p>
          <p className="text-sm mt-2">Estudios Realizados</p>
        </div>
        <div>
          <p className="text-4xl font-bold">15+</p>
          <p className="text-sm mt-2">Años de Experiencia</p>
        </div>
        <div>
          <p className="text-4xl font-bold">5</p>
          <p className="text-sm mt-2">Sedes de CIMER</p>
        </div>
      </div>
    </section>
  );
}
