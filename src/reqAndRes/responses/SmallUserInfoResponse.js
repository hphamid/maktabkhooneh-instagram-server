/**
 * Created by hamid on 8/13/16.
 */
'use strict';

/**
 * Created by hamid on 8/12/16.
 */
'use strict';

const StringField = require("../../requestDataHandler/dataTypes/StringField");
const DateField = require("../../requestDataHandler/dataTypes/DateField");
const BooleanField = require("../../requestDataHandler/dataTypes/BooleanField");
const IdField = require("../../requestDataHandler/dataTypes/IdField");
const IntegerField = require("../../requestDataHandler/dataTypes/IntegerField");

const BaseObject = require("../../requestDataHandler/BaseObject");


function SmallUserInfoResponse() {
    this.init.apply(this, arguments);
}

SmallUserInfoResponse.prototype = Object.create(BaseObject.prototype);

SmallUserInfoResponse.prototype.init = function () {
    this.userId = new IdField(true);
    this.username = new StringField(true);
    this.displayName = new StringField(false);
    BaseObject.prototype.init.apply(this, arguments);
};

SmallUserInfoResponse.prototype.initFromData = function (userInfo) {
    if (!userInfo) {
        return;
    }
    var data = {
        userId: userInfo.getUserId(),
        username: userInfo.getUsername(),
        displayName: userInfo.getDisplayName(),
    };
    this.init(data);
};

SmallUserInfoResponse.prototype._name = function () {
    return "SmallUserInfoResponse";
};

/**
 * @Response("SmallUserInfoResponse")
 * @Component()
 */
module.exports = SmallUserInfoResponse;

