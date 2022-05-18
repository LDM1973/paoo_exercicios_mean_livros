import { Component, OnInit, OnDestroy } from '@angular/core';
import { Livro } from '../livros/livro.model';
import { LivroService } from '../livros/livro.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-livros-lista',
  templateUrl: './livros-lista.component.html',
  styleUrls: ['./livros-lista.component.css']
})

export class LivrosListaComponent implements OnInit, OnDestroy {

  livros: Livro[] = [];
  private livrosSubscription!: Subscription;

  constructor(private livroService: LivroService) {

  }

  ngOnInit() : void {
    this.livros = this.livroService.getLivros();
    this.livrosSubscription = this.livroService
      .getListaDeLivrosAtualizadaObservable()
      .subscribe((livros: Livro[]) => {
        this.livros = livros;
      });
  }

  ngOnDestroy(): void {
    this.livrosSubscription.unsubscribe();
  }
}
