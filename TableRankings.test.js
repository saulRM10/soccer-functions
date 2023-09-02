const TableRankings = require("./TableRankings");

// use these tests as 'guides': description block for your function
// which a describe block contain holds it blocks for test cases
describe("getTeamsData()", function () {
    it("when invoked it returns an array of objects, which are soccer teams ", function () {

        const soccerTeams = TableRankings.getTeamsData();
        expect(soccerTeams[0].team_name).toBe("Real Madrid FC");
        expect(soccerTeams[1].team_name).toBe("FC Barcelona");
        expect(soccerTeams[2].team_name).toBe("Chealse FC");
        expect(soccerTeams[3].team_name).toBe("Matchester City FC");
    })
});

describe("getTeamsData()", function () {
    it("when invoked it returns an array of objects, which are match histroy", function () {
        const matches = TableRankings.getMatchHistoryData();
        // there are 6 games in between these 4 teams, each played 3 games
        expect(matches.length).toBe(6);

    })
});
// your tests here 
describe("getTeamPointsAndGoalDifferential()", function () {
    it("given match data & team data, it returns array with each team's final point & goal differencial", function () {
        const teamData = TableRankings.getTeamsData();
        const matchData = TableRankings.getMatchHistoryData();
        const result = TableRankings.getTeamPointsAndGoalDifferential(teamData, matchData);
        expect(result).toStrictEqual([{ "gd": -2, "points": 1, "team_id": 1 }, { "gd": 2, "points": 7, "team_id": 2 }, { "gd": 0, "points": 4, "team_id": 3 }, { "gd": 0, "points": 4, "team_id": 4 }]);
    })
    it("given match data & no team data, it asks user to enter team data", function () {
        const teamData = undefined;
        const matchData = TableRankings.getMatchHistoryData();
        const result = TableRankings.getTeamPointsAndGoalDifferential(teamData, matchData);
        expect(result).toBe("Please enter team data");
    })
    it("given team data & no match data, it asks user to enter match data", function () {
        const teamData = TableRankings.getTeamsData();
        const matchData = undefined;
        const result = TableRankings.getTeamPointsAndGoalDifferential(teamData, matchData);
        expect(result).toBe("Please enter match data");
    })
    it("given no data, it asks user to enter all data", function () {
        const teamData = undefined;
        const matchData = undefined;
        const result = TableRankings.getTeamPointsAndGoalDifferential(teamData, matchData);
        expect(result).toBe("Please enter data");
    })
})

describe("rankTeams()", function () {
    it("given the calculated team data & match data, it returns a ranked array of the teams ", function () {
        const calculatedTeamData = [{ "gd": -2, "points": 1, "team_id": 1 }, { "gd": 2, "points": 7, "team_id": 2 }, { "gd": 0, "points": 4, "team_id": 3 }, { "gd": 0, "points": 4, "team_id": 4 }];
        const matchData = TableRankings.getMatchHistoryData();
        const result = TableRankings.rankTeams(calculatedTeamData, matchData);
        expect(result).toStrictEqual("hallo");
    })
})
