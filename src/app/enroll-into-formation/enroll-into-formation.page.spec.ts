import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnrollIntoFormationPage } from './enroll-into-formation.page';

describe('EnrollIntoFormationPage', () => {
  let component: EnrollIntoFormationPage;
  let fixture: ComponentFixture<EnrollIntoFormationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollIntoFormationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollIntoFormationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
