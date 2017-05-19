import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Hero } from './hero';


@Injectable()
export class HeroSearchService {
    constructor(private http: Http) { }
    search(term: string): Observable<Hero[]> {//notice observable in the object declaration
        return this.http
            .get(`app/heroes/?name=${term}`)
            .map(response => response.json().data as Hero[]);
        //notice there is no .toPromise(), instead the observable is being returned from server
        //after map extracts the hero data from that observable
    }
}