export default function Features() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-6">Dedicated To Caring For You & Your Family</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-2">24/7 Emergency Help</h3>
            <p className="text-gray-600">We're always here when you need us the most.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Comprehensive Checkups</h3>
            <p className="text-gray-600">Full assessments to detect early health risks.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Convenient Scheduling</h3>
            <p className="text-gray-600">Flexible nice appointments that work with your schedule.</p>
          </div>
        </div>
      </div>
    </section>
  )
}