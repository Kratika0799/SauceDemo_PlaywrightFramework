import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import users from './testData.json'; //  Direct JSON Import

// Loop through each user dataset dynamically to generate independent test execution tracks
for (const user of users){//  Cast "users" to an array so the loop knows it is iterable

test(`E2E Checkout execution for Persona:${user.desc}`,async ({page})=>{

const loginPage= new LoginPage(page);

await loginPage.navigate();

// Inject the iterated JSON parameter variables smoothly into your POM methods
   await loginPage.login(user.username,user.password) 

  // Assert dashboard entry or target conditions matching the user type
 if(user.username!== 'locked_out_user'){
    await expect(page).toHaveURL(/inventory/);
 }
});

}

//Visual Regression Testing (Snapshot Matching)
test('Validate visual landing layout consistency', async ({ page }) => {
  await page.goto('https://saucedemo.com');
  
  // The first time you run this, Playwright captures a golden reference baseline image.
  // The second time, it compares the screen pixel-by-pixel against that baseline!
  await expect(page).toHaveScreenshot('login-page-baseline.png');
});