import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface TodoItem {
  title: string;
  description: string;
  isComplete: boolean;
  date: string;
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

  // 詳細が表示されているか
  public hasDetail = false;

  // アイテムリスト
  public itemList: Array<TodoItem> = new Array<TodoItem>();

  // 入力フォーム
  public todoForm!: FormGroup;

  constructor(
    protected formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    // Form の作成と初期値設定をします。
    this.todoForm = this.formBuilder.group({
      title: ['',
        [
          Validators.required
        ]
      ],
      description: [''],
      date: [''],
      isComplete: [false]
    });
  }

  // todoItem を 保存します
  onSaveTodoItem(): void {
    const item: TodoItem = {
      title: this.todoForm.get('title')!.value,
      isComplete: false,
      description: '',
      date: ''
    };

    if (this.hasDetail) {
      item.description = this.todoForm.get('description')!.value;
      item.date = this.todoForm.get('date')!.value;
    }

    this.itemList.push(item);
    this.clearForm();
    console.log(this.itemList);
  }

  // フォームの値をリセット
  clearForm(): void {
    this.todoForm.reset();
  }

  // 指定した要素を削除
  onDeleteItem(index: number): void {
    this.itemList.splice(index, 1);
  }
}
