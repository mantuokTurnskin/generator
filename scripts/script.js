class GeneratorItem {
    constructor(name = '', blockName = '', placeholderItem = '', blockNameAnnotation = '') {
        this.name = name;
        this.blockName = blockName;
        this.blockNameAnnotation = blockNameAnnotation;
        this.placeholderItem = placeholderItem;
        this.item;
        this.btn;
        this.copyBtn;
        this.inputElem;
        this.validationArea;
        this.setValueCounter = 0;

    }

    
    createDOMItem() {
        // создание в DOM разметки генератора
        const main = document.getElementById('main');
        const item = document.createElement('div');
            item.classList.add(this.blockName, "item-block");

        const btn = document.createElement('div');
            btn.classList.add(`generate-${this.blockName}`, 'btn', 'block-btn', 'btn-text-color', 'noselect');
            btn.id = `generate${this.blockName.toUpperCase()}Btn`;
            const btnName = document.createElement('span');
            btn.appendChild(btnName);
            btnName.textContent = this.name;
            if (this.blockNameAnnotation) {
                const btnNameAnnotation = document.createElement('span');
                btnNameAnnotation.classList.add("btn-annotation-span");
                btnNameAnnotation.textContent = `(${this.blockNameAnnotation})`;
                btn.appendChild(btnNameAnnotation);
            }
            item.appendChild(btn);
            this.btn = btn;

        const copyAndInputBlocks = document.createElement('div');
            copyAndInputBlocks.classList.add('copy-and-input-blocks');
            const svg = `<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5 15C4.06812 15 3.60218 15 3.23463 14.8478C2.74458 14.6448 2.35523 14.2554 2.15224 13.7654C2 13.3978 2 12.9319 2 12V5.2C2 4.0799 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2H12C12.9319 2 13.3978 2 13.7654 2.15224C14.2554 2.35523 14.6448 2.74458 14.8478 3.23463C15 3.60218 15 4.06812 15 5M12.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V12.2C22 11.0799 22 10.5198 21.782 10.092C21.5903 9.71569 21.2843 9.40973 20.908 9.21799C20.4802 9 19.9201 9 18.8 9H12.2C11.0799 9 10.5198 9 10.092 9.21799C9.71569 9.40973 9.40973 9.71569 9.21799 10.092C9 10.5198 9 11.0799 9 12.2V18.8C9 19.9201 9 20.4802 9.21799 20.908C9.40973 21.2843 9.71569 21.5903 10.092 21.782C10.5198 22 11.0799 22 12.2 22Z"
                                            stroke="#4898d6" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>`
            const copyBtn = document.createElement('div');
                copyBtn.classList.add("copy-btn");
                copyBtn.id = `copy${this.blockName.toUpperCase()}Btn`;
                copyBtn.insertAdjacentHTML('beforeend', svg);
                this.copyBtn = copyBtn;
            const copyBtnWrapper = document.createElement('div');
                copyBtnWrapper.classList.add('copy-btn-wrapper', 'btn-text-color');
                copyBtnWrapper.appendChild(copyBtn);
            const inputElem = document.createElement('input');
                [
                    {n: 'type', v: 'text'},
                    {n: 'name', v: `input-text-${this.blockName}`},
                    {n: 'placeholder', v: this.placeholderItem},
                    {n: 'id', v: `${this.blockName.toUpperCase()}Input`},
                ].forEach(attr => { inputElem.setAttribute(attr.n, attr.v); });
                this.inputElem = inputElem;
            const inputBlock = document.createElement('div');
                inputBlock.classList.add('input-block');
                inputBlock.id = `${this.blockName.toUpperCase()}InputBlock`;
                inputBlock.appendChild(inputElem);
                this.validationArea = inputBlock;
            const copyAndInputBlock = document.createElement('div');
                copyAndInputBlock.classList.add('copy-and-input-block');
                copyAndInputBlock.appendChild(copyBtnWrapper);
                copyAndInputBlock.appendChild(inputBlock);
            copyAndInputBlocks.appendChild(copyAndInputBlock);
        item.appendChild(copyAndInputBlocks);

        main.appendChild(item);
        this.item = item;
    }

    setValueInLocalStorage(){
        // читается предыдущее значение генератора из локалсториджа
        localStorage.setItem(`requisiteGenerator_${this.blockName}`, this.inputElem.value);
    }

    getValueFromLocalStorage(){
        // текущее значение инпута генератора записывается в локалсторидж
        this.inputElem.value = localStorage.getItem(`requisiteGenerator_${this.blockName}`) || '';
    }

    generateValue() {
        // генерируется значение генератора исходя из свойства blockName
        let part = this.inputElem.value;
        if (this.blockName === 'innul') {
            if (isNaN(parseInt(part)) || part.length > 9) part = '';
            for (let i = part.length; i < 9; i++) part += (Math.floor(Math.random() * 10)).toString();
                const coef = [2, 4, 10, 3, 5, 9, 4, 6, 8];
                let sum = 0;
            for (let i = 0; i < coef.length; i++) sum += parseInt(part[i]) * coef[i];
                part += (sum % 11 % 10).toString();

        }
        if (this.blockName === 'kpp1' || this.blockName === 'kpp2' || this.blockName === 'kpp3') {
            const innulValue = localStorage.getItem(`requisiteGenerator_innul`);
            if (isNaN(parseInt(part.slice(0, 4))) || part.length >= 9) part = '';
            if (!part && innulValue) part = innulValue;
            if (part.length > 4) part = part.slice(0, 4);
            while (part.length < 4) part += (Math.floor(Math.random() * 10)).toString();
            if (this.blockName === 'kpp1') part += '01001';
            if (this.blockName === 'kpp2') part += '50';
            if (this.blockName === 'kpp3') {
                const abc = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
                while (part.length < 6) part += abc[Math.floor(Math.random() * abc.length)];;
            }
            while (part.length < 9) part += (Math.floor(Math.random() * 10)).toString();
        }
        if (this.blockName === 'ogrn') {
            if (!(/^[0-9]+$/i.test(part)) || part.length > 12) part = '1';
            for (let i = part.length; i < 12; i++) part += (Math.floor(Math.random() * 10)).toString();
            part += (parseInt(part) % 11).toString().slice(-1);
        }
        if (this.blockName === 'innfl') {
            if (isNaN(parseInt(part)) || part.length >= 10) part = '';
            for (let i = part.length; i < 10; i++) part += (Math.floor(Math.random() * 10)).toString();
            const coef1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
            const coef2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
            let sum1 = 0, sum2 = 0;
            for (let i = 0; i < coef1.length; i++) sum1 += parseInt(part[i]) * coef1[i];
            part += (sum1 % 11 % 10).toString();
            for (let i = 0; i < coef2.length; i++) sum2 += parseInt(part[i]) * coef2[i];
            part += (sum2 % 11 % 10).toString();
        }
        if (this.blockName === 'snils1' || this.blockName === 'snils2') {
            
            part = part.replaceAll(' ', '').replaceAll('-', '');
            if (part.length > 10 || !(/^[0-9]+$/.test(part))) part = '';
            while(part.length < 9) part += (Math.floor(Math.random() * 10)).toString();
            const coef = [9, 8, 7, 6, 5, 4, 3, 2, 1];
            let sum = 0;
            for (let i = 0; i < coef.length; i++) sum += parseInt(part[i]) * coef[i];
            if(sum < 100) part += ( '0' + sum.toString()).slice(-2);
            else if(sum === 100) part += '00';
            else part += ('0' + (sum % 101 % 100).toString()).slice(-2);
            if (this.blockName === 'snils1') part = `${part.slice(0,3)}-${part.slice(3,6)}-${part.slice(6,9)} ${part.slice(-2)}`;
            const snils1Value = localStorage.getItem(`requisiteGenerator_snils1`).replaceAll(' ', '').replaceAll('-', '') || '';
            if (this.blockName === 'snils2' && this.setValueCounter % 2 === 0) part = snils1Value;
        }
        if (this.blockName === 'ogrnip') {
            if (!(/^[0-9]+$/i.test(part)) || part.length > 14) part = '3';
            for (let i = part.length; i < 14; i++) part += (Math.floor(Math.random() * 10)).toString();
            part += (parseInt(part) % 13).toString().slice(-1);
        }
        if (this.blockName === 'uuid') {
            part = part.replaceAll(' ', '');
            if (part.length > 8 && part[8] !== '-') part = `${part.slice(0, 8)}-${part.slice(8)}`;
            if (part.length > 13 && part[13] !== '-') part = `${part.slice(0, 13)}-${part.slice(13)}`;
            if (part.length > 18 && part[18] !== '-') part = `${part.slice(0, 18)}-${part.slice(18)}`;
            if (part.length > 23 && part[23] !== '-') part = `${part.slice(0, 23)}-${part.slice(23)}`;
            if (!(/^[0-9a-f]+$/i.test(part.replaceAll('-', ''))) || part.length > 35) part = '';
            const symbols = '0123456789abcdef';
            let length = part.length;
            while (length < 36){
                if (length === 8 || length === 13 || length === 18 || length === 23) part += '-';
                else   part += symbols[Math.floor(Math.random() * 15)];
                length++;
            }
        }
        if (this.blockName === 'bin') {
            if (!(/^[0-9]+$/i.test(part)) || part.length > 11) part = '';
            for (let i = part.length; i < 11; i++) part += (Math.floor(Math.random() * 10)).toString();
            let sum = 0;
            for(let i = 0; i < 10; i++) sum += part[i] * (i + 1);
            part += ((sum % 11) % 10).toString();
        }
        if (this.blockName === 'iin') {
            if (!(/^[0-9]+$/i.test(part)) || part.length > 11) part = '';
            if (part.length > 3 && (parseInt(part.slice(2, 4)) > 12 || parseInt(part.slice(2, 4)) === 0))  part = '';
            if (part.length > 5 && (parseInt(part.slice(4, 6)) > 31 || parseInt(part.slice(4, 6)) === 0))  part = '';
            for (let i = part.length; i < 11; i++) part += (Math.floor(Math.random() * 10)).toString();
            if (parseInt(part.slice(2, 4)) > 12 || parseInt(part.slice(2, 4)) === 0) part = part.slice(0,2) + (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0') + part.slice(4);
            if (parseInt(part.slice(2, 4)) === 2 && (parseInt(part.slice(4, 6)) > 29 || parseInt(part.slice(2, 4)) === 0)) {
                part = part.slice(0,4) + (Math.floor(Math.random() * 29) + 1).toString().padStart(2, '0') + part.slice(6);
            }
            ['04', '06', '09', '11'].forEach(i => {
                    if(part.slice(2, 4) === i && (parseInt(part.slice(4, 6)) > 30 || parseInt(part.slice(2, 4)) === 0)) {
                        part = part.slice(0,4) + (Math.floor(Math.random() * 30) + 1).toString().padStart(2, '0') + part.slice(6);
                    }
                });
            if (parseInt(part.slice(4, 6)) > 31 || parseInt(part.slice(2, 4)) === 0) {
                part = part.slice(0,4) + (Math.floor(Math.random() * 31) + 1).toString().padStart(2, '0') + part.slice(6);
            }   
            let sum = 0;
            for(let i = 0; i < 10; i++) sum += part[i] * (i + 1);
            part += ((sum % 11) % 10).toString();
        }
        if (this.blockName === 'uun') {
            if (!(/^[0-9]+$/i.test(part)) || part.length > 9) part = '';
            part = part.split('');
            while(part.length < 2) part.push(Math.floor(Math.random() * 10));
            while(part.length < 4) part.push(0);
            while(part.length < 10) part.push(Math.floor(Math.random() * 10));
            const weights = [31, 29, 23, 19, 17, 13, 7, 5, 3, 2];
            let sum;
            do{
                sum = 0;
                weights.forEach((item, index) => sum += item * part[index]);
                if(sum % 11 % 10 === part[4]) break;
                if(sum % 11 % 10 === 5) part[9] = (part[9] + 1) % 10;
                part[4] = (part[4] + 1 ) % 10;
            } while(true);
            part = part.join('');
        }
        if (this.blockName === 'unp') {
            if (!(/^[0-9]+$/i.test(part)) || part.length > 8) part = '';
            part = part.split('');
            while(part.length < 8) part.push(Math.floor(Math.random() * 10));
            const weights = [29, 23, 19, 17, 13, 7, 5, 3];
            let sum = 0;
            weights.forEach((item, index) => sum += item * parseInt(part[index]));
            part.push(sum % 11 % 10);
            part = part.join('');
        }
        return part;
    }

    checkValue(){
        // проверяется валидность значения генератора исходя из свойства blockName
        let value = this.inputElem.value;
        if (value.length === 0) return null;
        if (this.blockName === 'innul') {
            if (value.length != 10) return false;
            if (isNaN(parseInt(value))) return false;
            let valueToArray = value.split('');
            const coef = [2, 4, 10, 3, 5, 9, 4, 6, 8];
            let sum = 0;
            for (let i = 0; i < coef.length; i++) sum += parseInt(value[i]) * coef[i];
            if (parseInt(value[9]) != sum % 11 % 10) return false;
            return true;
        }
        if (this.blockName === 'kpp1' || this.blockName === 'kpp2' || this.blockName === 'kpp3') {
            if (value.length != 9) return false;
            if (!(/^\d{4}$/.test(value.slice(0, 4)))) return false;
            if (!(/^[A-Z]+$/i.test(value.slice(4, 6)) || /^[0-9]+$/i.test(value.slice(4, 6)))) return false;
            if (!(/^\d{3}$/.test(value.slice(6)))) return false;
            return true;
        }
        if (this.blockName === 'ogrn') {
            if (value.length != 13) return false;
            if (!(/^[0-9]+$/i.test(value))) return false;
            if ((parseInt(value.slice(0, 12)) % 11).toString().slice(-1) != value[12]) return false;
            return true;
        }
        if (this.blockName === 'innfl') {
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
        }
        if (this.blockName === 'snils1' || this.blockName === 'snils2') {
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
        }
        if (this.blockName === 'ogrnip') {
            if (value.length != 15) return false;
            if (!(/^[0-9]+$/i.test(value))) return false;
            if ((parseInt(value.slice(0, 14)) % 13).toString().slice(-1) != value[14]) return false;
            return true;
        }
        if (this.blockName === 'uuid') {
            value = value.replaceAll(' ', '').toLowerCase();
            if (value.length !== 36) return false;
            if (!(/^[0-9a-f]+$/.test(value.replaceAll('-', '')))) return false;
            if (value[8] !== '-' || value[13] !== '-' || value[18] !== '-' || value[23] !== '-' ) return false;
            return true;
        }
        if (this.blockName === 'bin') {
            if (value.length != 12) return false;
            if (!(/^[0-9]+$/i.test(value))) return false;
            let sum = 0;
            for(let i = 0; i < 11; i++) sum += value[i] * (i + 1);
            return value[11] === (sum % 11 % 10).toString();

        }
        if (this.blockName === 'iin') {
            if (value.length != 12) return false;
            if (!(/^[0-9]+$/i.test(value))) return false;
            if (parseInt(value.slice(2, 4)) > 12 || parseInt(value.slice(2, 4)) === 0) return false;
            if (parseInt(value.slice(4, 6)) > 31 || parseInt(value.slice(4, 6)) === 0) return false;
            if (value.slice(2, 4) === '02' && parseInt(value.slice(4, 6)) > 29) return false;
            if (parseInt(value.slice(4, 6)) > 30) {
                ['02', '04', '06', '09', '11'].forEach(i => {
                    if(value.slice(2, 4) === i) return false;
                });
            }
            let sum = 0;
            for(let i = 0; i < 11; i++) sum += value[i] * (i + 1);
            return value[11] === (sum % 11 % 10).toString();
        }
        if (this.blockName === 'uun') {
            if (value.length != 10) return false;
            if (!(/^[0-9]+$/i.test(value))) return false;
            const weights = [31, 29, 23, 19, 17, 13, 7, 5, 3, 2];
            let sum = 0;
            weights.forEach((item, index) => sum += item * parseInt(value[index]));
            return sum % 11 % 10 === parseInt(value[4]);
        }
        if (this.blockName === 'unp') {
            if (value.length != 9) return false;
            if (!(/^[0-9]+$/i.test(value))) return false;
            const weights = [29, 23, 19, 17, 13, 7, 5, 3];
            let sum = 0;
            weights.forEach((item, index) => sum += item * parseInt(value[index]));
            return sum % 11 % 10 === parseInt(value[8]);
        }

    }

    copyValue() {
        // значение инпута генератора копируется в буфер обмена
        if (this.inputElem.value) {
            navigator.clipboard.writeText(this.inputElem.value);
            console.log(`Значение ИННЮЛ: ${this.inputElem.value} скопироано в буфер обмена.`)
        }
    }

    setEmptyValue() {
        // устанавливает пустое значение в интут генератора
        this.inputElem.value = '';
        this.setValueInLocalStorage();
    }

    setNewValue() {
        // устанавливает новое значение в интуп генератора
        this.inputElem.value = this.generateValue();
        this.setValueInLocalStorage();
        this.setValueCounter++;
    }

    setValidation() {
        // на основании чекинга генератора обертке input заполняются классы, которые делают визуальную валидацию
        const checkValue = this.checkValue();
        if(checkValue === null) {
            this.validationArea.classList.add('validation-off');
            this.validationArea.classList.remove('validation-failed');
            this.validationArea.classList.remove('validation-passed'); 
        }
        else if(checkValue) {
            this.validationArea.classList.add('validation-passed');
            this.validationArea.classList.remove('validation-failed');
            this.validationArea.classList.remove('validation-off');
        }
        else {
            this.validationArea.classList.add('validation-failed');
            this.validationArea.classList.remove('validation-passed');
            this.validationArea.classList.remove('validation-off');
        }
    }

    prepareGeneranor(){
        // подготовка генератора. Создается генератор. На генератор навешиваются события генерации, валидации
        this.createDOMItem();
        this.getValueFromLocalStorage();
        this.setValidation();
        this.btn.addEventListener("click", () => { 
            this.setNewValue(); 
            this.setValidation(); 
        });
        this.copyBtn.addEventListener('click', () => this.copyValue());
        this.inputElem.addEventListener('input', () => { 
            this.setValidation(); 
            this.setValueInLocalStorage();
        });
    }
}


// Создание полей генераторов
const innul = new GeneratorItem('ИНН ЮЛ', 'innul', 'ИНН организации (10 символов)');
innul.prepareGeneranor();

const kpp1 = new GeneratorItem('КПП', 'kpp1', "КПП по месту регистрации", "по месту регистрации");
kpp1.prepareGeneranor();

const kpp2 = new GeneratorItem('КПП', 'kpp2', "КПП крупнейшего налогоплательщика", "крупнейшего налог-ка");
kpp2.prepareGeneranor();

const kpp3 = new GeneratorItem('КПП', 'kpp3', "КПП с латинскими символами", "с латинскими символами");
kpp3.prepareGeneranor();

const ogrn = new GeneratorItem('ОГРН', 'ogrn', "ОГРН (13 символов)");
ogrn.prepareGeneranor();

const innfl = new GeneratorItem('ИНН ИП/ФЛ', 'innfl', "ИНН ИП и физлица (12 символов)");
innfl.prepareGeneranor();

const snils1 = new GeneratorItem('СНИЛС', 'snils1', "СНИЛС с разделителями", "с разделителями");
snils1.prepareGeneranor();

const snils2 = new GeneratorItem('СНИЛС', 'snils2', "СНИЛС без разделителей", "без разделителей");
snils2.prepareGeneranor();

const ogrnip = new GeneratorItem('ОГРНИП', 'ogrnip', "ОГРНИП (15 символов)");
ogrnip.prepareGeneranor();

const uuid = new GeneratorItem('UUID', 'uuid', "UUID");
uuid.prepareGeneranor();

const bin = new GeneratorItem('БИН', 'bin', "Аналог ИНН организации в Казахстане");
bin.prepareGeneranor();

const iin = new GeneratorItem('ИИН', 'iin', "Аналог ИНН физлица в Казахстане");
iin.prepareGeneranor();

const unp = new GeneratorItem('УНП', 'unp', "Учётный номер плательщика РБ");
unp.prepareGeneranor();

const unn = new GeneratorItem('УУН', 'uun', "Универсальный учетный номер налог-ка");
unn.prepareGeneranor();


// для кнопок "Сгенерировать все" и "Сбросить все" отлавливаем события клика и выполняем генерацию и валидацию генераторов из generateItems
const generateItems = [innul, kpp1, kpp2, kpp3, ogrn, innfl, snils1, snils2, ogrnip, uuid, bin, iin, unn, unp];
const generateAllBtn = document.getElementById("generateAllBtn");
generateItems.forEach(item => generateAllBtn.addEventListener('click', () => {
    item.setNewValue();
    item.setValueCounter = 0;
    item.setValidation();
}));
const deleteAllBtn = document.getElementById("deleteAllBtn");
generateItems.forEach(item => deleteAllBtn.addEventListener('click', () => {
    item.setEmptyValue();
    item.setValidation();
}));