let payments = [];

function calculateLoan() {

    payments = [];
    //let loanAmount = 0;
    let term = 0;
    let interest = 0;
    let monthlyPayment = 0;
    let totalInterest = 0;
    let remainingBalance = 0;
    let interestPayment = 0;
    let principalPayment = 0;
    let monthlyPaymentSubPrincipalPayment = 0;
    let rate = 0;
    //let years = 0;
    // getting values from the user

    //Getting the loan amount
    let loanAmount = +document.getElementById("loanAmount").value;
    let years = +document.getElementById("years").value;
    let loanRate = +document.getElementById("interestRate").value;


    //converts years to months
    let loanTerm = years * 12;
    monthlyPayment = loanAmount * (loanRate / 1200) / (1 - Math.pow((1 + loanRate / 1200), (-loanTerm)));
    //monthlyPayment = loanAmount * (loanRate / 1200) / (1 - (1 + loanRate / 12) ** (0 - loanTerm));
    remainingBalance = loanAmount

    for (let i = 1; i <= loanTerm; i++) {
        interestPayment = (remainingBalance * (loanRate / 1200));
        principalPayment = monthlyPayment - interestPayment;
        totalInterest = totalInterest + (monthlyPayment - principalPayment);
        remainingBalance -= principalPayment;
        //rate++;
        addToArray(i, monthlyPayment, principalPayment, interestPayment, totalInterest, remainingBalance);
    }

    displayInfo(payments, monthlyPayment, totalInterest, loanAmount)
}


function addToArray(rate, monthlyPayment, principalPayment, interestPayment, totalInterest, balance) {
    let obj = {};
    obj["term"] = rate;
    obj["payment"] = monthlyPayment;
    obj["principal"] = principalPayment;
    obj["interest"] = interestPayment;
    obj["totalInterest"] = totalInterest;
    obj["balance"] = balance;

    payments.push(obj);

}


function displayInfo(payments, monthlyPayment, totalInterest, loanAmount) {

    const template = document.getElementById("Data-template");
    const resultsBody = document.getElementById("resultsBody");

    //clear the table
    resultsBody.innerHTML = "";

    for (let i = 0; i < payments.length; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("month").textContent = payments[i].term;
        //dataRow.getElementById("payment").textContent = (Math.round(Number(payments[i].payment) * 100) / 100).toFixed(2);
        dataRow.getElementById("payment").textContent = payments[i].payment.toLocaleString(
            'en-US', {
                style: 'currency',
                currency: 'USD',
            }
        );

        dataRow.getElementById("principal").textContent = payments[i].principal.toLocaleString(
            'en-US', {
                style: 'currency',
                currency: 'USD',
            }
        );

        dataRow.getElementById("interest").textContent = payments[i].interest.toLocaleString(
            'en-US', {
                style: 'currency',
                currency: 'USD',
            }
        );

        dataRow.getElementById("totalInterest").textContent = payments[i].totalInterest.toLocaleString(
            'en-US', {
                style: 'currency',
                currency: 'USD',
            }
        );

        dataRow.getElementById("balance").textContent = payments[i].balance.toLocaleString(
            'en-US', {
                style: 'currency',
                currency: 'USD',
            }
        );

        resultsBody.appendChild(dataRow);
    }


    //document.getElementById("monthlyPayment").innerHTML = "$" + (Math.round(monthlyPayment * 100) / 100).toFixed(2);
    document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toLocaleString(
        'en-US', {
            style: 'currency',
            currency: 'USD',
        }
    );
    //   document.getElementById("totalPrincipal").innerHTML = "$" + (Math.round(loanAmount * 100) / 100).toFixed(2);
    document.getElementById("totalPrincipal").innerHTML = loanAmount.toLocaleString(
        'en-US', {
            style: 'currency',
            currency: 'USD',
        }
    );
    document.getElementById("totalInterest").innerHTML = totalInterest.toLocaleString(
        'en-US', {
            style: 'currency',
            currency: 'USD',
        }
    );

    document.getElementById("totalCost").innerHTML = (loanAmount + totalInterest).toLocaleString(
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