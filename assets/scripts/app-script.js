(
(controller)=>{
    controller.init = () => {
      console.log("in  controller.init");

      if (web3 != "undefined")
          web3 = new Web3(web3.currentProvider);
      else
          web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
      appContract = web3.eth.contract(contractABI).at(contractAddress);

      controller.getAllVotes();

    }
    //Get wallet account balance to see if it can pay gas
    controller.getWalletBalance = () => {
        console.log("in controller.getWalletBalance");
        return new Promise((resolve, reject) => {
            web3.eth.getBalance(web3.eth.defaultAccount, (err, res) => {
                if (!err)
                    resolve(res)
            });
        })
    }

    controller.getMyVote = () => {
        appContract.getMyVote({from: web3.eth.defaultAccount}, (err, response) => {
            if (!err){
                //alert("you voted " + response);
                document.getElementById("votedFor").innerText = response;
            }
            else
                alert("Sorry !! you have not voted");
        });
    }

    controller.getAllVotes = () => {
        appContract.getVoteCount((err, response) => {
            if (!err) {
                console.log(response);
                document.getElementById("totalVotesPlasma").innerText = response[0];
                document.getElementById("totalVotesStateChannel").innerText = response[1];
                controller.drawChart(response)
            }
            else {
                console.log("unable to get all votes")
            }
        });
    }

    controller.vote = () => {
        var polledValue = document.querySelector("input[name='winnerRadio']:checked").value
        console.log("polledValue :" + polledValue);

        controller.getWalletBalance()
            .then( balance  => {
                    console.log("balance is :" + balance);
                    if (balance > 0) {
                            return controller.checkIfVoted();
                    } else {
                        throw ("you do not have enough balance");
                    }
            })
            .then (myVote => {
                if(myVote) {
                    throw ("You've already voted");
                } else {
                    console.log("do a txn to vote");
                    appContract.doVote.sendTransaction(polledValue,{gasPrice: 41000000000}, (err, response) => {
                            if (!err) {
                                alert("Thank you for voting");
                                controller.getAllVotes();
                            } else {
                                throw("something went wrong in voting");
                            }
                        }
                      )
                }
            })
            .catch(err => {
                console.log("in catch err :" + err);
                alert(err);
            })
    }
    controller.checkIfVoted = () => {
        return new Promise( (resolve, reject) => {
        appContract.isVoted({from: web3.eth.defaultAccount}, (err, response) => {
            if (!err){
                console.log("isVoted response :" + response)
                resolve(response)
            }
            else {
                console.log("isVoted err :" + err)
                reject(err);
            }
        })
      })
    }
    controller.drawChart = (voteResult) => {
        console.log("in controller.drawChart");

        document.getElementById("totalVotes").innerText = +voteResult[0] + +voteResult[1];
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Plasma", "StateChannel"],
                datasets: [{
                    label: '# Plasma vs StateChannel Vote',
                    data: [voteResult[0], voteResult[1]],
                    backgroundColor: [

                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)'

                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255,99,132,1)',

                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

 controller.init();
}
)(myController)
