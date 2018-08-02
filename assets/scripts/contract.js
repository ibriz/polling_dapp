var contractAddress = "0x34b78d333d9104e45213b4338a39768d6e6f4fed";
var contractABI= [
	{
		"constant": true,
		"inputs": [],
		"name": "isVoted",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getMyVote",
		"outputs": [
			{
				"name": "country",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getVoteCount",
		"outputs": [
			{
				"name": "plasma",
				"type": "int256"
			},
			{
				"name": "stateChannel",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_voteIndex",
				"type": "uint8"
			}
		],
		"name": "doVote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "votedBy",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "vote",
				"type": "uint8"
			}
		],
		"name": "VotedEvent",
		"type": "event"
	}
];
