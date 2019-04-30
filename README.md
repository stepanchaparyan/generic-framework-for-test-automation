# Selenium&Puppeteer
> Hibrid solution for running two most popular test frameworks together from argument
## Getting started
#### Instalation
```sh
git clone https://github.com/stepanchaparyan/hybrid_selenium_puppeteer.git
npm install
```
## Usage
* write your tests in test folder (create separate files)
* write your page objects and constants in src folder (create separate files for every page)
* import created test file in Alltests.spec file

## Run tests
```sh
npm test selenium (run with selenium )
npm test puppeteer (run with puppeteer)
```
