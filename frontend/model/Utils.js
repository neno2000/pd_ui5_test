sap.ui.define(['sap/ui/core/UIComponent'

], function(UIComponent) {
  "use strict";
  return UIComponent.extend("ui5bp.model.Utils", {

    constructor: function() {
    //  that = this;
      this.toggle = false;
      var that = this;



    },
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
  //        "postman-token": "4ee2a6d1-8629-2c1e-9a69-98ce91deb501"
        }
      }
      var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog({text:'Checking Credentials', title: 'Loading'});
      busyDialog.open()
      $.ajax(settings).done(function(response, xhr) {
        that.toggle = true;
      }).fail(function(response,  xhr){
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
    }
  });
});
