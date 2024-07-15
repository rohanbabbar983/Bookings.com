import { test, expect } from '@playwright/test';

const UI_URL =" http://localhost:5173/";


test('should allow user to sign in', async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link",{name : "Sign in"}).click();
  await expect(page.getByRole("heading",{name: "Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill("rohan@gmail.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", {name:"Login"}).click();

  await expect(page.getByText("Login Success")).toBeVisible();

  await expect(page.getByRole("link",{name: "My Bookings"})).toBeVisible();

});

test('get started link', async ({ page }) => {
  const testEmail =  `test_register_${Math.floor(Math.random()* 900000)+10000}@gmail.com`;
  await page.goto(UI_URL);

  await page.getByRole("link",{name : "Sign in"}).click();
  await page.getByRole("link", {name: "Create an account here"}).click();

  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("123456");
  await page.locator("[name=confirmPassword]").fill("123456");
  await page.locator("[name=firstName]").fill("roman");
  await page.locator("[name=lastName]").fill("kumar");

  await page.getByRole("button", {name:"Create Account"}).click();

  await expect(page.getByText("Registration Success !")).toBeVisible();

  await expect(page.getByRole("link",{name: "My Bookings"})).toBeVisible();

});
