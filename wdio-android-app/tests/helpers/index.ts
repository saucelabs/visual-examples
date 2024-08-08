import 'dotenv/config';
import updateDotenv from 'update-dotenv';
import readline from 'readline-sync';

/**
 * Get the Sauce Labs credentials from the environment variables, if not available,
 * ask the user to provide them and store them in a .env file.
 */
export async function getSauceCredentials(): Promise<{
  sauceUsername: string;
  sauceAccessKey: string;
}> {
  let sauceUsername = process.env.SAUCE_USERNAME;
  let sauceAccessKey = process.env.SAUCE_ACCESS_KEY;

  if (!sauceUsername) {
    console.error('no SAUCE_USERNAME variable set')
  }

  if (!sauceAccessKey) {
    console.error('no SAUCE_ACCESS_KEY variable set')
  }

  if (!sauceUsername || !sauceAccessKey) {
    throw new Error('Credentials are incomplete');
  }

  return { sauceUsername, sauceAccessKey };
}

/**
 * Set the test context
 */
export async function setTestContext(data: {
  path?: string;
  products?: number[];
  user?: { username: string; password: string };
}) {
  const { path, products = [], user } = data;
  const { username } = user;
  const userCookies = `document.cookie="session-username=${username}";`;
  const productStorage =
    products.length > 0
      ? `localStorage.setItem("cart-contents", "[${products.toString()}]");`
      : '';

  // Go to the domain and set the storage
  await browser.url('');
  await browser.execute(`${userCookies} ${productStorage}`);

  // Now got to the page
  await browser.url(path);
}
