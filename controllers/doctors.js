const User = require("../models/user");

exports.getDoctors = async (req, res, next) => {
  await User.findOne({ _id: req.userId })
    .populate("doctors", "name")
    .then((user) => {
      if (user) {
        const doctors = user.doctors;
        res.status(200).json({ doctors });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.addDoctor = async (req, res, next) => {
  const ownEmail = req.body.ownEmail;
  const doctorEmail = req.body.doctorEmail;
  if (ownEmail !== doctorEmail) {
    await User.findOne({ email: ownEmail }).then((user) => {
      if (user) {
        User.findOne({ email: doctorEmail }).then((doctor) => {
          if (doctor) {
            const stringId = `${doctor._id}`;
            const doctorExists =
              user.doctors.filter((d) => `${d}` === stringId).length > 0;
            if (!doctorExists) {
              user.doctors.push(doctor);
              user.save();

              res.status(201).json({
                doctor: { name: doctor.name, _id: doctor._id },
              });
            } else {
              console.log("You have added already this doctor");
            }
          } else {
            console.log(`Doctor ${req.body.doctorEmail} doesn't exist`);
          }
        });
      } else {
        console.log("Cannot find user");
      }
    });
  } else {
    console.log("Cannot add yourself as a friend");
  }
};
