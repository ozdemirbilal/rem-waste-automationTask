import { test, expect } from '@playwright/test';

const baseURL = 'https://practice.expandtesting.com/notes/app/login';

test.describe('ExpandTesting Notes App Login', () => {
  
  test('Login with valid credentials', async ({ page }) => {
    
    // Fill in valid credentials
    await login(page,'demo@remwaste.com', 'remwaste123');
    // Assert successful login by checking for a notes page element
    await expect(page.locator("(//div[@id='root']//a)[1]")).toContainText('MyNotes');

    await page.close();
  });

  test('Login with invalid credentials', async ({ page }) => {
    
    // Fill in invalid credentials
    await login(page,'invalid@example.com', 'wrongpassword');
    // Assert error message is visible
    await expect(page.locator("//div[@class='toast-body']")).toHaveText('Incorrect email address or password');
    
    await page.close();
  });
});

test('Create, Edit and Delete note', async ({ page }) => {

  await test.step('Creating a new note', async () => {
  
    // Fill in valid credentials
    await login(page,'demo@remwaste.com', 'remwaste123');
    // Create a new note
    await page.getByTestId('add-new-note').click();
    await page.getByTestId('note-title').fill('Test');
    await page.getByTestId('note-description').fill('Manual Test');
    await page.getByTestId('note-submit').click();
    await page.getByTestId('note-view').click();
    // Assert that the note is created successfully
    await expect(page.getByTestId('note-card-description')).toBeVisible();
    await expect(page.getByTestId('note-card-description')).toHaveText('Manual Test');
  });

  await test.step('Editing existing note', async () => {
    
    // Edit existing note
    await page.waitForTimeout(2000);
    await page.getByTestId('note-edit').click();
    await page.waitForTimeout(2000);
    await page.getByTestId('note-description').clear();
    await page.getByTestId('note-description').fill('Automation Test');
    await page.getByTestId('note-submit').click();
    // Assert that the note is edited successfully
    await expect(page.getByTestId('note-card-description')).toHaveText('Automation Test');
  });

  await test.step('Deleting existing note', async () => {
    
    // Delete existing note
    await page.waitForTimeout(2000);
    await page.getByTestId('note-delete').click();
    await page.waitForTimeout(2000);
    await page.getByTestId('note-delete-confirm').click();
    // Assert that the note is deleted successfully
    await expect(page.getByTestId('note-card-description')).not.toBeVisible();
    await expect(page.getByTestId('no-notes-message')).toBeVisible();
  });

});

async function login(page, username, password) {

  // Navigate to the login page
  await page.goto(baseURL);
  await page.waitForTimeout(2000);
  // Fill in valid credentials
  await page.locator('input[name="email"]').scrollIntoViewIfNeeded();
  await page.fill('input[name="email"]', username); // Replace with a valid email
  await page.fill('input[name="password"]', password);   // Replace with a valid password
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);
}