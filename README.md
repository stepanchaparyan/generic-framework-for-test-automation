# Selenium&Puppeteer

[![Build Status](https://travis-ci.org/stepanchaparyan/hybrid_selenium_puppeteer.svg?branch=master)](https://travis-ci.org/stepanchaparyan/hybrid_selenium_puppeteer)

> Hibrid solution for running two most popular test frameworks together

#### Supported browsers and tools
* browser:chrome framework:puppeteer (on ubuntu 16.04, ubuntu 18.04, windows 10, macOS 10.14)
* browser:firefox framework:puppeteer (on ubuntu 16.04, ubuntu 18.04, macOS 10.14)
* browser:chrome framework:selenium (on ubuntu 16.04, ubuntu 18.04, windows 10, macOS 10.14)
* browser:firefox framework:selenium  (on ubuntu 16.04, ubuntu 18.04, windows 10, macOS 10.14)
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
├── settings
    ├── settings__puppeteer
    ├── settings__selenium
    ├── settings__testrail
├── src
    ├── helpers
        ├── actions.js
        ├── mailSender.js
        ├── myDriver.js 
        ├── sendMail.js
        ├── utils.js         
    ├── linguatrip(example)
        ├── linguatripConstants.js
        ├── linguatripPage.js
+   └── yourPage
+       ├── yourPageConstants
+       └── yourPage.js
├── test
+   ├── allTests.spec.js
    ├── linguatrip.spec.js(example)
+   └── yourTests.spec.js
├── .babelrc
├── .eslintrc.js
├── .gitignore
├── .travis.yml
├── mocha.opts
├── package.json
└── readme.md
```

## TestRail integration
```sh
add your testrail credentials (hostname,mail,password) into settings/test_rail/testRailSettings file
```

## Report mail sender integration
```sh
add your credentials (report sender email, password, report receiver email) into src/helpers/mailSender file
also, for sender email need to allow less secure apps:ON (https//myaccount.google.com/lesssecureapps) 
```

## Run tests
#### Method 1 - test with parameters
```sh
test (  1-st parameter - browser:browserType (default is chrome)
        2-nd parameter - framework:frameworkType  (default is puppeteer) 
        optional parameters - 
            sendMail (default - does not send report mail),   
            TestRail (default - does not update TestRail),    
            deleteCookies (default - does not delete cookies),   
           
    e.g. npm test browser:chrome framework:selenium TestRail
)
```
#### Method 2-nd way - test by existing scripts
```sh
test:all (run all tests with all mentioned browsers one after another)
test:all_parallel (run all tests with all mentioned browsers),

```