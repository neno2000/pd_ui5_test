//jQuery.sap.require("backend.Utils");
sap.ui.controller("ui5bp.controller.Regression", {

  /**
   * Called when a controller is instantiated and its View controls (if available) are already created.
   * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
   * @memberOf view.NewFeatures-v122
   */
  onInit: function() {
    jQuery.sap.require("sap.ui.model.json.JSONModel");
    this.reader = new FileReader();
    /*
    var input = {
    		date1   : new Date(),
    		date2   : new Date(new Date().getTime() + 1000*60*60*24*7),
    		myDrink : "",
    		takeAway : ""
    };
    var model = new sap.ui.model.json.JSONModel(input);
    sap.ui.getCore().setModel(model, "input");
    this.getView().setModel(model, "input");
    */
    //this.getView().setModel(new sap.ui.model.json.JSONModel(input), "input");
    this.getView().setModel(new sap.ui.model.json.JSONModel("model/regrChoice.json"), "mode");
    this.bus = sap.ui.getCore().getEventBus();
  },

  doNavBack: function(event) {
    console.log("back");
    this.bus.publish("nav", "back");
  },
  onChange: function(event) {
    console.log("The event got fired");
  },
  onSubmit: function() {
    alert("Hello World!");
    aloha();
  },

  onFileUpload: function(event){

    //  this.reader.readAsText(oCsvFile.oFileUpload.files[0])
     console.log(event);
    // var fLoad = this.getView().byId(1001);
    // console.log(fLoad);

  }


  /**
   * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
   * (NOT before the first rendering! onInit() is used for that one!).
   * @memberOf view.NewFeatures-v122
   */
  //	onBeforeRendering: function() {
  //
  //	},

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
