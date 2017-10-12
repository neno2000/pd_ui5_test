sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
    "use strict";

    return Controller.extend("ui5bp.controller.Regression.Controller", {

        onInit : function () {
            var oModel = new JSONModel("ui5bp/model/Clothing.json");

            this.getView().setModel(oModel);
        },

        onCollapseAll: function () {
            var oTreeTable = this.getView().byId("TreeTableBasic");
            oTreeTable.collapseAll();
        },

        onExpandFirstLevel: function () {
            var oTreeTable = this.getView().byId("TreeTableBasic");
            oTreeTable.expandToLevel(1);
        }
    });

});
