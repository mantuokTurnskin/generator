function generateINNUL(part){
    let inn = []
    for(let i = 0; i < 10; i++){
        inn[i] = Math.floor(Math.random() * 10);
    }
    const cof = [2, 4, 10, 3, 5, 9, 4, 6, 8];
    let sum = 0;
    for(let i = 0; i < cof.length; i++){
        sum += inn[i] * cof[i];
    }
    inn[9] = sum % 11;
    let result = '';
    for(let i = 0; i < inn.length; i++){
        result += inn[i].toString();
    }
    return result;
}
function validateINNUL(value){
    if (value.length != 10) return false;
    if (isNaN(parseInt(value))) return false;
    let valueToArray = value.split('');
    const cof = [2, 4, 10, 3, 5, 9, 4, 6, 8];
    let sum = 0;
    for(let i = 0; i < cof.length; i++){
        sum += valueToArray[i] * cof[i];
    }
    if (valueToArray[9] != sum % 11) return false;
    return true;
}

function generateKPP(part){
    return "pass"
}

function generateOGRN(part){
    return "pass"
}

function generateINNFL(part){
    return "pass"
}

function generateOGRNIP(part){
    return "pass"
}

function generateSNILS(part){
    return "pass"
}

function generateUUID(part){
    return "pass"
}

function generateFIO(part){
    return "pass"
}

function generateOrganizationName(part){
    return "pass"
}

function generateBIN(part){
    return "pass"
}

function generateIIN(part){
    return "pass"
}

function generateUNN(part){
    return "pass"
}

function generateUNP(part){
    return "pass"
}

function generateAll(part){
    return "pass"
}

function deleteAll(part){
    return "pass"
}

const generateINNULBtn = document.getElementById("generateINNULBtn");
const copyINNULBtn = document.getElementById("copyINNULBtn");
const INNULInput = document.getElementById("INNULInput");

generateINNULBtn.addEventListener("click", function(){
    INNULInput.value = generateINNUL("");
});

copyINNULBtn.addEventListener("mouseover", function() {
    if (validateINNUL(INNULInput.value)) {
        copyINNULBtn.classList.add('validation-passed');
        copyINNULBtn.classList.remove('validation-failed');
        copyINNULBtn.classList.remove('validation-off');
    } 
    else {
        copyINNULBtn.classList.add('validation-failed');
        copyINNULBtn.classList.remove('validation-passed');
        copyINNULBtn.classList.remove('validation-off');
    }
});
copyINNULBtn.addEventListener("mouseout", function() {
        copyINNULBtn.classList.add('validation-off');
        copyINNULBtn.classList.remove('validation-failed');
        copyINNULBtn.classList.remove('validation-passed');
});