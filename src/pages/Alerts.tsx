import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Fuel,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

type VehicleData = {
  model: string;
  currentKm: string;
  averageConsumption: string;
  monthlyKm: string;
  fuelPrice: string;
  lastOilChangeKm: string;
  lastRevisionKm: string;
  lastTireChangeKm: string;
};

type AlertType = 'ok' | 'warning' | 'danger';

type AlertItem = {
  title: string;
  description: string;
  type: AlertType;
  icon: LucideIcon;
};

function getAlertColor(type: AlertType) {
  if (type === 'danger') {
    return 'bg-red-500/10 text-red-400 border-red-500/20';
  }

  if (type === 'warning') {
    return 'bg-yellow-400/10 text-yellow-300 border-yellow-400/20';
  }

  return 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20';
}

function generateAlerts(): AlertItem[] {
  const savedVehicle = localStorage.getItem('autopulse_vehicle');

  if (!savedVehicle) {
    return [
      {
        title: 'Nenhum veículo cadastrado',
        description:
          'Cadastre um veículo para receber diagnósticos automáticos.',
        type: 'warning',
        icon: Bell,
      },
    ];
  }

  const vehicle = JSON.parse(savedVehicle) as VehicleData;

  const currentKm = Number(vehicle.currentKm || 0);
  const lastOilChangeKm = Number(vehicle.lastOilChangeKm || 0);
  const lastRevisionKm = Number(vehicle.lastRevisionKm || 0);
  const lastTireChangeKm = Number(vehicle.lastTireChangeKm || 0);

  const averageConsumption = Number(vehicle.averageConsumption || 10);
  const monthlyKm = Number(vehicle.monthlyKm || 800);
  const fuelPrice = Number(vehicle.fuelPrice || 5.8);

  const oilRemaining = lastOilChangeKm + 10000 - currentKm;
  const revisionRemaining = lastRevisionKm + 10000 - currentKm;
  const tireRemaining = lastTireChangeKm + 40000 - currentKm;

  const monthlyFuelCost =
    averageConsumption > 0 ? (monthlyKm / averageConsumption) * fuelPrice : 0;

  const alerts: AlertItem[] = [];

  if (oilRemaining <= 0) {
    alerts.push({
      title: 'Troca de óleo vencida',
      description:
        'O veículo passou do limite recomendado para troca de óleo.',
      type: 'danger',
      icon: Wrench,
    });
  } else if (oilRemaining <= 1000) {
    alerts.push({
      title: 'Troca de óleo próxima',
      description: `Faltam aproximadamente ${oilRemaining} km para a troca.`,
      type: 'warning',
      icon: Wrench,
    });
  }

  if (revisionRemaining <= 0) {
    alerts.push({
      title: 'Revisão vencida',
      description: 'O veículo ultrapassou o prazo estimado de revisão.',
      type: 'danger',
      icon: AlertTriangle,
    });
  } else if (revisionRemaining <= 1000) {
    alerts.push({
      title: 'Revisão próxima',
      description: `Faltam aproximadamente ${revisionRemaining} km para a revisão.`,
      type: 'warning',
      icon: AlertTriangle,
    });
  }

  if (tireRemaining <= 3000) {
    alerts.push({
      title: 'Pneus próximos do limite',
      description: 'Verifique desgaste e condições dos pneus.',
      type: 'warning',
      icon: AlertTriangle,
    });
  }

  if (monthlyFuelCost >= 1200) {
    alerts.push({
      title: 'Gasto elevado com combustível',
      description: 'O custo mensal estimado está acima do padrão.',
      type: 'warning',
      icon: Fuel,
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      title: 'Tudo funcionando bem',
      description: 'Nenhum problema importante foi identificado.',
      type: 'ok',
      icon: CheckCircle2,
    });
  }

  return alerts;
}

export default function Alerts() {
  const alerts = generateAlerts();

  return (
    <section className="px-5 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Alertas inteligentes
        </h1>

        <p className="mt-2 text-slate-400">
          Diagnósticos automáticos baseados nos dados do veículo.
        </p>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;

          return (
            <div
              key={`${alert.title}-${index}`}
              className={`rounded-3xl border p-5 shadow-lg shadow-black/20 ${getAlertColor(
                alert.type
              )}`}
            >
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-black/20 p-3">
                  <Icon className="h-6 w-6" />
                </div>

                <div>
                  <h2 className="text-lg font-bold">
                    {alert.title}
                  </h2>

                  <p className="mt-1 text-sm opacity-80">
                    {alert.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}