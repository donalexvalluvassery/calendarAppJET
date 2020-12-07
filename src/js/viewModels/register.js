define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojlabel','ojs/ojbutton'],
    function (oj, ko, $)
    {

        function RegisterModel()
        {
            const Url= "http://localhost:8080/account";

            this.userName = ko.observable("");
            this.password = ko.observable("");
            this.firstName = ko.observable("");
            this.lastName = ko.observable("");
            this.email = ko.observable("");
            this.registerButton = ko.observable("");


            this.registerClick = function(){
                const data={
                    "userName": this.userName(),
                    "firstName": this.firstName(),
                    "lastName": this.lastName(),
                    "email": this.email(),
                    "password": this.password()
                }
                $.ajax({
                    url: Url,
                    type: 'PUT',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function(data) {
                        alert('User registered.');
                        document.getElementById('register').reset();
                        window.location.href= "/?ojr=login";
                    },
                    error: function (){
                        alert('User not registered');
                    }
                });
            }

        }
        ;

        var registerModel = new RegisterModel();
        return registerModel;

    });