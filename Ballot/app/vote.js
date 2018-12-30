function getitem() {
    setStatus('Going to get candidates... (please wait)')

    $.get("http://localhost:8080/candidate", function (res) {

        if (typeof res.candidates != undefined) {
            var candidatess = res.candidates;
            var num = res.num;
            document.getElementById("voteindex").options.length = 0;

            for (var i = 0; i < num; i++) {
                console.log(i)
                document.getElementById("voteindex").options.add(new Option(candidatess[i], candidatess[i]));
            }


            setStatus('Get complete!')
        }
        else {
            setStatus('Error getting; see log.')
        }
    })

}

function vote() {
    setStatus('Going to vote... (please wait)')
    const index = parseInt(document.getElementById('voteindex').selectedIndex)
    var account = document.getElementById("account").value;

    $.post("http://localhost:8080/vote/vote", { index: index, address: account }, function (res) {

        if (typeof res.flag != undefined) {
            if (res.flag == "true") {
                setStatus('Vote complete!')
            }
            else {
                setStatus('Error in vote; see log.')
            }

        }
        else {
            setStatus('Error in vote; see log.')
        }
    })
}

function winner() {

    this.setStatus('Get... (please wait)')

    $.get("http://localhost:8080/winner", function (res) {
        if (typeof res.win != undefined) {
            setStatus('Get complete!')
            alert("winner name: " + res.win)
        }
        else {
            setStatus('Error getting; see log.')
        }
    })

}
function setStatus(message) {
    const status = document.getElementById('status')
    status.innerHTML = message
}