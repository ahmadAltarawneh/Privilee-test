import { test, expect } from '@playwright/test';




test('Click on Join Privilee today! and check the plan price', async ({ page }) => {
    await page.goto('/map', {waitUntil: "load"})
    await page.getByText('Join Privilee today!').click()
    await expect(page).toHaveURL(/.*signup/)
    await expect(page.getByText('Choose your plan')).toBeVisible()
    
    // this should be coming from a JSON file so it can be dynamic, I wrote it like this because I don't have enough data
    // if I select the 4||12 months I need to take the plan price and multiply it by the number of the months to get the payable amount
    await page.getByText('1 month').click()
    const planPrice = await page.locator(`//span[normalize-space()='1 month']/following-sibling::div/span`).textContent()
    const payableAmount = await page.locator(`//div[@id='card-component']/following-sibling::button`).textContent()
    const payableAmount1 = payableAmount?.split('Pay ')[1]
    // checking if the payable amount is equal to the plan we selected
    expect(payableAmount1).toEqual(planPrice)
    
    

});

test('Verify if the filter feature is visible and working', async ({ page }) => {
    await page.goto('/map', {waitUntil: "load"})
    await expect(page.getByRole('button', { name: 'Pool & beach' })).toHaveAttribute("selected")
    await expect(page.getByText('pool & beach venue')).toBeVisible()
    await page.getByRole('button', {name: 'Dining'}).click()
    await expect(page.getByText('dining discounts')).toBeVisible()
    await page.getByRole('button', {name: 'Filters'}).click()
    await expect(page.getByText('Filter your search')).toBeVisible()
    await page.getByText('Fine dining').click()
});

test('Performance test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await context.tracing.start({ screenshots: true, snapshots: true });
    await page.goto('/map');
    await page.waitForTimeout(5000);
    await context.tracing.stop({ path: 'trace.zip' });
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        loadTime: navigation.loadEventEnd - navigation.startTime,
        responseTime: navigation.responseEnd - navigation.startTime,
        domContentLoadedTime: navigation.domContentLoadedEventEnd - navigation.startTime
      };
    });
    console.log('Performance Metrics:', metrics)
  
    // checking if the performance metrics are within acceptable limits (it's better to add a global file wit hall the timeout "short, medium, long... etc")
    expect(metrics.loadTime).toBeLessThan(5000)
    expect(metrics.responseTime).toBeLessThan(3000)
    expect(metrics.domContentLoadedTime).toBeLessThan(3000)
});


test('Data accuracy', async({page})=>{


    await page.goto('/map', {waitUntil: "load"})
    await page.waitForSelector('[placeholder="Search for venue"]')
    await expect(page.locator('[placeholder="Search for venue"]')).toBeVisible()
    await page.locator('[placeholder="Search for venue"]').fill('Dubai ladies club')
    await page.locator('[placeholder="Search for venue"]').press('Enter')
    // this timeout is for the popup to show, we can replace it with waitforselector or another waitfor method
    await page.waitForTimeout(3000)

    // to get rid of the modal popup
        await expect(page.getByText('Explore Privilee venues')).toBeVisible()
        await page.locator('[name="first_name"]').fill('John')
        await page.locator('[name="email"]').fill('john@example.com')
        await page.locator('[name="mobile"]').fill('1234567890')
        await page.locator('[type="submit"]').click()
        await page.waitForURL('map?form=leadsuccess')
        console.log('successful!!')

    await expect(page.getByText('Immerse yourself in the ultimate ladies-only destination, Dubai Ladies Club!')).toBeVisible()

})