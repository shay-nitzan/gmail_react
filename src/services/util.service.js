
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    deleteFromStorage,
    debounce,
    validateMail
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

function debounce(func, timeout = 500) {
    let timer
    
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            // func.call(this, ...args)
            func(...args)
        }, timeout)
    }
}

function validateMail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}