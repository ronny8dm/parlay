import React from 'react';
import "./StandingsBoard.css"

interface StandingsProps {
  data: any;
  selectedLeague: string;
}

export default function StandingsBoard(props: StandingsProps) {
  const { data, selectedLeague } = props;

  const leagueData = data[selectedLeague]?.children.map((child: any) => ({
    league: child.name,
    entries: child.standings.entries.map((entry: any) => ({
      team: entry.team.displayName,
      abbreviation: entry.team.abbreviation,
      link: entry.team.links[0],
      stats: entry.stats.reduce((acc: Record<string, string>, stat: any) => {
        acc[stat.shortDisplayName] = stat.displayValue;
        return acc;
      }, {}),
      logo: entry.team.logos?.[0]?.href || '',
    }))
  })) || [];

  const nationalLeagueData = leagueData.filter((item: any) => item.league === 'National League');
  const americanLeagueData = leagueData.filter((item: any) => item.league === 'American League');

  const statsHeaders = ['W', 'L', 'PCT', 'GB', 'HOME', 'AWAY', 'RS', 'RA', 'DIFF', 'STRK', 'L10'];

  return (
    <div className='table-content'>
      <div className="ResponsiveTable bg-white Responsive--fixed-left">
        <div className="table_title">American League</div>
        <div className="flex">
          <table className="table-fixed-left">
            <thead className='table_thead'>
              <tr className='table_tr'>
                <th className=' table_th border-b'>
                  <span className='w-full'></span>
                </th>
              </tr>
            </thead>
            <tbody className='table_tbody'>
              {americanLeagueData.map((item: any, index: any) => (
                <React.Fragment key={index}>
                  {item.entries.map((entry: any, idx: number) => (
                    <tr className="table_tr table_even" key={idx}>
                      <td className="table_td border-b">
                        <div className=" items-center">
                          <span className="pr-4 team_logo">
                            <img src={entry.logo} alt={entry.team} className='logo h-5 w-5' />
                          </span>
                          <span className="hidden md:inline">{entry.team}</span>
                          <span className="inline md:hidden">{entry.abbreviation}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div className='table_ScrollerWrapper relative overflow-hidden'>
            <div className='table_shadow-left opacity-0'></div>
            <div className='table_scroller'>
              <table className='table table-align-right'>
                <thead className='table_header-group table_thead'>
                  <tr className='table_tr table_sub-header table_even'>
                    {statsHeaders.map((header) => (
                      <th key={header} className=' table_th border-b'>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='table_tbody'>
                  {americanLeagueData.map((item: any, index: any) => (
                    <React.Fragment key={index}>
                      {item.entries.map((entry: any, idx: number) => (
                        <tr key={idx}>
                          {statsHeaders.map((stat) => (
                            <td key={stat} className="table_td py-2 px-4 border-b">
                              {entry.stats[stat] || '-'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="ResponsiveTable bg-white Responsive--fixed-left">
        <div className="table_title">National League</div>
        <div className="flex">
          <table className="table-fixed-left">
            <thead>
              <tr>
                <th className='py-2 px-4 border-b'></th>
              </tr>
            </thead>
            <tbody>
              {nationalLeagueData.map((item: any, index: any) => (
                <React.Fragment key={index}>
                  {item.entries.map((entry: any, idx: number) => (
                    <tr key={idx}>
                      <td className="table_td py-2 px-4 border-b">
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
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div className='table_ScrollerWrapper relative overflow-hidden'>
            <div className='table_shadow-left opacity-0'></div>
            <div className='table_scroller'>
              <table className='table table-align-right'>
                <thead className='table_header-group table_thead'>
                  <tr className='table_tr table_sub-header table_even'>
                    {statsHeaders.map((header) => (
                      <th key={header} className='py-2 table_th px-4 border-b'>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='table_tbody'>
                  {nationalLeagueData.map((item: any, index: any) => (
                    <React.Fragment key={index}>
                      {item.entries.map((entry: any, idx: number) => (
                        <tr key={idx}>
                          {statsHeaders.map((stat) => (
                            <td key={stat} className="table_td py-2 px-4 border-b">
                              {entry.stats[stat] || '-'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
