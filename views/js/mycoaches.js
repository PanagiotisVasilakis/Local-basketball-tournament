

function fetchcoach(){
    let coaches = document.getElementById("coaches");
    $.ajax({
        url:'/coachesfetch',
        // data: {test:'test'},
        method: "POST",
        success:(results) => {
  
            
            let coachesNum = Object.keys(results).length;
    

            for(i=0; i<coachesNum ;i++){
                let coach = document.createElement('option');
                coach.setAttribute('value',results[i].coach_contract_id);
                coach.setAttribute('name','selectedcoach');
                coach.innerHTML=results[i].firstname;
                coach.innerHTML+= ' '+results[i].surname;
                coaches.appendChild(coach);

            }



    }
    });

}

function searchCoach() {
    let selectedcoach = document.getElementById('coaches').value;
    let selectedYear = document.getElementById('year').value;
    
    if(selectedcoach==0) return 0;
    if(selectedYear=='0') selectedYear =  parseInt(new Date().getFullYear()) ;
 
    $.ajax({
        url:'/searchCoach',
        data: {coach:selectedcoach , year: selectedYear},
        method: "POST",
        success:(results) => {
            let cres = document.getElementById('coachResults');
            cres.innerHTML = '';

            //Start about the coach
            
            //start titles

            let titleRow = document.createElement('div');
            titleRow.setAttribute('class', 'row col-12');

            let nameTitle = document.createElement('div');
            nameTitle.innerHTML = 'Ονοματεπώνυμο';
            nameTitle.setAttribute('class', 'col-2 font-weight-bold');

            let natTitle = document.createElement('div');
            natTitle.innerHTML = 'Εθνικότητα'
            natTitle.setAttribute('class', 'col-2 font-weight-bold')

            let team = document.createElement('div');
            team.innerHTML = 'Ομάδα'
            team.setAttribute('class', 'col-2 font-weight-bold')



            let age = document.createElement('div');
            age.innerHTML = 'Ηλικία';
            age.setAttribute('class', 'col-1 font-weight-bold');

            let from = document.createElement('div');
            from.innerHTML = 'Από';
            from.setAttribute('class', 'col-2 font-weight-bold');

            let to = document.createElement('div');
            to.innerHTML = 'Εώς'
            to.setAttribute('class', 'col-2 font-weight-bold')

            





            titleRow.appendChild(nameTitle);
            titleRow.appendChild(natTitle);
            titleRow.appendChild(team);
            titleRow.appendChild(age);
            titleRow.appendChild(from);
            titleRow.appendChild(to);
            
            

            cres.appendChild(titleRow);

            //end titles

            //start values

            let valueRow = document.createElement('div');
            valueRow.setAttribute('class', 'row col-12');

            let namevalue = document.createElement('div');
            namevalue.innerHTML = results[0].Surname+' '+results[0].FirstName;
            namevalue.setAttribute('class', 'col-2 ');

            let natvalue = document.createElement('div');
            natvalue.innerHTML =  results[0].Nationality
            natvalue.setAttribute('class', 'col-2 ')

            team = document.createElement('div');
            team.innerHTML = results[0].Team
            team.setAttribute('class', 'col-2 ')

            year = new Date().getFullYear();
            age = document.createElement('div');
            age.innerHTML = year - parseInt((results[0].Birth_Date).substr(results[0].Birth_Date.length - 4));
            age.setAttribute('class', 'col-1 ');

            from = document.createElement('div');
            from.innerHTML = results[0].Contract_starting_Date.substring(0, 10);
            from.setAttribute('class', 'col-2 ');

            to = document.createElement('div');
            to.innerHTML = results[0].Contract_expire_Date.substring(0, 10);
            to.setAttribute('class', 'col-2 ')

            





            valueRow.appendChild(namevalue);
            valueRow.appendChild(natvalue);
            valueRow.appendChild(team);
            valueRow.appendChild(age);
            valueRow.appendChild(from);
            valueRow.appendChild(to);
            
            

            cres.appendChild(valueRow);

            

            //end values

            //end about coach

        }
    })

}
fetchcoach();