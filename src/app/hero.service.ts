import { Injectable } from '@angular/core';

import { Hero } from './hero';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
    private heroesUrl = 'api/heroes';  // URL to web api
    constructor(private http: Http) { }
    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()//from RxJS Observable
            .then(response => response.json().data as Hero[])//extract data within response (notice the .json file)
            //.then resolves the promise
            .catch(this.handleError);//always handle errors from API calls
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only, in RL handle it whatever
        return Promise.reject(error.message || error);//displays error report the user
    }

    private headers = new Headers({ 'Content-Type': 'application/json' });
    getHero(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;//gets hero by ID instead of searching through whole array like before
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
    }
  // See the "Take it slow" appendix
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }
  //update 'put' into DB after save
  update(hero: Hero): Promise<Hero> {
      const url = `${this.heroesUrl}/${hero.id}`;
      return this.http
          .put(url, JSON.stringify(hero), { headers: this.headers })
          .toPromise()
          .then(() => hero)
          .catch(this.handleError);
  }

  //this actually adds the hero to the DB from the 'mock-api' put call, this code would normally be on the server I believe
  create(name: string): Promise<Hero> {
      return this.http
          //remember post = create in http protocol
          .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
          .toPromise()
          .then(res => res.json().data as Hero)
          .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
      const url = `${this.heroesUrl}/${id}`;
      return this.http.delete(url, { headers: this.headers })
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
  }
}
