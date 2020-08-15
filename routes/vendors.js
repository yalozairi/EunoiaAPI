const express = require("express");
const upload = require("../middleware/multer");
const passport = require("passport");

//Controllers
const {
  vendorCreate,
  vendorList,
  vendorUpdate,
  vendorDelete,
  fetchVendor,
  notebookCreate,
} = require("../controllers/vendorControllers");

const router = express.Router();

router.param("vendorId", async (req, res, next, vendorId) => {
  const vendor = await fetchVendor(vendorId, next);
  if (vendor) {
    req.vendor = vendor;
    next();
  } else {
    const err = new Error("Vendor Not Found");
    err.status = 404;
    next(err);
  }
});

//List
router.get("/", vendorList);

router.use((req, res, next) => {
  next();
});

//Notebook Create
router.post(
  "/:vendorId/notebooks",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  notebookCreate
);

//Vendor Create
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  vendorCreate
);

//Vendor Delete
router.delete(
  "/:vendorId",
  passport.authenticate("jwt", { session: false }),
  vendorDelete
);

//Vendor Update
router.put(
  "/:vendorId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  vendorUpdate
);

module.exports = router;
