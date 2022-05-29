const guessEvents = document.querySelectorAll('.guess');
const hard = document.getElementById('guessHard');
const easy = document.getElementById('guessEasy');
const guessResult = document.getElementById('guessResult');
let row, answer;
function guessColor (row, elem, active){
    addRow (row);
    const check = document.getElementById('guessChecking');
    const colors = document.querySelectorAll('.rounded');
    activeColor(elem, active);
    answer, i = 0;
    const indexI  = Math.floor(Math.random() * colors.length);
    colors.forEach(bg => {
        let back = `rgb(${randomColors().join(', ')})`;
        if(i == indexI) answer = back;
        bg.style.background = back;
        i++;
    });
    check.textContent = answer;
    guessResult.textContent = '';
}

function activeColor(elem, active){
    if(elem !='' && active !=''){
        active.parentElement.style.background = '#0A6EFD';
        active.style.color = 'white';
        elem.parentElement.style.background = 'white';
        elem.style.color = '#0A6EFD';
    }
    
}

function randomColors(){
    let arr = [];
    for(let i = 0; i < 3; i++){
        arr.push(Math.floor(Math.random() * 255));
    }
    return arr;
};

function addRow (row){
    const guessContent = document.getElementById('guessContent');
    guessContent.innerHTML ='';
    for(let i = 0; i < row; i++){
        guessContent.innerHTML += `
            <div class="col-6 offset-3 mb-2">
                <div class="row">
                    <div class="col py-5 ms-3 me-2 rounded"></div>
                    <div class="col py-5 me-2 rounded"></div>
                    <div class="col py-5 rounded"></div>
                </div>
            </div>
        `;
    }
    const rounded = document.querySelectorAll('.rounded');

    rounded.forEach(round =>{
        round.addEventListener('click', e => {
            if(e.target.style.background == answer) {
                guessResult.textContent = 'You Win';
                const rounds = (row == 2) ? 6 : 3;
                for(let i = 0; i < rounds; i++){
                    rounded[i].style.background = answer;
                }
            } else {
                guessResult.textContent = 'Try Agin';
                e.target.style.visibility = 'hidden';
            }
        });
    });
}

guessColor(2, easy, hard);

guessEvents.forEach(gEvent => {
    row = 2; 
    gEvent.addEventListener('click', e => {
        let elem = '', active = '';
        if(e.target.textContent != 'new colors') {
            row = gEvent.getAttribute('data-line');
            if(hard == e.target){
                active = e.target;
                elem = easy;
            } else {
                elem = hard;
                active = easy;
            }
        }
        guessColor(row, elem, active);
    })
});