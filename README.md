# Selenium&Puppeteer

[![Build Status](https://travis-ci.org/stepanchaparyan/hybrid_selenium_puppeteer.svg?branch=master)](https://travis-ci.org/stepanchaparyan/hybrid_selenium_puppeteer)

> Hibrid solution for running two most popular test frameworks together

#### Supported browsers and tools
* puppeteer-chrome (on ubuntu 16.04, ubuntu 18.04, windows 10)
* puppeteer-firefox (on ubuntu 16.04, ubuntu 18.04)
* selenium_chrome (on ubuntu 16.04, ubuntu 18.04, windows 10)
* selenoum_firefox (on ubuntu 16.04, ubuntu 18.04, windows 10)

## Getting started
#### Instalation
```sh
git clone https://github.com/stepanchaparyan/hybrid_selenium_puppeteer.git
npm install
```

#### Hint for windows users
###### Need to add selenium drivers' paths to the windows path variable list, see  [there](https://docs.alfresco.com/4.2/tasks/fot-addpath.html)
* path for chromedriver - \node_modules\chromedriver\lib\chromedriver
* path for geckodrive (firefox) - \node_modules\geckodriver
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
test (run all tests with all mentioned browsers, one after another, without sending report mail)
test:all_noMail (run all tests with all mentioned browsers, one after another, without sending report mail)
test:all_sendMail (run all tests with all mentioned browsers, one after another, with sending report mail)
test:all_sendMail_no_puppeteer_firefox (run all tests with all mentioned browsers, except puppeteer_firefox (for windows), one after another),
test:parallel_sendMail (run all tests with all mentioned browsers),
test:parallel_noMail (run all tests with all mentioned browsers), 
test:puppeteer_chrome (run only puppeteer_chrome)
test:puppeteer_chrome_sendMail (run only puppeteer_chrome and send report mail)
test:puppeteer_firefox (run only puppeteer_firefox)
test:puppeteer_firefox_sendMail (run only puppeteer_firefox and send report mail) 
test:selenium_chrome (run only selenium_chrome)
test:selenium_chrome_sendMail (run only selenium_chrome and send report mail)
test:selenium_firefox (run only selenium_firefox)
test:selenium_firefox_sendMail (run only selenium-firefox and send report mail)

```
