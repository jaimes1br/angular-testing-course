import { fakeAsync, tick, flush, flushMicrotasks } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';


describe("Async Testing Examples", () =>{

    it('Asynchronous test example with Jasmine done()', (done: DoneFn) =>{
        let test = false;
        setTimeout(() => {
            console.log('running assertions');
            test = true;
            expect(test).toBeTruthy();
            done();
        },1000);
    });

    it('Asynchronous test example - setTimeOut()',fakeAsync(() =>{

        let test = false;
        setTimeout(() => {
            console.log('running assertions');
            test = true;
        },1000);

        //tick(1000); //nos permite adelantar el tiempo, la cantidad
        //en el argumento es la que pasaría, en este caso la siguiente 
        //linea ya se puede evaluar correctamente en la prueba porque
        //el bloque setTimeout ya se ejecuto.

        //otra forma de terminar todas las peticiones asincronas que 
        //se tengan es utilizando flush
        flush();
        expect(test).toBeTruthy();
           
    }));

    it('Asynchronous test example - plain Promise', fakeAsync(() => {
        let test = false;

        console.log('Creating promise');

        Promise.resolve().then(() => {
            console.log('Promise first then() evaluated successfully');
            return Promise.resolve();
        })
        .then(() => {
            console.log('Promise second then() evaluated successfully ');
            test = true;            
        })
       
        //ejecutamos y terminamos todas las tareas en mi micro task queue 
        //(nuestras promesas).
        flushMicrotasks();

        console.log('Running test assertions');
        expect(test).toBeTruthy();
           
    }));

    it('Asynchronous test example - Promise + setTimeout()', fakeAsync(() =>{
        let counter = 0;
        Promise.resolve()
            .then(() => {
                counter+=10;
                setTimeout(() =>{
                    counter+=1;
                },1000);
            })
        //sería correcto porque aun no se evalua la promesa o el set
        expect(counter).toBe(0);
        
        //Estamos terminando la promesa y ya cambia el valor, pasa el test
        flushMicrotasks();
        expect(counter).toBe(10);

        //empezamos a evaluar el set, hacemos que pase la mitad del tiempo
        //para este momento aún no termina el set por lo que no se cambia
        //el valor del counter sigue siendo 10
        tick(500);
        expect(counter).toBe(10);
        //terminamos el set con la otra parte del tiempo y ya evaluaria el 
        //valor de 11
        tick(500);
        expect(counter).toBe(11);    
    }));

    it('Asynchronous test example - Observable',fakeAsync(() => {
        let test = false;
        console.log('Creating Observable');
        //creamos y terminamos el observable con el of
        const test$ = of(test).pipe(delay(1000));
        
        test$.subscribe(() => {
            test = true;
        });

        //podemos usar tick porque delay por dentro ejecuta un 
        //setTimeout
        tick(1000);

        console.log('Running test assertions');
        expect(test).toBe(true);
        
    }));

})