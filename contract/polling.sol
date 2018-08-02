pragma solidity ^0.4.24;

contract PollingContract {

    struct VoteCount {
        uint64 plasma;
        uint64 stateChannel;
    }

    VoteCount  totalVotes;

    //1 == plasma  2 == StateChannel
    mapping (address => uint8) votesMapping;

    event VotedEvent (
        address indexed votedBy,
        uint8 vote);

    function doVote(uint8 _voteIndex) public {
        require(_voteIndex > 0 && _voteIndex < 3);
        require(votesMapping[msg.sender] != 1 && votesMapping[msg.sender] != 2);
        votesMapping[msg.sender] = _voteIndex;
        if(_voteIndex == 1) {
            totalVotes.plasma++;
        }
        else if(_voteIndex == 2) {
            totalVotes.stateChannel++;
        } else {
            revert("Vote index out of bound");
        }
        emit VotedEvent(msg.sender, _voteIndex);
    }

    //returns plasma count and stateChannel count
    function getVoteCount() public view returns(int, int ){
        return  (totalVotes.plasma,totalVotes.stateChannel);
    }

    function getMyVote() public view returns (string){
        require(votesMapping[msg.sender] == 1 || votesMapping[msg.sender] == 2);

        if(votesMapping[msg.sender] == 1) {
            return "plasma";
        }
        else if (votesMapping[msg.sender] == 2) {
            return "stateChannel";
        } else {
            revert("Vote index out of bound");
        }
   }

   function isVoted() public view returns (bool){
       if(votesMapping[msg.sender] == 1 || votesMapping[msg.sender] == 2)
           return true;
       else
           return false;
    }
}
