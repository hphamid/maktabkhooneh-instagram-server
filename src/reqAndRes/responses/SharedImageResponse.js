/**
 * Created by hamid on 1/27/17.
 */
'use strict';

const StringField = require("../../requestDataHandler/dataTypes/StringField");
const BooleanField = require("../../requestDataHandler/dataTypes/BooleanField");
const IdField = require("../../requestDataHandler/dataTypes/IdField");
const IntegerField = require("../../requestDataHandler/dataTypes/IntegerField");
const UserInfoResponse = require("./UserInfoResponse");

const FailedSuccessResponses = require("./FailedSuccessResponse");

function SharedImageResponse(){
    this.init.apply(this, arguments);
}

SharedImageResponse.prototype = Object.create(FailedSuccessResponses.prototype);

SharedImageResponse.prototype.init = function(){
    this.imageUri = new StringField();
    this.description = new StringField();
    this.user = new UserInfoResponse();
    FailedSuccessResponses.prototype.init.apply(this, arguments);
};

SharedImageResponse.prototype.initFromData = function(sharedImage, user){
    if(!sharedImage){
        return;
    }
    this.imageUri.setValue(sharedImage.getSharedImage());
    this.description.setValue(sharedImage.getDescription());
    this.user.initFromData(user, false);
};

SharedImageResponse.prototype._name = function(){
    return "SharedImageResponse";
};

/**
 * @Response("SharedImageResponse")
 * @Component()
 */
module.exports = SharedImageResponse;