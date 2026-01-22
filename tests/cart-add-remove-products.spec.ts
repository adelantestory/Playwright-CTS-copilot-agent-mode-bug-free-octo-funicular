import { test, expect } from '@playwright/test';

/**
 * Test: Add and Remove Products from Shopping Cart
 * 
 * Scenario:
 * 1. Navigate to the app
 * 2. Pick two products randomly
 * 3. Add 2 of each product to cart
 * 4. Go to cart and ensure they exist
 * 5. Delete both products from the cart
 */

test.describe('Shopping Cart - Add and Remove Products', () => {
  test('should add two products with quantity 2 each and then remove them from cart', async ({ page }) => {
    // Step 1: Navigate to the application
    await page.goto('http://localhost:5137');
    await expect(page).toHaveTitle(/OctoCAT Supplies/);

    // Verify cart starts with 0 items
    await expect(page.getByRole('link', { name: /Shopping cart with 0 items/ })).toBeVisible();

    // Step 2: Navigate to Products page
    await page.getByRole('link', { name: 'Products' }).click();
    await expect(page).toHaveURL(/\/products/);
    await expect(page.getByRole('heading', { name: 'Products', level: 1 })).toBeVisible();

    // Step 3: Add 2 CatFlix Entertainment Portal to cart
    // Increase quantity to 1
    await page.getByRole('button', { name: 'Increase quantity of CatFlix Entertainment Portal' }).click();
    await expect(page.getByLabel('Quantity of CatFlix Entertainment Portal', { exact: true })).toHaveText('1');

    // Increase quantity to 2
    await page.getByRole('button', { name: 'Increase quantity of CatFlix Entertainment Portal' }).click();
    await expect(page.getByLabel('Quantity of CatFlix Entertainment Portal', { exact: true })).toHaveText('2');

    // Add to cart
    await page.getByRole('button', { name: 'Add 2 CatFlix Entertainment Portal to cart' }).click();

    // Verify cart shows 2 items
    await expect(page.getByRole('link', { name: /Shopping cart with 2 items/ })).toBeVisible();

    // Step 4: Add 2 WhiskerCam Pro to cart
    // Increase quantity to 1
    await page.getByRole('button', { name: 'Increase quantity of WhiskerCam Pro' }).click();
    await expect(page.getByLabel('Quantity of WhiskerCam Pro', { exact: true })).toHaveText('1');

    // Increase quantity to 2
    await page.getByRole('button', { name: 'Increase quantity of WhiskerCam Pro' }).click();
    await expect(page.getByLabel('Quantity of WhiskerCam Pro', { exact: true })).toHaveText('2');

    // Add to cart
    await page.getByRole('button', { name: 'Add 2 WhiskerCam Pro to cart' }).click();

    // Verify cart shows 4 items total
    await expect(page.getByRole('link', { name: /Shopping cart with 4 items/ })).toBeVisible();

    // Step 5: Navigate to cart page
    await page.getByRole('link', { name: /Shopping cart with 4 items/ }).click();
    await expect(page).toHaveURL(/\/cart/);

    // Step 6: Verify both products exist in cart
    await expect(page.getByRole('heading', { name: 'Shopping Cart(4 items)' })).toBeVisible();
    
    // Verify CatFlix Entertainment Portal is in cart with quantity 2
    await expect(page.getByRole('heading', { name: 'CatFlix Entertainment Portal', level: 3 })).toBeVisible();
    await expect(page.getByLabel('Quantity of CatFlix Entertainment Portal', { exact: true })).toHaveText('2');
    await expect(page.getByText('$179.98')).toBeVisible(); // 2 x $89.99

    // Verify WhiskerCam Pro is in cart with quantity 2
    await expect(page.getByRole('heading', { name: 'WhiskerCam Pro', level: 3 })).toBeVisible();
    await expect(page.getByLabel('Quantity of WhiskerCam Pro', { exact: true })).toHaveText('2');
    await expect(page.getByText('$254.98')).toBeVisible(); // 2 x $127.49 (with discount)

    // Verify order summary total
    await expect(page.getByRole('heading', { name: 'Order Summary' })).toBeVisible();
    await expect(page.getByText('$434.97')).toBeVisible(); // Total after discount

    // Step 7: Remove CatFlix Entertainment Portal from cart
    await page.getByRole('button', { name: 'Remove CatFlix Entertainment Portal from cart' }).click();

    // Verify cart now shows 2 items
    await expect(page.getByRole('link', { name: /Shopping cart with 2 items/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Shopping Cart(2 items)' })).toBeVisible();

    // Verify CatFlix is no longer in cart
    await expect(page.getByRole('heading', { name: 'CatFlix Entertainment Portal', level: 3 })).not.toBeVisible();

    // Verify WhiskerCam Pro is still in cart
    await expect(page.getByRole('heading', { name: 'WhiskerCam Pro', level: 3 })).toBeVisible();

    // Step 8: Remove WhiskerCam Pro from cart
    await page.getByRole('button', { name: 'Remove WhiskerCam Pro from cart' }).click();

    // Verify cart is now empty
    await expect(page.getByRole('link', { name: /Shopping cart with 0 items/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Shopping Cart', level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Your cart is empty' })).toBeVisible();
    await expect(page.getByText('Start adding some products to your cart!')).toBeVisible();

    // Verify both products are gone
    await expect(page.getByRole('heading', { name: 'CatFlix Entertainment Portal', level: 3 })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'WhiskerCam Pro', level: 3 })).not.toBeVisible();
  });
});
