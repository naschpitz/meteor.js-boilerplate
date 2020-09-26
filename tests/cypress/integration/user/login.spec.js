describe('First Creddot Login', () => {
    beforeEach(() => {
        cy.resetDatabase();
        cy.visit('http://localhost:4000/');
    });

    it('should login successfully', () => {
        const email = "test1@firstcreddot.com";
        const password = "test";

        cy.registerUser(email, password, true);
        cy.waitLogin();
        cy.logout();

        cy.get('#login').click();

        cy.get('input#inputEmail').type(email);
        cy.get('input#inputPassword').type(password);

        cy.get('button#btnLogin').click();

        cy.waitLogin();
    });

    it('should not login successfully (wrong password)', () => {
        const email = "test1@firstcreddot.com";
        const password = "test";

        cy.registerUser(email, password, true);
        cy.waitLogin();
        cy.logout();

        cy.get('#login').click();

        cy.get('input#inputEmail').type(email);
        cy.get('input#inputPassword').type('test2');

        cy.get('button#btnLogin').click();

        cy.contains('Incorrect password');
    });

    it('should not login successfully (user not found)', () => {
        const email = "test1@firstcreddot.com";
        const password = "test";

        cy.registerUser(email, password, true);
        cy.waitLogin();
        cy.logout();

        cy.get('#login').click();

        cy.get('input#inputEmail').type(email+".br");
        cy.get('input#inputPassword').type('test');

        cy.get('button#btnLogin').click();

        cy.contains('not found');
    });

    it('should send password recovery e-mail', () => {
        const email = "test1@firstcreddot.com";
        const password = "test";

        cy.registerUser(email, password, true);
        cy.waitLogin();
        cy.logout();

        cy.get('#login').click();

        cy.get('input#inputEmail').type(email);
        cy.get('#forgotPassword').click();

        cy.contains('has been sent');
    });

    it('should not send password recovery e-mail (user does not exist)', () => {
        const email = "test1@firstcreddot.com";
        const password = "test";

        cy.registerUser(email, password, true);
        cy.waitLogin();
        cy.logout();

        cy.get('#login').click();

        cy.get('input#inputEmail').type(email + ".br");
        cy.get('#forgotPassword').click();

        cy.contains('not registered');
    });
});