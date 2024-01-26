import { Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import { UserWithdrawComponent } from './user-withdraw/user-withdraw.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'user-list',
				component: TableComponent
			},
      {
				path: 'user-payment',
				component: UserPaymentComponent
			},
      {
				path: 'user-withdraw',
				component: UserWithdrawComponent
			},
		]
	}
];
