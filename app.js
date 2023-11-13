const addCharacterButton = document.getElementById('add-character-button');

addCharacterButton.addEventListener('click', () => {
    characterSheet();
});


const characterSheet = (character) => {
    if (character) {
        uniqueId = character.characterId;
        createCharacterSheet(uniqueId);
        createExistingCharacter(character);
    } else {
        uniqueId = Date.now();
        createCharacterSheet(uniqueId);
    }

    function createCharacterSheet(uniqueId) {
        const characterSheetDiv = document.createElement('div');
        characterSheetDiv.setAttribute('class', 'character-sheet');
    
        //Character name & type container
        const CharacterNameTypeDiv = document.createElement('div');
        CharacterNameTypeDiv.setAttribute('class', 'characterNameTypeContainer');
    
        //Character name input field
        const characterNameDiv = document.createElement('div');
        const characterNameLabel = document.createElement('label');
        characterNameLabel.setAttribute('for', `character-name-${uniqueId}`);
        characterNameLabel.append('Name');
        const characterNameInput = document.createElement('input');
        setAttributes(characterNameInput, {type: 'text', id: `character-name-${uniqueId}`, name: 'character-name', required: ''});
        characterNameDiv.append(characterNameLabel, characterNameInput);
        
        //Character type select
        const characterTypeDiv = document.createElement('div');
        createCharacterTypeUi(characterTypeDiv, uniqueId);
    
        //Character buttons div
        const characterButtonsDiv = document.createElement('div');
        characterButtonsDiv.setAttribute('class', 'char-btns');
    
        //Save button
        const characterSaveBtn = document.createElement('button');
        characterSaveBtn.setAttribute('class', 'save-button');
        const characterSaveSpan = document.createElement('span');
        characterSaveSpan.append('Save');
        characterSaveBtn.append(characterSaveSpan);
        characterSaveBtn.addEventListener('click', (event) => {
            if (!character) {
                character = createNewCharacter();
            }
            if (isCurrentCharacter(characters, character)) {
                const storedCharacter = getExistingCharacter(characters, character);
                updateCharacter(storedCharacter, character.characterId);
            } else {
                addCharacter(character);
            }
        });
    
        //Killed button
        const characterKilledBtn = document.createElement('button');
        characterKilledBtn.setAttribute('class', 'killed-button');
        const characterKilledSpan = document.createElement('span');
        characterKilledSpan.setAttribute('class', 'material-symbols-outlined');
        characterKilledSpan.append('skull');
        characterKilledBtn.append(characterKilledSpan);
        characterKilledBtn.addEventListener('click', (event) => characterDeath(event, characters, character));
    
        characterButtonsDiv.append(characterSaveBtn, characterKilledBtn);
    
        //Initial attack dice, defend dice and starting body and mind points
        const initialStatsDiv = document.createElement('div');
        initialStatsDiv.setAttribute('class', 'initial-stats');
    
        //Attack dice select
        const attackDiceUi = createDiceUi('Attack Dice' ,uniqueId);
    
        //Defend dice select
        const defendDiceUi = createDiceUi('Defend Dice', uniqueId);

        // const defendDiceDiv = document.createElement('div');
        // const defendDiceP = document.createElement('p');
        // defendDiceP.append('Defend Dice');
        // defendDiceDiv.append(defendDiceP);
        // const defendDiceSelect = document.createElement('select');
        // setAttributes(defendDiceSelect, {name: 'defend-dice', id: `defend-dice-${uniqueId}`});
        // addNumOptions(defendDiceSelect, 6);
        // defendDiceDiv.append(defendDiceP, defendDiceSelect);
    
        //Starting body and mind points div
        const startingPointsDiv = document.createElement('div');
        startingPointsDiv.setAttribute('class', 'starting-points');
        const startingPointsP = document.createElement('p');
        startingPointsP.append('Starting Points');
    
        //Body points select
        const startingBodyPointsDiv = document.createElement('div');
        setAttributes(startingBodyPointsDiv, {'id': `starting-body-points-${uniqueId}`, 'class': 'numeric-tracker'});
        const startingBodyPointsP = document.createElement('p');
        startingBodyPointsP.append('Body');
        const startingBodyPointsSelect = document.createElement('select');
        setAttributes(startingBodyPointsSelect, {name: 'starting-body-points-number', id: `starting-body-pts-${uniqueId}`});
        addNumOptions(startingBodyPointsSelect, 8);
        startingBodyPointsDiv.append(startingBodyPointsP, startingBodyPointsSelect);    
    
        //Mind points select
        const startingMindPointsDiv = document.createElement('div');
        setAttributes(startingMindPointsDiv, {id: 'starting-mind-points', class: 'starting-mind-points'});
        const startingMindPointsP = document.createElement('p');
        startingMindPointsP.append('Mind');
        const startingMindPointsSelect = document.createElement('select');
        setAttributes(startingMindPointsSelect, {name: 'starting-mind-points-number', id: `starting-mind-pts-${uniqueId}`});
        addNumOptions(startingMindPointsSelect, 6);
        startingMindPointsDiv.append(startingMindPointsP, startingMindPointsSelect);
        startingPointsDiv.append(startingPointsP, startingBodyPointsDiv, startingMindPointsDiv);
    
        //Character weapons and armor container
        const characterWeaponsArmorDiv = document.createElement('div');
        characterWeaponsArmorDiv.setAttribute('class', 'character-weapons-armor-container');
    
        //Character weapons input
        createWeaponsUi(characterWeaponsArmorDiv, uniqueId);
    
        //Character armor input
        createArmorUi(characterWeaponsArmorDiv, uniqueId);
    
        //Current stats tracker div
        const currentStatsTrackerDiv = document.createElement('div');
        currentStatsTrackerDiv.setAttribute('class', 'current-stats-tracker');
    
        //Current body points div
        const currentBodyPointsDiv = document.createElement('div');
        setAttributes(currentBodyPointsDiv, {id: `current-body-points-${uniqueId}`, class: 'numeric-tracker'});
        const currentBodyPointsP = document.createElement('p');
        currentBodyPointsP.append('Body Points');
        const currentBodyPointsNumDiv = document.createElement('div');
        const currentBodyPointsNumP = document.createElement('p');
        currentBodyPointsNumP.setAttribute('id', `current-body-pts-num-${uniqueId}`);
        currentBodyPointsNumP.append('0');
        const currentBodyPointsNegBtn = document.createElement('button');
        currentBodyPointsNegBtn.append('-');
        currentBodyPointsNegBtn.addEventListener('click',  () => {
            decreaseNumber(currentBodyPointsNumP, currentBodyPointsNumP.textContent);
        });
        const currentBodyPointsPosBtn = document.createElement('button');
        currentBodyPointsPosBtn.append('+');
        currentBodyPointsPosBtn.addEventListener('click', () => {
            increaseNumber(currentBodyPointsNumP, currentBodyPointsNumP.textContent, 12);
        });
        currentBodyPointsNumDiv.append(currentBodyPointsNegBtn, currentBodyPointsNumP, currentBodyPointsPosBtn);
        currentBodyPointsDiv.append(currentBodyPointsP, currentBodyPointsNumDiv);
    
        //Current gold coins div
        const currentGoldCoinsDiv = document.createElement('div');
        setAttributes(currentGoldCoinsDiv, {id: `current-gold-coins-${uniqueId}`, class: 'numeric-tracker'});
        const currentGoldCoinsP = document.createElement('p');
        currentGoldCoinsP.append('Gold Coins');
        const currentGoldCoinsNumDiv = document.createElement('div');
        const currentGoldCoinsNegBtn = document.createElement('button');
        currentGoldCoinsNegBtn.append('-');
        currentGoldCoinsNegBtn.addEventListener('click', () => {
            decreaseNumber(currentGoldCoinsNumP, currentGoldCoinsNumP.textContent);
        });
        const currentGoldCoinsNumP = document.createElement('p');
        currentGoldCoinsNumP.setAttribute('id', `current-gold-coins-num-${uniqueId}`);
        currentGoldCoinsNumP.append('0');
        const currentGoldCoinsPosBtn = document.createElement('button');
        currentGoldCoinsPosBtn.append('+');
        currentGoldCoinsPosBtn.addEventListener('click', () => {
            increaseNumber(currentGoldCoinsNumP, currentGoldCoinsNumP.textContent);
        });
        currentGoldCoinsNumDiv.append(currentGoldCoinsNegBtn, currentGoldCoinsNumP, currentGoldCoinsPosBtn);
        currentBodyPointsDiv.append(currentGoldCoinsP, currentGoldCoinsNumDiv);
    
        //Potions and Other Items Section
        const potionsItemsDiv = document.createElement('div');
        potionsItemsDiv.setAttribute('class', 'potions-items');

        createPotionsItemsUi(potionsItemsDiv, uniqueId);
    
        //Append elements to character sheet
        currentStatsTrackerDiv.append(currentBodyPointsDiv, currentGoldCoinsDiv);
        CharacterNameTypeDiv.append(characterNameDiv, characterTypeDiv);
        initialStatsDiv.append(attackDiceUi, defendDiceUi, startingPointsDiv);

        characterSheetDiv.append(CharacterNameTypeDiv, characterButtonsDiv, initialStatsDiv, characterWeaponsArmorDiv, currentStatsTrackerDiv, potionsItemsDiv);
    
        const createCharacterSheetDiv = document.getElementById('create-character-sheet');
        createCharacterSheetDiv.before(characterSheetDiv);
    }

    function getCharacterName(characterId) {
        return `character-name-${characterId}`;
    }

    function getCharacterType(characterId) {
        return `character-${characterId}-type`;
    }

    function getAttackDice(characterId) {
        return `attack-dice-${characterId}`;
    }

    function getDefendDice(characterId) {
        return `defend-dice-${characterId}`;
    }

    function getStartBodyPoints(characterId) {
        return `starting-body-pts-${characterId}`;
    }

    function getStartMindPoints(characterId) {
        return `starting-mind-pts-${characterId}`;
    }

    function getWeapons(characterId) {
        return `character-${characterId}-weapons`;
    }

    function getArmor(characterId) {
        return `character-${characterId}-armor`;
    }

    function getCurrentBodyPoints(characterId) {
        return `current-body-pts-num-${characterId}`;
    }

    function getCurrentGoldCoins(characterId) {
        return `current-gold-coins-num-${characterId}`
    }

    function getPotionsAndItems(characterId) {
        return `character-${characterId}-potions-items`;
    }

    const createNewCharacter = () => {
        this.characterId = uniqueId;

        const nameInput = document.getElementById(getCharacterName(uniqueId));
        const typeSelect = document.getElementById(getCharacterType(uniqueId));
        const attDice = document.getElementById(getAttackDice(uniqueId));
        const defDice = document.getElementById(getDefendDice(uniqueId));
        const startBodyPtsSel = document.getElementById(getStartBodyPoints(uniqueId));
        const startMindPtsSel = document.getElementById(getStartMindPoints(uniqueId));
        const weaponsList = document.getElementById(getWeapons(uniqueId)).querySelectorAll('li');
        const armorList = document.getElementById(getArmor(uniqueId)).querySelectorAll('li');
        const curBodyPtsInput = document.getElementById(getCurrentBodyPoints(uniqueId));
        const curGoldCoinsNum = document.getElementById(getCurrentGoldCoins(uniqueId));
        const potionsItemsList = document.getElementById(getPotionsAndItems(uniqueId)).querySelectorAll('li');

        this.name = nameInput.value;
        this.type = typeSelect.value;
        this.attackDice = attDice.value;
        this.defendDice = defDice.value;
        this.startBodyPts = startBodyPtsSel.value;
        this.startMindPts = startMindPtsSel.value;
        this.weapons = createCharacterList(weaponsList);
        this.armor = createCharacterList(armorList)
        this.curBodyPts = curBodyPtsInput.textContent;
        this.goldCoins = curGoldCoinsNum.textContent;
        this.potionsAndItems = createCharacterList(potionsItemsList);
        return({characterId, name, type, attackDice, defendDice, startBodyPts, startMindPts, weapons, armor, curBodyPts, goldCoins, potionsAndItems});
    }

    function createExistingCharacter(character) {
        const nameInput = document.getElementById(getCharacterName(character.characterId));
        const typeSelect = document.getElementById(getCharacterType(character.characterId));
        const attDice = document.getElementById(getAttackDice(character.characterId));
        const defDice = document.getElementById(getDefendDice(character.characterId));
        const startBodyPtsSel = document.getElementById(getStartBodyPoints(character.characterId));
        const startMindPtsSel = document.getElementById(getStartMindPoints(character.characterId));
        const weaponsList = document.getElementById(getWeapons(character.characterId));
        const armorList = document.getElementById(getArmor(character.characterId));
        const curBodyPtsInput = document.getElementById(getCurrentBodyPoints(character.characterId));
        const curGoldCoinsNum = document.getElementById(getCurrentGoldCoins(character.characterId));
        const potionsItemsList= document.getElementById(getPotionsAndItems(character.characterId));

        nameInput.value = character.name;
        typeSelect.value = character.type;
        attDice.value = character.attackDice;
        defDice.value = character.defendDice;
        startBodyPtsSel.value = character.startBodyPts;
        startMindPtsSel.value = character.startMindPts;
        addWeaponsToCharacter(weaponsList, character.weapons);
        addArmorsToCharacter(armorList, character.armor);
        curBodyPtsInput.textContent = character.curBodyPts;
        curGoldCoinsNum.textContent = character.goldCoins;
        addPotionsItemsToCharacter(potionsItemsList, character.potionsAndItems);
    }

    function updateCharacter(storedCharacter, characterId) {
        const typeSelect = document.getElementById(getCharacterType(characterId));
        const attDiceSel = document.getElementById(getAttackDice(characterId));
        const defDiceSel = document.getElementById(getDefendDice(characterId));
        const startBodyPtsSel = document.getElementById(getStartBodyPoints(characterId));
        const startMindPtsSel = document.getElementById(getStartMindPoints(characterId));
        const weaponsList = document.getElementById(getWeapons(characterId)).querySelectorAll('li');
        const armorList = document.getElementById(getArmor(characterId)).querySelectorAll('li');
        const curBodyPtsInput = document.getElementById(getCurrentBodyPoints(characterId));
        const curGoldCoinsNum = document.getElementById(getCurrentGoldCoins(characterId));
        const potionsItemsList = document.getElementById(getPotionsAndItems(characterId)).querySelectorAll('li');
        const nameInput = document.getElementById(getCharacterName(characterId));

        storedCharacter.type = typeSelect.value;
        storedCharacter.attackDice = attDiceSel.value;
        storedCharacter.defendDice = defDiceSel.value;
        storedCharacter.startBodyPts = startBodyPtsSel.value;
        storedCharacter.startMindPts = startMindPtsSel.value;
        storedCharacter.weapons = createCharacterList(weaponsList);
        storedCharacter.armor = createCharacterList(armorList);
        storedCharacter.curBodyPts = curBodyPtsInput.textContent;
        storedCharacter.goldCoins = curGoldCoinsNum.textContent;
        storedCharacter.potionsAndItems = createCharacterList(potionsItemsList);
        storedCharacter.name = nameInput.value;

        storeCharacters(characters);
    }
}

function createCharacterTypeUi(container, uniqueId) {
    const characterTypeLabel = document.createElement('label');
    characterTypeLabel.setAttribute('for', `character-${uniqueId}-type`);
    characterTypeLabel.textContent = 'Character';

    const characterTypeSelect = document.createElement('select');
    setAttributes(characterTypeSelect, {id: `character-${uniqueId}-type`, name: 'character-type', required: ''});
    addTypeOptions(characterTypeSelect, {default: '- Select Option -', barbarian: 'Barbarian', wizard: 'Wizard', elf: 'Elf', dwarf: 'Dwarf'});

    container.append(characterTypeLabel, characterTypeSelect);

    characterTypeSelect.addEventListener('change', (event) => {
        const heroTypeId = event.target.value;
        const characterId = uniqueId;
        setInitialStats(heroTypeId, characterId);
    });
}

function createDiceUi(typeOfDice, uniqueId) {
    const typeOfDiceArray = (typeOfDice.toLowerCase()).split(' ');

    const diceContainer = document.createElement('div');

    const title = document.createElement('h4');
    title.textContent = typeOfDice;
    diceContainer.appendChild(title);

    const diceDiv = document.createElement('div');

    const dice = document.createElement('input');
    setAttributes(dice, {type: 'number', id: `${typeOfDiceArray[0]}-${typeOfDiceArray[1]}-${uniqueId}`, class: 'dice-box'});
    dice.value = 0;
    
    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    // plusBtn.addEventListener('click', increaseNumber(dice, dice.value, 12));

    const minusBtn = document.createElement('button');
    minusBtn.textContent = '-';

    diceDiv.append(plusBtn, dice, minusBtn);
    diceContainer.appendChild(diceDiv);

    return diceContainer;

    // const attackDiceP = document.createElement('p');
    // attackDiceP.append('Attack Dice');
    // attackDiceDiv.append(attackDiceP);
    // const attackDiceSelect = document.createElement('select');
    // setAttributes(attackDiceSelect, {name: 'attack-dice', id: `attack-dice-${uniqueId}`});
    // const attackDiceOption = document.createElement('option');
    // addNumOptions(attackDiceSelect, 6);
    // attackDiceDiv.append(attackDiceP, attackDiceSelect)
}

function createWeaponsUi(container, uniqueId) {
    const characterWeaponsDiv = document.createElement('div');

    const characterWeaponsLabel = document.createElement('label');
    characterWeaponsLabel.textContent = 'Weapons';
    characterWeaponsLabel.setAttribute('for', `character-${uniqueId}-weapon-options`);

    const characterWeaponsSelect = document.createElement('select');
    setAttributes(characterWeaponsSelect, {id: `character-${uniqueId}-weapon-options`, name: 'character-weapons'});

    const defaultSelectOption = document.createElement('option');
    defaultSelectOption.value = 'default';
    defaultSelectOption.textContent = '- Add a Weapon -'
    characterWeaponsSelect.appendChild(defaultSelectOption);

    createWeaponsDropdownOptions(characterWeaponsSelect);

    const characterWeapons = document.createElement('div');
    characterWeapons.setAttribute('class', `character-weapons`);
  
    const characterWeaponsList = document.createElement('ul');
    characterWeaponsList.setAttribute('id', `character-${uniqueId}-weapons`);
    characterWeapons.appendChild(characterWeaponsList);

    characterWeaponsDiv.append(characterWeaponsLabel, characterWeaponsSelect, characterWeapons);
    container.appendChild(characterWeaponsDiv);

    characterWeaponsSelect.addEventListener('change', (event) => {
        const weaponId = event.target.value;
        addItemToCharacter(characterWeaponsList, weaponId);
    });
}

function createArmorUi(container, uniqueId) {
    const characterArmorDiv = document. createElement('div');

    const characterArmorLabel = document.createElement('label');
    characterArmorLabel.textContent = 'Armor';
    characterArmorLabel.setAttribute('for', `character-${uniqueId}-armor-options`);

    const characterArmorSelect = document.createElement('select');
    setAttributes(characterArmorSelect, {id: `character-${uniqueId}-armor-options`, name: 'character-armor'});

    const defaultSelectOption = document.createElement('option');
    defaultSelectOption.value = 'default';
    defaultSelectOption.textContent = '- Add Armor -';
    characterArmorSelect.appendChild(defaultSelectOption);

    createArmorDropdownOptions(characterArmorSelect);

    const characterArmor = document.createElement('div');
    characterArmor.setAttribute('id', `character-armor`);

    const characterArmorList = document.createElement('ul');
    characterArmorList.setAttribute('id', `character-${uniqueId}-armor`);
    characterArmor.appendChild(characterArmorList);

    characterArmorDiv.append(characterArmorLabel, characterArmorSelect, characterArmor);
    container.appendChild(characterArmorDiv);

    characterArmorSelect.addEventListener('change', (event) => {
        const armorId = event.target.value;
        addItemToCharacter(characterArmorList, armorId);
    });
}

function createPotionsItemsUi(container, uniqueId) {
    // Create select for dropdown menu
    const potionsItemsLabel = document.createElement('label');
    potionsItemsLabel.setAttribute('for', `potions-items-${uniqueId}`);
    potionsItemsLabel.textContent = 'Potions & Other Items';

    const potionsItemsDropdown = document.createElement('select');
    setAttributes(potionsItemsDropdown, {id: `character-${uniqueId}-items-options`, name: 'character-potions-items'});

    const defaultSelectOption = document.createElement('option');
    defaultSelectOption.value = 'default';
    defaultSelectOption.textContent = '- Select Item -';
    potionsItemsDropdown.appendChild(defaultSelectOption);

    createPotionsItemsDropdownOptions(potionsItemsDropdown);

    const potionsItemsList = document.createElement('ul');
    potionsItemsList.setAttribute('id', `character-${uniqueId}-potions-items`);

    container.append(potionsItemsLabel, potionsItemsDropdown, potionsItemsList);   

    potionsItemsDropdown.addEventListener('change', (event) => {
        const itemId = event.target.value;
        addItemToCharacter(potionsItemsList, itemId);
    });
}

function addCharacter(character) {
    characters.push(character);
    storeCharacters(characters);
}

function isCurrentCharacter(characters, { characterId }) {
    return characters.some(character => character.characterId === characterId);
}

function getExistingCharacter(characters, character) {
    const characterId = character.characterId;
    return foundCharacter = characters.find(character => {
        return character.characterId === characterId;
    });
}

function getCharacterIndex(characters, characterId) {
    return characters.findIndex((character) => character.characterId === characterId);
}

function characterDeath(event, characters, character) {
    if (confirm("Are you sure you want to kill your character?")){
        const targetCharSheet = event.target.parentNode.parentNode.parentNode;
        targetCharSheet.remove();
        const index = getCharacterIndex(characters, character.characterId);
        characters.splice(index, 1);
        storeCharacters(characters);
    }
}

function addNumOptions(element, maxValue) {
    for (let i = 0; i <= maxValue; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', i);
        option.append(`${i}`);
        element.appendChild(option);
    }
}

function decreaseNumber(element, currentNum) {
    const testNum = parseInt(currentNum);
    return element.textContent = testNum === 0 ? testNum : testNum - 1;
}

function increaseNumber(element, currentNum, maxNum) {
    const testNum = parseInt(currentNum);
    return element.textContent = testNum < maxNum || !maxNum ? testNum + 1 : testNum;
}

function createWeaponsDropdownOptions(container) {
    addSpecificArrayOptions(container, 'weapon');
    addSpecificArrayOptions(container, 'weapon');
}

function createArmorDropdownOptions(container) {
    addSpecificArrayOptions(container, 'armor');
    addSpecificArrayOptions(container, 'armor');
}

function createPotionsItemsDropdownOptions(container) {
    addSpecificArrayOptions(container, 'item');
    addSpecificArrayOptions(container, 'item');
    addSpecificArrayOptions(container, 'potion');
}

function addSpecificArrayOptions(element, classification) {
    const itemsToAdd = items.filter(item => item.classification === classification);

    itemsToAdd.forEach(item => {
        if (item.classification === classification) {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            element.appendChild(option);    
        }
    });
}

function addItemToCharacter(list, itemId) {
    const li = document.createElement('li');
    const item = findItem(itemId);
    li.setAttribute('value', (item.id));
    li.textContent = item.name;

    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('class', 'remove-item');
    removeBtn.textContent = 'x';
    li.appendChild(removeBtn);
    removeBtn.addEventListener('click', (event) => removeItem(list, itemId));

    list.appendChild(li);
}

function createCharacterList(nodeList) {
    const characterList = [];
    nodeList.forEach(li => characterList.push((li.textContent).slice(0,-1)));
    return characterList;
}

function addWeaponsToCharacter(element, weapons) {
    if (!weapons) {
        return
    }
    
    weapons.forEach(weapon => {
        const storedWeapon = items.find(item => item.name === weapon);
        addItemToCharacter(element, (storedWeapon.id));        
    });    
}

function addArmorsToCharacter(element, armors) {
    if (!armors || armors.length === 0) {
        return
    }
    armors.forEach(armor => {
        const storedArmor = items.find(item => item.name === armor || item.name === armor);
        addItemToCharacter(element, (storedArmor.id));
    });    
}

function addPotionsItemsToCharacter(element, potionsItems) {
    if (potionsItems) {
        potionsItems.forEach(potionItem => {
            const storedPotionItem = items.find(item => item.name === potionItem || item.name === potionItem || item.name === potionItem);
            addItemToCharacter(element, (storedPotionItem.id));
        });
    }
}

function findItem(itemId) {
    const foundItem = items.find((item) => item.id === itemId);
    return foundItem;
}

function removeItem(itemsList, itemId) {
    const [,characterId] = (itemsList.id).split('-');
    const characterItems = itemsList.childNodes;
    characterItems.forEach(item => {
        const characterItemId = item.attributes.value.value;
        const characterItemName = (item.textContent).slice(0,-1);
        if (characterItemId === itemId) {
            // Do I want the item removed from storage before user saves character?
            // removeStoredCharacterWeapon(characterId, characterItemName);
            item.remove();
        }
    });
}

function setInitialStats(heroTypeId, characterId) {
    const heroType = heroTypes.find(type => type.id === heroTypeId);

    const attackDice = document.getElementById(`attack-dice-${characterId}`);
    attackDice.value = heroType.attackDice;

    const defendDice = document.getElementById(`defend-dice-${characterId}`);
    defendDice.value = heroType.defendDice;

    const bodyPoints = document.getElementById(`starting-body-pts-${characterId}`);
    bodyPoints.value = heroType.startBodyPts;

    const mindPoints = document.getElementById(`starting-mind-pts-${characterId}`);
    mindPoints.value = heroType.startMindPts;
}

const displayCharacters = (function () {
    // Initializtion
    characters = getCharacters();
    characters.forEach(character => characterSheet(character));

    // characters.forEach(character => {
    //     const sheetDiv = createSheetDivUi(character)
    //     const charTitle = createTitleUi(character)
    //     const inventory = createInventoryUi(character);

    //     sheetDiv.append(charTitle);
    //     sheetDiv.append(inventory);

    //     bigList.append(sheetDiv)
    // })
})();