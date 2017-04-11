/**
 * Created by Mine on 6/13/2016.
 */
'use strict';
var SharedImage = require("../data/SharedImage");
var ErrorCodes = require("../../util/ErrorCodes");
var TimeHelper = require('../../util/TimeHelper');
var Promisify = require("../../util/Promisify");
var Backtory = require("../../provider/LibsProvider").backtory();
/**
 * @Repository()
 */
module.exports = {};

module.exports.getUserSharedImages = function(userId, skip, limit){
    var query = new Backtory.Query(SharedImage);
    query.equalTo(SharedImage.Col.USER_ID, userId);
    query.descending(SharedImage.Col.CREATED_AT);
    query.skip(skip);
    query.limit(limit);
    return Promisify.wrapWithThis(query.find, query);
};


module.exports.getUserTimeLineImages = function(skip, limit){
    var query = new Backtory.Query(SharedImage);
    query.descending(SharedImage.Col.CREATED_AT);
    query.skip(skip);
    query.limit(limit);
    return Promisify.wrapWithThis(query.find, query);
};

module.exports.makeNew = function(description, imageUri, userId){
    var object = new SharedImage();
    object.setDescription(description);
    object.setSharedImage(imageUri);
    object.setUserId(userId);
    return Promisify.wrapWithThis(object.save, object);
};

