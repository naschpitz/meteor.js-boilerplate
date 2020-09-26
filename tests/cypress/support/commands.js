// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('resetDatabase', () => {
    cy.exec('mongo mongodb://localhost:4001/meteor "tests/cypress/support/dbClean.js"').then((result) => {
        cy.log(result);
    });
});

Cypress.Commands.add('registerUser', (email, password, confirmEmail) => {
    cy.get('#register').click();

    cy.get('input#inputEmail').type(email);
    cy.get('input#inputPassword').type(password);
    cy.get('input#inputPasswordCheck').type(password);

    cy.get('button#btnRegister').click();
    cy.contains('.alert-success', 'successfully');

    cy.get('button#btnClose').click({force: true});

    if (confirmEmail)
        cy.confirmEmail(email);
});

Cypress.Commands.add('login', (email, password) => {
    cy.get('#login').click();

    cy.get('input#inputEmail').type(email);
    cy.get('input#inputPassword').type(password);

    cy.get('button#btnLogin').click();

    cy.waitLogin();
});

Cypress.Commands.add('logout', () => {
    cy.get('li#userDropdown').click();
    cy.get('#logoutLink').click();

    cy.contains("logged out");

    cy.window().then(win => {
        // this allows accessing the window object within the browser
        const user = win.Meteor.user();

        expect(user).to.not.exist;
    });
});

Cypress.Commands.add('waitLogin', () => {
    cy.contains("You're logged in");

    cy.window().then(win => {
        // this allows accessing the window object within the browser
        const user = win.Meteor.user();

        expect(user).to.exist;
    });
});

Cypress.Commands.add('buyCreddotOnePlan', (email) => {
    let command = "mongo --quiet mongodb://localhost:4001/meteor --eval ";
    command += '"const email=\'' + email + '\'" ';
    command += '"tests/cypress/support/grantUserAdmin.js"';

    cy.exec(command).then((result) => {
        const userId = JSON.parse(result.stdout);

        cy.visit('http://localhost:4000/administration/testSubscriptions');

        cy.get('[name="userId"]').select(userId);
        cy.get('[name="product"]').select('creddotOne');
        cy.get('[name="planId"]').select('4N3M8GJshJmmAC79K');

        cy.get('button#btnCreate').click();
        cy.get('button#btnConfirm').click();
    });
});

Cypress.Commands.add('grantCreddotOneAccess', (userId) => {
    cy.visit('http://localhost:4000/usersManagement/' + userId);

    cy.contains("CreddotOne Access").parent().within(() => {
        cy.get('select').select('Allow');
        cy.get('select').should('have.value', 'true');
    });
});

Cypress.Commands.add('createCreddotOneCompany', (name, group) => {
    cy.visit('http://localhost:4000/products/creddotOne/companies/management');
    cy.wait(2000);

    cy.get('.card-header').contains("Create Company").parent().within(() => {
        cy.get('[name="name"]').clear().type(name);
        cy.get('[name="groupId"]').select(group);
        cy.get('button#btnCreate').click();
    });

    cy.contains('Company successfully created');

    cy.get('.card-header').contains('Companies Under Management').parent().within(() => {
        cy.get('[value="' + name + '"]').should('exist');
    });
});

Cypress.Commands.add('createCreddotOneCompaniesGroup', (title) => {
    cy.visit('http://localhost:4000/products/creddotOne/companies/groups');
    cy.wait(2000);

    cy.get('.card-header').contains("Create Group").parent().within(() => {
        cy.get('[name="title"]').clear();
        cy.get('button#btnCreate').should('be.disabled');
        cy.get('[name="title"]').type(title);
        cy.get('button#btnCreate').should('be.enabled');
        cy.get('button#btnCreate').click();
    });

    cy.contains("Group successfully created");

    cy.get('.card-header').contains('Groups Under Management').parent().within(() => {
        cy.get('[value="' + title + '"]').should('exist');
    });
});

Cypress.Commands.add('manageCompaniesGroup', (title) => {
    let command = "mongo --quiet mongodb://localhost:4001/meteor --eval ";
    command += '"const title=\'' + title + '\'" ';
    command += '"tests/cypress/support/getCompaniesGroupId.js"';

    cy.exec(command).then((result) => {
        const groupId = JSON.parse(result.stdout);

        cy.visit("http://localhost:4000/products/creddotOne/companies/groups/" + groupId);
    });
});

Cypress.Commands.add('inviteUser', (email) => {
    cy.visit('http://localhost:4000/usersManagement');

    cy.get('[name="email"]').type(email);
    cy.get('#btnInvite').click();
    cy.contains('Users Under Management').parent().within(() => {
        cy.contains(email);
    });
});

Cypress.Commands.add('acceptEnrollment', (email, password) => {
    let command = "mongo --quiet mongodb://localhost:4001/meteor --eval ";
    command += '"const email=\'' + email + '\'" ';
    command += '"tests/cypress/support/getPasswordToken.js"';

    cy.exec(command).then((result) => {
        const token = JSON.parse(result.stdout);

        const link = "http://localhost:4000/#/enroll-account/" + token;

        cy.visit("http://localhost:4000/wrongAdress/");
        cy.visit(link);

        cy.get('input#inputPassword').type(password);
        cy.get('input#inputPasswordCheck').type(password);
        cy.get('#btnReset').click();

        cy.waitLogin();
    });
});

Cypress.Commands.add('confirmEmail', (email) => {
    let command = "mongo --quiet mongodb://localhost:4001/meteor --eval ";
    command += '"const email=\'' + email + '\'" ';
    command += '"tests/cypress/support/getEmailConfirmationToken.js"';

    cy.exec(command).then((result) => {
        const token = JSON.parse(result.stdout);

        // This is a workaround for Cypress bug. Cy.visit() fails to load page if the url is the same.
        cy.visit("http://localhost:4000/wrongAdress/");

        const link = "http://localhost:4000/#/verify-email/" + token;

        cy.visit(link);
        cy.contains("E-mail account successfully verified");
    });
});

Cypress.Commands.add('createFingerprint', () => {
    cy.contains('Safe zone ahead');
    cy.get('button#btnCreate').should('be.enabled');
    cy.get('button#btnCreate').click();
    cy.contains("Link successfully");
});

Cypress.Commands.add('goToCompany', (name) => {
    let command = "mongo --quiet mongodb://localhost:4001/meteor --eval ";
    command += '"const name=\'' + name + '\'" ';
    command += '"tests/cypress/support/getCompanyId.js"';

    cy.exec(command).then((result) => {
        const companyId = JSON.parse(result.stdout);

        cy.visit("http://localhost:4000/products/creddotOne/companies/" + companyId);
    });
});