jQuery.sap.require("ui5bp.model.Utils");
sap.ui.controller("ui5bp.controller.Regression", {

  /**
   * Called when a controller is instantiated and its View controls (if available) are already created.
   * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
   * @memberOf view.NewFeatures-v122
   */
  onInit: function() {
    jQuery.sap.require("sap.ui.model.json.JSONModel");
    this.getView().setModel(new sap.ui.model.json.JSONModel("model/testCases.json"), "testCases");
    this.getView().setModel(new sap.ui.model.json.JSONModel("model/regrChoice.json"), "mode");
    this.getView().setModel(new sap.ui.model.json.JSONModel("model/countries.json"), "countries");
    this.bus = sap.ui.getCore().getEventBus();
    this.util = new ui5bp.model.Utils();
    that = this.util;
  },

  doNavBack: function(event) {
    console.log("back");
    this.bus.publish("nav", "back");
  },

  onSubmit: function() {

    alert("Hello World!");


  },

  onChangeUP: function(event) {
    this._import(event.getParameter("files") && event.getParameter("files")[0]);
  },
  _import: function(file) {
    if (file && window.FileReader) {
      var reader = new FileReader();
      var that = this;
      reader.onload = function(file) {
        var strCSV = file.target.result; //string in CSV
        console.log(strCSV);
      };
      reader.readAsText(file);
      console.log(reader.result);
    }

  },
  onSelectionChange: function(event) {

    var oPassword = sap.ui.getCore().byId("pass_01");
    var oUserName = sap.ui.getCore().byId("user_01");
    var oCompanyId = sap.ui.getCore().byId("company_01");
    var oUrl = sap.ui.getCore().byId("url_01");
    var modeToggle = true;
    if (oPassword.getValue() === "") {
      modeToggle = false;
      oPassword.setValueState(sap.ui.core.ValueState.Error);
    } else {
      oPassword.setValueState(sap.ui.core.ValueState.None);
    };

    if (oUserName.getValue() === "") {
      modeToggle = false;
      oUserName.setValueState(sap.ui.core.ValueState.Error);
    } else {
      oUserName.setValueState(sap.ui.core.ValueState.None);
    };

    if (oCompanyId.getValue() === "") {
      modeToggle = false;
      oCompanyId.setValueState(sap.ui.core.ValueState.Error);
    } else {
      oCompanyId.setValueState(sap.ui.core.ValueState.None);
    };

    if (oUrl.getValue() === "") {
      modeToggle = false;
      oUrl.setValueState(sap.ui.core.ValueState.Error);
    } else {
      oUrl.setValueState(sap.ui.core.ValueState.None);
    };
    if (modeToggle === true)  {
        this._authenticate(oPassword.getValue(), oUserName.getValue(), oCompanyId.getValue(), oUrl.getValue())
        if (that.toggle === true)
        {
          this._toggleMode(event);
        }else{
          var oComboBox = sap.ui.getCore().byId("testMode01");
          var oFileLabel = sap.ui.getCore().byId("filela_01");
          var oCsvFile = sap.ui.getCore().byId("csvfile_01");
          var oMCountries = sap.ui.getCore().byId("omcountries_01");
          var oMCountriesLabel = sap.ui.getCore().byId("omcountriesL_01");
          var oExecButton = sap.ui.getCore().byId("exebutton_01");
          var oExecButtonLabel = sap.ui.getCore().byId("exebuttonL_01");
          var oIconConfiguration = sap.ui.getCore().byId("iconconf_01");

          oFileLabel.setVisible(false);
          oCsvFile.setVisible(false);
          oIconConfiguration.setVisible(false);
          oMCountries.setVisible(false);
          oMCountriesLabel.setVisible(false);
          // oExecButton.setText("Check & Execute");
          oExecButton.setVisible(false);
          oExecButtonLabel.setVisible(false);

        }

    };

  },

  _toggleMode: function(event) {
    //get the object one by one
    var oComboBox = sap.ui.getCore().byId("testMode01");
    var oFileLabel = sap.ui.getCore().byId("filela_01");
    var oCsvFile = sap.ui.getCore().byId("csvfile_01");
    var oMCountries = sap.ui.getCore().byId("omcountries_01");
    var oMCountriesLabel = sap.ui.getCore().byId("omcountriesL_01");
    var oExecButton = sap.ui.getCore().byId("exebutton_01");
    var oExecButtonLabel = sap.ui.getCore().byId("exebuttonL_01");
    var oIconConfiguration = sap.ui.getCore().byId("iconconf_01");
    //Toggle
    if (oComboBox.getSelectedKey() == "Filebased") {
      oFileLabel.setVisible(true);
      oCsvFile.setVisible(true);
      oIconConfiguration.setVisible(false);
      oMCountries.setVisible(false);
      oMCountriesLabel.setVisible(false);
      oExecButton.setText("Check & Execute");
      oExecButton.setVisible(true);
      oExecButtonLabel.setVisible(true);
    } else if (oComboBox.getSelectedKey() == "Preconfigured") {
      oFileLabel.setVisible(false);
      oCsvFile.setVisible(false);
      oIconConfiguration.setVisible(true);
      oMCountries.setVisible(true);
      oMCountriesLabel.setVisible(true);
      oExecButton.setText("Execute");
      oExecButton.setVisible(true);
      oExecButtonLabel.setVisible(true);
    }
  },
  _authenticate(pass, user, company, url) {
    that.ping(pass, user, company, url);

  }


  /**
   * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
   * (NOT before the first rendering! onInit() is used for that one!).
   * @memberOf view.NewFeatures-v122
   */
  //  onBeforeRendering: function() {
  //    console.log("onBeforeRendering");
  //  }

  /**
   * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
   * This hook is the same one that SAPUI5 controls get after being rendered.
   * @memberOf view.NewFeatures-v122
   */
  //	onAfterRendering: function() {
  //
  //	},

  /**
   * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
   * @memberOf view.NewFeatures-v122
   */
  //	onExit: function() {
  //
  //	}

});
