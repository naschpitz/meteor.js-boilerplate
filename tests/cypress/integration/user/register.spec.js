describe('First Creddot Resgister', () => {
    beforeEach(() => {
        cy.resetDatabase();
        cy.visit('http://localhost:4000/');
    });

    it('should register and log the new user', () => {
        cy.get('#register').click();

        const email = "test1@firstcreddot.com";
        const password = "test";

        cy.get('input#inputEmail').type(email);
        cy.get('input#inputPassword').type(password);
        cy.get('input#inputPasswordCheck').type(password);

        cy.get('button#btnRegister').click();

        cy.contains("User successfully registered.");
        cy.contains("You're logged in");

        cy.window().then(win => {
            // this allows accessing the window object within the browser
            const user = win.Meteor.user();

            expect(user).to.exist;
            expect(user.emails[0].address).to.equal('test1@firstcreddot.com');
        });
    });

    it('try to register and display error messages (password mismatch)', () => {
        cy.get('#register').click();

        cy.get('input#inputEmail').type('test1@firstcreddot.com');
        cy.get('input#inputPassword').type('test');
        cy.get('input#inputPasswordCheck').type('test2');

        cy.contains("do not match");

        cy.get('button#btnRegister').should('be.disabled');
    });

    it('try to register and display error messages (user already exists)', () => {
        const email = 'test1@firstcreddot.com';
        const password = 'test';

        cy.registerUser(email, password, true);
        cy.logout();

        cy.get('#register').click();
        cy.get('input#inputEmail').type(email);

        cy.contains("There is already an user");

        cy.get('input#inputPassword').type(password);
        cy.get('input#inputPasswordCheck').type(password);

        cy.get('button#btnRegister').should('be.disabled');

        cy.get('form').submit();

        cy.contains("Email already exists");

        cy.window().then(win => {
            // this allows accessing the window object within the browser
            const user = win.Meteor.user();

            expect(user).to.not.exist;
        });
    });
});