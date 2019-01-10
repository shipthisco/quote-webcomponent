import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../config.service'
import { ModalService } from '../modal.service'


@Component({
  selector: 'app-quotation-form',
  templateUrl: './quotation-form.component.html',
  styleUrls: ['./quotation-form.component.scss']
})
export class QuotationFormComponent implements OnInit {


  options = [
    {'id':'fcl', 'displayName':'FCL Sea'},
    {'id':'lcl', 'displayName':'LCL Sea'},
    {'id':'air', 'displayName':'Air'},
    {'id':'land_ftl', 'displayName':'Land FTL'},
    {'id':'land_ltl', 'displayName':'Land LTL'}
  ]
  name:'';
  organisation_name:'';
  email:'';
  password:'';
  signup_password:'';
  signup_password_2:'';
  secondStep:boolean;
  thirdStep:boolean;
  _signup:boolean;
  _signin:boolean;
  shipmentType:string;
  selected_location: any = {};
  selected_region: any = {};
  organisation: any = {};
  file_base_url: string;
  file_template_base_url: string;
  API_ENDPOINT = '';
  FILE_BASE_URL = 'https://s3.ap-south-1.amazonaws.com/shipthis.media/';
  FILE_BASE_TEMPLATE_URL = 'https://s3-ap-southeast-1.amazonaws.com/shipthis.media.template-generated/';
  api_endpoint = this.API_ENDPOINT;
  submitted = false;
  HAS_LOGGED_IN = 'hasLoggedIn';
  data: any;
  employee_profile: any = {};
  auth_token = '';
  loggedIn = false;
  device_token: string;
  base_api_path = 'api/v1/auth/';
  private fcl: FormGroup;
  private lcl: FormGroup;
  private air: FormGroup;
  private land_ftl: FormGroup;
  private land_ltl: FormGroup;
  private details: FormGroup;
  title:string;
  
  constructor(
    private modalService: ModalService,
    private _fb: FormBuilder, 
    public configService: ConfigService
    ) {
      this.hasLoggedIn();

  }
  ngOnInit() {
    this.secondStep = false;
    this.thirdStep = false;
    this._signin = false;
    this.details = this._fb.group({
      'customer': ['', Validators.required],
      'origin': new FormGroup({
        'location_type': new FormControl('', <any>Validators.required),
        'origin': new FormControl('', <any>Validators.required),
        'handle_warehouse': new FormControl('', <any>Validators.required),
        'handle_port_charges': new FormControl('', <any>Validators.required),
        'handle_customs': new FormControl('', <any>Validators.required),
        }),
      'destination': new FormGroup({
        'location_type': new FormControl('', <any>Validators.required),
        'destination': new FormControl('', <any>Validators.required),
        'handle_warehouse': new FormControl('', <any>Validators.required),
        'handle_port_charges': new FormControl('', <any>Validators.required),
        'handle_customs': new FormControl('', <any>Validators.required),
        }),
      'additional_details': new FormGroup({
        'is_hazardous': new FormControl('', <any>Validators.required),
        'need_insurance': new FormControl('', <any>Validators.required),
        'need_refrigeration': new FormControl('', <any>Validators.required),
      }),
    });

    this.fcl = this._fb.group({
      'fcl': this._fb.array([
          this._fb.group({
            'description': ['', Validators.required],
            'container_type': ['', Validators.required],
            'container_count': ['', Validators.required],
            'weight_unit': ['', Validators.required],
            'gross_weight': ['', Validators.required],
            'net_weight': ['', Validators.required],
            'cbm': ['', Validators.required]
          })
      ])
    });

    this.lcl = this._fb.group({
      'lcl': this._fb.array([
          this._fb.group({
            'description': ['', Validators.required],
            'package_type': ['', Validators.required],
            'package_quantity': ['', Validators.required],
            'weight_unit': ['', Validators.required],
            'gross_weight': ['', Validators.required],
            'net_weight': ['', Validators.required],
            'cbm': ['', Validators.required]
          })
      ])
    });

    this.air = this._fb.group({
      'air': this._fb.array([
          this._fb.group({
            'description': ['', Validators.required],
            'package_type': ['', Validators.required],
            'package_quantity': ['', Validators.required],
            'weight_unit': ['', Validators.required],
            'gross_weight': ['', Validators.required],
            'net_weight': ['', Validators.required],
            'cbm': ['', Validators.required]
          })
      ])
    });

    this.land_ftl = this._fb.group({
      'land_ftl': this._fb.array([
          this._fb.group({
            'description': ['', Validators.required],
            'package_type': ['', Validators.required],
            'vehicle_type': ['', Validators.required],
            'package_quantity': ['', Validators.required],
            'weight_unit': ['', Validators.required],
            'gross_weight': ['', Validators.required],
          })
      ])
    });

    this.land_ltl = this._fb.group({
      'land_ltl': this._fb.array([
          this._fb.group({
            'description': ['', Validators.required],
            'package_type': ['', Validators.required],
            'package_quantity': ['', Validators.required],
            'weight_unit': ['', Validators.required],
            'gross_weight': ['', Validators.required],
          })
      ])
    });

  }
  onSubmit() {
    this.submitted = true;
    let data:any;
    if(this.shipmentType === 'fcl'){
       data = this.fcl.value;
    }else if(this.shipmentType === 'lcl'){
       data = this.lcl.value;
    }else if(this.shipmentType === 'air'){
      data = this.air.value;
    }else if(this.shipmentType === 'land_ftl'){
      data = this.land_ftl.value;
    }else if(this.shipmentType === 'land_ltl'){
      data = this.land_ltl.value;
    }

    let mergedData = {...data, ...this.details.value};

    console.log(mergedData);

    this.configService.submit(mergedData)            
    .then((result_data) => {
      console.log(result_data);
  });

  }

  initFCL() {
    return this._fb.group({
        'description': ['', Validators.required],
        'container_type': ['', Validators.required],
        'container_count': ['', Validators.required],
        'weight_unit': ['', Validators.required],
        'gross_weight': ['', Validators.required],
        'net_weight': ['', Validators.required],
        'cbm': ['', Validators.required]
    });
  }

  initLCL() {
    return this._fb.group({
        'description': ['', Validators.required],
        'package_type': ['', Validators.required],
        'package_quantity': ['', Validators.required],
        'weight_unit': ['', Validators.required],
        'gross_weight': ['', Validators.required],
        'net_weight': ['', Validators.required],
        'cbm': ['', Validators.required]
    });
  }

  initAir() {
    return this._fb.group({
        'description': ['', Validators.required],
        'package_type': ['', Validators.required],
        'package_quantity': ['', Validators.required],
        'weight_unit': ['', Validators.required],
        'gross_weight': ['', Validators.required],
        'net_weight': ['', Validators.required],
        'cbm': ['', Validators.required]
    });
  }

  initLandFTL() {
    return this._fb.group({
        'description': ['', Validators.required],
        'package_type': ['', Validators.required],
        'package_quantity': ['', Validators.required],
        'vehicle_type': ['', Validators.required],
        'weight_unit': ['', Validators.required],
        'gross_weight': ['', Validators.required]
    })
  }

  initLandLTL() {
    return this._fb.group({
        'description': ['', Validators.required],
        'package_type': ['', Validators.required],
        'package_quantity': ['', Validators.required],
        'weight_unit': ['', Validators.required],
        'gross_weight': ['', Validators.required]
    })
  }

  addFCL() {
    const control = <FormArray>this.fcl.controls['fcl'];
    control.push(this.initFCL());
  }

  removeFCL(i: number) {
    const control = <FormArray>this.fcl.controls['fcl'];
    control.removeAt(i);
  }

  addLCL() {
    const control = <FormArray>this.lcl.controls['lcl'];
    control.push(this.initLCL());
  }
  
  removeLCL(i: number) {
    const control = <FormArray>this.lcl.controls['lcl'];
    control.removeAt(i);
  }

  addAir() {
    const control = <FormArray>this.air.controls['air'];
    control.push(this.initAir());
  }
  
  removeAir(i: number) {
    const control = <FormArray>this.air.controls['air'];
    control.removeAt(i);
  }

  addLandFTL() {
    const control = <FormArray>this.land_ftl.controls['land_ftl'];
    control.push(this.initLandFTL());
  }
  
  removeLandFTL(i: number) {
    const control = <FormArray>this.land_ftl.controls['land_ftl'];
    control.removeAt(i);
  }

  addLandLTL() {
    const control = <FormArray>this.land_ltl.controls['land_ltl'];
    control.push(this.initLandLTL());
  }

  removeLandLTL(i: number) {
    const control = <FormArray>this.land_ltl.controls['land_ltl'];
    control.removeAt(i);
  }
  
  initEvents() {
    return this._fb.group({
      'event_name': ['', Validators.required]
    });
  }  

  login(){
    let data = {
      'email':this.email,
      'password':this.password
    }
    this.configService.authenticatelogin(data)            
      .then((result_data) => {
        this.data = this.processData(result_data['user']);
        this.employee_profile = result_data['profile'];
        this.setOrganisation(result_data['organisation'], result_data['api_endpoint']);
        this.closeModal('custom-modal-2', 'login');
    });
  }

  setOrganisation(organisation, api_endpoint?) {
    if (api_endpoint) {
      this.api_endpoint = api_endpoint + "/";
    }
    if (organisation && this.organisation.name) {
      this.file_base_url = this.FILE_BASE_URL + this.organisation.name + "/";
      this.file_template_base_url = this.FILE_BASE_TEMPLATE_URL + this.organisation.name + "/";
    }
    this.organisation = organisation;
    try {
      this.selected_location = JSON.parse(localStorage.getItem('selected_location'));
      if (this.selected_location) {
        let found = false;
        for (let i = 0; i < this.organisation.regions.length; i++) {
          for (let j = 0; j < this.organisation.regions[i].locations.length; j++) {
            if (this.organisation.regions[i].locations[j].location_id === this.selected_location.location_id) {
              found = true;
              this.selected_location = this.organisation.regions[i].locations[j];
              this.selected_region = this.organisation.regions[i];
            }
          }
        }
        if (!found) {
          this.selected_location = null;
          this.selected_region = null;
        }
      }
    } catch (e) {
      console.log(e);
    }

    if (this.organisation && this.organisation.third_party_public_settings) {
      // do third party stuff here
      // .........................
      // enable analytics if enabled from admin section
      // if (this.organisation.third_party_public_settings.google_analytics_setting && this.organisation.third_party_public_settings.google_analytics_setting.enable_analytics) {
      //   this.googleAnalyticsService.enableAnalytics(this.organisation.third_party_public_settings.google_analytics_setting.ga_tracking_id_erp)
      //     .then((response: any) => {
      //     });
      // }
    }
  }

  hasLoggedIn() {
    let loggenIn = localStorage.getItem(this.HAS_LOGGED_IN) == 'true';
    console.log(loggenIn)
    this._signin = true;
  }

  processData(data: any) {
    this.loggedIn = true;
    this.auth_token = data.auth_token;

    localStorage.setItem(this.HAS_LOGGED_IN, 'true');
    this.setUserData(JSON.stringify(data));
    this.setAuthToken(data.auth_token);
    return data;
  }
  
  setAuthToken(authToken: string) {
    return localStorage.setItem('authToken', authToken);
  }

  setUserData(user: any) {
    localStorage.setItem('user', user);
  }

  signup(){
    this._signup = true;
    let data = {
      'name':this.name,
      'company_name':this.organisation_name,
      'email':this.email,
      'password':this.signup_password,
      'password2':this.signup_password_2
    }
    
    this.configService.signup(data)            
      .then((result_data) => {
        console.log(result_data);
    });
  }

  nextStep(number){
    if(number === 'two'){
      this.secondStep = true;
    }
    if(number === 'three'){
      this.thirdStep = true;
    }
  }

  openModal(id: string, status:string) {
    if(status === 'sign-up-modal'){
      this.closeModal('custom-modal-2', '')
    }
    this.modalService.open(id);
}

closeModal(id: string, status: string) {
    if(status === 'login'){
      this._signin = true;
      setTimeout(()=>{ this.modalService.close(id) }, 2000)
    }else{
      this.modalService.close(id);
    }
}





}
