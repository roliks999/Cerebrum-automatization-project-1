beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/
import { faker } from '@faker-js/faker'
const StaticEmail = 'rolands@Rolands.eu'
const RandomEmail = faker.internet.email()
const StaticFirstName = 'Rolands'
const RandomFirstName = faker.person.firstName()
const StaticLastName = 'Why not'
const RandomLastName = faker.person.lastName()
const StaticUsername = 'Power'
const StaticPhone = '26707456'
const RandomPhone = faker.phone.number()
let StaticPassword = 'Zuze12345'

describe('Section 1: Functional tests', () => {
    it('User can use only same both first and validation passwords', () => {
        cy.get('#username').type(StaticUsername)
        cy.get('#email').type(RandomEmail)
        cy.get('[data-cy="name"]').type(RandomFirstName)
        cy.get('[data-testid="lastNameTestId"]').type(RandomLastName)
        cy.get('[data-testid="phoneNumberTestId"]').type(RandomPhone)
        cy.get("input[name='password']").type(StaticPassword)
        cy.get('[name="confirm"]').type('Saknes123')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        cy.get('[name="confirm"]').scrollIntoView().clear().type(StaticPassword)
        cy.get('h2').contains('Password').click()
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('.submit_button').should('be.enabled')
    })

    it('User can submit form with all fields added', () => {
        cy.get('#username').type(StaticUsername)
        cy.get('#email').type(StaticEmail)
        cy.get('[data-cy="name"]').type(StaticFirstName)
        cy.get('[data-testid="lastNameTestId"]').type(StaticLastName)
        cy.get('[data-testid="phoneNumberTestId"]').type(StaticPhone)
        cy.get('#htmlFavLanguage').check()
        cy.get('#vehicle1').check()
        cy.get('select#cars').select('Audi')
        cy.get('select#animal').select('Snake')
        cy.get("input[name='password']").type(StaticPassword)
        cy.get('[name="confirm"]').type(StaticPassword)
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })

    it('User can submit form with valid data and only mandatory fields added', () => {
        cy.get('#username').type(StaticUsername)
        cy.get('#email').type(StaticEmail)
        cy.get('[data-cy="name"]').type(StaticFirstName)
        cy.get('[data-testid="lastNameTestId"]').type(StaticLastName)
        cy.get('[data-testid="phoneNumberTestId"]').type(StaticPhone)
        cy.get("input[name='password']").type(StaticPassword)
        cy.get('[name="confirm"]').type(StaticPassword)
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })

    it('User cannot submit form with username field empty', () => {
        cy.get('#email').type(StaticEmail)
        cy.get('[data-cy="name"]').type(StaticFirstName)
        cy.get('[data-testid="lastNameTestId"]').type(StaticLastName)
        cy.get("input[name='password']").type(StaticPassword)
        cy.get('[name="confirm"]').type(StaticPassword)
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
    })
}
)

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('My test for second picture', () => {
        cy.log('Will check logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 168)
            .and('be.greaterThan', 80)
        cy.get('[data-cy="cypress_logo"]').invoke('width').should('be.greaterThan', 115).and('be.lessThan', 117)
    })

    it('Check navigation part to registration form 1', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        cy.url().should('contain', '/registration_form_1.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check navigation to registration form 2', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.url().should('contain', '/registration_form_2.html')
        cy.log('Back again in registration form 2')
    })


    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Car dropdown is correct', () => {
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')

        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })
    
    it('Animal dropdown is correct', () => {
        cy.get('#animal').select(2).screenshot('Animal drop-down')
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])

        })
    })
})
