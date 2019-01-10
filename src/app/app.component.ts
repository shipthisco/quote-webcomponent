import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ConfigService } from './config.service'


@Component({
  selector: 'app-momentum-element',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Native
})

export class AppComponent implements OnInit {
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
  secondStep:boolean;
  thirdStep:boolean;
  _signup:boolean;
  shipmentType:string;
  public fcl: FormGroup;
  public lcl: FormGroup;
  public air: FormGroup;
  public land_ftl: FormGroup;
  public land_ltl: FormGroup;
  public details: FormGroup;
  title:string;
  
  constructor(
    private _fb: FormBuilder, 
    public configService: ConfigService
    ) {
      this.secondStep = false;
      this.thirdStep = false;
  }
  ngOnInit() {
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
        console.log(result_data);
    });
  }
  

  signup(){
    this._signup = true;
    let data = {
      'name':this.name,
      'organisation_name':this.organisation_name,
      'signup-email':this.email,
      'signup-password':this.password
    }
    this.configService.authenticatelogin(data)            
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
}