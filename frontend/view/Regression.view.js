sap.ui.jsview("ui5bp.view.Regression", {  // this View file is called Address.view.js

	getControllerName: function() {
		 return "ui5bp.controller.Regression";     // the Controller lives in Address.controller.js
	},

	createContent: function(oController) {
		 var oButton = new sap.ui.commons.Button({text:"Hello JS View"});
		 oButton.attachPress(oController.handleButtonClicked);
		 return oButton;
	}

});
