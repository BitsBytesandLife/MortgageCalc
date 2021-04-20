function fireSwal() {
    let timerInterval
    Swal.fire({
        title: 'Calculating Loan!',
        html: '<p>Your loan is being crunched</p>',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                    const b = content.querySelector('b')
                    if (b) {
                        b.textContent = Swal.getTimerLeft()
                    }
                }
            }, 50)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })
}

function errorAlert(errorMessage) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: `<ol>${errorMessage}</ol>`,
    })
}

function inputCheck(loanAmount, term, rate) {
    let errorMessage = "";

    if (loanAmount == 0) {
        errorMessage += `<li>Please enter a non-zero number for Loan Amount</li>`;
    };
    if (isNaN(rate)) {
        errorMessage += `<li>Please enter a non-zero number for Rate</li>`;
    };
    if (isNaN(term)) {
        errorMessage += `<li>Please enter a non-zero number for Term</li>`;
    }
    if (errorMessage != "") {
        errorAlert(errorMessage);
        return false;
    }

    return true;
}