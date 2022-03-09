import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';




describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  //simula el tiempo de una promesa, pero realmente la hace un proceos
  //sincrono pero de no tenerla me marcaria error pues se esta esperando la
  //resolución de esta promesa y el async genera que esta termine. La promesa 
  //que estamos simulando es la del TestBed. 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      //lo importamos por todos los elementos de material y directivas que usamos
      imports: [CoursesModule], 
    })
      .compileComponents()
      .then(() =>{

        //creamos una instancia de mi elemento
        fixture = TestBed.createComponent(CoursesCardListComponent);
        //ejecutamos solo esta instancia fixture 
        component = fixture.componentInstance; 
        el = fixture.debugElement;
  
      });
  

  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });


  it("should display the course list", () => {

    //inicializamos nuestro componente con todos los cursos
    //para colocarlos en la pantalla, cada una de las cartas
    //apartir del ngfor.
    component.courses = setupCourses();
    //Toma en cuenta los cambios que se han creado en el componente
    //y actualiza la isntancia con esos nuevos elementos.
    fixture.detectChanges()
    //traemos toda la lista de cartas del DOM apartir de esa
    //clase
    const cards = el.queryAll(By.css('.course-card'));
    expect(cards).toBeTruthy('Could not find cards');
    expect(cards.length).toBe(12, 'Unexpected number of courses');
  });


  it("should display the first course", () => {
      
    component.courses = setupCourses();
    fixture.detectChanges();

    const course = component.courses[0];
    const card = el.query(By.css(".course-card:first-child"));
    const title = card.query(By.css('mat-card-title'));
    const image = card.query(By.css('img'));
    expect(card).toBeTruthy('Could not find course card');
    expect(title.nativeElement.textContent).toBe(course.titles.description);
    expect(image.nativeElement.src).toBe(course.iconUrl);
      
  });


});


