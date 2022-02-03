document.addEventListener('DOMContentLoaded', () => {

    const depositIntervals = {
        'Daily': 1,
        'Weekly': 7,
        'Monthly': 30,
        'Yearly': 365,
    };
    const timeFrameIntervals = {
        'Days': 1,
        'Weeks': 7,
        'Months': 30.5,
        'Years': 365,
    }
    let chosenDepositInterval = 'Monthly';
    let timeFrameInterval = document.getElementById('time-frame-dropdown-header').textContent.trim();
    let dropdownHeader = document.getElementById('dropdown-header');
    let timeFrameHeader = document.getElementById('time-frame-dropdown-header');

    function calculateAndPrintTotal(e) {
        e.preventDefault();

        const startingValue = Number(document.getElementById('starting-amount').value);
        const depositAmount = Number(document.getElementById('deposit-amount').value);
        const interestRate = Number(document.getElementById('interest-rate').value) / 100;
        const timeFrame = Number(document.getElementById('time-frame').value);
        const timeFrameInDays = timeFrame * timeFrameIntervals[timeFrameInterval];

        let total = startingValue;
        let totalNoInterest = startingValue;
        for (let i = 0; i < timeFrameInDays; i++) {
            if (i % depositIntervals[chosenDepositInterval] == 0) {
                total += depositAmount;
                totalNoInterest += depositAmount;
                console.log(`Day ${i}: ${depositAmount} deposited`);
            }
            let interest = total * interestRate / 365;
            console.log(`Day ${i}: ${total} + ${interest} = ${total + interest}`);
            total += interest;
        }
        let interestEarned = total - totalNoInterest;

        let answerDiv = document.getElementById('answer');
        if (answerDiv.childElementCount != 0) {
            answerDiv.innerHTML = "";
        }

        let answerEl = document.createElement('p');
        let answerText = document.createTextNode('Total: $' + total.toFixed(2));
        answerEl.appendChild(answerText);
        answerDiv.appendChild(answerEl);

        let noInterestEl = document.createElement('p');
        let noInterestText = document.createTextNode('Without Compound Interest: $' + totalNoInterest.toFixed(2));
        noInterestEl.appendChild(noInterestText);
        answerDiv.appendChild(noInterestEl);

        let interestEl = document.createElement('p');
        let interestText = document.createTextNode('Interest Earned: $' + interestEarned.toFixed(2));
        interestEl.appendChild(interestText);
        answerDiv.appendChild(interestEl);
    }

    document.getElementById('form').addEventListener('submit', function (e) {
        calculateAndPrintTotal(e);
    });

    document.getElementById('deposit-amount').addEventListener('keyup', function (e) {
        let intervalDropdown = document.getElementById('deposit-interval');
        if (e.target.value == "") {
            intervalDropdown.hidden = true;
            // dropdownHeader.innerHTML = "Deposit Interval <span class='caret'></span>";
        } else {
            intervalDropdown.hidden = false;
        }
    });

    document.getElementById('dropdown-menu').addEventListener('click', function (e) {
        let interval = e.target.textContent;
        dropdownHeader.innerHTML = interval + ' <span class="caret"></span>';
        chosenDepositInterval = interval;
    });

    document.getElementById('time-frame-dropdown-menu').addEventListener('click', function (e) {
        let interval = e.target.textContent;
        timeFrameHeader.innerHTML = interval + ' <span class="caret"></span>';
        timeFrameInterval = interval;
    });

})