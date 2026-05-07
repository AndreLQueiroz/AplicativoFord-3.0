import { Canvas } from '@react-three/fiber';
import {
  Environment,
  Html,
  OrbitControls,
  useGLTF,
} from '@react-three/drei';

import { useState } from 'react';

type CarPoint = {
  id: string;
  label: string;
  status: 'ok' | 'warning' | 'danger';
  position: [number, number, number];
  description: string;
};

const points: CarPoint[] = [
  {
    id: 'oil',
    label: 'Óleo',
    status: 'warning',
    position: [0.2, 0.8, 1.2],
    description: 'Troca recomendada em 500 km.',
  },

  {
    id: 'tires',
    label: 'Pneus',
    status: 'warning',
    position: [-1.3, -0.4, 1],
    description: 'Verifique calibragem e desgaste.',
  },

  {
    id: 'brakes',
    label: 'Freios',
    status: 'ok',
    position: [1.3, -0.3, 1],
    description: 'Sistema funcionando normalmente.',
  },

  {
    id: 'battery',
    label: 'Bateria',
    status: 'ok',
    position: [1, 0.7, -1],
    description: 'Bateria em boas condições.',
  },
];

const statusColor = {
  ok: 'bg-emerald-400',
  warning: 'bg-yellow-400',
  danger: 'bg-red-500',
};

function CarModel() {
  const { scene } = useGLTF('/models/car.glb');

  return (
    <primitive
      object={scene}
      scale={100}
      position={[0, -1, 0]}
      rotation={[0, -0.5, 0]}
    />
  );
}

function InteractivePoint({ point }: { point: CarPoint }) {
  const [open, setOpen] = useState(false);

  return (
    <Html position={point.position} center>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="relative flex h-5 w-5 items-center justify-center rounded-full border border-white bg-white/20 backdrop-blur"
        >
          <span
            className={`h-3 w-3 rounded-full ${statusColor[point.status]}`}
          />

          <span
            className={`absolute h-5 w-5 animate-ping rounded-full ${statusColor[point.status]} opacity-50`}
          />
        </button>

        {open && (
          <div className="absolute left-6 top-0 w-44 rounded-2xl border border-white/10 bg-[#0F172A]/95 p-3 text-left text-white shadow-2xl backdrop-blur">
            <p className="text-sm font-bold text-[#0A84FF]">
              {point.label}
            </p>

            <p className="mt-1 text-xs text-slate-300">
              {point.description}
            </p>
          </div>
        )}
      </div>
    </Html>
  );
}

export default function CarScene() {
  return (
    <div className="h-56 w-full">
      <Canvas camera={{ position: [1, 0.5, 5], fov: 50 }}>
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />

        <CarModel />

        {points.map((point) => (
          <InteractivePoint
            key={point.id}
            point={point}
          />
        ))}

        <Environment preset="city" />

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
}