import {ConstructionManager} from './construction-manager' ;

export class CalendarWeek
{
    constructor(
        public weekOfTheYear        : number, 
        public year                 : number, 
        public header               : Array<string>,
        public constructionManagers : ConstructionManager []

    ) { }


}
