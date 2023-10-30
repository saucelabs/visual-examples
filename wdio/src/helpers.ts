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
    sauceUsername = await readline.question(
      'What is your Sauce Labs username? '
    );
    await updateDotenv({
      SAUCE_USERNAME: sauceUsername,
    });
    console.log('Sauce Labs username is saved in the .env file.');
  }

  if (!sauceAccessKey) {
    sauceAccessKey = await readline.question(
      'What is your Sauce Labs API key?? ',
      {
        hideEchoBack: true,
      }
    );
    await updateDotenv({
      SAUCE_ACCESS_KEY: sauceAccessKey,
    });
    console.log('Sauce Labs API key is saved in the .env file.');
  }

  return { sauceUsername, sauceAccessKey };
}
