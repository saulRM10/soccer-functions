const TableRankings = require("./TableRankings");

// use these tests as 'guides': description block for your function
// which a describe block contain holds it blocks for test cases
describe("getTeamsData()", function() {
    it("when invoked it returns an array of objects, which are soccer teams ", function(){

        const soccerTeams = TableRankings.getTeamsData();
        expect(soccerTeams[0].team_name).toBe("Real Madrid FC");
        expect(soccerTeams[1].team_name).toBe("FC Barcelona");
        expect(soccerTeams[2].team_name).toBe("Chealse FC");
        expect(soccerTeams[3].team_name).toBe("Matchester City FC");
    })
});

describe("getTeamsData()", function() {
    it("when invoked it returns an array of objects, which are match histroy", function(){
        const matches = TableRankings.getMatchHistoryData();
        // there are 6 games in between these 4 teams, each played 3 games
        expect(matches.length).toBe(6);
    
    })
});
// your tests here 
