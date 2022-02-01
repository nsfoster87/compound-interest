document.addEventListener('DOMContentLoaded', () => {
    function calculateAndPrintTotal(e) {
        e.preventDefault();

        const depositAmount = Number(document.getElementById('deposit-amount').value);
        const interestRate = Number(document.getElementById('interest-rate').value);
        const timeFrame = Number(document.getElementById('time-frame').value);
        const timeFrameInDays = timeFrame * 7;

        let total = 0;
        let totalNoInterest = 0;
        for (let i = 0; i < timeFrameInDays; i++) {
            if (i % 7 == 0) {
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
})