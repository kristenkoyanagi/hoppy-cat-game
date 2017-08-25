# unit-1-project: Hoppy Cat

## Explanation
Hoppy Cat is essentially a remake of "Frogger" in which you are a cat that has to dodge moving dogs to get to the food bowls.

## Rules of the Game
Use the arrow keys on the board to maneuver through the dogs running past the screen. Get 4 of your cats to the four food bowls before the timer runs out and before you lose all your cat lives to beat the level. The green rows are safe from dogs.

Start:
60 seconds time limit
5 Lives
0 points

Points:
-500 Losing a cat life
+1000 Getting a cat to the food bowl
+5000 Completing the level

Level Up:
+3 Lives
60 second timer

## Features Implemented
- Changes cats every time you get to a food bowl or if you lose a life.
- Dog obstacles come from both sides of the game screen.
- Adding more dogs when the levels increase


## Technologies Used
- HTML
- CSS
- Bootstrap
- Javascript
- jQuery
- p5 Dom js library

## Process/Approach
* Brainstormed game ideas
* Created a basic wireframes (See pics in the repo)
* Figured out basic features and created Trello board with user stories
* Trello Board: https://trello.com/b/ATeh7MAj/unit-1-project
* Started with basic HTML/CSS structure and added game screen bootstrap
* Fiddled around with canvas and choosing a JS canvas library to start creating images for the game (took a long long time)
* Uploaded images for the game objects
* Created first cat and used p5 to create canvas and cat movement with keypress
* Created other objects -- the moving dogs on the screen and the food bowl and stationary dogs -- and placed them on the screen without them flying off the page
* Randomized the movement/placement of food and dogs
* Added basic game logic: scoring, timing, lives
* Implemented collision conditions for cats and dogs and food -- added win and lose conditions
* Fixed the start and end game screens/buttons and how to hide the imgs
* Completed basic level 1 of the hoppy cat game with collision controls, scoring, and win/loss conditions
* Figured out how to set and reset imgs on the screens so could implement the restart game or next level functionality
* Added the shuffling of the end row food bowls and dogs between level changes
* Added more cats to interchange during game play
* Made dogs move from both directions and add more dogs during gameplay as levels progress
* Made game easier because it was too hard to get to Level 8
* Added a brief pause in movement after you respawn a cat so you don't accidentally run into dogs
* Had to change a lot of the code because it was unresponsive to different view screen sizes. Now it is more responsive to different view widths/heights.


## Bugs
* Can move cat to the same bowl multiple times
* Cat and food bowls are sometimes not arranged on the screen right, e.g. cat is behind food bowl sometimes but on top at other times
* With the adding dogs per level functionality, there was a bug when you reset the game that the dogs were still there. I semi-fixed it by changing the position of the dogs that shouldn't be on the screen, but it doesn't work perfectly because sometimes the stroll on the screen from the side of the screen.

## Future Features
* High score saving on a db


## Biggest Wins and Challenges
* My biggest challenge was trying to make canvas work so I could get my images on the screen and move them without getting a trail of images or getting no image. I tried many different ways before settling on p5. However, p5 sometimes doesn't work in the way I want it to because it has a few functions that only run at certain times and it's hard to replicate or control them. Also, the documentation on p5 images was not very robust and I ran into many problems in my image creation (had to work around many things).
