export default function Dashboard() {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">Your Progress</h2>
      <div className="bg-zinc-900 p-8 rounded-xl">
        <p className="text-zinc-400">Progress charts will appear here once you log workouts.</p>
        <p className="text-sm text-zinc-500 mt-4">Bench • Squat • Deadlift • Overhead Press</p>
      </div>
    </div>
  );
}