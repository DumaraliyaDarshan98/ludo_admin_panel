import { Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import { UserWithdrawComponent } from './user-withdraw/user-withdraw.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { GameHistoryComponent } from './game-history/game-history.component';


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
      {
				path: 'contact-us',
				component: ContactUsComponent
			},
      {
				path: 'game-history',
				component: GameHistoryComponent
			},
		]
	}
];
