/* code author: Ivan Gashtilov: (u5500347) */

var amountIsHelpImage = true; //always reference this value when making amends to the amount
var timeIsHelpImage = true; //always reference this value when making amends to the period

function calculateLoan()
{
	resetAnswerValues();
	resetFormStyles();
	
	var inputLoanAmount = parseFloat(document.getElementById('loanAmount').value);
	inputLoanAmount = inputLoanAmount.toFixed(2);
	var inputTime = Math.round(document.getElementById('repaymentPeriod').value);
	
	document.getElementById('loanAmount').value = inputLoanAmount;
	document.getElementById('repaymentPeriod').value = inputTime;
	
	var loanAmountIsValid = validateLoan(inputLoanAmount);
	var timeIsValid = validateTime(inputTime);
	
	if(loanAmountIsValid && timeIsValid)
	{
		var interestRate = writeInterestRate(inputLoanAmount);
		interestRate = interestRate.toFixed(2);
		document.getElementById('interestRate').value = interestRate;
		
		var interestRepayment = writeInterestOnTheLoan(inputLoanAmount, interestRate, inputTime);
		interestRepayment = interestRepayment.toFixed(2);
		document.getElementById('interestPay').value = interestRepayment;
		
		var total = parseFloat(writeTotalAmount(inputLoanAmount, interestRepayment));
		total = total.toFixed(2);
		document.getElementById('totalPay').value = total;
		
		var monthlyRepayment = writeMonthlyRepayment(total, inputTime);
		monthlyRepayment = monthlyRepayment.toFixed(2);
		document.getElementById('monthlyPay').value = monthlyRepayment;
	}
	else
	{
		printErrors(loanAmountIsValid, timeIsValid);
	}
}

function writeInterestOnTheLoan(inputLoanAmountIn, interestRateIn, inputTimeIn)
{
	var interestRepaymentOut = ((interestRateIn/100) * inputLoanAmountIn) * inputTimeIn;
	return interestRepaymentOut;
}

function writeTotalAmount(inputLoanAmountIn, interestRepaymentIn)
{
	var totalOut = 0;
	if(document.getElementById('insurance').checked)
	{
		totalOut = (1 + 5 / 100) * inputLoanAmountIn;
	}
	else
	{
		totalOut  = inputLoanAmountIn;
	}
	totalOut = parseFloat(totalOut) + parseFloat(interestRepaymentIn);
	return totalOut;
}

function writeMonthlyRepayment(totalIn, inputTimeIn)
{
	var monthlyRepaymentOut = totalIn / (inputTimeIn * 12);
	return monthlyRepaymentOut;
}

function writeInterestRate(inputLoanAmountIn)
{
	var interestOut = -111; //some dummy number for validation purposes
	
	if(inputLoanAmountIn <= 10000)
	{
		interestOut = 9.75;
	}
	else if(inputLoanAmountIn <= 50000)
	{
		interestOut = 8.75;
	}
	else if(inputLoanAmountIn <= 100000)
	{
		interestOut = 7.75;
	}
	else
	{
		interestOut = 6.75;
	}
	return interestOut;
}

function addHelp1()
{
	if(!amountIsHelpImage)
	{
		resetWarningStyles();
	}
	else
	{
		resetHelpStyles();
	}
	document.getElementById('helpContent').innerHTML = '<p>Please enter the amount of the loan you would wish to receive.</p>';
	document.getElementById('helpContent').innerHTML += '<p>Please keep in mind that:</p>';
	document.getElementById('helpContent').innerHTML += '<ul><li>The default currency is set as pound sterling.</li><li>Any type of characters will not be accepted.</li><li>A full stop "." will be interpreted as decimal point.</li><li>Values with more than two decimal places will be rounded.</li><li>The minimum amount accepted is &pound1,000.00.</li><li>The maximum amount accepted is &pound1,000,000.00.</li></ul>';
}

function addHelp2()
{
	if(!timeIsHelpImage)
	{
		resetWarningStyles();
	}
	else
	{
		resetHelpStyles();
	}
	document.getElementById('helpContent').innerHTML = '<p>Please enter the repayment period.</p>';
	document.getElementById('helpContent').innerHTML += '<p>Please keep in mind that:</p>';
	document.getElementById('helpContent').innerHTML += '<ul><li>Year entered will be rounded. For example - year enetered as 4.7 will be converted into 5 years.</li><li>The minimum repayment period accepted is 1 year.</li><li>The maximum repayment period accepted is 25 years.</li></ul>';
}

function addHelp3()
{
	resetHelpStyles();
	document.getElementById('helpContent').innerHTML = '<p>Please choose whether you would wish to take an insurance protection for your loan  or not.</p>';
	document.getElementById('helpContent').innerHTML += '<p>Please keep in mind that:</p>';
	document.getElementById('helpContent').innerHTML += '<ul><li>If you leave this box checked, we will add the insurance protection for 5% of the total loan value before tax.</li><li>If you uncheck this box, the insurance protection will not be added.</li></ul>';
}

function addHelp4()
{
	resetHelpStyles();
	document.getElementById('helpContent').innerHTML = '<p>This is the interest rate for your loan.</p>';
	document.getElementById('helpContent').innerHTML += '<p>Please keep in mind that:</p>';
	document.getElementById('helpContent').innerHTML += '<ul><li>For amounts smaller or equalling to &pound10,000.00 but larger than &pound1,000.00 the interest rate will be 9.75%.</li><li>For amounts smaller or equalling to &pound50,000.00 but larger than &pound10,000.00 the interest rate will be 8.75%.</li><li>For amounts smaller or equalling to &pound100,000.00 but larger than &pound50,000.00 the interest rate will be 7.75%.</li><li>For amounts smaller or equalling to &pound1,000,000.00 but larger than &pound100,000.00 the interest rate will be 6.75%.</li></ul>';
}

function addHelp5()
{
	resetHelpStyles();
	document.getElementById('helpContent').innerHTML = '<p>This is the interest on the loan amount to be repaid.</p>';
	document.getElementById('helpContent').innerHTML += '<p>Please refer to the example below:</p>';
	document.getElementById('helpContent').innerHTML += '<ul><li>If a loan of &pound10,000.00 is taken over a 4 years period.</li><li>The interest rate will be 9.75% (Please refer to the previous help option to see the full table of interest rates).</li><li>It will be calculated as interest rate multiplied by the repayment period.</li><li>&pound975.00 multiplied by 4.</li><li>This means that the total interest payable will be &pound3,900.00.</li></ul>';
}

function addHelp6()
{
	resetHelpStyles();
	document.getElementById('helpContent').innerHTML = '<p>This is the full amount to be repaid for your loan.</p>';
	document.getElementById('helpContent').innerHTML += '<p>Please keep in mind that:</p>';
	document.getElementById('helpContent').innerHTML += '<ul><li>This is simply calculated as the loan amount plus the interest payable on the loan.</li><li>For more details on how the interest is calculated, please refer to the previous help option.</li><li>If you have chosen to take an insurance protection for your loan, 5% surcharge will be added to the loan amount before tax for this calculation.</li></ul>';
}

function addHelp7()
{
	resetHelpStyles();
	document.getElementById('helpContent').innerHTML = '<p>This is the monthly repayment for your loan.</p>';
	document.getElementById('helpContent').innerHTML += '<p>Please keep in mind that:</p>';
	document.getElementById('helpContent').innerHTML += '<ul><li>This is simply calculated as the loan amount plus the interest payable on the loan divided by the amount of months of the loan term</li><li>If you have chosen to take an insurance protection for your loan, 5% surcharge will be added to the loan amount before tax.</li><li>For more details on the whole calculation, please refer to the other help options on this page.</li></ul>';
}

function resetAnswerValues()
{
	resetHelpStyles();
	document.getElementById('interestRate').value = '';
	document.getElementById('interestPay').value = '';
	document.getElementById('totalPay').value = '';
	document.getElementById('monthlyPay').value = '';
}

function resetFormStyles()
{
	document.getElementById('helpContent').style.backgroundColor = '#fff';
	document.getElementById('helpWarning').src = "help.jpg";
	document.getElementById('helpContent').innerHTML = "<p>Click the help icons above to see help for the relevant fields";
	document.getElementById('helpAmount').src = 'help.jpg';
	document.getElementById('loanAmount').style.borderColor = '#888';
	document.getElementById('helpTime').src = 'help.jpg';
	document.getElementById('repaymentPeriod').style.borderColor = '#888';
	
	amountIsHelpImage = true;
	timeIsHelpImage = true;
}

function resetHelpStyles()
{
	document.getElementById('helpWarning').src = 'help.jpg';
	document.getElementById('helpContent').style.backgroundColor = '#fff';
}

function resetWarningStyles()
{
	document.getElementById('helpWarning').src = 'exclamation.png';
	document.getElementById('helpContent').style.backgroundColor = '#ffe5e5';
}

function validateLoan(inputLoanAmountIn)
{
	if(inputLoanAmountIn < 1000)
	{
		return false;
	}
	else if(inputLoanAmountIn > 1000000)
	{
		return false;
	}
	else if(isNaN(inputLoanAmountIn))
	{
		return false;
	}
	else
	{
		return true;
	}
}

function validateTime(inputTimeIn)
{
	if(inputTimeIn < 1)
	{
		return false;
	}
	else if(inputTimeIn > 25)
	{
		return false;
	}
	else if(isNaN(inputTimeIn))
	{
		return false;
	}
	else
	{
		return true;
	}
}

function printErrors(loanAmountIsValidIn, timeIsValidIn)
{
	document.getElementById('helpContent').style.backgroundColor = '#ffe5e5';
	document.getElementById('helpWarning').src = "exclamation.png";
	document.getElementById('helpContent').innerHTML = "<p>Oops! We have encountered problems with your form:</p>";
	if(!loanAmountIsValidIn)
	{
		document.getElementById('helpAmount').src = 'exclamation.png';
		document.getElementById('loanAmount').style.borderColor = '#f00';
		document.getElementById('helpContent').innerHTML += '<p><span>*  </span>You have entered a non-valid value for the loan amount</p>';
		amountIsHelpImage = false;
		if(isNaN(document.getElementById('loanAmount').value) || document.getElementById('loanAmount').value == 0)
		{
			document.getElementById('loanAmount').value = '';
		}
	}
	if(!timeIsValidIn)
	{
		document.getElementById('helpTime').src = 'exclamation.png';
		document.getElementById('repaymentPeriod').style.borderColor = '#f00';
		document.getElementById('helpContent').innerHTML += '<p><span>*  </span>You have entered a non-valid value for the repayment period</p>';
		timeIsHelpImage = false;
		if(isNaN(document.getElementById('repaymentPeriod').value) || document.getElementById('repaymentPeriod').value == 0)
		{
			document.getElementById('repaymentPeriod').value = '';
		}
	}
}