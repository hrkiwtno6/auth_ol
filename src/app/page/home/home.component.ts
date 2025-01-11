import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetStorageInfoListService } from '../../services/getStorageInfoList.service';
import { RegistStorageInfoService } from '../../services/registStorageInfo.service';
import { UpdateStorageInfoService } from '../../services/updateStorageInfo.service';
import { IUpdateStorageInfo, OUpdateStorageInfo } from '../../models/updateStorageInfo.model';
import { IRegistStorageInfo, ORegistStorageInfo } from '../../models/registStorageInfo.model';
import { IGetStorageInfoList, OGetStorageInfoList, StorageInfo } from '../../models/getStorageInfoList.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

interface PasswordItem {
  groupId: string;
  storageInfoName: string;
  storageInfoPass: string;
  storageInfoMemo: string;
}

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
  #cookieService = inject(CookieService);

  passwordItemList: Array<PasswordItem> = new Array<PasswordItem>();
  registPasswordForm!: FormGroup;
  passwordListForm = this.#fb.group({
    passwordList: this.#fb.array([])
  });
  get passwordItemListArray(): PasswordItem[] {
    return this.passwordItemList;
  }
  passwordListFormArray!: FormArray;
  passwordListFormGroup!: FormGroup;
  iGetStorageInfoList!: IGetStorageInfoList;
  oGetStorageInfoList: OGetStorageInfoList = { storageInfoList: new Array<StorageInfo> };
  iRegistStorageInfo!: IRegistStorageInfo;
  oRegistStorageInfo!: ORegistStorageInfo;
  iUpdateStorageInfo!: IUpdateStorageInfo;
  oUpdateStorageInfo!: OUpdateStorageInfo;

  get passwordListFormGroupArray(): FormGroup[] {
    return this.passwordListFormArray.controls as unknown as FormGroup[];
  }


  constructor(
  ) { }

  ngOnInit() {
    this.getStorageInfoList();
    this.createForm();
  }

  async getStorageInfoList() {
    this.iGetStorageInfoList = { groupId: this.#cookieService.get('groupId') ?? '' };
    this.#getStorageInfoListService.getStorageInfoList(this.iGetStorageInfoList).subscribe(res => {
      this.oGetStorageInfoList = res;
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
    this.#registStorageInfoService.registStorageInfoList(this.iRegistStorageInfo).subscribe({
      next: (res) => {
        this.oRegistStorageInfo = res;
        window.alert('登録完了');
      },
      error: err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 200) {
            window.alert('登録失敗');
          }
        }
      }
    }
    );
    this.clearForm();
  }

  updateStorageInfo() {
    this.#updateStorageInfoService.updateStorageInfoList(this.iUpdateStorageInfo).subscribe(res => {
      this.oUpdateStorageInfo = res;
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

    for (let storageInfoItem of this.oGetStorageInfoList.storageInfoList) {
      this.passwordListFormArray.push(
        this.#fb.group({
          groupId: [storageInfoItem.groupId],
          storageInfoId: [storageInfoItem.storageInfoId],
          storageInfoName: [storageInfoItem.storageInfoName, [Validators.required, Validators.maxLength(100)]],
          storageInfoPass: [storageInfoItem.storageInfoPass, [Validators.required, Validators.maxLength(100)]],
          storageInfoMemo: [storageInfoItem.storageInfoMemo, [Validators.maxLength(100)]]
        }
        )
        );
    }
  }

  clearForm(): void {
    this.registPasswordForm.reset();
  }

  onDeleteItem(index: number): void {
    this.passwordItemList.splice(index, 1);
  }
}
