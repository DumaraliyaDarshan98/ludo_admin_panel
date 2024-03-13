import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { TableComponent } from "./table/table.component";
import { ContactUsComponent } from './contact-us/contact-us.component';
import { GameHistoryComponent } from './game-history/game-history.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationAddeditComponent } from './notification-addedit/notification-addedit.component';
import { PageNotificationComponent } from './page-notification/page-notification.component';
import { AddEditPageNotificationComponent } from './add-edit-page-notification/add-edit-page-notification.component';
import { WithdrawDetailComponent } from './withdraw-detail/withdraw-detail.component';
import { AdminVerifyResultComponent } from './admin-verify-result/admin-verify-result.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TableComponent,
    DatePipe
  ],
  declarations: [
    ContactUsComponent,
    GameHistoryComponent,
    AdminProfileComponent,
    GameDetailsComponent,
    NotificationComponent,
    NotificationAddeditComponent,
    PageNotificationComponent,
    AddEditPageNotificationComponent,
    WithdrawDetailComponent,
    AdminVerifyResultComponent,
  ],
})
export class ComponentsModule { }
