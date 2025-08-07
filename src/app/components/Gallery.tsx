export default function Gallery() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-10">Clinic Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="/doctor.png" alt="Gallery1" className="rounded" />
          <img src="/doctor.png" alt="Gallery2" className="rounded" />
          <img src="/doctor.png" alt="Gallery3" className="rounded" />
          <img src="/doctor.png" alt="Gallery4" className="rounded" />
        </div>
      </div>
    </section>
  );
}