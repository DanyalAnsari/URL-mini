const { nanoid } = require("nanoid");
const urlModel = require("../model/urlModel");
const AsyncErrorHandler = require("../../utils/AsyncErrorHandler");
const CustomError = require("../../utils/CustomError");

const urlController = {
  // Render home page
  renderHome(req, res) {
    const user = res.locals.User || null;
    const page = req.path.split("/")[1] || "";

    res.render("home", {
      title: "URL-mini | Home",
      User: user,
      page,
    });
  },

  // Fetch all URLs for a user
  viewURL: AsyncErrorHandler(async (req, res, next) => {
    let user = res.locals.User;    
    const page = req.path.split("/")[1] || "";
    const URLlist = await urlModel.find({ UserID: user._id });
    delete user._id;
    res.render("dashboard", {
      title: "URL-mini | Dashboard",
      User: user,
      page,
      data: URLlist,
    });
  }),

  // Redirect to full URL based on short ID
  redirectURL: AsyncErrorHandler(async (req, res, next) => {
    const link = await urlModel.findOneAndUpdate(
      { URLShortId: req.params.shortId },
      {
        $push: {
          Visits: {
            time: Date.now(),
            ipAddress: req.ip || null,
            userAgent: req.headers["user-agent"],
          },
        },
      },
      { new: true }
    );
    if (!link) {
      return next(new CustomError("Invalid Short-Link", 404));
    }
    res.redirect(link.FullURL);
  }),

  // Generate a new short URL
  generateShortId: AsyncErrorHandler(async (req, res, next) => {
    const { URL } = req.body;
    const user = res.locals.User;
    if (!URL) {
      return next(new CustomError("Invalid URL", 400));
    }
    const shortID = nanoid(7);
    await urlModel.create({
      URLShortId: shortID,
      FullURL: URL,
      UserID: user._id,
      Visits: [],
    }); 
    res.redirect("/home/dashboard");
  }),

  // Delete the stored URL
  removeUrlRecord: AsyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;
    const record = await urlModel.findByIdAndDelete(id);
    if (record) {
      return res.redirect("/home/dashboard");
    }
    return next(new CustomError("Cannot delete the record", 400));
  }),

  // Admin-only analytics
  Analytics: AsyncErrorHandler(async (req, res, next) => {
    const user = res.locals.User;
    if (user.User_Role !== "ADMIN") {
      return res.redirect("../");
    }
    const records = await urlModel.find().populate("UserID").exec();
    res.render("dashboard", { data: records, user });
  }),
};

module.exports = urlController;
