import { useState } from 'react';
import type { Job } from '@/types';
import { updateJob } from '@/lib/jobs';

interface Props {
  job: Job;
  updated_by: string;
  onUpdated: () => void;
}

export default function JobEditor({ job, updated_by, onUpdated }: Props) {
  const [title, setTitle] = useState(job.title);
  const [description, setDescription] = useState(job.description || '');
  const [status, setStatus] = useState<Job['status']>(job.status);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await updateJob(job.id, {
        title,
        description,
        status,
        updated_by,
      });
      onUpdated();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const inputClass = 'border rounded p-2 w-full bg-white text-black dark:bg-gray-800 dark:text-white';

  return (
    <div className="mt-4 space-y-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={inputClass}
        placeholder="Job title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={inputClass}
        placeholder="Job description"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as Job['status'])}
        className={inputClass}
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <button
        onClick={save}
        disabled={saving}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        {saving ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
}
