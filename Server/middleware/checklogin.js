exports.yeu_cau_login = (req, res, next) => {
    if (req.session.staffLogin||req.session.adminLogin) {
        // có tồn tại session login (đã đăng nhập)
        next();
    } else {
        return res.redirect('/');
    }
}