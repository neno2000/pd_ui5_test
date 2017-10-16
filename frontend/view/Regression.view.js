jQuery.sap.require("sap.ui.layout.form.SimpleForm");
jQuery.sap.require("sap.ui.unified.FileUploader");
sap.ui.jsview("ui5bp.view.Regression", {

  /**
   * Specifies the Controller belonging to this View. In the case that it is
   * not implemented, or that "null" is returned, this View does not have a
   * Controller.
   *
   * @memberOf view.NewFeatues-v122
   */
  getControllerName: function() {
    return "ui5bp.controller.Regression";
  },

  /**
   * Is initially called once after the Controller has been instantiated. It
   * is the place where the UI is constructed. Since the Controller is given
   * to this method, its event handlers can be attached right away.
   *
   * @memberOf view.NewFeatues-v122
   */
  createContent: function(oController) {
    var that = this;


    var oForm2 = new sap.ui.layout.form.SimpleForm({
      minWidth: 1024,
      maxContainerCols: 2,
      editable: true,
      layout: "ResponsiveGridLayout",
      //title           : "Other Controls",
      labelSpanL: 4,
      labelSpanM: 4,
      emptySpanL: 1,
      emptySpanM: 1,
      columnsL: 1,
      columnsM: 1
    });

    var oComboBox = new sap.m.ComboBox({

      placeholder: "Csv FileBased or Preconfigured Regression?",
      items: {
        path: "mode>/Mode",
        template: new sap.ui.core.Item({
          key: "{mode>name}",
          text: "{mode>name}"
        }),


      },
      selectionChange: function() {

        if (oComboBox.getSelectedKey() == "Filebased") {
          oFileLabel.setVisible(true);
          oCsvFile.setVisible(true);

        } else {
          oFileLabel.setVisible(false);
          oCsvFile.setVisible(false);
        }
      }
    });
    //		oComboBox.setSelectedItem(new sap.ui.core.Item({key : "001", text : "Filename"}));
    //		console.log(oComboBox.selectedKey);

    var oComboBoxLabel = new sap.m.Label({
      text: "Regression Mode:",
      labelFor: oComboBox
    });
    var oPassword = new sap.m.Input({
      type: sap.m.InputType.Password,
      placeholder: "Password"

    });
    var oUserName = new sap.m.Input({
      placeholder: "UserName"
    })
    var oCredentialLabel = new sap.m.Label({
      text: "SuccessFactor Credential:",
      labelFor: oUserName,
      oPassword
    });
    var oUrl = new sap.m.Input({
      placeholder: "SuccessFactor Url Address"
    })
    var oUrlLabel = new sap.m.Label({
      text: "SuccessFactor Url:",
      labelFor: oUrl
    });
    oForm2.addContent(oUrlLabel);
    oForm2.addContent(oUrl);

    oForm2.addContent(oCredentialLabel);
    oForm2.addContent(oUserName);
    oForm2.addContent(oPassword);

    oForm2.addContent(oComboBoxLabel);
    oForm2.addContent(oComboBox);

    // file upllad
    var oFileLabel = new sap.m.Label({
      text: "File to Upload:",
      visible: false,
      labelFor: oComboBox
    });

    var oCsvFile = new sap.ui.unified.FileUploader({
      visible: false,
      uploadOnChange: true,
      fileType: ["csv", "CSV"],
      uploadComplete: function(oEv) {

        var reader = new FileReader();
        console.log(reader);
        reader.onload(oEv){
          var strCSV = e.target.result;
        //  var arrCSV = strCSV.match(/[\w .]+(?=,?)/g);
          var noOfCols = 5;
        };

      }

    });

    oForm2.addContent(oFileLabel);
    oForm2.addContent(oCsvFile);

    var oExecButton = new sap.m.Button({
      //    icon: "sap-icon://home",
      //    visible: ui5bp.app.config.LaunchpadMode,
      text: "Check and Execute",
      tooltip: "Back to Start",
      press: function(ev) {
        alert("Here the code");
      }
    });


    var oExecButtonLabel = new sap.m.Label({
      text: "Check the file and execute the test",
      labelFor: oExecButton
    });
    oForm2.addContent(oExecButtonLabel);
    oForm2.addContent(oExecButton);


    var oIconTabBar = new sap.m.IconTabBar({
      items: [
        new sap.m.IconTabFilter({
          text: "Selections",

          content: [oForm2]
        })
      ],
      expandable: false,
      expanded: true,
    });


    var oBtnLaunchpad = new sap.m.Button({
      icon: "sap-icon://home",
      visible: ui5bp.app.config.LaunchpadMode,
      tooltip: "Back to Start",
      press: function(ev) {
        sap.ui.getCore().getEventBus().publish("nav", "backToPage", {
          id: "Launchpad"
        });
      }
    });

    return new sap.m.Page({
      title: "Regression Test Selections",
      showNavButton: "{device>/isPhone}",
      navButtonPress: [oController.doNavBack, oController],
      content: [oIconTabBar],
      headerContent: [oBtnLaunchpad],
      footer: new sap.m.Bar({})
    });
  }

});
