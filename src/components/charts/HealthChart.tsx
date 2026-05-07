import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from 'recharts';

const data = [
  { name: 'Óleo', value: 72, fill: '#0A84FF' },
  { name: 'Freios', value: 88, fill: '#38BDF8' },
  { name: 'Pneus', value: 64, fill: '#FACC15' },
  { name: 'Bateria', value: 91, fill: '#34D399' },
];

export default function HealthChart() {
  return (
    <div className="col-span-2 rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-lg shadow-black/20">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white">
          Diagnóstico visual
        </h2>

        <p className="text-sm text-slate-400">
          Saúde estimada dos principais componentes.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="25%"
              outerRadius="100%"
              data={data}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />

              <RadialBar
                background
                dataKey="value"
                cornerRadius={20}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 grid w-full grid-cols-2 gap-3">
          {data.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl bg-white/5 p-3"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: item.fill,
                  }}
                />

                <span className="text-sm text-slate-300">
                  {item.name}
                </span>
              </div>

              <strong className="mt-1 block text-lg text-white">
                {item.value}%
              </strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}