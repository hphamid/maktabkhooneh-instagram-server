/**
 * Created by Mine on 6/13/2016.
 */
'use strict';
var path = require('path');
var root = path.resolve(__dirname + '/../..');
var UserInfo = require(root + '/db/data/UserInfo');
var ErrorCodes = require("../../util/ErrorCodes");
var TimeHelper = require('../../util/TimeHelper');
var Promisify = require("../../util/Promisify");
var Backtory = require("../../provider/LibsProvider").backtory();
/**
 * @Repository()
 */
module.exports = {};

module.exports.updateInfo = function (userId, fullName, imageAddress) {
    var query = new Backtory.Query(UserInfo);
    query.equalTo(UserInfo.Col.USER_ID, userId);
    return Promisify.wrapWithThis(query.find, query).then(function (results) {
        if (results.length <= 0) {
            return Promise.reject(ErrorCodes.make(ErrorCodes.NOT_FOUND, 'userInfo not found'));
        }
        var userInfo = results[0];
        if (fullName)userInfo.setFullName(fullName);
        if (imageAddress)userInfo.setProfilePic(imageAddress);
        return Promisify.wrapWithThis(userInfo.save, userInfo);
    });
};

module.exports.getInfo = function (userId) {
    var query = new Backtory.Query(UserInfo);
    query.equalTo(UserInfo.Col.USER_ID, userId);
    return Promisify.wrapWithThis(query.find, query).then(function(results){
        if(results.length<=0){
            return Promise.reject(ErrorCodes.make(ErrorCodes.NOT_FOUND, 'userInfo not found'));
        }
        return results[0];
    });
};
module.exports.getAllInfos = function (userIds) {
    var query = new Backtory.Query(UserInfo);
    query.containedIn(UserInfo.Col.USER_ID, userIds);
    return Promisify.wrapWithThis(query.find, query);
};


