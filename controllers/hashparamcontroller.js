import db from '../models';

class SysHashParamController {
    /**
     * @param {number} pageIndex 页码
     * @param {number} pageSize 页大小
     */
    getAll = async(ctx, next) => {       
        const pageIndex = Number.parseInt(ctx.params.pageIndex);
        const pageSize = Number.parseInt(ctx.params.pageSize);
        await next();

        let total = await db.SysHashParam.count();
        let docs = await db.SysHashParam.find().sort({ createDt: -1 }).skip((pageIndex - 1) * pageSize).limit(pageSize);
        ctx.body = {
            pageIndex,
            pageSize,
            total,
            data: docs
        };
    }
}

export default new SysHashParamController();
