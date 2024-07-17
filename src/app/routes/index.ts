import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.route";
import { FacilityRoutes } from "../module/facility/facility.route";
import { BookingRoutes } from "../module/booking/booking.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/facility",
    route: FacilityRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
