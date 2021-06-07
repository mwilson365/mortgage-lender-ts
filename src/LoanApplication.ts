import {LoanStatus} from "./LoanStatus";
import MortgageLender from "./MortgageLender";

export default class LoanApplication extends MortgageLender {
    loanStatus: LoanStatus;
    loanAmount: number; 
    dti: number;
    creditScore: number;
    savings: number;
    constructor(_loanAmount: number,_dti: number, _creditScore: number,_savings: number  ){
    super();
    this.loanAmount = _loanAmount;
    this.dti =_dti;
    this.creditScore = _creditScore;
    this.savings = _savings;
    }
    
    
    
    isApproved(){
        if( this.loanStatus === LoanStatus.Accepted){
            return true;
        } else{
            return false;
        }

    }


    isQualified(){
        if ((this.loanAmount * 0.25) > this.savings) {
            return false;
        } else if (this.dti < 36) {
            return false; 
        } else if (this.creditScore < 620)  {
            return false;
        } else {
            return true;
        } 
            
        }  
}
