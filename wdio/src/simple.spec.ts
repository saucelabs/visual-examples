import LoginPage from './pages/login.page.js'

const USERNAME = "standard_user"
const PASSWORD = "secret_sauce"

describe('Login Flow', () => {

    it('should login with valid credentials', async () => {
        await LoginPage.open()

        await browser.check('Before Login')

        await LoginPage.login(USERNAME, PASSWORD);

        await browser.check('After Login')
    });
})


