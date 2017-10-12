sap.ui.controller("ui5bp.controller.Launchpad", {

    onInit: function() {
        this.bus = sap.ui.getCore().getEventBus();
    },

	doNavOnSelect : function (event) {
		this.bus.publish("nav", "to", {
			id : event
		});
	}

});
