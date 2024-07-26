import React from 'react';

interface StandingsProps {
  data: any[];
  headers: string[];
}

export default function StandingsBoard(props: StandingsProps) {
  const { data } = props;

  const headers = data.length > 0 && data[0].entries && data[0].entries.length > 0 
    ? Object.keys(data[0].entries[0].stats[0]) 
    : [];

  return (
    <div className="w-full mt-4">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {headers.map((header) =>(
                <th key={header} className='py-2 px-4 border-b'>
                    {header}
                </th>
            ))}
            {headers.map((key) => (
              <th key={key} className="py-2 px-4 border-b">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                <td colSpan={headers.length} className="py-2 px-4 border-b bg-gray-200">
                  {item.league}
                </td>
              </tr>
              {Array.isArray(item.standings) && item.standings.map((standing: any, idx: number) => (
                <tr key={idx}>
                  {Object.values(standing).map((value, idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      {value as React.ReactNode}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}