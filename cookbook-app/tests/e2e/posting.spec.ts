import { test, expect } from "@playwright/test";

// constantVars
const maxTimeout = 5000;

test('full vertical flow', async ({ page, request }) => {

  // creating unique user
  const timestamp = Date.now();

  const user = `testuser_${timestamp}`;
  const pass = "GrandChickenTastifyierPasdfk;asdklfja;sdkf!";
  const email = `${user}@example.com`;

  console.log("user", user);
  console.log("pass", pass);
  console.log("email", email);

  /* register test user */
  await page.goto("http://localhost:3000/register");

  await page.fill('input[name="username"]', user);
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', pass );
  await page.fill('input[name="confirm_password"]', pass);

  await page.click('button[type="submit"]');

  await page.waitForURL("http://localhost:3000/login", {
  	timeout: maxTimeout
  });

  await expect(page).toHaveURL("http://localhost:3000/login");

  /* sign in with the new user */

  await page.fill('input[name="username"]', user);
  await page.fill('input[name="password"]', pass );

  await page.click('button[type="submit"]');

  await page.waitForURL("http://localhost:3000", {
  	timeout: maxTimeout
  });

  await expect(page).toHaveURL("http://localhost:3000");

  /* go to the create thought page */
  await page.click('[data-testid="create-post"]');
  await page.waitForSelector('[data-testid="tht-post"]', { timeout: maxTimeout });
  await page.click('[data-testid="tht-post"]');

  await page.waitForURL("http://localhost:3000/create/thought", {
  	timeout: maxTimeout
  });

  await expect(page).toHaveURL("http://localhost:3000/create/thought");

  /* create a thought */

  const title = `Test_thought ${timestamp}`;
  const body = `this is test body ${timestamp}`;

  console.log("title", title);
  console.log("body", body);
  
  
  await page.fill('input[name="title"]', title);
  await page.fill('textarea[name="body"]', body);
  
  await page.waitForTimeout(1000);

  await page.click('[data-testid="create-thought-submit"]');
  
  await page.waitForFunction(() => window.location.pathname === "/");
  await expect(page).toHaveURL("http://localhost:3000");
  
  /* checking if the post is there now*/
  await page.waitForSelector('text=' + title, { timeout: maxTimeout });
  await expect(page.locator(`text=${title}`)).toBeVisible();

});
