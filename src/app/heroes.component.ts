import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private router: Router, private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
      this.router.navigate(['/detail', this.selectedHero.id]);
  }

    //responds to save click event, pushes hero to database
  add(name: string): void {
      name = name.trim();
      if (!name) { return; }//when given name is not blank (and save event was clicked remember), this delegates the responsibility to the hero service
      this.heroService.create(name)
          .then(hero => {
              this.heroes.push(hero);
              this.selectedHero = null;//clears name selection here
          });
  }
    //responds to 'x' click event, pulls hero from database
  delete(hero: Hero): void {
      this.heroService
          .delete(hero.id)//calls delete function here (delegates to herosevice of course)
          .then(() => {
              this.heroes = this.heroes.filter(h => h !== hero);//.filters out everything that is not 'hero' and includes only those in display array
              //I have no idea how 'h' nows it is supposed to be here, I suppose from the this.heroes reference
              if (this.selectedHero === hero) { this.selectedHero = null; }
          });
  }

}
