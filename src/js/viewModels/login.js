define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojarraydataprovider', 'ojs/ojmessages', 'ojs/ojinputtext', 'ojs/ojlabel','ojs/ojbutton'],
    function (oj, ko, $)
    {

        function LoginModel()
        {
            const Url= "http://152.67.161.137:8080/login";

            this.userName = ko.observable("");
            this.password = ko.observable("");

            this.loginClick = function(){
                var self = this;
                const data={
                    "userName" : this.userName(),
                    "password" : this.password()
                };

                    $.ajax({
                        url: Url,
                        type: 'POST',
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        success: function (data) {
                            // alert('User logged in.');
                            console.log(data);
                            sessionStorage.setItem("username",self.userName());
                            window.location.href= "/?ojr=incidents";

                        },
                        error: function () {
                            alert('Invalid Login');
                        }
                    });
            }

        }
        ;

        var loginModel = new LoginModel();
        return loginModel;

    });