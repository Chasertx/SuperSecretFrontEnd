import { Rocket, Shield, Code } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="pt-32 bg-slate-900 min-h-screen text-white px-6">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          Build. Deploy. <span className="text-blue-500">Showcase.</span>
        </h1>
        <p className="text-xl text-slate-400 mb-10">
          The professional platform to manage your software projects and connect with the world.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-emerald-500 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-400 transition-transform hover:scale-105">
            View My Work
          </button>
        </div>
      </section>
    </div>
  );
}