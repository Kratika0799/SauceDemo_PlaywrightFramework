import {Page,Locator} from '@playwright/test'

export class CheckoutPage{
    private readonly page:Page;
    private readonly checkoutButton:Locator;
     private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton: Locator;
  public readonly confirmationHeader: Locator;

constructor(page:Page)
{
    this.page=page;
    this.checkoutButton=page.getByRole('button',{name:'checkout'});
    this.firstNameInput=page.locator('#first-name');
    this.lastNameInput=page.locator('#last-name');
    this.postalCodeInput=page.locator('[data-test="postalCode"]')
    this.checkoutButton=page.getByRole('button',{name:'checkout'});
    this.continueButton=page.getByRole('button',{name:'continue'});
    this.finishButton=page.getByRole('button',{name:'finish'});
    this.confirmationHeader=page.locator('[data-test="complete-header"]');

}
async startCheckout(){
    await this.checkoutButton.click();
}

async fillInformation(first:string,last:string,postal:string)
{
    await this.firstNameInput.fill(first);
    await this.lastNameInput.fill(last);
    await this.postalCodeInput.fill(postal);
    await this.continueButton.click();
}
async completeOrder(){
    await this.finishButton.click();
}
}
