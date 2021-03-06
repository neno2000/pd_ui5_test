jQuery.sap.require("sap.ui.layout.form.SimpleForm");
jQuery.sap.require("sap.ui.unified.FileUploader");
$.sap.require("sap.ui.table.Table");

sap.ui.jsview("ui5bp.view.Regression", {


  getControllerName: function() {
    return "ui5bp.controller.Regression";
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

    var oComboBox = new sap.m.ComboBox("testMode01", {

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
    var oPassword = new sap.m.Input("pass_01", {
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
    var oUserName = new sap.m.Input("user_01", {
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
    var oCompanyId = new sap.m.Input("company_01", {
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
    var oUrl = new sap.m.Input("url_01", {
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
    var oFileLabel = new sap.m.Label("filela_01", {
      text: "File to Upload:",
      visible: false,
      labelFor: oComboBox
    });

    var oCsvFile = new sap.ui.unified.FileUploader("csvfile_01", {
      visible: false,
      //    uploadOnChange: true,
      fileType: ["csv", "CSV"],
      icon: "sap-icon://upload",
      //      uploadComplete : [oController.onFileUpload, oController]
      change: [oController.onChangeUP, oController]
    });
    var oMCountries = new sap.m.MultiComboBox("omcountries_01", {
      visible: false,
      items: {
        path: "countries>/countries",
        template: new sap.ui.core.Item({
          key: "{countries>name}",
          text: "{countries>name}"
        })
      }
    });
    var oMCountriesLabel = new sap.m.Label("omcountriesL_01", {
      visible: false,
      text: "Test in countries",
      labelFor: oMCountries
    });

    oForm2.addContent(oMCountriesLabel);
    oForm2.addContent(oMCountries);
    oForm2.addContent(oFileLabel);
    oForm2.addContent(oCsvFile);

    var oExecButton = new sap.m.Button("exebutton_01", {
      //    icon: "sap-icon://home",
      //    visible: ui5bp.app.config.LaunchpadMode,
      visible: false,
      text: "Check and Execute",
      tooltip: "Back to Start",
      press: [oController.onSubmit, oController]

    });
    var oExecButtonLabel = new sap.m.Label("exebuttonL_01", {
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
    var oTableConf = new sap.m.Table({
      mode: sap.m.ListMode.MultiSelect,
      includeItemInSelection: true,
      columns : col1,

    });
    var colItems = new sap.m.ColumnListItem({
      vAlign: "Middle",
      type: "{type}",
      cells: [
        new sap.m.Text({
          text: "{Mocked>testId}",
          wrapping: false
        }),
        new sap.m.Text({
          text: "{Mocked>scenario}",
          wrapping: false
        })
      ]
    });
    oTableConf.setHeaderToolbar(new sap.m.Toolbar("oTable001", {
      content: [
        new sap.m.Label({
          text: "Test configuration"
        }),
        new sap.m.ToolbarSpacer({}),
        new sap.m.Button("idPersonalizationButton", {
      //    icon: "sap-icon://person-placeholder",
          text: "run test"
        })
      ]
    }));
    oTableConf.bindItems({
      path: "mocked>/Mocked",
      template: colItems

    });

    oForm1.addContent(oTableConf);


    var oIconConfiguration = new sap.m.IconTabBar("iconconf_01", {
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
      title: "Regression Test Selections",
      showNavButton: "{device>/isPhone}",
      navButtonPress: [oController.doNavBack, oController],
      content: [oIconSelection, oIconConfiguration],
      headerContent: [oBtnLaunchpad],
      footer: new sap.m.Bar({})
    });
  }

});
