const check_mail = (req,res,next) => {
  if (!req.body.mail) {
       res.status(404).json({mess : "mail address is required"})
  } else {
    next();
  }
}


module.exports = check_mail