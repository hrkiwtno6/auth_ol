import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { GetStorageInfoListService } from '../../services/getStorageInfoList.service';
import { RegistStorageInfoService } from '../../services/registStorageInfo.service';
import { UpdateStorageInfoService } from '../../services/updateStorageInfo.service';
import { IUpdateStorageInfo, OUpdateStorageInfo } from '../../models/updateStorageInfo.model';
import { IRegistStorageInfo, ORegistStorageInfo } from '../../models/registStorageInfo.model';
import { IGetStorageInfoList, OGetStorageInfoList, StorageInfo } from '../../models/getStorageInfoList.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { IDeleteStorageInfo, ODeleteStorageInfo } from '../../models/deleteStorageInfo.model';
import { DeleteStorageInfoService } from '../../services/deleteStorageInfo.service';

export interface StorageInfoListItem {
  storageInfoId: string;
  groupId: string;
  storageInfoName: string;
  storageInfoPass: string;
  storageInfoMemo: string;
  isEditable: boolean;
}

type PasswordItemControls = {
  [P in keyof StorageInfoListItem]: FormControl<StorageInfoListItem[P] | null>;
};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  standalone: true,
  providers: [
    FormBuilder
  ]
})
export class HomeComponent implements OnInit {
  #fb = inject(FormBuilder);
  #getStorageInfoListService = inject(GetStorageInfoListService);
  #registStorageInfoService = inject(RegistStorageInfoService);
  #updateStorageInfoService = inject(UpdateStorageInfoService);
  #deleteStorageInfoService = inject(DeleteStorageInfoService);
  #cookieService = inject(CookieService);

  registPasswordForm!: FormGroup;
  passwordListForm = this.#fb.group({
    passwordListFormArray: this.#fb.array([])
  });
  canEdit!: boolean;
  get passwordListFormArray(): FormArray<FormGroup<PasswordItemControls>> {
    return this.passwordListForm.get('passwordListFormArray') as FormArray<FormGroup<PasswordItemControls>>;
  }

  iGetStorageInfoList!: IGetStorageInfoList;
  oGetStorageInfoList: OGetStorageInfoList = { storageInfoList: new Array<StorageInfo> };
  iRegistStorageInfo!: IRegistStorageInfo;
  oRegistStorageInfo!: ORegistStorageInfo;
  iUpdateStorageInfo!: IUpdateStorageInfo;
  oUpdateStorageInfo!: OUpdateStorageInfo;
  iDeleteStorageInfo!: IDeleteStorageInfo;
  oDeleteStorageInfo!: ODeleteStorageInfo;


  get passwordListFormGroupArray(): FormGroup[] {
    return this.passwordListFormArray.controls as unknown as FormGroup[];
  }


  constructor(
  ) { }

  ngOnInit() {
    this.getStorageInfoList();
    this.createForm();
    this.canEdit = false;
  }

  async getStorageInfoList() {
    this.passwordListFormArray.clear();
    this.iGetStorageInfoList = { groupId: this.#cookieService.get('groupId') ?? '' };
    this.#getStorageInfoListService.getStorageInfoList(this.iGetStorageInfoList).subscribe(res => {
      this.oGetStorageInfoList = res;
      this.oGetStorageInfoList.storageInfoList.forEach(storageInfoItem => {
        this.passwordListFormArray.push(
          this.#fb.group({
            storageInfoId: [storageInfoItem.storageInfoId ?? ''],
            groupId: [storageInfoItem.groupId ?? ''],
            storageInfoName: [storageInfoItem.storageInfoName ?? '', [Validators.required, Validators.maxLength(100)]],
            storageInfoPass: [storageInfoItem.storageInfoPass ?? '', [Validators.required, Validators.maxLength(100)]],
            storageInfoMemo: [storageInfoItem.storageInfoMemo ?? '', [Validators.maxLength(100)]],
            isEditable: [true]
          }, { updateOn: 'blur' }
          )
        );
      }
      )
    }
    );
  }

  registStorageInfo() {
    this.iRegistStorageInfo = {
      groupId: this.#cookieService.get('groupId') ?? '',
      storageInfoName: this.registPasswordForm.value.storageInfoName,
      storageInfoPass: this.registPasswordForm.value.storageInfoPass,
      storageInfoMemo: this.registPasswordForm.value.storageInfoMemo
    }
    this.#registStorageInfoService.registStorageInfo(this.iRegistStorageInfo).subscribe({
      next: (res) => {
        this.oRegistStorageInfo = res;
        window.alert('登録しました。');
        this.registPasswordForm.reset();
        this.ngOnInit();
      },
      error: err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 200) {
            window.alert('登録に失敗しました。\n再度お試しください。');
          }
        }
      }
    }
    );
  }

  updateStorageInfo(index: number) {
    this.iUpdateStorageInfo = {
      storageInfoId: this.passwordListFormArray.controls[index].value.storageInfoId!,
      groupId: this.passwordListFormArray.controls[index].value.groupId!,
      storageInfoName: this.passwordListFormArray.controls[index].value.storageInfoName!,
      storageInfoPass: this.passwordListFormArray.controls[index].value.storageInfoPass!,
      storageInfoMemo: this.passwordListFormArray.controls[index].value.storageInfoMemo!
    }
    this.#updateStorageInfoService.updateStorageInfo(this.iUpdateStorageInfo).subscribe({
      next: (res) => {
        this.oRegistStorageInfo = res;
        window.alert('更新しました。');
        this.ngOnInit();
      },
      error: err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 200) {
            window.alert('更新に失敗しました。\n再度お試しください。');
          }
        }
      }
    }
    );
  }

  deleteStorageInfo(index: number) {
    this.iDeleteStorageInfo = {
      storageInfoId: this.passwordListFormArray.controls[index].value.storageInfoId!,
      groupId: this.passwordListFormArray.controls[index].value.groupId!,
    }
    this.#deleteStorageInfoService.deleteStorageInfo(this.iDeleteStorageInfo).subscribe({
      next: (res) => {
        this.oDeleteStorageInfo = res;
        window.alert('削除しました。');
        this.ngOnInit();
      },
      error: err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 200) {
            window.alert('削除に失敗しました。\n再度お試しください。');
          }
        }
      }
    }
    );
  }


  async createForm() {
    this.registPasswordForm = this.#fb.group({
      groupId: ['', [Validators.maxLength(100)]],
      storageInfoName: ['', [Validators.required, Validators.maxLength(100)]],
      storageInfoPass: ['', [Validators.required, Validators.maxLength(100)]],
      storageInfoMemo: ['', [Validators.maxLength(100)]]
    });

  }

  cancelEdit(index: number): void {
    this.passwordListFormArray.removeAt(index);
  }
}
