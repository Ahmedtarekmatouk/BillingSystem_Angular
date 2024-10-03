import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../Service/employee.service';
import { NewEmployeeDTO } from '../../../interfaces/NewEmployeeDTO';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { FormContainerComponent } from '../../../layout/form-container/form-container.component';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  imports: [ReactiveFormsModule, CommonModule,FormContainerComponent] // <-- Import ReactiveFormsModule and CommonModule
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private employeeService: EmployeeService,
    private router: Router

  ) {
    this.employeeForm = this.fb.group({
      employeeName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['']
    });
  }

  get f() {
    return this.employeeForm.controls;
  }
  navigateToEmployees() {
    this.router.navigate(['/home/employees']); // <-- Manually trigger navigation to 'employees'
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      const newEmployee: NewEmployeeDTO = {
        id: '',
        employeeName: this.f['employeeName'].value, // <-- Access using ['propertyName']
        password: this.f['password'].value,        // <-- Access using ['propertyName']
        phoneNumber: this.f['phoneNumber'].value || undefined, // <-- Optional field
      };

      this.employeeService.addEmployee(newEmployee).subscribe({
        next: () => {
          alert('Employee added successfully!');
          this.router.navigate(['./home/employees']);
        },
        error: (error) => {
          alert('Error: ' + error.error);
        }
      });
    }
  }
}
