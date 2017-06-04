import service from '../services/hashparamservice';

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
            const result = await service.add(entry);
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
        const result = await service.update(data);
        ctx.body = { isOk: result };
    }

    remove = async(ctx, next) => {
        const id = ctx.params.id;
        console.log(`删除哈希参数: _id=${id}`);
        await next();
        const result = await service.remove(id);
        ctx.body = { isOk: result };
    }

    batchRemove = async(ctx, next) => {
        const ids = ctx.request.body;
        console.log(ids);
        await next();
        const result = await service.removeBatch(ids);
        ctx.body = { isOk: result };
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

        ctx.body = await service.getParams(pageIndex, pageSize, filter);
    }
}

export default new SysHashParamController();
