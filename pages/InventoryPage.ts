import {Page,Locator} from '@playwright/test';

export class InventoryPage{

    private readonly page:Page;
    private readonly productSortDropdown:Locator;
    private readonly cartIcon;

constructor(page:Page){
this.page=page;
this.productSortDropdown=page.locator('[data-test="product-sort-container"]');
this.cartIcon=page.locator('[data-test="shopping-cart-link"]');
}

async navigateToCart(){
    await this.cartIcon.click();
}
async sortProducts(optionValue:string)
{
    await this.productSortDropdown.selectOption(optionValue);
}

async addItemtoCart(productName:string)
{
    // Dynamic Grid tracking: Filters out rows to isolate our specific item card
    const productCart=this.page.locator('.inventory_item').filter({hasText:productName});
    await productCart.locator('button').click();
}

}

