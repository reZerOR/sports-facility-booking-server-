import { Router } from "express";
import globalErrorHandler from "../middleware/globalErrorHandler";


const router = Router();

const moduleRoutes = [
{
path: '/auth',
route: globalErrorHandler
}
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;