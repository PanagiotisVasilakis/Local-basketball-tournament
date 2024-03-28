function fetchdivision(){
    let divisions = document.getElementById("divisions");
    $.ajax({
        url:'/divisionsfetch',
        // data: {test:'test'},
        method: "POST",
        success:(results) => {

            
            let divisionsNum = Object.keys(results).length;
    

            for(i=0; i<divisionsNum ;i++){
                let division = document.createElement('option');
                division.setAttribute('value',results[i].division);
                division.setAttribute('name','selecteddivision');
                division.innerHTML=results[i].division;
                divisions.appendChild(division);

            }



    }
    });

}

function searchdivision() {
    let division = document.getElementById('divisions').value;
    let table = document.getElementById('showResults');
    table.innerHTML = '';

    if (division==0) return 0;

  
    $.ajax({
        url:'/divisionSearch',
        data: {division : division},
        method: 'POST',
        success: (results) => {
            let team = document.createElement('div');
            team.setAttribute('class','row');

            let teamName = document.createElement('div');
            teamName.setAttribute('class','col-3 font-weight-bold');
            teamName.innerHTML = 'Ομάδα';

            let  teampos= document.createElement('div');
            teampos.setAttribute('class','col-1 font-weight-bold');
            teampos.innerHTML = 'Θέση';
            
            let points= document.createElement('div');
            points.setAttribute('class','col-1 font-weight-bold');
            points.innerHTML = 'Πόντοι';
            
            let  wins= document.createElement('div');
            wins.setAttribute('class','col-1 font-weight-bold');
            wins.innerHTML = 'Νίκες';
            
            let  loses= document.createElement('div');
            loses.setAttribute('class','col-1 font-weight-bold');
            loses.innerHTML = 'Ήττες';
            
            let  pointsPlMi= document.createElement('div');
            pointsPlMi.setAttribute('class','col-1 font-weight-bold');
            pointsPlMi.innerHTML = 'Πόντοι+/-';
            
            let  home= document.createElement('div');
            home.setAttribute('class','col-1 font-weight-bold');
            home.innerHTML = 'Εντώς';
            
            let away = document.createElement('div');
            away.setAttribute('class','col-1 font-weight-bold');
            away.innerHTML = 'Εκτός';
            
            let total = document.createElement('div');
            total.setAttribute('class','col-1 font-weight-bold');
            total.innerHTML = 'Αγώνες';

            team.appendChild(teamName);
            team.appendChild(teampos);
            team.appendChild(points);
            team.appendChild(wins);
            team.appendChild(loses);
            team.appendChild(pointsPlMi);
            team.appendChild(home);
            team.appendChild(away);
            team.appendChild(total);

            table.appendChild(team);

            let teamsN =  Object.keys(results).length;
            let colorChange = 0;
            
            for(let i =0; i< teamsN; i++){

                let team = document.createElement('div');
                team.setAttribute('class','row');

                let teamName = document.createElement('div');
                teamName.setAttribute('class','col-3');
                teamName.innerHTML = results[i].team;

                let  teampos= document.createElement('div');
                teampos.setAttribute('class','col-1');
                teampos.innerHTML = i+1;
                
                let points= document.createElement('div');
                points.setAttribute('class','col-1');
                points.innerHTML = results[i].points;
                
                let  wins= document.createElement('div');
                wins.setAttribute('class','col-1');
                wins.innerHTML = results[i].wins;
                
                let  loses= document.createElement('div');
                loses.setAttribute('class','col-1');
                loses.innerHTML = results[i].losses;
                
                let  pointsPlMi= document.createElement('div');
                pointsPlMi.setAttribute('class','col-1');
                pointsPlMi.innerHTML = results[i].Points_Difference;
                
                let  home= document.createElement('div');
                home.setAttribute('class','col-1');
                home.innerHTML = results[i].Home_Wins;
                
                let away = document.createElement('div');
                away.setAttribute('class','col-1');
                away.innerHTML = results[i].away_wins;
                
                let total = document.createElement('div');
                total.setAttribute('class','col-1');
                total.innerHTML = results[i].total_matches;

                team.appendChild(teamName);
                team.appendChild(teampos);
                team.appendChild(points);
                team.appendChild(wins);
                team.appendChild(loses);
                team.appendChild(pointsPlMi);
                team.appendChild(home);
                team.appendChild(away);
                team.appendChild(total);

                if(colorChange === 1){
                    team.setAttribute('style','background-color: #cfeefc');
                    colorChange = 0;
                }
                else{
                    team.setAttribute('style','background-color: white');
                    colorChange = 1;
                }

                table.appendChild(team);

            }
        }
    })
}


fetchdivision();