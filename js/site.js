function getValues() 
{
    //1. get user values from the page
    let inputLoanAmount = document.getElementById("inputLoanAmount").value;
    let inputPayments = document.getElementById("inputPayments").value;
    let inputRate = document.getElementById("inputRate").value;
    

    // parse for numbers
    inputLoanAmount = parseFloat(inputLoanAmount);
    inputPayments = parseFloat(inputPayments);
    inputRate = parseFloat(inputRate);
    
    // check numbers are integers
    if (Number.isInteger(inputLoanAmount)  && Number.isInteger(inputPayments) && Number.isInteger(inputRate)) {
      
        let loanObj = {};    

     /// calculate Load totals
     displayLoanTotals =  calcualteLoanTotals(inputLoanAmount,inputPayments,inputRate);


      /// calcualte loan amortization

    }else{
        alert("Please enter only numbers into the input boxes.")
    }

}

function calcualteLoanTotals(LoanAmount,Payments,Rate){


      let totalPrinciple = LoanAmount;
      let montlyCost = (LoanAmount)*(Rate/1200)/Math.pow(1-(1+Rate/1200),Payments);
      let totalInterest = (LoanAmount)*(Rate/1200)/(1-(1+Rate/1200)^Payments) - LoanAmount;
      let totalCost = montlyCost*Payments;


 return [totalPrinciple,totalInterest,totalCost,montlyCost];
}


function displayLoanTotals(totalPrinciple,totalInterest,totalCost,montlyCost){

    document.getElementById("totalPrinciple").innerHTML = totalPrinciple;
    document.getElementById("totalInterest").innerHTML = totalInterest;
    document.getElementById("totalCost").innerHTML = totalCost;
    document.getElementById("monthlyPayments").innerHTML = montlyCost;


}


function displayData(fbData){

    //get table body element from the page
    let tableBody = document.getElementById("results");

    //get the template row
    let templateRow = document.getElementById("fbTemplate");
 
    //clear the table 
    tableBody.innerHTML = "";


    for (let index = 0; index < fbData.length; index+=5) {
       
        let tableRow = document.importNode(templateRow.content,true);

        //grab use the tds put into array
        let rowCols = tableRow.querySelectorAll("td");

        rowCols[0].classList.add(fbData[index]);
        rowCols[0].textContent = fbData[index];

        rowCols[1].classList.add(fbData[index +1]);
        rowCols[1].textContent = fbData[index+1];

        rowCols[2].classList.add(fbData[index+2]);
        rowCols[2].textContent = fbData[index+2];

        rowCols[3].classList.add(fbData[index+3]);
        rowCols[3].textContent = fbData[index+3];

        rowCols[4].classList.add(fbData[index+4]);
        rowCols[4].textContent = fbData[index+4];

        tableBody.appendChild(tableRow);
    }

}