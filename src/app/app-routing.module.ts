import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivrosListaComponent } from './livros-lista/livros-lista.component';
import { LivrosInserirComponent } from './livros/livros-inserir/livros-inserir.component';

const routes: Routes = [
  { path: '', component: LivrosListaComponent },
  {path: 'criar', component: LivrosInserirComponent},
  {path: 'editar/:idLivro', component: LivrosInserirComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule{ }
