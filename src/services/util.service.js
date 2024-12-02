
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    deleteFromStorage
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value, delay= 200) {
    try{
        localStorage[key] = JSON.stringify(value);
        return new Promise(resolve => setTimeout(() => resolve(true), delay))
    }
    catch{
        console.log("error saving")
    }
}

export function loadFromStorage(key, defaultValue = null) {
	var value = localStorage[key] || defaultValue
	return JSON.parse(value)
}

function deleteFromStorage(key) {
    localStorage.removeItem(key); // remove item from localStorage
}