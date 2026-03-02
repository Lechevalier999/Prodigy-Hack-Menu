const gameData = Boot.prototype.game._state._states.get("Boot")._gameData;
const backpack = Boot.prototype.game._state._current.user.source.backpack;
const outfit = Boot.prototype.game._state._current.user.source.backpack.outfit;

console.log("Game Data:", gameData);
console.log("Backpack:", backpack);
console.log("Outfit:", outfit);

function addGold() {
    let amount = parseInt(prompt("How much gold do you want?").replaceAll(",", ""));
    if (!Number.isNaN(amount) && Number.isFinite(amount)) {
        const user = Boot.prototype.game._state._current.user.source;
        user.data.gold = Math.min(amount);
        user.addWin();
    } else {
        alert("The answer you provided is not a number!");
    }
}

addGold();


