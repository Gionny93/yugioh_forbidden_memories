


    /***************/
    // Old tactic //
    /***************/

    /*
    box.classList.remove("box-hover")
    box.classList.add("box-selected")
    selectedCards.add(cardName)
    let found = 1
    data.forEach((v,k) => {
        if (selectedCards.size === 2) {
            if(Array.from(selectedCards).every(r => k.includes(r))) {
                alert(`Found fusion ${v}`)
                alertPopped = true
                if (k.length === selectedCards.size) {
                    selectedCards = new Set()
                    document.querySelectorAll(".box-selected").forEach(x => x.classList.remove("box-selected"))
                    document.querySelectorAll(".box").forEach(x => x.classList.add("box-hover"))
                }
                found = 0
            }
        }
        
        if (found && selectedCards.size > 2 && k.length > 2) {
            // controllare counque le prime 2 carte
            const selectedArray = Array.from(selectedCards)
            if ([k[0], k[1]].every(r => [selectedArray[0], selectedArray[1]].includes(r))) {            
                if (selectedArray[selectedCards.size - 1] === k[selectedCards.size - 1]) {
                    if (k[selectedCards.size] === undefined) { // last card so we found and reset
                        alert(`Found last fusion ${v}`)
                        selectedCards = new Set()
                        found = false //resetting
                        document.querySelectorAll(".box-selected").forEach(x => x.classList.remove("box-selected"))
                        document.querySelectorAll(".box").forEach(x => x.classList.add("box-hover"))
                    } else { // there are more combos 
                        alert(`Found fusion ${v}`)
                    }
                } else {
                    selectedCards = new Set()
                    document.querySelectorAll(".box-selected").forEach(x => x.classList.remove("box-selected"))
                    document.querySelectorAll(".box").forEach(x => x.classList.add("box-hover"))
                }
            }
        }
    })
    */