jQuery.sap.require("sap.ui.layout.form.SimpleForm");
jQuery.sap.require("sap.ui.unified.FileUploader");
$.sap.require("sap.ui.table.Table");

sap.ui.jsview("ui5bp.view.Mocked", {


  getControllerName: function() {
    return "ui5bp.controller.Mocked";
  },


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

    var oComboBox = new sap.m.ComboBox("mtestMode01", {

      placeholder: "Csv FileBased or Preconfigured Regression?",
      items: {
        path: "mode>/Mode",
        template: new sap.ui.core.Item({
          key: "{mode>name}",
          text: "{mode>name}"
        }),


      },
      change: [oController.onSelectionChange, oController]

    });

    var oComboBoxLabel = new sap.m.Label({
      text: "Regression Mode:",
      labelFor: oComboBox
    });
    var oPassword = new sap.m.Input("mpass_01", {
      type: sap.m.InputType.Password,
      placeholder: "Password",
      required: true,
      change: function() {
        if (this.getValue() === "") {
          this.setValueState(sap.ui.core.ValueState.Error);
        } else {
          this.setValueState(sap.ui.core.ValueState.None);
        }
      }

    });
    var oUserName = new sap.m.Input("muser_01", {
      placeholder: "UserName",
      required: true,
      change: function() {
        if (this.getValue() === "") {
          this.setValueState(sap.ui.core.ValueState.Error);
        } else {
          this.setValueState(sap.ui.core.ValueState.None);
        }
      }
    })
    var oCredentialLabel = new sap.m.Label({
      text: "SuccessFactors Credential:",
      labelFor: oUserName,
      oPassword
    });
    var oCompanyId = new sap.m.Input("mcompany_01", {
      placeholder: "Company Id",
      required: true,
      change: function() {
        if (this.getValue() === "") {
          this.setValueState(sap.ui.core.ValueState.Error);
        } else {
          this.setValueState(sap.ui.core.ValueState.None);
        }
      }
    });
    var oUrl = new sap.m.Input("murl_01", {
      placeholder: "SuccessFactors Url Address",
      required: true,
      change: function() {
        if (this.getValue() === "") {
          this.setValueState(sap.ui.core.ValueState.Error);
        } else {
          this.setValueState(sap.ui.core.ValueState.None);
        }
      }
    });
    var oUrlLabel = new sap.m.Label({
      text: "SuccessFactor Url:",
      labelFor: oUrl,
      oCompanyId
    });


    oForm2.addContent(oUrlLabel);
    oForm2.addContent(oUrl);
    oForm2.addContent(oCompanyId);
    oForm2.addContent(oCredentialLabel);
    oForm2.addContent(oUserName);
    oForm2.addContent(oPassword);
    oForm2.addContent(oComboBoxLabel);
    oForm2.addContent(oComboBox);

    // file upllad
    var oFileLabel = new sap.m.Label("mfilela_01", {
      text: "File to Upload:",
      visible: false,
      labelFor: oComboBox
    });

    var oCsvFile = new sap.ui.unified.FileUploader("mcsvfile_01", {
      visible: false,
      //    uploadOnChange: true,
      fileType: ["csv", "CSV"],
      icon: "sap-icon://upload",
      //      uploadComplete : [oController.onFileUpload, oController]
      change: [oController.onChangeUP, oController]
    });
    var oMCountries = new sap.m.MultiComboBox("momcountries_01", {
      visible: false,
      items: {
        path: "countries>/countries",
        template: new sap.ui.core.Item({
          key: "{countries>name}",
          text: "{countries>name}"
        })
      }
    });
    var oMCountriesLabel = new sap.m.Label("momcountriesL_01", {
      visible: false,
      text: "Test in countries",
      labelFor: oMCountries
    });

    oForm2.addContent(oMCountriesLabel);
    oForm2.addContent(oMCountries);
    oForm2.addContent(oFileLabel);
    oForm2.addContent(oCsvFile);

    var oExecButton = new sap.m.Button("mexebutton_01", {
      //    icon: "sap-icon://home",
      //    visible: ui5bp.app.config.LaunchpadMode,
      visible: false,
      text: "Check and Execute",
      tooltip: "Back to Start",
      press: [oController.onSubmit, oController]

    });
    var oExecButtonLabel = new sap.m.Label("mexebuttonL_01", {
      visible: false,
      text: "Test Run",
      labelFor: oExecButton
    });
    oForm2.addContent(oExecButtonLabel);
    oForm2.addContent(oExecButton);
    ///*******************
    ///*******************
    var oForm1 = new sap.ui.layout.form.SimpleForm({
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

    var col1 = [
      new sap.m.Column({
        header: new sap.m.Label({
          text: "Test Id"
        })
      }),
      new sap.m.Column({
        header: new sap.m.Label({
          text: "Test Scenario"
        })
      })
    ];


    // instantiate the table
    var oTableConf = new sap.m.Table("mockTable01", {
      mode: sap.m.ListMode.MultiSelect,
      includeItemInSelection: true,
      columns : col1
  //    selectionChange: [oController.onLinesSelect, oController]

    });
    var colItems = new sap.m.ColumnListItem("mColItems", {
      vAlign: "Middle",
      type: "{type}",
      cells: [
        new sap.m.Text({
          text: "{mocked>testId}",
          wrapping: false
        }),
        new sap.m.Text({
          text: "{mocked>scenario}",
          wrapping: false
        })
      ],
      itemPress: function(event){
        console.log("another event");
        console.log(event.getParameters(listItem));
      }
    });
    oTableConf.setHeaderToolbar(new sap.m.Toolbar({
      content: [
        new sap.m.Label( {
          text: "People Data Smoked Test"
        }),
        new sap.m.ToolbarSpacer({}),
        new sap.m.Button("midPersonalizationButton", {
          icon: "sap-icon://activities",
          tooltip: "run the test",
          text: "run test",
          press: [oController.onTestRun, oController]

        })
      ],
      onSelectionChange: function(event) {
       alert(event.getSource().getSelectedItem().getBindingContext().getObject().Name);
             console.log(JSON.stringify(event.getSource().getSelectedItem().getBindingContext().getObject()));
      }
    }));
    oTableConf.bindItems({
      path: "mocked>/Mocked",
      template: colItems

    });

    oForm1.addContent(oTableConf);


    var oIconConfiguration = new sap.m.IconTabBar("miconconf_01", {
      items: [
        new sap.m.IconTabFilter({
          text: "Preconfiguration",

          content: [oForm1]
        })
      ],
      expandable: false,
      expanded: true,
      visible: false,
    });

    var oIconSelection = new sap.m.IconTabBar({
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
      title: "Mocked Test Selections",
      showNavButton: "{device>/isPhone}",
      navButtonPress: [oController.doNavBack, oController],
      content: [oIconSelection, oIconConfiguration],
      headerContent: [oBtnLaunchpad],
      footer: new sap.m.Bar({})
    });
  }

});
