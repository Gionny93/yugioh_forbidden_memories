

const container = document.getElementsByClassName("container")[0]
// sarebbe comodo poter leggere da file e salvare, visto che voglio updatare as i go
// leggere da file il mazzo distinct

let data = new Map()
let selectedCards = []

function createCard(cardName) {
    const box = document.createElement("div")
    box.classList.add("box", "box-hover")
    const name = document.createElement("p")
    name.className = "cardName"
    name.textContent = cardName
    box.appendChild(name)
    box.onclick = () => addCardAndCheckIfFound(box, cardName)
    return box
}

function addCardAndCheckIfFound(box, cardName) {
    box.classList.remove("box-hover")
    box.classList.add("box-selected")
    selectedCards.push(cardName)
    data.forEach((v,k) => {
        // prima e seconda carta va bene every, dalla terza in poi devono essere uguali carta per carta
        if(k.length === selectedCards.length && k.every(r => selectedCards.includes(r))) {
            alert(`Found fusion ${v}`)
            selectedCards = []
            document.querySelectorAll(".box-selected").forEach(x => x.classList.remove("box-selected"))
        }
    })
}


async function loadCardAndLogic() {
    const deck = await fetch('deck.csv').then(response => response.text())

    const fusions = await fetch('fusions.csv').then(response => response.text())

    Array.from(new Set(deck.split(','))).sort().forEach(cardName => 
        container.append(createCard(cardName))
    );

    fusions.split('\n').forEach(cardInfos => {
        const cardInfosplit = cardInfos.split('=')
        const cardsToFuse = cardInfosplit[0].split(',')
        const fusedCreature = cardInfosplit[1]
        data.set(cardsToFuse, fusedCreature)
    })
}

function resetToast() {
    const toast = document.getElementById("toast");
    toast.className = "show";
}

document.getElementById("reset").addEventListener('click', () => {
    resetToast()
    selectedCards = []
    document.querySelectorAll(".box-selected").forEach(x => x.classList.remove("box-selected"))
    setTimeout(function(){ document.querySelector('.show').classList.remove("show") }, 3000);
})


Promise.resolve(loadCardAndLogic())
// console.log(data)