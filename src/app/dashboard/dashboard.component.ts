import { Component, OnInit, Input } from '@angular/core';
//import { Router } from '@angular/router';
import { User } from '../_models/index';
import { Dropbox } from '../_models/index';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { UserService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';
import { NumberValueAccessor } from '@angular/forms/src/directives';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    model: any = {};
    loading = false;
    loadinggif: boolean = false;
    selectedFiles: FileList;
    currentFileUpload: File;
    progress: { percentage: number } = { percentage: 0 };
    uploadPk: string;

    showFile = false
    fileUploads: Observable<string[]>
    @Input() fileUpload: string;

    user: User;
    // stateList=['Tamil Nadu','Karnadaka','Karala','Delhi'];
    countryList: any = {};//[];
    stateList: any = {};
    cityList: any = {};
    resList: any = {};
    categorylist: any = {};
    loadStateList: any = {};
    loadcategorylist: any = {};
    loadCountryList: any = {};//[];
    hotelList: any = {};

    allreservationList: any = {};
    myReservationList: any = {};
    showMyMemList: any = {};
    allMemList: any = {};
    allreslist: any = {};
    airlist = ['Select', 'Malindo air group', 'Others'];
    companyList: any = {};
    withdrawList: any = {};

    public dashboarddiv = true;
    public menu0 = false;
    // hotel reservation
    public menu1 = false;
    // ticketing div
    public tickdiv = false;
    // tour and travl div
    public turtradiv = false;
    public financialdiv = false;
    public educationdiv = false;
    public insurancediv = false;
    public medicaldiv = false;
    public healthaccessorydiv = false;
    public healthdiv = false;
    public umrahdiv = false;
    public softwarediv = false;
    public energysavediv = false;
    public companylistDIV = false;
    public categoryreg = false;
    public categorytableview = false;
    public categoryview = false;
    public categoryEdit = false;
    public companyEdit = false;
    public foodreserform = false;
    categoryRemove = 'none';
    categoryRemovesuccess = 'none';
    categoryRemovefail = 'none';
    companyinfo = 'none';
    companyRemove = 'none';
    companyRemovesuccess = 'none';
    companyRemovefail = 'none';
    imageuploadfail = 'none';
    imageuploadsuccess = 'none';
    successdialog = 'none';
    failuredialog = 'none';
    exsistdialog = 'none';
    foodreserView = 'none';
    ticketreserView = 'none';
    tourreserView = 'none';
    financereserView = 'none';
    educationreserView = 'none';
    insurancereserView = 'none';
    meditreatreserView = 'none';
    healthreserView = 'none';
    herbalreserView = 'none';
    umrahreserView = 'none';
    softhardreserView = 'none';
    energyreserView = 'none';
    rejectdialog = 'none';
    approvedialog = 'none';
    paymentDialog = 'none';
    noSearchinfo = 'none';
    noBookinfo = 'none';
    memberRemove = 'none';
    memberRemovesuccess = 'none';
    memberRemovefail = 'none';
    public imageUpload = false;
    public updateImage = false;
    // menu
    public menu2 = false;
    public menu3 = false;
    public menu4 = false;
    public menu5 = false;
    public menu6 = false;
    public menu7 = false;
    public menu8 = false;
    public menu9 = false;
    public menu10 = false;
    public menu11 = false;
    public menu12 = false;




    //isDisabled = false;
    // Menu div ID
    public mainmenu0 = false;
    public mainmenu1 = false;
    public mainmenu2 = false;
    public mainmenu3 = false;
    public mainmenu4 = false;
    public mainmenu5 = false;
    public mainmenu6 = false;
    public mainmenu7 = false;
    public mainmenu8 = false;
    public mainmenu9 = false;
    public mainmenu10 = false;
    public mainmenu11 = false;
    public mainmenu12 = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private uploadService: AuthenticationService
    ) {


    }

    ngOnInit() {
        //document.getElementById('load').style.visibility="hidden";
        // this.countryList= ['India','Chinna','Malaysia'];
        if (localStorage.getItem('currentusername') == null) {
            this.router.navigate(['/login']);
        }
        else {
            console.log("User role ---------------------->", localStorage.getItem('userRole'));
            if (localStorage.getItem('userRole') == "admin") {
                this.mainmenu0 = true;

                //this.mainmenu1 = true;
                this.mainmenu2 = true;
                this.mainmenu3 = true;
                this.mainmenu4 = true;
                this.mainmenu5 = true;
                this.mainmenu6 = true;
                this.mainmenu7 = true;
                this.mainmenu8 = true;
                this.mainmenu9 = true;
                this.mainmenu10 = true;
                this.mainmenu11 = true;
                this.mainmenu12 = true;
                this.clickDashboard();

            }

            if (localStorage.getItem('userRole') == "member") {
                this.mainmenu0 = true; // menu div
                //this.mainmenu1 = true;
                this.mainmenu2 = true;
                this.mainmenu3 = false;
                this.mainmenu4 = true;
                this.mainmenu5 = false;
                this.mainmenu6 = true;
                this.mainmenu7 = true;
                this.mainmenu8 = false;
                this.mainmenu9 = true;
                this.mainmenu10 = false;
                this.mainmenu11 = false;
                this.mainmenu12 = false;
                this.clickDashboard();
            }


            this.userService.loadCountry()
                .subscribe(
                    data => {
                        this.loadCountryList = data;
                    },
                    error => {
                        alert('Network issue please try again');
                    }
                );

            this.userService.getCountry()
                .subscribe(
                    data => {
                        this.countryList = data;
                    },
                    error => {
                        alert('Network issue please try again');
                    }
                );

        }

    }



    onCountryChoose() {
        this.userService.getState(this.model.selectedCountry)
            .subscribe(
                data => {
                    this.stateList = data;
                },
                error => {
                    alert('Network issue please try again');
                }
            );
    }


    onCategoryChoose() {
        this.userService.getCategoryList(this.model.selectedState)
            .subscribe(
                data => {
                    this.categorylist = data;
                },
                error => {
                    alert('Network issue please try again');
                }
            );
    }


    getHotel() {
        this.userService.getHotel(this.model)
            .subscribe(
                data => {
                    this.resList = data;
                },
                error => {
                    alert('Network issue please try again');
                }
            );
    }


    saveReserNext() {
        //alert("save next called.");
        console.log("Country name ---->" + this.model.selectedCountry);
        console.log("State name ---->" + this.model.selectedState);
        console.log("Category name ---->" + this.model.categoryname);
        this.getHotel();

        if (this.model.categoryname == 'Food and hotels') {
            this.menu0 = false;
            this.menu1 = true;
        }
        if (this.model.categoryname == 'Ticketing') {
            this.menu0 = false;
            this.tickdiv = true;
        }
        if (this.model.categoryname == 'Travel and Tour') {
            this.menu0 = false;
            this.turtradiv = true;

        }
        if (this.model.categoryname == 'Financial Solution') {
            this.menu0 = false;
            this.financialdiv = true;

        }
        if (this.model.categoryname == 'Education') {
            this.menu0 = false;
            this.educationdiv = true;

        }
        if (this.model.categoryname == 'Insurance') {
            this.menu0 = false;
            this.insurancediv = true;
        }
        if (this.model.categoryname == 'Medical Treatment') {
            this.menu0 = false;
            this.medicaldiv = true;
        }
        if (this.model.categoryname == 'Health Accessories') {
            this.menu0 = false;
            this.healthaccessorydiv = true;

        }
        if (this.model.categoryname == 'Umrah') {
            this.menu0 = false;
            this.umrahdiv = true;

        }
        if (this.model.categoryname == 'Herbal Product') {
            this.menu0 = false;
            this.healthdiv = true;

        }
        if (this.model.categoryname == 'Software And Hardware') {
            this.menu0 = false;
            this.softwarediv = true;

        }
        if (this.model.categoryname == 'Energy Saving') {
            this.menu0 = false;
            this.energysavediv = true;

        }

        //this.saveReservation();
    }
    saveReservation() {
        this.loadinggif = true;
        this.menu1 = false;
        this.foodreserform = false;
        var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
        this.userService.saveReservation(this.model, primaryKey)
            .subscribe(
                data => {
                    this.user = data;

                    if (this.user.status == "success") {
                        this.loadinggif = false;
                        this.menu1 = true;
                        this.successdialog = "block";
                        this.alertService.success("Successfully Saved data");
                        this.clickMenu1();
                    }
                    if (this.user.status == "failure") {
                        this.loadinggif = false;
                        this.menu1 = true;
                        this.failuredialog = "block";
                        this.alertService.success("Data is not stored please try again");
                        this.clickMenu1();

                    }
                },
                error => {
                    this.alertService.error(error);
                    this.loadinggif = false;
                    this.menu1 = true;
                    this.loading = false;
                });
    }

    onMenuClick(value: string): void {

        if (value == "home") {
            this.clickDashboard();
            //showLoader = false;
        }

        if (value == "menu0") {
            this.clickMenu0();
            //showLoader = false;
        }

        if (value == "back") {
            this.clickMenu0();
            //showLoader = false;
        }

        if (value == "menu1") {
            this.clickMenu1();
            //showLoader = false;
        }
        if (value == "menu2") {
            this.clickMenu2();
        }
        if (value == "menu3") {
            this.clickMenu3();
        }
        if (value == "menu4") {
            this.clickMenu4();
        }
        if (value == "menu5") {
            this.clickMenu5();
        }
        if (value == "menu6") {
            this.clickMenu6();
        }
        if (value == "menu7") {
            this.clickMenu7();
        }
        if (value == "menu8") {
            this.clickMenu8();
        }
        if (value == "menu9") {
            this.clickMenu9();
        }
        if (value == "menu10") {
            this.clickMenu10();
            //showLoader = false;
        }
        if (value == "menu11") {
            this.clickMenu11();
            //showLoader = false;
        }
        if (value == "menu12") {
            this.clickMenu12();
        }

    }

    clickDashboard() {
        this.loading = true;
        this.loadinggif = true;
        this.dashboarddiv = false;
        this.hotelList = '';

        this.userService.getCompanyInfo('Malaysia')
            .subscribe(
                data => {
                    // alert(data);
                    this.hotelList = data;
                    this.loading = false;
                    this.loadinggif = false;
                    this.dashboarddiv = true;
                },
                error => {
                    this.loading = false;
                    this.loadinggif = false;
                    this.dashboarddiv = true;
                    alert('Network issue please try again');
                }
            );

        this.menu0 = false;
        this.menu1 = false;
        this.menu2 = false;
        this.menu3 = false;
        this.menu4 = false;
        this.menu5 = false;
        this.menu6 = false;
        this.menu7 = false;
        this.menu8 = false;
        this.menu9 = false;
        this.menu10 = false;
        this.menu11 = false;
        this.menu12 = false;
        this.companylistDIV = false;
        this.tickdiv = false;
        this.turtradiv = false;
        this.financialdiv = false;
        this.educationdiv = false;
        this.insurancediv = false;
        this.medicaldiv = false;
        this.healthaccessorydiv = false;
        this.healthdiv = false;
        this.umrahdiv = false;
        this.softwarediv = false;
        this.energysavediv = false;
        this.categoryEdit = false;
        this.companyEdit = false;
        this.imageUpload = false;
        this.foodreserform = false;
        this.model.selectedCountry = '';
        this.model.selectedState = '';
        this.model.categoryname = '';
        this.model.cname = '';
        this.model.noofadult = '';
        this.model.noofchild = '';
        this.model.noofrooms = '';
    }

    getCompanyListDashboard() {
        console.log("Choosen Country for Dashbaord ---------------->" + this.model.selectedCountry);
        this.hotelList = '';
        this.loadinggif = true;
        this.dashboarddiv = false;
        this.userService.getCompanyInfo(this.model.selectedCountry)
            .subscribe(
                data => {
                    this.hotelList = data;
                    this.loadinggif = false;
                    this.dashboarddiv = true;
                },
                error => {
                    this.loadinggif = false;
                    this.dashboarddiv = true;
                    alert('Network issue please try again');
                }
            );
        this.companylistDIV = false;
        this.menu0 = false;
        this.menu1 = false;
        this.menu2 = false;
        this.menu3 = false;
        this.menu4 = false;
        this.menu5 = false;
        this.menu6 = false;
        this.menu7 = false;
        this.menu8 = false;
        this.menu9 = false;
        this.menu10 = false;
        this.menu11 = false;
        this.menu12 = false;
        this.foodreserform = false;
    }

    clickMenu10() {
        this.menu10 = true;
        this.dashboarddiv = false;
        this.menu0 = false;
        this.menu1 = false;
        this.menu2 = false;
        this.menu3 = false;
        this.menu4 = false;
        this.menu5 = false;
        this.menu6 = false;
        this.menu7 = false;
        this.menu8 = false;
        this.menu9 = false;
        this.menu11 = false;
        this.menu12 = false;
        this.categoryEdit = false;
        this.companylistDIV = false;
        this.tickdiv = false;
        this.turtradiv = false;
        this.financialdiv = false;
        this.educationdiv = false;
        this.insurancediv = false;
        this.medicaldiv = false;
        this.healthaccessorydiv = false;
        this.healthdiv = false;
        this.umrahdiv = false;
        this.softwarediv = false;
        this.energysavediv = false;
        this.companyEdit = false;
        this.imageUpload = false;
        this.foodreserform = false;
        this.model.selectedCountry = '';
        this.model.selectedState = '';
        this.model.categoryname = '';
        this.model.cname = '';
        this.model.noofadult = '';
        this.model.noofchild = '';
        this.model.noofrooms = '';
        this.model.description = '';
        this.model.phoneNumber = '';
        this.model.emailID = '';
    }

    clickMenu11() {
        this.menu11 = true;
        this.dashboarddiv = false;
        this.menu0 = false;
        this.menu1 = false;
        this.menu2 = false;
        this.menu3 = false;
        this.menu4 = false;
        this.menu5 = false;
        this.menu6 = false;
        this.menu7 = false;
        this.menu8 = false;
        this.menu9 = false;
        this.menu10 = false;
        this.menu12 = false;
        this.companylistDIV = false;
        this.tickdiv = false;
        this.turtradiv = false;
        this.financialdiv = false;
        this.educationdiv = false;
        this.insurancediv = false;
        this.medicaldiv = false;
        this.healthaccessorydiv = false;
        this.healthdiv = false;
        this.umrahdiv = false;
        this.softwarediv = false;
        this.energysavediv = false;
        this.categoryEdit = false;
        this.companyEdit = false;
        this.imageUpload = false;
        this.foodreserform = false;
        this.model.selectedCountry = '';
        this.model.selectedState = '';
        this.model.categoryname = '';
        this.model.cname = '';
        this.model.noofadult = '';
        this.model.noofchild = '';
        this.model.noofrooms = '';

    }
    clickMenu0() {
        this.dashboarddiv = false;
        this.menu0 = true;
        this.menu1 = false;
        this.menu2 = false;
        this.menu3 = false;
        this.menu4 = false;
        this.menu5 = false;
        this.menu6 = false;
        this.menu7 = false;
        this.menu8 = false;
        this.menu9 = false;
        this.menu10 = false;
        this.menu11 = false;
        this.menu12 = false;
        this.companylistDIV = false;
        this.tickdiv = false;
        this.turtradiv = false;
        this.financialdiv = false;
        this.educationdiv = false;
        this.insurancediv = false;
        this.medicaldiv = false;
        this.healthaccessorydiv = false;
        this.healthdiv = false;
        this.umrahdiv = false;
        this.softwarediv = false;
        this.energysavediv = false;
        this.categoryEdit = false;
        this.companyEdit = false;
        this.imageUpload = false;
        this.foodreserform = false;

        this.model.selectedCountry = '';
        this.model.selectedState = '';
        this.model.categoryname = '';
        this.model.bookingdate = '';
        this.model.bookingtime = '';
        this.model.noofTables = '';
        this.model.airname = '';
        this.model.departure = '';
        this.model.return = '';
        this.model.fromplace = '';
        this.model.toplace = '';
        this.model.noofpax = '';
        this.model.triptype = '';
        this.model.arrivaldate = '';
        this.model.visitcountry = '';
        this.model.category = '';
        this.model.appointmentdate = '';
        this.model.financialtime = '';
        this.model.university = '';
        this.model.study = '';
        this.model.yearofstudy = '';
        this.model.categoryinsurance = '';
        this.model.companyinsurance = '';
        this.model.hospitalname = '';
        this.model.medicaltime = '';
        this.model.treatment = '';
        this.model.categoryproduct = '';
        this.model.listproduct = '';
        this.model.quantity = '';
        this.model.companyname = '';
    }

    clickMenu1() {
        this.dashboarddiv = false;
        this.menu0 = false;
        this.menu1 = true;
        this.menu2 = false;
        this.menu3 = false;
        this.menu4 = false;
        this.menu5 = false;
        this.menu6 = false;
        this.menu7 = false;
        this.menu8 = false;
        this.menu9 = false;
        this.menu10 = false;
        this.menu11 = false;
        this.menu12 = false;
        this.companylistDIV = false;
        this.tickdiv = false;
        this.turtradiv = false;
        this.financialdiv = false;
        this.educationdiv = false;
        this.insurancediv = false;
        this.medicaldiv = false;
        this.healthaccessorydiv = false;
        this.healthdiv = false;
        this.umrahdiv = false;
        this.softwarediv = false;
        this.energysavediv = false;
        this.categoryEdit = false;
        this.companyEdit = false;
        this.imageUpload = false;
        this.foodreserform = false;
        this.model.selectedCountry = '';
        this.model.selectedState = '';
        this.model.categoryname = '';
        this.model.cname = '';
        this.model.noofadult = '';
        this.model.noofchild = '';
        this.model.noofrooms = '';
        this.model.noofTables = '';
        this.model.companyname = '';
        this.model.medicaltime = '';
        this.model.bookingdate = '';
        //this.model.bookingCode='';
    }

    clickMenu2() {
        this.model.categoryname = '';
        this.model.fromDate = '';
        this.model.toDate = '';

        this.userService.getAllCategoryList()
            .subscribe(
                data => {
                    this.loadcategorylist = data;
                },
                error => {
                });

        this.loadinggif = true;
        this.menu2 = false;
        this.userService.getMyReservationDetails(localStorage.getItem('userloginPrimaryKeyString'))
            .subscribe(
                data => {
                    this.myReservationList = data;
                    this.loadinggif = false;
                    this.menu2 = true;
                },
                error => {
                    this.loadinggif = false;
                    this.menu2 = true;
                    alert('Network issue please try again');
                }
            );
        this.dashboarddiv = false;
        this.menu0 = false;
        this.menu1 = false;
        this.menu3 = false;
        this.menu4 = false;
        this.menu5 = false;
        this.menu6 = false;
        this.menu7 = false;
        this.menu8 = false;
        this.menu9 = false;
        this.menu10 = false;
        this.menu11 = false;
        this.menu12 = false;
        this.companylistDIV = false;
        this.tickdiv = false;
        this.turtradiv = false;
        this.financialdiv = false;
        this.educationdiv = false;
        this.insurancediv = false;
        this.medicaldiv = false;
        this.healthaccessorydiv = false;
        this.healthdiv = false;
        this.umrahdiv = false;
        this.softwarediv = false;
        this.energysavediv = false;
        this.categoryEdit = false;
        this.companyEdit = false;
        this.imageUpload = false;
        this.foodreserform = false;
        this.model.airname = '';
        this.model.departure = '';
        this.model.returndate = '';
        this.model.fromplace = '';
        this.model.toplace = '';
        this.model.noofpax = '';
        this.model.triptype = '';
    }

    clickMenu3() {
        this.loadinggif = true;
        this.menu3 = false;
        this.userService.getAllReservationDetails()
            .subscribe(
                data => {
                    this.allreslist = data;
                    this.loadinggif = false;
                    this.menu3 = true;
                },
                error => {
                    this.loadinggif = false;
                    this.menu3 = true;
                    alert('Network issue please try again');
                }
            );
        this.dashboarddiv = false;
        this.menu0 = false;
        this.menu1 = false;
        this.menu2 = false;
        this.menu4 = false;
        this.menu5 = false;
        this.menu6 = false;
        this.menu7 = false;
        this.menu8 = false;
        this.menu9 = false;
        this.menu10 = false;
        this.menu11 = false;
        this.menu12 = false;
        this.companylistDIV = false;
        this.tickdiv = false;
        this.turtradiv = false;
        this.financialdiv = false;
        this.educationdiv = false;
        this.insurancediv = false;
        this.medicaldiv = false;
        this.healthaccessorydiv = false;
        this.healthdiv = false;
        this.umrahdiv = false;
        this.softwarediv = false;
        this.energysavediv = false;
        this.categoryEdit = false;
        this.companyEdit = false;
        this.imageUpload = false;
        this.foodreserform = false;
    }

    clickMenu4() {
        this.loadinggif = true;
        this.menu4 = false;
        this.userService.getMyMemberList(localStorage.getItem('memberNumber'))
            .subscribe(
                data => {
                    this.showMyMemList = data;
                    this.loadinggif = false;
                    this.menu4 = true;
                },
                error => {
                    this.loadinggif = false;
                    this.menu4 = true;
                    alert('Network issue please try again');
                }
            );
        this.dashboarddiv = false;
        this.menu0 = false;
        this.menu1 = false;
        this.menu2 = false;
        this.menu3 = false;
        this.menu5 = false;
        this.menu6 = false;
        this.menu7 = false;
        this.menu8 = false;
        this.menu9 = false;
        this.menu10 = false;
        this.menu11 = false;
        this.menu12 = false;
        this.companylistDIV = false;
        this.tickdiv = false;
        this.turtradiv = false;
        this.financialdiv = false;
        this.educationdiv = false;
        this.insurancediv = false;
        this.medicaldiv = false;
        this.healthaccessorydiv = false;
        this.healthdiv = false;
        this.umrahdiv = false;
        this.softwarediv = false;
        this.energysavediv = false;
        this.categoryEdit = false;
        this.companyEdit = false;
        this.imageUpload = false;
        this.foodreserform = false;
    }

    clickMenu5() {
        this.loadinggif = true;
        this.menu5 = false;
        this.userService.getAllMemberList("WaitingForApproval")
            .subscribe(
                data => {
                    this.allMemList = data;
                    this.loadinggif = false;
                    this.menu5 = true;
                },
                error => {
                    this.loadinggif = false;
                    this.menu5 = true;
                    alert('Network issue please try again');
                }
            );
        this.dashboarddiv = false;
        this.menu0 = false;
        this.menu1 = false;
        this.menu2 = false;
        this.menu3 = false;
        this.menu4 = false;
        this.menu6 = false;
        this.menu7 = false;
        this.menu8 = false;
        this.menu9 = false;
        this.menu10 = false;
        this.menu11 = false;
        this.menu12 = false;
        this.companylistDIV = false;
        this.tickdiv = false;
        this.turtradiv = false;
        this.financialdiv = false;
        this.educationdiv = false;
        this.insurancediv = false;
        this.medicaldiv = false;
        this.healthaccessorydiv = false;
        this.healthdiv = false;
        this.umrahdiv = false;
        this.softwarediv = false;
        this.energysavediv = false;
        this.categoryEdit = false;
        this.companyEdit = false;
        this.imageUpload = false;
        this.foodreserform = false;
    }
    clickMenu6() {
        this.loadinggif = true;
        this.menu6 = false;
        this.userService.getMyProfile(localStorage.getItem('userloginPrimaryKeyString'))
            .subscribe(
                data => {
                    //this.myProfilelist = data;
                    this.user = data;
                    this.loadinggif = false;
                    this.menu6 = true;
                },
                error => {
                    this.loadinggif = false;
                    this.menu6 = true;
                    alert('Network issue please try again');
                }
            );

        this.dashboarddiv = false;
        this.menu0 = false;
        this.menu1 = false;
        this.menu2 = false;
        this.menu3 = false;
        this.menu4 = false;
        this.menu5 = false;
        this.menu7 = false;
        this.menu8 = false;
        this.menu9 = false;
        this.menu10 = false;
        this.menu11 = false;
        this.menu12 = false;
        this.companylistDIV = false;
        this.tickdiv = false;
        this.turtradiv = false;
        this.financialdiv = false;
        this.educationdiv = false;
        this.insurancediv = false;
        this.medicaldiv = false;
        this.healthaccessorydiv = false;
        this.healthdiv = false;
        this.umrahdiv = false;
        this.softwarediv = false;
        this.energysavediv = false;
        this.categoryEdit = false;
        this.companyEdit = false;
        this.imageUpload = false;
        this.foodreserform = false;
    }

    getCompanyList() {
        this.companyList = '';
        this.loadinggif = true;
        this.menu11 = false;
        this.userService.getCountryInfo(this.model.selectedCountry, this.model.selectedState, this.model.categoryname)
            .subscribe(
                data => {
                    console.log("getCompanyList TS Called.");
                    this.companyList = data;
                    if (this.companyList.length == 0) {
                        this.loadinggif = false;
                        this.companylistDIV = false;
                        this.companyinfo = "block";
                        this.menu11 = true;
                    } else {
                        this.loadinggif = false;
                        this.companylistDIV = true;
                        this.menu11 = false;
                    }
                },
                error => {
                    this.loadinggif = false;
                    alert('Network issue please try again');
                }
            );

        this.dashboarddiv = false;
        this.menu0 = false;
        this.menu1 = false;
        this.menu2 = false;
        this.menu3 = false;
        this.menu4 = false;
        this.menu5 = false;
        this.menu6 = false;
        this.menu7 = false;
        this.menu8 = false;
        this.menu9 = false;
        this.menu10 = false;
        this.menu12 = false;
        this.tickdiv = false;
        this.turtradiv = false;
        this.financialdiv = false;
        this.educationdiv = false;
        this.insurancediv = false;
        this.medicaldiv = false;
        this.healthaccessorydiv = false;
        this.healthdiv = false;
        this.umrahdiv = false;
        this.softwarediv = false;
        this.energysavediv = false;
        this.categoryEdit = false;
        this.companyEdit = false;
        this.imageUpload = false;
        this.foodreserform = false;
    }

    clickMenu7() {
        this.loadinggif = true;
        this.menu7 = false;
        this.userService.getMyCommandOverInfo(localStorage.getItem('userloginPrimaryKeyString'))
            .subscribe(
                data => {
                    //this.myProfilelist = data;
                    this.loadinggif = false;
                    this.menu7 = true;
                    this.allMemList = data;
                },
                error => {
                    this.loadinggif = false;
                    this.menu7 = true;
                    alert('Network issue please try again');
                }
            );

        this.dashboarddiv = false;
        this.menu0 = false;
        this.menu1 = false;
        this.menu2 = false;
        this.menu3 = false;
        this.menu4 = false;
        this.menu5 = false;
        this.menu6 = false;
        this.menu8 = false;
        this.menu9 = false;
        this.menu10 = false;
        this.menu11 = false;
        this.menu12 = false;
        this.companylistDIV = false;
        this.tickdiv = false;
        this.turtradiv = false;
        this.financialdiv = false;
        this.educationdiv = false;
        this.insurancediv = false;
        this.medicaldiv = false;
        this.healthaccessorydiv = false;
        this.healthdiv = false;
        this.umrahdiv = false;
        this.softwarediv = false;
        this.energysavediv = false;
        this.categoryEdit = false;
        this.companyEdit = false;
        this.imageUpload = false;
        this.foodreserform = false;
    }
    clickMenu8() {
        this.loadinggif = true;
        this.menu8 = false;
        this.userService.getAllMemberList("All")
            .subscribe(
                data => {
                    this.allMemList = data;
                    this.loadinggif = false;
                    this.menu8 = true;
                },
                error => {
                    this.loadinggif = false;
                    this.menu8 = true;
                    alert('Network issue please try again');
                }
            );

        this.dashboarddiv = false;
        this.menu0 = false;
        this.menu1 = false;
        this.menu2 = false;
        this.menu3 = false;
        this.menu4 = false;
        this.menu5 = false;
        this.menu6 = false;
        this.menu7 = false;
        this.menu9 = false;
        this.menu10 = false;
        this.menu11 = false;
        this.menu12 = false;
        this.companylistDIV = false;
        this.tickdiv = false;
        this.turtradiv = false;
        this.financialdiv = false;
        this.educationdiv = false;
        this.insurancediv = false;
        this.medicaldiv = false;
        this.healthaccessorydiv = false;
        this.healthdiv = false;
        this.umrahdiv = false;
        this.softwarediv = false;
        this.energysavediv = false;
        this.categoryEdit = false;
        this.companyEdit = false;
        this.imageUpload = false;
        this.foodreserform = false;
    }

    clickMenu9() {
        this.userService.getAllWithdrawList("RequestingForWithdraw")
            .subscribe(
                data => {
                    this.withdrawList = data;
                    this.loadinggif = false;
                    this.menu9 = true;
                },
                error => {
                    this.loadinggif = false;
                    this.menu9 = true;
                    alert('Network issue please try again');
                }
            );
        this.dashboarddiv = false;
        this.menu0 = false;
        this.menu1 = false;
        this.menu2 = false;
        this.menu3 = false;
        this.menu4 = false;
        this.menu5 = false;
        this.menu6 = false;
        this.menu7 = false;
        this.menu8 = false;
        this.menu10 = false;
        this.menu11 = false;
        this.menu12 = false;
        this.companylistDIV = false;
        this.tickdiv = false;
        this.turtradiv = false;
        this.financialdiv = false;
        this.educationdiv = false;
        this.insurancediv = false;
        this.medicaldiv = false;
        this.healthaccessorydiv = false;
        this.healthdiv = false;
        this.umrahdiv = false;
        this.softwarediv = false;
        this.energysavediv = false;
        this.categoryEdit = false;
        this.companyEdit = false;
        this.imageUpload = false;
        this.foodreserform = false;
    }

    onWithdrawClick(memberCommition: number, memberOvrriding: number, memberID: string, primaryKey: number, requestType: string) {
        this.userService.getWithdrawApprove(memberCommition, memberOvrriding, memberID, primaryKey, requestType)
            .subscribe(
                ResAppRes => {
                    this.user = ResAppRes;
                    if (this.user.status == "rejectSuccess") {
                        this.rejectdialog = 'block';
                        this.clickMenu9();
                    }
                    if (this.user.status == "success") {
                        this.approvedialog = 'block';
                        this.clickMenu9();
                    }
                },
                error => {
                    alert('Network issue please try again');
                }
            );
    }


    onButtonClick(userloginPK: number, requestType: string) {
        this.userService.getApproved(userloginPK, requestType)
            .subscribe(
                approvedResponse => {
                    this.user = approvedResponse;
                    if (this.user.status == "rejectSuccess") {
                        this.rejectdialog = "block";
                        this.clickMenu5();
                    }

                    if (this.user.status == "success") {
                        this.approvedialog = "block";
                        this.clickMenu5();
                    }
                },
                error => {
                    alert('Network issue please try again');
                }
            );
    }

    reservationApprove(userloginPK: number, requestType: string) {
        this.userService.getApprovedForReservation(userloginPK, requestType)
            .subscribe(
                ResAppRes => {
                    this.user = ResAppRes;
                    if (this.user.status == "rejectSuccess") {
                        this.rejectdialog = 'block';
                        this.clickMenu3();
                    }

                    if (this.user.status == "success") {
                        this.approvedialog = 'block';
                        this.clickMenu3();
                    }
                },
                error => {
                    alert('Network issue please try again');
                }
            );
    }

    registerFile(event: any) {
        this.userService.getprimaryKey()
            .subscribe(
                data => {
                    this.user = data;
                    const file = event.target.files.item(0);
                    if (file.type.match('image.*')) {
                        this.selectedFiles = event.target.files;
                        this.uploadPk = this.user.userloginPrimaryKeyString;
                        this.progress.percentage = 0;
                        this.currentFileUpload = this.selectedFiles.item(0);
                        this.uploadService.saveImage(this.currentFileUpload, this.uploadPk).subscribe(event => {
                            if (event.type === HttpEventType.UploadProgress) {
                                this.progress.percentage = Math.round(100 * event.loaded / event.total);
                            } else if (event instanceof HttpResponse) {
                                console.log('File is completely uploaded!' + event.status);
                            }
                        });
                        this.selectedFiles = undefined;
                    } else {
                        alert('invalid format!');
                    }

                },
                error => {
                });
    }

    saveOrganization() {
        this.loadinggif = true
        this.menu10 = false;
        this.userService.saveOrganization(this.model)
            .subscribe(
                data => {
                    this.user = data;
                    if (this.user.status == "success") {
                        this.loadinggif = false;
                        this.menu10 = true;
                        this.successdialog = 'block';
                        this.clickMenu10();
                    }

                    if (this.user.status == "Exist") {
                        this.loadinggif = false;
                        this.menu10 = true;
                        this.exsistdialog = 'block';
                        this.clickMenu10();
                    }

                    if (this.user.status == "failure") {
                        this.loadinggif = false;
                        this.menu10 = true;
                        this.failuredialog = 'block';
                        this.clickMenu10();
                    }
                },
                error => {
                    this.loadinggif = false;
                    this.menu10 = true;
                    this.alertService.error('Network issue please try again');
                    // alert('Network issue please try again');
                }
            );


    }

    saveticketReservation() {
        this.loadinggif = true;
        this.tickdiv = false;
        var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
        this.userService.saveReservation(this.model, primaryKey)
            .subscribe(
                data => {
                    this.user = data;
                    console.log("Status --->", this.user.status);
                    if (this.user.status == "success") {
                        this.loadinggif = false;
                        this.tickdiv = true;
                        this.successdialog = 'block';
                        //this.alertService.error('Successfully Saved data');
                    }
                    if (this.user.status == "failure") {
                        this.loadinggif = false;
                        this.tickdiv = true;
                        this.failuredialog = 'block';
                        //this.alertService.error('Successfully not saved');                
                    }
                },
                error => {
                    this.loadinggif = false;
                    this.tickdiv = true;
                    this.alertService.error('Due to some Technical issue. Please try later');
                    this.loading = false;
                });
    }
    savetravelReservation() {
        this.loadinggif = true;
        this.turtradiv = false;
        var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
        this.userService.saveReservation(this.model, primaryKey)
            .subscribe(
                data => {
                    this.user = data;
                    console.log("Status --->", this.user.status);
                    if (this.user.status == "success") {
                        this.loadinggif = false;
                        this.turtradiv = true;
                        this.successdialog = 'block';
                        this.alertService.error('Successfully Saved data');
                    }
                    if (this.user.status == "failure") {
                        this.loadinggif = false;
                        this.turtradiv = true;
                        this.failuredialog = 'block';
                        this.alertService.error('Successfully not saved');
                    }
                },
                error => {
                    this.loadinggif = false;
                    this.turtradiv = true;
                    this.alertService.error('Due to some Technical issue. Please try later');
                    this.loading = false;
                });

    }
    savefinanancialReservation() {
        this.loadinggif = true;
        this.financialdiv = false;
        var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
        this.userService.saveReservation(this.model, primaryKey)
            .subscribe(
                data => {
                    this.user = data;
                    console.log("Status --->", this.user.status);
                    if (this.user.status == "success") {
                        this.loadinggif = false;
                        this.financialdiv = true;
                        this.successdialog = 'block';
                        this.alertService.error('Successfully Saved data');
                    }
                    if (this.user.status == "failure") {
                        this.loadinggif = false;
                        this.financialdiv = true;
                        this.failuredialog = 'block';
                        this.alertService.error('Successfully not saved');
                    }
                },
                error => {
                    this.loadinggif = false;
                    this.financialdiv = true;
                    this.alertService.error('Due to some Technical issue. Please try later');
                    this.loading = false;
                });
    }
    saveeducationReservation() {
        this.loadinggif = true;
        this.educationdiv = false;
        var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
        this.userService.saveReservation(this.model, primaryKey)
            .subscribe(
                data => {
                    this.user = data;
                    console.log("Status --->", this.user.status);
                    if (this.user.status == "success") {
                        this.loadinggif = false;
                        this.educationdiv = true;
                        this.successdialog = 'block';
                        this.alertService.error('Successfully Saved data');
                    }
                    if (this.user.status == "failure") {
                        this.loadinggif = false;
                        this.educationdiv = true;
                        this.failuredialog = 'block';
                        this.alertService.error('Successfully not saved');
                    }
                },
                error => {
                    this.loadinggif = false;
                    this.educationdiv = true;
                    this.alertService.error('Due to some Technical issue. Please try later');
                    this.loading = false;
                });
    }
    saveinsuranceReservation() {
        this.loadinggif = true;
        this.insurancediv = false;
        var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
        this.userService.saveReservation(this.model, primaryKey)
            .subscribe(
                data => {
                    this.user = data;
                    console.log("Status --->", this.user.status);
                    if (this.user.status == "success") {
                        this.loadinggif = false;
                        this.insurancediv = true;
                        this.successdialog = 'block';
                        this.alertService.error('Successfully Saved data');
                    }
                    if (this.user.status == "failure") {
                        this.loadinggif = false;
                        this.insurancediv = true;
                        this.failuredialog = 'block';
                        this.alertService.error('Successfully not saved');
                    }
                },
                error => {
                    this.loadinggif = false;
                    this.insurancediv = true;
                    this.alertService.error('Due to some Technical issue. Please try later');
                    this.loading = false;
                });
    }

    savemedicalReservation() {
        this.loadinggif = true;
        this.medicaldiv = false;
        var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
        this.userService.saveReservation(this.model, primaryKey)
            .subscribe(
                data => {
                    this.user = data;
                    console.log("Status --->", this.user.status);
                    if (this.user.status == "success") {
                        this.loadinggif = false;
                        this.medicaldiv = true;
                        this.successdialog = 'block';
                        this.alertService.error('Successfully Saved data');
                    }
                    if (this.user.status == "failure") {
                        this.loadinggif = false;
                        this.medicaldiv = true;
                        this.failuredialog = 'block';
                        this.alertService.error('Successfully not saved');
                    }
                },
                error => {
                    this.loadinggif = false;
                    this.medicaldiv = true;
                    this.alertService.error('Due to some Technical issue. Please try later');
                    this.loading = false;
                });
    }

    savehealthReservation() {
        this.loadinggif = true;
        this.healthaccessorydiv = false;
        var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
        this.userService.saveReservation(this.model, primaryKey)
            .subscribe(
                data => {
                    this.user = data;
                    console.log("Status --->", this.user.status);
                    if (this.user.status == "success") {
                        this.loadinggif = false;
                        this.healthaccessorydiv = true;
                        this.successdialog = 'block';
                        this.alertService.error('Successfully Saved data');
                    }
                    if (this.user.status == "failure") {
                        this.loadinggif = false;
                        this.healthaccessorydiv = true;
                        this.failuredialog = 'block';
                        this.alertService.error('Successfully not saved');
                    }
                },
                error => {
                    this.loadinggif = false;
                    this.healthaccessorydiv = true;
                    this.alertService.error('Due to some Technical issue. Please try later');
                    this.loading = false;
                });
    }

    saveherbalReservation() {
        this.loadinggif = true;
        this.healthdiv = false;
        var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
        this.userService.saveReservation(this.model, primaryKey)
            .subscribe(
                data => {
                    this.user = data;
                    console.log("Status --->", this.user.status);
                    if (this.user.status == "success") {
                        this.loadinggif = false;
                        this.healthdiv = true;
                        this.successdialog = 'block';
                        this.alertService.error('Successfully Saved data');
                    }
                    if (this.user.status == "failure") {
                        this.loadinggif = false;
                        this.healthdiv = true;
                        this.failuredialog = 'block';
                        this.alertService.error('Successfully not saved');
                    }
                },
                error => {
                    this.loadinggif = false;
                    this.healthdiv = true;
                    this.alertService.error('Due to some Technical issue. Please try later');
                    this.loading = false;
                });
    }

    saveumrahReservation() {
        this.loadinggif = true;
        this.umrahdiv = false;
        var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
        this.userService.saveReservation(this.model, primaryKey)
            .subscribe(
                data => {
                    this.user = data;
                    console.log("Status --->", this.user.status);
                    if (this.user.status == "success") {
                        this.loadinggif = false;
                        this.umrahdiv = true;
                        this.successdialog = 'block';
                        this.alertService.error('Successfully Saved data');
                    }
                    if (this.user.status == "failure") {
                        this.loadinggif = false;
                        this.umrahdiv = true;
                        this.failuredialog = 'block';
                        this.alertService.error('Successfully not saved');
                    }
                },
                error => {
                    this.loadinggif = false;
                    this.umrahdiv = true;
                    this.alertService.error('Due to some Technical issue. Please try later');
                    this.loading = false;
                });
    }

    savesoftwareReservation() {
        this.loadinggif = true;
        this.softwarediv = false;
        var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
        this.userService.saveReservation(this.model, primaryKey)
            .subscribe(
                data => {
                    this.user = data;
                    console.log("Status --->", this.user.status);
                    if (this.user.status == "success") {
                        this.loadinggif = false;
                        this.softwarediv = true;
                        this.successdialog = 'block';
                        this.alertService.error('Successfully Saved data');
                    }
                    if (this.user.status == "failure") {
                        this.loadinggif = false;
                        this.softwarediv = true;
                        this.failuredialog = 'block';
                        this.alertService.error('Successfully not saved');
                    }
                },
                error => {
                    this.loadinggif = false;
                    this.softwarediv = true;
                    this.alertService.error('Due to some Technical issue. Please try later');
                    this.loading = false;
                });
    }
    saveenergyReservation() {
        this.loadinggif = false;
        this.energysavediv = true;
        var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
        this.userService.saveReservation(this.model, primaryKey)
            .subscribe(
                data => {
                    this.user = data;
                    console.log("Status --->", this.user.status);
                    if (this.user.status == "success") {
                        this.loadinggif = false;
                        this.energysavediv = true;
                        this.successdialog = 'block';
                    }
                    if (this.user.status == "failure") {
                        this.loadinggif = false;
                        this.energysavediv = true;
                        this.failuredialog = 'block';
                        this.alertService.error('Successfully not saved');
                    }
                },
                error => {
                    this.loadinggif = false;
                    this.energysavediv = true;
                    this.alertService.error('Due to some Technical issue. Please try later');
                    this.loading = false;
                });
    }


    onChooseCountry() {
        this.loadinggif = true;
        this.menu0 = false;
        this.userService.loadState(this.model.selectedCountry)
            .subscribe(
                data => {
                    this.loadStateList = data;
                    this.loadinggif = false;
                    this.menu0 = true;
                },
                error => {
                    this.loadinggif = false;
                    this.menu0 = true;
                    alert('Network issue please try again');
                }
            );
    }

    onChooseCategory() {
        this.loadinggif = true;
        this.menu0 = false;
        this.userService.loadCategoryList(this.model.selectedCountry, this.model.selectedState)
            .subscribe(
                data => {
                    this.loadcategorylist = data;
                    this.loadinggif = false;
                    this.menu0 = true;
                },
                error => {
                    this.loadinggif = false;
                    this.menu0 = true;
                    alert('Network issue please try again');
                }
            );

    }

    clickMenu12() {
        this.loadinggif = true;
        this.menu12 = false;
        this.userService.getAllCategoryDetails()
            .subscribe(
                data => {
                    this.categorylist = data;
                    if (this.categorylist.length == 0) {
                        this.loadinggif = false;
                        this.menu12 = true;
                        this.categorytableview = false;
                        this.categoryview = true;
                    } else {
                        this.loadinggif = false;
                        this.menu12 = true;
                        this.categoryview = true;
                        this.categorytableview = true;
                    }
                },
                error => {
                    this.menu12 = true;
                    this.categoryview = true;
                    alert('Network issue please try again');
                }
            );

        this.categoryreg = false;
        this.dashboarddiv = false;
        this.menu0 = false;
        this.menu1 = false;
        this.menu2 = false;
        this.menu3 = false;
        this.menu4 = false;
        this.menu5 = false;
        this.menu6 = false;
        this.menu7 = false;
        this.menu8 = false;
        this.menu9 = false;
        this.menu10 = false;
        this.menu11 = false;
        this.companylistDIV = false;
        this.tickdiv = false;
        this.turtradiv = false;
        this.financialdiv = false;
        this.educationdiv = false;
        this.insurancediv = false;
        this.medicaldiv = false;
        this.healthaccessorydiv = false;
        this.healthdiv = false;
        this.umrahdiv = false;
        this.softwarediv = false;
        this.energysavediv = false;
        this.categoryEdit = false;
        this.companyEdit = false;
        this.imageUpload = false;
        this.foodreserform = false;
    }

    newCategory() {
        this.menu12 = true;
        this.categoryreg = true;
        this.categoryview = false;
        this.dashboarddiv = false;
        this.menu0 = false;
        this.menu1 = false;
        this.menu2 = false;
        this.menu3 = false;
        this.menu4 = false;
        this.menu5 = false;
        this.menu6 = false;
        this.menu7 = false;
        this.menu8 = false;
        this.menu9 = false;
        this.menu10 = false;
        this.menu11 = false;
        this.companylistDIV = false;
        this.tickdiv = false;
        this.turtradiv = false;
        this.financialdiv = false;
        this.educationdiv = false;
        this.insurancediv = false;
        this.medicaldiv = false;
        this.healthaccessorydiv = false;
        this.healthdiv = false;
        this.umrahdiv = false;
        this.softwarediv = false;
        this.energysavediv = false;
        this.categoryEdit = false;
        this.companyEdit = false;
        this.imageUpload = false;
        this.foodreserform = false;

        this.model.selectedCountry = '';
        this.model.selectedState = '';
        this.model.categoryname = '';
        this.model.description = '';
    }

    saveCategory() {
        this.loadinggif = true;
        this.menu12 = false;
        this.categoryreg = false;
        this.userService.saveCategory(this.model)
            .subscribe(
                data => {
                    this.user = data;
                    if (this.user.status == "success") {
                        this.menu12 = true;
                        this.categoryreg = true;
                        this.successdialog = 'block';
                        this.newCategory();
                    }
                    if (this.user.status == "failure") {
                        this.menu12 = true;
                        this.categoryreg = true;
                        this.failuredialog = 'block';
                        this.alertService.success("Data is not stored please try again");
                        this.newCategory();
                    }
                    if (this.user.status == "NotExist") {
                        this.menu12 = true;
                        this.categoryreg = true;
                        this.alertService.success("CategoryName is already registered Please try again.");
                    }
                },
                error => {
                    this.menu12 = true;
                    this.categoryreg = true;
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    categoryAction(actionType: String, categoryname: string, userLoginPrimaryKey: number) {
        this.menu12 = false;
        if (actionType == 'edit') {
            this.userService.getCategoryView(categoryname, userLoginPrimaryKey)
                .subscribe(
                    data => {
                        this.user = data;
                        this.categoryEdit = true;
                    },
                    error => {
                        this.alertService.error(error);
                    }
                );
        }
        if (actionType == 'remove') {
            this.userService.getCategoryView(categoryname, userLoginPrimaryKey)
                .subscribe(
                    data => {
                        this.user = data;
                        this.categoryRemove = 'block';
                        this.clickMenu12();
                    },
                    error => {
                        this.alertService.error(error);
                    }
                );

        }
    }

    onCountryEdit() {
        this.userService.getState(this.user.selectedCountry)
            .subscribe(
                data => {
                    this.stateList = data;
                },
                error => {
                    alert('Network issue please try again');
                }
            );
    }

    setCategoryUpdate() {
        this.loading = true;
        this.model.categoryCode = this.user.categoryCode;
        this.model.categoryname = this.user.categoryname;
        this.model.selectedCountry = this.user.selectedCountry;
        this.model.selectedState = this.user.selectedState;
        this.model.description = this.user.description;
        this.model.userLoginPrimaryKey = this.user.userLoginPrimaryKey;
        this.userService.setCategoryUpdate(this.model)
            .subscribe(
                data => {
                    this.user = data;
                    this.loading = false;
                    if (this.user.status == "success") {
                        this.loading = false;
                        this.alertService.success("Category is Updated Successfully .... ");
                    }

                    if (this.user.status == "failure") {
                        this.loading = false;
                        this.alertService.success("Category is Not Updated .... ");
                    }
                    if (this.user.status == "NotExist") {
                        this.loading = false;
                        this.alertService.success("CategoryName is already registered Please try again.");
                    }
                },
                error => {
                    this.loading = false;
                    alert('Network issue please try again');
                });
    }

    onDeleteCategory(categoryname: string, userLoginPrimaryKey: number) {
        this.categoryRemove = 'none';
        this.userService.setCategoryRemove(categoryname, userLoginPrimaryKey)
            .subscribe(
                data => {
                    this.user = data;
                    if (this.user.status == "success") {
                        this.categoryRemovesuccess = "block";
                        this.clickMenu12();
                    } else if (this.user.status == "failure") {
                        this.categoryRemovefail = "block";
                        this.clickMenu12();
                    }
                },
                error => {
                    alert('Network issue please try again');
                }
            );
    }

    onCloseHandled() {
        this.categoryRemove = 'none';
        this.categoryRemovesuccess = 'none';
        this.categoryRemovefail = 'none';
        this.companyinfo = 'none';
        this.memberRemove = 'none';
        this.memberRemovesuccess = 'none';
        this.memberRemovefail = 'none';
        this.imageuploadfail = 'none';
        this.imageuploadsuccess = 'none';
        this.successdialog = 'none';
        this.failuredialog = 'none';
        this.exsistdialog = 'none';
        this.foodreserView = 'none';
        this.ticketreserView = 'none';
        this.tourreserView = 'none';
        this.financereserView = 'none';
        this.educationreserView = 'none';
        this.insurancereserView = 'none';
        this.meditreatreserView = 'none';
        this.healthreserView = 'none';
        this.herbalreserView = 'none';
        this.umrahreserView = 'none';
        this.softhardreserView = 'none';
        this.energyreserView = 'none';
        this.rejectdialog = 'none';
        this.approvedialog = 'none';
        this.paymentDialog = 'none';
        this.noSearchinfo = 'none';
        this.noBookinfo = 'none';
        this.companyRemovefail = 'none';
    }

    companyAction(actionType: String, cname: string, userLoginPrimaryKey: number) {
        this.companylistDIV = false;
        if (actionType == 'edit') {
            this.userService.getCompanyView(cname, userLoginPrimaryKey)
                .subscribe(
                    data => {
                        this.user = data;
                        this.companyEdit = true;
                    },
                    error => {
                        this.alertService.error(error);
                    }
                );
        }
        if (actionType == 'remove') {
            this.userService.getCompanyView(cname, userLoginPrimaryKey)
                .subscribe(
                    data => {
                        this.user = data;
                        this.companyRemove = 'block';
                        this.getCompanyList();
                    },
                    error => {
                        this.alertService.error(error);
                    }
                );
        }
        if (actionType == 'updateImage') {
            this.dashboarddiv = false;
            this.imageUpload = true;
            this.userService.getCompanyView(cname, userLoginPrimaryKey)
                .subscribe(
                    data => {
                        this.user = data;
                        this.updateImage = true;
                    },
                    error => {
                        this.alertService.error(error);
                    }
                );
        }
    }

    getCompanyBook(categoryname: string, cname: string, selectedCountry: string, selectedState: string) {
        this.dashboarddiv = true;
        if (categoryname == "Food and hotels") {
            this.dashboarddiv = false;
            this.model.companyname = cname;
            this.model.selectedCountry = selectedCountry;
            this.model.selectedState = selectedState;
            this.model.categoryname = categoryname;
            this.foodreserform = true;
        } else if (categoryname == "Ticketing") {
            this.noBookinfo = "block";
            //this.tickdiv = true;
        } else if (categoryname == "Travel and Tour") {
            this.noBookinfo = "block";
            //this.turtradiv = true;
        } else if (categoryname == "Financial Solution") {
            this.noBookinfo = "block";
            //this.financialdiv = true;
        } else if (categoryname == "Education") {
            this.noBookinfo = "block";
            //this.educationdiv = true;
        } else if (categoryname == "Insurance") {
            this.noBookinfo = "block";
            //this.insurancediv = true;
        } else if (categoryname == "Medical Treatment") {
            this.noBookinfo = "block";
            //this.medicaldiv = true;
        } else if (categoryname == "Health Accessories") {
            this.noBookinfo = "block";
            //this.healthaccessorydiv = true;
        } else if (categoryname == "Herbal Product") {
            this.noBookinfo = "block";
            //this.healthdiv = true;
        } else if (categoryname == "Umrah") {
            this.noBookinfo = "block";
            //this.umrahdiv = true;
        } else if (categoryname == "Software And Hardware") {
            this.noBookinfo = "block";
            //this.softwarediv = true;
        } else if (categoryname == "Energy Saving") {
            this.noBookinfo = "block";
            //this.energysavediv = true;
        }
    }

    saveFoodReservation() {
        this.loadinggif = true;
        this.foodreserform = false;
        var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
        this.userService.saveReservation(this.model, primaryKey)
            .subscribe(
                data => {
                    this.user = data;

                    if (this.user.status == "success") {
                        this.loadinggif = false;
                        this.foodreserform = true;
                        this.successdialog = "block";
                        this.alertService.success("Successfully Saved data");
                        this.foodMenu();
                    }
                    if (this.user.status == "failure") {
                        this.loadinggif = false;
                        this.foodreserform = true;
                        this.failuredialog = "block";
                        this.alertService.success("Data is not stored please try again");
                        this.foodMenu();
                    }
                },
                error => {
                    this.alertService.error(error);
                    this.loadinggif = false;
                    this.foodreserform = true;
                    this.loading = false;
                });
    }

    foodMenu() {
        this.dashboarddiv = false;
        this.menu0 = false;
        this.menu1 = false;
        this.menu2 = false;
        this.menu3 = false;
        this.menu4 = false;
        this.menu5 = false;
        this.menu6 = false;
        this.menu7 = false;
        this.menu8 = false;
        this.menu9 = false;
        this.menu10 = false;
        this.menu11 = false;
        this.menu12 = false;
        this.companylistDIV = false;
        this.tickdiv = false;
        this.turtradiv = false;
        this.financialdiv = false;
        this.educationdiv = false;
        this.insurancediv = false;
        this.medicaldiv = false;
        this.healthaccessorydiv = false;
        this.healthdiv = false;
        this.umrahdiv = false;
        this.softwarediv = false;
        this.energysavediv = false;
        this.categoryEdit = false;
        this.companyEdit = false;
        this.imageUpload = false;
        this.foodreserform = true;
        this.model.noofadult = '';
        this.model.noofchild = '';
        this.model.noofrooms = '';
        this.model.noofTables = '';
        this.model.medicaltime = '';
        this.model.bookingdate = '';
        // this.model.bookingCode='';
    }

    setCompanyUpdate() {
        this.loading = true;
        this.model.cname = this.user.cname;
        this.model.description = this.user.description;
        this.model.phoneNumber = this.user.phoneNumber;
        this.model.emailID = this.user.emailID;
        this.model.userLoginPrimaryKey = this.user.userLoginPrimaryKey;
        this.userService.setCompanyUpdate(this.model)
            .subscribe(
                data => {
                    this.user = data;
                    this.loading = false;
                    if (this.user.status == "success") {
                        this.loading = false;
                        this.alertService.success("Company is Updated Successfully .... ");
                    }

                    if (this.user.status == "failure") {
                        this.loading = false;
                        this.alertService.success("Company is Not Updated .... ");
                    }
                },
                error => {
                    this.loading = false;
                    alert('Network issue please try again');
                });
    }

    onDeleteCompany(cname: string, userLoginPrimaryKey: number) {
        this.companyRemove = 'none';
        this.userService.setCompanyRemove(cname, userLoginPrimaryKey)
            .subscribe(
                data => {
                    this.user = data;
                    if (this.user.status == "success") {
                        this.companyRemovesuccess = "block";
                        this.getCompanyList();
                    } else if (this.user.status == "failure") {
                        this.companyRemovefail = "block";
                        this.getCompanyList();
                    }
                },
                error => {
                    alert('Network issue please try again');
                }
            );
    }

    selectFile(event: any) {
        const file = event.target.files.item(0);
        if (file.type.match('image.*')) {
            this.selectedFiles = event.target.files;
            this.uploadPk = this.user.userloginPrimaryKeyString;
        } else {
            alert('invalid format!');
        }
    }

    upload() {
        this.progress.percentage = 0;
        this.currentFileUpload = this.selectedFiles.item(0);
        this.uploadService.pushImageToStorage(this.currentFileUpload, this.uploadPk).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress.percentage = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
                console.log('File is completely uploaded!' + event.status);
                this.imageuploadsuccess = 'block';
                window.location.reload();
            }
        });
        this.selectedFiles = undefined;
    }

    ReservationView(categoryname: string, invoiceNumber: string, userloginPrimaryKeyString: string) {
        this.userService.getMyReservationView(invoiceNumber, userloginPrimaryKeyString)
            .subscribe(
                data => {
                    this.user = data;
                    if (categoryname == 'Food and hotels') {
                        this.foodreserView = 'block';
                    }
                    if (categoryname == 'Ticketing') {
                        this.ticketreserView = 'block';
                    }
                    if (categoryname == 'Travel and Tour') {
                        this.tourreserView = 'block';
                    }
                    if (categoryname == 'Financial Solution') {
                        this.financereserView = 'block';
                    }
                    if (categoryname == 'Education') {
                        this.educationreserView = 'block';
                    }
                    if (categoryname == 'Insurance') {
                        this.insurancereserView = 'block';
                    }
                    if (categoryname == 'Medical Treatment') {
                        this.meditreatreserView = 'block';
                    }
                    if (categoryname == 'Health Accessories') {
                        this.healthreserView = 'block';
                    }
                    if (categoryname == 'Umrah') {
                        this.umrahreserView = 'block';
                    }
                    if (categoryname == 'Herbal Product') {
                        this.herbalreserView = 'block';
                    }
                    if (categoryname == 'Software And Hardware') {
                        this.softhardreserView = 'block';
                    }
                    if (categoryname == 'Energy Saving') {
                        this.energyreserView = 'block';
                    }
                },
                error => {
                }
            );
    }

    viewreceipt(memberID: string) {
        this.fileUploads = this.uploadService.getFiles(memberID);
        this.paymentDialog = "block";
    }

    backToDashboard() {
        this.dashboarddiv = true;
        this.menu0 = false;
        this.menu1 = false;
        this.menu2 = false;
        this.menu3 = false;
        this.menu4 = false;
        this.menu5 = false;
        this.menu6 = false;
        this.menu7 = false;
        this.menu8 = false;
        this.menu9 = false;
        this.menu10 = false;
        this.menu11 = false;
        this.menu12 = false;
        this.categoryEdit = false;
        this.companylistDIV = false;
        this.tickdiv = false;
        this.turtradiv = false;
        this.financialdiv = false;
        this.educationdiv = false;
        this.insurancediv = false;
        this.medicaldiv = false;
        this.healthaccessorydiv = false;
        this.healthdiv = false;
        this.umrahdiv = false;
        this.softwarediv = false;
        this.energysavediv = false;
        this.companyEdit = false;
        this.imageUpload = false;
        this.foodreserform = false;
    }

    deleteMember(memberID: string, userLoginPrimaryKey: number) {
        this.userService.getMemberDetails(memberID, userLoginPrimaryKey)
            .subscribe(
                data => {
                    this.user = data;
                    this.memberRemove = "block";
                },
                error => {
                }
            );
    }

    onDeleteMember(memberID: string, refmemberID: string, userLoginPrimaryKey: number, userloginPrimaryKeyString: string) {
        this.userService.setMemberRemove(memberID, refmemberID, userLoginPrimaryKey, userloginPrimaryKeyString)
            .subscribe(
                data => {
                    this.user = data;
                    this.memberRemove = "none";
                    if (this.user.status == "success") {
                        this.memberRemovesuccess = "block";
                        this.clickMenu8();
                    } else if (this.user.status == "failure") {
                        this.memberRemovefail = "block";
                        this.clickMenu8();
                    }
                },
                error => {

                }
            );
    }

    registerBooking(event: any, userLoginPrimaryKey: string) {
        const file = event.target.files.item(0);
        if (file.type.match('image.*')) {
            this.selectedFiles = event.target.files;
            this.uploadPk = userLoginPrimaryKey;
            this.progress.percentage = 0;
            this.currentFileUpload = this.selectedFiles.item(0);
            this.uploadService.saveBookingImage(this.currentFileUpload, this.uploadPk).subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.progress.percentage = Math.round(100 * event.loaded / event.total);
                } else if (event instanceof HttpResponse) {
                    console.log('File is completely uploaded!' + event.status);
                }
            });
            this.selectedFiles = undefined;
        } else {
            alert('invalid format!');
        }
    }

}



