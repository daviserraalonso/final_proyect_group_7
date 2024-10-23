var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { Component, inject, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../../service/user-service.service';
let RegisterStudentComponentComponent = (() => {
    let _classDecorators = [Component({
            selector: 'app-register-student-component',
            standalone: true,
            imports: [MatSelectModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
            templateUrl: './register-student-component.component.html',
            styleUrl: './register-student-component.component.css'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RegisterStudentComponentComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            RegisterStudentComponentComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        router = inject(Router);
        activateRoute = inject(ActivatedRoute);
        userServices = inject(UserServiceService);
        headerForm = 'Registarse como Alumno'; // header of form
        textButton = 'Enviar'; // text of button submit
        registerStudent;
        constructor() {
            this.registerStudent = new FormGroup({
                roleId: new FormControl(2, []), // roleId: 3 = student
                name: new FormControl(null, [
                    Validators.required,
                    Validators.minLength(3)
                ]),
                mail: new FormControl(null, [
                    Validators.required,
                    Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
                ]),
                password: new FormControl(null, [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.pattern(/^(?=.*[A-Za-z]).+$/), // required one letter
                    Validators.pattern(/^(?=.*[A-Z]).+$/), //required one capital letter
                    Validators.pattern(/^(?=.*\d).+$/), // required one number
                    Validators.pattern(/^(?=.*[@$!%*?&]).+$/), // requider special caracter
                ]),
                repeatPassword: new FormControl(null, [
                    Validators.required
                ])
            }, [this.checkPassword]);
        }
        ngOnInit() {
            this.activateRoute.params.subscribe(async (params) => {
                if (params.id) {
                    this.headerForm = 'Actualizar el usuario';
                    this.textButton = 'Actualizar datos';
                    const user = await this.userServices.getById(params.id);
                    this.registerStudent = new FormGroup({
                        id: new FormControl(user.id, []),
                        name: new FormControl(user.name, [
                            Validators.required,
                            Validators.minLength(3)
                        ]),
                        mail: new FormControl(user.email, [
                            Validators.required,
                            Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
                        ]),
                        password: new FormControl(user.password, [
                            Validators.required,
                            Validators.minLength(8),
                            Validators.pattern(/^(?=.*[A-Za-z]).+$/), // required one letter
                            Validators.pattern(/^(?=.*[A-Z]).+$/), //required one capital letter
                            Validators.pattern(/^(?=.*\d).+$/), // required one number
                            Validators.pattern(/^(?=.*[@$!%*?&]).+$/), // requider special caracter
                        ]),
                        repeatPassword: new FormControl(user.password, [
                            Validators.required
                        ]),
                        roleId: new FormControl(user.roleId, [])
                    }, [this.checkPassword]);
                }
            });
        }
        checkPassword(formValue) {
            const password = formValue.get('password')?.value;
            const repeatPassword = formValue.get('repeatPassword')?.value;
            if (password !== repeatPassword) {
                return { 'checkpassword': true };
            }
            else {
                return null;
            }
        }
        inputControl(formControlName, validador) {
            return this.registerStudent.get(formControlName)?.hasError(validador) && this.registerStudent.get(formControlName)?.touched;
        }
        hide = signal(true);
        clickEvent(event) {
            this.hide.set(!this.hide());
            event.stopPropagation();
        }
        hide2 = signal(true);
        clickEvent2(event) {
            this.hide2.set(!this.hide2());
            event.stopPropagation();
        }
        async getdataForm() {
            if (this.registerStudent.value.id) {
                // if if it´s received update user
                try {
                    const user = await this.userServices.update(this.registerStudent.value);
                    if (user.id) {
                        alert('Usuario actualizado correctamente');
                        this.router.navigate(['']);
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
            else {
                // create new user
                try {
                    const user = await this.userServices.insert(this.registerStudent.value);
                    if (user.id) {
                        alert('Usuario creado correctamente');
                        this.router.navigate(['']);
                    }
                }
                catch (error) {
                    console.error('Error al crear el usuario:', error);
                }
            }
        }
    };
    return RegisterStudentComponentComponent = _classThis;
})();
export { RegisterStudentComponentComponent };
