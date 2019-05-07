# Selenium&Puppeteer

[![Build Status](https://travis-ci.org/stepanchaparyan/hybrid_selenium_puppeteer.svg?branch=master)](https://travis-ci.org/stepanchaparyan/hybrid_selenium_puppeteer)

> Hibrid solution for running two most popular test frameworks together from argument

## Getting started
#### Instalation
```sh
git clone https://github.com/stepanchaparyan/hybrid_selenium_puppeteer.git
npm install
```
## Usage
* write your tests in test folder (i.e yourTests.spec.js)
* write your page objects and constants in src folder (i.e yourPage)
* import created test file in Alltests.spec file

```diff
├── node_modules
├── settings__puppeteer
├── settings__selenium
├── src
    ├── helpers
        ├── myDriver.js
    ├── edx(example)
        ├── edxConstants.js
        ├── edxPage.js
+   └── yourPage
+       ├── yourPageConstants
+       └── yourPage.js
├── test
+   ├── allTests.spec.js
    ├── edx.spec.js(example)
+   └── yourTests.spec.js
├── .babelrc
├── .eslintrc.js
├── .gitignore
├── .travis.yml
├── mocha.opts
├── package.json
└── readme.md
```

## Run tests
```sh
npm test (run tests with three types mentioned down below)
npm run test:puppeteer
npm run test:selenium_chrome
npm run test:selenium_firefox
```
