import { async, ComponentFixture, TestBed
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { addMatchers, click } from '../../testing';//imports the custom click function here

import { Hero } from '../model/hero';
import { DashboardHeroComponent } from './dashboard-hero.component';

beforeEach( addMatchers );

describe('DashboardHeroComponent when tested directly', () => {

  let component: DashboardHeroComponent;
  let expectedHero: Hero;
  let fixture: ComponentFixture<DashboardHeroComponent>;
  let heroEl: DebugElement;

  // async beforeEach
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardHeroComponent ],
    })
    .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHeroComponent);
    component    = fixture.componentInstance;
    heroEl  = fixture.debugElement.query(By.css('.hero')); // find hero element

    // pretend that it was wired to something that supplied a hero
    expectedHero = new Hero(42, 'Test Name');
    component.hero = expectedHero;
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should display hero name', () => {
    const expectedPipedName = expectedHero.name.toUpperCase();
    expect(heroEl.nativeElement.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked', () => {
    let selectedHero: Hero;
    component.selected.subscribe((hero: Hero) => selectedHero = hero);//remember to subscribe to events with a callback function

    click(heroEl);   // triggerEventHandler helper. This is a helper function from testing/index.ts that has to be manually added!
    //heroEl.triggerEventHandler('click', null);
    expect(selectedHero).toBe(expectedHero);
  });

  it('should raise selected event when clicked', () => {
    let selectedHero: Hero;
    component.selected.subscribe((hero: Hero) => selectedHero = hero);

    click(heroEl);   // triggerEventHandler helper
    expect(selectedHero).toBe(expectedHero);
  });
});

//////////////////
//They do this option instead of testing it with the actual DashboardComponent
//The actual test component is defined below
describe('DashboardHeroComponent when inside a test host', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let heroEl: DebugElement;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardHeroComponent, TestHostComponent ], // declare both
    }).compileComponents();
  }));

  beforeEach(() => {
    // create TestHostComponent instead of DashboardHeroComponent
    fixture  = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    heroEl   = fixture.debugElement.query(By.css('.hero')); // find hero
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should display hero name', () => {
    const expectedPipedName = testHost.hero.name.toUpperCase();
    expect(heroEl.nativeElement.textContent).toContain(expectedPipedName);
  });


  it('should raise selected event when clicked', () => {
    click(heroEl);
    // selected hero should be the same data bound hero
    expect(testHost.selectedHero).toBe(testHost.hero);
  });
});

////// Test Host Component //////
//remember it's just a fake component to test the dashboardherocomponent
import { Component } from '@angular/core';

@Component({
  template: `
    <dashboard-hero  [hero]="hero"  (selected)="onSelected($event)"></dashboard-hero>`
})
class TestHostComponent {
  hero = new Hero(42, 'Test Name');
  selectedHero: Hero;
  onSelected(hero: Hero) { this.selectedHero = hero; }
}
