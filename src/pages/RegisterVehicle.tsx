import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, ChevronDown, Fuel, Gauge, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusCard from '../components/cards/StatusCard';
import CarScene from '../components/vehicle/CarScene';

type VehicleData = {
  model: string;
  year: string;
  currentKm: string;
  averageConsumption: string;
  monthlyKm: string;
  fuelPrice: string;
};

function getSavedVehicle(): VehicleData | null {
  const savedVehicle = localStorage.getItem('autopulse_vehicle');

  if (!savedVehicle) {
    return null;
  }

  return JSON.parse(savedVehicle) as VehicleData;
}

export default function Home() {
  const [vehicle] = useState<VehicleData | null>(() => getSavedVehicle());

  const monthlyKm = Number(vehicle?.monthlyKm || 800);
  const averageConsumption = Number(vehicle?.averageConsumption || 10);
  const fuelPrice = Number(vehicle?.fuelPrice || 5.8);

  const monthlyFuelCost =
    averageConsumption > 0 ? (monthlyKm / averageConsumption) * fuelPrice : 0;

  const modelName = vehicle?.model || 'Ford Territory Titanium';
  const consumptionText = `${averageConsumption} km/L`;

  const fuelCostText = monthlyFuelCost.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <section>
      <div className="relative rounded-b-[2.5rem] bg-gradient-to-b from-[#07111F] via-[#003478] to-[#07111F] px-6 pb-8 pt-8 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-10 top-24 h-32 w-32 rounded-full bg-[#0A84FF] blur-3xl" />
          <div className="absolute right-8 top-52 h-24 w-24 rounded-full bg-blue-400 blur-3xl" />
        </div>

        <div className="relative z-10 mb-8 flex items-center justify-between">
          <button className="rounded-full border border-white/10 bg-white/10 p-3 text-[#0A84FF] backdrop-blur">
            <ChevronDown size={26} />
          </button>

          <h1 className="text-lg font-bold tracking-wide">AutoPulse</h1>

          <button className="rounded-full border border-white/10 bg-white/10 p-3 backdrop-blur">
            <Bell size={22} />
          </button>
        </div>

        <div className="relative z-10">
          <p className="text-sm text-blue-100">{modelName}</p>
          <h2 className="mt-1 text-2xl font-bold">Saúde do veículo</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 my-8"
        >
          <div className="h-56 w-full rounded-[2rem] border border-white/10 bg-white/5 shadow-inner backdrop-blur">
            <CarScene />
          </div>
        </motion.div>

        <div className="relative z-10 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/40" />

            <div>
              <p className="font-bold">Atenção leve no veículo</p>
              <p className="text-sm text-blue-100">
                Troca de óleo próxima e consumo acima da média.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex justify-between text-sm text-blue-100">
              <span>Score de saúde</span>
              <strong className="text-white">82%</strong>
            </div>

            <div className="h-3 rounded-full bg-white/10">
              <div className="h-3 w-[82%] rounded-full bg-[#0A84FF] shadow-lg shadow-blue-400/40" />
            </div>
          </div>
        </div>

        <Link
          to="/register"
          className="relative z-10 mt-5 block rounded-2xl bg-[#0A84FF] px-4 py-3 text-center font-bold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.02]"
        >
          {vehicle ? 'Editar veículo' : 'Cadastrar meu veículo'}
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 px-5 py-6">
        <StatusCard
          title="Combustível"
          value={`${fuelCostText}/mês`}
          description={`Estimativa baseada em ${monthlyKm} km.`}
          icon={Fuel}
          status="warning"
        />

        <StatusCard
          title="Consumo"
          value={consumptionText}
          description="Média cadastrada pelo usuário."
          icon={Gauge}
        />

        <StatusCard
          title="Manutenção"
          value="500 km"
          description="Até a próxima troca de óleo."
          icon={ShieldCheck}
          status="warning"
        />

        <StatusCard
          title="Status geral"
          value="Bom"
          description="Sem risco crítico detectado."
          icon={ShieldCheck}
        />
      </div>
    </section>
  );
}