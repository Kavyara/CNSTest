import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Row } from '../models/row';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  getAnatomicalStructuresApi: string = 'https://asctb-api.herokuapp.com/v2/18lJe-9fq5fHWr-9HuFTzhWnmfygeuXs2bbsXO8vh1FU/0';
  getStrutureDescriptionApi: string = 'https://www.ebi.ac.uk/ols/api/ontologies/uberon/terms?iri=http://purl.obolibrary.org/obo/';

  getAnatomicalStructures() {
    return this.http.get(this.getAnatomicalStructuresApi);
  }

  getStrutureDescription(structureID: string) {
    return this.http.get(this.getStrutureDescriptionApi+structureID);
  }
}