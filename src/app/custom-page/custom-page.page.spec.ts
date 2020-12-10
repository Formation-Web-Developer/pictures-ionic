import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CustomPagePage } from './custom-page.page';

// @ts-ignore
describe('Tab1Page', () => {
  let component: CustomPagePage;
  let fixture: ComponentFixture<CustomPagePage>;

  // @ts-ignore
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomPagePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // @ts-ignore
  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
