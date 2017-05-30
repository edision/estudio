import Router from 'koa-router';
import controller from '../controllers/hashparamcontroller';

let route = new Router();

route.post('/api/hashparam/add', controller.create);
route.post('/api/hashparam/edit', controller.update);
route.get('/api/hashparam/remove/:id', controller.remove);
route.post('/api/hashparam/batchremove', controller.batchRemove);
route.post('/api/hashparam', controller.getAll);

export default route;
