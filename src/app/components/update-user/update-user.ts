import { Component, inject } from '@angular/core';
import { Users } from '../../shared/users';
import { MdlUser } from '../../interfaces/mdl-user';
import { MdlServicesService } from '../../services/mdl-services.service';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, computed, effect, OnInit, signal } from '@angular/core';

import { JsonPipe } from '@angular/common'; // <-- Imported JsonPipe

@Component({
  selector: 'app-update-user',
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.html',
  styleUrl: './update-user.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUser implements OnInit {
  usersService = inject(Users);
  mdlService = inject(MdlServicesService);
  fb = inject(FormBuilder);
  user: MdlUser | null = this.usersService.currentUser();

  // 2. Reactive Form Definition
  ouForm: FormGroup;

  // Signals to hold the latest *validated* selection ID from the form controls
  private level2SelectionId = signal<string | null>(null);
  private level3SelectionId = signal<string | null>(null);
  private level4SelectionId = signal<string | null>(null);

  // Computed signals for options lists (needs to be declared before constructor for template access)
  level2Options = computed(() => this.allUnits().filter((unit) => unit.level === 2));
  level3Options = computed(() => {
    const parentId = this.level2SelectionId();
    if (!parentId) return [];
    return this.allUnits().filter((unit) => unit.level === 3 && unit.parent?.id === parentId);
  });
  level4Options = computed(() => {
    const parentId = this.level3SelectionId();
    if (!parentId) return [];
    return this.allUnits().filter((unit) => unit.level === 4 && unit.parent?.id === parentId);
  });
  level5Options = computed(() => {
    const parentId = this.level4SelectionId();
    if (!parentId) return [];
    return this.allUnits().filter((unit) => unit.level === 5 && unit.parent?.id === parentId);
  });

  constructor() {
    // Initialize the form with required validation for level 2, and initial state
    // (disabled) for subsequent controls.
    this.ouForm = this.fb.group({
      level2: ['', [Validators.required]],
      level3: [{ value: '', disabled: true }],
      level4: [{ value: '', disabled: true }],
      level5: [{ value: '', disabled: true }],
    });

    // 4. Effects for Cascading Logic (Enable/Disable/Reset)
    // Using `effect` for side effects tied to signal values is an idiomatic modern Angular approach.
    effect(() => {
      const l2Selected = this.level2SelectionId();
      const l3Control = this.ouForm.get('level3');
      const l4Control = this.ouForm.get('level4');
      const l5Control = this.ouForm.get('level5');

      if (l2Selected) {
        l3Control?.enable({ emitEvent: false });
      } else {
        l3Control?.disable({ emitEvent: false });
        l3Control?.setValue('', { emitEvent: false });
        // Also disable and reset all subsequent levels
        l4Control?.disable({ emitEvent: false });
        l4Control?.setValue('', { emitEvent: false });
        l5Control?.disable({ emitEvent: false });
        l5Control?.setValue('', { emitEvent: false });
      }
    });

    effect(() => {
      const l3Selected = this.level3SelectionId();
      const l4Control = this.ouForm.get('level4');
      const l5Control = this.ouForm.get('level5');

      if (l3Selected) {
        l4Control?.enable({ emitEvent: false });
      } else {
        l4Control?.disable({ emitEvent: false });
        l4Control?.setValue('', { emitEvent: false });
        // Also disable and reset the last level
        l5Control?.disable({ emitEvent: false });
        l5Control?.setValue('', { emitEvent: false });
      }
    });

    effect(() => {
      const l4Selected = this.level4SelectionId();
      const l5Control = this.ouForm.get('level5');

      if (l4Selected) {
        l5Control?.enable({ emitEvent: false });
      } else {
        l5Control?.disable({ emitEvent: false });
        l5Control?.setValue('', { emitEvent: false });
      }
    });
  }

  // 5. ngOnInit to connect Form Value Changes to Selection Signals
  ngOnInit(): void {
    // L2 -> L3 Filter Driver
    this.ouForm.get('level2')?.valueChanges.subscribe((id) => {
      // Update signal for computed list filtering
      this.level2SelectionId.set(id);
      // Reset subsequent levels on L2 change
      this.ouForm.get('level3')?.setValue('');
      this.ouForm.get('level4')?.setValue('');
      this.ouForm.get('level5')?.setValue('');
    });

    // L3 -> L4 Filter Driver
    this.ouForm.get('level3')?.valueChanges.subscribe((id) => {
      this.level3SelectionId.set(id);
      this.ouForm.get('level4')?.setValue('');
      this.ouForm.get('level5')?.setValue('');
    });

    // L4 -> L5 Filter Driver
    this.ouForm.get('level4')?.valueChanges.subscribe((id) => {
      this.level4SelectionId.set(id);
      this.ouForm.get('level5')?.setValue('');
    });
  }
}
