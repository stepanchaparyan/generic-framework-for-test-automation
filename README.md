# Selenium&Puppeteer

[![Build Status](https://travis-ci.org/stepanchaparyan/hybrid_selenium_puppeteer.svg?branch=master)](https://travis-ci.org/stepanchaparyan/hybrid_selenium_puppeteer)

> Hibrid solution for running two most popular test frameworks together

#### Supported browsers and tools
* browser:chrome framework:puppeteer (on ubuntu 16.04, ubuntu 18.04, windows 10)
* browser:firefox framework:puppeteer (on ubuntu 16.04, ubuntu 18.04)
* browser:chrome framework:selenium (on ubuntu 16.04, ubuntu 18.04, windows 10)
* browser:firefox framework:selenium  (on ubuntu 16.04, ubuntu 18.04, windows 10)
* browser:edge framework:selenium  (windows 10)


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
* path for edgedrive - \node_modules\edgedriver\lib\edgedriver

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
#### Method 1 - test with parameters
```sh
test (  1-st parameter - browser:browserType (default is chrome)
        2-nd parameter - framework:frameworkType  (default is puppeteer) 
        3-th parameter - sendMail or noMail  (default is noMail)
        
    e.g. npm test browser:chrome framework:selenium noMail
)

```
#### Method 2-nd way - test by existing scripts
```sh
test:all (run all tests with all mentioned browsers, one after another, without sending report mail)
test:all_sendMail (run all tests with all mentioned browsers, one after another, with sending report mail)
test:all_parallel (run all tests with all mentioned browsers),
test:all_parallel_sendMail (run all tests with all mentioned browsers and send mail), 
test:chrome_puppeteer (run only puppeteer on chrome)
test:chrome_puppeteer_sendMail (run only puppeteer on chrome and send report mail)
test:firefox_puppeteer (run only puppeteer on firefox)
test:firefox_puppeteer_sendMail (run only puppeteer on firefox and send report mail) 
test:chrome_selenium (run only selenium on chrome)
test:chrome_selenium_sendMail (run only selenium on chrome and send report mail)
test:firefox_selenium (run only selenium on firefox)
test:firefox_selenium_sendMail (run only selenium on firefox and send report mail)
test:edge_selenium (run only selenium on edge)
test:edge_selenium_sendMail (run only selenium on edge and send report mail)
```
	
