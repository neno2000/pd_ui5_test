// ======= HECQTA ========
sap.ui.jsview("ui5bp.view.Launchpad", {

    getControllerName: function() {
        return "ui5bp.controller.Launchpad";
    },

    createContent: function(oController) {

        var tc = new sap.m.TileContainer("tc", {});

        var model = new sap.ui.model.json.JSONModel("model/menu.json");
        model.attachRequestCompleted(null, function() {
            function navFn(target) {
                return function() {
                    oController.doNavOnSelect(target);
                }
            }

            var data = null,
                m = 0,
                menu = null;
            data = model.getData();
            if (data && data.Menu) {
                for (m = 0; m < data.Menu.length; m++) {
                    menu = data.Menu[m];
                    tc.addTile(new sap.m.StandardTile({
                        icon: menu.icon,
                        title: menu.title,
                        info: menu.title,
                        press: navFn(menu.targetPage)
                    }));
                }
            }

        });

        var page = new sap.m.Page({
            setShowHeader: true,
            title: "People Data Test and Migration Tool",
            footer: new sap.m.Bar({
                contentMiddle: [new sap.m.Link("myproLinkLP", {
                    text: "v0.8.0",
                    href: "http://blog.mypro.de/tag/ui5boilerplate/"
                })]

            })
        });

        page.setEnableScrolling(false);
        page.setShowHeader(true);
        page.addContent(tc);

        return page;
    }

});
