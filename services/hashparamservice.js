import db from '../models';

class HashParamService {
    /**
     * 获取参数列表
     * @param {Number} pageIndex 页码
     * @param {Number} pageSize 页大小
     * @param {String} filter 过滤字符
     */
    async getParams(pageIndex = 1, pageSize = 10, filter = '') {
        let query = {};
        if (filter.length > 0) {
            const reg = { $regex: filter };
            query.$or = [{ key: reg }, { value: reg }, { desc: reg }];
        }

        let total = await db.SysHashParam.count();
        let docs = await db.SysHashParam.find(query).sort({ createDt: 1 }).skip((pageIndex - 1) * pageSize).limit(pageSize);
        return {
            pageIndex,
            pageSize,
            total,
            data: docs
        };
    }

    /**
     * 新增哈希参数
     * @param {any} entry SysHashParam数据
     */
    async add(entry) {
        const result = await db.SysHashParam.create(entry);
        return result;
    }

    /**
     * 更新哈希参数     
     * @param {any} data 更新后的数据
     */
    async update(data) {
        try {
            await db.SysHashParam.update({ _id: data._id }, data);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * 删除
     * @param {String} id 记录唯一标识
     */
    async remove(id) {
        try {
            await db.SysHashParam.remove({ _id: id });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * 批量删除
     * @param {Array} ids 记录标识组
     */
    async removeBatch(ids) {
        try {
            await db.SysHashParam.remove({ _id: { $in: ids } });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default new HashParamService();
