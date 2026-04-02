export default function Stats() {
  const stats = [
    {
      value: '3.5M',
      label: 'Fermerlar',
      desc: 'O\'zbekistonda faol ishlayotgan dehqonlar'
    },
    {
      value: '65%',
      label: 'Smartfonlar',
      desc: 'Fermerlar orasida zamonaviy smartfonlar ulushi'
    },
    {
      value: '$7B',
      label: 'Bozor hajmi',
      desc: 'Qishloq xo\'jaligi bozorining umumiy hajmi'
    }
  ];

  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">{stat.label}</p>
              <p className="text-sm text-muted-foreground/60 mt-2">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
