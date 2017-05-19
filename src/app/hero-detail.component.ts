import { Component, OnInit, Input } from '@angular/core';
import { Hero } from './hero';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from './hero.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,

        private location: Location
    ) { }
    @Input() hero: Hero;
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.heroService.getHero(+params['id']))//'+' typecasts the #id into a string
            .subscribe(hero => this.hero = hero);
        //no need to unsubscribe framework cleans this up when component is destroyed
    }
    //back button
    goBack(): void {
        this.location.back();
    }
    //save button
    save(): void {
        this.heroService.update(this.hero)
            .then(() => this.goBack());
    }
 
}
