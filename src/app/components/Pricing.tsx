export default function Pricing() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-10">Precios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-bold text-blue-700 mb-2">Basic Surgery</h3>
            <p className="text-2xl font-semibold">$199</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-bold text-blue-700 mb-2">Teeth Whitening</h3>
            <p className="text-2xl font-semibold">$299</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-bold text-blue-700 mb-2">Heart Surgery</h3>
            <p className="text-2xl font-semibold">$399</p>
          </div>
        </div>
      </div>
    </section>
  );
}