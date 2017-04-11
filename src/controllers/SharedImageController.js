/**
 * Created by mohammadjavad on 5/28/2016.
 */
'use strict';

/**
 * @AutoWired()
 * @Controller()
 * @Post("user.pictures")
 * @RequestType("IdRequest")
 * @ResponseType("SharedImageListResponse")
 * @LoginRequired()
 * @Pagination()
 */
exports.getUserPics = function (requestData, userSkip, userLimit, SharedImageRepo, SharedImageResponse, UserInfoRepo) {
    const userId = requestData.id.value();
    return SharedImageRepo.getUserSharedImages(userId, userSkip, userLimit).then(function (images) {
        return makeSharedImageResponse(images, SharedImageResponse, UserInfoRepo);
    }).then(function(images){
        return {images: images};
    });
};

/**
 * @AutoWired()
 * @Controller()
 * @Post("all.pictures")
 * @RequestType("PaginationRequest")
 * @ResponseType("SharedImageListResponse")
 * @LoginRequired()
 * @Pagination()
 */
exports.getAllPictures = function (requestData, userSkip, userLimit, SharedImageRepo, SharedImageResponse, UserInfoRepo) {
    return SharedImageRepo.getUserTimeLineImages(userSkip, userLimit).then(function (images) {
        return makeSharedImageResponse(images, SharedImageResponse, UserInfoRepo);
    }).then(function(images){
        return {images: images};
    });
};


function makeSharedImageResponse(images, SharedImageResponse, UserInfoRepo) {
    if (!images || images.length == 0) {
        return Promise.resolve([]);
    }

    const userIds = [];
    const userInfoMap = {};
    Array.from(images).forEach(function (item) {
        userIds.push(item.getUserId());
    });
    return UserInfoRepo.getAllInfos(userIds).then(function (userInfos) {
        if (!userInfos || userInfos.length <= 0) {
            return userInfoMap;
        }
        Array.from(userInfos).forEach(function (item) {
            userInfoMap[item.getUserId()] = item;
        });
        return userInfoMap;
    }).then(function () {
        const toReturn = [];
        Array.from(images).forEach(function (item) {
            let toAdd = new SharedImageResponse();
            toAdd.initFromData(item, userInfoMap[item.getUserId()]);
            toReturn.push(toAdd);
        });
        return toReturn;
    })
}

/**
 * @AutoWired()
 * @Controller()
 * @Post("new")
 * @RequestType("ShareImageRequest")
 * @ResponseType("FailedSuccessResponse")
 * @LoginRequired()
 * @ActiveUser()
 */
exports.addPicture = function (activeUser, requestData, SharedImageRepo, FileManager) {
    const imageUri = requestData.imageUri.value();
    const description = requestData.description.value();
    return FileManager.addImageFile(activeUser.userId, imageUri).then(function (imagePath) {
        return SharedImageRepo.makeNew(description, FileManager.convertToLink(imagePath), activeUser.userId);
    }).then(function(){
        return {success: true};
    });
};