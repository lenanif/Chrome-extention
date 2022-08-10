const saveBtn = document.getElementById("save-btn");
const deleteBtn = document.getElementById("delete-btn");
const saveTabBtn = document.getElementById("save-tab-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const currentLink = [];
const regexp = /\S/;   
let linksFromLocalStorage = [];

if (JSON.parse(localStorage.getItem("myLinks"))){
    linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"));
}


function addUserInput() {
    if (regexp.test(inputEl.value)) {
        currentLink.push(inputEl.value);
        linksFromLocalStorage.push(inputEl.value);
        inputEl.value = "";
        // turn an array into a string for the localStorage
        localStorage.setItem("myLinks", JSON.stringify(linksFromLocalStorage));
        createLink();
    }

}

function createLink() {
    let tempArrForIteration = currentLink;
    if (currentLink.length == 0 && linksFromLocalStorage.length != 0){
        tempArrForIteration = linksFromLocalStorage;
    }
    for (let i = 0; i < tempArrForIteration.length; i++){
        const liEl = document.createElement("li");
        liEl.setAttribute('class', 'li-el');
        const aTag = document.createElement("a");
        aTag.textContent = tempArrForIteration[i];
        
        if (tempArrForIteration[i].substring(0, 5) == "https") {
            aTag.setAttribute('href', tempArrForIteration[i]);
            aTag.setAttribute('target', '_blank');  
        }
        liEl.appendChild(aTag);
        ulEl.appendChild(liEl);
    }

    currentLink.pop();
}

function deleteAllLinks() {
    localStorage.clear();
    linksFromLocalStorage = [];
    ulEl.textContent = '';

}

createLink();

saveBtn.addEventListener("click", addUserInput);

deleteBtn.addEventListener("dblclick", deleteAllLinks);

saveTabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        currentLink.push(tabs[0].url);
        linksFromLocalStorage.push(tabs[0].url);
        localStorage.setItem("myLinks", JSON.stringify(linksFromLocalStorage));
        createLink();
    });
})

