import MortgageLender from "../src/MortgageLender";
import LoanApplication from "../src/LoanApplication";
import {LoanStatus} from "../src/LoanStatus";

describe('Mortgage Lender', () => {
    let lender: MortgageLender;

    beforeEach(() => {
        lender = new MortgageLender();
    })

    test('should check available funds', ()=> {
        expect(lender.availableFunds).toEqual(0);
    });

    test('should add money to available funds', ()=> {
        lender.addFunds(100000);
        expect(lender.availableFunds).toEqual(100000);
        lender.addFunds(50000);
        expect(lender.availableFunds).toEqual(150000)
    });

    test('should deny application when available funds too low', ()=> {
        lender.addFunds(100000);
        let loanApp = createLoanApplication();
        lender.approve(loanApp);
        expect(lender.availableFunds).toBeLessThan(loanApp.loanAmount);
        expect(loanApp.isApproved()).toBeFalsy();
    });

    test('should approve application when funds are available', ()=> {
        lender.addFunds(200000);
        let loanApp = createLoanApplication();
        lender.approve(loanApp);
        expect(lender.availableFunds).toBeGreaterThanOrEqual(loanApp.loanAmount);
        expect(loanApp.isApproved()).toBeTruthy();
    });

    test('should mark as unqualified applications with DTI < 36%', ()=> {
        lender.addFunds(300000);
        let loanApp = createLoanApplication(125000, 36)
        lender.reviewApplication(loanApp);
        expect(loanApp.isQualified).toBeFalsy();
    });

    test('should mark as unqualified applications credit score < 620', ()=> {
        lender.addFunds(300000);
        let loanApp = createLoanApplication();
        loanApp.creditScore = 600;
        lender.reviewApplication(loanApp);
        expect(loanApp.isQualified).toBeFalsy();
    });

    test('should mark as unqualified applications savings < 25% of loan', ()=> {
        lender.addFunds(300000);
        let loanApp = createLoanApplication();
        loanApp.savings = 10000;
        lender.reviewApplication(loanApp);
        expect(loanApp.isQualified).toBeFalsy();
    });

    test('should mark as qualified fully qualified applications', ()=> {
        lender.addFunds(300000);
        let loanApp = createLoanApplication();
        lender.reviewApplication(loanApp);
        expect(loanApp.isQualified).toBeTruthy();
    });

    test('should send loan offer to qualified applicants', ()=> {
        lender.addFunds(300000);
        let loanApp = createLoanApplication();
        let expectedFunds = lender.availableFunds - loanApp.loanAmount;

        lender.sendOffer(loanApp);

        expect(loanApp.loanStatus).toEqual(LoanStatus.Pending);
        expect(lender.pendingFunds).toEqual(loanApp.loanAmount);
        expect(lender.availableFunds).toEqual(expectedFunds);
    })

    test('should send pending funds for accepted offers', ()=> {
        let loanApp = createLoanApplication();
        loanApp.loanStatus = LoanStatus.Accepted;
        lender.pendingFunds = loanApp.loanAmount;
        lender.releaseOffer(loanApp);
        expect(lender.pendingFunds).toEqual(0);
    });

    test('should restore pending funds for rejected offers', ()=> {
        let loanApp = createLoanApplication();
        loanApp.loanStatus = LoanStatus.Rejected;
        lender.pendingFunds = loanApp.loanAmount;
        lender.releaseOffer(loanApp);
        expect(lender.pendingFunds).toEqual(0);
        expect(lender.availableFunds).toEqual(loanApp.loanAmount);
    });
})

function createLoanApplication(loanAmount: number = 125000,
                               dti: number = 35,
                               creditScore: number = 650,
                               savings: number = 50000) {
    return new LoanApplication(loanAmount, dti, creditScore, savings)
}
