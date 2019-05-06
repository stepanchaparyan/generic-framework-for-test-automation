module.exports = {
	LOGIN_PAGE: {
		SELECTORS: {
            MY_ACCOUNT: '#ma',
            INPUT_EMAIL: '#_idyour_email',
            INPUT_PASSWORD: '#_idpassword',
            SUBMIT: '#loginaction__form_action0'
        }
    },
    MY_ACCOUNT_PAGE: {
        SELECTORS: {
            RENEW: '#main > div.tabbody > div > div > div:nth-child(1) > div > div:nth-child(3) > div:nth-child(2) > a:nth-child(1) > img',
            ITEMS: '#main > div.tabbody > div > div > div',
            RENEW_BUTTON_ON_DIALOG: '#submit_dlg_button'
        }
    }
};