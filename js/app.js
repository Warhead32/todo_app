// Welcome to todo app javascipt section

/////////////
//VARIABLES//
/////////////
let addBtn = document.querySelector('.todo__add-btn');
let clearAllBtn = document.querySelector('.todo__options');

//EVENTLISTENERS//
//////////////////

// Loading Content on pageload
document.addEventListener('DOMContentLoaded', showNotes);

// Preventing default behaviour of forms
document.forms[0].addEventListener('submit', function(e){
    e.preventDefault();
});

// Code for adding the element to local storage 
addBtn.addEventListener('click', function(e){
    // Grab text from input
    let addTxt = document.querySelector('.todo__input');

    if (addTxt.value){
        checkLocalStorage();
    
        // Push the data into notesArray
        notesArray.push(addTxt.value);
    
        // Store this data in local storage
        localStorage.setItem('notes', JSON.stringify(notesArray));
    
        // Clear the value of Input box
        addTxt.value = '';
        console.log(notesArray);
        showNotes();
    }
});

// When the page loads completely
window.addEventListener('load', function(e){
    // Adding Event Listener on all the TODO CHECK BOX DIVS
    let itemCheck = document.getElementsByClassName('item__check');
    // console.log(itemCheck.length);

    for (i = 0; i < itemCheck.length; i++){
        itemCheck[i].addEventListener('click', toggleCheckTodo);
    }
    /*
    // Check if Localstorage is empty or not
    if (localStorage.getItem('notes') == null){
        
    }
*/
});

// Adding Event Listener to clear all button
clearAllBtn.addEventListener('click', clearAllTodo);

///////////////
///FUNCTIONS///
///////////////

// Function to show Todo from localstorage
function showNotes(){
    checkLocalStorage();

    let html = "";
    // Putting a for each loop on notesArray
    notesArray.forEach(function(element, index){
        html += `
            <div class="item">
                <div class="item__check">
                    <span class="item__check-icon"></span>
                    <input type="checkbox" class="item__check-button">
                </div>

                <p class="item__text">
                    ${element}
                </p>

                <button id = "${index}" class="item__delete" onclick="deleteNote(this.id)">
                    <img src="images/icon-cross.svg" alt="DeleteTodo">
                </button>
            </div> `;
    });

    // Selecting the parent todo__items div
    let notesElm = document.querySelector('.todo__items');
    if(notesArray!=0){
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `
            <div class = "item">
                <center>No tasks added. Add tasks now!</center>
            </div> `;
    }
}

// Function to delete a Todo, this function is called from HTML onclick
function deleteNote(index){
    // console.log('Delete Todo Clicked', index);
    
    checkLocalStorage();

    // Remove Item from array using the index 
    notesArray.splice(index, 1);
    // Storing the updated notsArray into local storage
    localStorage.setItem('notes', JSON.stringify(notesArray));
    // Calling show notes to show the notes stored in local storage
    window.location.reload();
    

}

function checkLocalStorage(){
    // Grab data from local storage
    let storedNotes = localStorage.getItem('notes');
    // Check if grabbed data is null or not
    if (storedNotes == null){
        notesArray = [];
    } else {
        notesArray = JSON.parse(storedNotes);
    }
}

function toggleCheckTodo(e){
    // Selecting the item__check-button that is inside the item__check div
    let itemCheckButton = e.currentTarget.querySelector('.item__check-button');
    // Selecting the item__check-icon that is inside the item__check div
    let itemCheckIcon = e.currentTarget.querySelector('.item__check-icon');
    // Selecting the item__text
    // let todoText = document.querySelector('.item__text');    

    console.log();


    // Change the classof current target that is item__check div
    
    // Checking the input box on when clicked
    itemCheckButton.checked;

    // Line-through the text if the CheckBox is checked
    if (itemCheckButton.checked){
        itemCheckIcon.classList.add('bg-check-button');
        e.currentTarget.classList.add('bg-check-button2');
        e.currentTarget.parentElement.children[1].classList.add('completed-text');
    } 
    // Remove all the applied stuff when the checkbox is uncheck
    else if(!itemCheckButton.checked){
        itemCheckIcon.classList.remove('bg-check-button');
        e.currentTarget.classList.remove('bg-check-button2');
        e.currentTarget.parentElement.children[1].classList.remove('completed-text');
    }
}

function clearAllTodo(){
    localStorage.clear();
    window.location.reload();
}


