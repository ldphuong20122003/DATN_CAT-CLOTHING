exports.yeu_cau_login = (req, res, next) => {
    if (req.session.staffLogin||req.session.adminLogin) {
        res.locals.nameStaff=req.session.nameStaff;
        next();
    } else {
        return res.redirect('/');
    }
}