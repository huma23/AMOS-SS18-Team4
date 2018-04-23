import { Input,Component, OnInit }  from '@angular/core';
import { ConstructionManager}       from '../../shared/construction-manager';
import { CalendarWeekItemComponent} from '../calendar-week-item/calendar-week-item.component' ;

@Component({
  selector: 'pl-calendar-content',
  templateUrl: './calendar-content.component.html',
  styleUrls: ['./calendar-content.component.css']
})
export class CalendarContentComponent implements OnInit {

  @Input()
  public constructionManagers  : Array<ConstructionManager>;


  constructor( )
  {
    
  }

  ngOnInit()
  {
  
  }

}
