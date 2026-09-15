import { Router, type Request, type Response } from "express";
import { handleEnquiryLead, handleVisitBookingLead } from "../leads-handlers.js";

const router = Router();

router.post("/enquiry", async (req: Request, res: Response) => {
  const result = await handleEnquiryLead(req.body);
  return res.status(result.status).json(result.body);
});

router.post("/visit-booking", async (req: Request, res: Response) => {
  const result = await handleVisitBookingLead(req.body);
  return res.status(result.status).json(result.body);
});

export default router;
