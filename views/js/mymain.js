function fetchBar(){
    let playersNum = document.getElementById("PlayersNumber");
    let teamsNum = document.getElementById("teamsNumber");
    let gamesNum = document.getElementById("gamesNumber");
    let refereeNum = document.getElementById("refereeNumber");
    $.ajax({
        url:'/fetchbar',
        data: {test:'test'},
        method: "POST",
        success:(results) => {
            console.log(results[4].mvps[0])
            playersNum.innerHTML = results[0].players
            teamsNum.innerHTML = results[1].teams
            gamesNum.innerHTML = results[2].matches
            refereeNum.innerHTML = results[3].referee

            let pl1Image = document.getElementById('pl1Image');
            let pl1Name = document.getElementById('pl1Name');
            let ppg1 = document.getElementById('ppg1');

            let pl2Image = document.getElementById('pl2Image');
            let pl2Name = document.getElementById('pl2Name');
            let ppg2 = document.getElementById('ppg2');

            let pl3Image = document.getElementById('pl3Image');
            let pl3Name = document.getElementById('pl3Name');
            let ppg3 = document.getElementById('ppg3');

            pl1Image.setAttribute('src',results[4].mvps[0].Image);
            pl1Name.innerHTML = results[4].mvps[0].Surname + ' ' + results[4].mvps[0].FirstName; 
            ppg1.innerHTML = 'PPG: ' + results[4].mvps[0].PPG;

            pl2Image.setAttribute('src',results[4].mvps[1].Image);
            pl2Name.innerHTML = results[4].mvps[1].Surname + ' ' + results[4].mvps[1].FirstName; 
            ppg2.innerHTML = 'PPG: ' + results[4].mvps[1].PPG;
            
            pl3Image.setAttribute('src',results[4].mvps[2].Image);
            pl3Name.innerHTML = results[4].mvps[2].Surname + ' ' + results[4].mvps[2].FirstName; 
            ppg3.innerHTML = 'PPG: ' + results[4].mvps[2].PPG;
        }
    });
}
fetchBar();