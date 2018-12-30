function setStatus(message) {
    const status = document.getElementById('status')
    status.innerHTML = message
}

function addCandidate() {

    const name = document.getElementById('name').value
    const speak = document.getElementById('speak').value
    setStatus(name + speak + 'Adding a candidate... (please wait)')

    $.post("http://localhost:8080/host/addCandidate", { name: name, speak: speak }, function (res) {
        if (typeof res.flag != undefined) {
            if (res.flag == "true") {
                setStatus('Add complete!')
            }
            else {
                setStatus('Error adding a candidate; see log.')
            }

        }
        else {
            setStatus('Error adding a candidate; see log.')
        }

    })

}


function giveRight() {

    var toright = document.getElementById("toright").value
    setStatus('Giving people to right to vote... (please wait)')

    $.post("http://localhost:8080/host/giveRight", { address: toright }, function (res) {
        if (typeof res.flag != undefined) {
            if (res.flag == "true") {
                setStatus('Give right complete!')
            } else {
                setStatus('Error giving right; see log.')
            }
        }
        else {
            setStatus('Error giving right; see log.')
        }

    })



}


function winner() {

    this.setStatus('Computer... (please wait)')

    $.get("http://localhost:8080/host/winner", function (res) {
        if (typeof res.win != undefined) {
            alert("winner name: " + res.win)
            setStatus('Computer complete!')
        }
        else {
            setStatus('Error computering; see log.')
        }
    })

}

function reset() {

    this.setStatus('Reset... (please wait)')

    $.get("http://localhost:8080/host/reset", function (res) {
        if (typeof res.flag != undefined) {
            if (res.flag == "true") {
                setStatus('Reset right complete!')
            } else {
                setStatus('Error Reset right; see log.')
            }
        }
        else {
            setStatus('Error Reset right; see log.')
        }

    })

}

