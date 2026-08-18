const STATS = [
  { value: '1000+', label: 'Happy Patients' },
  { value: '15+', label: 'Years of Experience' },
  { value: '20+', label: 'Specialized Therapies' },
  { value: '100%', label: 'Natural & Safe' },
]

export function StatBanner() {
  return (
    <div className="grid grid-cols-2 gap-6 rounded-2xl bg-primary px-6 py-8 text-center text-cream sm:grid-cols-4">
      {STATS.map((stat) => (
        <div key={stat.label}>
          <div className="font-display text-3xl font-semibold">
            {stat.value}
          </div>
          <div className="mt-1 text-sm text-cream/80">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
