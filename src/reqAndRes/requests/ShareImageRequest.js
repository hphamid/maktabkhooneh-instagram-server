/**
 * Created by hamid on 1/27/17.
 */
'use strict';

const StringField = require("../../requestDataHandler/dataTypes/StringField");
const ValidatableObject = require("../../requestDataHandler/ValidatableObject");

function ShareImageRequest(){
    this.init.apply(this, arguments);
}

ShareImageRequest.prototype = Object.create(ValidatableObject.prototype);

ShareImageRequest.prototype.init = function(){
    this.description = new StringField(true);
    this.imageUri = new StringField(true);
    ValidatableObject.prototype.init.apply(this, arguments);
};

ShareImageRequest.prototype._name = function(){
    return "ShareImageRequest";
};

/**
 * @Request("ShareImageRequest")
 */
module.exports = ShareImageRequest;