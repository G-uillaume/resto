const openClose = () => {
    const now = new Date()
    const day = now.getDay()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    setTimeout(openClose, 1000)
    if ((day > 1 && (((hours === 11 && minutes >= 30) || (hours >= 12 && hours < 14)) || ((hours >= 18 && hours < 22) || (hours === 22 && minutes < 30))))
    || (day === 0 && ((hours === 11 && minutes >= 30) || (hours >= 12 && hours < 14)))) {
        return true
    } else {
        return false
    }
}

const lines = document.getElementsByClassName('lines')
const days = document.getElementsByClassName('days')
const time = document.querySelectorAll('.hours')

const changeTable = () => {
    let now = new Date()
    let hours = now.getHours()
    let minutes = now.getMinutes()
    switch (now.getDay()) {
        case 0: // DIMANCHE
            if ((hours === 11 && minutes >= 30) || (hours >= 12 && hours < 14)) {
                lines[6].style.backgroundColor = 'rgba(82, 199, 82, 0.7)'
                time[6].children[0].style.fontWeight = 'bold'
            } else {
                lines[6].style.backgroundColor = 'rgba(255, 0, 0, 0.7)'
            }
            break
        case 1: // LUNDI
            lines[0].style.backgroundColor = 'rgba(255, 0, 0, 0.7)'
            break
        case 2: // MARDI
            if ((hours === 11 && minutes >= 30) || (hours >= 12 && hours < 14)) {
                lines[1].style.backgroundColor = 'rgba(82, 199, 82, 0.7)'
                time[1].children[0].style.fontWeight = 'bold'
            } else if ((hours >= 18 && hours < 22) || (hours === 22 && minutes < 30)) {
                lines[1].style.backgroundColor = 'rgba(82, 199, 82, 0.7)'
                time[1].children[1].style.fontWeight = 'bold'
            } else {
                lines[1].style.backgroundColor = 'rgba(255, 0, 0, 0.7)'
            }
            break
        case 3: // MERCREDI
            if ((hours === 11 && minutes >= 30) || (hours >= 12 && hours < 14)) {
                lines[2].style.backgroundColor = 'rgba(82, 199, 82, 0.7)'
                time[2].children[0].style.fontWeight = 'bold'
            } else if ((hours >= 18 && hours < 22) || (hours === 22 && minutes < 30)) {
                lines[2].style.backgroundColor = 'rgba(82, 199, 82, 0.7)'
                time[2].children[1].style.fontWeight = 'bold'
            } else {
                lines[2].style.backgroundColor = 'rgba(255, 0, 0, 0.7)'
            }
            break
        case 4: // JEUDI
            if ((hours === 11 && minutes >= 30) || (hours >= 12 && hours < 14)) {
                lines[3].style.backgroundColor = 'rgba(82, 199, 82, 0.7)'
                time[3].children[0].style.fontWeight = 'bold'
            } else if ((hours >= 18 && hours < 22) || (hours === 22 && minutes < 30)) {
                lines[3].style.backgroundColor = 'rgba(82, 199, 82, 0.7)'
                time[3].children[1].style.fontWeight = 'bold'
            } else {
                lines[3].style.backgroundColor = 'rgba(255, 0, 0, 0.7)'
            }
            break
        case 5: // VENDREDI
            if ((hours === 11 && minutes >= 30) || (hours >= 12 && hours < 14)) {
                lines[4].style.backgroundColor = 'rgba(82, 199, 82, 0.7)'
                time[4].children[0].style.fontWeight = 'bold'
            } else if ((hours >= 18 && hours < 22) || (hours === 22 && minutes < 30)) {
                lines[4].style.backgroundColor = 'rgba(82, 199, 82, 0.7)'
                time[4].children[1].style.fontWeight = 'bold'
            } else {
                lines[4].style.backgroundColor = 'rgba(255, 0, 0, 0.7)'
            }
            break
        case 6: // SAMEDI
            if ((hours === 11 && minutes >= 30) || (hours >= 12 && hours < 14)) {
                lines[5].style.backgroundColor = 'rgba(82, 199, 82, 0.7)'
                time[5].children[0].style.fontWeight = 'bold'
            } else if ((hours >= 18 && hours < 22) || (hours === 22 && minutes < 30)) {
                lines[5].style.backgroundColor = 'rgba(82, 199, 82, 0.7)'
                time[5].children[1].style.fontWeight = 'bold'
            } else {
                lines[5].style.backgroundColor = 'rgba(255, 0, 0, 0.7)'
            }
            break
    }
    setTimeout(changeTable, 1000)
}

changeTable()