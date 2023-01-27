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
     loanObj =  calcualteLoanTotals(inputLoanAmount,inputPayments,inputRate);
     
     //display loan totals
     displayLoanTotals(loanObj);



      /// calcualte loan amortization

    }else{
        alert("Please enter only numbers into the input boxes.")
    }

}

function calcualteLoanTotals(LoanAmount,Payments,Rate){

     let returnObj = {};

      let totalPrinciple = LoanAmount;
      let montlyCost = (LoanAmount)*(Rate/1200)/(1-Math.pow((1+Rate/1200),-Payments));
      let totalCost = montlyCost*Payments;
      let totalInterest = totalCost-LoanAmount;

    totalPrinciple = totalPrinciple.toFixed(2);
    montlyCost = montlyCost.toFixed(2);
    totalCost = totalCost.toFixed(2);
    totalInterest = totalInterest.toFixed(2);

     returnObj.TP = totalPrinciple;
     returnObj.MC = montlyCost;
     returnObj.TC = totalCost;
     returnObj.TI = totalInterest;

 return returnObj;
}



  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });


function displayLoanTotals(totalLoadInfo){

    

    document.getElementById("totalPrinciple").innerHTML = formatter.format(totalLoadInfo.TP);
    document.getElementById("totalInterest").innerHTML = formatter.format(totalLoadInfo.TI);
    document.getElementById("totalCost").innerHTML = formatter.format(totalLoadInfo.TC);
    document.getElementById("monthlyPayments").innerHTML = formatter.format(totalLoadInfo.MC);

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