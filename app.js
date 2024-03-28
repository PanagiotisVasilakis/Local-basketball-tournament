const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const mysql = require('mysql');
var bodyParser = require('body-parser');


app.use(express.static(__dirname + '/views'));

const routes = require('./routes/basketball-routes.js');
const { request } = require('express');
app.use('/', routes);
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connecting to db
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "basketball_tournament"
})

db.connect((error) => {
    if (error) {
        console.log("");
    } else {
        console.log("Database is connected...");
    }
});

app.post('/fetchbar', (req, res) => {
    var numbers = [];
    var num;
    let currentYear = parseInt(new Date().getFullYear()) - 1 ;

    db.query("SELECT player_id FROM player", function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            num = Object.keys(results).length;
            numbers.push({ players: num })
            db.query("SELECT AFM FROM team", function (err, results) {
                if (err) {
                    console.log(err);
                }
                else {

                    numbers.push({ teams: Object.keys(results).length })
                    db.query("SELECT Match_ID FROM matches", function (err, results) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            numbers.push({ matches: Object.keys(results).length })
                            db.query("SELECT referee_ID FROM referee", function (err, results) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    numbers.push({ referee: Object.keys(results).length })
                                    db.query("SELECT player.Player_ID,player.FirstName,player.Surname,player.Image,player_statistics.PPG from player join player_statistics where player.Player_ID=player_statistics.Player_ID AND player_statistics.Year=? ORDER by player_statistics.PPG DESC LIMIT 3",currentYear, function(err,results){
                                        if(err){
                                            console.log(err);
                                        }
                                        else{

                                            
                                            numbers.push({ mvps: results });
                                            res.send(numbers);
                                        }
                                    })
                                    


                                    
                                }
                            })
                        }
                    })

                }
            })
        }
    })

});

app.post('/matchesFilterBar', (req, res) => {

    var filters = [];
    db.query("SELECT name,AFM FROM team", function (err, results) {
        if (err) {
            console.log(err);
        }
        else {

            filters.push({ teams: results });

            db.query("SELECT Distinct Match_day FROM matches", function (err, results) {
                if (err) {
                    console.log(err);
                }
                else {


                    filters.push({ matchDay: results });
                    db.query("SELECT name,stadium_id FROM stadium", function (err, results) {
                        if (err) {
                            console.log(err);
                        }
                        else {


                            filters.push({ stadium: results });
                            res.send(filters);
                        }
                    })
                }
            })
        }
    })
})

app.post('/searchmatches', (req, res) => {
    let query = "SELECT matches.Home_Team,matches.Away_Team,matches.Score_Home_Team,matches.Score_Away_Team,matches.Match_Day,matches.Stadium,matches.Date_Time,matches.DNP from matches WHERE (Home_Team=? OR Away_Team=?)"
    let params = [req.body.selection[0].team,req.body.selection[0].team]

    
    if (req.body.selection[1].date1 != ''){
        query += "AND matches.Date_Time >= ?"
        params.push(req.body.selection[1].date1);
    }
    if (req.body.selection[2].date2 != ''){
        query += "AND matches.Date_Time <= ?"
        params.push(req.body.selection[2].date2);
    }
    if (req.body.selection[3].matchDay != '0'){
        query += "AND matches.Match_Day = ?"
        params.push(req.body.selection[3].matchDay );
    }
    if (req.body.selection[4].stadium != '0'){
        query += "AND matches.Stadium = ?"
        params.push(req.body.selection[4].stadium );
    }


    db.query(query,params, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            
            res.send(results);
        }
    })
})



app.post('/playersfetch', (req, res) => {

    db.query("SELECT firstname,surname,player_id FROM player ORDER BY surname", function (err, results) {
        if (err) {
            console.log(err);
        }
        else {

            res.send(results);
        }
    })
})

app.post('/searchPlayer', (req, res) => {

    year = req.body.year;
    pid = req.body.player

    var resData = [];
    db.query("SELECT player.FirstName,player.Surname,player.Nationality,player.Career_starting_Date,player.Hight,player.WeightP,player.Birth_Date, player_career.team from player join player_career on player.Player_ID=player_career.Player_ID and RIGHT(player_career.Contract_starting_Date,4) <=? and  RIGHT(player_career.Contract_expire_Date,4 )>=? and player.player_id=?", [year, year, pid], function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            resData.push({ general: results });
            
 
            if (req.body.stats) {
                db.query("SELECT ppg,gamesplayed,2pm_a as pm2,3pm_a as pm3,ftm_a,rebs,ast,blk,stl,to_per_game,mpg from player_statistics where player_id=? and year=? ", [pid,year], function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    else {


                        resData.push({ stats: results });
                        db.query("SELECT team, player_position,contract_starting_date,contract_expire_date,total_earnings from player_career where player_id=?", [pid], function (err, results) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                resData.push({ career: results });
                                res.send(resData);

                                
                                
                            }
                        })
                        
                        


                    }
                })
            }



        }
    })
})




app.post('/teamsfetch', (req, res) => {
    db.query("SELECT name,AFM FROM team", function (err, results) {
        if (err) {
            console.log(err);
        }
        else {

            res.send(results);
        }
    })
})
app.post('/searchteam', (req, res) => {
    let teamID = req.body.team;
    var resData = [];
    let currentYear = parseInt(req.body.year);
    let year = String(currentYear - 1) + '-' + String(currentYear);
    db.query("SELECT team.name,team.division,team.league,team.founded, team.location, team.colors, team.owner, standings.Position,standings.Points,standings.Wins,standings.Losses, standings.Points_Difference,standings.Home_Wins,standings.Away_wins, standings.Total_Matches FROM team join standings on team.name=standings.Team where AFM=? and year=?", [teamID, currentYear], function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            resData.push({ team: results });
            // console.
            let teamName = results[0].name;
            db.query("select player.Surname, player.FirstName,player.Nationality,player.Career_starting_Date,player.Hight,player.WeightP,player.Birth_Date from player where player.Player_ID IN (SELECT player_career.Player_ID from player_career WHERE player_career.team IN (SELECT team.Name from team where team.AFM=?))", teamID, function (err, results) {
                if (err) {
                    console.log(err);
                }
                else {
                    resData.push({ players: results });

                    db.query("SELECT coach.Surname,coach.FirstName,coach.Nationality,coach.Experience,coach.Birth_Date from coach where coach.Coaching_team=?", teamName, function (err, results) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            resData.push({ coaches: results });

                            db.query("SELECT stadium.Name, stadium.surface,stadium.Capacity,stadium.Location, stadium.manufacturing_date from stadium where stadium.Stadium_ID IN (SELECT team_base_stadium.Stadium_ID from team_base_stadium where team_base_stadium.Team_in_this_Base=?)", teamName, function (err, results) {
                                if (err) {
                                    console.log(err);
                                }
                                else {

                                    resData.push({ stadium: results });
                                    res.send(resData);

                                }
                            })


                        }
                    })




                }
            })


        }
    })
})

app.post('/refereesfetch', (req, res) => {

    db.query("SELECT firstname,surname,referee_id FROM referee", function (err, results) {
        if (err) {
            console.log(err);
        }
        else {

            res.send(results);
        }
    })
})

app.post('/refereeSearch/', (req, res) => {
    let id = req.body.id;
    db.query("SELECT firstname,surname,nationality,career_starting_date FROM referee WHERE referee_id=?", id, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(results);
        }
    })
})

app.post('/coachesfetch', (req, res) => {

    db.query("SELECT firstname,surname,coach_contract_id FROM coach", function (err, results) {
        if (err) {
            console.log(err);
        }
        else {

            res.send(results);
        }
    })
})

app.post('/searchCoach', (req, res) => {
    let selectedcoach = parseInt(req.body.coach);
    let year = parseInt(req.body.year);
    db.query("SELECT coach.Surname,coach.FirstName,coach.Nationality,coach.Experience,coach.Birth_Date,coach_career.Team,coach_career.Contract_starting_Date,coach_career.Contract_expire_Date from (coach join coach_career on coach.Coach_contract_ID=coach_career.Coach_ID) where coach.Coach_contract_ID=? and RIGHT(coach_career.Contract_starting_Date,4)<=? and RIGHT(coach_career.Contract_expire_Date,4)>=?", [selectedcoach, year, year], function (err, results) {
        if (err) {
            console.log(err);
        }
        else {

            res.send(results);
        }
    })
})

app.post('/divisionsfetch', (req, res) => {

    db.query("SELECT Distinct division FROM team ORDER BY division", function (err, results) {
        if (err) {
            console.log(err);
        }
        else {

            res.send(results);
        }
    })
})

app.post('/divisionSearch', (req, res) => {
    let div = req.body.division;
    let currentYear = parseInt(new Date().getFullYear());
    // let thisYear = String(currentYear - 1) + '-' + String(currentYear);
    db.query("select team,position,points,wins,losses,Home_Wins,away_wins,Points_Difference, total_matches from standings where team in (SELECT name from team where division = ?) and Year=? ORDER BY points DESC", [div, currentYear], function (err, results) {
        if (err) {
            console.log(err);
        }
        else {

            res.send(results);
        }
    })
})


module.exports = db;

app.set('view engine', 'hbs');

module.exports = app;