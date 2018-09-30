import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Product } from './product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  produto: any = new Product("", "", 0, "");

  produtos: any = []

  ngOnInit() {
    this.carregarTabela();
  }

  carregarTabela() {
    this.http.get("http://localhost:8085/product").toPromise().then(res => {
      this.produtos = res;
    });
  }

  enviar() {
    console.log(this.produto.id);
    if (this.produto.id == "") {
      this.http.post("http://localhost:8085/product", this.produto).toPromise().then(res => {
        this.produto = new Product("", "", 0, "");
        this.carregarTabela();
        alert("Enviado com sucesso!");
      });
    } else {
      this.http.put("http://localhost:8085/product", this.produto).toPromise().then(res => {
        this.produto = new Product("", "", 0, "");
        this.carregarTabela();
        alert("Enviado com sucesso!");
      });
    }
  }

  editar(id: string) {
    this.http.get("http://localhost:8085/product/" + id).toPromise().then(res => {
      this.produto = res;
    });
  }

  delete(id: string) {
    this.http.delete("http://localhost:8085/product/" + id).toPromise().then(res => {
      this.carregarTabela();
      alert("Deletado com sucesso");
    });
  }




}
