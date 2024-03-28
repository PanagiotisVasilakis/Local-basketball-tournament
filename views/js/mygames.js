function fetchFilterBar(){
    let gameTeams = document.getElementById("gameTeams");
    let matchDays = document.getElementById("matchDay");
    let stadiums = document.getElementById("stadium");
    $.ajax({
        url:'/matchesFilterBar',
        // data: {test:'test'},
        method: "POST",
        success:(results) => {
            
            let teamsNum = Object.keys(results[0].teams).length;
            let matchDayNum = Object.keys(results[1].matchDay).length;
            let stadiumNum = Object.keys(results[2].stadium).length;
    
            for(i=0; i<teamsNum ;i++){
                let team = document.createElement('option');
                team.setAttribute('value',results[0].teams[i].name);
                team.setAttribute('name','selectedTeam');
                team.innerHTML=results[0].teams[i].name;
                gameTeams.appendChild(team);
 
            }

            //fix match day
            for(i=0; i<matchDayNum ;i++){

                let matchDay = document.createElement('option');
                matchDay.setAttribute('value',results[1].matchDay[i].Match_day);
                matchDay.setAttribute('name','selectedMatchDay');
                matchDay.innerHTML=results[1].matchDay[i].Match_day;
                matchDays.appendChild(matchDay);
            }

            for(i=0; i<stadiumNum ;i++){
                let stadium = document.createElement('option');
                stadium.setAttribute('value',results[2].stadium[i].name);
                stadium.setAttribute('name','selectedstadium');
                stadium.innerHTML=results[2].stadium[i].name;
                stadiums.appendChild(stadium);

            }


    }
    });

}

function searchGames() {
    let selectedTeam = document.getElementById('gameTeams').value;
    let selectedDate1 = document.getElementById('date1').value;
    let selectedDate2 = document.getElementById('date2').value;
    let selectedMatchDay = document.getElementById('matchDay').value;
    let selectedStadium = document.getElementById('stadium').value;

    let table = document.getElementById('gameResults');

    let selection =[];
    let sel;

    if(selectedDate1!='' & selectedDate2!='' & selectedDate1>selectedDate2){
        alert('Invalid dates');
        return 0;
    }
    selection.push({team: selectedTeam})
    selection.push({date1: selectedDate1})
    selection.push({date2: selectedDate2})
    selection.push({matchDay: selectedMatchDay})
    selection.push({stadium: selectedStadium})
    console.log(selection);


    $.ajax({
        url:'/searchmatches',
        data: {selection},
        method: "POST",
        success:(results) => {
            table.innerHTML = '';
            console.log(results);

            let gamesN =  Object.keys(results).length;

            let game = document.createElement('div');
            game.setAttribute('class','row');

            let homeTeam= document.createElement('div');
            homeTeam.setAttribute('class','col-2 font-weight-bold')
            homeTeam.innerHTML = 'Home Team';
            
            let awayTeam= document.createElement('div');
            awayTeam.setAttribute('class','col-2 font-weight-bold')
            awayTeam.innerHTML = 'Away Team';
            
            let score = document.createElement('div');
            score.setAttribute('class','col-2 font-weight-bold')
            score.innerHTML = 'Σκορ';
            
            let matchDay = document.createElement('div');
            matchDay.setAttribute('class','col-1 font-weight-bold')
            matchDay.innerHTML = 'Αγωνιστική';
                        
            let stadium = document.createElement('div');
            stadium.setAttribute('class','col-2 font-weight-bold')
            stadium.innerHTML = 'Στάδιο';

            let date= document.createElement('div');
            date.setAttribute('class','col-2 font-weight-bold')
            date.innerHTML = 'Ημερομηνία';
         
            let dnp= document.createElement('div');
            dnp.setAttribute('class','col-1 font-weight-bold')
            dnp.innerHTML = 'DNP';

            game.appendChild(homeTeam);
            game.appendChild(awayTeam);
            game.appendChild(score);
            game.appendChild(matchDay);
            game.appendChild(stadium);
            game.appendChild(date);
            game.appendChild(dnp);

            table.appendChild(game);
            let colorChange = 0;
            for(let i=0;i<gamesN;i++){
                
                let game = document.createElement('div');
                game.setAttribute('class','row');
    
                let homeTeam= document.createElement('div');
                homeTeam.setAttribute('class','col-2 ')
                homeTeam.innerHTML = results[i].Home_Team;
                
                let awayTeam= document.createElement('div');
                awayTeam.setAttribute('class','col-2 ')
                awayTeam.innerHTML = results[i].Away_Team;
                
                let score = document.createElement('div');
                score.setAttribute('class','col-2 ')
                score.innerHTML = String(results[i].Score_Home_Team)+'-'+String(results[i].Score_Away_Team);
                
                let matchDay = document.createElement('div');
                matchDay.setAttribute('class','col-1 ')
                matchDay.innerHTML = results[i].Match_Day;
                                
                let stadium = document.createElement('div');
                stadium.setAttribute('class','col-2 ')
                stadium.innerHTML = results[i].Stadium;

                let date= document.createElement('div');
                date.setAttribute('class','col-2 ')
                date.innerHTML = results[i].Date_Time;
                
                let dnp= document.createElement('div'); 
                dnp.setAttribute('class','col-1 ')
                dnp.innerHTML = results[i].DNP;
                

                game.appendChild(homeTeam);
                game.appendChild(awayTeam);
                game.appendChild(score);
                game.appendChild(matchDay);
                game.appendChild(stadium);
                game.appendChild(date);
                game.appendChild(dnp);

                if(colorChange === 1){
                    game.setAttribute('style','background-color: #cfeefc');
                    colorChange = 0;
                }
                else{
                    game.setAttribute('style','background-color: white');
                    colorChange = 1;
                }
    
                table.appendChild(game);
            }



        }
    });

}

fetchFilterBar();