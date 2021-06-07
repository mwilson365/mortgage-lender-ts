import LoanApplication from "./LoanApplication";
import  {LoanStatus} from "./LoanStatus";   //correct not assignable to typeof LoanStatus


export default class MortgageLender {
    constructor(){}
    availableFunds: number = 0;
    currentAmount: number = 0;
    total: number = 0;
    pendingFunds: number = 0;
    expectedFunds: number = 0;
    // loanStatus: LoanStatus;
    //private _availableFunds: number = 0;
    //set availableFunds (newVal: number){
     
    //this._availableFunds = newVal;
    //}
    
    //get availableFunds(){
    // return this._availableFunds;
//}
    
    addFunds(deposit: number){
        this.expectedFunds = this.availableFunds - this.currentAmount; 
        return this.availableFunds += deposit;
    }
    //  loanApp = new LoanApplication();

    approve(loanApp: LoanApplication){
        if (loanApp.loanAmount < this.availableFunds){
            loanApp.loanStatus = LoanStatus.Accepted;
        
        } else{
            loanApp.loanStatus = LoanStatus.Rejected;
        }
    }

    reviewApplication(loanApp: LoanApplication){
        if (loanApp.isQualified() === true){
            return `approved`;
        } else{
            return `denied`;
        }
    }
    
    sendOffer(loanApp: LoanApplication){
         
        loanApp.loanStatus = LoanStatus.Pending;
        this.pendingFunds = loanApp.loanAmount;
        this.availableFunds = this.expectedFunds;

    }
    acceptOffer(loanApp: LoanApplication){
         
        loanApp.loanStatus = LoanStatus.Accepted;
        this.pendingFunds -= loanApp.loanAmount;

    }
    
    releaseOffer(loanApp: LoanApplication){
         
        // loanApp.loanStatus = LoanStatus.Accepted;
        this.pendingFunds = 0;
        if (loanApp.loanStatus === LoanStatus.Rejected){
            this.availableFunds += loanApp.loanAmount;
        }

    }
    
    rejectOffer(loanApp: LoanApplication){
         
        loanApp.loanStatus = LoanStatus.Rejected;
        this.availableFunds += this.pendingFunds;

    }
    // pendingFunds() {
    //     this.pendFunds = this.loanApp.loanAmount;
    //     this.availableFunds = this.availableFunds - this.pendFunds;
    //}
}