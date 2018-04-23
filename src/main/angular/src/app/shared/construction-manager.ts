
import {CPlan}  from './c-plan';
export {CPlan} from './c-plan';



export class ConstructionManager
{
    constructor(
        public name             : string, 
        public foreName         : string, 
        public title            : string, 
        public constructionPlans : Array<CPlan>
    )
    
    { }
}
