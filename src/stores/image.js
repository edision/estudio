import { observable, action } from 'mobx';

class Image {
    @observable _id;
    @observable name;
    @observable fileName;
    @observable imgUrl;
    @observable fileType;
    @observable createDt;

    constructor(d) {
        this._id = d._id;
        this.name = d.name;
        this.fileName = d.fileName;
        this.fileType = d.fileType;
        this.imgUrl = d.imgUrl;
        this.createDt = d.createDt;
    }
}

class ImageStore {
    @observable filter = "";
    @observable total = 0;
    @observable pageIndex = 1;
    @observable pageSize = 20;
    @observable images = [];
    @observable isFetching = false;
    @observable isSaving = false;

    @action fetchImages() {
        this.isFetching = true;
        setTimeout(() => {
            
        }, 2000);
        this.isFetching = false;
            this.total = 1;            
            this.images.replace([new Image({
                _id: 1,
                name: 'google-logo',
                imgUrl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
                fileName: 'google',
                fileType: 'png',
                createDt: Date.now()
            })]);
    }
}

const store = new ImageStore();

export default store;
