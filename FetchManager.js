export {FetchManager};

class FetchManager {

 // arxiki selida analoga me to response emfanizei to main menu h tin bara twn paiktwn
    
    static StartPage(game, restart = false) {
        fetch('/ludo/ajax/sessionManager.php', {
            method: 'POST',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            },
            body: (restart) == true ? `restart=${restart}` : '',
        })
            .then(response => response.json())
            .then(data => {
                if (data.newSession == true) {
                    game.CreateMainMenuPage();
                } else {
                    game.CreatePlayersBar(data);
                    this.DataServerCoroutine(game);
                    if (data.myTurn == true) {
                        game.CreateMoveDivs(data.pawnsToMove)
                    }
                }
               
            })
    }

 // prosthiki paikti sto paixnidi

    static AddPlayerToGame(game, nick, privateRoom = null) {
        fetch('/ludo/ajax/addToGame.php', {
            method: 'POST',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            },
            body: `nick=${encodeURIComponent(nick)}${(privateRoom) == null ? '' : `&private=${(privateRoom) == true ? '1' : '0'}`}`,
        })
            .then(response => response.json())
            .then(data => {
                game.CreatePlayersBar(data);
                this.DataServerCoroutine(game);
            })
    }

 // allazei to status tou paikti gia na arxisei to paixnidi kai enimeronei ta pionia ( HOME )

    static ChangePlayerStatusFetch(game, val) {
        fetch('/ludo/ajax/changePlayerStatus.php', {
            method: 'POST',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            },
            body: `status=${val}`,
        })
            .then(response => response.json())
            .then(data => {
                if (data.startGame == true) {
                    game.PrepareGame(JSON.parse(data.pawnData));
                } else {
                    game.gameStart = false;
                }
            })
    }
 // data update synexis anaktisi dedomenwn gia na einai updated h katastasi toy paixnidiou h na teleiwsei to paixnidi
    static DataServerCoroutine(game, one = null) {
        let fetchFun = () => {
            let startTime = Date.now();
            fetch('/ludo/ajax/getAllData.php', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == true) {
                        if (data.endGame == false) {
                            let endTime = Date.now();
                            let ping = (endTime - startTime) / 2
                            data.currentTime = data.currentTime + ping;
                            game.DataParser(data)
                        } else {
                            game.CreateEndGameScreen(JSON.parse(data.leaderBoard), data.myColor)
                        }
                    } else {
                        clearInterval(game.dataInterval);
                        game.Start(true);
                    }
                })
        }
        fetchFun();
        if (one == null) {
            game.dataInterval = setInterval(() => {
                fetchFun();
            }, 1000)
        }
    }

 // riksimo zariwn

    static ThrowDiceFetch(game) {
        fetch('/ludo/ajax/throwDice.php', {
            method: 'POST',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == true) {
                    if (data.moveStatus == true) {
                        game.CreateMoveDivs(JSON.parse(data.pawnsToMove))
                    }
                    if(game.throwDiceAnimTimeout != null){
                        clearTimeout(game.throwDiceAnimTimeout);
                        game.throwDiceAnimTimeout = null
                    }
                    game.throwDiceButton.style.display = "none";
                    game.diceDiv.style.opacity = "0";
                    game.diceDiv.style.backgroundImage = `url('./img/dice/${data.myColor}/${data.diceValue}.png')`;
                    setTimeout(() => {
                        game.diceDiv.style.transform = "rotate(360deg)";
                        game.diceDiv.style.opacity = "1";
                    }, 50)
        
                }
            })
    }

// kinisi pioniou kai update tou board h telos paixnidiou

    static ExecuteMoveFetch(game, id) {
        fetch('/ludo/ajax/executeMove.php', {
            method: 'POST',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            },
            body: `pawnID=${id}`
        })
            .then(response => response.json())
            .then(data => {
                if (data.pawnData != undefined) {
                    let pawnData = JSON.parse(data.pawnData);
                    game.CreateGameBoard(pawnData)
                }
                if (data.endGame == true) {
                    game.CreateEndGameScreen(JSON.parse(data.leaderBoard), data.myColor)
                }
            })
    }
/*
    //static GetRoomsFetch(game, list){
       fetch('/ludo/ajax/getRooms.php', {
            method: 'GET'
       })
           .then(response => response.json())
           .then(data => {
                if(data.status == true){
                    let roomData = JSON.parse(data.rooms);
                    game.FillRoomList(roomData, list);
                } else {
                    list.innerHTML = '';
                }
          })
    } */

// eisodos paikti me invitecode

    static JoinRoomByInviteFetch(game, nick, inviteCode) {
        fetch('/ludo/ajax/joinRoomByInvite.php',{
            method: 'POST',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            },
            body: `nick=${nick}&inviteCode=${inviteCode}`
        })
            .then(response => response.json())
            .then(data => {
                if(data.status == false){   //an lathos kodikos h panw apo 4 paiktes
                    game.Start(true);
                    alert("CONNECTION FAILED!")
                } else {
                    game.CreatePlayersBar(data);
                    this.DataServerCoroutine(game);
                }
            })
    }
}