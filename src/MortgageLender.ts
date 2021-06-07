import LoanApplication from "./LoanApplication";

export default class MortgageLender {
    constructor(){}
    availableFunds: number = 0;
    currentAmount: number = 0;
    total: number = 0;
    
    addFunds(deposit: number){
        return this.total = this.currentAmount + deposit;
    }
     loanApp = new LoanApplication();
    approve(loanApp: LoanApplication){
        if (loanApp.loanAmount > this.availableFunds) {
            return `denied`
        } else {
            return `approved`
        }
    }
    

    
    ;
}