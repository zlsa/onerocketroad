"use strict";
var Observable_1 = require("rxjs/Observable");
var AbstractService = (function () {
    function AbstractService() {
    }
    /**
     * Handles any 400 or 500-level server responses by logging their details to the console.
     *
     * @param error
     * @returns {ErrorObservable}
     */
    AbstractService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    return AbstractService;
}());
exports.AbstractService = AbstractService;
