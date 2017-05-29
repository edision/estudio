import Router from 'koa-router';
import controller from '../controllers/hashparamcontroller';

let route = new Router();

route.post('/api/hashparam/add', controller.create);
route.get('/api/hashparam/:pageIndex/:pageSize', controller.getAll);

export default route;
