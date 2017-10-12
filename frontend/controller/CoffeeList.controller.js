sap.ui.controller("ui5bp.controller.CoffeeList", {

    onInit: function() {
        this.getView().setModel(new sap.ui.model.json.JSONModel("model/coffee.json"));
        this.bus = sap.ui.getCore().getEventBus();
    },

    doNavBack: function(event) {
        this.bus.publish("nav", "back");
    }

});
