import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LivroService {
  removerLivro(id: string) {
    throw new Error('Method not implemented.');
  }
  private livros: Livro[] = [];
  private listaLivrosAtualizada = new Subject<Livro[]>();

  constructor (private httpClient: HttpClient){
  }

  getLivros(): void {
    this.httpClient.get <{mensagem: string, livros: any}>('http://localhost:3000/api/livros')
    .pipe(map((dados) => {
      return dados.livros.map((livro: { _id: any; titulo: any; autor: any; numeroPaginas: any; }) => {
        return {
        id: livro._id,
        titulo: livro.titulo,
        autor: livro.autor,
        numeroPaginas: livro.numeroPaginas
        }
      })
    }))
    .subscribe(
    (livros) => {
      this.livros = livros;
      this.listaLivrosAtualizada.next([...this.livros]);
      }
    )
  }

  adicionarLivro(id: string, titulo: string, autor: string, numeroPaginas: string) {
    const livro: Livro = {
      id: id,
      titulo: titulo,
      autor: autor,
      numeroPaginas: numeroPaginas
    };
    this.httpClient.post<{mensagem: string, id: string}> ('http://localhost:3000/api/livros',
    livro).subscribe(
    (dados) => {
      livro.id = dados.id;
      this.livros.push(livro);
      this.listaLivrosAtualizada.next([...this.livros]);
    }
  )
}

removerlivro (id: string): void{
  this.httpClient.delete(`http://localhost:3000/api/livros/${id}`).subscribe(() => {
  this.livros = this.livros.filter((cli) => {
  return cli.id !== id
  });
  this.listaLivrosAtualizada.next([...this.livros]);
  });
}

  getListaDeLivrosAtualizadaObservable() {
    return this.listaLivrosAtualizada.asObservable();
    }
}


