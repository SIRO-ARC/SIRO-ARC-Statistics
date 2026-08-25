export default function MgmRankingTable({
  data,
  columns,
  loading = false,
}) {
  return (
    <>
      {/* Mobile */}

<div className="mt-8 space-y-4 lg:hidden">

  {data.map((row, index) => (
    <div
      key={row.key ?? index}
      className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
    >

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">

        {columns.map((column) => (
          <div key={column.key}>

            <div className="text-xs font-medium text-slate-400">
              {column.label}
            </div>

            <div className="mt-1 text-base font-semibold">
              {column.render
                ? column.render(row, index)
                : row[column.key]}
            </div>

          </div>
        ))}

      </div>

    </div>
  ))}

</div>


      {/* Desktop */}

      <div className="hidden lg:block">

        <div className="mt-12 overflow-hidden rounded-2xl border border-slate-800">

          <table className="w-full">

            <thead className="bg-slate-900">

              <tr>

                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`p-4 text-left select-none ${
                      column.align === "right"
                        ? "text-right"
                        : ""
                    }`}
                  >
                    {column.label}
                  </th>
                ))}

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan={columns.length}
                    className="p-8 text-center text-slate-400"
                  >
                    Loading ranking...
                  </td>
                </tr>

              ) : data.length === 0 ? (

                <tr>
                  <td
                    colSpan={columns.length}
                    className="p-8 text-center text-slate-400"
                  >
                    No ranking data available.
                  </td>
                </tr>

              ) : (

                data.map((row, index) => (

                  <tr
                    key={row.key ?? index}
                    className="border-t border-slate-800 hover:bg-slate-900"
                  >

                    {columns.map((column) => (

                      <td
                        key={column.key}
                        className={`p-4 ${
                          column.align === "right"
                            ? "text-right"
                            : ""
                        }`}
                      >
                        {column.render
                          ? column.render(row, index)
                          : row[column.key]}
                      </td>

                    ))}

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </>
  );
}