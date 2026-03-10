import { useEffect, useMemo, useState } from 'react';
import { hasSupabaseConfig, supabase } from './supabaseClient';

const initialForm = {
  name: '',
  address: '',
  designation: '',
  phone_number: '',
};

const normalizePhone = (value) => value.replace(/[^\d+()\-\s]/g, '').trim();

export default function App() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);

  const envMessage = useMemo(() => {
    if (hasSupabaseConfig) {
      return 'Supabase keys loaded from environment variables.';
    }

    return 'Supabase environment variables are missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.';
  }, []);

  const fetchContacts = async () => {
    if (!hasSupabaseConfig || !supabase) {
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from('contacts')
      .select('id, name, address, designation, phone_number, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      setStatus({ type: 'error', message: `Unable to load records: ${error.message}` });
      setIsLoading(false);
      return;
    }

    setRecords(data ?? []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue = name === 'phone_number' ? normalizePhone(value) : value;
    setFormData((prev) => ({ ...prev, [name]: nextValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!hasSupabaseConfig || !supabase) {
      setStatus({ type: 'error', message: 'Missing Supabase environment configuration.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    const payload = {
      name: formData.name.trim(),
      address: formData.address.trim(),
      designation: formData.designation.trim(),
      phone_number: normalizePhone(formData.phone_number),
    };

    const { error } = await supabase.from('contacts').insert(payload);

    if (error) {
      setStatus({ type: 'error', message: `Unable to save: ${error.message}` });
      setIsSubmitting(false);
      return;
    }

    setStatus({ type: 'success', message: 'Record saved successfully.' });
    setFormData(initialForm);
    setIsSubmitting(false);
    fetchContacts();
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12">
      <section className="mx-auto w-full max-w-4xl space-y-6 rounded-2xl bg-white p-8 shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Database Entry Form</h1>
          <p className="mt-2 text-sm text-slate-600">
            Add employee/contact records and store them in Supabase.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
          {envMessage}
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Name
              <input
                required
                maxLength={100}
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
                placeholder="Jane Doe"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Designation
              <input
                required
                maxLength={100}
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
                placeholder="Software Engineer"
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Address
            <input
              required
              maxLength={250}
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
              placeholder="123 Main Street"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Phone Number
            <input
              required
              name="phone_number"
              type="tel"
              inputMode="tel"
              pattern="^[+()\-\d\s]{7,20}$"
              title="Use 7-20 characters: numbers, spaces, +, -, ()"
              value={formData.phone_number}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
              placeholder="+1 234 567 8900"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
          >
            {isSubmitting ? 'Saving...' : 'Save to Supabase'}
          </button>
        </form>

        {status.message && (
          <p
            className={`text-sm font-medium ${
              status.type === 'error' ? 'text-red-600' : 'text-emerald-600'
            }`}
          >
            {status.message}
          </p>
        )}

        <section className="rounded-xl border border-slate-200">
          <div className="border-b border-slate-200 px-4 py-3">
            <h2 className="text-sm font-semibold text-slate-900">Recent Records</h2>
            <p className="text-xs text-slate-500">Showing up to 10 newest entries.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-600">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Address</th>
                  <th className="px-4 py-3">Designation</th>
                  <th className="px-4 py-3">Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {isLoading && (
                  <tr>
                    <td className="px-4 py-3 text-slate-500" colSpan={4}>
                      Loading records...
                    </td>
                  </tr>
                )}

                {!isLoading && records.length === 0 && (
                  <tr>
                    <td className="px-4 py-3 text-slate-500" colSpan={4}>
                      No records yet.
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  records.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 text-slate-800">{item.name}</td>
                      <td className="px-4 py-3 text-slate-700">{item.address}</td>
                      <td className="px-4 py-3 text-slate-700">{item.designation}</td>
                      <td className="px-4 py-3 text-slate-700">{item.phone_number}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}
