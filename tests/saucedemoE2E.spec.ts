import {test,expect} from '@playwright/test';
import { LoginPage} from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Complete an E2E E-Commerce checkout flow scenario',async ({page})=>{
 // Instantiate core Page objects
const loginPage=new LoginPage(page);
const inventoryPage= new InventoryPage(page);
const checkoutPage=new CheckoutPage(page);

await test.step('Given user is on SWag Lab Login page',async()=>{

    await loginPage.navigate();
});

await test.step('When they submit valid credentials',async()=>{
    await loginPage.login('standard_user', 'secret_sauce');
});

await test.step('And they sort the products by price and add a fleece jacket to cart',async()=>{
    await inventoryPage.sortProducts('hilo');//High to Low option
    await inventoryPage.addItemtoCart('Sauce Labs Fleece Jacket');
    await inventoryPage.navigateToCart();
});

await test.step('And they fill out the shipping registration info',async()=>{
    await checkoutPage.startCheckout();
    await checkoutPage.fillInformation("john","P","1234");
});

await test.step('Then they can submit the order and verify the completion alert screen',async()=>{
    await checkoutPage.completeOrder();
    await expect(checkoutPage.confirmationHeader).toHaveText('Thank you for your order!');
});

});
