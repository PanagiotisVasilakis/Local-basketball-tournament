function fetchReferee(){
    let referees = document.getElementById("referees");
    $.ajax({
        url:'/refereesfetch',
        method: "POST",
        success:(results) => {

            
            let refereesNum = Object.keys(results).length;
   
            for(i=0; i<refereesNum ;i++){
                let referee = document.createElement('option');
                referee.setAttribute('value',results[i].referee_id);
                referee.setAttribute('name','selectedreferee');
                referee.innerHTML=results[i].firstname;
                referee.innerHTML+= ' '+results[i].surname;
                referees.appendChild(referee);

            }



    }
    });

}

function searchReferee(){
    let refereeId = document.getElementById('referees').value;
    let refResults = document.getElementById('referee-results');
    let refname ;
    let refsurname;



    $.ajax({
        url:'/refereeSearch',
        data: {id: refereeId },
        method: "POST",
        success:(results) => {

            refResults.innerHTML = '';

            let titleRow = document.createElement('div');
            titleRow.setAttribute('class','row');

            let nameTitle = document.createElement('div');
            nameTitle.innerHTML = 'Ονοματεπώνυμο';
            nameTitle.setAttribute('class','col-sm font-weight-bold');
            

            let natTitle = document.createElement('div');
            natTitle.innerHTML = 'Εθνικότητα'
            natTitle.setAttribute('class','col-sm font-weight-bold')

            let carTitle = document.createElement('div');
            carTitle.innerHTML = 'Έναρξη καρίερας'
            carTitle.setAttribute('class','col-sm font-weight-bold')

            titleRow.appendChild(nameTitle);
            titleRow.appendChild(natTitle);
            titleRow.appendChild(carTitle);

            refResults.appendChild(titleRow);

            
            let valueRow = document.createElement('div');
            valueRow.setAttribute('class','row');

            let namevalue = document.createElement('div');
            namevalue.innerHTML = results[0].firstname+' '+results[0].surname;
            namevalue.setAttribute('class','col-sm');
            

            let natvalue = document.createElement('div');
            natvalue.innerHTML = results[0].nationality;
            natvalue.setAttribute('class','col-sm')

            let carvalue = document.createElement('div');
            carvalue.innerHTML = results[0].career_starting_date
            carvalue.setAttribute('class','col-sm')

            valueRow.appendChild(namevalue);
            valueRow.appendChild(natvalue);
            valueRow.appendChild(carvalue);

            refResults.appendChild(valueRow);


            


    }
    });
}



fetchReferee();