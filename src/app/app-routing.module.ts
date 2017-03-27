import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardV1Component} from "./demo/custom-pages/dashboard-v1/dashboard-v1.component";
import {AdminComponent} from "./core/admin/admin.component";
import {ButtonsComponent} from "./demo/components/buttons/buttons.component";
import {CardsComponent} from "./demo/components/cards/cards.component";
import {DialogsComponent} from "./demo/components/dialogs/dialogs.component";
import {GridListComponent} from "./demo/components/grid-list/grid-list.component";
import {ListsComponent} from "./demo/components/lists/lists.component";
import {MenuComponent} from "./demo/components/menu/menu.component";
import {SliderComponent} from "./demo/components/slider/slider.component";
import {SnackBarComponent} from "./demo/components/snack-bar/snack-bar.component";
import {TooltipComponent} from "./demo/components/tooltip/tooltip.component";
import {DynamicMenuComponent} from "./demo/dynamic-menu/dynamic-menu.component";
import {FormElementsComponent} from "./demo/forms/form-elements/form-elements.component";
import {FormWizardComponent} from "./demo/forms/form-wizard/form-wizard.component";
import {IconsComponent} from "./demo/icons/icons.component";
import {Level5Component} from "./demo/levels/level5/level5.component";
import {GoogleMapsComponent} from "./demo/maps/google-maps/google-maps.component";
import {SimpleTableComponent} from "./demo/tables/simple-table/simple-table.component";
import {FixedHeaderTableComponent} from "./demo/tables/fixed-header-table/fixed-header-table.component";
import {LoginComponent} from "./demo/custom-pages/login/login.component";
import {RegisterComponent} from "./demo/custom-pages/register/register.component";
import {ForgotPasswordComponent} from "./demo/custom-pages/forgot-password/forgot-password.component";
import {EditorComponent} from "./demo/editor/editor.component";
import {DashboardComponent} from "./demo/dashboard/dashboard.component";
import {DragAndDropComponent} from "./demo/drag-and-drop/drag-and-drop.component";
import {InboxComponent} from "./demo/apps/inbox/inbox.component";
import {CalendarComponent} from "./demo/apps/calendar/calendar.component";
import {ChatComponent} from "./demo/apps/chat/chat.component";
import {AutocompleteComponent} from "./demo/components/autocomplete/autocomplete.component";
import {HomeComponent} from "./home/home.component";
import {MainComponent} from "./main/main.component";


const routes: Routes = [
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'admin/apps/inbox',
        component: InboxComponent
      },
      {
        path: 'admin/apps/calendar',
        component: CalendarComponent
      },
      {
        path: 'admin/apps/chat',
        component: ChatComponent
      },
      {
        path: 'admin/dashboard-v1',
        component: DashboardV1Component,
      },
      {
        path: 'admin/components/autocomplete',
        component: AutocompleteComponent
      },
      {
        path: 'admin/components/buttons',
        component: ButtonsComponent
      },
      {
        path: 'admin/components/cards',
        component: CardsComponent
      },
      {
        path: 'admin/components/dialogs',
        component: DialogsComponent
      },
      {
        path: 'admin/components/grid-list',
        component: GridListComponent
      },
      {
        path: 'admin/components/lists',
        component: ListsComponent
      },
      {
        path: 'admin/components/menu',
        component: MenuComponent
      },
      {
        path: 'admin/components/slider',
        component: SliderComponent
      },
      {
        path: 'admin/components/snack-bar',
        component: SnackBarComponent
      },
      {
        path: 'admin/components/tooltips',
        component: TooltipComponent
      },
      {
        path: 'admin/dynamic-menu',
        component: DynamicMenuComponent
      },
      {
        path: 'admin/forms/form-elements',
        component: FormElementsComponent
      },
      {
        path: 'admin/forms/form-wizard',
        component: FormWizardComponent
      },
      {
        path: 'admin/icons',
        component: IconsComponent
      },
      {
        path: 'admin/level1/level2/level3/level4/level5',
        component: Level5Component
      },
      {
        path: 'admin/maps/google-maps',
        component: GoogleMapsComponent
      },
      {
        path: 'admin/tables/simple-table',
        component: SimpleTableComponent
      },
      {
        path: 'admin/tables/fixed-header-table',
        component: FixedHeaderTableComponent
      },
      {
        path: 'admin/drag-and-drop',
        component: DragAndDropComponent
      },
      {
        path: 'admin/editor',
        component: EditorComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
