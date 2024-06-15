import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDatamodel } from 'src/app/models/datamodel';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private employeeService: EmployeeService = inject(EmployeeService);

  employeeform!: FormGroup;
  data?: IDatamodel[];
  isShowadd :boolean=true;
  recordId !:number;

  // @ViewChild('employeeFormModal') model: ElementRef | undefined;
  @ViewChild('employeeFormModal') modelRef ?: ElementRef<HTMLFormElement>;
  ngOnInit(): void {
    this.employeeform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required], 
      phonenumber: ['', Validators.required],
    });
    this.getAllEmployee();
  }
  // openModel() {
  //   if(this.model !=null)
  //     this.model.nativeElement.style.display='block';
  //     this.isShowadd=true;
  // }
  // closeModel(){
  //   if(this.model !=null)
  //   this.model.nativeElement.style.display='none';
  // }

  openModel() {
    if(this.modelRef?.nativeElement)
      this.modelRef.nativeElement.style.display='block';
      this.isShowadd=true;
  }
  closeModel(){
    if(this.modelRef?.nativeElement)
    this.modelRef.nativeElement.style.display='none';
  }
  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe((res) => {
      this.data = res;
    });
  }
  onFormSubmit(data: any) {
    this.employeeService.addemployee(data).subscribe((res) => {
      this.employeeform.reset();
      alert("Data saved successfully");
    });
    this.getAllEmployee();
    this.closeModel();
  }
  onOpenModifyModel(data:any){
      //this.employeeform.controls['name'].setValue(data.name);
      this.recordId=data.id;
      this.employeeform.setValue({
        name:data.name,
        email:data.email,
        city:data.city,
        pincode:data.pincode,
        phonenumber:data.phonenumber,
      })
      this.openModel();
      this.isShowadd=false;
  }
  onFormUpdate(data: any){
    this.employeeService.updateEmployee(data,this.recordId).subscribe((res) => {
      this.employeeform.reset();
      alert("Data updated successfully");
    });
    this.getAllEmployee();
    this.closeModel();
  }
  onDelete(id:number){
    if(confirm('Are you sure to delete this record?'))
    this.employeeService.deleteEmployee(id).subscribe(res=>{
      alert("Data Deleted successfully");
      this.getAllEmployee();
    })
  }
  refreshList(index:number,employee:IDatamodel):string{
     return employee.name;
  }
}
