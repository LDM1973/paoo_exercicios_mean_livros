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

  getLivros (idLivro: string){
    //return {...this.clientes.find((cli) => cli.id === idCliente)};
    return this.httpClient.get<{_id: string, titulo: string, autor: string, numeroPaginas:
    string}>(`http://localhost:3000/api/livros/${idLivro}`);
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

  atualizarLivro (id: string, titulo: string, autor: string, numeroPaginas: string){
    const livro: livro = { id, titulo, autor, numeroPaginas};
    this.httpClient.put(`http://localhost:3000/api/livros/${id}`, livro)
    .subscribe((res => {
      const copia = [...this.livros];
      const indice = copia.findIndex (cli => cli.id === livro.id);
      copia[indice] = livro;
      this.livros = copia;
      this.listaLivrosAtualizada.next([...this.livros]);
    }));
  }

  removerlivro (id: string): void{
    this.httpClient.delete(`http://localhost:3000/api/livros/${id}`).subscribe(() => {
    this.livros = this.livros.filter((cli) => {
    return cli.id !== id
    });
    this.listaLivrosAtualizada.next([...this.livros]);
    });
  }

getLivro (idLivro: string){
  return {...this.livros.find((cli) => cli.id === idLivro)};
  }

  getListaDeLivrosAtualizadaObservable() {
    return this.listaLivrosAtualizada.asObservable();
    }
}


