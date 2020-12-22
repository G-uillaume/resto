const livraison = () => {
    let now = new Date()
    let openDelay = (Math.floor(Math.random() * (40 - 31) + 30)) * 60 * 1000 // 30mn + 0 à 10mn = 30 à 40mn
    let closeDelay = (Math.floor(Math.random() * (50 - 31) + 30)) * 60 * 1000 // 30 à 50mn
    let deliveryTime
    let openingHours
    let delayToOpening
    if (openClose()) {
        deliveryTime = now.getTime() + openDelay
    }
    else {
        if ((now.getHours() >= 14 && now.getHours() < 18) && now.getDay() !== 0 && now.getDay() !== 1) { // Après-midi, lundi et dimanche exclus
            console.log('Apres-Midi')
            openingHours = now
            openingHours.setHours(18)
            openingHours.setMinutes(00)
            openingHours.setSeconds(00)
            delayToOpening = openingHours.getTime() - now.getTime()
            deliveryTime = now.getTime() + delayToOpening + closeDelay
        } else if ((now.getHours() < 11 && now.getMinutes() < 30) && now.getDay() !== 1) { // matin lundi exclu
            console.log('matin')
            openingHours = now
            openingHours.setHours(11)
            openingHours.setMinutes(30)
            openingHours.setSeconds(00)
            delayToOpening = openingHours.getTime() - now.getTime()
            deliveryTime = now.getTime() + delayToOpening + closeDelay
        } else if (((now.getHours() === 22 && now.getMinutes() >= 30) || now.getHours() > 22 || now.getDay() === 1) && now.getDay !== 0) { // soir (dimanche exclu) ou lundi
            console.log('soir ou lundi')
            openingHours = now
            let day = openingHours.getDate()
            console.log(day)
            openingHours.setDate(day + 1)
            openingHours.setHours(11)
            openingHours.setMinutes(30)
            openingHours.setSeconds(00)
            delayToOpening = openingHours.getTime() - now.getTime()
            deliveryTime = now.getTime() + delayToOpening + closeDelay
        } else if (now.getDay() === 0 && now.getHours() >= 14) { // dimanche après-midi
            console.log('dimanche apres midi')
            openingHours = now
            let day = openingHours.getDate()
            openingHours.setDate(day + 2)
            openingHours.setHours(11)
            openingHours.setMinutes(30)
            openingHours.setSeconds(00)
            console.log(openingHours)
            delayToOpening = openingHours.getTime() - now.getTime()
            deliveryTime = now.getTime() + delayToOpening + closeDelay
        }
    }
    return deliveryTime
}

const change = (x) => {
    const now = new Date()
    const nowToThere = x - now.getTime() // nowToThere va diminuer à chaque seconde grâce au setTimeout, d'ou le besoin d'avoir x qui ne bouge pas, donc de l'avoir déclarer à l'extérieur de la fonction 
    if (nowToThere <= 0) {
        return
    }
    let hours = Math.floor(nowToThere / (1000 * 60 * 60)) // pour n'avoir que les heures (nombre entier)
    if (hours < 10 && hours !== 0) {
        hours = '0' + hours
    }
    let minutes = Math.floor((nowToThere - (hours * (1000 * 60 * 60))) / (1000 * 60)) // pour n'avoir que les minutes (nombre entier)
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    let seconds = Math.floor((nowToThere - (hours * (1000 * 60 * 60)) - (minutes * (1000 * 60))) / 1000) // pour n'avoir que les secondes (nombre entier)
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    
    const p = document.querySelector('#delivery')
    if (hours > 0) {
        p.textContent = 'Votre commande sera livrée dans ' + hours + 'h' + minutes + 'm' + seconds + 's.'
    } else if (minutes > 0) {
        p.textContent = 'Votre commande sera livrée dans ' + minutes + 'm' + seconds + 's.'
    } else {
        p.textContent = 'Votre commande sera livrée dans ' + seconds + 's.'
    }
    setTimeout(() => change(x), 1000)
}