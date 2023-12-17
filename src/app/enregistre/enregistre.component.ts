import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enregistre',
  templateUrl: './enregistre.component.html',
  styleUrls: ['./enregistre.component.scss']
})
export class EnregistreComponent implements OnInit{

  visible: string = 'none';
  comment!: FormGroup

  constructor(private appRoute: Router, private formBuilder: FormBuilder,){}

  ngOnInit(): void {
    this.comment = this.formBuilder.group({
      avis:[null, [Validators.required]]
    })
  }

  store(){
    this.appRoute.navigate([''])
  }

  showDialog(){
    this.visible = 'block';
  }

  onSubmitForm(){
    console.log(this.comment.value);
    this.visible = 'none';
  }
}
