pragma solidity ^0.4.17;

// 班级投票系统
contract ClassBallot {

    // 主持人
    address public host;

    // 候选人
    struct Candidate {
        string name;   // name
        uint voteCount; // votes number
        string speak;
    }

    // 投票
    struct Voter {
        bool voted;  // 是否投过票
        bool authorize; // 是否有权利
        uint vote;   // 投票
    }
    

    // 存储投票
    mapping(address => Voter) public voters;

    // 储存地址
    address[] public addresss;

    // 存储候选人
    Candidate[] public Candidates;
    
    // 存储胜利者
    uint[] public winningCandidates;

    string[] public winningName;

    // 如果出现票数相同现象
    


    // 根据给定候选人创建投票系统
    constructor() public {
        host = msg.sender;
        
    }

    function addCandidate(string memory CandidateName,string memory hisspeak) public {
        // 仅主持人可以添加
        require(msg.sender == host,"ClassBallot 50 failed");
        Candidates.push(Candidate({name: CandidateName, voteCount: 0, speak: hisspeak}));

    }

 



    // 为账户添加投票授权
    function giveRightToVote(address voter) public {
        // 仅主持人可以授权
        require(msg.sender == host,"ClassBallot 62 failed");
        require(!voters[voter].voted,"ClassBallot 63 failed");
        require(!voters[voter].authorize,"ClassBallot 64 failed");

        addresss.push(voter);
        voters[voter].authorize = true;
    }

    // 为候选人投票
    function vote(uint candidate) public {
        Voter storage sender = voters[msg.sender];
        // 第一次投票
        require(!sender.voted,"ClassBallot 74 failed");
        // 拥有授权
        require(sender.authorize,"ClassBallot 76 failed");
       

        sender.voted = true;
        sender.vote = candidate;

        Candidates[candidate].voteCount += 1;
    }

    // 计算获选人
    function winningCandidate() public {  

        uint winningVoteCount = 0;
        uint size = Candidates.length;
        delete winningCandidates;
        for (uint i = 0; i < size; i++) {
            if (Candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = Candidates[i].voteCount;
            }
        }
        for (uint t = 0; t < size; t++) {
            if (Candidates[t].voteCount == winningVoteCount) {
                winningCandidates.push(t);
                winningName.push(Candidates[t].name);
            }
        }
        if (winningName.length > 1) {
            for (uint m = 0; m < addresss.length; m++) {
                voters[addresss[m]].voted = false;
            }
            delete Candidates;
        }
    }

    //出现票数相同现象再次计算
    function winnersSpeak(string memory newspeak) public {  
        require (winningCandidates.length > 1,"ClassBallot 111 failed"); 
        
        for (uint n = 0; n < winningName.length; n++) {
            Candidates.push(Candidate({name: winningName[n], voteCount: 0, speak: newspeak}));
        }

        
    }


}
//['wang','zhang','li','feng']