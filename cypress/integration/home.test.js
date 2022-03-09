describe('Home Page', () => {

    beforeEach(()=>{
        cy.fixture('courses.json').as('coursesJSON');
        cy.server();
        cy.route('api/courses','@coursesJSON').as('courses');
        cy.visit('/');
    })

    it('should display a list of courses', () => {
        cy.contains('All Courses');
        cy.wait('@courses')
        cy.get("mat-card").should("have.length",9)
    })

    it('should display the advanced courses',()=>{
        //tomamos las etiquetas de los botones de los cursos
        cy.get('.mat-tab-label').should('have.length',2); 
        //damos click en el segundo, advanced
        cy.get('.mat-tab-label').last().click();
        //checamos que solo se tenga un titulo en cada tarjeta
        cy.get('.mat-tab-body-active .mat-card-title').its('length').should('be.gt',1);
        //tomamos el titulo de la primera tarjeta y revismos que contenga el texto
        //exacto de Angular...
        cy.get('.mat-tab-body-active .mat-card-title').first()
        .should('contain', "Angular Security Course");

    })
});