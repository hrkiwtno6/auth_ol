import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetStorageInfoListService } from '../../services/getStorageInfoList.service';
import { RegistStorageInfoService } from '../../services/registStorageInfo.service';
import { UpdateStorageInfoService } from '../../services/updateStorageInfo.service';
import { IUpdateStorageInfo, OUpdateStorageInfo } from '../../models/updateStorageInfo.model';
import { IRegistStorageInfo, ORegistStorageInfo } from '../../models/registStorageInfo.model';
import { IGetStorageInfoList, OGetStorageInfoList, storageInfo } from '../../models/getStorageInfoList.model';
import { HttpErrorResponse } from '@angular/common/http';

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

  hasDetail = false;
  passwordItemList: Array<PasswordItem> = new Array<PasswordItem>();
  passwordForm!: FormGroup;
  passwordListFormArray!: FormArray;
  passwordListFormGroup!: FormGroup;
  iGetStorageInfoList!: IGetStorageInfoList;
  // oGetStorageInfoList!: OGetStorageInfoList;
  oGetStorageInfoList: OGetStorageInfoList = { storageInfoList: new Array<storageInfo> };
  iRegistStorageInfo!: IRegistStorageInfo;
  oRegistStorageInfo!: ORegistStorageInfo;
  iUpdateStorageInfo!: IUpdateStorageInfo;
  oUpdateStorageInfo!: OUpdateStorageInfo;


  constructor(
    private getStorageInfoListService: GetStorageInfoListService,
    private registStorageInfoService: RegistStorageInfoService,
    private updateStorageInfoService: UpdateStorageInfoService,
    protected formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getStorageInfoList();
    this.createForm();
  }

  async getStorageInfoList() {
    this.iGetStorageInfoList = {};
    this.getStorageInfoListService.getStorageInfoList(this.iGetStorageInfoList).subscribe(res => {
      this.oGetStorageInfoList = res;
    }
    );
  }

  registStorageInfo() {
    this.iRegistStorageInfo = {
      groupId: '1234567890',
      storageInfoName: 'hoge',
      storageInfoPass: 'hoge',
      storageInfoMemo: 'hoge'
    }
    this.registStorageInfoService.registStorageInfoList(this.iRegistStorageInfo).subscribe(res => {
      this.oRegistStorageInfo = res;
      window.alert('登録完了');
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 200) {
          window.alert('登録失敗');
        }
      }
    }
    );
    this.clearForm();
  }

  updateStorageInfo() {
    this.updateStorageInfoService.updateStorageInfoList(this.iUpdateStorageInfo).subscribe(res => {
      this.oUpdateStorageInfo = res;
    }
    );
  }


  async createForm() {
    this.passwordForm = this.formBuilder.group({
      groupId: ['', [Validators.maxLength(100)]],
      storageInfoName: ['', [Validators.required, Validators.maxLength(100)]],
      storageInfoPass: ['', [Validators.required, Validators.maxLength(100)]],
      storageInfoMemo: ['', [Validators.maxLength(100)]]
    });
  }

  clearForm(): void {
    this.passwordForm.reset();
  }

  onDeleteItem(index: number): void {
    this.passwordItemList.splice(index, 1);
  }
}
