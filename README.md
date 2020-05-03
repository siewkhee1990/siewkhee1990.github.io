# Memory Game - Pokemon

## Game Description

This is a memory game where players open around a set of given tiles then match 2 same tiles to dissolve. The player will complete the game by matching all the pairs. Upon completion, the player will then be rewarded with a random Pokemon where it will be added to the PokeDex and player can view it later. Player can choose from 4 modes to begin the challenge.

## Game Link

[Memory Game - Pokemon](https://github.com/siewkhee1990/siewkhee1990.github.io)
[other link](https://lo1ld.csb.app/)

## Technologies

- **HTML** - HTML were used to provide GUI for user to interact with
- **CSS** - CSS were used to provide better display or style for the player
- **JavaScript** - JavaScript were used to process most of the logic and calculation of the game
- **jQuery** - jQuery were used to manipulate the DOM structure of HTML to provide more interactive interface
-**AJAX** - API were called by adopting AJAX call

## API used

http://pokeapi.co/ - The API is used to get the Pokemon sprites, Pokemon name, Pokemon type to be displayed in PokeDex in the game.

## User Journey
![](https://github.com/siewkhee1990/siewkhee1990.github.io/blob/master/userjourney/1.png)
The user will be prompted to enter name to play or play anonymously without name input. User will not be able to use continue game if name is blank. If users are to put in a name and click continue, it will create a new user with the name provided.

![](https://github.com/siewkhee1990/siewkhee1990.github.io/blob/master/userjourney/2.png)
After the first page, user will then be prompted to choose from 4 difficulties level and to view his/her current PokeDex. As database structure has yet been introduced here, the user progress will be lost once the browser reload. The name that user typed in will be displayed on top as circled in red. The user will not require password to login as of now as this is just the very beginning stage of gaming.

![](https://github.com/siewkhee1990/siewkhee1990.github.io/blob/master/userjourney/3.png)
Picture above shows when user click on PokeDex and user is viewing the info of the captured Pokemon. The picture and info of the Pokemon is taken from API.

![](https://github.com/siewkhee1990/siewkhee1990.github.io/blob/master/userjourney/4.png)
![](https://github.com/siewkhee1990/siewkhee1990.github.io/blob/master/userjourney/5.png)
Upon selecting the difficulty level, tiles will be arranged to the HTML and user will be required to empty the tiles by trying to match the tiles. Supposingly the original intention of game design is the target Pokemon to be captured. However, the API returned picture is not quite clear and due to the time constraint, it may be improved.

![](https://github.com/siewkhee1990/siewkhee1990.github.io/blob/master/userjourney/6.png)
The Pokemon "ran away" because user were not able to finish the game in time. Prompt user to try again?

![](https://github.com/siewkhee1990/siewkhee1990.github.io/blob/master/userjourney/7.png)
Upon completing the game, user will be prompted successfully captured the Pokemon. This Pokemon is generated randomly.

![](https://github.com/siewkhee1990/siewkhee1990.github.io/blob/master/userjourney/8.png)
The Pokemon is added and shown in the PokeDex.

![](https://github.com/siewkhee1990/siewkhee1990.github.io/blob/master/userjourney/9.png)
And the Pokemon info can be shown upon clicking view and the info is from API server.

## Accomplishment / Lesson Learnt

- I faced difficulties in getting access to DOM structure using jQuery library but as I practise more, I get to know that accessing DOM structure is more like accessing multiple levels of object in JavaScript.
- To position the two images within the same grid is challenging at first but in the end I learnt to manipulate the CSS of the images so that it looks as it is currently.
- I learnt how to disable event listeners by using CSS to temporarily disable the selected tiles as originally player are able to just double click on the same grid to win the game easily.
- As I practised code refactoring, it helps me to think of a better way to write and organize the codes in the future.

## Future development ideas

- Getting user to sign in with Google / Facebook account and incorporating database so that users can register / save the progress of the game.
- Matching tiles by the Pokemon's type. eg. Charmander & Magmaraq  
- Power Ups such as additional time or hint.
- Maybe incorporate with the current Pokemon Go game, when user attemp to catch the Pokemon, they will be challenged to play this game in order to successfully capture the Pokemon.

## Credit

First of all, I would like to thank my wife as most of the time she guided and coached me through the difficult logic or the functions that I have difficulty in understanding, so that i would understand and use it later in the project. Besides, she had assisted me in taking care of the household and our kid because of the study schedule arrangement. Moreover, I would like to thank the instructor team, Mr. Zhou Yin Sheng, Mr. Liew Min Shan, Mr. Wilfred Loh and my group partner, Mr. Lee Yue Jia on helping me to check on the code and provided very good feedback to improve my logic / coding skill and also code organization of this project. 
