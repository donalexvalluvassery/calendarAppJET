/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojarraydataprovider', 'ojs/ojknockout', 'ojs/ojtable', 'ojs/ojgauge', 'ojs/ojtimezonedata',
        'ojs/ojvalidation-datetime', 'ojs/ojvalidation-number'],
    function(oj, ko, $, ArrayDataProvider) {

        function DashboardViewModel() {
            var self = this;

            var currentDate = new Date();

            self.thresholdValues = [{ "max": 0.33, "color": "#66B77D" }, { "max": 0.66, "color": "#F4D058" }, { "color": "#E66446" }];

            var invArray = [
                {
                    InvoiceId: 'MAR410', CustomerName: 'Treatley', InvoiceDate: oj.IntlConverterUtils.dateToLocalIso((new Date()).setDate(currentDate.getDate() - 1)),
                    PaymentDueDate: oj.IntlConverterUtils.dateToLocalIso((new Date()).setDate(currentDate.getDate() + 9)), GrandTotal: 70.35, Risk: ko.observable(0.4),
                    CustomerId: '21'
                },
                {
                    InvoiceId: 'MAR409', CustomerName: 'Veggius', InvoiceDate: oj.IntlConverterUtils.dateToLocalIso((new Date()).setDate(currentDate.getDate() - 20)),
                    PaymentDueDate: oj.IntlConverterUtils.dateToLocalIso((new Date()).setDate(currentDate.getDate() + 0)), GrandTotal: 54.51, Risk: ko.observable(0.7),
                    CustomerId: '8'
                },
                {
                    InvoiceId: 'MAR408', CustomerName: 'Beetro', InvoiceDate: oj.IntlConverterUtils.dateToLocalIso((new Date()).setDate(currentDate.getDate() - 3)),
                    PaymentDueDate: oj.IntlConverterUtils.dateToLocalIso((new Date()).setDate(currentDate.getDate() + 3)), GrandTotal: 40.75, Risk: ko.observable(0.3),
                    CustomerId: '11'
                },
                {
                    InvoiceId: 'MAR407', CustomerName: 'Feasthouse', InvoiceDate: oj.IntlConverterUtils.dateToLocalIso((new Date()).setDate(currentDate.getDate() - 0)),
                    PaymentDueDate: oj.IntlConverterUtils.dateToLocalIso((new Date()).setDate(currentDate.getDate() + 4)), GrandTotal: 81.46, Risk: ko.observable(0.9),
                    CustomerId: '4'
                },
                {
                    InvoiceId: 'MAR406', CustomerName: 'Lemonini', InvoiceDate: oj.IntlConverterUtils.dateToLocalIso((new Date()).setDate(currentDate.getDate() - 10)),
                    PaymentDueDate: oj.IntlConverterUtils.dateToLocalIso((new Date()).setDate(currentDate.getDate() - 5)), GrandTotal: 372.75, Risk: ko.observable(0.33),
                    CustomerId: '13'
                }];

            self.dataprovider = new ArrayDataProvider(invArray, { keyAttributes: 'InvoiceId' });

            self.columnArray = [{
                "headerText": "Invoice ID",
                "field": "InvoiceId"
            },
                {
                    "headerText": "Customer Name",
                    "field": "CustomerName"
                },
                {
                    "headerText": "Invoice Date",
                    "field": "InvoiceDate",
                    "template": "dateTemplate"
                },
                {
                    "headerText": "Payment Due Date",
                    "field": "PaymentDueDate",
                    "template": "dateTemplate"
                },
                {
                    "headerText": "Grand Total",
                    "field": "GrandTotal",
                    "template": "amountTemplate"
                },
                {
                    "headerText": "Risk",
                    "field": "Risk",
                    "template": "riskCellTemplate"
                }];

            var dateConverterFactory = oj.Validation.converterFactory("datetime");
            self.dateConverter = dateConverterFactory.createConverter();

            self.constructNumberConverter = function () {
                var options = { style: "currency", currency: "USD", currencyDisplay: "symbol" };
                var numberConverterFactory = oj.Validation.converterFactory("number");
                return numberConverterFactory.createConverter(options);
            }

            self.numberConverter = self.constructNumberConverter();

            // Below are a set of the ViewModel methods invoked by the oj-module component.
            // Please reference the oj-module jsDoc for additional information.

            /**
             * Optional ViewModel method invoked after the View is inserted into the
             * document DOM.  The application can put logic that requires the DOM being
             * attached here.
             * This method might be called multiple times - after the View is created
             * and inserted into the DOM and after the View is reconnected
             * after being disconnected.
             */
            self.connected = function() {
                // Implement if needed
            };

            /**
             * Optional ViewModel method invoked after the View is disconnected from the DOM.
             */
            self.disconnected = function() {
                // Implement if needed
            };

            /**
             * Optional ViewModel method invoked after transition to the new View is complete.
             * That includes any possible animation between the old and the new View.
             */
            self.transitionCompleted = function() {
                // Implement if needed
            };
        }

        /*
         * Returns a constructor for the ViewModel so that the ViewModel is constructed
         * each time the view is displayed.  Return an instance of the ViewModel if
         * only one instance of the ViewModel is needed.
         */
        return new DashboardViewModel();
    }
);
