import { useState } from 'react';

export default function WorkoutLog() {
  const [form, setForm] = useState({
    exercise: '',
    sets: '',
    reps: '',
    weight: '',
    notes: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Workout logged:', form);
    alert('Workout saved (backend connection coming next)');
    setForm({ exercise: '', sets: '', reps: '', weight: '', notes: '' });
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-3xl font-semibold mb-8">Log Workout</h2>
      
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-xl space-y-6">
        <div>
          <label className="block text-sm mb-2">Exercise</label>
          <input
            type="text"
            name="exercise"
            value={form.exercise}
            onChange={handleChange}
            placeholder="Bench Press"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-2">Sets</label>
            <input
              type="number"
              name="sets"
              value={form.sets}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Reps</label>
            <input
              type="number"
              name="reps"
              value={form.reps}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2">Notes (optional)</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Felt strong today..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 h-24"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 py-4 rounded-lg font-medium"
        >
          Save Workout
        </button>
      </form>
    </div>
  );
}