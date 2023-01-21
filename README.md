# soccer-functions

## Objective 

Display the Soccer Teams in a ranked order from most points to least points. The returned objec should be in the following format 

```
rankedTeams = { name:"Team Name", points: 12 } 
```

## Criteria 

To determine a soccer teams ranking you will need to follow some conditions 
 1. Whoever has the most 'points' 
    - a win equals 3 points to the winning team , a tie equals 1 point to each team , a loss equals 0 points to the losing team 
    - A teams 'points' is calculated in the following way: Team A playee 3 games, won 2 and lost 1 : its total is (2 * 3) + (1 * 0) = 6 points 
    
 2. In case of a tie in 'points' then compare a teams 'goal differential' value. Rank accordiagly the tied teams based off the higher 'goal differential' value
    - Goal differential is calculated as the number of goals scored in all league matches (in this case each team playes 3 games)  minus the number of goals conceded
    
 3. In case the teams have the same 'goal differential' value, then will need to check which of the teams beat the other team when they faced each other. 
 
 
 ## Get Started
  1. [Clone the repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) 
  2. Open Terminal in vs code and run the following command to download npm packeges 
  ```
  npm install
  ```
  3. Right Click on index.html and "open with live server" 
  4. Make a branch and work off that:
        ```
          git checkout -b myBranchName
       ```
  4. To run tests
      - ensure you comment out lines as indicated in TableRankings.js 
      - run this command in vs code terminal 
       ```
          npm test
       ```
     
 
