import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth/guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@template/template.module').then(
        (module) => module.TemplateModule,
      )
  },
  {
    path : 'login',
    loadChildren: () =>
      import('@auth/auth.module').then(
        (module) => module.AuthModule,
      ),
    pathMatch: 'full'
  },
  {
    path : 'articles',
    canActivate : [AuthGuard],
    data: { permissionType: 'canAccessArticles'},
    loadChildren: () =>
      import('@article/article.module').then(
        (module) => module.ArticleModule,
      ),
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}