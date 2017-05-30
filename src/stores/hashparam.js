import { observable, action, computed } from 'mobx';
// qnui
import Feedback from 'qnui/lib/feedback';
const Toast = Feedback.toast;
// utils
import * as webhelper from '../utils/webhelper';

class HashParam {
    @observable _id;
    @observable key;
    @observable value;
    @observable desc;
    @observable createDt;
    @observable updateDt;

    /**
     * 构造函数
     * @param {any} d
     */
    constructor(d) {
        this._id = d._id;
        this.key = d.key;
        this.value = d.value;
        this.desc = d.desc;
        this.createDt = d.createDt;
        this.updateDt = d.updateDt;
    }
}

export class HashParamStore {
    @observable params = [];
    @observable filter = "";
    @observable pageIndex = 1;
    @observable pageSize = 5;
    @observable total = 0;
    @observable isFetching = false;

    /**
     * 新增
     * @param {HashParam} val 
     */
    @action createParam(val) {
        webhelper.postJson('/api/hashparam/add', val)
            .then(rsp => {
                if (rsp.ok) return rsp.json();
            })
            .then(rst => this.fetchParams())
            .catch(err => console.error(err));
    }

    @action updateParam(val) {
        webhelper.postJson('/api/hashparam/edit', val)
            .then(rsp => {
                if (rsp.ok) return rsp.json();
            })
            .then(rst => {
                let param = this.params.find(p => p._id === val._id);
                param = { ...param, ...val };
            })
            .catch(err => console.error(err));
    }

    @action removeParam(id) {
        webhelper.get(`/api/hashparam/remove/${id}`)
            .then(rsp => {
                if (rsp.ok) return rsp.json();
            })
            .then(json => {                
                this.fetchParams();
            })
            .catch(err => console.error(err))
    }

    @action removeParams(ids) {
      webhelper.postJson('/api/hashparam/batchremove', ids)
      .then(rsp => {
        if(rsp.ok) return rsp.json();
      })
      .then(json => {
        if(json.isOk) {
          // this.params.splice()
        }
      })
    }

    @action fetchParams() {
        this.isFetching = true;
        Toast.loading({
            content: '正则获取哈希参数...',
            hasMask: true,
            align: 'cc tc'
        });
        webhelper.postJson('/api/hashparam', {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                filter: this.filter
            })
            .then(rsp => {
                this.isFetching = false;
                Toast.success({
                    content: '哈希参数获取完成',
                    align: 'cc tc',
                    duration: 1000
                })
                if (rsp.ok) return rsp.json();
            })
            .then(result => {
                this.total = result.total;
                this.params.replace(result.data || [])
            })
            .catch(err => {
                Toast.error('获取哈希参数失败!');
            });
    }
}

export default new HashParamStore();
