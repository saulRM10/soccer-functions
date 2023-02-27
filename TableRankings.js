$(document).ready(function(){ // comment out to run tests |  uncomment to use on browser
const TableRankings = function(){
    var loadDomListners = function() {
     $(".restart-container").off("click", ".clear");
     $(".restart-container").on("click", ".clear" , clearLocalStorage);
    };

    var startOrganizeTeams = function(){
        // your logic starts here, button 

        var finalTeamPoints = [];

        // sets up to calculate final point & goal differencial
        getTeamsData().forEach(indTeam => {
            let team_id = indTeam.team_id;
            let newTeam = {team_id: team_id, points: 0, gd: 0};
            finalTeamPoints.push(newTeam);
        })

        // Calculate points & goal differencial for all teams
        getMatchHistoryData().forEach(indMatch => {
            
            // Calculate goal differencial
            let team_one_goal_count = indMatch.team_one_goal_count;
            let team_two_goal_count = indMatch.team_two_goal_count;
            
            let team_one_gd = team_one_goal_count - team_two_goal_count; 
            let team_two_gd = team_two_goal_count - team_one_goal_count;

            // Place them
            let indexTeam1inFinal = findInFinal(finalTeamPoints, indMatch.team_one_id);
            let indexTeam2inFinal = findInFinal(finalTeamPoints, indMatch.team_two_id);
            
            finalTeamPoints[indexTeam1inFinal].gd += team_one_gd;
            finalTeamPoints[indexTeam2inFinal].gd += team_two_gd;

            // Calculate + place points
            if(indMatch.tie) {
                finalTeamPoints[indexTeam1inFinal].points++;
                finalTeamPoints[indexTeam2inFinal].points++;
                
            }
            else {
                let indexInFinalArrayWinner = findInFinal(finalTeamPoints, indMatch.winner_id);
                finalTeamPoints[indexInFinalArrayWinner].points+=3;
            }

        })        

       finalTeamPoints.sort((team_a, team_b) => team_a.gd - team_b.gd);

    //    console.log(finalTeamPoints);
        // dataReadyForLocalStorage([{ name:"Team Name", points: 12 }]); // comment out when run test | uncomment for browser
    };

    var findInFinal = function(finalTeamPoints, team_id) {
        return finalTeamPoints.findIndex(obj => obj.team_id === team_id);
    }

    // do not change this, this send data to the front end 
    // CALL IT WHEN YOU GOT YOUR SOLUTION 
    var dataReadyForLocalStorage = function(rankedTeams){
        localStorage.setItem("teams", JSON.stringify(rankedTeams));
    };
    
    // do not change this, clears tour local storage
    var clearLocalStorage = function() {
        localStorage.clear();
    };

    // no need to update the funciton.
    // call it, retruns array of objects of Soccer Teams
    var getTeamsData = function() { 
        return [
            {
                team_id: 1, 
                team_name: "Real Madrid FC",
            },
            {
                team_id: 2, 
                team_name: "FC Barcelona",
            },
            {
                team_id: 3, 
                team_name: "Chealse FC",
            },
            {
                team_id: 4, 
                team_name: "Matchester City FC",
            },
        ]
    };

    // no need to update the funciton.
    // call it, retruns array of objects of matches between the teams
    var getMatchHistoryData = function() { 
        return [
            {
                match_id: 100,
                team_one_id: 1, 
                team_two_id: 2,
                team_one_goal_count:2,
                team_two_goal_count:3,
                winner_id:2,
                losser_id:1,
                tie: false,
            },
            {
                match_id: 445,
                team_one_id: 3, 
                team_two_id: 2,
                team_one_goal_count:2,
                team_two_goal_count:3,
                winner_id:2,
                losser_id:3,
                tie: false,
            },
            {
                match_id: 325,
                team_one_id: 4, 
                team_two_id: 2,
                team_one_goal_count:2,
                team_two_goal_count:2,
                winner_id: null,
                losser_id:null,
                tie: true,
            },
            {
                match_id: 605,
                team_one_id: 1, 
                team_two_id: 3,
                team_one_goal_count:1,
                team_two_goal_count:1,
                winner_id: null,
                losser_id: null,
                tie: true,
            },
            {
                match_id: 195,
                team_one_id: 4, 
                team_two_id: 1,
                team_one_goal_count:2,
                team_two_goal_count:1,
                winner_id: 4,
                losser_id: 1,
                tie: false,
            },
            {
                match_id: 812,
                team_one_id: 3, 
                team_two_id: 4,
                team_one_goal_count:3,
                team_two_goal_count:2,
                winner_id: 3,
                losser_id: 4,
                tie: false,
            },

        ]
    };
 startOrganizeTeams();
//  loadDomListners(); // comment out to run tests

   // add function to return statment
   // this will give you access to your functions outside this file
   // nameOfJsFile.myFunction(), 
   // like for testing, youll need access to your fucntion in testing file
    return {
        dataReadyForLocalStorage,
        getTeamsData, 
        getMatchHistoryData,
    }
}

TableRankings();
module.exports = TableRankings();
window.TableRankings = TableRankings(); // comment out to run tests | uncomment to use on browser
}); // comment out to run tests | uncomment to use on browser