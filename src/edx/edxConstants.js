module.exports = {
	FIRST_PAGE: {
		SELECTORS: {
            LOGO: '#logo > h1 > a > img',
            SELECT_LANGUAGE: '#footer-language-select',
            SUBMIT_LANGUAGE: '#footer-language-button',
            ABOUT: '#footer-edx-v3 > div > div > div.col-xl-6.col-lg-8.col-md-9.col-sm-5.col-xs-12.column-2.flex-column.column-styles > div > div.col-xl-4.col-lg-4.col-md-4.col-sm-12.column-2-1.col-xs-12.first-div-border.column-styles > div > div > ul > li:nth-child(1) > a',
            SEARCH_INPUT: '#main-header',
            SEARCH_BUTTON: '#edit-submit-home-search > span.icon.fa.fa-search'
        }
    },
    SEARCH_PAGE: {
        SELECTORS: {
            VIEWING_RESULT_MATCHING: '#content > header > h2.js-result-msg.hide-phone'
        }
    }
};