const INNUL = {
    generateBtn: document.getElementById("generateINNULBtn"),
    copyBtn: document.getElementById("copyINNULBtn"),
    input: document.getElementById("INNULInput"),
    validationElement: document.getElementsByClassName("INNULValidation")[0],
    getNewValue: (part) => {
        if (isNaN(parseInt(part)) || part.length > 9) part = '';
        for (let i = part.length; i < 9; i++) part += (Math.floor(Math.random() * 10)).toString();
        const coef = [2, 4, 10, 3, 5, 9, 4, 6, 8];
        let sum = 0;
        for (let i = 0; i < coef.length; i++) sum += parseInt(part[i]) * coef[i];
        part += (sum % 11 % 10).toString();
        return part;
    },
    setNewValue: () => {
        INNUL.input.value = INNUL.getNewValue(INNUL.input.value);
    },
    setEmptyValue: () => {
        INNUL.input.value = '';
    },
    validateValue: (value) => {
        if (value.length != 10) return false;
        if (isNaN(parseInt(value))) return false;
        let valueToArray = value.split('');
        const coef = [2, 4, 10, 3, 5, 9, 4, 6, 8];
        let sum = 0;
        for (let i = 0; i < coef.length; i++) sum += parseInt(value[i]) * coef[i];
        if (parseInt(value[9]) != sum % 11 % 10) return false;
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
    copyValue: () => {
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
    getNewValue: function (inputNumber, part) {
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
    setNewValue: function () {
        this.input1.value = this.getNewValue(1, this.input1.value);
        this.input2.value = this.getNewValue(2, this.input1.value.slice(0, 4));
        this.input3.value = this.getNewValue(3, this.input1.value.slice(0, 4));
    },
    setEmptyValue: () => {
        KPP.input1.value = '';
        KPP.input2.value = '';
        KPP.input3.value = '';
    },
    validateValue: (value) => {
        if (value.length != 9) return false;
        if (!(/^\d{4}$/.test(value.slice(0, 4)))) return false;
        if (!(/^[A-Z]+$/i.test(value.slice(4, 6)) || /^[0-9]+$/i.test(value.slice(4, 6)))) return false;
        if (!(/^\d{3}$/.test(value.slice(6)))) return false;
        return true;
    },
    setValidation: function (inputNumber) {

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
    copyValue: function (btnNumber) {
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
    input: document.getElementById("OGRNInput"),
    validationElement: document.getElementById('OGRNInputBlock'),
    getNewValue: (part) => {
        if (!(/^[0-9]+$/i.test(part)) || part.length > 12) part = '';
        for (let i = part.length; i < 12; i++) part += (Math.floor(Math.random() * 10)).toString();
        return part + (parseInt(part) % 11).toString().slice(-1);
    },
    setNewValue: () => {
        OGRN.input.value = OGRN.getNewValue(OGRN.input.value);
        OGRN.setValidation();
    },
    setEmptyValue: () => {
        OGRN.input.value = '';
    },
    validateValue: (value) => {
        value = value.replaceAll(' ', '');
        if (value.length != 13) return false;
        if (!(/^[0-9]+$/i.test(value))) return false;
        if ((parseInt(value.slice(0, 12)) % 11).toString().slice(-1) != value[12]) return false;
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
    copyValue: () => {
        navigator.clipboard.writeText(OGRN.input.value);
        console.log(`Значение ОГРН: ${OGRN.input.value} скопироано в буфер обмена.`);
    }
};

const INNFL = {
    generateBtn: document.getElementById("generateINNFLBtn"),
    copyBtn: document.getElementById("copyINNFLBtn"),
    input: document.getElementById("INNFLInput"),
    validationElement: document.getElementById("INNFLInputBlock"),
    getNewValue: (part) => {
        if (isNaN(parseInt(part)) || part.length >= 10) part = '';
        for (let i = part.length; i < 10; i++) part += (Math.floor(Math.random() * 10)).toString();
        const coef1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
        const coef2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
        let sum1 = 0, sum2 = 0;
        for (let i = 0; i < coef1.length; i++) sum1 += parseInt(part[i]) * coef1[i];
        part += (sum1 % 11 % 10).toString();
        for (let i = 0; i < coef2.length; i++) sum2 += parseInt(part[i]) * coef2[i];
        part += (sum2 % 11 % 10).toString();
        return part;
    },
    setNewValue: () => {
        INNFL.input.value = INNFL.getNewValue(INNFL.input.value);
        INNFL.setValidation();
    },
    setEmptyValue: () => {
        INNFL.input.value = '';
    },
    validateValue: (value) => {
        value = value.replaceAll(' ', '');
        if (value.length != 12) return false;
        if (!(/^[0-9]+$/i.test(value))) return false;
        const coef1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
        const coef2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
        let sum1 = 0, sum2 = 0;
        for (let i = 0; i < coef1.length; i++) sum1 += parseInt(value[i]) * coef1[i];
        if (value[10] !== (sum1 % 11 % 10).toString()) return false;
        for (let i = 0; i < coef2.length; i++) sum2 += parseInt(value[i]) * coef2[i];
        if (value[11] !== (sum2 % 11 % 10).toString()) return false;
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
    copyValue: () => {
        if (INNFL.input.value) {
            navigator.clipboard.writeText(INNFL.input.value);
            console.log(`Значение ИННФЛ: ${INNFL.input.value} скопироано в буфер обмена.`)
        }
    }
};

const OGRNIP = {
    generateBtn: document.getElementById("generateOGRNIPBtn"),
    copyBtn: document.getElementById("copyOGRNIPBtn"),
    input: document.getElementById("OGRNIPInput"),
    validationElement: document.getElementById("OGRNIPInputBlock"),
    getNewValue: (part) => {
        if (!(/^[0-9]+$/i.test(part)) || part.length > 14) part = '';
        for (let i = part.length; i < 14; i++) part += (Math.floor(Math.random() * 10)).toString();
        return part + (parseInt(part) % 13).toString().slice(-1);
    },
    setNewValue: () => {
        OGRNIP.input.value = OGRNIP.getNewValue(OGRNIP.input.value);
        OGRNIP.setValidation();
    },
    setEmptyValue: () => {
        OGRNIP.input.value = '';
    },
    validateValue: (value) => {
        value = value.replaceAll(' ', '');
        if (value.length != 15) return false;
        if (!(/^[0-9]+$/i.test(value))) return false;
        if ((parseInt(value.slice(0, 14)) % 13).toString().slice(-1) != value[14]) return false;
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
    copyValue: () => {
        navigator.clipboard.writeText(OGRNIP.input.value);
        console.log(`Значение ОГРНИП: ${OGRNIP.input.value} скопироано в буфер обмена.`);
    }
};

const SNILS = {
    generateBtn: document.getElementById("generateSNILSBtn"),
    copyBtn1: document.getElementById("copySNILSBtn1"),
    copyBtn2: document.getElementById("copySNILSBtn2"),
    input1: document.getElementById("SNILSInput1"),
    input2: document.getElementById("SNILSInput2"),
    validationElement1: document.getElementById("SNILSInputBlock1"),
    validationElement2: document.getElementById("SNILSInputBlock2"),
    getNewValue: (value) => {
        value = value.replaceAll(' ', '').replaceAll('-', '');
        if (value.length > 10 || !(/^[0-9]+$/.test(value))) value = '';
        while(value.length < 9) value += (Math.floor(Math.random() * 10)).toString();
        const coef = [9, 8, 7, 6, 5, 4, 3, 2, 1];
        let sum = 0;
        for (let i = 0; i < coef.length; i++) sum += parseInt(value[i]) * coef[i];
        if(sum < 100) value += ( '0' + sum.toString()).slice(-2);
        else if(sum === 100) value += '00';
        else value += ('0' + (sum % 101 % 100).toString()).slice(-2);
        return value;
    },
    setNewValue: () => {
        const value = SNILS.getNewValue(SNILS.input1.value);
        SNILS.input1.value = value;
        SNILS.input2.value = `${value.slice(0,3)}-${value.slice(3,6)}-${value.slice(6,9)} ${value.slice(-2)}`;
        SNILS.setValidation(1);
        SNILS.setValidation(2);
    },
    setEmptyValue: () => {
        SNILS.input1.value = '';
        SNILS.input2.value = '';
    },
    validateValue: (value) => {
        value = value.replaceAll(' ', '').replaceAll('-', '');
        if (value.length != 11) return false;
        if (!(/^[0-9]+$/.test(value))) return false;
        const coef = [9, 8, 7, 6, 5, 4, 3, 2, 1];
        let sum = 0;
        for (let i = 0; i < coef.length; i++) sum += parseInt(value[i]) * coef[i];
        const controlNumber = parseInt(value.slice(-2));
        if (!((  sum < 100 && controlNumber === sum) || 
                (sum === 100 && controlNumber === 0) || 
                (controlNumber === sum % 101 % 100))) return false;
        return true;
    },
    setValidation: (inputNumber) => {
        if (inputNumber == 1) {
            inputThis = SNILS.input1.value;
            validationElement = SNILS.validationElement1;
        }
        if (inputNumber == 2) {
            inputThis = SNILS.input2.value;
            validationElement = SNILS.validationElement2;
        }
        if (SNILS.validateValue(inputThis)) {
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
    copyValue: (btnNumber) => {
        if (btnNumber == 1 && SNILS.input1.value) {
            navigator.clipboard.writeText(SNILS.input1.value);
            console.log(`Значение СНИЛС без разделителей: ${SNILS.input1.value} скопироано в буфер обмена.`)
        }
        if (btnNumber == 2 && SNILS.input2.value) {
            navigator.clipboard.writeText(SNILS.input2.value);
            console.log(`Значение СНИЛС с разделителями: ${SNILS.input2.value} скопироано в буфер обмена.`)
        }
    }
};

const UUID = {
    generateBtn: document.getElementById("generateUUIDBtn"),
    copyBtn: document.getElementById("copyUUIDBtn"),
    input: document.getElementById("UUIDInput"),
    validationElement: document.getElementById("UUIDInputBlock"),
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
    generateBtn: document.getElementById("generateBINBtn"),
    copyBtn: document.getElementById("copyBINBtn"),
    input: document.getElementById("BINInput"),
    validationElement: document.getElementById("BINInputBlock"),
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
    generateBtn: document.getElementById("generateIINBtn"),
    copyBtn: document.getElementById("copyIINBtn"),
    input: document.getElementById("IINInput"),
    validationElement: document.getElementById("IINInputBlock"),
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
    generateBtn: document.getElementById("generateUNNBtn"),
    copyBtn: document.getElementById("copyUNNBtn"),
    input: document.getElementById("UNNInput"),
    validationElement: document.getElementById("UNNInputBlock"),
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
    generateBtn: document.getElementById("generateUNPBtn"),
    copyBtn: document.getElementById("copyUNPBtn"),
    input: document.getElementById("UNPInput"),
    validationElement: document.getElementById("UNPInputBlock"),
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

// Слушаем события кнопки Сгенерировать всё
const generateAllBtn = document.getElementById("generateAllBtn");
generateAllBtn.addEventListener('click', () => {
    INNUL.setNewValue();
    INNUL.setValidation();
    KPP.setNewValue();
    KPP.setValidation(1);
    KPP.setValidation(2);
    KPP.setValidation(3);
    OGRN.setNewValue();
    OGRN.setValidation();
    INNFL.setNewValue();
    INNFL.setValidation();
    OGRNIP.setNewValue();
    OGRNIP.setValidation();
    SNILS.setNewValue();
    SNILS.setValidation();

});

// Слушаем события кнопки Сбросить всё
const deleteAllBtn = document.getElementById("deleteAllBtn");
deleteAllBtn.addEventListener('click', () => {
    INNUL.setEmptyValue();
    INNUL.setValidation();
    KPP.setEmptyValue();
    KPP.setValidation(1);
    KPP.setValidation(2);
    KPP.setValidation(3);
    OGRN.setEmptyValue();
    OGRN.setValidation();
    INNFL.setEmptyValue();
    INNFL.setValidation();
    OGRNIP.setEmptyValue();
    OGRNIP.setValidation();
    SNILS.setEmptyValue();
    SNILS.setValidation(1);
    SNILS.setValidation(2);

});

// Слушаем события блока ИННЮЛ
INNUL.generateBtn.addEventListener("click", () => {
    INNUL.setNewValue();
    INNUL.setValidation();
});
INNUL.input.addEventListener('mouseout', () => INNUL.setValidation());
INNUL.copyBtn.addEventListener('click', () => INNUL.copyValue());

// Слушаем события блока КПП
KPP.generateBtn.addEventListener('click', () => {
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
OGRN.generateBtn.addEventListener('click', () => {
    OGRN.setNewValue();
    OGRN.setValidation();
});
OGRN.input.addEventListener('change', () => OGRN.setValidation());
OGRN.copyBtn.addEventListener('click', () => OGRN.copyValue());

// Слушаем события блока ИННФЛ
INNFL.generateBtn.addEventListener('click', () => {
    INNFL.setNewValue();
    INNFL.setValidation();
});
INNFL.input.addEventListener('change', () => INNFL.setValidation());
INNFL.copyBtn.addEventListener('click', () => INNFL.copyValue());

// Слушаем события блока ОГРНИП
OGRNIP.generateBtn.addEventListener('click', () => {
    OGRNIP.setNewValue();
    OGRNIP.setValidation();
});
OGRNIP.input.addEventListener('change', () => OGRNIP.setValidation());
OGRNIP.copyBtn.addEventListener('click', () => OGRNIP.copyValue());

// Слушаем события блока СНИЛС
SNILS.generateBtn.addEventListener('click', () => {
    SNILS.setNewValue();
    SNILS.setValidation();
});
SNILS.input1.addEventListener('change', () => SNILS.setValidation(1));
SNILS.input2.addEventListener('change', () => SNILS.setValidation(2));
SNILS.copyBtn1.addEventListener('click', () => SNILS.copyValue(1));
SNILS.copyBtn2.addEventListener('click', () => SNILS.copyValue(2));