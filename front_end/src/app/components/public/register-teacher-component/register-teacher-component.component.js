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
let RegisterTeacherComponentComponent = (() => {
    let _classDecorators = [Component({
            selector: 'app-register-teacher-component',
            standalone: true,
            imports: [MatSelectModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
            templateUrl: './register-teacher-component.component.html',
            styleUrl: './register-teacher-component.component.css'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RegisterTeacherComponentComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            RegisterTeacherComponentComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        router = inject(Router);
        activateRoute = inject(ActivatedRoute);
        userServices = inject(UserServiceService);
        headerForm = 'Registrarse como profesor'; // header of form
        textButton = 'Enviar'; // text of button submit
        registerTeacher;
        // initialize form
        constructor() {
            this.registerTeacher = new FormGroup({
                roleId: new FormControl(2, []), //roldeId: 2 = teacher
                name: new FormControl(null, [
                    Validators.required,
                    Validators.minLength(3)
                ]),
                mail: new FormControl(null, [
                    Validators.required,
                    Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
                ]),
                phone: new FormControl(null, [
                    Validators.required
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
        // recovery user data to update
        ngOnInit() {
            this.activateRoute.params.subscribe(async (params) => {
                if (params.id) {
                    //if user exists change text of header and button
                    this.headerForm = 'Actualizar el usuario';
                    this.textButton = 'Actualizar datos';
                    const user = await this.userServices.getById(params.id);
                    this.registerTeacher = new FormGroup({
                        id: new FormControl(user.id, []),
                        name: new FormControl(user.name, [
                            Validators.required,
                            Validators.minLength(3)
                        ]),
                        mail: new FormControl(user.email, [
                            Validators.required,
                            Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
                        ]),
                        phone: new FormControl(user.phone, [
                            Validators.required
                        ]),
                        password: new FormControl(user.password, [
                            Validators.required,
                            Validators.minLength(8),
                            Validators.pattern(/^(?=.*[A-Za-z]).+$/), // required one letter
                            Validators.pattern(/^(?=.*[A-Z]).+$/), //required one capital letter
                            Validators.pattern(/^(?=.*\d).+$/), // required one number
                            Validators.pattern(/^(?=.*[@$!%*?&]).+$/), // requider special caracter
                        ]),
                        repeatPassword: new FormControl(user.password, []),
                        roleId: new FormControl(user.roleId, [
                            Validators.required
                        ])
                    }, [this.checkPassword]);
                }
            });
        }
        // verify that the two passwords are the same
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
        // error control in form fields
        inputControl(formControlName, validador) {
            return this.registerTeacher.get(formControlName)?.hasError(validador) && this.registerTeacher.get(formControlName)?.touched;
        }
        // button to see the password
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
        // sending form data to the service
        async getdataForm() {
            if (this.registerTeacher.value._id) {
                try {
                    const user = await this.userServices.update(this.registerTeacher.value);
                    if (user.id) {
                        alert('Usuario actualizado');
                        this.router.navigate(['']);
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
            else {
                try {
                    const user = await this.userServices.insert(this.registerTeacher.value);
                    if (user.id) {
                        this.router.navigate(['']);
                    }
                }
                catch (error) {
                }
            }
        }
    };
    return RegisterTeacherComponentComponent = _classThis;
})();
export { RegisterTeacherComponentComponent };
