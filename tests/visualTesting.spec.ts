import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


test.describe('Visual Quality Assurance Suite',async()=>{

test('Validate visual landing page conistency against golden baseline',async({page})=>{

const loginPage=new LoginPage(page);

// 1. Navigate to the storefront landing zone
await loginPage.navigate();

    // 2. Perform a pixel-perfect snapshot match assertion of the entire webpage view
    // Playwright automatically generates the reference image if it does not exist yet.
  await expect(page).toHaveScreenshot('login-page-baseline.png', { timeout: 15000 });
});

test('Visual individual component snapshot validation',async({page})=>{

const loginPage=new LoginPage(page);
await loginPage.navigate();

// You can scope visual checks to singular, isolated HTML components instead of the full screen
const loginButton=page.getByRole('button',{name:'Login'});
await expect(loginButton).toHaveScreenshot('login-button-baseline.png');
});



});