import db from '../models';

class SysHashParamController {
    create = async(ctx, next) => {
        const data = ctx.request.body;
        await next();
        try {
            const entry = {
                ...data,
                createDt: Date.now(),
                updateDt: Date.now()
            };
            console.log(entry)
            const result = await db.SysHashParam.create(entry);
            ctx.body = { isOk: true, result };
        } catch (err) {
            console.error(err)
            ctx.body = { isOk: false }
        }
    }

    update = async(ctx, next) => {
        const data = ctx.request.body;
        console.log('更新哈希参数-->', data);
        await next();
        try {
            await db.SysHashParam.update(data);
            ctx.body = { isOk: true }
        } catch (error) {
            console.error(error)
            ctx.body = { isOk: false }
        }
    }

    remove = async(ctx, next) => {
        const id = ctx.params.id;
        console.log(`删除哈希参数: _id=${id}`);
        await next();
        try {
            await db.SysHashParam.findByIdAndRemove(id);
            ctx.body = { isOk: true }
        } catch (error) {
            console.error(error)
            ctx.body = { isOk: false }
        }
    }

    batchRemove = async(ctx, next) => {
        const ids = ctx.request.body;
        await next();
        try {
            await db.SysHashParam.remove({_id: {$in: ids}});
            ctx.body = { isOk: true }
        } catch (error) {
            console.error(error)
            ctx.body = { isOk: false }
        }
    }

    /**
     * @param {number} pageIndex 页码
     * @param {number} pageSize 页大小
     */
    getAll = async(ctx, next) => {
        const qp = ctx.request.body;

        const pageIndex = qp.pageIndex;
        const pageSize = qp.pageSize;
        const filter = qp.filter || '';
        await next();

        let query = {};
        if (filter.length > 0) {
            const reg = { $regex: filter };
            query.$or = [{ key: reg }, { value: reg }, { desc: reg }];
        }

        let total = await db.SysHashParam.count();
        let docs = await db.SysHashParam.find(query).sort({ createDt: -1 }).skip((pageIndex - 1) * pageSize).limit(pageSize);
        ctx.body = {
            pageIndex,
            pageSize,
            total,
            data: docs
        };
    }
}

export default new SysHashParamController();
