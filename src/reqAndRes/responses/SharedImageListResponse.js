/**
 * Created by hamid on 1/27/17.
 */
'use strict';
const StringField = require("../../requestDataHandler/dataTypes/StringField");
const BooleanField = require("../../requestDataHandler/dataTypes/BooleanField");
const IdField = require("../../requestDataHandler/dataTypes/IdField");
const ArrayField = require("../../requestDataHandler/dataTypes/ArrayField");
const IntegerField = require("../../requestDataHandler/dataTypes/IntegerField");
const ValidatableObject = require("../../requestDataHandler/ValidatableObject");
const SharedImageResponse = require("./SharedImageResponse");

const FailedSuccessResponses = require("./FailedSuccessResponse");

function SharedImageListResponse(){
    this.init.apply(this, arguments);
}

SharedImageListResponse.prototype = Object.create(FailedSuccessResponses.prototype);

SharedImageListResponse.prototype.init = function(){
    this.images = new ArrayField(SharedImageResponse);
    FailedSuccessResponses.prototype.init.apply(this, arguments);
};


SharedImageListResponse.prototype._name = function(){
    return "SharedImageListResponse";
};

/**
 * @Response("SharedImageListResponse")
 * @Component()
 */
module.exports = SharedImageListResponse;