import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
// TypeScript natively resolves JSON imports into an array of typed objects
import testData from './sauceData.json';


// Iterate through the data matrix matrix rows dynamically
for(const data of testData)
{
// We parameterize the test title using backticks to ensure reporting uniqueness
test(`[${data.scenarioId}]-E2E execution - ${data.description}`,async ({page})=>{

 // Initialize Page Object Model wrappers
 const loginPage= new LoginPage(page);
 const inventoryPage = new InventoryPage(page);
 const checkoutPage = new CheckoutPage(page);

  await test.step('1. Navigate to landing storefront', async () => {
      await loginPage.navigate();
    });

   await test.step(`2. Attempt login authentication with user profile:${data.username}`,async ()=>{
          await loginPage.login(data.username,data.password);

   });


       // Branching conditional test execution path logic derived straight from the JSON parameters
    if (data.shouldSucceed) {

        await test.step('3. Process dynamic product catalog addition to cart layout', async () => {
        await expect(page).toHaveURL(/inventory/);
        await inventoryPage.sortProducts('hilo');
        await inventoryPage.addItemtoCart('Sauce Labs Fleece Jacket');
        await inventoryPage.navigateToCart();
      });

        await test.step('4. Dispatch checkout workflow registration', async () => {
        await checkoutPage.startCheckout();
        await checkoutPage.fillInformation(data.firstName,data.lastName,data.zipCode);
        });

        await test.step('5. Finalize transaction clearance verification', async () => {
        await checkoutPage.completeOrder();
        await expect(checkoutPage.confirmationHeader).toHaveText('Thank you for your order!');
      });

    }
    else{
        await test.step('3. Alternate Error Condition Verification Track', async () => {
        // Assert that the user is kept locked inside the base landing login path
          await expect(page).toHaveURL('https://www.saucedemo.com/');
        
        // Assert that a clear structural authentication warning node triggers visibility
        const errorMessage=page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
    });
        
    }


});

}