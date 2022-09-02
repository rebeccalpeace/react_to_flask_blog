import React from 'react'
import { useState, useEffect } from 'react'

export default function Racers(props) {
    let tableHeaders = ['#', 'First', 'Last', 'Points', 'Wins', 'Nationality', 'Constructor']
    // set a state for racers - initial state of [] and setRacers is function to change state value of racers
    const [racers, setRacers] = useState([]);

    const [season, setSeason] = useState(2022);
    const [round, setRound] = useState(1);

    useEffect(() => {
        console.log('useEffect effect callback executed.')
		fetch(`https://ergast.com/api/f1/${season}/${round}/driverstandings.json`)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				let racerStandings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
				setRacers(racerStandings);
			})
    }, [season, round])     

    function handleRacerSubmit(e){
        // prevent default of refreshing page
        e.preventDefault();
        let newSeason = e.target.season.value;
        let newRound = e.target.round.value;
        setSeason(newSeason);
        setRound(newRound);
      }

  return (
    <div className='row py-3'>
        <h4 className="text-center">Driver Standings</h4>
        <form onSubmit={handleRacerSubmit}>
            <div className="row">
                <div className="col-12 col-md-6">
                    <input className="form-control" type="text" name="season" placeholder="Enter season" />
                </div>
                <div className="col-12 col-md-6">
                    <input className="form-control" type="text" name="round" placeholder="Enter round" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <input type="submit" value="" className="btn btn-primary w-100" />
                </div>
            </div>
        </form>
        <table className="table table-primary table-striped mt-3">
            <thead>
                <tr>
                    {tableHeaders.map((th, i) => <th key={i}>{th}</th>)}
                </tr>
            </thead>
            <tbody>
                {racers.map((racer, idx) => {
                    return (<tr key={idx}>
                        <th>{racer.position}</th>
                        <td>{racer.Driver.givenName}</td>
                        <td>{racer.Driver.familyName}</td>
                        <td>{racer.points}</td>
                        <td>{racer.wins}</td>
                        <td>{racer.Driver.nationality}</td>
                        <td>{racer.Constructors[0].name}</td>
                    </tr>)
                })}
                
            </tbody>
        </table>
    </div>
  )
}
