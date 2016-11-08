module.exports = {
    before: function(client) {
        client.testUrl = 'http://solar-potential-version-3.azurewebsites.net';
        process.argv.forEach(function(argument) {
            if (argument.indexOf('url') !== -1) {
                client.testUrl = argument.split('=')[1];
                if (client.testUrl.charAt(client.testUrl.length - 1) == '/') {
                    client.testUrl = client.testUrl.substring(0, client.testUrl.length - 1);

                }
            }
        });
    },
    'Load sunmapper.com': function(client) {
        client
            .url(client.testUrl)
            .waitForElementVisible('body', 15000)
            .assert.title('Sunmapper - Din guide til solceller')
            .assert.visible('.welcome-screen');
    },
    'Welcomescreen visible': function(client) {
        client
            .assert.visible('.welcome-screen');
    },
    'Header autocomplete suggestions': function(client) {
        /*
            Dont test for header autocomplete as header search is gone on mobile
        */
        if (client.options.desiredCapabilities.platform !== "android") {
            client
                .setValue('.adress-search__header .adress-search__input', 'taskebjer')
                .waitForElementVisible('.adress-search__header .adress-search__autocomplete-item', 5000)
                .assert.visible('.adress-search__header .adress-search__autocomplete-item');
        }
    },
    'Main autocomplete suggestions': function(client) {
        client
            .setValue('.welcome-screen .adress-search__input', 'taskebjer')
            .waitForElementVisible('.welcome-screen .adress-search__autocomplete-item', 5000)
            .assert.visible('.welcome-screen .adress-search__autocomplete-item')
            .sendKeys('.welcome-screen .adress-search__input', client.Keys.DOWN_ARROW)
            .waitForElementVisible('.welcome-screen .adress-search__autocomplete-item', 5000)
            .assert.cssClassPresent(".welcome-screen .adress-search__autocomplete-item:nth-of-type(1)", "adress-search__autocomplete-item--active");
    },
    'Menu expands on mobile': function(client) {
        if (client.options.desiredCapabilities.platform === "android") {
            client
                .click(".mobile-menu")
                .assert.visible('.header-link[href="/about"]')
                .assert.visible('.header-link[href="/faq"]');
        }
    },
    'Click the loop for searching': function(client) {
        /*
        client
            .url(client.testUrl)
            .waitForElementVisible('body', 5000)
            .setValue('.welcome-screen .adress-search__input', 'taskebjer')
            .click('.adress-search__autocomplete-loop')
            .pause(3000)
            .waitForElementVisible('.adress-tile', 5000)
            .assert.containsText('.adress-tile__adress-name', 'Taskebjergvej 34, 8620 Kjellerup');
            */
    },
    'Load specific housepage': function(client) {
        client
            .url(client.testUrl + '/house-page/0a3f50c5-3256-32b8-e044-0003ba298018')
            .waitForElementVisible('.adress-tile', 5000);
    },
    'Correct house': function(client) {
        client
            .assert.containsText('.adress-tile__adress-name', 'Taskebjergvej 34, 8620 Kjellerup');
    },
    'Find leverandører visible': function(client) {
        client
            .assert.visible('.find-supplier');
    },
    'Uddyb button working with close': function(client) {
        client
            .click("#electricity-production-questionmark")
            .assert.visible('.info-box')
            .click(".info-box__close")
            .assert.hidden('.info-box')
            .click("#adjust-grants-period-questionmark")
            .assert.visible('.info-box')
            .click(".info-box__close")
            .assert.hidden('.info-box')
            .click("#solar-size-questionmark")
            .assert.visible('.info-box')
            .click(".info-box__close")
            .assert.hidden('.info-box')
            .click("#property-electricity-consumption-questionmark")
            .assert.visible('.info-box')
            .click(".info-box__close")
            .assert.hidden('.info-box')
            .click("#payback-years-questionmark")
            .assert.visible('.info-box')
            .click(".info-box__close")
            .assert.hidden('.info-box');
    },
    'Find supplier modal visible': function(client) {
        client
            .click(".find-supplier")
            .assert.visible('.get-offer-modal')
            .click(".get-offer-modal__close")
            .assert.hidden('.get-offer-modal');
    },
    'Specific housepage autocomplete suggestions': function(client) {
        if (client.options.desiredCapabilities.platform !== "android") {
            client
                .setValue('.adress-search__header .adress-search__input', 'taskebjer')
                .waitForElementVisible('.adress-search__header .adress-search__autocomplete-item', 5000)
                .assert.visible('.adress-search__header .adress-search__autocomplete-item');
        }
    },
    'Menu expands on mobile': function(client) {
        if (client.options.desiredCapabilities.platform === "android") {
            client
                .click(".mobile-menu")
                .assert.visible('.header-link[href="/about"]')
                .assert.visible('.header-link[href="/faq"]');
        }
    },
    after: function(client) {
        client.end();
    }
};
