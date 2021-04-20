let paymentDS = {
    payments: [],
    summary: {}
};;

function calculateLoan() {

    let term = 0;
    let interest = 0;
    let totalInterest = 0;
    let remainingBalance = 0;
    let interestPayment = 0;
    let principalPayment = 0;
    let rate = 0;
    //let years = 0;
    // getting values from the user

    //Getting the loan amount
    let loanAmount = +document.getElementById("loanAmount").value;
    let years = +document.getElementById("years").value;
    let loanRate = +document.getElementById("interestRate").value;


    //converts years to months
    let loanTerm = years * 12;
    monthlyPayment = calcPayment(loanAmount, loanRate, loanTerm);
    remainingBalance = loanAmount

    for (let i = 1; i <= loanTerm; i++) {
        interestPayment = calcInterest(remainingBalance, loanRate);
        principalPayment = monthlyPayment - interestPayment;
        totalInterest = totalInterest + (monthlyPayment - principalPayment);
        remainingBalance -= principalPayment;
        addPayment(i, monthlyPayment, principalPayment, interestPayment, totalInterest, remainingBalance);
    }


    let summary = {
        payment: monthlyPayment,
        totalPrincipal: loanAmount,
        totalInterest: totalInterest,
        totalCost: (loanAmount + totalInterest)
    };

    paymentDS.summary = summary;


    displayInfo(paymentDS, monthlyPayment, totalInterest, loanAmount)
}

//Calculate the payment for the loan
function calcPayment(amount, rate, term) {
    return amount * (rate / 1200) / (1 - Math.pow((1 + rate / 1200), (-term)));
}

//calculate the interst for the current balance of the loan
function calcInterest(balance, rate) {
    return (balance * (rate / 1200));
}


function addPayment(rate, monthlyPayment, principalPayment, interestPayment, totalInterest, balance) {
    let obj = {};
    obj["term"] = rate;
    obj["payment"] = monthlyPayment;
    obj["principal"] = principalPayment;
    obj["interest"] = interestPayment;
    obj["totalInterest"] = totalInterest;
    obj["balance"] = balance;

    paymentDS.payments.push(obj);

}


function displayInfo(paymentDS, monthlyPayment, totalInterest, loanAmount) {

    const template = document.getElementById("Data-template");
    const resultsBody = document.getElementById("resultsBody");

    //clear the table
    resultsBody.innerHTML = "";

    for (let i = 0; i < paymentDS.payments.length; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("month").textContent = paymentDS.payments[i].term;
        //dataRow.getElementById("payment").textContent = (Math.round(Number(payments[i].payment) * 100) / 100).toFixed(2);
        dataRow.getElementById("payment").textContent = paymentDS.payments[i].payment.toLocaleString(
            'en-US', {
                style: 'currency',
                currency: 'USD',
            }
        );

        dataRow.getElementById("principal").textContent = paymentDS.payments[i].principal.toLocaleString(
            'en-US', {
                style: 'currency',
                currency: 'USD',
            }
        );

        dataRow.getElementById("interest").textContent = paymentDS.payments[i].interest.toLocaleString(
            'en-US', {
                style: 'currency',
                currency: 'USD',
            }
        );

        dataRow.getElementById("totalInterest").textContent = paymentDS.payments[i].totalInterest.toLocaleString(
            'en-US', {
                style: 'currency',
                currency: 'USD',
            }
        );

        dataRow.getElementById("balance").textContent = paymentDS.payments[i].balance.toLocaleString(
            'en-US', {
                style: 'currency',
                currency: 'USD',
            }
        );

        resultsBody.appendChild(dataRow);
    }


    //total interest is in the last row of the payments array.
    let displayTotalInterest = paymentDS.summary.totalInterest;
    let displayPayment = paymentDS.summary.payment;
    let displayLoanAmount = paymentDS.summary.totalPrincipal;
    let displaytotalCost = paymentDS.summary.totalCost;

    document.getElementById("monthlyPayment").innerHTML = displayPayment.toLocaleString(
        'en-US', {
            style: 'currency',
            currency: 'USD',
        }
    );
    //   document.getElementById("totalPrincipal").innerHTML = "$" + (Math.round(loanAmount * 100) / 100).toFixed(2);
    document.getElementById("totalPrincipal").innerHTML = displayLoanAmount.toLocaleString(
        'en-US', {
            style: 'currency',
            currency: 'USD',
        }
    );
    document.getElementById("totalInterest").innerHTML = displayTotalInterest.toLocaleString(
        'en-US', {
            style: 'currency',
            currency: 'USD',
        }
    );

    document.getElementById("totalCost").innerHTML = displaytotalCost.toLocaleString(
        'en-US', {
            style: 'currency',
            currency: 'USD',
        }
    );


}




// Form Validation - Is every field a number greater than 0?
function validateForm() {
    let loanAmount = +document.getElementById("loanAmount").value;
    let years = +document.getElementById("years").value;
    let loanRate = +document.getElementById("interestRate").value;

    let isValid = [loanAmount, years, loanRate].every((field) => field > 0);

    return isValid;
}