export interface IGetStorageInfoList {
}

export interface storageInfo {
  storageInfoId: string;
  groupId: string;
  storageInfoName: string;
  storageInfoPass: string;
  storageInfoMemo: string;
}

export interface OGetStorageInfoList {
  storageInfoList: Array<storageInfo>;
}

