import { Component, Input } from '@angular/core';
import { Livro } from '../livros/livro.model';

@Component({
  selector: 'app-livros-lista',
  templateUrl: './livros-lista.component.html',
  styleUrls: ['./livros-lista.component.css']
})
export class LivrosListaComponent{
  @Input()
  livros: Livro[] = [];

}
