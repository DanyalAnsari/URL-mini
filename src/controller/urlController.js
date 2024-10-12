const { nanoid } =require("nanoid");
const { urlModel } = require("../model/urlModel");



// Render home page

const renderHome = (req, res) => {
  const user = { ...res.locals.user, page: req.path.split('/')[0] };

  res.render('home', { User: user || null });
};


// Redirect to full URL based on short ID

const redirectURL = async (req, res) => {
  try {
    const link = await urlModel.findOneAndUpdate(
      { URLShortId: req.params.shortId },
      { $push: { Visits: { time: Date.now() } } },
      { new: true }
    );

    if (!link) {
      return res.status(404).render('error', { error: 'Invalid Short-Link' });
    }

    res.redirect(link.FullURL);
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { error: 'Something went wrong' });
  }
};
  

// Generate a new short URL

const generateShortId = async (req, res) => {
  const { URL } = req.body;
  const user = res.locals.user;

  if (!URL) {
    return res.status(400).render('error', { error: 'Invalid URL' });
  }

  const shortID = nanoid(7);

  try {
    await urlModel.create({
      URLShortId: shortID,
      FullURL: URL,
      UserID: user._id,
      Visits: []
    });

    res.status(201).redirect('/home/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { error: 'Failed to create short URL' });
  }
};

//Delete the stored URL

const removeUrlRecord=async(req, res)=>{
  const {id}=req.params;
  try{
    const record=await urlModel.findByIdAndDelete({_id:id},{new:true})
    if(record){
      req.method='GET'
      return  res.redirect(204,'/home/dashboard');
    }
    return res.status(500).render('error')
  }catch(err){
    console.error(err.message)
   return res.status(500).render('error')
  }

}

// Fetch all URLs for a user
const viewURL = async (req, res) => {
  const user = { ...res.locals.user, page: req.path.split('/')[1] };

  try {
    const URLlist = await urlModel.find({ UserID: user._id });
    res.render('dashboard', { data: URLlist, User: user });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { error: 'Failed to load URLs' });
  }
};

// Admin-only analytics
const Analytics = async (req, res) => {
  const user = res.locals.user;

  if (user.User_Role !== 'ADMIN') {
    return res.redirect('../');
  }

  try {
    const records = await urlModel.find().populate('UserID').exec();
    res.render('dashboard', { data: records, user });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { error: 'Failed to load analytics' });
  }
};



module.exports={generateShortId, redirectURL, renderHome, viewURL, Analytics, removeUrlRecord };