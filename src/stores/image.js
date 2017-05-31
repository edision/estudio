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
                name: 'qqmail-logo',
                imgUrl: 'https://rescdn.qqmail.com/zh_CN/htmledition/images/webp/spacer1e9c5d.gif',
                fileName: 'qqmaillogo',
                fileExt: 'gif',
                createDt: Date.now()
            })]);
    }
}

const store = new ImageStore();

export default store;
