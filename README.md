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
* write your tests in test folder (create separate files)
* write your page objects and constants in src folder (create separate files for every page)
* import created test file in Alltests.spec file

## Run tests
```sh
npm test (run tests with three types mentioned down below)
npm run test:puppeteer
npm run test:selenium_chrome
npm run test:selenium_firefox
```
