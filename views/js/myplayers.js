function fetchPlayers(){
    let players = document.getElementById("players");
    $.ajax({
        url:'/playersfetch',
        // data: {test:'test'},
        method: "POST",
        success:(results) => {

            
            let playersNum = Object.keys(results).length;
    

            for(i=0; i<playersNum ;i++){
                let player = document.createElement('option');
                player.setAttribute('value',results[i].player_id);
                player.setAttribute('name','selectedPlayer');
                player.innerHTML=results[i].surname;
                player.innerHTML+=' '+results[i].firstname;
                
                players.appendChild(player);

            }



    }
    });

}

function playerSearch(){
    let selectedPlayer = document.getElementById('players').value;
    let selectedYear = document.getElementById('year').value;
    let stats = document.getElementById('stats').checked;
    let career = document.getElementById('career').checked;
    let betw1 = document.getElementById('between1');
    let betw2 = document.getElementById('between2');

    betw1.setAttribute('style','');
    betw2.setAttribute('style','');


    if(selectedPlayer == 0) return 0 ;

    let selectedData = {player:selectedPlayer, year:selectedYear,stats:stats, career: career};
    // console.log(selectedData)

    if(selectedYear==0) selectedData.year = parseInt(new Date().getFullYear()) -1 ;


    let plGen = document.getElementById('playerGeneral');
    let plSt = document.getElementById('playerStats');
    let plCr = document.getElementById('playerCareer');

    $.ajax({
        url:'/searchPlayer',
        data: selectedData,
        method: "POST",
        success:(results) => {
            plGen.innerHTML ='';
            plSt.innerHTML = '';
            plCr.innerHTML = '';

            //Start General about the player

                //start titles
            console.log(results);
            let title = document.createElement('div');
            title.setAttribute('class','row col-12');
            title.innerHTML= '<h3>Γενικά</h3>'

            let titleRow = document.createElement('div');
            titleRow.setAttribute('class','row col-12');

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
            height.setAttribute('class','col-1 font-weight-bold');
            
            let weight = document.createElement('div');
            weight.innerHTML = 'Βάρος'
            weight.setAttribute('class','col-1 font-weight-bold')

            let team = document.createElement('div');
            team.innerHTML = 'Ομάδα'
            team.setAttribute('class','col-2 font-weight-bold')

            let age = document.createElement('div');
            age.innerHTML = 'Ηλικία';
            age.setAttribute('class','col-1 font-weight-bold');
            


            titleRow.appendChild(nameTitle);
            titleRow.appendChild(natTitle);
            titleRow.appendChild(carstart);
            titleRow.appendChild(height);
            titleRow.appendChild(weight);
            titleRow.appendChild(team);
            titleRow.appendChild(age);

            plGen.appendChild(title);
            plGen.appendChild(titleRow);

                //end titles

                //start values

            let valueRow = document.createElement('div');
            valueRow.setAttribute('class','row col-12');

            let namevalue = document.createElement('div');
            namevalue.innerHTML = results[0].general[0].Surname+' '+results[0].general[0].FirstName
            namevalue.setAttribute('class','col-3 ');

            let natvalue = document.createElement('div');
            natvalue.innerHTML = results[0].general[0].Nationality
            natvalue.setAttribute('class','col-2 ')

            carstart = document.createElement('div');
            carstart.innerHTML = results[0].general[0].Career_starting_Date
            carstart.setAttribute('class','col-2 ')

            height = document.createElement('div');
            height.innerHTML = results[0].general[0].Hight
            height.setAttribute('class','col-1 ');
            
            weight = document.createElement('div');
            weight.innerHTML = results[0].general[0].WeightP
            weight.setAttribute('class','col-1 ')

            team = document.createElement('div');
            team.innerHTML = results[0].general[0].team
            team.setAttribute('class','col-2 ')

            age = document.createElement('div');
            age.innerHTML = parseInt(new Date().getFullYear()) - parseInt((results[0].general[0].Birth_Date).substr(results[0].general[0].Birth_Date.length - 4));
            age.setAttribute('class','col-1 ');
            
            valueRow.appendChild(namevalue);
            valueRow.appendChild(natvalue);
            valueRow.appendChild(carstart);
            valueRow.appendChild(height);
            valueRow.appendChild(weight);
            valueRow.appendChild(team);
            valueRow.appendChild(age);

            plGen.appendChild(valueRow);
            //end general about the player

           if(stats){
                //start player stats 
                //titles
            
            betw1.setAttribute('style','background-color: #cfeefc');

            let title = document.createElement('div');
            title.setAttribute('class','row col-12');
            title.innerHTML= '<h3>Στατιστικά</h3>'

            titleRow = document.createElement('div');
            titleRow.setAttribute('class', 'row col-12');

            let points = document.createElement('div');
            points.innerHTML = 'Πόντοι';
            points.setAttribute('class', 'col-1 font-weight-bold');

            let ppg = document.createElement('div');
            ppg.innerHTML = 'PPG';
            ppg.setAttribute('class', 'col-1 font-weight-bold');

            let gmspl = document.createElement('div');
            gmspl.innerHTML = 'Games';
            gmspl.setAttribute('class', 'col-1 font-weight-bold');
            
            let  pma2= document.createElement('div');
            pma2.innerHTML = '2PM-A';
            pma2.setAttribute('class', 'col-1 font-weight-bold');
            
            let pma3 = document.createElement('div');
            pma3.innerHTML = '3PM-A';
            pma3.setAttribute('class', 'col-1 font-weight-bold');
            
            let ftm = document.createElement('div');
            ftm.innerHTML = 'FTM-A';
            ftm.setAttribute('class', 'col-1 font-weight-bold');
            
            let  rebs= document.createElement('div');
            rebs.innerHTML = 'REBS';
            rebs.setAttribute('class', 'col-1 font-weight-bold');
            
            let  ast= document.createElement('div');
            ast.innerHTML = 'AST';
            ast.setAttribute('class', 'col-1 font-weight-bold');
            
            let blk = document.createElement('div');
            blk.innerHTML = 'BLK';
            blk.setAttribute('class', 'col-1 font-weight-bold');
            
            let stl = document.createElement('div');
            stl.innerHTML = 'STL';
            stl.setAttribute('class', 'col-1 font-weight-bold');
            
            let topg = document.createElement('div');
            topg.innerHTML = 'TO/game';
            topg.setAttribute('class', 'col-1 font-weight-bold');
            
            let mpg = document.createElement('div');
            mpg.innerHTML = 'MPG';
            mpg.setAttribute('class', 'col-1 font-weight-bold');



            titleRow.appendChild(points);
            titleRow.appendChild(ppg);
            titleRow.appendChild(gmspl);
            titleRow.appendChild(pma2);
            titleRow.appendChild(pma3);
            titleRow.appendChild(ftm);
            titleRow.appendChild(rebs);
            titleRow.appendChild(ast);
            titleRow.appendChild(blk);
            titleRow.appendChild(stl);
            titleRow.appendChild(topg);
            titleRow.appendChild(mpg);

            plSt.appendChild(title);
            plSt.appendChild(titleRow);

            //end titles
            //start titles
            valueRow = document.createElement('div');
            valueRow.setAttribute('class', 'row col-12');

            points = document.createElement('div');
            points.innerHTML = 'Πόντοι';
            points.setAttribute('class', 'col-1 ');

            ppg = document.createElement('div');
            ppg.innerHTML = results[1].stats[0].ppg;
            ppg.setAttribute('class', 'col-1 ');

            gmspl = document.createElement('div');
            gmspl.innerHTML = results[1].stats[0].gamesplayed;
            gmspl.setAttribute('class', 'col-1 ');
            
            pma2= document.createElement('div');
            pma2.innerHTML = results[1].stats[0].pm2 + '%';
            pma2.setAttribute('class', 'col-1 ');
            
            pma3 = document.createElement('div');
            pma3.innerHTML = results[1].stats[0].pm3+ '%';
            pma3.setAttribute('class', 'col-1 ');
            
            ftm = document.createElement('div');
            ftm.innerHTML = results[1].stats[0].ftm_a+ '%';
            ftm.setAttribute('class', 'col-1 ');
            
            rebs= document.createElement('div');
            rebs.innerHTML = results[1].stats[0].rebs;
            rebs.setAttribute('class', 'col-1 ');
            
            ast= document.createElement('div');
            ast.innerHTML = results[1].stats[0].ast;
            ast.setAttribute('class', 'col-1 ');
            
            blk = document.createElement('div');
            blk.innerHTML = results[1].stats[0].blk;
            blk.setAttribute('class', 'col-1 ');
            
            stl = document.createElement('div');
            stl.innerHTML = results[1].stats[0].stl;
            stl.setAttribute('class', 'col-1 ');
            
            topg = document.createElement('div');
            topg.innerHTML = results[1].stats[0].to_per_game;
            topg.setAttribute('class', 'col-1 ');
            
            mpg = document.createElement('div');
            mpg.innerHTML = results[1].stats[0].mpg;
            mpg.setAttribute('class', 'col-1 ');



            valueRow.appendChild(points);
            valueRow.appendChild(ppg);
            valueRow.appendChild(gmspl);
            valueRow.appendChild(pma2);
            valueRow.appendChild(pma3);
            valueRow.appendChild(ftm);
            valueRow.appendChild(rebs);
            valueRow.appendChild(ast);
            valueRow.appendChild(blk);
            valueRow.appendChild(stl);
            valueRow.appendChild(topg);
            valueRow.appendChild(mpg);


            plSt.appendChild(valueRow);
           }

           if(career){
                //Player career 
                //start titles
                
                betw2.setAttribute('style','background-color: #cfeefc');
                let title = document.createElement('div');
                title.setAttribute('class','row col-12');
                title.innerHTML= '<h3>Καριέρα</h3>'

                titleRow = document.createElement('div');
                titleRow.setAttribute('class', 'row col-12');

                let team = document.createElement('div');
                team.innerHTML = 'Ομάδα';
                team.setAttribute('class', 'col-2 font-weight-bold');

                let  contractFrom= document.createElement('div');
                contractFrom.innerHTML = 'Από';
                contractFrom.setAttribute('class', 'col-2 font-weight-bold');

                let contractTo = document.createElement('div');
                contractTo.innerHTML = 'Εώς';
                contractTo.setAttribute('class', 'col-2 font-weight-bold');

                let money = document.createElement('div');
                money.innerHTML = 'Αποδοχές';
                money.setAttribute('class', 'col-2 font-weight-bold');

                let  positions = document.createElement('div');
                positions.innerHTML = 'Θέσεις';
                positions.setAttribute('class', 'col-3 font-weight-bold');

                titleRow.appendChild(team);
                titleRow.appendChild(contractFrom);
                titleRow.appendChild(contractTo);
                titleRow.appendChild(money);
                titleRow.appendChild(positions);

                plCr.appendChild(title);
                plCr.appendChild(titleRow);

                //end titles

                //start values
                let valueRow = document.createElement('div');
                valueRow.setAttribute('class', 'row col-12');

                team = document.createElement('div');
                team.innerHTML = results[2].career[0].team;
                team.setAttribute('class', 'col-2 ');

                contractFrom= document.createElement('div');
                contractFrom.innerHTML = results[2].career[0].contract_starting_date;
                contractFrom.setAttribute('class', 'col-2 ');

                contractTo = document.createElement('div');
                contractTo.innerHTML = results[2].career[0].contract_expire_date;
                contractTo.setAttribute('class', 'col-2 ');

                money = document.createElement('div');
                money.innerHTML = results[2].career[0].total_earnings;
                money.setAttribute('class', 'col-2 ');

                positions = document.createElement('div');
                positions.innerHTML = results[2].career[0].player_position;
                positions.setAttribute('class', 'col-3 ');

                valueRow.appendChild(team);
                valueRow.appendChild(contractFrom);
                valueRow.appendChild(contractTo);
                valueRow.appendChild(money);
                valueRow.appendChild(positions);

                plCr.appendChild(valueRow);

                //end values
            }
    
        }
    })
}
fetchPlayers();