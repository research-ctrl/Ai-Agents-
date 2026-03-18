import type { ReactNode } from 'react';
import { Card, CardHeader } from '@/components/ui/card';

export type Column<T> = {
  header: string;
  render: (row: T) => ReactNode;
};

export function DataTable<T>({ title, description, columns, rows }: { title: string; description?: string; columns: Column<T>[]; rows: T[] }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-white/10 px-5 py-4">
        <CardHeader title={title} description={description} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.22em] text-slate-400">
            <tr>
              {columns.map((column) => (
                <th key={column.header} className="px-5 py-3 font-medium">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-t border-white/5 text-slate-200">
                {columns.map((column) => (
                  <td key={column.header} className="px-5 py-3 align-top">
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
