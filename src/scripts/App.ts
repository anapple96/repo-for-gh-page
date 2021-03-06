class App {

    static readonly debug = false;
    static game: Game;

    static start() {
        if (!App.debug) {
            Object.freeze(GameConstants);
        }

        Preload.load(App.debug).then(() => {
            console.log(`[${GameConstants.formatDate(new Date())}] %cLoading Game Data..`, 'color:#8e44ad;font-weight:900;');
            UndergroundItem.initialize();
            App.game = new Game(
                new Update(),
                new Breeding(),
                new Pokeballs(),
                new Wallet(),
                new KeyItems(),
                new BadgeCase(BadgeCase.Badge.Elite_HoennChampion),
                new OakItems([20, 50, 100]),
                new Party(),
                new Shards(),
                new Farming(),
                new LogBook(),
                new RedeemableCodes(),
                new Statistics(),
                new SpecialEvents()
            );

            console.log(`[${GameConstants.formatDate(new Date())}] %cGame loaded`, 'color:#8e44ad;font-weight:900;');
            Notifier.notify({ message: 'Game loaded', type: GameConstants.NotificationOption.info });

            GameController.bindToolTips();
            GameController.addKeyListeners();

            PokedexHelper.populateTypeFilters();
            PokedexHelper.updateList();

            App.game.initialize();
            ko.applyBindings(App.game);
            ko.options.deferUpdates = true;

            GameController.applyRouteBindings();
            Preload.hideSplashScreen();

            App.game.start();

        });
    }
}
