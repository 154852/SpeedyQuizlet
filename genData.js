function __genCardData__(doc) {
    const terms = doc.getElementsByClassName('SetPageTerm-content');

    const data = {};

    for (const term of terms) {
        const key = term.children[0].querySelector('.TermText').innerText;
        const value = term.children[1].querySelector('.TermText').innerText;
        data[key] = value;
    }

    return JSON.stringify(data);
}

function fireEvent(element, name) {
    if (element != null) {
        if(element.fireEvent) {
            element.fireEvent('on' + name);     
        } else {   
            var evObj = document.createEvent('Events');
            evObj.initEvent(name, true, false);
            element.dispatchEvent(evObj);
        }
    }
}

function __play__(doc, data) {
    data = JSON.parse(data);
    console.log(data)

    try {
        const start = doc.getElementsByClassName('MatchModeInstructionsModal-button')[0].children[0];
        start.click();
    } catch {}

    const elements = doc.getElementsByClassName('MatchModeQuestionGridBoard-tiles')[0].children;
    const left = Array.prototype.slice.call(elements);
    const order = [];

    var index = 0;
    var callback = function() {
        order[index].setAttribute('style', 'display: none');
        index += 1;

        try {
            order[index].setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000');
            order[index].addEventListener('click', callback, true);
        } catch {}
    }

    for (var element of elements) {
        const string = element.getElementsByClassName('MatchModeQuestionGridTile-text')[0].innerText.trim();

        var value;

        for (const key in data) {
            if (key == string) {
                value = data[key];
                break;
            } else if (data[key] == string) {
                value = key;
                break;
            }
        }

        for (var element2 of left) {
            const string2 = element2.getElementsByClassName('MatchModeQuestionGridTile-text')[0].innerText.trim();

            if (string2 == value) {
                order.push(element);
                order.push(element2);

                if (order.length == 2) {
                    order[0].setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100%; height: 100%;; z-index: 10000')
                    order[0].addEventListener('click', callback, true);
                }
                
                left.splice(left.indexOf(element), 1);
                left.splice(left.indexOf(element2), 1);
            }
        }
    }
}

// {"uno":"one","dos":"two","tres":"three","cuatro":"four","cinco":"five","seis":"six","siete":"seven","ocho":"eight","nueve":"nine","diez":"ten","once":"eleven","doce":"twelve","trece":"thirteen","catorce":"fourteen","quince":"fifteen","dieciséis":"sixteen","diecisiete":"seventeen","dieciocho":"eighteen","diecinueve":"nineteen","veinte":"twenty","veintiuno":"twenty-one","veintidos":"twenty-two","veintitres":"twenty-three","veinticuatro":"twenty-four","veinticinco":"twenty-five","veintiseis":"twenty-six","veintisiete":"twenty-seven","veintiocho":"twenty-eight","veintinueve":"twenty-nine","treinta":"thirty","treinta y uno":"thirty-one","treinta y dos":"thirty-two","treinta y tres":"thirty-three","treinta y cuatro":"thirty-four","treinta y cinco":"thirty-five","treinta y seis":"thirty-six","treinta y siete":"thirty-seven","treinta y ocho":"thirty-eight","treinta y nueve":"thirty-nine","cuarenta":"forty","cuarenta y uno":"forty-one","cuarenta y dos":"forty-two","cuarenta y tres":"forty-three","cuarenta y cuatro":"forty-four","cuarenta y cinco":"forty-five","cuarenta y seis":"forty-six","cuarenta y siete":"forty-seven","cuarenta y ocho":"forty-eight","cuarenta y nueve":"forty-nine","cincuenta":"fifty","cincuenta y uno":"fifty-one","cincuenta y dos":"fifty-two","cincuenta y tres":"fifty-three","cincuenta y cuatro":"fifty-four","cincuenta y cinco":"fifty-five","cincuenta y seis":"fifty-six","cincuenta y siete":"fifty-seven","cincuenta y ocho":"fifty-eight","cincuenta y nueve":"fifty-nine","sesenta":"sixty","sesenta y uno":"sixty-one","sesenta y dos":"sixty-two","sesenta y tres":"sixty-three","sesenta y cuatro":"sixty-four","sesenta y cinco":"sixty-five","sesenta y seis":"sixty-six","sesenta y siete":"sixty-seven","sesenta y ocho":"sixty-eight","sesenta y nueve":"sixty-nine","setenta":"seventy","setenta y uno":"seventy-one","setenta y dos":"seventy-two","setenta y tres":"seventy-three","setenta y cuatro":"seventy-four","setenta y cinco":"seventy-five","setenta y seis":"seventy-six","setenta y siete":"seventy-seven","setenta y ocho":"seventy-eight","setenta y nueve":"seventy-nine","ochenta":"eighty","ochenta y uno":"eighty-one","ochenta y dos":"eighty-two","ochenta y tres":"eighty-three","ochenta y cuatro":"eighty-four","ochenta y cinco":"eighty-five","ochenta y seis":"eighty-six","ochenta y siete":"eighty-seven","ochenta y ocho":"eighty-eight","ochenta y nueve":"eighty-nine","noventa":"ninety","noventa y uno":"ninety-one","noventa y dos":"ninety-two","noventa y tres":"ninety-three","noventa y cuatro":"ninety-four","noventa y cinco":"ninety-five","noventa y seis":"ninety-six","noventa y siete":"ninety-seven","noventa y ocho":"ninety-eight","noventa y nueve":"ninety-nine","cien":"one-hundred"}