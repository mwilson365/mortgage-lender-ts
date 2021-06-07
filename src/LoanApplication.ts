export default class LoanApplication {
    loanAmount: number = 0;
    dti: number = 0;
    creditScore: number = 0;
    savings: number = 0;

    //loanApp[0] is Loan Amount
    //LoanApp[1] is DTI
    //LoanApp[2] is Credit Score
    //LoanApp[3] is Savings Amount
    isApproved(){
        if( this.loanAmount > this.savings){
            return false;
        } else{
            return true;
        }
        

    }


    isQualified(loanApp: number[]){
        if ((loanApp[0] * 0.25) > loanApp[3]) {
            return false;
        } else if (loanApp[1] > 0.36) {
            return false; 
        } else if (loanApp[2] < 620)  {
            return false;
        } else {
            return true;
        } 
            
        }
}