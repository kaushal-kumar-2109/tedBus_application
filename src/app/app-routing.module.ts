import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './Component/landing-page/landing-page.component';
import { SelectbusPageComponent } from './Component/selectbus-page/selectbus-page.component';
import { PaymentPageComponent } from './Component/payment-page/payment-page.component';
import { ProfilePageComponent } from './Component/profile-page/profile-page.component';
import { SignupComponent } from './Component/signup/signup.component';
import { LoginComponent } from './Component/login/login.component';
import { CommunityFeedComponent } from './Component/community/community-feed/community-feed.component';
import { PostDetailComponent } from './Component/community/post-detail/post-detail.component';

const routes: Routes = [
  {path: '',component:LandingPageComponent},
  {path: 'select-bus',component:SelectbusPageComponent},
  {path:'payment',component:PaymentPageComponent},
  {path:'profile',component:ProfilePageComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'community',component:CommunityFeedComponent},
  {path:'community/:id',component:PostDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
