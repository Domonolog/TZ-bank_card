// Field transfer
function handleValueChangeNumber() {
    var y = document.getElementById('card-number').value;
    var x = document.getElementById('text-card-number');
    x.innerHTML = y.replace(/(.{4})/g, '$1 ').replace((/\D+/g), ' ');
}

function handleValueChangeName() {
    var y = document.getElementById('card-name').value;
    var x = document.getElementById('text-card-name');
    x.innerHTML = y;
}

function handleValueChangeMonth() {
    var y = document.getElementById('card-month').value;
    var x = document.getElementById('text-card-month');
    x.innerHTML = y.replace(/\D+/g,"").replace(/^(\d)$/, "0$1");
}

function handleValueChangeYear() {
    var y = document.getElementById('card-year').value;
    var x = document.getElementById('text-card-year');
    x.innerHTML = y.replace(/\D+/g,"").replace(/^.{2}/, '');
}

// Field limit
let ccNumberInput = document.querySelector( '#card-number' ),
    ccNumberPattern = /^\d{0,16}$/g,
    ccNumberSeparator = "",
    ccNumberInputOldValue,
    ccNumberInputOldCursor,

    ccExpiryInput = document.querySelector( '#card-cvv' ),
    ccExpiryPattern = /^\d{0,3}$/g,
    ccExpirySeparator = "",
    ccExpiryInputOldValue,
    ccExpiryInputOldCursor,

    mask = ( value, limit, separator ) => {
        var output = [];
        for ( let i = 0; i < value.length; i++ ) {
            if ( i !== 0 && i % limit === 0 ) {
                output.push( separator );
            }

            output.push( value[ i ] );
        }

        return output.join( "" );
    },
    unmask = ( value ) => value.replace( /[^\d]/g, '' ),
    checkSeparator = ( position, interval ) => Math.floor( position / ( interval + 1 ) ),
    ccNumberInputKeyDownHandler = ( e ) => {
        let el = e.target;
        ccNumberInputOldValue = el.value;
        ccNumberInputOldCursor = el.selectionEnd;
    },
    ccNumberInputInputHandler = ( e ) => {
        let el = e.target,
            newValue = unmask( el.value ),
            newCursorPosition;

        if ( newValue.match( ccNumberPattern ) ) {
            newValue = mask( newValue, 4, ccNumberSeparator );

            newCursorPosition =
                ccNumberInputOldCursor - checkSeparator( ccNumberInputOldCursor, 4 ) +
                checkSeparator( ccNumberInputOldCursor + ( newValue.length - ccNumberInputOldValue.length ), 4 ) +
                ( unmask( newValue ).length - unmask( ccNumberInputOldValue ).length );

            el.value = ( newValue !== "" ) ? newValue : "";
        } else {
            el.value = ccNumberInputOldValue;
            newCursorPosition = ccNumberInputOldCursor;
        }

        el.setSelectionRange( newCursorPosition, newCursorPosition );
    },
    ccExpiryInputKeyDownHandler = ( e ) => {
        let el = e.target;
        ccExpiryInputOldValue = el.value;
        ccExpiryInputOldCursor = el.selectionEnd;
    },
    ccExpiryInputInputHandler = ( e ) => {
        let el = e.target,
            newValue = el.value;

        newValue = unmask( newValue );
        if ( newValue.match( ccExpiryPattern ) ) {
            newValue = mask( newValue, 1, ccExpirySeparator );
            el.value = newValue;
        } else {
            el.value = ccExpiryInputOldValue;
        }
    };

ccNumberInput.addEventListener( 'keydown', ccNumberInputKeyDownHandler );
ccNumberInput.addEventListener( 'input', ccNumberInputInputHandler );

ccExpiryInput.addEventListener( 'keydown', ccExpiryInputKeyDownHandler );
ccExpiryInput.addEventListener( 'input', ccExpiryInputInputHandler );

// Month and Year selects
const fallbackPicker = document.querySelector('.card__date');
const yearSelect = document.querySelector('#card-year');
const monthSelect = document.querySelector('#card-month');
fallbackPicker.style.display = 'none';

const changeinputYear = document.createElement('input');
const changeinputMonth = document.createElement('input');

if (changeinputYear.type === 'text') {
    fallbackPicker.style.display = 'block';
    populateYears();
}

if (changeinputMonth.type === 'text') {
    fallbackPicker.style.display = 'block';
    populateMonth();
}

function populateYears() {
    const date = new Date();
    const year = date.getFullYear();

    for (let i = 0; i <= 30; i++) {
        const sel = document.getElementById("card-year");
        const opt = document.createElement("option");
        opt.value = year + i;
        opt.text = year + i;
        sel.add(opt, null);
    }
}

function populateMonth() {
    for (let i = 1; i <= 12; i++) {
        const sel = document.getElementById("card-month");
        const opt = document.createElement("option");
        opt.value = i;
        opt.text = i;
        sel.add(opt, null);
    }
}