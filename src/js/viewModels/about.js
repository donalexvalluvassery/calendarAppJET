define(['knockout', 'ojs/ojknockouttemplateutils', 'ojs/ojmodel', 'ojs/ojcollectiondataprovider'],
    function(ko, KnockoutTemplateUtils, model, CollectionDataProvider)
    {
        function viewModel() {
            var self = this;
            self.KnockoutTemplateUtils = KnockoutTemplateUtils;
            self.serviceURL = 'http://localhost:8080/meetings?username=donalex&startdate=2020-8-28+12%3A00%3A00&enddate=2020-11-31+12%3A00%3A00';
            self.Departments = ko.observableArray([]);
            self.DeptCol = ko.observable();
            self.dataProvider = ko.observable();

            self.fetch = function(successCallBack) {
                // populate the collection by calling fetch()
                self.DeptCol().fetch({
                    success: successCallBack,
                    error: function(jqXHR, textStatus, errorThrown){
                        console.log('Error in fetch: ' + textStatus);
                    }
                });
            };

            function parseMeet(response) {
                if (response['']) {
                    var innerResponse = response[''][0];
                    // if (innerResponse.links.Employees == undefined) {
                    //     var empHref = '';
                    // } else {
                    //     empHref = innerResponse.links.Employees.href;
                    // }
                    return {DepartmentId: innerResponse['meetingId'],
                        DepartmentName: innerResponse['meetingName'],
                       };
                }
                return {
                    DepartmentId: response['meetingId'],
                    DepartmentName: response['meetingName'],
                };
            }

            var Meeting = model.Model.extend({
                urlRoot: self.serviceURL,
                parse: parseMeet,
                idAttribute: 'meetingId'
            });

            var myDept = new Meeting();
            var DeptCollection = model.Collection.extend({
                url: self.serviceURL + "?limit=50",
                model: myDept,
            });

            self.DeptCol(new DeptCollection());
            self.dataProvider(new CollectionDataProvider(self.DeptCol()));

        };
        return {'meetingVM': viewModel};
    }
)