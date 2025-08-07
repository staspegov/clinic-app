export default function Stats() {
  return (
    <section className="bg-blue-600 text-white py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <p className="text-4xl font-bold">3,456+</p>
          <p className="text-sm mt-2">Satisfied Patients</p>
        </div>
        <div>
          <p className="text-4xl font-bold">557+</p>
          <p className="text-sm mt-2">Expert Doctors</p>
        </div>
        <div>
          <p className="text-4xl font-bold">4,379+</p>
          <p className="text-sm mt-2">Successful Treatments</p>
        </div>
        <div>
          <p className="text-4xl font-bold">32</p>
          <p className="text-sm mt-2">Clinic Locations</p>
        </div>
      </div>
    </section>
  );
}
