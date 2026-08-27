import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { MainComponent } from './main';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  // Mock simulado para evitar errores de inyección de MSAL
  const msalServiceMock = {
    instance: {
      getActiveAccount: () => ({ name: 'Usuario Prueba', username: 'test@pedidos360.cl' }),
      setActiveAccount: () => {}
    },
    logoutRedirect: () => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [
        provideRouter([]),
        { provide: MsalService, useValue: msalServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});