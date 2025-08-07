export default function Services() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-10">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">General Medical Care</h3>
            <p className="text-gray-600">Routine checkups and internal medicine services.</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Advanced Dental Surgery</h3>
            <p className="text-gray-600">Modern dental treatments and procedures.</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Eye & Vision Care</h3>
            <p className="text-gray-600">Specialized care for your eye health and vision.</p>
          </div>
        </div>
      </div>
    </section>
  );
}