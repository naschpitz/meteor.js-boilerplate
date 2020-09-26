describe('First Creddot Navbar', () => {
    beforeEach(() => {
        cy.resetDatabase();
        cy.visit('http://localhost:4000/');
    });

    it('should see "Login" when not logged in', () => {
        cy.get('nav').within(() => {
            cy.contains("Login")
        });
    });

    it('should see e-mail when logged in', () => {
        const email = "test1@firstcreddot.com";
        const password = "test";

        cy.registerUser(email, password, true);
        cy.waitLogin();

        cy.get('nav').within(() => {
            cy.contains(email);
        });
    });
});