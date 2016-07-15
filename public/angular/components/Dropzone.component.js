"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Dropzone = require('dropzone');
var Rx_1 = require("rxjs/Rx");
require('rxjs/add/observable/fromEvent');
var DropzoneComponent = (function () {
    function DropzoneComponent(el) {
        this.el = el;
    }
    DropzoneComponent.prototype.ngOnInit = function () {
        this.el.nativeElement.id = "ng2-dropzone";
        this.el.nativeElement.style.display = "block";
        this.dropzone = new Dropzone(this.el.nativeElement, {
            url: '/api/images/create',
            method: "post",
            maxFilesize: 32,
            uploadMultiple: false,
            acceptedFiles: '.jpg,.jpeg,.png,.gif',
            autoProcessQueue: false,
            headers: {
                "X-XSRF-TOKEN": this.getXSRFToken()
            }
        });
    };
    /**
     * Uploads a file using formdata, appending any extra details that are specified. Returns an observable
     * which resolves when upload is completed.
     *
     * @param detailsToAdd  Any additional details that could be appended with this request. Each key on the
     * object is sent through as an extra form data entry.
     *
     * @returns Observable<any>
     */
    DropzoneComponent.prototype.upload = function (detailsToAdd) {
        this.dropzone.on("sending", function (file, xhr, formData) {
            Object.keys(detailsToAdd).forEach(function (key) {
                formData.append(key, detailsToAdd[key]);
            });
        });
        this.dropzone.processQueue();
        return Rx_1.Observable.fromEvent(this.dropzone, "complete");
    };
    /**
     * Although Angular 2 automatically handles resending an X-XSRF-TOKEN header to the server,
     * Dropzone does not; so we must grab the cookie with the XSRF token outselves.
     *
     * @returns string  The XSRF token retrieved from the cookie.
     */
    DropzoneComponent.prototype.getXSRFToken = function () {
        var value = "; " + document.cookie;
        var parts = value.split("; " + "XSRF-TOKEN" + "=");
        if (parts.length == 2) {
            return decodeURIComponent(parts.pop().split(";").shift());
        }
        return null;
    };
    DropzoneComponent = __decorate([
        core_1.Component({
            selector: 'dropzone',
            template: ''
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DropzoneComponent);
    return DropzoneComponent;
}());
exports.DropzoneComponent = DropzoneComponent;
