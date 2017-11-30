sap.ui.define(['sap/ui/core/UIComponent'

], function(UIComponent) {
  "use strict";
  return UIComponent.extend("ui5bp.model.Utils", {

    constructor: function() {
      //  that = this;
      this.toggle = false;
      var that = this;
    },
    /*
    ###############################################################################
    The same Odata call lets create a function
    ###############################################################################
    */

    settings(url, user, company, pass, mode) {
      var auth = user + "@" + company + ":" + pass;
      var _auth = btoa(auth) + "\"";
      var res = "\"async\": " + mode + ",\n\"crossDomain\": true, \n\"url\": \"https://api12preview.sapsf.eu/odata/v2/upsert\",\n\"method\": \"POST\",\n\"headers\": \{\n\"authorization\": \"Basic " + _auth + ",\n\"content-type\": \"application/json\",\n\"accept\": \"application/json\",\n\"cache-control\": \"no-cache\"\n\},\n\"processData\": false,";
      return res
    },

    /*
    ###############################################################################
    Odata Metadata Call (Ping)
    ###############################################################################
    */
    ping(pass, user, company, url) {
      var endPoint = url + "/odata/v2/?%24metadata=";
      var auth = user + "@" + company + ":" + pass;
      var auth64 = "Basic " + btoa(auth);
      var settings = {
        "async": false,
        "crossDomain": true,
        "url": endPoint,
        "method": "GET",
        "headers": {
          "authorization": auth64,
          "content-type": "application/json",
          "accept": "application/json",
          "cache-control": "no-cache",
        }
      }
      var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog({
        text: 'Checking Credentials',
        title: 'Loading'
      });
      busyDialog.open()
      $.ajax(settings).done(function(response, xhr) {
        that.toggle = true;
      }).fail(function(response, xhr) {
        //  alert(xhr + " check credentials or endpoint parameters")
        sap.m.MessageBox.show(
          "Verify the Credentials or SF Url", {
            icon: sap.m.MessageBox.Icon.ERROR,
            title: "Wrong Credentials",
            actions: [sap.m.MessageBox.Action.CLOSE],
            onClose: function(oAction) {
              / * do something * /
            }
          }
        );
        that.toggle = false;
      });
      this.toggle = that.toggle;
      busyDialog.close()
    },
    /*
    ###############################################################################
    Calling scenario T1001
    ###############################################################################
    */
    //New hire as an employee in Future
    T1001(oUrl, oPassword, oUserName, oCompany, inCountry, oPrefix) {
      var oMode = false; var isPrimaryBoolean = false;
      var auth = that.settings(oUrl, oUserName, oCompany, oPassword, oMode);
      that.sfUser(oUrl, auth, inCountry, oPrefix);
      var rStartDate, rOrigStartDate;
      var x = 2; //or whatever offset
      var CurrentDate = new Date();
      rStartDate = rOrigStartDate = CurrentDate.setMonth(CurrentDate.getMonth() + x);
      var rUser = that.user; var rName = that.userName;
      var placeOfBirth = "";
      if (inCountry === "FR") {
        placeOfBirth = "Lyon";
      } else if (inCountry === "GB") {
        placeOfBirth === "Manchester";
      }

      if (rUser !== "error") {
        var rDate = "765158400000"; //The employee born in 1994
        that.sfPerson(auth, rUser, inCountry, rDate, placeOfBirth, rName);
      };
      if (that.httpCode === 200 || that.httpCode === 201) {
        //EmpEmployment
        that.sfEmployment(auth, rUser, inCountry, rStartDate, rOrigStartDate, isPrimaryBoolean, rName);

      };
      console.log(that.httpCode);
      if (that.httpCode === 200 || that.httpCode === 201) {
        //Empjob
        that.sfEmpjob(auth, startDate, userId,  businessUnit, eventReason, managerId, jobCode, company)
      }
    },
    /*
    ###############################################################################
    Odata PerNational Call
    ###############################################################################
    */
    sfPerNational(auth) {
      var settings = "{" + auth +
        "\n\"data\": \"{\r\n    \r\n\"__metadata\": {\r\n\"uri\": \"PerNationalId\",\"type\": \"SFOData.PerNationalId\"},\"personIdExternal\": \"random00102\",\"cardType\": \"Numéro de Sécurité Sociale\",\"country\": \"FRA\",\"isPrimary\": true,\"nationalId\": \"124567897654444\",\"attachmentId\": null,\"notes\": null}\"" +
        "}"
      $.ajax(settings).done(function(response) {
        console.log(response);
      });

    },

    /*
    ###############################################################################
    Odata PerPersonal Call
    ###############################################################################
    */
    sfPerPersonal(auth, userId, startDate, gender, lastName, firstName, nationality) {
      var _userId = "'" + userId + "'";
      var __userId = "\"" + userId + "\"";
      var _startDate = new Date(startDate); // YYYY-MM-DDTHH:MM:SS
      _startDate = _startDate.toISOString();
      _startDate = "'" + _startDate + "'";
      var _gender = "\"" + gender + "\"";
      var _lastName = "\"" + lastName + "\"";
      var _firstName = "\"" + firstName + "\"";
      var _nationality = "\"" + nationality + "\"";
      var _genter = "\"" + gender + "\"";
      var _lastName = "\"" + lastName + "\"";
      var _firstName = "\"" + firstName + "\"";
      var _nationality = "\"" + nationality + "\"";
      var settings = "{" + auth +
        "\"data\": \"{\"__metadata\":{\"uri\": \"PerPersonal(personIdExternal=" + _userId + ",startDate=datetime" + _startDate + ")\",\"type\": \"SFOData.PerPersonal\"},\"personIdExternal\":" + __userId + ",\"gender\": " + _gender + ",\"lastName\": " + lastName + ",\"firstName\": " + firstName + ",\"nationality\": " + _nationality + "}\"" +
        "}";
      $.ajax(settings).done(function(response) {
        console.log(response);
      });
    },
    /*
    ###############################################################################
    Odata EmpJob Call
    ###############################################################################
    */
    sfEmpjob(auth, startDate, userId, businessUnit, eventReason, managerId, jobCode, company) {
      var _userId = "\\\"" + userId + "\\\"";
      var _businessUnit = "\\\"" + businessUnit + "\\\"";
      var _eventReason = "\\\"" + eventReason + "\\\"";
      var _managerId = "\\\"" + managerId + "\\\"";
      var _jobCode = "\\\"" + jobCode + "\\\"";
      var _company = "\\\"" + company + "\\\"";

      var settings = "{" + auth +
        "\"data\": \"{\\\"__metadata\\\":{\\\"uri\\\": \\\"EmpJob\\\"},\"startDate\\\": \\\"/Date(" + startDate + ")/\\\",\"userId\\\":"
        + _userId + ",\\\"businessUnit\\\":" + _businessUnit + ",\\\"eventReason\\\": " + _eventReason + ",\\\"managerId\\\": " +
        _managerId + ",\\\"jobCode\\\": " + _jobCode + ",\\\"company\":" + company + "}\"" +
        "}";
      var settings = JSON.Parse(settings);  //cast to JSON
      $.ajax(settings).done(function(response) {
        console.log("#####SUCCESS#####");
        console.log("##### EmpJob #####");
        that.httpCode = response.d[0].httpCode;
        console.log(response);
      }).fail(function(response, xhr) {
        //  alert(xhr + " check credentials or endpoint parameters")
        console.log("#####FAIL#####");
        console.log("##### EmpJob #####");
        sap.m.MessageBox.show(
          "Not able to Create a SF EmpJob Info", {
            icon: sap.m.MessageBox.Icon.ERROR,
            title: "Contact the system Administrator",
            actions: [sap.m.MessageBox.Action.CLOSE],
            onClose: function(oAction) {
              / * do something * /
              that.user = "Error";
              that.httpCode = response.d[0].httpCode;
            }
          }
        );

      });
    },
    /*
    ###############################################################################
    Odata EmpEmployment Call
    ###############################################################################
    */
    sfEmployment(auth, rUser, rCountry, rStartDate, rOrigStartDate, isPrimaryBoolean, rName) {
      // prepare the data for the call
      var _rUser = "\\\"" + rUser + "\\\"";  //user id
      var _rName = "\\\"" + rName + "\\\"";  //user Name
      var _rCountry = "\\\"" + rCountry + "\\\"";
      var _rStartdate = "\\\"" + rStartDate + "\\\"";
      var _rOrigStartDate = "\\\"" + rOrigStartDate + "\\\"";
      var _isPrimaryBoolean = "\\\"" + _isPrimaryBoolean + "\\\"";
      var settings = "{" + auth +
        "\"data\": \"{\\\"__metadata\\\": {\\\"uri\\\": \\\"EmpEmployment\\\",\\\"type\\\": \\\"SFOData.EmpEmployment\\\"},\\\"personIdExternal\\\":" +_rName  + ",\\\"userId\\\":" +  _rUser+ ",\\\"startDate\\\": \\\"/Date(" +
        rStartDate + ")/\\\",\\\"originalStartDate\\\": \\\"/Date(" + rOrigStartDate + ")/\\\",\\\"isPrimary\\\":" + isPrimaryBoolean + "}\"" +
        "}";
      var settings = JSON.parse(settings);
      $.ajax(settings).done(function(response) {
        console.log("#####SUCCESS#####");
        console.log("####### PerEmployment ####");
        console.log(response);
        that.httpCode = response.d[0].httpCode;
      }).fail(function(response, xhr) {
        //  alert(xhr + " check credentials or endpoint parameters")
        console.log("#####FAIL#####");
        console.log("####### PerEmployment ####");
        sap.m.MessageBox.show(
          "Not able to Create a SF EmpEmployment Info", {
            icon: sap.m.MessageBox.Icon.ERROR,
            title: "Contact the system Administrator",
            actions: [sap.m.MessageBox.Action.CLOSE],
            onClose: function(oAction) {
              / * do something * /
              that.user = "Error";
              that.httpCode = response.d[0].httpCode;
            }
          }
        );

      });
    },
    /*
    ###############################################################################
    Odata PerPerson Call
    ###############################################################################
    */
    sfPerson(auth, rUser, rCountry, rDate, placeOfBirth, rName) {
      if (rCountry == "FR") {
        rCountry = "FRA";
      } else if (rCountry == "GB") {
        rCountry = "GBR";
      } else {
        rCountry = "error";
      }
      var _placeOfBirth = "\\\"" + placeOfBirth + "\\\"";
      var _rCountry = "\\\"" + rCountry + "\\\"";
      var settings = "{" + auth +
        "\"data\": \"{\\\"__metadata\\\": {\\\"uri\\\": \\\"PerPerson('" + rUser + "')\\\", \\\"type\\\": \\\"SFOData.PerPerson\\\" },\\\"personIdExternal\\\": \\\"" + rName + "\\\",\\\"customDate1\\\": \\\"/Date(" +
        rDate + ")/\\\",\\\"countryOfBirth\\\": " + _rCountry + ",\\\"placeOfBirth\\\":" + _placeOfBirth + "}\"" +
        "}";
      //console.log(settings);
      settings = JSON.parse(settings);
      console.log(settings);
      $.ajax(settings).done(function(response) {
        console.log("#####SUCCESS#####");
        console.log("####### PerPerson ####");
        that.httpCode = response.d[0].httpCode;
        console.log(response);
      }).fail(function(response, xhr) {
        //  alert(xhr + " check credentials or endpoint parameters")
        console.log("#####FAIL#####");
        console.log("####### PerPerson ####");
        sap.m.MessageBox.show(
          "Not able to Create a SF Personal Info", {
            icon: sap.m.MessageBox.Icon.ERROR,
            title: "Contact the system Administrator",
            actions: [sap.m.MessageBox.Action.CLOSE],
            onClose: function(oAction) {
              / * do something * /
              that.user = "Error";
              that.httpCode = response.d[0].httpCode;
            }
          }
        );

      });
    },
    /*
    ###############################################################################
    Odata User Call
    ###############################################################################
    */
    sfUser(oUrl, auth, ctry, oUsPrefix) {
      //this.upUrl = this.url + "/odata/v2/upsert";
      var randomUser = Math.floor(Math.random() * 2000000000);
      var _randomUser = "\\\"" + randomUser + "\\\"";
      var randomName = "\\\"" + oUsPrefix + randomUser + "\\\"";
      var userUrl = "\\\"" + "User('" + randomUser + "')\\\"";
      var settings = "\{" + auth +

        "\"data\": \"\{\\\"__metadata\\\":\{\\\"uri\\\": " + userUrl + ", \\\"type\\\": \\\"SFOData.User\\\"\},\\\"username\\\": "
        + randomName + ", \\\"status\\\" : \\\"active\\\",\\\"userId\\\":" + _randomUser + "\}\"" +
        "\}";
      settings = JSON.parse(settings); // convert to JSON!!!
        console.log(settings);
      $.ajax(settings).done(function(response, data, xhr) {
        if (response.d[0].httpCode === 200 || response.d[0].httpCode === 201) {
          that.user = response.d[0].key;
          that.userName = oUsPrefix + response.d[0].key;
        }
        console.log("#####SUCCESS#####");
        console.log("####### User ####");


        //  var c_date = "/Date(765158400000)/" // 1994
      }).fail(function(response, xhr) {
        //  alert(xhr + " check credentials or endpoint parameters")
        console.log("#####FAIL#####");
        console.log("####### User ####");
        sap.m.MessageBox.show(
          "Not able to create a SF user", {
            icon: sap.m.MessageBox.Icon.ERROR,
            title: "Contact the system Administrator",
            actions: [sap.m.MessageBox.Action.CLOSE],
            onClose: function(oAction) {
              / * do something * /
              that.user = "Error";
            }
          }
        );

      });
    },
    kolla() {
      return "Hello"
    }
  });
});
