import { Component, OnInit }
from '@angular/core';

@Component({
  selector: 'pl-test-ddkomponent',
  templateUrl: './test-ddkomponent.component.html',
  styleUrls: ['./test-ddkomponent.component.css']
})

export class TestDdkomponentComponent implements OnInit {

  constructor() { }

  dragItems1 = 
  [
    {name: "Udo Jürgens", type: "Mitarbeiter"},
    {name: "Opel", type: "Fahrzeuge"},
    {name: "Tapete", type: "Betriebsmittel"}
  ];
  Fahrzeuge =
  [
    {name: "BMW", type: "Fahrzeuge"},
    {name: "MErcedes", type: "Fahrzeuge"},
    {name: "Ferrari", type: "Fahrzeuge"}
  ];
  Mitarbeiter =
  [
    {name: "Peter", type: "Mitarbeiter"},
    {name: "HAnnes", type: "Mitarbeiter"},
    {name: "Manu", type: "Mitarbeiter"}
  ];
  Betriebsmittel =
  [
    {name: "Kneifzange", type: "Betriebsmittel"},
    {name: "Abzwicker", type: "Betriebsmittel"},
    {name: "Duspol", type: "Betriebsmittel"}
  ];

  ngOnInit()
  {

  }
  onItemDrop(e:any)
  {
    console.log(e.dragData);
    
    switch(e.dragData.type)
    {
      case 'Betriebsmittel':
      console.log("Dropped BM" + e.dragData.name)
      this.Betriebsmittel = this.compare(this.Betriebsmittel,e.dragData);
      break;
      case 'Mitarbeiter':
      console.log("Dropped Mitarbeiter" + e.dragData.name)
      this.Mitarbeiter = this.compare(this.Mitarbeiter,e.dragData);
      break;
      case 'Fahrzeuge': 
      console.log("Dropped Fahrzeug" + e.dragData.name)
      this.Fahrzeuge = this.compare(this.Fahrzeuge,e.dragData); 
      break;
      
    }
    this.dragItems1.push(e.dragData);
  }
  onDropMitarbeiter(e:any)
  {
    this.Mitarbeiter.push(e.dragData);
    this.Betriebsmittel = this.compare(this.Betriebsmittel, e.dragData);
  }
  onDropFahrzeuge(e:any)
  {
    this.Fahrzeuge.push(e.dragData);
    this.Betriebsmittel = this.compare(this.Betriebsmittel, e.dragData);
    
  }
  onDropBM(e:any)
  {
    this.Fahrzeuge.push(e.dragData);
    this.Betriebsmittel = this.compare(this.Betriebsmittel, e.dragData);    
  }
  
  
  
  
  compare (objectArray : Array<Object>, object)
  {
    let resultArray = new Array();
    objectArray.forEach((val : {name,type}) =>
    {
        if ((object.name === val.name) && (object.type === val.type))
        {
          
        }
        else 
        {
          resultArray.push(val);
        }
    });
    return resultArray;
  }

  
}
