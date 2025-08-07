export default function AppointmentForm() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">Book An Appointment</h2>
        <form className="bg-white p-6 rounded shadow space-y-4">
          <input type="text" placeholder="Name" className="w-full border p-2 rounded" />
          <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
          <input type="text" placeholder="Phone" className="w-full border p-2 rounded" />
          <textarea placeholder="Message" rows={4} className="w-full border p-2 rounded"></textarea>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
    </section>
  );
}