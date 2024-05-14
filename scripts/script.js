const INNUL = {
    generateBtn: document.getElementById("generateINNULBtn"),
    copyBtn: document.getElementById("copyINNULBtn"),
    input: document.getElementById("INNULInput"),
    validationElement: document.getElementsByClassName("INNULValidation")[0],
    getNewValue: function (part) {
        let inn = []
        /*
            Функция на основании веденного значения в поле ИННЮЛ генерирует через
            random значение ИНН по алгоритму
        */
        if (isNaN(parseInt(part)) || part.length >= 10) part = '';
        if (part.length < 10) inn = part.split('');
        for (let i = part.length; i < 10; i++) inn[i] = Math.floor(Math.random() * 10);
        const cof = [2, 4, 10, 3, 5, 9, 4, 6, 8];
        let sum = 0;
        for (let i = 0; i < cof.length; i++) sum += inn[i] * cof[i];
        inn[9] = (sum % 11 < 10) ? sum % 11 : 0;
        return inn.join('');
    },
    setNewValue: function () {
        /*
            Метод устанавливает сгенерированное значение в поле ИННЮЛ
        */
        this.input.value = this.getNewValue(this.input.value);
    },
    validateValue: function (value) {
        if (value.length != 10) return false;
        if (isNaN(parseInt(value))) return false;
        let valueToArray = value.split('');
        const cof = [2, 4, 10, 3, 5, 9, 4, 6, 8];
        let sum = 0;
        for (let i = 0; i < cof.length; i++) {
            sum += valueToArray[i] * cof[i];
        }
        if (valueToArray[9] != sum % 11) return false;
        return true;
    },
    setValidation: function () {
        if (this.validateValue(this.input.value)) {
            this.validationElement.classList.add('validation-passed');
            this.validationElement.classList.remove('validation-failed');
            this.validationElement.classList.remove('validation-off');
        }
        else {
            this.validationElement.classList.add('validation-failed');
            this.validationElement.classList.remove('validation-passed');
            this.validationElement.classList.remove('validation-off');
        }
    },
    copyValue: function () {
        if (INNUL.input.value) {
            navigator.clipboard.writeText(INNUL.input.value);
            console.log(`Значение ИННЮЛ: ${INNUL.input.value} скопироано в буфер обмена.`)
        }
    }
};

const KPP = {
    generateBtn: document.getElementById("generateKPPBtn"),
    copyBtn1: document.getElementById("copyKPPBtn1"),
    copyBtn2: document.getElementById("copyKPPBtn2"),
    copyBtn3: document.getElementById("copyKPPBtn3"),
    input1: document.getElementById("KPPInput1"),
    input2: document.getElementById("KPPInput2"),
    input3: document.getElementById("KPPInput3"),
    inputBlock1: document.getElementById("KPPInputBlock1"),
    inputBlock2: document.getElementById("KPPInputBlock2"),
    inputBlock3: document.getElementById("KPPInputBlock3"),
    getNewValue: function(inputNumber, part) {
        if (isNaN(parseInt(part.slice(0, 4))) || part.length >= 9) part = '';
        if (!part && INNUL.input.value) part = INNUL.input.value;
        if (part.length > 4) part = part.slice(0, 4);
        while (part.length < 4) part += (Math.floor(Math.random() * 10)).toString();
        if (inputNumber == 1) part += '01';
        if (inputNumber == 2) part += '50';
        if (inputNumber == 3) {
            const abc = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
            while (part.length < 6) part += abc[Math.floor(Math.random() * abc.length)];;
        }
        
        while (part.length < 9) part += (Math.floor(Math.random() * 10)).toString();
        return part;
    },
    setNewValue: function() {
        this.input1.value = this.getNewValue(1, this.input1.value);
        this.input2.value = this.getNewValue(2, this.input1.value.slice(0,4));
        this.input3.value = this.getNewValue(3, this.input1.value.slice(0,4));
    },
    validateValue: (value) => {
        if (value.length != 9) return false;
        if (!(/^\d{4}$/.test(value.slice(0, 4)))) return false;
        if (!(/^[A-Z]+$/i.test(value.slice(4, 6)) || /^[0-9]+$/i.test(value.slice(4, 6)))) return false;
        if (!(/^\d{3}$/.test(value.slice(6)))) return false;
        return true;
    },
    setValidation: function(inputNumber) {
        let input, validateValue;

        if (inputNumber == 1) {
            inputThis = this.input1.value;
            validationElement = this.inputBlock1;
        }
        if (inputNumber == 2) {
            input = this.input2.value;
            validationElement = this.inputBlock2;
        }
        if (inputNumber == 3) {
            input = this.input3.value;
            validationElement = this.inputBlock3;
        }
        if (this.validateValue(inputThis)) {
            validationElement.classList.add('validation-passed');
            validationElement.classList.remove('validation-failed');
            validationElement.classList.remove('validation-off');
        }
        else {
            validationElement.classList.add('validation-failed');
            validationElement.classList.remove('validation-passed');
            validationElement.classList.remove('validation-off');
        }

    },
    copyValue: function(btnNumber) {
        if (btnNumber == 1 && this.input1.value) {
            navigator.clipboard.writeText(this.input1.value);
            console.log(`Значение КПП по месту регистрации: ${this.input1.value} скопироано в буфер обмена.`)
        }
        if (btnNumber == 2 && this.input2.value) {
            navigator.clipboard.writeText(this.input2.value);
            console.log(`Значение КПП крупнейшего налогоплательщика: ${this.input2.value} скопироано в буфер обмена.`)
        }
        if (btnNumber == 3 && this.input3.value) {
            navigator.clipboard.writeText(this.input3.value);
            console.log(`Значение КПП c латинскими символами: ${this.input3.value} скопироано в буфер обмена.`)
        }
    }
};

const OGRN = {
    generateBtn: document.getElementById("generateOGRNBtn"),
    copyBtn: document.getElementById("copyOGRNBtn"),
    input: document.getElementById("OGNNInput"),
    validationElement: document.getElementById('OGNNInputBlock'),
    getNewValue: (part) => {
        if(!(/^[0-9]+$/i.test(part)) || part.length > 12) part = '';
        for(let i = part.length; i < 12; i++) part += (Math.floor(Math.random() * 10)).toString();
        return part + (parseInt(part) % 11).toString().slice(-1);
    },
    setNewValue: () => {
        OGRN.input.value = OGRN.getNewValue(OGRN.input.value);
        OGRN.setValidation();
    },
    validateValue: (value) => {
        value = value.replaceAll(' ', '');
        if(value.length != 13) return false;
        if(!(/^[0-9]+$/i.test(value))) return false;
        if((parseInt(value.slice(0, 12)) % 11).toString().slice(-1) != value[12]) return false;
        return true;
    },
    setValidation: function() {
        if (this.validateValue(this.input.value)) {
            this.validationElement.classList.add('validation-passed');
            this.validationElement.classList.remove('validation-failed');
            this.validationElement.classList.remove('validation-off');
        }
        else {
            this.validationElement.classList.add('validation-failed');
            this.validationElement.classList.remove('validation-passed');
            this.validationElement.classList.remove('validation-off');
        }
    },
    copyValue: () => {
        navigator.clipboard.writeText(OGRN.input.value);
        console.log(`Значение ОГРН: ${OGRN.input.value} скопироано в буфер обмена.`);
    }
};

const INNFL = {
    generateBtn: document.getElementById(""),
    copyBtn: document.getElementById(""),
    input: document.getElementById(""),
    validationElement: document.getElementsByClassName("")[0],
    getNewValue: (part) => { },
    setNewValue: () => { },
    validateValue: (value) => { },
    setValidation: () => {
        if (this.validateValue(this.input.value)) {
            this.validationElement.classList.add('validation-passed');
            this.validationElement.classList.remove('validation-failed');
            this.validationElement.classList.remove('validation-off');
        }
        else {
            this.validationElement.classList.add('validation-failed');
            this.validationElement.classList.remove('validation-passed');
            this.validationElement.classList.remove('validation-off');
        }
    },
    copyValue: () => { }
};

const OGRNIP = {
    generateBtn: document.getElementById(""),
    copyBtn: document.getElementById(""),
    input: document.getElementById(""),
    validationElement: document.getElementsByClassName("")[0],
    getNewValue: (part) => { },
    setNewValue: () => { },
    validateValue: (value) => { },
    setValidation: () => {
        if (this.validateValue(this.input.value)) {
            this.validationElement.classList.add('validation-passed');
            this.validationElement.classList.remove('validation-failed');
            this.validationElement.classList.remove('validation-off');
        }
        else {
            this.validationElement.classList.add('validation-failed');
            this.validationElement.classList.remove('validation-passed');
            this.validationElement.classList.remove('validation-off');
        }
    },
    copyValue: () => { }
};

const SNILS = {
    generateBtn: document.getElementById(""),
    copyBtn: document.getElementById(""),
    input: document.getElementById(""),
    validationElement: document.getElementsByClassName("")[0],
    getNewValue: (part) => { },
    setNewValue: () => { },
    validateValue: (value) => { },
    setValidation: () => {
        if (this.validateValue(this.input.value)) {
            this.validationElement.classList.add('validation-passed');
            this.validationElement.classList.remove('validation-failed');
            this.validationElement.classList.remove('validation-off');
        }
        else {
            this.validationElement.classList.add('validation-failed');
            this.validationElement.classList.remove('validation-passed');
            this.validationElement.classList.remove('validation-off');
        }
    },
    copyValue: () => { }
};

const UUID = {
    generateBtn: document.getElementById(""),
    copyBtn: document.getElementById(""),
    input: document.getElementById(""),
    validationElement: document.getElementsByClassName("")[0],
    getNewValue: (part) => { },
    setNewValue: () => { },
    validateValue: (value) => { },
    setValidation: () => {
        if (this.validateValue(this.input.value)) {
            this.validationElement.classList.add('validation-passed');
            this.validationElement.classList.remove('validation-failed');
            this.validationElement.classList.remove('validation-off');
        }
        else {
            this.validationElement.classList.add('validation-failed');
            this.validationElement.classList.remove('validation-passed');
            this.validationElement.classList.remove('validation-off');
        }
    },
    copyValue: () => { }
};

const FIO = {
    generateBtn: document.getElementById(""),
    copyBtn: document.getElementById(""),
    input: document.getElementById(""),
    validationElement: document.getElementsByClassName("")[0],
    getNewValue: (part) => { },
    setNewValue: () => { },
    validateValue: (value) => { },
    setValidation: () => {
        if (this.validateValue(this.input.value)) {
            this.validationElement.classList.add('validation-passed');
            this.validationElement.classList.remove('validation-failed');
            this.validationElement.classList.remove('validation-off');
        }
        else {
            this.validationElement.classList.add('validation-failed');
            this.validationElement.classList.remove('validation-passed');
            this.validationElement.classList.remove('validation-off');
        }
    },
    copyValue: () => { }
};

const orgName = {
    generateBtn: document.getElementById(""),
    copyBtn: document.getElementById(""),
    input: document.getElementById(""),
    validationElement: document.getElementsByClassName("")[0],
    getNewValue: (part) => { },
    setNewValue: () => { },
    validateValue: (value) => { },
    setValidation: () => {
        if (this.validateValue(this.input.value)) {
            this.validationElement.classList.add('validation-passed');
            this.validationElement.classList.remove('validation-failed');
            this.validationElement.classList.remove('validation-off');
        }
        else {
            this.validationElement.classList.add('validation-failed');
            this.validationElement.classList.remove('validation-passed');
            this.validationElement.classList.remove('validation-off');
        }
    },
    copyValue: () => { }
};

const BIN = {
    generateBtn: document.getElementById(""),
    copyBtn: document.getElementById(""),
    input: document.getElementById(""),
    validationElement: document.getElementsByClassName("")[0],
    getNewValue: (part) => { },
    setNewValue: () => { },
    validateValue: (value) => { },
    setValidation: () => {
        if (this.validateValue(this.input.value)) {
            this.validationElement.classList.add('validation-passed');
            this.validationElement.classList.remove('validation-failed');
            this.validationElement.classList.remove('validation-off');
        }
        else {
            this.validationElement.classList.add('validation-failed');
            this.validationElement.classList.remove('validation-passed');
            this.validationElement.classList.remove('validation-off');
        }
    },
    copyValue: () => { }
};

const IIN = {
    generateBtn: document.getElementById(""),
    copyBtn: document.getElementById(""),
    input: document.getElementById(""),
    validationElement: document.getElementsByClassName("")[0],
    getNewValue: (part) => { },
    setNewValue: () => { },
    validateValue: (value) => { },
    setValidation: () => {
        if (this.validateValue(this.input.value)) {
            this.validationElement.classList.add('validation-passed');
            this.validationElement.classList.remove('validation-failed');
            this.validationElement.classList.remove('validation-off');
        }
        else {
            this.validationElement.classList.add('validation-failed');
            this.validationElement.classList.remove('validation-passed');
            this.validationElement.classList.remove('validation-off');
        }
    },
    copyValue: () => { }
};

const UNN = {
    generateBtn: document.getElementById(""),
    copyBtn: document.getElementById(""),
    input: document.getElementById(""),
    validationElement: document.getElementsByClassName("")[0],
    getNewValue: (part) => { },
    setNewValue: () => { },
    validateValue: (value) => { },
    setValidation: () => {
        if (this.validateValue(this.input.value)) {
            this.validationElement.classList.add('validation-passed');
            this.validationElement.classList.remove('validation-failed');
            this.validationElement.classList.remove('validation-off');
        }
        else {
            this.validationElement.classList.add('validation-failed');
            this.validationElement.classList.remove('validation-passed');
            this.validationElement.classList.remove('validation-off');
        }
    },
    copyValue: () => { }
};

const UNP = {
    generateBtn: document.getElementById(""),
    copyBtn: document.getElementById(""),
    input: document.getElementById(""),
    validationElement: document.getElementsByClassName("")[0],
    getNewValue: (part) => { },
    setNewValue: () => { },
    validateValue: (value) => { },
    setValidation: () => {
        if (this.validateValue(this.input.value)) {
            this.validationElement.classList.add('validation-passed');
            this.validationElement.classList.remove('validation-failed');
            this.validationElement.classList.remove('validation-off');
        }
        else {
            this.validationElement.classList.add('validation-failed');
            this.validationElement.classList.remove('validation-passed');
            this.validationElement.classList.remove('validation-off');
        }
    },
    copyValue: () => { }
};



function generateAll(part) {
    return "pass"
}

function deleteAll(part) {
    return "pass"
}

// Слушаем события блока ИННЮЛ
INNUL.generateBtn.addEventListener("click", () => {
    INNUL.setNewValue();
    INNUL.setValidation();
});
INNUL.input.addEventListener('mouseout', () => INNUL.setValidation());
INNUL.copyBtn.addEventListener('click', () => INNUL.copyValue());

// Слушаем события блока КПП
KPP.generateBtn.addEventListener('click', ()=>{
    KPP.setNewValue();
    KPP.setValidation(1);
    KPP.setValidation(2);
    KPP.setValidation(3);
});
KPP.input1.addEventListener('change', () => KPP.setValidation(1));
KPP.input2.addEventListener('change', () => KPP.setValidation(2));
KPP.input3.addEventListener('change', () => KPP.setValidation(3));
KPP.copyBtn1.addEventListener('click', () => KPP.copyValue(1));
KPP.copyBtn2.addEventListener('click', () => KPP.copyValue(2));
KPP.copyBtn3.addEventListener('click', () => KPP.copyValue(3));

// Слушаем события блока ОГРН
OGRN.generateBtn.addEventListener('click', ()=> {
    OGRN.setNewValue();
    OGRN.setValidation();
});
OGRN.input.addEventListener('change', () => OGRN.setValidation());
OGRN.copyBtn.addEventListener('click', () => OGRN.copyValue());