module.exports = {
    before: function(client) {
        client.testUrl = 'http://solar-potential-version-3.azurewebsites.net';
        process.argv.forEach(function(argument) {
            if (argument.indexOf('url') !== -1) {
                client.testUrl = argument.split('=')[1];
                if(client.testUrl.charAt(client.testUrl.length - 1) == '/'){
                    client.testUrl = client.testUrl.substring(0,client.testUrl.length - 1);

                }
            }
        });
    },
    'Load sunmapper.com': function(client) {
        client
            .url(client.testUrl)
            .waitForElementVisible('body', 5000)
            //.assert.attributeEquals('body', 'data-foo', 'bar')
            .assert.title('Sunmapper - Din guide til solceller')
            .assert.visible('.welcome-screen');
    },
    'Welcomescreen visible': function(client) {
        client
            .assert.visible('.welcome-screen');
    },
    'Header autocomplete suggestions': function(client) {
        client
            .setValue('.adress-search__header .adress-search__input', 'taskebjer')
            .waitForElementVisible('.adress-search__header .adress-search__autocomplete-item', 5000)
            .assert.visible('.adress-search__header .adress-search__autocomplete-item');
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
    'Load specific housepage': function(client) {
        client
            .url(client.testUrl + '/house-page/0a3f50c5-3256-32b8-e044-0003ba298018')
            .waitForElementVisible('.adress-tile', 5000);
    },
    'Specific housepage autocomplete suggestions': function(client) {
        client
            .setValue('.adress-search__header .adress-search__input', 'taskebjer')
            .waitForElementVisible('.adress-search__header .adress-search__autocomplete-item', 5000)
            .assert.visible('.adress-search__header .adress-search__autocomplete-item');
    },
    'Correct house': function(client) {
        client
            .assert.containsText('.adress-tile__adress-name', 'Taskebjergvej 34, 8620 Kjellerup');
    },
    'Find leverandører visible': function(client) {
        client
            .assert.visible('.find-supplier');
    },
    after: function(client) {
        client.end();
    }

};
