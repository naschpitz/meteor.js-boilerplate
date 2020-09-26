describe('First Creddot Change Password', () => {
    beforeEach(() => {
        cy.resetDatabase();
        cy.visit('http://localhost:4000/');
    });

    it('should change password', () => {
        cy.registerUser('test1@firstcreddot.com', 'test', true);

        cy.get('li#userDropdown').click();
        cy.get('#changePasswordLink').click();

        cy.get('input#inputOldPassword').type('test');

        cy.get('input#inputPassword').type('test2');
        cy.get('input#inputPasswordCheck').type('test2');

        cy.get('button#btnChangePassword').click();

        cy.contains("Password changed successfully.");
    });

    it('try to change password and display error messages (wrong current password)', () => {
        cy.registerUser('test1@firstcreddot.com', 'test', true);

        cy.get('li#userDropdown').click();
        cy.get('#changePasswordLink').click();

        cy.get('input#inputOldPassword').type('test2');

        cy.get('input#inputPassword').type('test');
        cy.get('input#inputPasswordCheck').type('test');

        cy.get('button#btnChangePassword').click();

        cy.contains("Incorrect password");
    });

    it('try to change password and display error messages (password mismatch)', () => {
        cy.registerUser('test1@firstcreddot.com', 'test', true);

        cy.get('li#userDropdown').click();
        cy.get('#changePasswordLink').click();

        cy.get('input#inputOldPassword').type('test');

        cy.get('input#inputPassword').type('test2');
        cy.get('input#inputPasswordCheck').type('test3');

        cy.contains("do not match");

        cy.get('button#btnChangePassword').should('be.disabled');

        cy.get('form').submit();

        cy.contains("Password may not be empty");
    });
});