import React from 'react';
import "./StandingsBoard.css"

interface StandingsProps {
  data: any;
  selectedLeague: string;
}

export default function StandingsBoard(props: StandingsProps) {
  const { data, selectedLeague } = props;

  console.log("data in standings board ", data);
  console.log("selected league: ", selectedLeague);

  const leagueData = data[selectedLeague]?.children.map((child: any) => ({
    league: child.name,
    entries: child.standings.entries.map((entry: any) => ({
      team: entry.team.displayName,
      abbreviation: entry.team.abbreviation,
      stats: entry.stats.reduce((acc: Record<string, string>, stat: any) => {
        acc[stat.shortDisplayName] = stat.displayValue;
        return acc;
      }, {}),
      logo: entry.team.logos?.[0]?.href || '',
    }))
  })) || [];


  console.log("",leagueData)

  console.log("League data elements: ");
  leagueData.forEach((element: any, index: any) => {
    console.log(`element ${index}: `, element)
  });

  const nationalLeagueData = leagueData.filter((item: any) => item.league === 'National League');
  const americanLeagueData = leagueData.filter((item: any) => item.league === 'American League');

  const statsHeaders = ['W', 'L', 'PCT', 'GB', 'HOME', 'AWAY', 'RS', 'RA', 'DIFF', 'STRK', 'L10'];

 
  return (
    
    <div className='table-content'>
    {leagueData.map((leagueInfo: any, idx: number) => (
     <div key={idx} className="ResponsiveTable Responsive--fixed-left">
        <div className="table_title text-white ">{leagueInfo.league}</div>
        <div className="flex">
          <table className='table_col-group text-white'>
            <thead>
              <tr>
                <th className=' table_th-empty  border-b'></th>
              </tr>
            </thead>
            <tbody>
              {leagueInfo.entries.map((entry: any, idx: number) => (
                <tr key={idx}>
                  <td className={`table_td py-2 px-4 border-b ${idx % 2 === 0 ? 'bg-secondary-200' : 'cell-light'}`}>
                    <div className="flex items-center">
                      <span className="pr-4 team_logo">
                        <img src={entry.logo} alt={entry.team} className='logo h-5 w-5' />
                      </span>
                      <span className="hidden md:inline">{entry.team}</span>
                      <span className="inline md:hidden">{entry.abbreviation}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='table_ScrollerWrapper relative overflow-hidden'>
            <div className='table_shadow-left opacity-0'></div>
            <div className='table_scroller'>
              <table className='table table-align-right text-white'>
                <thead className='table_header-group table_thead'>
                  <tr className='table_tr table_sub-header table_even'>
                    {statsHeaders.map((header) => (
                      <th key={header} className='py-2 table_th px-4'>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='table_tbody'>
                  {leagueInfo.entries.map((entry: any, idx: number) => (
                    <tr key={idx}>
                      {statsHeaders.map((stat) => (
                        <td key={stat} className={`table_td py-2 px-4 border-b ${idx % 2 === 0 ? 'bg-secondary-200' : 'bg-transparent'}`}>
                          {entry.stats[stat] || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
    
);
}
