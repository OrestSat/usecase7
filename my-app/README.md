# README.md

## Test Description

We designed an extensive suite of test cases aimed at ensuring the robustness and functionality of a specific form. This form demands a range of inputs, such as name, email, agreement to terms, and gender selection. It is crucial that our form not only captures and processes valid data but also handles and reports invalid entries. Through these tests, we aim to cover a spectrum of typical user behaviors and edge cases to make sure that the form remains reliable and user-friendly.

The tests have been divided into two categories: **Positive** and **Negative** test cases.

## Test Cases Covered

### Positive Test Cases:
1. **Standard Submission:** Submit the form with all fields filled correctly. This includes a name of 3 or more characters, a valid email, the 'Agree to Terms' option checked, and a gender selected.
2. **Long Name Test:** Submit the form with an unusually long but valid name, ensuring the form handles names of any length.
3. **Complex Email Test:** Submit with a complex email address that remains valid (e.g., test.name+alias@example.co.uk) to ascertain the robustness of email validation.
4. **Gender Switch Test:** Change the gender from male to female and submit the form with all other fields correctly filled.
5. **Re-submission Test:** After an initial successful submission, re-submit the form with all fields completed correctly.

### Negative Test Cases:
1. **Blank Name:** Submit the form leaving the 'Name' field blank.
2. **Invalid Email:** Submit the form using an email address that's missing the "@" symbol.
3. **Terms Disagreement:** Attempt submission without checking the 'Agree to Terms' checkbox.
4. **Gender Omission:** Submit the form without selecting a gender.
5. **Short Name Test:** Submit the form with a name that's less than 3 characters long.

## Running Tests Locally

### Prerequisites:
Ensure that you have `Node.js` and `npm` installed. If not, download and install them from [Node.js official website](https://nodejs.org/).

### Steps:
1. **Clone the Repository:** 
```
git clone https://github.com/OrestSat/usecase7
cd usecase7/my-app
```

2. **Install Dependencies:** 
Before running tests, ensure you have all the required packages installed.
```
npm install
```

3. **Run All Tests:**
With the React Testing Library set up in our project, you can easily execute all the tests using the following command:
```
npm test
```

This command initiates the Jest test runner provided by Create React App and automatically runs tests that have changes since the last commit. 

4. **Run Tests for MyFormComponent:**
To specifically run tests for `MyFormComponent`, use the following command:
```
npm test MyFormComponent.spec
```

Remember to always keep your local repository updated and pull the latest changes before running tests to ensure you're testing the most recent version.
