
// TODO tasto destro su una carta ti fa vedere le possibili combinazioni
// TODO modalità 2, selezioni n carte e ti fa vedere le combinazioni possibili

// TODO creare una Map (Card -> Oggetto X)   X =   level1 -> tutte le seconde carte, level2 -> tutte le terze carte ecc
// quando clicco su una carta deve highlitarmi tutte le carte che sono nell'oggetto level1, se clicco su un level1 allora mi fa vedere
// il level 2 ecc

const container = document.getElementsByClassName("container")[0]
// sarebbe comodo poter leggere da file e salvare, visto che voglio updatare as i go
// leggere da file il mazzo distinct

// let data = new Map()
let selectedCards = new Set()
let cardsData1 = []
let cardsData2 = []

let currentFusionLevel = 1
let currentFusionEnded = 0
const MAX_FUSION_LEVEL = 3

let fusionsAll = []
let fusionSpecificCard = []

let previousCard = ""
let fusionValue = ""

function createCard(cardName) {
    const box = document.createElement("div")
    box.classList.add("box", "box-hover")
    box.style.backgroundImage = `url('cards/${cardName}.jpg')`
    box.style.backgroundSize = "100%"
    box.setAttribute("id", `${cardName}`)
    // const name = document.createElement("p")
    // name.className = "cardName"
    // name.textContent = cardName
    // box.appendChild(name)
    box.onclick = (e) => addCardAndCheckIfFound(box, cardName, e)
    return box
}

function createCardName(cardName) {
    const name = document.createElement("p")
    name.className = "cardName"
    name.textContent = cardName
    return name
}

function resetFusionVals() {
    currentFusionLevel = 1 // resetting level
    currentFusionEnded = 0 // ending fusion phase
    selectedCards = new Set()
    fusionsAll = []
    fusionSpecificCard = []
    document.querySelectorAll(".box-selected").forEach(x => x.classList.remove("box-selected"))
    document.querySelectorAll(".box").forEach(x => x.classList.add("box-hover"))
    document.querySelectorAll(".not-selected-cards").forEach(x => x.classList.remove("not-selected-cards"))
}

function addCardAndCheckIfFound(box, cardName, event) {
    box.classList.remove("box-hover")
    box.classList.add("box-selected")


    /***************/
    // New tactics //
    /***************/

    document.querySelectorAll(".highlight-card").forEach(x => x.classList.remove("highlight-card"))
    document.querySelectorAll(".box:not(.highlight-card, .box-selected)").forEach(x => x.classList.add("not-selected-cards"))

    if (!currentFusionEnded) { // se la current fusione massima è finita ricalcola tutto altrimenti continua con lo stesso oggetto
        fusionsAll = []
        const fusionsData1 = cardsData1.filter(ele => ele.key === cardName)
        const fusionsData2 = cardsData2.filter(ele => ele.key === cardName)

        fusionsAll = fusionsData1.concat(fusionsData2)
    }

    // console.log(`${cardName} -> ${JSON.stringify(fusionsAll)}`)

    let filteredFusions = []

    if (currentFusionLevel === 1) {
        filteredFusions = fusionsAll.flatMap(ele => ele.val.filter(e => e.name !== undefined && e.level === currentFusionLevel))
        fusionSpecificCard = fusionsAll.filter(ele => ele.name = cardName)
    } else if (currentFusionLevel === 2) {
        for (i = 0; i < fusionSpecificCard.length; i++) {
            for (j = 0; j < fusionSpecificCard[i].val.length; j++) {
                if (fusionSpecificCard[i].val[j].name === cardName &&
                    fusionSpecificCard[i].val[j + 1].name !== undefined) {
                        filteredFusions = [fusionSpecificCard[i].val[j + 1]]
                        fusionValue = fusionSpecificCard[i].fused
                }
                if (fusionSpecificCard[i].val[j].name === cardName && fusionSpecificCard[i].val[j + 1].name === undefined)
                    fusionValue = fusionSpecificCard[i].fused
            }
        }
    } else {
        for (i = 0; i < fusionSpecificCard.length; i++) {
            for (j = 0; j < fusionSpecificCard[i].val.length; j++) {
                if (fusionSpecificCard[i].val[j].name === cardName &&
                    fusionSpecificCard[i].val[j + 1].name !== undefined &&
                    fusionSpecificCard[i].val[j - 1].name === previousCard) {
                        filteredFusions = [fusionSpecificCard[i].val[j + 1]]
                        fusionValue = fusionSpecificCard[i].fused
                }
            }
        }
    }

    // console.log(filteredFusions)

    if (currentFusionLevel <= MAX_FUSION_LEVEL && filteredFusions.length !== 0) {
        // console.log(filteredFusions)
        for (i = 0; i < filteredFusions.length; i++) {
            const fusion = filteredFusions[i].name
            // console.log(fusion)
            const toHighlight = document.getElementById(fusion)
            toHighlight.classList.remove("not-selected-cards")
            toHighlight.classList.toggle("highlight-card")
        }
        document.querySelectorAll(".box:not(.highlight-card, .box-selected)").forEach(x => x.classList.add("not-selected-cards"))
        currentFusionLevel += 1
        currentFusionEnded = 1
    } else {
        alert(`Last fusion reached -> ${fusionValue}`)
        document.querySelectorAll(".not-selected-cards").forEach(x => x.classList.remove("not-selected-cards"))
        resetFusionVals()
    }

    previousCard = cardName;
}

async function loadCardAndLogic() {
    const deck = await fetch('deck.csv').then(response => response.text())
    // console.log(deck)
    const fusions = await fetch('fusions.csv').then(response => response.text())


    Array.from(new Set(deck.split(','))).sort().forEach(cardName => {
        const cardContainer = document.createElement("div")
        cardContainer.appendChild(createCard(cardName.trim()))
        cardContainer.appendChild(createCardName(cardName.trim()))
        container.append(cardContainer)
    });

    Array.from(new Set(fusions.split('\n'))).forEach(cardInfos => {
        const cardInfosplit = cardInfos.split('=')
        const cardsToFuse = cardInfosplit[0].split(',')
        const fusedCreature = cardInfosplit[1]
        // data.set(cardsToFuse.map(x => x.trim()), fusedCreature)

        let [level1_1, level2_1, level3_1, level4_1] = cardsToFuse.slice(1)
        let [level1_2, level2_2, level3_2, level4_2] = [cardsToFuse[0]].concat(cardsToFuse.slice(2))

        cardsData1.push({key: cardsToFuse[0], val: [{name: level1_1, level: 1}, {name: level2_1, level: 2}, {name: level3_1, level: 3}, {name: level4_1, level: 4}], fused: fusedCreature})
        cardsData2.push({key: cardsToFuse[1], val: [{name: level1_2, level: 1}, {name: level2_2, level: 2}, {name: level3_2, level: 3}, {name: level4_2, level: 4}], fused: fusedCreature})

    })
    // console.log(cardsData1)
    // console.log(cardsData2)
}

function resetToast() {
    const toast = document.getElementById("toast");
    toast.className = "show";
}

document.getElementById("reset").addEventListener('click', () => {
    resetToast()
    selectedCards = new Set()
    document.querySelectorAll(".box-selected").forEach(x => x.classList.remove("box-selected"))
    document.querySelectorAll(".box").forEach(x => x.classList.add("box-hover"))
    document.querySelectorAll(".highlight-card").forEach(x => x.classList.toggle("highlight-card"))
    setTimeout(function(){ document.querySelector('.show').classList.remove("show") }, 3000);
    resetFusionVals()
})


Promise.resolve(loadCardAndLogic())
// console.log(data)
