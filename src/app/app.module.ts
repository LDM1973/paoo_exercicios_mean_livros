import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppComponent } from './app.component';
import { LivrosInserirComponent } from './livros/livros-inserir/livros-inserir.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { LivrosListaComponent } from './livros-lista/livros-lista.component';

import { LivroService } from './livros/livro.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, LivrosInserirComponent, CabecalhoComponent, LivrosListaComponent],
  imports: [BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [LivroService],
  bootstrap: [AppComponent],
  })
export class AppModule {}
