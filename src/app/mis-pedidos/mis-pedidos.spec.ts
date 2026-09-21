import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MisPedidosComponent } from './mis-pedidos'; 

describe('MisPedidosComponent', () => {
  let component: MisPedidosComponent;
  let fixture: ComponentFixture<MisPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisPedidosComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MisPedidosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('debería cargar los datos tras el tiempo de espera simulado', fakeAsync(() => {
    fixture.detectChanges(); // Ejecuta ngOnInit
    
    // CORRECCIÓN: usamos toBeTruthy()
    expect(component.cargando).toBeTruthy(); 
    
    tick(1500); // Simulamos el paso de los 1.5 segundos
    fixture.detectChanges();
    
    // CORRECCIÓN: usamos toBeFalsy()
    expect(component.cargando).toBeFalsy();
    
    // CORRECCIÓN: usamos toEqual(3)
    expect(component.misPedidos.length).toEqual(3); 
  }));
});