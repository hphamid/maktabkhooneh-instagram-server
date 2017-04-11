/**
 * Created by Mine on 6/9/2016.
 */
'use strict';
const Backtory = require("../../provider/LibsProvider").backtory();
var SharedImage = Backtory.Object.extend('SharedImage',{
    getId(){return this.get(SharedImage.Col.ID)},
    getUserId(){return this.get(SharedImage.Col.USER_ID)},
    getSharedImage() {return this.get(SharedImage.Col.SHARED_IMAGE)},
    getDescription() {return this.get(SharedImage.Col.DESCRIPTION)},

    setId(value){this.set(SharedImage.Col.ID, value)},
    setUserId(value){this.set(SharedImage.Col.USER_ID, value)},
    setSharedImage(value){this.set(SharedImage.Col.SHARED_IMAGE, value)},
    setDescription(value){this.set(SharedImage.Col.DESCRIPTION, value)},
},{
    get Name(){return 'SharedImage'},
});
SharedImage.Col = {
    get ID(){return '_id'},
    get USER_ID(){return 'userId'},
    get SHARED_IMAGE(){return 'sharedImage'},
    get DESCRIPTION(){return 'description'},
    get CREATED_AT(){return "createdAt"},
};

Backtory.Object.registerSubclass(SharedImage.Name, SharedImage);
module.exports = SharedImage;