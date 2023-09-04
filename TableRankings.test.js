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

describe("sortTeamsByPoints()", function () {
    it("given team data, it returns team data sorted by points in descending order", function () {
        const calculatedTeamData = [{ "gd": -2, "points": 1, "team_id": 1 }, { "gd": 2, "points": 7, "team_id": 2 }, { "gd": 0, "points": 4, "team_id": 3 }, { "gd": 0, "points": 4, "team_id": 4 }];
        const result = TableRankings.sortTeamsByPoints(calculatedTeamData);
        expect(result).toStrictEqual([{ "gd": 2, "points": 7, "team_id": 2 }, { "gd": 0, "points": 4, "team_id": 3 }, { "gd": 0, "points": 4, "team_id": 4 }, { "gd": -2, "points": 1, "team_id": 1 }]);
    })
})

describe("getRangeIndexOfTiedTeams()", function () {
    it("given sorted team data with no tied teams, it should return an empty array", function () {
        const calculatedTeamData = [{ "points": 4 }, { "points": 3 }, { "points": 2 }, { "points": 1 }];
        const result = TableRankings.getRangeIndexOfTiedTeams(calculatedTeamData);
        expect(result).toStrictEqual([]);
    })
    it("given sorted team data with 2 tied teams in the middle, it should return an array of length 2", function () {
        const calculatedTeamData = [{ "points": 7 }, { "points": 4 }, { "points": 4 }, { "points": 1 }];
        const result = TableRankings.getRangeIndexOfTiedTeams(calculatedTeamData);
        expect(result).toStrictEqual([[1, 2]]);
    })
    it("given sorted team data with 2 tied teams in the beginning, it should return an array of length 2", function () {
        const calculatedTeamData = [{ "points": 7 }, { "points": 7 }, { "points": 4 }, { "points": 1 }];
        const result = TableRankings.getRangeIndexOfTiedTeams(calculatedTeamData);
        expect(result).toStrictEqual([[0, 1]]);
    })
    it("given sorted team data with 3 tied teams at the end, it should return an array of length 2 including last index", function () {
        const calculatedTeamData = [{ "points": 7 }, { "points": 4 }, { "points": 4 }, { "points": 4 }];
        const result = TableRankings.getRangeIndexOfTiedTeams(calculatedTeamData);
        expect(result).toStrictEqual([[1, 3]]);
    })
    it("given sorted team data with 2 sets of tied teams, it should return every index of that array", function () {
        const calculatedTeamData = [{ "points": 7 }, { "points": 7 }, { "points": 4 }, { "points": 4 }];
        const result = TableRankings.getRangeIndexOfTiedTeams(calculatedTeamData);
        expect(result).toStrictEqual([[0, 1], [2, 3]]);
    })
    it("given sorted team data with 2 sets of tied teams, it should return every index of that array", function () {
        const calculatedTeamData = [{ "points": 5 }, { "points": 5 }, { "points": 4 }, { "points": 4 }, { "points": 4 }, { "points": 4 }, { "points": 3 }, { "points": 2 }];
        const result = TableRankings.getRangeIndexOfTiedTeams(calculatedTeamData);
        expect(result).toStrictEqual([[0, 1], [2, 5]]);
    })
})

describe("sortTeamsByGoalDifferencial()", function () {
    it("given an empty array (no tied teams), then return the team data as is", function () {
        const teamData = [{ "points": 4 }, { "points": 3 }, { "points": 2 }, { "points": 1 }];
        const arrWithIndexes = [];
        const result = TableRankings.sortTeamsByGoalDifferencial(teamData, arrWithIndexes);
        expect(result).toStrictEqual(teamData);
    })
    it("given 2 set of tied teams with different goal differencials, it should return data of sorted gds of same points", function () {
        const teamData = [{ "gd": 0, "points": 7 }, { "gd": 1, "points": 7 }, { "gd": 1, "points": 4 }, { "gd": 0, "points": 4 }];
        const arrWithIndexes = [[0, 1], [2, 3]];
        const result = TableRankings.sortTeamsByGoalDifferencial(teamData, arrWithIndexes);
        expect(result).toStrictEqual([{ "gd": 1, "points": 7 }, { "gd": 0, "points": 7 }, { "gd": 1, "points": 4 }, { "gd": 0, "points": 4 }]);
    })
    it("given a mix of tied & non tied teams in goal differencials, it should return data of sorted gds of same points", function () {
        const teamData = [{ "gd": 0, "points": 7 }, { "gd": 1, "points": 7 }, { "gd": 6, "points": 5 }, { "gd": 1, "points": 4 }, { "gd": 0, "points": 4 }];
        const arrWithIndexes = [[0, 1], [3, 4]];
        const result = TableRankings.sortTeamsByGoalDifferencial(teamData, arrWithIndexes);
        expect(result).toStrictEqual([{ "gd": 1, "points": 7 }, { "gd": 0, "points": 7 }, { "gd": 6, "points": 5 }, { "gd": 1, "points": 4 }, { "gd": 0, "points": 4 }]);
    })
    it("given bigger sets of tied teams with different goal differencials, it should return data of sorted gds of same points", function () {
        const teamData =
            [{ "gd": 0, "points": 5 },
            { "gd": 1, "points": 5 },
            { "gd": 2, "points": 4 },
            { "gd": 1, "points": 4 },
            { "gd": 1, "points": 4 },
            { "gd": 6, "points": 4 },
            { "gd": 1, "points": 3 },
            { "gd": 1, "points": 2 }];

        const arrWithIndexes = [[0, 1], [2, 5]];
        const result = TableRankings.sortTeamsByGoalDifferencial(teamData, arrWithIndexes);
        expect(result).toStrictEqual([{ "gd": 1, "points": 5 }, { "gd": 0, "points": 5 }, { "gd": 6, "points": 4 }, { "gd": 2, "points": 4 }, { "gd": 1, "points": 4 }, { "gd": 1, "points": 4 }, { "gd": 1, "points": 3 }, { "gd": 1, "points": 2 }]);
    })
    it("given data with all tied points, it should data sorted by goal differencials", function () {
        const teamData =
            [{ "gd": 0, "points": 5 },
            { "gd": 1, "points": 5 },
            { "gd": 2, "points": 5 },
            { "gd": 1, "points": 5 }];

        const arrWithIndexes = [[0, 3]];
        const result = TableRankings.sortTeamsByGoalDifferencial(teamData, arrWithIndexes);
        expect(result).toStrictEqual([{ "gd": 2, "points": 5 }, { "gd": 1, "points": 5 }, { "gd": 1, "points": 5 }, { "gd": 0, "points": 5 }]);
    })
})
