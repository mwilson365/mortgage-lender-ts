import {LoanStatus} from "./LoanStatus";
import MortgageLender from "./MortgageLender";

export default class LoanApplication extends MortgageLender {
    loanStatus: LoanStatus;
    loanAmount: number; 
    dti: number;
    creditScore: number;
    savings: number;
    isQualified: boolean = false;
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
}
