import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-container',
  standalone: true,
  imports: [],
  templateUrl: './form-container.component.html',
  styleUrl: './form-container.component.css',
})
export class FormContainerComponent {
  @Input() title: string = '';
  @Input() backButtonText: string = 'Back To List';
  @Input() cancelButtonText: string = 'Cancel';
  @Input() saveButtonText: string = 'Save';

  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  onSave() {
    this.save.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

  goBack() {
    this.back.emit();
  }
}
