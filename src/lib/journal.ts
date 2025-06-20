import fs from 'fs';
import path from 'path';

export type JournalEntry = {
  id: string;
  title: string;
  content: any; // Tiptap JSON
  visibility: 'draft' | 'private' | 'published';
  createdAt: string;
  updatedAt: string;
};

const journalDir = path.join(process.cwd(), 'src/uploads/journal');

export function getAllPublishedEntries(): JournalEntry[] {
  const files = fs.readdirSync(journalDir);
  const entries: JournalEntry[] = files
    .map((file) => {
      const filePath = path.join(journalDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const entry = JSON.parse(content) as JournalEntry;
      return entry;
    })
    .filter((entry) => entry.visibility === 'published')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return entries;
}

export function getEntryBySlug(slug: string): JournalEntry | null {
  const filePath = path.join(journalDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, 'utf-8');
  const entry = JSON.parse(content) as JournalEntry;
  return entry.visibility === 'published' ? entry : null;
}
