export interface IGetStorageInfoList {
  groupId: string;
}

export interface StorageInfo {
  storageInfoId: string;
  groupId: string;
  storageInfoName: string;
  storageInfoPass: string;
  storageInfoMemo: string;
}

export interface OGetStorageInfoList {
  storageInfoList: Array<StorageInfo>;
}

