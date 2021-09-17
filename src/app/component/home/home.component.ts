import { Component } from '@angular/core';
import { OnInit} from '@angular/core';
import { ApiService } from 'src/app/services/api.services';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  anatomicalStructures: any = [];
  uniqueAnatomicalStructures: any = [];
  popupdata: any ;
  closeResult: string = '';
  result: string ='';
  regexStr: any =[];
  description: any;
  iri:any;
  ontology_iri:any;
  name:any;
  errorpopup:boolean=false;

  constructor(private apiService: ApiService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.apiService.getAnatomicalStructures()
    this.apiService.getAnatomicalStructures()
    .subscribe((output: any) => {
      //console.log(output);
      for (let i = 0; i< output.data.length; i++) {
        //console.log(output.data[i].anatomical_structures);
        for (let j =0; j< output.data[i].anatomical_structures.length; j++) {
          if(output.data[i].anatomical_structures[j].id)
            this.anatomicalStructures.push(output.data[i].anatomical_structures[j]);
        }
      }
      var uniqueData: any[] = [];
      this.anatomicalStructures.filter(function(structure: any){
        var i = uniqueData.findIndex(x => x.name == structure.name);
        if(i <= -1){
          uniqueData.push(structure);
        }
        return null;
      });
      this.uniqueAnatomicalStructures = uniqueData;
    }
    );
  }

  openDescription(name:string,id: string, modal: any) {
    var str = id;
    this.errorpopup=false;
    console.log("hellooo"+id);
    // for formatting the ID to pass in the api call
    this.regexStr = str.match(/[a-z]+|[^a-z]+/gi);
    this.result= this.regexStr[0]+'_'+this.regexStr[1];
    if(id==="NOT"){
    this.errorpopup=true;
    }else{
    this.name=name;
    this.apiService.getStrutureDescription(this.result)
     this.apiService.getStrutureDescription(this.result)
     .subscribe((output: any) => {
       this.description=output._embedded.terms[0].description;
       this.ontology_iri=output._embedded.terms[0].ontology_iri;
       this.iri=output._embedded.terms[0].iri;
     });
    }
    this.open(modal);
  }

  open(content: any) {
    this.modalService.open(content);
  }
}
