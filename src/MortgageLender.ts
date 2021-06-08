import LoanApplication from "./LoanApplication";
import  {LoanStatus} from "./LoanStatus";  


export default class MortgageLender {
    constructor(){}
    availableFunds: number = 0;
    currentAmount: number = 0;
    total: number = 0;
    pendingFunds: number = 0;
    expectedFunds: number = 0;
    
    addFunds(deposit: number){
        this.expectedFunds = this.availableFunds - this.currentAmount; 
        return this.availableFunds += deposit;
    }

    approve(loanApp: LoanApplication){
        if (loanApp.loanAmount < this.availableFunds){
            loanApp.loanStatus = LoanStatus.Accepted;
        
        } else{
            loanApp.loanStatus = LoanStatus.Rejected;
        }
    }

    reviewApplication(loanApp: LoanApplication){
        if (
            loanApp.dti < 36 &&
            loanApp.creditScore > 620 &&
            loanApp.savings >= .25* loanApp.loanAmount
        ){
            loanApp.isQualified = true;

        } else {
            loanApp.isQualified = false;
        }
    }
    
    sendOffer(loanApp: LoanApplication){
         
        loanApp.loanStatus = LoanStatus.Pending;
        this.pendingFunds += loanApp.loanAmount;
        this.availableFunds -= loanApp.loanAmount;

    }
    acceptOffer(loanApp: LoanApplication){
         
        loanApp.loanStatus = LoanStatus.Accepted;
        this.pendingFunds -= loanApp.loanAmount;

    }
    
    releaseOffer(loanApp: LoanApplication){
        this.pendingFunds = 0;
        if (loanApp.loanStatus === LoanStatus.Rejected){
            this.availableFunds += loanApp.loanAmount;
        }

    }
    
    rejectOffer(loanApp: LoanApplication){
         
        loanApp.loanStatus = LoanStatus.Rejected;
        this.availableFunds += this.pendingFunds;

    }
}