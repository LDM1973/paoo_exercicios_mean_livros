import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LivroService } from '../livro.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Livro } from '../livro.model';

@Component({
selector: 'app-livros-inserir',
templateUrl: './livros-inserir.component.html',
styleUrls: ['./livros-inserir.component.css']
})

export class LivrosInserirComponent {

  private modo: string = "criar";
  private idLivro: string;
  public livro: Livro;

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idLivro")){
        this.modo = "editar";
        this.idLivro = paramMap.get("idLivro");
        this.livroService.getLivro(this.idLivro).subscribe( dadosCli => {
          this.livro = {
          id: dadosCli._id,
          titulo: dadosCli.titulo,
          autor: dadosCli.autor,
          numeroPaginas: dadosCli.numeroPaginas
          };
        });
      }
      else{
        this.modo = "criar";
        this.idLivro = null;
      }
    })
  }

  constructor(public livroService: LivroService, public route: ActivatedRoute) { }

  onSalvarLivros(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.modo === "criar"){
      this.livroService.adicionarLivro(
        form.value.id,
        form.value.titulo,
        form.value.autor,
        form.value.numeroPaginas
        );
      }
      else{
      this.livroService.atualizarLivro(
        this.idLivro,
        form.value.titulo,
        form.value.autor,
        form.value.numeroPaginas
      )
    }
    form.resetForm();
  }
}
