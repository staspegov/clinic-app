export default function News() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-10">Latest Medical News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded">
            <p className="text-blue-700 font-semibold">News Title One</p>
            <p className="text-gray-600">Short summary about medical innovation...</p>
          </div>
          <div className="p-4 border rounded">
            <p className="text-blue-700 font-semibold">News Title Two</p>
            <p className="text-gray-600">Updates on patient care and protocols...</p>
          </div>
          <div className="p-4 border rounded">
            <p className="text-blue-700 font-semibold">News Title Three</p>
            <p className="text-gray-600">Doctor interview on wellness practices...</p>
          </div>
        </div>
      </div>
    </section>
  );
}