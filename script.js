
const smallCups = document.querySelectorAll('.cup-small');
const percentage = document.getElementById('percentage');
const water = document.getElementById('water');
const addBtn = document.getElementById('add');
const removeBtn = document.getElementById('remove');
const reminder = document.getElementById('reminder');

let fullCups = 0;

smallCups.forEach((cup, idx) => {
    cup.addEventListener('click', () => highlightCups(idx));
});

addBtn.addEventListener('click', () => highlightCups(fullCups));
removeBtn.addEventListener('click', () => highlightCups(fullCups - 2));

function highlightCups(idx) {
    if (smallCups[idx]?.classList.contains('full') && !smallCups[idx]?.nextElementSibling?.classList.contains('full')) {
        idx--;
    }
    
    smallCups.forEach((cup, idx2) => {
        if (idx2 <= idx) {
            cup.classList.add('full');
        } else {
            cup.classList.remove('full');
        }
    });
    
    updateBigCup();
}

function updateBigCup() {
    fullCups = document.querySelectorAll('.cup-small.full').length;
    const totalCups = smallCups.length;
    
    let percentageFilled = (fullCups / totalCups) * 100;
    percentage.innerText = `${percentageFilled.toFixed(0)}%`;
    water.style.height = `${percentageFilled}%`;

    let remainingLiters = (2 - (250 * fullCups / 1000)).toFixed(2);
    if (remainingLiters <= 0) {
        remainingLiters = 0;
    }

    showReminder(remainingLiters);
}

function showReminder(remainingLiters) {
    if (remainingLiters > 0) {
        reminder.innerText = `You still need ${remainingLiters}L to reach your goal!`;
        reminder.style.color = "#ff5722";
    } else {
        reminder.innerText = "🎉 Congratulations! You've reached your daily water goal! 🎉";
        reminder.style.color = "#28a745";
    }
    
    reminder.style.display = "block";

    setTimeout(() => {
        reminder.style.display = "none"; 
    }, 3000); // Hide message after 3 seconds
}


