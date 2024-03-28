function fetchTeams(){
    let teams = document.getElementById("teams");
    $.ajax({
        url:'/teamsfetch',
        method: "POST",
        success:(results) => {
            
            
            let teamsNum = Object.keys(results).length;
    
            
            for(i=0; i<teamsNum ;i++){
                let team = document.createElement('option');
                team.setAttribute('value',results[i].AFM);
                team.setAttribute('name','selectedteam');
                team.innerHTML=results[i].name;
                teams.appendChild(team);
 
            }



    }
    });

}

function searchTeam(){
    let team = document.getElementById("teams").value;
    let year = document.getElementById('year').value;
    let players = document.getElementById('players').checked;
    let coaches = document.getElementById('coaches').checked;
    let stadium = document.getElementById('stadium').checked;

    if(team==0) return 0;

    let selectedData = {team:team, year: year, players: players, coaches: coaches, stadium : stadium };

    if(year==0) selectedData.year = new Date().getFullYear();
    
    let teamsRow = document.getElementById('teamRes');
    let playersRow = document.getElementById('playersRes');
    let coachesRow = document.getElementById('coachesRes');
    let stadiumRow = document.getElementById('stadiumRes');
    let statsRow = document.getElementById('statsRes');

    //diaxoristika
    let betw1 = document.getElementById('between1');
    let betw2 = document.getElementById('between2');
    let betw3 = document.getElementById('between3');

    betw1.setAttribute('style','');
    betw2.setAttribute('style','');
    betw3.setAttribute('style','');
    betw1.setAttribute('class','row');
    betw2.setAttribute('class','row');
    betw3.setAttribute('class','row');

    playersRow.setAttribute('class','row');
    coachesRow.setAttribute('class','row');
    stadiumRow.setAttribute('class','row');


    $.ajax({
        url:'/searchteam',
        data: selectedData,
        method: "POST",
        success:(results) => {
            teamsRow.innerHTML ='';
            playersRow.innerHTML = '';
            coachesRow.innerHTML = '';
            stadiumRow.innerHTML = '';
            statsRow.innerHTML = '';


            console.log(results);
            //start team

            //start team titles

            let title = document.createElement('div');
            title.setAttribute('class','row col-12');
            title.innerHTML= '<h3>Η ομάδα</h3>'

            let titleRow = document.createElement('div');
            titleRow.setAttribute('class','row col-12');

            let nameTitle = document.createElement('div');
            nameTitle.innerHTML = 'Όνομα';
            nameTitle.setAttribute('class','col-2 font-weight-bold');

            let divTitle = document.createElement('div');
            divTitle.innerHTML = 'Κατηγορία'
            divTitle.setAttribute('class','col-1 font-weight-bold')

            let league = document.createElement('div');
            league.innerHTML = 'league'
            league.setAttribute('class','col-1 font-weight-bold')

            let founded = document.createElement('div');
            founded.innerHTML = 'Ίδρυση';
            founded.setAttribute('class','col-2 font-weight-bold');
            
            let location = document.createElement('div');
            location.innerHTML = 'Τοποθεσία'
            location.setAttribute('class','col-2 font-weight-bold')

            let colors = document.createElement('div');
            colors.innerHTML = 'Χρώματα'
            colors.setAttribute('class','col-2 font-weight-bold')

            let owner = document.createElement('div');
            owner.innerHTML = 'Ιδιοκτήτης';
            owner.setAttribute('class','col-2 font-weight-bold');
            


            titleRow.appendChild(nameTitle);
            titleRow.appendChild(divTitle);
            titleRow.appendChild(league);
            titleRow.appendChild(founded);
            titleRow.appendChild(location);
            titleRow.appendChild(colors);
            titleRow.appendChild(owner);

            teamsRow.appendChild(title);
            teamsRow.appendChild(titleRow);

            //end team titles

            //start values

            titleRow = document.createElement('div');
            titleRow.setAttribute('class','row col-12');

            nameTitle = document.createElement('div');
            nameTitle.innerHTML = results[0].team[0].name;
            nameTitle.setAttribute('class','col-2 ');

            divTitle = document.createElement('div');
            divTitle.innerHTML = results[0].team[0].division;
            divTitle.setAttribute('class','col-1 ')

            league = document.createElement('div');
            league.innerHTML = results[0].team[0].league;
            league.setAttribute('class','col-1 ')

            founded = document.createElement('div');
            founded.innerHTML =results[0].team[0].founded;
            founded.setAttribute('class','col-2 ');
            
            location = document.createElement('div');
            location.innerHTML = results[0].team[0].location;
            location.setAttribute('class','col-2 ')

            colors = document.createElement('div');
            colors.innerHTML = results[0].team[0].colors;
            colors.setAttribute('class','col-2 ')

            owner = document.createElement('div');
            owner.innerHTML = results[0].team[0].owner;
            owner.setAttribute('class','col-2 ');
            

            titleRow.appendChild(nameTitle);
            titleRow.appendChild(divTitle);
            titleRow.appendChild(league);
            titleRow.appendChild(founded);
            titleRow.appendChild(location);
            titleRow.appendChild(colors);
            titleRow.appendChild(owner);

            teamsRow.appendChild(titleRow);

            //end values

            //start stats

            let team = document.createElement('div');
            team.setAttribute('class','row col-12');


            let points= document.createElement('div');
            points.setAttribute('class','col-2 font-weight-bold');
            points.innerHTML = 'Πόντοι';
            
            let  wins= document.createElement('div');
            wins.setAttribute('class','col-2 font-weight-bold');
            wins.innerHTML = 'Νίκες';
            
            let  loses= document.createElement('div');
            loses.setAttribute('class','col-2 font-weight-bold');
            loses.innerHTML = 'Ήττες';
            
            let  pointsPlMi= document.createElement('div');
            pointsPlMi.setAttribute('class','col-2 font-weight-bold');
            pointsPlMi.innerHTML = 'Πόντοι+/-';
            
            let  home= document.createElement('div');
            home.setAttribute('class','col-1 font-weight-bold');
            home.innerHTML = 'Εντώς';
            
            let away = document.createElement('div');
            away.setAttribute('class','col-1 font-weight-bold');
            away.innerHTML = 'Εκτός';
            
            let total = document.createElement('div');
            total.setAttribute('class','col-2 font-weight-bold');
            total.innerHTML = 'Αγώνες';

           
            team.appendChild(points);
            team.appendChild(wins);
            team.appendChild(loses);
            team.appendChild(pointsPlMi);
            team.appendChild(home);
            team.appendChild(away);
            team.appendChild(total);

            statsRow.appendChild(team);


            // stats values
            team = document.createElement('div');
            team.setAttribute('class', 'row col-12');

 

            points = document.createElement('div');
            points.setAttribute('class', 'col-2');
            points.innerHTML = results[0].team[0].Points;

            wins = document.createElement('div');
            wins.setAttribute('class', 'col-2');
            wins.innerHTML = results[0].team[0].Wins;

            loses = document.createElement('div');
            loses.setAttribute('class', 'col-2');
            loses.innerHTML = results[0].team[0].Losses;

            pointsPlMi = document.createElement('div');
            pointsPlMi.setAttribute('class', 'col-2');
            pointsPlMi.innerHTML = results[0].team[0].Points_Difference;

            home = document.createElement('div');
            home.setAttribute('class', 'col-1');
            home.innerHTML = results[0].team[0].Home_Wins;

            away = document.createElement('div');
            away.setAttribute('class', 'col-1');
            away.innerHTML = results[0].team[0].Away_wins;

            total = document.createElement('div');
            total.setAttribute('class', 'col-2');
            total.innerHTML = results[0].team[0].Total_Matches;



            team.appendChild(points);
            team.appendChild(wins);
            team.appendChild(loses);
            team.appendChild(pointsPlMi);
            team.appendChild(home);
            team.appendChild(away);
            team.appendChild(total);

            statsRow.appendChild(team);

            //end stats

            if(players){

                betw1.setAttribute('style','background-color: #cfeefc');
                betw1.setAttribute('class','row  mt-1 mb-1 pt-2 pb-2');
                playersRow.setAttribute('class','row mb-5 mt-5');

                //playes titles 
                let titleRow = document.createElement('div');
                titleRow.setAttribute('class','row col-12');

                let title = document.createElement('div');
                title.setAttribute('class','row col-12');
                title.innerHTML= '<h3>Οι παίκτες</h3>'


                let nameTitle = document.createElement('div');
                nameTitle.innerHTML = 'Ονοματεπώνυμο';
                nameTitle.setAttribute('class','col-3 font-weight-bold');

                let natTitle = document.createElement('div');
                natTitle.innerHTML = 'Εθνικότητα'
                natTitle.setAttribute('class','col-2 font-weight-bold')

                let carstart = document.createElement('div');
                carstart.innerHTML = 'Έναρξη καρίερας'
                carstart.setAttribute('class','col-2 font-weight-bold')

                let height = document.createElement('div');
                height.innerHTML = 'Ύψος';
                height.setAttribute('class','col-2 font-weight-bold');
                
                let weight = document.createElement('div');
                weight.innerHTML = 'Βάρος'
                weight.setAttribute('class','col-2 font-weight-bold')



                let age = document.createElement('div');
                age.innerHTML = 'Ηλικία';
                age.setAttribute('class','col-1 font-weight-bold');
                


                titleRow.appendChild(nameTitle);
                titleRow.appendChild(natTitle);
                titleRow.appendChild(carstart);
                titleRow.appendChild(height);
                titleRow.appendChild(weight);
        
                titleRow.appendChild(age);

                playersRow.appendChild(title);
                playersRow.appendChild(titleRow);

                //end titles

                //start values
                let playersN =  Object.keys(results[1].players).length;

                for(let i =0; i< playersN; i++){
                    let valueRow = document.createElement('div');
                    valueRow.setAttribute('class','row col-12');

                    let namevalue = document.createElement('div');
                    namevalue.innerHTML = results[1].players[i].Surname +' '+ results[1].players[i].FirstName;
                    namevalue.setAttribute('class','col-3 ');

                    let natvalue = document.createElement('div');
                    natvalue.innerHTML = results[1].players[i].Nationality
                    natvalue.setAttribute('class','col-2 ')

                    carstart = document.createElement('div');
                    carstart.innerHTML = results[1].players[i].Career_starting_Date
                    carstart.setAttribute('class','col-2 ')

                    height = document.createElement('div');
                    height.innerHTML = results[1].players[i].Hight
                    height.setAttribute('class','col-2 ');
                    
                    weight = document.createElement('div');
                    weight.innerHTML = results[1].players[i].WeightP
                    weight.setAttribute('class','col-2 ')

                    console.log(parseInt((results[1].players[i].Birth_Date).substring(0, 4)))
                    age = document.createElement('div');
                    age.innerHTML =  parseInt(new Date().getFullYear()) - parseInt((results[1].players[i].Birth_Date).substr(results[1].players[i].Birth_Date.length - 4));
                    
                    age.setAttribute('class','col-1 ');
                    


                    valueRow.appendChild(namevalue);
                    valueRow.appendChild(natvalue);
                    valueRow.appendChild(carstart);
                    valueRow.appendChild(height);
                    valueRow.appendChild(weight);
                    valueRow.appendChild(age);

                    playersRow.appendChild(valueRow);
                }
                //end player values
                }

            if(coaches){

                coachesRow.setAttribute('class','row mb-5 mt-5');
                betw2.setAttribute('style','background-color: #cfeefc');
                betw2.setAttribute('class','row  mt-1 mb-1 pt-2 pb-2');
                //Start about the coach
            
                //start titles

                let titleRow = document.createElement('div');
                titleRow.setAttribute('class', 'row col-12');

                let title = document.createElement('div');
                title.setAttribute('class','row col-12');
                title.innerHTML= '<h3>Οι προπονητές</h3>'


                let nameTitle = document.createElement('div');
                nameTitle.innerHTML = 'Ονοματεπώνυμο';
                nameTitle.setAttribute('class', 'col-3 font-weight-bold');

                let natTitle = document.createElement('div');
                natTitle.innerHTML = 'Εθνικότητα'
                natTitle.setAttribute('class', 'col-2 font-weight-bold')


                let age = document.createElement('div');
                age.innerHTML = 'Ηλικία';
                age.setAttribute('class', 'col-3 font-weight-bold');

                let from = document.createElement('div');
                from.innerHTML = 'Χρόνια εμπειρίας';
                from.setAttribute('class', 'col-3 font-weight-bold');


                





                titleRow.appendChild(nameTitle);
                titleRow.appendChild(natTitle);
                titleRow.appendChild(age);
                titleRow.appendChild(from);
                
                
                coachesRow.appendChild(title);
                coachesRow.appendChild(titleRow);

                //end titles

                //start values


                let coachesN =  Object.keys(results[2].coaches).length;

                for(let i =0; i< coachesN; i++){
                    let valueRow = document.createElement('div');
                    valueRow.setAttribute('class', 'row col-12');

                    let namevalue = document.createElement('div');
                    namevalue.innerHTML = results[2].coaches[i].Surname+' '+ results[2].coaches[i].FirstName;
                    namevalue.setAttribute('class', 'col-3 ');

                    let natvalue = document.createElement('div');
                    natvalue.innerHTML =  results[2].coaches[i].Nationality;
                    natvalue.setAttribute('class', 'col-2 ')


                    age = document.createElement('div');
                    age.innerHTML = parseInt(new Date().getFullYear()) - parseInt((results[2].coaches[i].Birth_Date).substr(results[2].coaches[i].Birth_Date.length - 4));
                    
                    age.setAttribute('class', 'col-3 ');

                    from = document.createElement('div');
                    from.innerHTML =  results[2].coaches[i].Experience;
                    from.setAttribute('class', 'col-3 ');


                    





                    valueRow.appendChild(namevalue);
                    valueRow.appendChild(natvalue);
                    valueRow.appendChild(age);
                    valueRow.appendChild(from);
                    
                    

                    coachesRow.appendChild(valueRow);
                }

                

                //end values

                //end about coach
            }

            if(stadium){
                stadiumRow.setAttribute('class','row mb-5 mt-5');
                betw3.setAttribute('style','background-color: #cfeefc');
                betw3.setAttribute('class','row  mt-1 mb-1 pt-2 pb-2');

                //start stadium titles
                let titleRow = document.createElement('div');
                titleRow.setAttribute('class', 'row col-12');

                let title = document.createElement('div');
                title.setAttribute('class','row col-12');
                title.innerHTML= '<h3>Το στάδιο</h3>';


                let nameTitle = document.createElement('div');
                nameTitle.innerHTML = 'Όνομα';
                nameTitle.setAttribute('class', 'col-2 font-weight-bold');

                let location = document.createElement('div');
                location.innerHTML ='Τοποθεσία'
                location.setAttribute('class', 'col-3 font-weight-bold')

                let date = document.createElement('div');
                date.innerHTML = 'Έτος κατασκευής'
                date.setAttribute('class', 'col-2 font-weight-bold')

                let surface = document.createElement('div');
                surface.innerHTML = 'Επιφάνεια'
                surface.setAttribute('class', 'col-2 font-weight-bold')

                let capacity = document.createElement('div');
                capacity.innerHTML = 'Χωρητικότητα';
                capacity.setAttribute('class', 'col-2 font-weight-bold');


                titleRow.appendChild(nameTitle);
                titleRow.appendChild(location);
                titleRow.appendChild(date);
                titleRow.appendChild(surface);
                titleRow.appendChild(capacity);

                stadiumRow.appendChild(title)
                stadiumRow.appendChild(titleRow);


                //start stadium values


                let valueRow = document.createElement('div');
                valueRow.setAttribute('class', 'row col-12');

                nameTitle = document.createElement('div');
                nameTitle.innerHTML = results[3].stadium[0].Name;
                nameTitle.setAttribute('class', 'col-2 ');

                location = document.createElement('div');
                location.innerHTML =  results[3].stadium[0].Location;
                location.setAttribute('class', 'col-3 ')

                date = document.createElement('div');
                date.innerHTML = results[3].stadium[0].manufacturing_date; 
                date.setAttribute('class', 'col-2 ')

                surface = document.createElement('div');
                surface.innerHTML = results[3].stadium[0].surface;
                surface.setAttribute('class', 'col-2 ')

                capacity = document.createElement('div');
                capacity.innerHTML = results[3].stadium[0].Capacity + ' άτομα'
                capacity.setAttribute('class', 'col-2 ');


                valueRow.appendChild(nameTitle);
                valueRow.appendChild(location);
                valueRow.appendChild(date);
                valueRow.appendChild(surface);
                valueRow.appendChild(capacity);
                stadiumRow.appendChild(valueRow);



            }

    } 
    });

}

fetchTeams();