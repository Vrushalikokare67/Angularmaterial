import { Component, Inject, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';





@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  [x: string]: any;
  freshnessList = ["Brand New","Second Hand","Refurbished"];
  productionForm!: FormGroup;
  actionBtn : string = "Save"


  
  



  constructor(private formBuilder : FormBuilder , 
    private api : ApiService , 
    @Inject(MAT_DIALOG_DATA) public editData : any ,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productionForm = this.formBuilder.group({
      productName : ['',Validators.required],
      category : ['',Validators.required],
      freshness : ['',Validators.required],
      price : ['',Validators.required],
     comment : ['',Validators.required],
     date : ['',Validators.required]

    });


    

    if(this.editData){
      this.actionBtn = "Update";
      this.productionForm.controls[' productName'].setValue(this.editData.productName);
      this.productionForm.controls[' category'].setValue(this.editData.category);
      this.productionForm.controls[' freshness'].setValue(this.editData.freshness);
      this.productionForm.controls[' price'].setValue(this.editData.price);
      this.productionForm.controls[' comment'].setValue(this.editData.comment);
      this.productionForm.controls[' date'].setValue(this.editData.date);
    }
  }

  addProduct(){
    if(!this.editData){
      if(this.productionForm.valid){
        this.api.postProduct(this.productionForm.value)
        .subscribe({
          next:(res)=>{
            alert("product added successfully");
            this.productionForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("error while adding product")
          }
        })
      }

    }
    else{
      this.updateProduct()
    }

    let data = {productName:'apple',category:'Fruits',freshness:'Brand New',price:20,comment:'sweet',date:4/5/2020};
    
    localStorage.setItem('session',JSON.stringify(data));






  }
  updateProduct(){
    this.api.putProduct(this.productionForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product updated succesfully");
        this.productionForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating record");

      }
    })

  }

}
