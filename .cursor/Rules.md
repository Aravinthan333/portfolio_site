## Rules for cursor AI

- [] Do not read .env files
- [] Don not read files other than the required files related to the promt
- [] Always write code in standard way
- [] a code file must not exceed than 50 lines
- [] a function must not exceed 10 lines
- [] always format the code using prettire formatter
- [] maintain inductry standard folder and file structure (routes, services, logics, components, controllers)
- [] use separate files for each and every components, controller, logics
- [] write unit test, functional test, integration test for every controller, function, logics. use test file name sa same as the fole eg., app.ts -> app.test.ts
- [] in test files lines must not be more than 200, wirte description for each test scenario, cover all fail cases and pass cases by altering input mockings
- [] mock data for tests must write in a test factory manner (in separate files/folders), use random data for test mock values using library
- [] all import statements must in top of the file
- [] use export near function declaration, dont use export default
- [] write reusable functions, components and use them wherever necessary, dont write a same piece of code repeatedly, reusability is important
- [] write every blocks of cod in try catch, handle all erors wih proper and appropriate message
- [] validate inputes for all create and update api
- [] all inputs must be sanitaized and validated
