describe('Login OrangeHRM', () => {
  it('TC-LOGIN-001 - Login dengan username dan password valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('admin123');
    cy.get('.orangehrm-login-button').click();
    cy.url().should('include', '/dashboard');
  });

    it('TC-LOGIN-002 - Login dengan username tidak valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[name="username"]').type('InvalidUser');
    cy.get('[name="password"]').type('admin123');
    cy.get('.orangehrm-login-button').click();
    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials');
  });

    it('TC-LOGIN-003 - Login dengan password tidak valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('WrongPassword');
    cy.get('.orangehrm-login-button').click();
    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials');
  });

    it('TC-LOGIN-004 - Login dengan username dan password tidak valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[name="username"]').type('InvalidUser');
    cy.get('[name="password"]').type('WrongPassword');
    cy.get('.orangehrm-login-button').click();
    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials');
  });

  it('TC-LOGIN-005 - Login tanpa mengisi username', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[name="password"]').type('admin123');
    cy.get('.orangehrm-login-button').click();
    cy.get('.oxd-input-group')
      .first()
      .find('.oxd-input-field-error-message')
      .should('contain', 'Required');
  });

  it('TC-LOGIN-006 - Login tanpa mengisi password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[name="username"]').type('Admin');
    cy.get('.orangehrm-login-button').click();
    cy.get('.oxd-input-group')
      .eq(1)
      .find('.oxd-input-field-error-message')
      .should('contain', 'Required');
  });

  it('TC-LOGIN-007 - Login tanpa mengisi username dan password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('.orangehrm-login-button').click();
    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2)
      .and('contain', 'Required');
  });

  it('TC-LOGIN-008 - Memastikan password ditampilkan secara tersembunyi', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[name="password"]')
      .should('have.attr', 'type', 'password');
    cy.get('[name="password"]').type('admin123');
    cy.get('[name="password"]')
      .should('have.attr', 'type', 'password');
  });

  it('TC-LOGIN-009 - Login dengan username yang memiliki spasi di awal dan akhir', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[name="username"]').type(' Admin ');
    cy.get('[name="password"]').type('admin123');
    cy.get('.orangehrm-login-button').click();
    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials');
  });

it('TC-LOGIN-010 - Login dengan username menggunakan huruf kecil', () => {
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  cy.get('[name="username"]').type('admin')
  cy.get('[name="password"]').type('admin123')
  cy.get('.orangehrm-login-button').click()
  cy.url().should('include', '/dashboard')
})

  it('TC-LOGIN-011 - Mengakses Forgot your password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.contains('Forgot your password?').click();
    cy.url().should('include', '/requestPasswordResetCode');
  });

  it('TC-LOGIN-012 - Login dengan password yang mengandung karakter khusus', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('Admin@123');
    cy.get('.orangehrm-login-button').click();
    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials');
  });

});