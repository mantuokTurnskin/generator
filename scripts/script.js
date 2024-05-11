const INNUL = {
    generateBtn: document.getElementById("generateINNULBtn"),
    copyBtn: document.getElementById("copyINNULBtn"),
    input: document.getElementById("INNULInput"),
    validationElement: document.getElementsByClassName("INNULValidation")[0],
    getNewValue: function(part) {
        let inn = []
        /*
            Функция на основании веденного значения в поле ИННЮЛ генерирует через
            random значение ИНН по алгоритму
        */
        if (isNaN(parseInt(part)) || part.length >= 10) part='';
        if (part.length < 10) inn = part.split('');
        for(let i = part.length; i < 10; i++) inn[i] = Math.floor(Math.random() * 10);
        const cof = [2, 4, 10, 3, 5, 9, 4, 6, 8];
        let sum = 0;
        for(let i = 0; i < cof.length; i++) sum += inn[i] * cof[i];
        inn[9] = (sum % 11 < 10)? sum % 11 : 0;
        return inn.join('');
    },
    setNewValue: function() {
        /*
            Метод устанавливает сгенерированное значение в поле ИННЮЛ
        */
        this.input.value = this.getNewValue(this.input.value);  
    },
    validateValue: function(value){
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
    },
    setValidation: function() {
        if(this.validateValue(this.input.value)){
            this.validationElement.classList.add('validation-passed');
            this.validationElement.classList.remove('validation-failed');
            this.validationElement.classList.remove('validation-off');
        }
        else{
            this.validationElement.classList.add('validation-failed');
            this.validationElement.classList.remove('validation-passed');
            this.validationElement.classList.remove('validation-off');
        }
    },
    copyValue: function() {
        if (INNUL.input.value) {
        navigator.clipboard.writeText(INNUL.input.value);
        console.log(`Значение ИННЮЛ: ${INNUL.input.value} скопироано в буфер обмена.`)
        }
    }   
};

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

// Слушаем события блока ИННЮЛ
INNUL.generateBtn.addEventListener("click", ()=> {
    INNUL.setNewValue();
    INNUL.setValidation();
});
INNUL.input.addEventListener('mouseout', ()=> INNUL.setValidation());
INNUL.copyBtn.addEventListener('click', ()=> INNUL.copyValue());