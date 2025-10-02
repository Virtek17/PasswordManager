export interface PasswordEntry {
  id: string;
  serviceName: string;
  login: string;
  password: string;
  groupId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Group {
  id: string;
  name: string;
  color: string;
  icon?: string;
}