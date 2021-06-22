import {Demand} from './demand.model';

export interface DemandTracking {
    finished: Demand;
    new: Demand;
    taken: Demand;
}
