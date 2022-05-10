interface Room {
  id: string;
}

export interface ITestUserResDto {
  email: string;
  id: string;
  verified: boolean;
  googleId?: string;
  rooms: (string | Room)[];
  createdAt: string;
  updatedAt: string;
}

export const userStub = (): ITestUserResDto => ({
  id: '627ab680b89632c7e8fada64',
  email: 'admin@admin.com',
  verified: false,
  rooms: ['627ab68fb89632c7e8fada69', '627abb56bbb0516aa359c459'],
  createdAt: '2022-05-10T19:01:20.495Z',
  updatedAt: '2022-05-10T19:35:29.728Z',
});
