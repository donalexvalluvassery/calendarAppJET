define(['knockout', 'ojs/ojbootstrap', 'ojs/ojarraydataprovider', 'ojs/ojbufferingdataprovider', 'ojs/ojknockout-keyset','ojs/ojconverterutils-i18n', 'ojs/ojanimation', 'ojs/ojpopup', 'ojs/ojcontext', 'ojs/ojknockout', 'ojs/ojinputtext',
        'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojlabel', 'ojs/ojvalidationgroup', 'ojs/ojformlayout', 'ojs/ojtoolbar','ojs/ojformlayout','ojs/ojmessages','ojs/ojdatagrid','ojs/ojbutton','ojs/ojdatetimepicker','ojs/ojgauge','promise','ojs/ojtimeline','ojs/ojlistitemlayout','ojs/ojlistview'],
    function (ko, Bootstrap, ArrayDataProvider, BufferingDataProvider, keySet,ConverterUtilsI18n, AnimationUtils)
    {
        const Url= "http://localhost:8080/meetings";
        const deleteUrl="http://localhost:8080/update"
        var userName= sessionStorage.getItem("username");
        console.log(userName);
        function ViewModel() {
            var self=this;
            self.selectedYear=ko.observable(2020);
            self.startYear=ko.observable();
            self.endYear=ko.observable();
            self.viewPort=ko.observable();
            self.startYear(self.selectedYear()+'-01-01');
            self.endYear(self.selectedYear()+'-12-31');
            self.viewPort(self.selectedYear()+'-11-29');
            this.meetName = ko.observable("");
            this.meetDate = ko.observable(ConverterUtilsI18n.IntlConverterUtils.dateToLocalIso(new Date()));
            this.meetId = ko.observable("");
            this.hosts = ko.observable("");
            this.users = ko.observable("");
            self.time = ko.observable("");
            this.userName = ko.observable("");
            self.newDate = ko.observable();
            self.thresholdValues = [{ "max": 0, "color": "#66B77D" }, { "max":1, "color": "#0080ff" }];
            self.active=ko.observable();
            self.active(true);
            self.initial=ko.observable();
            self.initial(true);
            self.textActive=ko.observable();
            self.initial(true);
            var dataObservableArray= new ko.observableArray;
            var userObservableArray= new ko.observableArray;
            self.dataprovider = ko.observable();
            self.timeDataProvider = ko.observable();
            self.userprovider = ko.observable();
            self.userprovider(new ArrayDataProvider(userObservableArray, {
                keyAttributes: 'userName'
            }));
            var itemData;
            self.selectionValue = ko.observableArray();
            self.selectedItems = new keySet.ObservableKeySet();
            self.dataprovider(new ArrayDataProvider(dataObservableArray, {
                keyAttributes: 'meetingId',
                implicitSort: [{attribute: 'timestamp', direction: 'ascending'}]
            }));
            this.value = ko.observable(ConverterUtilsI18n.IntlConverterUtils.dateToLocalIso(new Date()));
            this.format = function(x){
                return +x;
            }
            this.timeFormat = function (x){
                arr=x.split("T");
                ar2=arr[1].split("Z");
                return ar2[0];
            }
            this.dateFormat = function(x){
                arr=x.split("Z");
                return arr[0];
            }
            this.dateViewFormat = function(x){
                arr=x.split("Z");
                arr=arr[0].split("T");
                return arr[1].slice(0,5);
            }

            this.hostColour = function (x){
                if(x) {
                    return "https://i.ibb.co/d5jP0hT/blue.png";
                }
                else {
                    return "https://i.ibb.co/CPpDMDr/green.png";
                }
            }

            //begin list view
            this.currentIndex;
            this.currentItem = ko.observable('');
            this.allItems = ko.observableArray([{ id: 1, item: 'Milk' },
                { id: 2, item: 'Flour' },
                { id: 3, item: 'Sugar' },
                { id: 4, item: 'Vanilla Extract' }
            ]);
            this.selectedItems = new keySet.ObservableKeySet();
            var lastItemId = this.allItems().length;
            this.isTextEmpty = ko.observable(true);
            this.isSelectionEmpty = ko.computed(function () {
                return this.selectedItems().values().size === 0;
            }, this);
            self.isTextOrSelectionEmpty = ko.computed(function () {
                return this.isTextEmpty() || this.isSelectionEmpty();
            }, this);



            this.addItem = function () {
                var itemToAdd = this.currentItem();
                if ((itemToAdd !== '')) {
                    lastItemId++;
                    this.allItems.push({ id: lastItemId, item: itemToAdd });
                }
                this.currentItem(''); // Clear the text box
            }.bind(this);

            this.removeSelected = function () {
                this.selectedItems().values().forEach(function (id) {
                    this.allItems.remove(function (item) {
                        return (item.id === id);
                    });
                }.bind(this));
            }.bind(this);

            this.handleCurrentItemChanged = function (event) {
                var key = event.detail.value;
                var items = this.allItems();
                for (var i = 0; i < items.length; i++) {
                    if (items[i].id === key) {
                        this.currentIndex = i;
                        this.currentItem(items[i].item);
                        break;
                    }
                }
            }.bind(this);

            this.handleRawValueChanged = function (event) {
                var value = event.detail.value;
                this.isTextEmpty(value.trim().length === 0);
            }.bind(this);
            //end list view

            //begin tooltip
            // Tooltip elem for items
            var tooltipElem = document.createElement('div');

            // Add custom text
            var textDiv = document.createElement('div');
            textDiv.style.cssFloat = 'left';
            textDiv.style.padding = '10px 8px 10px 3px';
            tooltipElem.appendChild(textDiv);

            var assignmentText = document.createElement('span');
            assignmentText.style.fontWeight = 'bold';
            // textDiv.appendChild(assignmentText);
            //
            // textDiv.appendChild(document.createElement('br'));

            var startTimeText = document.createElement('span');
            textDiv.appendChild(startTimeText);

            textDiv.appendChild(document.createElement('br'));

            var meetingId = document.createElement('span');
            textDiv.appendChild(meetingId);

            textDiv.appendChild(document.createElement('br'));

            var hostname = document.createElement('span');
            textDiv.appendChild(hostname);

            textDiv.appendChild(document.createElement('br'));

            this.tooltipFunction = function(dataContext)
            {
                // Set a thick border for the data item tooltip
                dataContext.parentElement.style.borderWidth = "4px";
                var itemData = dataContext.data;
                var seriesData = dataContext.seriesData;
                assignmentText.textContent = itemData.label;
                startTimeText.textContent = "Meeting Time: "+itemData.description;
                // Return the elem and the chart will append it to the parentElement
                meetingId.textContent = "Meeting ID: "+itemData.shortDesc;
                hostname.textContent = "Host: "+itemData.end;
                return {'insert':tooltipElem};
            };


            //end tooltip
            console.log(this.value._latestValue);
            var res=this.value._latestValue.split("T");
            self.dayStart=res[0] + " 00:00:01";
            self.dayEnd=res[0] + " 23:59:59";
            this.value.subscribe(
                function(){
                    res=self.value._latestValue.split("T");
                    self.dayStart=res[0] + " 00:00:01";
                    self.dayEnd=res[0] + " 23:59:59";
                    self.active(true);
                    console.log(self.dayStart,self.dayEnd);
                    $.ajax({
                        url: Url,
                        type: 'GET',
                        data: {username: userName, startdate: self.dayStart, enddate: self.dayEnd},
                        success: function (data) {
                            console.log(data);
                            dataObservableArray = ko.observableArray(data);
                            self.objJSON = data;
                            self.dataprovider(new ArrayDataProvider(dataObservableArray, {
                                keyAttributes: 'meetingId',
                                implicitSort: [{attribute: 'timestamp', direction: 'ascending'}]
                            }));
                            //to populate timeline
                            self.timeDataProvider(new ArrayDataProvider(dataObservableArray, {
                                keyAttributes: 'meetingId'
                            }));
                        },
                        error: function () {
                            alert('Invalid Date Range');
                        }
                    });});
            function request(){
                $.ajax({
                url: Url,
                type: 'GET',
                data: {username: userName, startdate: self.selectedYear()+"-01-01 00:00:00", enddate: self.selectedYear()+"-12-31 00:00:00"},
                success: function (data) {
                    console.log(data);
                    dataObservableArray = ko.observableArray(data);
                    self.objJSON = data;
                    self.dataprovider(new ArrayDataProvider(dataObservableArray, {
                        keyAttributes: 'meetingId',
                        implicitSort: [{attribute: 'timestamp', direction: 'ascending'}]
                    }));
                    //to populate timeline
                    self.timeDataProvider(new ArrayDataProvider(dataObservableArray, {
                        keyAttributes: 'meetingId'
                    }));
                },
                error: function () {
                    alert('Invalid Date Range');
                }
            });}
            request();
            //start change year
            self.addYear = function (event){
                self.selectedYear(self.selectedYear()+1);
                $.ajax({
                    url: Url,
                    type: 'GET',
                    data: {username: userName, startdate: self.selectedYear()+"-01-01 00:00:00", enddate: self.selectedYear()+"-12-31 00:00:00"},
                    success: function (data) {
                        console.log(data);
                        dataObservableArray = ko.observableArray(data);
                        self.objJSON = data;
                        //to populate timeline
                        self.timeDataProvider(new ArrayDataProvider(dataObservableArray, {
                            keyAttributes: 'meetingId'
                        }));
                        self.startYear(self.selectedYear()+'-01-01');
                        self.endYear(self.selectedYear()+'-12-31');
                        self.viewPort(self.selectedYear()+'-11-29');
                    },
                    error: function () {
                        alert('Invalid Date Range');
                    }
                });
            }
            self.minusYear = function (event){
                self.selectedYear(self.selectedYear()-1);
                $.ajax({
                    url: Url,
                    type: 'GET',
                    data: {username: userName, startdate: self.selectedYear()+"-01-01 00:00:00", enddate: self.selectedYear()+"-12-31 00:00:00"},
                    success: function (data) {
                        console.log(data);
                        dataObservableArray = ko.observableArray(data);
                        self.objJSON = data;
                        self.dataprovider(new ArrayDataProvider(dataObservableArray, {
                            keyAttributes: 'meetingId',
                            implicitSort: [{attribute: 'timestamp', direction: 'ascending'}]
                        }));
                        //to populate timeline
                        self.timeDataProvider(new ArrayDataProvider(dataObservableArray, {
                            keyAttributes: 'meetingId'
                        }));
                        self.startYear(self.selectedYear()+'-01-01');
                        self.endYear(self.selectedYear()+'-12-31');
                        self.viewPort(self.selectedYear()+'-11-29');
                        document.getElementById('timeline').refresh();
                    },
                    error: function () {
                        alert('Invalid Date Range');
                    }
                });

            }
            //end change year
            self.selectedRows = new keySet.ObservableKeySet();
            self.selectionInfo = ko.observable('');
            this.selectionValue.subscribe(function (event) {
                self.initial(false);
                var selectionText = '';
                selectionText+=event[0];
                self.tempKey=event[0];
                console.log(self.selectionValue());
                console.log(self.tempKey);
                self.meetingId = selectionText;
                selectionText = 'Meeting Id: ' + selectionText;
                self.userName = "";
                self.selectionInfo(selectionText);
                // $.ajax({
                //     url: deleteUrl,
                //     type: 'GET',
                //     data: {username: userName, meetid: self.meetingId},
                //     success: function (data) {
                //         console.log(data);
                //         if(data=="true")self.active=="true";
                //         else self.active=="false";
                //     },
                //     error: function () {
                //         alert('Failed to fetch user type');
                //     }
                // });

                for(let key in self.objJSON){
                    if(self.objJSON[key].meetingId==self.tempKey) {
                        datauser = self.objJSON[key].users;
                        self.datahost = self.objJSON[key].host;
                    }
                }
                console.log(datauser);
                if(self.datahost){
                    self.active(false);
                }else {
                    self.active(true);
                }
                userObservableArray = ko.observableArray(datauser);
                self.userprovider(new ArrayDataProvider(userObservableArray, {
                    keyAttributes: 'userName'
                }));


            });

            this.userChangedListener = function(event){

                selectionText =event.detail.value;
                self.tempKey=event.detail.value;
                self.userName=event.detail.value;
                console.log(self.userName);

            };
            this.deleteClick = function(event, data, bindingContext)
            {
                var flag=0;
                dataObservableArray.remove(function (item) {
                    item.host==true?flag=1:flag=0;
                    return item.meetingId == self.meetingId && item.host==true; });
                if(flag){
                    $.ajax({
                        url: Url,
                        type: 'DELETE',
                        data: {meetid: self.meetingId},
                        success: function (data) {
                            console.log(data);
                        },
                        error: function () {
                            alert('Meeting Not Deleted');
                        }
                    });}
                console.log(dataObservableArray);
            };
            this.startAnimationListener = function (event) {
                var ui = event.detail;
                if (event.target.id !== 'popup1') { return; }

                if (ui.action === 'open') {
                    event.preventDefault();
                    var options = { direction: 'top' };
                    AnimationUtils.slideIn(ui.element, options).then(ui.endCallback);
                } else if (ui.action === 'close') {
                    event.preventDefault();
                    ui.endCallback();
                }
            };
            this.openListener = function () {
                var popup = document.getElementById('popup1');
                popup.open('#btnGo');
            };
            this.cancelListener = function () {
                var popup = document.getElementById('popup1');
                popup.close();
                console.log(self.hosts());
            };
            this.createListener = function () {
                var popup = document.getElementById('popup1');
                hostsObj=[];
                usersObj=[];
                var listH=self.hosts().split(/[ ,]+/);
                var listU=self.users().split(/[ ,]+/);
                for(i=0;i<listH.length;i++){
                    item = {};
                    item["userName"]= listH[i];
                    hostsObj.push(item);
                }
                for(i=0;i<listU.length;i++){
                    item = {};
                    item["userName"]= listU[i];
                    usersObj.push(item);
                }
                const data={
                    "host": "true",
                    "meetingName": self.meetName(),
                    "meetingId": self.meetId(),
                    "hosts": hostsObj,
                    "users": usersObj,
                    "timestamp": self.time()
                }
                $.ajax({
                    url: Url,
                    type: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function(data) {
                        dataObservableArray.push(data);
                    },
                    error: function (){
                        alert('Meeting not created');
                    }
                });
                document.getElementById('editform').reset();
                popup.close();
            };
            this.openEditor = function () {
                var popup = document.getElementById('popup2');
                popup.open('#btnEdit');
            };
            this.cancelEditor = function () {
                var popup = document.getElementById('popup2');
                popup.close();
                console.log(self.hosts());
            };
            this.deleteUser = function(){
                userObservableArray.remove(function (item) {
                    return item.userName == self.userName; });
                var data={
                    "userName": self.userName,
                    "meetId": self.meetingId
                }
                $.ajax({
                    url: deleteUrl,
                    type: 'DELETE',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function (data) {
                        console.log(data);
                    },
                    error: function () {
                        alert('User Not Deleted');
                    }
                });
            };
            this.addUser = function(){
                var popup = document.getElementById('popup3');

                popup.open('#btnAddUser');
            };
            this.cancelAddUser = function(){
                var popup = document.getElementById('popup3');
                popup.close();
            }
            this.addInnerUser = function (){
                var popup = document.getElementById('popup3');
                var data={
                    "userName": self.userName,
                    "meetId": self.meetingId
                }
                $.ajax({
                    url: deleteUrl,
                    type: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function(data) {
                        userObservableArray.push(data);
                        document.getElementById('inneruserform').reset();
                        popup.close();
                    },
                    error: function (){
                        alert('User not added');
                    }
                });
                var popup = document.getElementById('popup3');
                document.getElementById('adduserform').reset();
                popup.close();
            }

            this.openTime = function(){
                var popup = document.getElementById('popup4');
                popup.open('#btnTime');
            }
            this.addNewTime = function (){
                var popup = document.getElementById("popup4");
                arr=self.newDate().split("T");
                res=arr[0]+" "+arr[1];
                var data={
                    date : res,
                    meetid : self.meetingId
                }
                console.log(data);
                $.ajax({
                    url: deleteUrl,
                    type: 'GET',
                    data: data,
                    success: function(data) {
                        dataObservableArray.remove(function (item) {
                            return item.meetingId == self.meetingId});
                        $.ajax({
                            url: Url,
                            type: 'GET',
                            data: {username: userName, startdate: self.selectedYear()+"-01-01 00:00:00", enddate: self.selectedYear()+"-12-31 00:00:00"},
                            success: function (data) {
                                console.log(data);
                                dataObservableArray = ko.observableArray(data);
                                self.objJSON = data;
                                //to populate timeline
                                self.timeDataProvider(new ArrayDataProvider(dataObservableArray, {
                                    keyAttributes: 'meetingId'
                                }));
                            },
                            error: function () {
                                alert('Invalid Date Range');
                            }
                        });
                        console.log(data);
                    },
                    error: function (){
                        alert('Schedule not changed');
                    }
                });
                popup.close();
            }
            this.cancelNewTime = function (){
                var popup = document.getElementById('popup4');
                popup.close();
            }
            //begin context menu
            this.selectedMenuItem = ko.observable('(None selected yet)');
            var itemTitle;
            this.beforeOpenFunction = function (event)
            {
                var target = event.detail.originalEvent.target;
                var context = document.getElementById('timeline').getContextByNode(target);
                if (context != null && context.subId == 'oj-timeline-item')
                {
                    var itemIndex = context['itemIndex'];
                    itemTitle = itemData[itemIndex]['title'];
                }
            }.bind(this);
            this.menuItemAction = function (event)
            {
                var text = event.target.textContent;
                if (itemTitle)
                {
                    this.selectedMenuItem(text + ' from ' + itemTitle);
                    itemTitle = null;
                }
                else {
                    this.selectedMenuItem(text + ' from timeline background');
                }
            }.bind(this);
            //end context menu
            //begin timeline
            var currentDate = ConverterUtilsI18n.IntlConverterUtils.dateToLocalIso(new Date());
            this.referenceObjects = [{value: currentDate}];
            setInterval(request,1000 * 60 * 2);

        }
        return new ViewModel();
    });