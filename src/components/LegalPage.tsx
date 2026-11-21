export type LegalSection = { heading: string; body: (string | string[])[] };

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro?: string;
  sections: LegalSection[];
}) {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-text mb-2">{title}</h1>
        <p className="text-xs text-text-light mb-8">最終更新日：{updated}</p>
        {intro && <p className="text-sm text-text-light leading-relaxed mb-10">{intro}</p>}
        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-bold text-text mb-3 pb-2 border-b border-border">{s.heading}</h2>
              <div className="space-y-3 text-sm text-text-light leading-relaxed">
                {s.body.map((b, i) =>
                  Array.isArray(b) ? (
                    <ul key={i} className="list-disc list-inside space-y-1">
                      {b.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i}>{b}</p>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LegalTable({ title, updated, rows }: { title: string; updated: string; rows: [string, string][] }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-text mb-2">{title}</h1>
        <p className="text-xs text-text-light mb-8">最終更新日：{updated}</p>
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {rows.map(([k, v], i) => (
                <tr key={k} className={i < rows.length - 1 ? "border-b border-border" : ""}>
                  <th className="text-left font-medium text-text-light bg-bg-gray px-4 sm:px-6 py-4 w-1/3 align-top">{k}</th>
                  <td className="text-text px-4 sm:px-6 py-4 leading-relaxed whitespace-pre-line">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
