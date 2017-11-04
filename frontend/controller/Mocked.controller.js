jQuery.sap.require("ui5bp.model.Utils");
jQuery.sap.require("sap.m.MessageBox");
sap.ui.controller("ui5bp.controller.Mocked", {

  /**
   * Called when a controller is instantiated and its View controls (if available) are already created.
   * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
   * @memberOf view.NewFeatures-v122
   */
  onInit: function() {
    jQuery.sap.require("sap.ui.model.json.JSONModel");
    this.getView().setModel(new sap.ui.model.json.JSONModel("model/mocked.json"), "mocked");
    this.getView().setModel(new sap.ui.model.json.JSONModel("model/regrChoice.json"), "mode");
    this.getView().setModel(new sap.ui.model.json.JSONModel("model/countries.json"), "countries");
    this.bus = sap.ui.getCore().getEventBus();
    this.util = new ui5bp.model.Utils();
    that = this.util;
    this.selected_test = [];
    this.selected_countries = [];
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

    var oPassword = sap.ui.getCore().byId("mpass_01");
    var oUserName = sap.ui.getCore().byId("muser_01");
    var oCompanyId = sap.ui.getCore().byId("mcompany_01");
    var oUrl = sap.ui.getCore().byId("murl_01");
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
    modeToggle = true; // to be removed
    if (modeToggle === true) {
      this._authenticate(oPassword.getValue(), oUserName.getValue(), oCompanyId.getValue(), oUrl.getValue())
      if (that.toggle === true) {
        this._toggleMode(event);
      } else {
        var oComboBox = sap.ui.getCore().byId("mtestMode01");
        var oFileLabel = sap.ui.getCore().byId("mfilela_01");
        var oCsvFile = sap.ui.getCore().byId("mcsvfile_01");
        var oMCountries = sap.ui.getCore().byId("momcountries_01");
        var oMCountriesLabel = sap.ui.getCore().byId("momcountriesL_01");
        var oExecButton = sap.ui.getCore().byId("mexebutton_01");
        var oExecButtonLabel = sap.ui.getCore().byId("mexebuttonL_01");
        var oIconConfiguration = sap.ui.getCore().byId("miconconf_01");

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
    var oComboBox = sap.ui.getCore().byId("mtestMode01");
    var oFileLabel = sap.ui.getCore().byId("mfilela_01");
    var oCsvFile = sap.ui.getCore().byId("mcsvfile_01");
    var oMCountries = sap.ui.getCore().byId("momcountries_01");
    var oMCountriesLabel = sap.ui.getCore().byId("momcountriesL_01");
    var oExecButton = sap.ui.getCore().byId("mexebutton_01");
    var oExecButtonLabel = sap.ui.getCore().byId("mexebuttonL_01");
    var oIconConfiguration = sap.ui.getCore().byId("miconconf_01");
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
      oExecButton.setVisible(false);
      oExecButtonLabel.setVisible(true);
    }
  },
  _authenticate(pass, user, company, url) {
    that.ping(pass, user, company, url);

  },
  onTestRun(event) {
    // check if test execution countries were selected.

    if ((this.selected_countries.length > 0) & (this.selected_test.length > 0)) {
  //    var busyDialog4 = (busyDialog4) ? busyDialog4 : new sap.m.BusyDialog('busy4',{text:'Fetching JSON Data', title: 'Loading'});
      var busyDialog4 = sap.ui.getCore().byId("mrun");
        busyDialog4.setText("Running the test in SuccessFactors");
				busyDialog4.open()
				jQuery.ajax({
					url: "http://itunes.apple.com/search?term=yelp&country=us&entity=software",
					dataType: 'jsonp',
					async:false,
					type: 'GET',
					success:function(jsonData) {
						console.log(jsonData)
						busyDialog4.close()
						},
					error:function(jqXHR, exception) {
						console.log(textStatus)
						busyDialog4.close()
					}
				})

      // loop in the countries
      // Loop in the testcases.
      // run the testcases
      // activate a dialog window with information about the test.

    } else {
      sap.m.MessageBox.show(
        "Select countries to test and the scenarios for the smoked test.", {
          icon: sap.m.MessageBox.Icon.ERROR,
          title: "The Test Configuration is Incomplete",
          actions: [sap.m.MessageBox.Action.CLOSE],
          onClose: function(oAction) {
            / * do something * /
          }
        }
      );
    }

    // find the the selected test scenarios

    for (i = 0; i < this.selected_test.length; i++) {
      tmpInt = parseInt(this.selected_test[i], 10);
      console.log(this.getView().getModel("mocked").oData.Mocked[tmpInt].testId);
    }
  },
  onLinesSelect(event) {



    for (i = 0; i < event.getParameters().listItems.length; i++) {
      //    console.log(event.getParameters().listItems[i].oBindingContexts.mocked.oModel);
      //      console.log(event.getParameters().selected);
      var ind = event.getParameters().listItems[i].oBindingContexts.mocked.sPath
      ind = ind.substr(ind.length - 1, ind.length);
      //      console.log(ind)
      if (event.getParameters().selected === true) {
        this.selected_test.push(ind);
      } else {
        //      console.log(String(this.selected_test.indexOf(ind)));
        this.selected_test.splice(String(this.selected_test.indexOf(ind)), 1);
      }
      // get the chosen selections
      //  event.getParameters().listItems[i].oBindingContexts.sPath

    }


    var oTmpList = [];
    oTmpList = this.selected_test;
    //     this.selected_test = [];
    for (i = 0; i <= oTmpList.length; i++) {
      //     var  inTmpIt;
      //   inTmpIt = int(oTmpList[1])

      //   console.log(event.getParameters().listItems[inTmpIt].oBindingContexts.mocked.oModel);
      console.log(oTmpList[i]);
    };

    console.log(this.selected_test);





    // 1. check the quantity of items chosen by checking the listItems and the selected flag.

  },
  oCountSelected(event) {

    this.selected_countries = event.getSource().mProperties.selectedKeys;
    console.log(this.selected_countries);
  },
  runTest() {

  },
  wait(msec) {

    var start = new Date().getTime();
    var end = start;
    while (end < start + msec) {
      end = new Date().getTime();
    }

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
