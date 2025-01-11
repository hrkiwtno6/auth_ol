import { http, HttpResponse } from "msw";

const storageInfoListData = [
  {
    "storageInfoId": "1",
    "groupId": "group1",
    "storageInfoName": "hoge",
    "storageInfoPass": "hoge",
    "storageInfoMemo": "hoge",
  },
  {
    "storageInfoId": "2",
    "groupId": "group2",
    "storageInfoName": "hoge",
    "storageInfoPass": "hoge",
    "storageInfoMemo": "hoge",
  },
]

export const handlers = [
  //ログイン
  // http.post("/api/login", () => {
  //   return HttpResponse.json({ status: 200 });
  // }),

  //情報取得
//   http.post("/api/getStorageInfoList", () => {
//     return HttpResponse.json({
//       storageInfoList: storageInfoListData
//     });
//   }),

// //情報登録
// http.post("/api/registStorageInfo", () => {
//   return HttpResponse.json({ status: 200 });
// }),

//   //情報更新
//   http.post("/api/updateStorageInfo", () => {
//     return HttpResponse.json({ status: 200 });
//   }),
];

