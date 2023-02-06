import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './helper/user.service'
import swal from 'sweetalert2'
import { userDetalis } from './helper/userDetails.interface';
import { dboperation } from './helper/dp-operation';
import { flatMap } from 'rxjs';
import { mustMatch } from './helper/pass.validator';
// import 'rxjs/add/operator/map';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'curdop';
  submitted: boolean = false;
  buttonText: string = "submit"
  user: userDetalis[] = []
  dbops: dboperation = 1


  regisetrForm: FormGroup = new FormGroup({})

  constructor(private toastr: ToastrService, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.setFormState()
    this.getAlluser()

  }

  get f() {
    return this.regisetrForm.controls;
  }

  setFormState() {
    this.buttonText = "submit",
      this.dbops = dboperation.create

    this.regisetrForm = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      firstName: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      dob: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      cmpPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      acceptTerm: [, Validators.required],
      products: this.fb.array([])


    },
      { validators: mustMatch('password', 'cmpPassword') })
  }

  onSubmit() {
    this.submitted = true
    if (this.regisetrForm.invalid) {
      return
    }

    switch (this.dbops) {
      case dboperation.create:
        this.userService.addUser(this.regisetrForm.value).subscribe(res => {
          this.toastr.success("data added successfully", "Update")
          this.getAlluser()
          this.onCancle()
          console.log(this.regisetrForm.value);

        })

        break;

      case dboperation.update:
        this.userService.updateUser(this.regisetrForm.value).subscribe(res => {
          this.toastr.success("data update successfully", "Update")
          this.getAlluser()
          this.onCancle()
        })

        break;
    }

  }

  onCancle() {
    this.regisetrForm.reset()
    this.buttonText = "submit"
    this.dbops = dboperation.create
    this.submitted = false
  }



  getAlluser() {
    this.userService.getusers().subscribe((arg: any) => {
      this.user = arg

    });

  }

  edit(userId: number) {

    this.buttonText = "update"
    this.dbops = dboperation.update

    let usr = this.user.find((u: any) => {
      return u.id == userId;
    })

    this.regisetrForm.patchValue(usr!)
  }

  delete(userId: number) {

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.DeleteUser(userId).subscribe(res => {
          this.getAlluser()
          this.toastr.success("deleted successfully", "Update")
        })
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        )
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your  data is safe :)',
          'error'
        )
      }
    })
  }


  // onaddproduct() {
  //   this.regisetrForm.get('products').push(
  //     new FormGroup({
  //       pname: new FormControl(null, Validators.required),
  //       quantity: new FormControl(null, Validators.required),
  //       rate: new FormControl(null, Validators.required),
  //       amount: new FormControl(null),
  //     })
  //   );
  // }

  // changeq(event: any, i: number) {
  //   const r = this.regisetrForm.get('products').at(i).get('rate').value;
  //   this.regisetrForm.get('products').at(i).patchValue({
  //       amount: event * r,
  //     });
  //   this.regisetrForm.patchValue({
  //     totalamount: this.gettotalamount(<FormArray>this.regisetrForm.get('products')),
  //   });
  // }

  // changer(event: any, i: number) {
  //   const q = this.regisetrForm.get('products').at(i).get('quantity').value;
  //   this.regisetrForm.get('products').at(i).patchValue({
  //       amount: event * q,
  //     });
  //   this.regisetrForm.patchValue({
  //     totalamount: this.gettotalamount(<FormArray>this.regisetrForm.get('products')),
  //   });
  // }

  // gettotalamount(array: FormArray) {
  //   let amount: number = 0;
  //   for (let i = 0; i < array.length; i++) {
  //     amount = amount + array.at(i).get('amount')?.value;
  //   }
  //   return amount;
  // }






}
