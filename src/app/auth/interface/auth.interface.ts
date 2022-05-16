export interface IUser {
    readonly UserId?: string;
    readonly UserName: string;
    readonly UserPassword: string;
    readonly UserEmail: string;
    readonly UserContactNo: string;
    UserUniqueId?: string;
    readonly UserImageUrl?: string;
    readonly UserRole?: string[];
    readonly UserAddress: string; 
    UserCreatedDate?: Date;
    UserCreatedBy?: string;
    readonly UserUpdatedBy?: string;
    UserUpdatedDate?: Date;
    readonly Active?: boolean;
  
  }