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

describe("getRangeIndexOfTiedPointsTeams()", function () {
    it("given sorted team data with no tied teams, it should return an empty array", function () {
        const calculatedTeamData = [{ "points": 4 }, { "points": 3 }, { "points": 2 }, { "points": 1 }];
        const result = TableRankings.getRangeIndexOfTiedPointsTeams(calculatedTeamData);
        expect(result).toStrictEqual([]);
    })
    it("given sorted team data with 2 tied teams in the middle, it should return an array of length 2", function () {
        const calculatedTeamData = [{ "points": 7 }, { "points": 4 }, { "points": 4 }, { "points": 1 }];
        const result = TableRankings.getRangeIndexOfTiedPointsTeams(calculatedTeamData);
        expect(result).toStrictEqual([[1, 2]]);
    })
    it("given sorted team data with 2 tied teams in the beginning, it should return an array of length 2", function () {
        const calculatedTeamData = [{ "points": 7 }, { "points": 7 }, { "points": 4 }, { "points": 1 }];
        const result = TableRankings.getRangeIndexOfTiedPointsTeams(calculatedTeamData);
        expect(result).toStrictEqual([[0, 1]]);
    })
    it("given sorted team data with 3 tied teams at the end, it should return an array of length 2 including last index", function () {
        const calculatedTeamData = [{ "points": 7 }, { "points": 4 }, { "points": 4 }, { "points": 4 }];
        const result = TableRankings.getRangeIndexOfTiedPointsTeams(calculatedTeamData);
        expect(result).toStrictEqual([[1, 3]]);
    })
    it("given sorted team data with 2 sets of tied teams, it should return every index of that array", function () {
        const calculatedTeamData = [{ "points": 7 }, { "points": 7 }, { "points": 4 }, { "points": 4 }];
        const result = TableRankings.getRangeIndexOfTiedPointsTeams(calculatedTeamData);
        expect(result).toStrictEqual([[0, 1], [2, 3]]);
    })
    it("given sorted team data with 2 sets of tied teams, it should return every index of that array", function () {
        const calculatedTeamData = [{ "points": 5 }, { "points": 5 }, { "points": 4 }, { "points": 4 }, { "points": 4 }, { "points": 4 }, { "points": 3 }, { "points": 2 }];
        const result = TableRankings.getRangeIndexOfTiedPointsTeams(calculatedTeamData);
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

describe("getRangeIndexOfTiedTeams()", function () {
    it("given sorted teams by points & gd, it returns range of index with similar points & gd", function () {
        const sortedByPointsAndGDTeam =
            [{ "gd": 1, "points": 5 },
            { "gd": 0, "points": 5 },
            { "gd": 6, "points": 4 },
            { "gd": 2, "points": 4 },
            { "gd": 1, "points": 4 },
            { "gd": 1, "points": 4 },
            { "gd": 1, "points": 3 },
            { "gd": 1, "points": 2 }];
        const result = TableRankings.getRangeIndexOfTiedTeams(sortedByPointsAndGDTeam);
        expect(result).toStrictEqual([[4, 5]]);
    })
    it("given sorted teams by points & gd, it returns range of index with similar points & gd", function () {
        const sortedByPointsAndGDTeam =
            [{ "gd": 1, "points": 5 },
            { "gd": 1, "points": 5 },
            { "gd": 1, "points": 4 },
            { "gd": 1, "points": 4 }];
        const result = TableRankings.getRangeIndexOfTiedTeams(sortedByPointsAndGDTeam);
        expect(result).toStrictEqual([[0, 1], [2, 3]]);
    })
    it("given sorted teams by points & gd, it returns range of index with similar points & gd", function () {
        const sortedByPointsAndGDTeam =
            [{ "gd": 1, "points": 5 },
            { "gd": 1, "points": 4 },
            { "gd": 1, "points": 4 },
            { "gd": 1, "points": 4 }];
        const result = TableRankings.getRangeIndexOfTiedTeams(sortedByPointsAndGDTeam);
        expect(result).toStrictEqual([[1, 3]]);
    })
    it("given sorted teams by points & gd, it returns range of index with similar points & gd", function () {
        const sortedByPointsAndGDTeam =
            [{ "gd": 1, "points": 5 },
            { "gd": 1, "points": 5 },
            { "gd": 1, "points": 4 },
            { "gd": 1, "points": 4 },
            { "gd": 1, "points": 4 }];
        const result = TableRankings.getRangeIndexOfTiedTeams(sortedByPointsAndGDTeam);
        expect(result).toStrictEqual([[0, 1], [2, 4]]);
    })
})

describe("getRelevantTeam()", function () {
    it("given an array with a pair, return all relevant teams within pair : 0", function () {
        const teamData = [{ "team_id": 1, "points": 6, "gd": 7 }, { "team_id": 3, "points": 4, "gd": 1 }, { "team_id": 2, "points": 4, "gd": 1 }];
        const tiedPointsAndGdTeamsIndexRange = [1, 2];
        const result = TableRankings.getRelevantTeam(teamData, tiedPointsAndGdTeamsIndexRange);
        expect(result).toStrictEqual({ "2": 0, "3": 0 });
    })
    it("given an array with a pair, return all relevant teams within pair : 0", function () {
        const teamData = [{ "team_id": 1, "points": 4, "gd": 1 }, { "team_id": 2, "points": 4, "gd": 1 }, { "team_id": 3, "points": 4, "gd": 1 }];
        const tiedPointsAndGdTeamsIndexRange = [0, 2];
        const result = TableRankings.getRelevantTeam(teamData, tiedPointsAndGdTeamsIndexRange);
        expect(result).toStrictEqual({ "1": 0, "2": 0, "3": 0 });
    })
})

describe("rankTeams()", function () {
    it("given 2 way tie, return final team data ranked", function () {
        const matchData = [
            {
                match_id: 100,
                team_one_id: 1,
                team_two_id: 2,
                team_one_goal_count: 2,
                team_two_goal_count: 3,
                winner_id: 2,
                losser_id: 1,
                tie: false,
            },
            {
                match_id: 404,
                team_one_id: 3,
                team_two_id: 2,
                team_one_goal_count: 2,
                team_two_goal_count: 3,
                winner_id: 2,
                losser_id: 3,
                tie: false,
            },
        ]

        const teamData =
            [{ "team_id": 3, "points": 6, "gd": 7 },
            { "team_id": 1, "points": 4, "gd": 1 },
            { "team_id": 2, "points": 4, "gd": 1 }];

        const tiedPointsAndGdTeamsIndexRange = [[1, 2]];

        const expectedResult = [{ "team_id": 3, "points": 6, "gd": 7 }, { "team_id": 2, "points": 4, "gd": 1 }, { "team_id": 1, "points": 4, "gd": 1 }];


    })

    it("given 3 way tie, return final team data ranked", function () {
        const matchData = [
            {
                match_id: 111,
                team_one_id: 1,
                team_two_id: 2,
                team_one_goal_count: 2,
                team_two_goal_count: 2,
                winner_id: null,
                loser_id: null,
                tie: true,
            },
            {
                match_id: 221,
                team_one_id: 1,
                team_two_id: 3,
                team_one_goal_count: 1,
                team_two_goal_count: 2,
                winner_id: 3,
                loser_id: 1,
                tie: false,
            },
            {
                match_id: 313,
                team_one_id: 2,
                team_two_id: 3,
                team_one_goal_count: 1,
                team_two_goal_count: 1,
                winner_id: null,
                loser_id: null,
                tie: true,
            },
            {
                match_id: 22222,
                team_one_id: 10,
                team_two_id: 3,
                team_one_goal_count: 1,
                team_two_goal_count: 1,
                winner_id: null,
                loser_id: null,
                tie: true,
            },
        ];

        const teamData = [
            { "team_id": 10, "points": 100, "gd": 100 },
            { "team_id": 1, "points": 1, "gd": 0 },
            { "team_id": 2, "points": 1, "gd": 0 },
            { "team_id": 3, "points": 1, "gd": 0 },
        ];

        const tiedTeamRange = [[1, 3]];

        const result = TableRankings.rankTeams(matchData, teamData, tiedTeamRange);
        expect(result).toStrictEqual([{ "gd": 100, "points": 100, "team_id": 10 }, { "gd": 0, "points": 1, "team_id": 3 }, { "gd": 0, "points": 1, "team_id": 1 }, { "gd": 0, "points": 1, "team_id": 2 }]);

    })

    it("given 4 way tie, return final team data ranked", function () {
        const matchData = [
            {
                match_id: 1,
                team_one_id: 1,
                team_two_id: 2,
                team_one_goal_count: 2,
                team_two_goal_count: 1,
                winner_id: 1,
                loser_id: 2,
                tie: false,
            },
            {
                match_id: 2,
                team_one_id: 1,
                team_two_id: 3,
                team_one_goal_count: 1,
                team_two_goal_count: 2,
                winner_id: 3,
                loser_id: 1,
                tie: false,
            },
            {
                match_id: 3,
                team_one_id: 1,
                team_two_id: 4,
                team_one_goal_count: 2,
                team_two_goal_count: 1,
                winner_id: 1,
                loser_id: 4,
                tie: false,
            },
            {
                match_id: 4,
                team_one_id: 2,
                team_two_id: 3,
                team_one_goal_count: 2,
                team_two_goal_count: 1,
                winner_id: 2,
                loser_id: 3,
                tie: false,
            },
            {
                match_id: 5,
                team_one_id: 2,
                team_two_id: 4,
                team_one_goal_count: 1,
                team_two_goal_count: 2,
                winner_id: 4,
                loser_id: 2,
                tie: false,
            },
            {
                match_id: 6,
                team_one_id: 3,
                team_two_id: 4,
                team_one_goal_count: 2,
                team_two_goal_count: 1,
                winner_id: 3,
                loser_id: 4,
                tie: false,
            },
            {
                match_id: 2432,
                team_one_id: 10,
                team_two_id: 3,
                team_one_goal_count: 1,
                team_two_goal_count: 1,
                winner_id: null,
                loser_id: null,
                tie: true,
            },
        ];

        const teamData = [
            { "team_id": 10, "points": 100, "gd": 100 },
            { "team_id": 1, "points": 6, "gd": 0 },
            { "team_id": 2, "points": 6, "gd": 0 },
            { "team_id": 3, "points": 6, "gd": 0 },
            { "team_id": 4, "points": 6, "gd": 0 },
        ];

        const tiedTeamRange = [[1, 4]];

        const result = TableRankings.rankTeams(matchData, teamData, tiedTeamRange);
        expect(result).toStrictEqual([{ "gd": 100, "points": 100, "team_id": 10 }, { "gd": 0, "points": 6, "team_id": 1 }, { "gd": 0, "points": 6, "team_id": 3 }, { "gd": 0, "points": 6, "team_id": 2 }, { "gd": 0, "points": 6, "team_id": 4 }]);
    })

    it("given 2 (3-way) ties, return final team data ranked", function () {
        const matchData = [
            {
                match_id: 1,
                team_one_id: 1,
                team_two_id: 2,
                team_one_goal_count: 3,
                team_two_goal_count: 1,
                winner_id: 1,
                loser_id: 2,
                tie: false,
            },
            {
                match_id: 2,
                team_one_id: 2,
                team_two_id: 3,
                team_one_goal_count: 2,
                team_two_goal_count: 2,
                winner_id: null,
                loser_id: null,
                tie: true,
            },
            {
                match_id: 3,
                team_one_id: 1,
                team_two_id: 3,
                team_one_goal_count: 1,
                team_two_goal_count: 2,
                winner_id: 3,
                loser_id: 1,
                tie: false,
            },
            {
                match_id: 4,
                team_one_id: 11,
                team_two_id: 22,
                team_one_goal_count: 2,
                team_two_goal_count: 2,
                winner_id: null,
                loser_id: null,
                tie: true,
            },
            {
                match_id: 5,
                team_one_id: 22,
                team_two_id: 33,
                team_one_goal_count: 1,
                team_two_goal_count: 3,
                winner_id: 33,
                loser_id: 22,
                tie: false,
            },
            {
                match_id: 6,
                team_one_id: 11,
                team_two_id: 33,
                team_one_goal_count: 2,
                team_two_goal_count: 1,
                winner_id: 11,
                loser_id: 33,
                tie: false,
            },
            // Additional random matches with other team ids (10 and 4004)
            {
                match_id: 7,
                team_one_id: 10,
                team_two_id: 4004,
                team_one_goal_count: 2,
                team_two_goal_count: 1,
                winner_id: 10,
                loser_id: 4004,
                tie: false,
            },
            {
                match_id: 8,
                team_one_id: 4004,
                team_two_id: 1,
                team_one_goal_count: 0,
                team_two_goal_count: 1,
                winner_id: 1,
                loser_id: 4004,
                tie: false,
            },
            {
                match_id: 9,
                team_one_id: 10,
                team_two_id: 11,
                team_one_goal_count: 1,
                team_two_goal_count: 2,
                winner_id: 11,
                loser_id: 10,
                tie: false,
            },
        ];

        const teamData = [
            { "team_id": 10, "points": 100, "gd": 100 },
            { "team_id": 11, "points": 6, "gd": 0 },
            { "team_id": 22, "points": 6, "gd": 0 },
            { "team_id": 33, "points": 6, "gd": 0 },
            { "team_id": 4004, "points": 5, "gd": 4 },
            { "team_id": 1, "points": 1, "gd": 0 },
            { "team_id": 2, "points": 1, "gd": 0 },
            { "team_id": 3, "points": 1, "gd": 0 },
        ];

        const tiedTeamRange = [[1, 3], [5, 7]];

        const result = TableRankings.rankTeams(matchData, teamData, tiedTeamRange);
        expect(result).toStrictEqual([{ "gd": 100, "points": 100, "team_id": 10 }, { "gd": 0, "points": 6, "team_id": 11 }, { "gd": 0, "points": 6, "team_id": 33 }, { "gd": 0, "points": 6, "team_id": 22 }, { "gd": 4, "points": 5, "team_id": 4004 }, { "gd": 0, "points": 1, "team_id": 1 }, { "gd": 0, "points": 1, "team_id": 3 }, { "gd": 0, "points": 1, "team_id": 2 }]);
    })
})
