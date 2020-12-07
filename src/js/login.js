define(['knockout', 'ojs/ojbootstrap', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojlabel', 'ojs/ojlabelvalue','ojs/ojmessages'],
    function (ko, Bootstrap) {
        function SimpleModel() {
            this.value = ko.observable('Green');

        }

        Bootstrap.whenDocumentReady().then(function () {
            ko.applyBindings(new SimpleModel(), document.getElementById('div1'));
        });
    });