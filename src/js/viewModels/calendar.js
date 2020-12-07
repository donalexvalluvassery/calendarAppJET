define(['knockout', 'ojs/ojbootstrap', 'ojs/ojconverterutils-i18n', 'ojs/ojknockout', 'ojs/ojdatetimepicker', 'ojs/ojlabel'],

    function (ko, Bootstrap, ConverterUtilsI18n)
    {

        function SimpleModel()
        {
            this.value = ko.observable(ConverterUtilsI18n.IntlConverterUtils.dateToLocalIso(new Date(2020, 10, 1)));


        }

            var simpleModel = new SimpleModel();
            return simpleModel;


    });